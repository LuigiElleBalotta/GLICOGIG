import type { GlycemicImpactBand } from '../types/nutrition'

export interface StabilityMeal {
  cg?: number | null
  fascia: GlycemicImpactBand
}

export type StabilityLevel = 'moltoStabile' | 'bellaGiornata' | 'nellaMedia' | 'impegnativa'

/** Replica qualitaPasto #18453. */
export function qualitaPasto(cg: number, band: GlycemicImpactBand): number {
  const base = Math.max(15, Math.min(100, 100 - 2.2 * Math.max(0, cg - 10)))
  const cap = band === 'alto' ? 45 : band === 'medio' ? 80 : 100
  return Math.min(base, cap)
}

/** Replica indiceStabilita #18454. */
export function indiceStabilita(meals: readonly StabilityMeal[]): number | null {
  if (!meals.length) return null

  let weightedQuality = 0
  let totalWeight = 0
  for (const meal of meals) {
    const cg = meal.cg || 0
    const quality = qualitaPasto(cg, meal.fascia)
    const weight = Math.max(cg, 8)
    weightedQuality += quality * weight
    totalWeight += weight
  }
  return Math.round(weightedQuality / totalWeight)
}

/** Replica livelloStabilita #18458. */
export function livelloStabilita(index: number): StabilityLevel {
  if (index >= 85) return 'moltoStabile'
  if (index >= 70) return 'bellaGiornata'
  if (index >= 55) return 'nellaMedia'
  return 'impegnativa'
}
