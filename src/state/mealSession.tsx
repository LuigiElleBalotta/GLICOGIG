import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { calculateGlycemicImpact } from '../domain/impactCalculator'
import { calculateMealNutrition } from '../domain/nutritionCalculator'
import type { AnalizzaIngredient, AnalizzaResponse } from '../types/analysis'
import type { GlycemicImpact, NutritionValues } from '../types/nutrition'

export interface MealSessionEntry {
  id: string
  result: AnalizzaResponse
}

export interface MealSessionSummary {
  plates: number
  totalGrams: number
  nutrition: NutritionValues
  carbo: number
  cg: number
  unresolved: number
}

interface MealSessionValue {
  entries: readonly MealSessionEntry[]
  summary: MealSessionSummary
  addMeal(result: AnalizzaResponse): MealSessionEntry
  removeMeal(id: string): void
  clearMeals(): void
}

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

const MealSessionContext = createContext<MealSessionValue | null>(null)
let sessionCounter = 0

function cloneIngredient(ingredient: AnalizzaIngredient): AnalizzaIngredient {
  return {
    nome: ingredient.nome,
    grammi: ingredient.grammi,
    ...(ingredient.catalogo_id === undefined ? {} : { catalogo_id: ingredient.catalogo_id }),
    ...(ingredient.cottura === undefined ? {} : { cottura: ingredient.cottura }),
  }
}

/** Mantiene in memoria solo i campi di risultato noti: nessuna foto, URL o stringa Base64. */
function sessionResult(result: AnalizzaResponse): AnalizzaResponse {
  return {
    e_cibo: result.e_cibo,
    ingredienti: result.ingredienti.map(cloneIngredient),
    ...(result.piatto === undefined ? {} : { piatto: result.piatto }),
    ...(result.descrizione === undefined ? {} : { descrizione: result.descrizione }),
    ...(result.confidenza === undefined ? {} : { confidenza: result.confidenza }),
    ...(result.lezione === undefined ? {} : { lezione: result.lezione }),
    ...(result.quando_ha_senso === undefined ? {} : { quando_ha_senso: result.quando_ha_senso }),
  }
}

function sumNullable(values: readonly (number | null)[]): number | null {
  return values.some((value) => value === null)
    ? null
    : values.reduce<number>((total, value) => total + (value ?? 0), 0)
}

function summarize(entries: readonly MealSessionEntry[]): MealSessionSummary {
  if (!entries.length) {
    return { plates: 0, totalGrams: 0, nutrition: EMPTY_NUTRITION, carbo: 0, cg: 0, unresolved: 0 }
  }

  const meals = entries.map(({ result }) => calculateMealNutrition(result.ingredienti))
  const impacts: GlycemicImpact[] = entries.map(({ result }) => (
    calculateGlycemicImpact(result.ingredienti, result.piatto)
  ))
  const field = (key: keyof NutritionValues) => meals.map(({ nutrition }) => nutrition[key])

  return {
    plates: entries.length,
    totalGrams: meals.reduce((total, meal) => total + meal.totalGrams, 0),
    nutrition: {
      energia_kcal: sumNullable(field('energia_kcal')),
      carboidrati_totali_g: sumNullable(field('carboidrati_totali_g')) ?? 0,
      zuccheri_g: sumNullable(field('zuccheri_g')),
      fibre_g: sumNullable(field('fibre_g')),
      carboidrati_disponibili_g: sumNullable(field('carboidrati_disponibili_g')) ?? 0,
      proteine_g: sumNullable(field('proteine_g')) ?? 0,
      grassi_totali_g: sumNullable(field('grassi_totali_g')) ?? 0,
      grassi_saturi_g: sumNullable(field('grassi_saturi_g')),
      sodio_mg: sumNullable(field('sodio_mg')) ?? 0,
    },
    carbo: impacts.reduce((total, impact) => total + impact.carbo, 0),
    cg: impacts.reduce((total, impact) => total + impact.cg, 0),
    unresolved: meals.reduce((total, meal) => total + meal.unresolved.length, 0),
  }
}

export function MealSessionProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<MealSessionEntry[]>([])

  const addMeal = useCallback((result: AnalizzaResponse): MealSessionEntry => {
    const entry = {
      id: `m${Date.now().toString(36)}${sessionCounter++}`,
      result: sessionResult(result),
    }
    setEntries((current) => [...current, entry])
    return entry
  }, [])

  const removeMeal = useCallback((id: string) => {
    setEntries((current) => current.filter((entry) => entry.id !== id))
  }, [])

  const clearMeals = useCallback(() => setEntries([]), [])
  const summary = useMemo(() => summarize(entries), [entries])
  const value = useMemo<MealSessionValue>(() => ({
    entries,
    summary,
    addMeal,
    removeMeal,
    clearMeals,
  }), [addMeal, clearMeals, entries, removeMeal, summary])

  return <MealSessionContext.Provider value={value}>{children}</MealSessionContext.Provider>
}

export function useMealSession(): MealSessionValue {
  const value = useContext(MealSessionContext)
  if (!value) throw new Error('useMealSession must be used inside MealSessionProvider')
  return value
}
