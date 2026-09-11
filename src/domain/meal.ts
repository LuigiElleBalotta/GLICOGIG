import { getFoodByCatalogId, resolveFoodByName } from '../catalog/foodCatalog'
import type { AnalizzaResponse, AnalysisOrigin } from '../types/analysis'
import type { ProdottoBarcode } from '../types/barcode'
import type { CatalogLanguage, FoodCatalogEntry } from '../types/catalog'
import type { Recipe } from '../types/content'
import type { MealItem } from '../types/meal'
import type { GlycemicImpactBand } from '../types/nutrition'
import { classificaFascia, calculateGlycemicImpact, isBevanda } from './impactCalculator'
import { calculateIngredientNutrition, calculateMealNutrition, effectiveIngredientGrams } from './nutritionCalculator'
import { aggiustaIGperPreparazione } from './preparation'

const ZERO_IMPACT_PATTERN = /\bzero\b|light|senza zucchero|no sugar|\bacqua\b|the verde|tè verde|caff[eè]/i
const SUGAR_PATTERN = /zucchero|miele|sciroppo|caramell|\bdolc|marmellat|nutella|cioccolat|\btorta|biscott|merend|gelato|succo|nettare|bibita|\bcola\b|aranciat|energy|sciroppat/i

function scale(value: number | null, grams: number): number | null {
  return value === null ? null : (value * grams) / 100
}

function localizedNames(food: FoodCatalogEntry) {
  return {
    name_en: food.nome_en,
    name_es: food.nome_es,
    name_de: food.nome_de,
    name_fr: food.nome_fr,
  }
}

export function mealItemFromAnalysis(
  result: AnalizzaResponse,
  analysisOrigin: AnalysisOrigin,
  fallbackName: string,
): MealItem | null {
  if (!result.e_cibo) return null
  const meal = calculateMealNutrition(result.ingredienti)
  const impact = calculateGlycemicImpact(result.ingredienti, result.piatto)
  const source: Extract<MealItem['source'], { kind: 'photo' }> = {
    kind: 'photo',
    analysisOrigin,
  }
  return {
    source,
    name: result.piatto || fallbackName,
    grams: meal.totalGrams,
    kcal: meal.nutrition.energia_kcal,
    carbs: impact.carbo,
    protein: meal.nutrition.proteine_g,
    fat: meal.nutrition.grassi_totali_g,
    fibre: meal.nutrition.fibre_g,
    glycemicLoad: impact.cg,
    band: impact.fascia,
    unresolved: meal.unresolved.length,
  }
}

export function mealItemFromPhoto(result: AnalizzaResponse, fallbackName: string): MealItem | null {
  return mealItemFromAnalysis(result, 'photo', fallbackName)
}

export function mealItemFromFood(food: FoodCatalogEntry, requestedGrams: number): MealItem {
  const grams = effectiveIngredientGrams(food, requestedGrams)
  const nutrition = calculateIngredientNutrition(food, grams)
  const impact = calculateGlycemicImpact([
    { nome: food.nome, catalogo_id: food.id, grammi: grams },
  ], food.nome)
  return {
    source: { kind: 'catalog', foodId: food.id },
    name: food.nome,
    ...localizedNames(food),
    grams,
    kcal: nutrition.energia_kcal,
    carbs: impact.carbo,
    protein: nutrition.proteine_g,
    fat: nutrition.grassi_totali_g,
    fibre: nutrition.fibre_g,
    glycemicLoad: impact.cg,
    band: impact.fascia,
    unresolved: 0,
  }
}

