import {
  getFoodByCatalogId,
  resolveFoodByName,
} from '../catalog/foodCatalog'
import type { AnalizzaIngredient } from '../types/analysis'
import type { FoodCatalogEntry } from '../types/catalog'
import type {
  GlycemicBandClassification,
  GlycemicImpact,
  GlycemicImpactBand,
} from '../types/nutrition'
import { aggiustaIGperPreparazione } from './preparation'

interface GlycemicBandInput {
  cg: number
  carbo: number | null
  ig: number | null
  fibre: number | null
  proteine: number | null
  grassi: number | null
  fibre100: number | null
  proteine100: number | null
  grassi100: number | null
  zuccheri100: number | null
  carbo100: number | null
  liquido: boolean
}

interface WholeDishProfile {
  re: RegExp
  carbo100: number
  ig: number
  pesoTipico: number
  bumpMin: number
  floor: boolean
}

interface WholeDishEstimate {
  carbo: number
  cg: number
  ig: number
}

const COOKED_WEIGHT_PATTERN = /spaghett|\bpasta|maccheron|\bpenne\b|fusill|rigaton|tortellin|raviol|vermicell|linguin|tagliatell|bucatin|\briso\b|risott|couscous|\bbulgur|polenta|\borzo\b|\bfarro\b|quinoa|\bmiglio\b|\blegum|lenticch|\bceci\b|fagiol|pisell/
const BEVERAGE_PATTERN = /\bvino\b|\bbirra\b|spritz|prosecc|\bcola\b|bibita|bevanda|aranciat|gassos|\bsucco\b|spremut|cocktail|aperol|\bacqua\b|caff[eè]|\bt[eè]\b|energy/i

const WHOLE_DISH_PROFILES: readonly WholeDishProfile[] = [
  { re: /pizza/i, carbo100: 30, ig: 70, pesoTipico: 380, bumpMin: 200, floor: true },
  { re: /focacc/i, carbo100: 48, ig: 70, pesoTipico: 180, bumpMin: 100, floor: true },
  { re: /calzone|panzerott/i, carbo100: 33, ig: 68, pesoTipico: 300, bumpMin: 170, floor: true },
  { re: /lasagn/i, carbo100: 18, ig: 55, pesoTipico: 350, bumpMin: 200, floor: true },
  { re: /pasta al forno|timball|cannellon/i, carbo100: 20, ig: 55, pesoTipico: 350, bumpMin: 200, floor: true },
  { re: /parmigian/i, carbo100: 9, ig: 45, pesoTipico: 350, bumpMin: 200, floor: true },
  { re: /burger|hamburger|cheeseburger|panino con/i, carbo100: 22, ig: 60, pesoTipico: 240, bumpMin: 140, floor: true },
  { re: /piadin/i, carbo100: 34, ig: 68, pesoTipico: 250, bumpMin: 140, floor: true },
  { re: /kebab/i, carbo100: 22, ig: 60, pesoTipico: 350, bumpMin: 200, floor: true },
  { re: /poke/i, carbo100: 16, ig: 55, pesoTipico: 400, bumpMin: 250, floor: false },
  { re: /risott/i, carbo100: 28, ig: 72, pesoTipico: 350, bumpMin: 200, floor: false },
  {
    re: /pasta|spaghett|\bpenne\b|rigaton|fusill|tagliatell|bucatin|linguin|maccheron|orecchiett|trofie|carbonara|amatrician|arrabbiat|puttanesc|cacio e pepe|pesto|rag[uù]|bolognes/i,
    carbo100: 28,
    ig: 55,
    pesoTipico: 320,
    bumpMin: 180,
    floor: false,
  },
]

function roundToOneDecimal(value: number): number {
  return Math.round(value * 10) / 10
}

/** Compatibilità con l'export precedente; #18423 usa classificaFascia per l'output finale. */
export function glycemicImpactBand(load: number): GlycemicImpactBand {
  if (load <= 10) return 'basso'
  if (load <= 19) return 'medio'
  return 'alto'
}

