import { getFoodByCatalogId, resolveFoodByName } from '../catalog/foodCatalog'
import type { AnalizzaIngredient } from '../types/analysis'
import type { FoodCatalogEntry } from '../types/catalog'
import type {
  MealNutrition,
  NutritionField,
  NutritionValues,
  ResolvedIngredientNutrition,
  UnresolvedIngredient,
} from '../types/nutrition'

const EMPTY_NUTRITION: NutritionValues = {
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

function scale(valuePer100: number, grams: number): number
function scale(valuePer100: number | null, grams: number): number | null
function scale(valuePer100: number | null, grams: number): number | null {
  return valuePer100 === null ? null : (valuePer100 * grams) / 100
}

function addNullable(first: number | null, second: number | null): number | null {
  return first === null || second === null ? null : first + second
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
    energia_kcal: addNullable(total.energia_kcal, item.energia_kcal),
    carboidrati_totali_g: total.carboidrati_totali_g + item.carboidrati_totali_g,
    zuccheri_g: addNullable(total.zuccheri_g, item.zuccheri_g),
    fibre_g: addNullable(total.fibre_g, item.fibre_g),
    carboidrati_disponibili_g: total.carboidrati_disponibili_g + item.carboidrati_disponibili_g,
    proteine_g: total.proteine_g + item.proteine_g,
    grassi_totali_g: total.grassi_totali_g + item.grassi_totali_g,
    grassi_saturi_g: addNullable(total.grassi_saturi_g, item.grassi_saturi_g),
    sodio_mg: total.sodio_mg + item.sodio_mg,
  }
}

function per100Value(value: number | null, totalGrams: number): number | null {
  if (value === null) return null
  return totalGrams > 0 ? (value * 100) / totalGrams : 0
}

function nutritionPer100(total: NutritionValues, totalGrams: number): NutritionValues {
  return {
    energia_kcal: per100Value(total.energia_kcal, totalGrams),
    carboidrati_totali_g: per100Value(total.carboidrati_totali_g, totalGrams) ?? 0,
    zuccheri_g: per100Value(total.zuccheri_g, totalGrams),
    fibre_g: per100Value(total.fibre_g, totalGrams),
    carboidrati_disponibili_g: per100Value(total.carboidrati_disponibili_g, totalGrams) ?? 0,
    proteine_g: per100Value(total.proteine_g, totalGrams) ?? 0,
    grassi_totali_g: per100Value(total.grassi_totali_g, totalGrams) ?? 0,
    grassi_saturi_g: per100Value(total.grassi_saturi_g, totalGrams),
    sodio_mg: per100Value(total.sodio_mg, totalGrams) ?? 0,
  }
}

function unresolvedFromName(
  source: AnalizzaIngredient,
  missingId: boolean,
): ResolvedIngredientNutrition | UnresolvedIngredient {
  const resolution = resolveFoodByName(source.nome)
  if (resolution.kind === 'ambiguous') {
    return {
      source,
      reason: 'ambiguous_name',
      candidateIds: resolution.candidates.map(({ id }) => id),
    }
  }
  if (resolution.kind === 'not_found') {
    return {
      source,
      reason: missingId ? 'missing_catalog_id' : 'catalog_id_not_found',
    }
  }

  const grams = effectiveIngredientGrams(resolution.food, source.grammi)
  return {
    source,
    food: resolution.food,
    grams,
    nutrition: calculateIngredientNutrition(resolution.food, grams),
    resolvedBy: 'name',
  }
}

function resolveIngredient(source: AnalizzaIngredient): ResolvedIngredientNutrition | UnresolvedIngredient {
  const food = getFoodByCatalogId(source.catalogo_id)
  if (!food) return unresolvedFromName(source, !source.catalogo_id)

  const grams = effectiveIngredientGrams(food, source.grammi)
  return {
    source,
    food,
    grams,
    nutrition: calculateIngredientNutrition(food, grams),
    resolvedBy: 'catalog_id',
  }
}

function isResolved(item: ResolvedIngredientNutrition | UnresolvedIngredient): item is ResolvedIngredientNutrition {
  return 'food' in item
}

export function calculateMealNutrition(ingredients: readonly AnalizzaIngredient[]): MealNutrition {
  const resolvedOrNot = ingredients.map(resolveIngredient)
  const resolved = resolvedOrNot.filter(isResolved)
  const unresolved = resolvedOrNot.filter((item): item is UnresolvedIngredient => !isResolved(item))
  const totalGramsRaw = resolved.reduce((total, item) => total + item.grams, 0)
  const nutrition = resolved.reduce(
    (total, item) => addNutrition(total, item.nutrition),
    { ...EMPTY_NUTRITION },
  )

  let dominantGlycemicIndex: number | null = null
  let highestIndividualLoad = 0
  for (const item of resolved) {
    if (item.food.ig_medio === null) continue
    const individualLoad = (
      item.food.ig_medio * item.nutrition.carboidrati_disponibili_g
    ) / 100
    if (individualLoad > highestIndividualLoad) {
      highestIndividualLoad = individualLoad
      dominantGlycemicIndex = item.food.ig_medio
    }
  }

  const unknownNutritionFields = (Object.keys(nutrition) as NutritionField[])
    .filter((field) => nutrition[field] === null)

  return {
    totalGrams: Math.round(totalGramsRaw),
    nutrition,
    per100: nutritionPer100(nutrition, totalGramsRaw),
    dominantGlycemicIndex,
    resolved,
    unresolved,
    unknownNutritionFields,
  }
}
