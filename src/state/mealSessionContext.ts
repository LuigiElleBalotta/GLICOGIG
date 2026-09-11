import { createContext, useContext } from 'react'
import type { MealItem } from '../types/meal'
import type { GlycemicImpactBand } from '../types/nutrition'

export interface MealSessionEntry {
  id: string
  item: MealItem
  addedAt: number
}

export interface MealSessionSummary {
  plates: number
  totalGrams: number
  kcal: number | null
  carbs: number
  protein: number | null
  fat: number | null
  fibre: number | null
  glycemicLoad: number
  band: GlycemicImpactBand
  unresolved: number
}

export interface MealSessionValue {
  name: string
  startedAt: number | null
  entries: readonly MealSessionEntry[]
  summary: MealSessionSummary
  setName(value: string): void
  startCompleteMeal(): void
  addItem(item: MealItem): MealSessionEntry
  updateItem(id: string, item: MealItem): void
  removeItem(id: string): void
  clearMeal(): void
}

export const MealSessionContext = createContext<MealSessionValue | null>(null)

export function useMealSession(): MealSessionValue {
  const value = useContext(MealSessionContext)
  if (!value) throw new Error('useMealSession must be used inside MealSessionProvider')
  return value
}