/** Replica classificaFascia #18408. */
export function classificaFascia(input: GlycemicBandInput): GlycemicBandClassification {
  let fascia: GlycemicImpactBand = input.carbo !== null && input.carbo < 5
    ? 'trascurabile'
    : glycemicImpactBand(input.cg)

  const inferredWeight = input.carbo !== null && input.carbo100 !== null && input.carbo100 > 0
    ? (input.carbo / input.carbo100) * 100
    : null
  const asPer100 = (per100: number | null, total: number | null): number => {
    if (per100 !== null) return per100
    if (total !== null && inferredWeight) return (total * 100) / inferredWeight
    return total ?? 0
  }

  const fewBrakes = (
    2 * asPer100(input.fibre100, input.fibre)
    + asPer100(input.proteine100, input.proteine)
    + asPer100(input.grassi100, input.grassi)
  ) < 5
  const hasRelevantCarbs = input.carbo !== null && input.carbo >= 5
  const zucchero = input.zuccheri100 !== null
    && input.zuccheri100 >= 8
    && input.carbo100 !== null
    && input.carbo100 > 0
    && input.zuccheri100 / input.carbo100 >= 0.7
    && (input.fibre100 ?? 0) < 3
  const highSugar = input.zuccheri100 !== null
    && input.zuccheri100 >= 15
    && (input.fibre100 ?? 0) < 3
  const highGlycemicIndex = input.ig !== null && input.ig >= 60
  const veloce = hasRelevantCarbs && fewBrakes && (zucchero || highGlycemicIndex)

  if (veloce) {
    if (fascia === 'trascurabile' || fascia === 'basso') fascia = 'medio'
    if (input.liquido || highSugar) fascia = 'alto'
  }

  return { fascia, veloce, zucchero }
}

/** Replica pesatoCotto #18407. */
export function pesatoCotto(name?: string | null): boolean {
  return COOKED_WEIGHT_PATTERN.test((name || '').toLowerCase())
}

/** Replica isBevanda #18419. */
export function isBevanda(name?: string | null, category?: string | null): boolean {
  return category === 'Bevande' || BEVERAGE_PATTERN.test(name || '')
}

function resolveImpactFood(ingredient: AnalizzaIngredient): FoodCatalogEntry | undefined {
  const byId = getFoodByCatalogId(ingredient.catalogo_id)
  if (byId) return byId
  const byName = resolveFoodByName(ingredient.nome)
  return byName.kind === 'resolved' ? byName.food : undefined
}

/** Replica pesoCibo #18420: usa solo grammi espliciti positivi e salta le bevande. */
export function pesoCibo(ingredients: readonly AnalizzaIngredient[]): number {
  let weight = 0
  for (const ingredient of ingredients) {
    const food = getFoodByCatalogId(ingredient.catalogo_id)
    if (isBevanda(ingredient.nome, food?.categoria)) continue
    if (food && isBevanda(food.nome, food.categoria)) continue
    if (ingredient.grammi > 0) weight += ingredient.grammi
  }
  return weight
}

/** Replica stimaPiattoIntero #18421. */
export function stimaPiattoIntero(
  dishName: string | null | undefined,
  weight: number,
): WholeDishEstimate | null {
  if (!dishName || !weight) return null
  const profile = WHOLE_DISH_PROFILES.find(({ re }) => re.test(dishName))
  if (!profile || !profile.floor) return null
  const carbo = Math.round((profile.carbo100 * weight) / 100)
  return {
    carbo,
    cg: Math.round((profile.ig * carbo) / 100),
    ig: profile.ig,
  }
}

