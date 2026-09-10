import type { AnalizzaIngredient } from './analysis'
import type { FoodCatalogEntry } from './catalog'

export interface NutritionValues {
  energia_kcal: number
  carboidrati_totali_g: number
  zuccheri_g: number
  fibre_g: number
  carboidrati_disponibili_g: number
  proteine_g: number
  grassi_totali_g: number
  grassi_saturi_g: number
  sodio_mg: number
}

export interface ResolvedIngredientNutrition {
  source: AnalizzaIngredient
  food: FoodCatalogEntry
  grams: number
  nutrition: NutritionValues
}

export interface UnresolvedIngredient {
  source: AnalizzaIngredient
  reason: 'missing_catalog_id' | 'catalog_id_not_found'
}

export interface MealNutrition {
  totalGrams: number
  nutrition: NutritionValues
  per100: NutritionValues
  dominantGlycemicIndex: number | null
  resolved: ResolvedIngredientNutrition[]
  unresolved: UnresolvedIngredient[]
}

export type GlycemicImpactBand = 'basso' | 'medio' | 'alto'
export type GlycemicImpactReliability = 'media' | 'bassa'

export interface GlycemicImpactContribution {
  nome: string
  cg: number
}

export interface GlycemicImpact {
  cg: number
  fascia: GlycemicImpactBand
  trovati: number
  totali: number
  affidabilita: GlycemicImpactReliability
  contributi: GlycemicImpactContribution[]
}
