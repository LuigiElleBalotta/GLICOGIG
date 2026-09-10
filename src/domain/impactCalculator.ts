import { getFoodByCatalogId } from '../catalog/foodCatalog'
import type { AnalizzaIngredient } from '../types/analysis'
import type { GlycemicImpact, GlycemicImpactBand } from '../types/nutrition'

function roundToOneDecimal(value: number): number {
  return Math.round(value * 10) / 10
}

/** Soglie VERIFIED da fasciaDa #15922. */
export function glycemicImpactBand(load: number): GlycemicImpactBand {
  if (load <= 10) return 'basso'
  if (load <= 19) return 'medio'
  return 'alto'
}

/** Replica calcolaImpatto #15923 usando esclusivamente il catalogo APK locale. */
export function calculateGlycemicImpact(ingredients: readonly AnalizzaIngredient[]): GlycemicImpact {
  let found = 0
  let totalLoad = 0
  const contributions: GlycemicImpact['contributi'] = []

  for (const ingredient of ingredients) {
    const food = getFoodByCatalogId(ingredient.catalogo_id)
    if (!food) continue

    found += 1
    const grams = ingredient.grammi > 0 ? ingredient.grammi : food.porzione_standard_g || 0
    const glycemicIndex = food.ig_medio
    const availableCarbsPer100 = food.carboidrati_disponibili_g
    if (glycemicIndex === null || availableCarbsPer100 === null || !grams) continue

    const portionCarbs = (availableCarbsPer100 * grams) / 100
    const load = (glycemicIndex * portionCarbs) / 100
    totalLoad += load

    if (load >= 0.5) {
      contributions.push({ nome: food.nome, cg: roundToOneDecimal(load) })
    }
  }

  const cg = roundToOneDecimal(totalLoad)
  const coverage = ingredients.length ? found / ingredients.length : 0
  contributions.sort((first, second) => second.cg - first.cg)

  return {
    cg,
    fascia: glycemicImpactBand(cg),
    trovati: found,
    totali: ingredients.length,
    affidabilita: coverage >= 0.6 ? 'media' : 'bassa',
    contributi: contributions,
  }
}