export function mealItemFromBarcode(
  product: ProdottoBarcode,
  food: FoodCatalogEntry,
  requestedGrams: number,
): MealItem | null {
  const productName = product.nome
  if (!productName) return null

  const grams = Math.max(1, Math.min(2000, requestedGrams || 1))
  const carbs = scale(product.carbo100, grams)
  const glycemicIndex = food.ig_medio
  if (carbs === null || carbs < 0 || glycemicIndex === null) return null

  const fibre = scale(product.fibre100, grams)
  const protein = scale(product.proteine100, grams)
  const fat = scale(product.grassi100, grams)
  const glycemicLoad = Math.round(((glycemicIndex * carbs) / 100) * 10) / 10
  const { fascia } = classificaFascia({
    cg: glycemicLoad,
    carbo: carbs,
    ig: glycemicIndex,
    fibre,
    proteine: protein,
    grassi: fat,
    fibre100: product.fibre100,
    proteine100: product.proteine100,
    grassi100: product.grassi100,
    zuccheri100: product.zuccheri100,
    carbo100: product.carbo100,
    liquido: isBevanda(productName, food.categoria),
  })

  return {
    source: { kind: 'barcode', code: product.codice, foodId: food.id },
    name: productName,
    ...localizedNames(food),
    grams,
    kcal: null,
    carbs,
    protein,
    fat,
    fibre,
    glycemicLoad,
    band: fascia,
    unresolved: 0,
  }
}

export interface RecipeMethodEvidence {
  quantity: {
    ingredient: Recipe['ingredienti'][number]
    food: FoodCatalogEntry
    carbohydrateContribution: number
  } | null
  speed: {
    food: FoodCatalogEntry
    glycemicContribution: number
  } | null
}

/** Replica la selezione separata quantità/velocità di metodoRicetta #18395. */
export function recipeMethodEvidence(recipe: Recipe): RecipeMethodEvidence {
  let quantity: RecipeMethodEvidence['quantity'] = null
  let speed: RecipeMethodEvidence['speed'] = null

  for (const ingredient of recipe.ingredienti) {
    const food = getFoodByCatalogId(ingredient.id)
    const grams = ingredient.grammi_porzione ?? 0
    if (!food || food.carboidrati_disponibili_g === null || !grams) continue

    const carbohydrateContribution = food.carboidrati_disponibili_g * grams / 100
    if (carbohydrateContribution > (quantity?.carbohydrateContribution ?? 0)) {
      quantity = { ingredient, food, carbohydrateContribution }
    }

    if (food.ig_medio !== null) {
      const glycemicContribution = food.ig_medio * carbohydrateContribution / 100
      if (glycemicContribution > (speed?.glycemicContribution ?? 0)) {
        speed = { food, glycemicContribution }
      }
    }
  }

  return { quantity, speed }
}

export function mealItemFromRecipe(recipe: Recipe, portions: number): MealItem {
  const multiplier = Math.max(0.5, Math.min(2, portions))
  const nutrition = recipe.per_porzione
  const carbs = nutrition.carboidrati_disponibili_g * multiplier
  const glycemicLoad = nutrition.carico_glicemico * multiplier
  const protein = nutrition.proteine_g * multiplier
  const fat = nutrition.grassi_g * multiplier
  const fibre = nutrition.fibre_g * multiplier
  const { speed } = recipeMethodEvidence(recipe)
  const { fascia } = classificaFascia({
    cg: glycemicLoad,
    carbo: carbs,
    ig: speed?.food.ig_medio ?? null,
    fibre,
    proteine: protein,
    grassi: fat,
    fibre100: null,
    proteine100: null,
    grassi100: null,
    zuccheri100: null,
    carbo100: null,
    liquido: false,
  })
  return {
    source: { kind: 'recipe', recipeId: recipe.id, portions: multiplier },
    name: recipe.nome,
    name_en: recipe.nome_en,
    name_es: recipe.nome_es,
    name_de: recipe.nome_de,
    name_fr: recipe.nome_fr,
    grams: recipe.ingredienti.reduce(
      (total, ingredient) => total + ingredient.grammi_porzione * multiplier,
      0,
    ),
    kcal: nutrition.kcal * multiplier,
    carbs,
    protein,
    fat,
    fibre,
    glycemicLoad,
    band: multiplier === 1 ? nutrition.fascia : fascia,
    unresolved: 0,
  }
}

