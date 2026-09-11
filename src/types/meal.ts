import type { AnalysisOrigin } from './analysis'
import type { GlycemicImpactBand } from './nutrition'

export type MealItemSource =
  | { kind: 'photo'; analysisOrigin?: AnalysisOrigin }
  | { kind: 'catalog'; foodId: string }
  | { kind: 'barcode'; code: string; foodId: string }
  | { kind: 'recipe'; recipeId: string; portions: number }
  | { kind: 'manual' }

/** Voce normalizzata condivisa da foto, catalogo, barcode, ricette e inserimento manuale. */
export interface MealItem {
  source: MealItemSource
  name: string
  name_en?: string | null
  name_es?: string | null
  name_de?: string | null
  name_fr?: string | null
  grams: number
  kcal: number | null
  carbs: number
  protein: number | null
  fat: number | null
  fibre: number | null
  glycemicLoad: number
  band: GlycemicImpactBand
  unresolved: number
}
