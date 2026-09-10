import type { AnalizzaIngredient } from './analysis'
import type { FoodCatalogEntry } from './catalog'

/** I campi nullable restano sconosciuti fino alla UI; non vengono convertiti in zero. */
export interface NutritionValues {
  energia_kcal: number | null
  carboidrati_totali_g: number
  zuccheri_g: number | null
  fibre_g: number | null
  carboidrati_disponibili_g: number
  proteine_g: number
  grassi_totali_g: number
  grassi_saturi_g: number | null
  sodio_mg: number
}

export type NutritionField = keyof NutritionValues

export interface ResolvedIngredientNutrition {
  source: AnalizzaIngredient
  food: FoodCatalogEntry
  grams: number
  nutrition: NutritionValues
  resolvedBy: 'catalog_id' | 'name'
}

export interface UnresolvedIngredient {
  source: AnalizzaIngredient
  reason: 'missing_catalog_id' | 'catalog_id_not_found' | 'name_not_found' | 'ambiguous_name'
  candidateIds?: readonly string[]
}

export interface MealNutrition {
  totalGrams: number
  nutrition: NutritionValues
  per100: NutritionValues
  dominantGlycemicIndex: number | null
  resolved: ResolvedIngredientNutrition[]
  unresolved: UnresolvedIngredient[]
  unknownNutritionFields: readonly NutritionField[]
}

export type GlycemicImpactBand = 'trascurabile' | 'basso' | 'medio' | 'alto'
export type GlycemicImpactReliability = 'media' | 'bassa'

export interface GlycemicImpactContribution {
  nome: string
  cg: number
}

export interface GlycemicBandClassification {
  fascia: GlycemicImpactBand
  veloce: boolean
  zucchero: boolean
}

/** Output VERIFIED di calcolaImpatto #18423. */
export interface GlycemicImpact {
  cg: number
  carbo: number
  fibre: number
  prot: number
  grassi: number
  ig: number | null
  fascia: GlycemicImpactBand
  trovati: number
  totali: number
  affidabilita: GlycemicImpactReliability
  contributi: GlycemicImpactContribution[]
  cotto: boolean
  pianoIntero: boolean
}
