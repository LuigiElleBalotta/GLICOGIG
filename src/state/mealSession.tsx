import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useTranslation } from 'react-i18next'
import { classificaFascia } from '../domain/impactCalculator'
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

interface MealSessionValue {
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

const COMPLETE_MEAL_TTL_MS = 14_400_000
const MealSessionContext = createContext<MealSessionValue | null>(null)
let sessionCounter = 0

function sumNullable(values: readonly (number | null)[]): number | null {
  return values.some((value) => value === null)
    ? null
    : values.reduce<number>((total, value) => total + (value ?? 0), 0)
}

function summarize(entries: readonly MealSessionEntry[]): MealSessionSummary {
  const items = entries.map(({ item }) => item)
  const carbs = items.reduce((total, item) => total + item.carbs, 0)
  const glycemicLoad = items.reduce((total, item) => total + item.glycemicLoad, 0)
  const protein = sumNullable(items.map(({ protein: value }) => value))
  const fat = sumNullable(items.map(({ fat: value }) => value))
  const fibre = sumNullable(items.map(({ fibre: value }) => value))
  const { fascia } = classificaFascia({
    cg: glycemicLoad,
    carbo: carbs,
    ig: null,
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
    plates: items.length,
    totalGrams: items.reduce((total, item) => total + item.grams, 0),
    kcal: sumNullable(items.map(({ kcal }) => kcal)),
    carbs,
    protein,
    fat,
    fibre,
    glycemicLoad,
    band: fascia,
    unresolved: items.reduce((total, item) => total + item.unresolved, 0),
  }
}

export function MealSessionProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation()
  const defaultMealName = t('share.meal.fallbackTitle')
  const [name, setMealName] = useState(defaultMealName)
  const [hasCustomName, setHasCustomName] = useState(false)
  const [startedAt, setStartedAt] = useState<number | null>(null)
  const [entries, setEntries] = useState<MealSessionEntry[]>([])

  useEffect(() => {
    if (!hasCustomName) setMealName(defaultMealName)
  }, [defaultMealName, hasCustomName])

  const setName = useCallback((value: string) => {
    const normalized = value.slice(0, 60)
    setMealName(normalized)
    setHasCustomName(true)
  }, [])

  const clearMeal = useCallback(() => {
    setEntries([])
    setStartedAt(null)
    setMealName(defaultMealName)
    setHasCustomName(false)
  }, [defaultMealName])

  const startCompleteMeal = useCallback(() => {
    if (startedAt !== null && Date.now() - startedAt > COMPLETE_MEAL_TTL_MS) {
      clearMeal()
    }
  }, [clearMeal, startedAt])

  const addItem = useCallback((item: MealItem): MealSessionEntry => {
    const now = Date.now()
    const expired = startedAt !== null && now - startedAt > COMPLETE_MEAL_TTL_MS
    const entry = {
      id: `m${now.toString(36)}${sessionCounter++}`,
      item: { ...item, source: { ...item.source } } as MealItem,
      addedAt: now,
    }
    if (expired) {
      setMealName(defaultMealName)
      setHasCustomName(false)
    }
    setStartedAt((current) => (
      current === null || now - current > COMPLETE_MEAL_TTL_MS ? now : current
    ))
    setEntries((current) => expired ? [entry] : [...current, entry])
    return entry
  }, [defaultMealName, startedAt])

  const updateItem = useCallback((id: string, item: MealItem) => {
    setEntries((current) => current.map((entry) => (
      entry.id === id
        ? { ...entry, item: { ...item, source: { ...item.source } } as MealItem }
        : entry
    )))
  }, [])

  const removeItem = useCallback((id: string) => {
    setEntries((current) => {
      const next = current.filter((entry) => entry.id !== id)
      if (!next.length) setStartedAt(null)
      return next
    })
  }, [])

  const summary = useMemo(() => summarize(entries), [entries])
  const value = useMemo<MealSessionValue>(() => ({
    name,
    startedAt,
    entries,
    summary,
    setName,
    startCompleteMeal,
    addItem,
    updateItem,
    removeItem,
    clearMeal,
  }), [
    addItem,
    clearMeal,
    entries,
    name,
    removeItem,
    setName,
    startedAt,
    startCompleteMeal,
    summary,
    updateItem,
  ])

  return <MealSessionContext.Provider value={value}>{children}</MealSessionContext.Provider>
}

export function useMealSession(): MealSessionValue {
  const value = useContext(MealSessionContext)
  if (!value) throw new Error('useMealSession must be used inside MealSessionProvider')
  return value
}