/** Replica calcolaImpatto #18423 usando esclusivamente il catalogo embedded. */
export function calcolaImpatto(
  ingredients: readonly AnalizzaIngredient[],
  dishName?: string | null,
): GlycemicImpact {
  let found = 0
  let totalLoad = 0
  let availableCarbs = 0
  let fibre = 0
  let proteins = 0
  let fats = 0
  let totalWeight = 0
  let highestIndividualLoad = 0
  let dominantGlycemicIndex: number | null = null
  let dominantFood: FoodCatalogEntry | null = null
  let cooked = false
  let wholeDishApplied = false
  const contributions: GlycemicImpact['contributi'] = []

  for (const ingredient of ingredients) {
    const food = resolveImpactFood(ingredient)
    if (!food) continue

    found += 1
    if (pesatoCotto(food.nome) || pesatoCotto(ingredient.nome)) cooked = true
    const grams = ingredient.grammi > 0 ? ingredient.grammi : food.porzione_standard_g || 0
    totalWeight += grams

    if (food.fibre_g !== null) fibre += (food.fibre_g * grams) / 100
    if (food.proteine_g !== null) proteins += (food.proteine_g * grams) / 100
    if (food.grassi_totali_g !== null) fats += (food.grassi_totali_g * grams) / 100

    const carbsPer100 = food.carboidrati_disponibili_g
    if (carbsPer100 !== null && grams) availableCarbs += (carbsPer100 * grams) / 100
    if (food.ig_medio === null || carbsPer100 === null || !grams) continue

    const adjustedIndex = aggiustaIGperPreparazione(
      food.ig_medio,
      ingredient.cottura,
      ingredient.nome,
    )
    const portionCarbs = (carbsPer100 * grams) / 100
    const load = (adjustedIndex * portionCarbs) / 100
    totalLoad += load

    if (load > highestIndividualLoad) {
      highestIndividualLoad = load
      dominantGlycemicIndex = adjustedIndex
      dominantFood = food
    }
    if (load >= 0.5) {
      contributions.push({ nome: food.nome, cg: roundToOneDecimal(load) })
    }
  }

  let cg = roundToOneDecimal(totalLoad)
  let carbo = Math.round(availableCarbs)
  contributions.sort((first, second) => second.cg - first.cg)

  const estimate = stimaPiattoIntero(dishName, pesoCibo(ingredients))
  if (
    estimate
    && estimate.carbo > carbo
    && (carbo < 10 || estimate.carbo <= carbo * 1.9)
  ) {
    carbo = estimate.carbo
    cg = estimate.cg
    dominantGlycemicIndex = estimate.ig
    wholeDishApplied = true
  }

  const per100 = (value: number): number | null => totalWeight > 0
    ? (value * 100) / totalWeight
    : null
  const dominantIsLiquid = dominantFood
    ? isBevanda(dominantFood.nome, dominantFood.categoria)
    : false
  const { fascia } = classificaFascia({
    cg,
    carbo,
    ig: dominantGlycemicIndex,
    fibre,
    proteine: proteins,
    grassi: fats,
    fibre100: per100(fibre),
    proteine100: per100(proteins),
    grassi100: per100(fats),
    zuccheri100: dominantFood?.zuccheri_g ?? null,
    carbo100: dominantFood?.carboidrati_disponibili_g ?? null,
    liquido: dominantIsLiquid,
  })
  const coverage = ingredients.length ? found / ingredients.length : 0

  return {
    cg,
    carbo,
    fibre: roundToOneDecimal(fibre),
    prot: roundToOneDecimal(proteins),
    grassi: roundToOneDecimal(fats),
    ig: dominantGlycemicIndex,
    fascia,
    trovati: found,
    totali: ingredients.length,
    affidabilita: coverage >= 0.6 ? 'media' : 'bassa',
    contributi: contributions,
    cotto: cooked,
    pianoIntero: wholeDishApplied,
  }
}

/** Export inglese conservato per ResultPanel e consumer esistenti. */
export function calculateGlycemicImpact(
  ingredients: readonly AnalizzaIngredient[],
  dishName?: string | null,
): GlycemicImpact {
  return calcolaImpatto(ingredients, dishName)
}