export interface ManualImpactInput {
  name: string
  carbs: number
  protein: number
  fat: number
  fibre: number
}

export interface ManualImpactEstimate {
  glycemicIndex: number
  glycemicLoad: number
  band: GlycemicImpactBand
  kcal: number
  indexSource: 'catalogo' | 'stima'
}

function resolveManualFood(name: string, language: CatalogLanguage) {
  const localized = resolveFoodByName(name, { language })
  if (localized.kind !== 'not_found' || language === 'it') return localized
  return resolveFoodByName(name, { language: 'it' })
}

/**
 * Replica stimaImpattoManuale #18594. Il lookup prova la lingua UI attiva e poi il
 * fallback canonico italiano, risolvendo solo un miglior match univoco.
 */
export function estimateManualImpact(
  input: ManualImpactInput,
  language: CatalogLanguage = 'it',
): ManualImpactEstimate {
  const name = input.name.trim()
  const carbs = Math.max(0, input.carbs || 0)
  const protein = Math.max(0, input.protein || 0)
  const fat = Math.max(0, input.fat || 0)
  const fibre = Math.max(0, input.fibre || 0)
  const resolution = name.length >= 3
    ? resolveManualFood(name, language)
    : { kind: 'not_found' as const }
  const food = resolution.kind === 'resolved' ? resolution.food : null
  const liquid = isBevanda(name, food?.categoria)
  const indexSource = food?.ig_medio !== null && food?.ig_medio !== undefined ? 'catalogo' : 'stima'
  const baseIndex = indexSource === 'catalogo'
    ? food!.ig_medio!
    : ZERO_IMPACT_PATTERN.test(name)
      ? 0
      : SUGAR_PATTERN.test(name) || liquid
        ? 65
        : 55
  const glycemicIndex = aggiustaIGperPreparazione(baseIndex, undefined, name)
  const glycemicLoad = Math.round(glycemicIndex * carbs / 100)
  const { fascia } = classificaFascia({
    cg: glycemicLoad,
    carbo: carbs,
    ig: glycemicIndex,
    fibre,
    proteine: protein,
    grassi: fat,
    fibre100: null,
    proteine100: null,
    grassi100: null,
    zuccheri100: food?.zuccheri_g ?? null,
    carbo100: food?.carboidrati_disponibili_g ?? null,
    liquido: liquid,
  })
  return {
    glycemicIndex,
    glycemicLoad,
    band: fascia,
    kcal: Math.round(4 * carbs + 2 * fibre + 4 * protein + 9 * fat),
    indexSource,
  }
}

export function mealItemFromManual(
  input: ManualImpactInput & { grams: number },
  language: CatalogLanguage = 'it',
): MealItem {
  const estimate = estimateManualImpact(input, language)
  return {
    source: { kind: 'manual' },
    name: input.name.trim(),
    grams: Math.max(0, input.grams || 0),
    kcal: estimate.kcal,
    carbs: Math.max(0, input.carbs || 0),
    protein: Math.max(0, input.protein || 0),
    fat: Math.max(0, input.fat || 0),
    fibre: Math.max(0, input.fibre || 0),
    glycemicLoad: estimate.glycemicLoad,
    band: estimate.band,
    unresolved: 0,
  }
}

export function recipeReliability(recipe: Recipe): 'alta' | 'media' | 'bassa' | null {
  const scores: Record<string, number> = { bassa: 1, media: 2, alta: 3 }
  const values = recipe.ingredienti
    .map(({ id }) => getFoodByCatalogId(id))
    .filter((food): food is FoodCatalogEntry => Boolean(food?.ig_medio !== null && food?.ig_medio !== undefined))
    .map((food) => scores[food.ig_affidabilita])
    .filter((value): value is number => Boolean(value))
  if (!values.length) return null
  const minimum = Math.min(...values)
  return minimum === 3 ? 'alta' : minimum === 2 ? 'media' : 'bassa'
}
