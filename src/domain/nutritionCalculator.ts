import { getFoodByCatalogId } from '../catalog/foodCatalog'
import type { AnalizzaIngredient } from '../types/analysis'
import type { FoodCatalogEntry } from '../types/catalog'
import type { MealNutrition, NutritionValues, ResolvedIngredientNutrition, UnresolvedIngredient } from '../types/nutrition'

const ZERO_NUTRITION: NutritionValues = {
  energia_kcal: 0,
  carboidrati_totali_g: 0,
  zuccheri_g: 0,
  fibre_g: 0,
  carboidrati_disponibili_g: 0,
  proteine_g: 0,
  grassi_totali_g: 0,
  grassi_saturi_g: 0,
  sodio_mg: 0,
}

function scale(valuePer100: number, grams: number): number {
  return (valuePer100 * grams) / 100
}

export function normalizeEditedGrams(value: number): number {
  return Math.max(0, Math.min(2000, Math.round(value || 0)))
}

export function effectiveIngredientGrams(food: FoodCatalogEntry, requestedGrams: number): number {
  return requestedGrams > 0 ? requestedGrams : food.porzione_standard_g || 0
}

export function calculateIngredientNutrition(food: FoodCatalogEntry, grams: number): NutritionValues {
  return {
    energia_kcal: scale(food.energia_kcal, grams),
    carboidrati_totali_g: scale(food.carboidrati_totali_g, grams),
    zuccheri_g: scale(food.zuccheri_g, grams),
    fibre_g: scale(food.fibre_g, grams),
    carboidrati_disponibili_g: scale(food.carboidrati_disponibili_g, grams),
    proteine_g: scale(food.proteine_g, grams),
    grassi_totali_g: scale(food.grassi_totali_g, grams),
    grassi_saturi_g: scale(food.grassi_saturi_g, grams),
    sodio_mg: scale(food.sodio_mg, grams),
  }
}

function addNutrition(total: NutritionValues, item: NutritionValues): NutritionValues {
  return {
    energia_kcal: total.energia_kcal + item.energia_kcal,
    carboidrati_totali_g: total.carboidrati_totali_g + item.carboidrati_totali_g,
    zuccheri_g: total.zuccheri_g + item.zuccheri_g,
    fibre_g: total.fibre_g + item.fibre_g,
    carboidrati_disponibili_g: total.carboidrati_disponibili_g + item.carboidrati_disponibili_g,
    proteine_g: total.proteine_g + item.proteine_g,
    grassi_totali_g: total.grassi_totali_g + item.grassi_totali_g,
    grassi_saturi_g: total.grassi_saturi_g + item.grassi_saturi_g,
    sodio_mg: total.sodio_mg + item.sodio_mg,
  }
}

function nutritionPer100(total: NutritionValues, totalGrams: number): NutritionValues {
  if (totalGrams <= 0) return { ...ZERO_NUTRITION }
  return Object.fromEntries(
    Object.entries(total).map(([key, value]) => [key, (value * 100) / totalGrams]),
  ) as unknown as NutritionValues
}

function resolveIngredient(source: AnalizzaIngredient): ResolvedIngredientNutrition | UnresolvedIngredient {
  if (!source.catalogo_id) return { source, reason: 'missing_catalog_id' }
  const food = getFoodByCatalogId(source.catalogo_id)
  if (!food) return { source, reason: 'catalog_id_not_found' }
  const grams = effectiveIngredientGrams(food, source.grammi)
  return { source, food, grams, nutrition: calculateIngredientNutrition(food, grams) }
}

function isResolved(item: ResolvedIngredientNutrition | UnresolvedIngredient): item is ResolvedIngredientNutrition {
  return 'food' in item
}

export function calculateMealNutrition(ingredients: readonly AnalizzaIngredient[]): MealNutrition {
  const resolvedOrNot = ingredients.map(resolveIngredient)
  const resolved = resolvedOrNot.filter(isResolved)
  const unresolved = resolvedOrNot.filter((item): item is UnresolvedIngredient => !isResolved(item))
  const totalGramsRaw = resolved.reduce((total, item) => total + item.grams, 0)
  const nutrition = resolved.reduce((total, item) => addNutrition(total, item.nutrition), { ...ZERO_NUTRITION })

  let dominantGlycemicIndex: number | null = null
  let highestIndividualLoad = 0
  for (const item of resolved) {
    if (item.food.ig_medio === null) continue
    const individualLoad = (item.food.ig_medio * item.nutrition.carboidrati_disponibili_g) / 100
    if (individualLoad > highestIndividualLoad) {
      highestIndividualLoad = individualLoad
      dominantGlycemicIndex = item.food.ig_medio
    }
  }

  return {
    totalGrams: Math.round(totalGramsRaw),
    nutrition,
    per100: nutritionPer100(nutrition, totalGramsRaw),
    dominantGlycemicIndex,
    resolved,
    unresolved,
  }
}
