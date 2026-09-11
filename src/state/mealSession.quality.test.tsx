import { act, renderHook } from '@testing-library/react'
import type { PropsWithChildren } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { MealItem } from '../types/meal'
import { MealSessionProvider, useMealSession } from './mealSession'

const translations = vi.hoisted(() => ({
  fallbackName: 'Pasto predefinito test-only',
}))

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key === 'share.meal.fallbackTitle' ? translations.fallbackName : key,
  }),
}))

const NOW = Date.UTC(2025, 0, 2, 12)
const FOUR_HOURS_MS = 4 * 60 * 60 * 1000

function wrapper({ children }: PropsWithChildren) {
  return <MealSessionProvider>{children}</MealSessionProvider>
}

function structuralMeal(overrides: Partial<MealItem> = {}): MealItem {
  return {
    source: { kind: 'catalog', foodId: 'food-structural-test-only' },
    name: 'Piatto strutturale test-only',
    grams: 100,
    kcal: 250,
    carbs: 20,
    protein: 10,
    fat: 8,
    fibre: 4,
    glycemicLoad: 8,
    band: 'alto',
    unresolved: 0,
    ...overrides,
  }
}

const EMPTY_SUMMARY = {
  plates: 0,
  totalGrams: 0,
  kcal: 0,
  carbs: 0,
  protein: 0,
  fat: 0,
  fibre: 0,
  glycemicLoad: 0,
  band: 'trascurabile',
  unresolved: 0,
} as const

beforeEach(() => {
  translations.fallbackName = 'Pasto predefinito test-only'
  vi.useFakeTimers()
  vi.setSystemTime(NOW)
})

afterEach(() => {
  vi.useRealTimers()
})

describe('boundary, nomi e lifecycle in memoria', () => {
  it('richiede il provider ed espone lo stato iniziale completo', () => {
    expect(() => renderHook(() => useMealSession())).toThrow(
      'useMealSession must be used inside MealSessionProvider',
    )
    const { result } = renderHook(() => useMealSession(), { wrapper })
    expect(result.current.name).toBe('Pasto predefinito test-only')
    expect(result.current.startedAt).toBeNull()
    expect(result.current.entries).toEqual([])
    expect(result.current.summary).toEqual(EMPTY_SUMMARY)
  })

  it('segue il fallback finché il nome non è custom, limita a 60 senza trim e clear ripristina', () => {
    const { result, rerender } = renderHook(() => useMealSession(), { wrapper })
    translations.fallbackName = 'Fallback aggiornato test-only'
    rerender()
    expect(result.current.name).toBe('Fallback aggiornato test-only')

    const custom = `  ${'x'.repeat(70)}`
    act(() => result.current.setName(custom))
    expect(result.current.name).toBe(custom.slice(0, 60))
    expect(result.current.name.startsWith('  ')).toBe(true)

    translations.fallbackName = 'Fallback successivo test-only'
    rerender()
    expect(result.current.name).toBe(custom.slice(0, 60))
    act(() => result.current.clearMeal())
    expect(result.current.name).toBe('Fallback successivo test-only')
    expect(result.current.summary).toEqual(EMPTY_SUMMARY)
  })

  it('conserva lo stato durante rerender, lo perde al remount e non usa gli storage', () => {
    const setItem = vi.spyOn(Storage.prototype, 'setItem')
    const first = renderHook(() => useMealSession(), { wrapper })
    act(() => {
      first.result.current.setName('Nome effimero')
      first.result.current.addItem(structuralMeal())
    })
    first.rerender()
    expect(first.result.current.entries).toHaveLength(1)
    expect(first.result.current.name).toBe('Nome effimero')
    first.unmount()

    const second = renderHook(() => useMealSession(), { wrapper })
    expect(second.result.current.entries).toEqual([])
    expect(second.result.current.startedAt).toBeNull()
    expect(second.result.current.name).toBe('Pasto predefinito test-only')
    expect(setItem).not.toHaveBeenCalled()
  })
})

describe('CRUD e copie difensive', () => {
  it('accoda con timestamp e ID distinti, conserva startedAt e copia item/source in ingresso', () => {
    const { result } = renderHook(() => useMealSession(), { wrapper })
    const firstInput = structuralMeal()
    let returned = undefined as ReturnType<typeof result.current.addItem> | undefined
    act(() => {
      returned = result.current.addItem(firstInput)
      result.current.addItem(structuralMeal({ name: 'Secondo strutturale' }))
    })

    expect(returned).toBeDefined()
    expect(result.current.startedAt).toBe(NOW)
    expect(result.current.entries).toHaveLength(2)
    expect(result.current.entries[0].addedAt).toBe(NOW)
    expect(result.current.entries[0].id).toMatch(new RegExp(`^m${NOW.toString(36)}`))
    expect(result.current.entries[1].id).not.toBe(result.current.entries[0].id)
    expect(result.current.entries[0].item).not.toBe(firstInput)
    expect(result.current.entries[0].item.source).not.toBe(firstInput.source)

    firstInput.name = 'Mutazione esterna'
    if (firstInput.source.kind === 'catalog') firstInput.source.foodId = 'mutated-food-id'
    expect(result.current.entries[0].item.name).toBe('Piatto strutturale test-only')
    expect(result.current.entries[0].item.source).toEqual({
      kind: 'catalog', foodId: 'food-structural-test-only',
    })
  })

  it('aggiorna preservando metadati, ignora ID sconosciuti e copia il nuovo item', () => {
    const { result } = renderHook(() => useMealSession(), { wrapper })
    let id = ''
    act(() => {
      id = result.current.addItem(structuralMeal()).id
    })
    const before = result.current.entries[0]
    const replacement = structuralMeal({
      source: { kind: 'recipe', recipeId: 'recipe-structural-test-only', portions: 2 },
      name: 'Ricetta strutturale',
      grams: 50,
      glycemicLoad: 14,
    })
    act(() => result.current.updateItem(id, replacement))
    const updated = result.current.entries[0]
    expect(updated.id).toBe(before.id)
    expect(updated.addedAt).toBe(before.addedAt)
    expect(updated.item).not.toBe(replacement)
    expect(updated.item.source).not.toBe(replacement.source)
    expect(updated.item.name).toBe('Ricetta strutturale')
    expect(result.current.summary.totalGrams).toBe(50)
    expect(result.current.summary.glycemicLoad).toBe(14)

    const semanticSnapshot = JSON.stringify(result.current.entries)
    act(() => result.current.updateItem('missing', structuralMeal({ name: 'Ignorato' })))
    expect(JSON.stringify(result.current.entries)).toBe(semanticSnapshot)
  })

  it('rimuove selettivamente, azzera startedAt sull’ultima voce e clear resetta tutto', () => {
    const { result } = renderHook(() => useMealSession(), { wrapper })
    let firstId = ''
    let secondId = ''
    act(() => {
      result.current.setName('Nome custom persistente nel mount')
      firstId = result.current.addItem(structuralMeal({ name: 'Prima' })).id
      secondId = result.current.addItem(structuralMeal({ name: 'Seconda' })).id
    })
    act(() => result.current.removeItem(firstId))
    expect(result.current.entries.map(({ id }) => id)).toEqual([secondId])
    expect(result.current.startedAt).toBe(NOW)

    act(() => result.current.removeItem(secondId))
    expect(result.current.entries).toEqual([])
    expect(result.current.startedAt).toBeNull()
    expect(result.current.name).toBe('Nome custom persistente nel mount')

    act(() => result.current.addItem(structuralMeal()))
    expect(result.current.name).toBe('Nome custom persistente nel mount')
    act(() => result.current.clearMeal())
    expect(result.current.entries).toEqual([])
    expect(result.current.startedAt).toBeNull()
    expect(result.current.name).toBe('Pasto predefinito test-only')
    expect(result.current.summary).toEqual(EMPTY_SUMMARY)
  })
})

describe('summary', () => {
  it('somma i campi e ricalcola la fascia indipendentemente dalle fasce delle singole voci', () => {
    const { result } = renderHook(() => useMealSession(), { wrapper })
    act(() => {
      result.current.addItem(structuralMeal({ band: 'trascurabile' }))
      result.current.addItem(structuralMeal({
        name: 'Secondo strutturale',
        grams: 50,
        kcal: 100,
        carbs: 10,
        protein: 5,
        fat: 2,
        fibre: 1,
        glycemicLoad: 14,
        band: 'basso',
        unresolved: 2,
      }))
    })
    expect(result.current.summary).toEqual({
      plates: 2,
      totalGrams: 150,
      kcal: 350,
      carbs: 30,
      protein: 15,
      fat: 10,
      fibre: 5,
      glycemicLoad: 22,
      band: 'alto',
      unresolved: 2,
    })
  })

  it('propaga separatamente i nullable senza perdere le somme sempre definite', () => {
    const { result } = renderHook(() => useMealSession(), { wrapper })
    act(() => {
      result.current.addItem(structuralMeal())
      result.current.addItem(structuralMeal({
        name: 'Nullable strutturale',
        grams: 50,
        kcal: null,
        carbs: 10,
        protein: null,
        fat: null,
        fibre: null,
        glycemicLoad: 2,
        unresolved: 3,
      }))
    })
    expect(result.current.summary).toMatchObject({
      plates: 2,
      totalGrams: 150,
      kcal: null,
      carbs: 30,
      protein: null,
      fat: null,
      fibre: null,
      glycemicLoad: 10,
      unresolved: 3,
    })
  })
})

describe('TTL lazy di quattro ore', () => {
  it('startCompleteMeal non avvia il vuoto, conserva il confine esatto e pulisce solo oltre il TTL', () => {
    const { result } = renderHook(() => useMealSession(), { wrapper })
    act(() => result.current.startCompleteMeal())
    expect(result.current.startedAt).toBeNull()

    act(() => {
      result.current.setName('Nome destinato a scadere')
      result.current.addItem(structuralMeal())
    })
    vi.setSystemTime(NOW + FOUR_HOURS_MS)
    act(() => result.current.startCompleteMeal())
    expect(result.current.entries).toHaveLength(1)
    expect(result.current.startedAt).toBe(NOW)

    vi.setSystemTime(NOW + FOUR_HOURS_MS + 1)
    expect(result.current.entries).toHaveLength(1)
    act(() => result.current.startCompleteMeal())
    expect(result.current.entries).toEqual([])
    expect(result.current.startedAt).toBeNull()
    expect(result.current.name).toBe('Pasto predefinito test-only')
  })

  it('addItem accoda al confine e oltre il TTL sostituisce la sessione con copie e nuovo timestamp', () => {
    const { result } = renderHook(() => useMealSession(), { wrapper })
    act(() => {
      result.current.setName('Nome custom destinato al rollover')
      result.current.addItem(structuralMeal({ name: 'Prima sessione' }))
    })

    vi.setSystemTime(NOW + FOUR_HOURS_MS)
    act(() => result.current.addItem(structuralMeal({ name: 'Al confine' })))
    expect(result.current.entries.map(({ item }) => item.name)).toEqual(['Prima sessione', 'Al confine'])
    expect(result.current.startedAt).toBe(NOW)
    expect(result.current.name).toBe('Nome custom destinato al rollover')

    vi.setSystemTime(NOW + FOUR_HOURS_MS + 1)
    const rolloverInput = structuralMeal({
      source: { kind: 'manual' },
      name: 'Nuova sessione strutturale',
    })
    act(() => result.current.addItem(rolloverInput))
    expect(result.current.entries).toHaveLength(1)
    expect(result.current.entries[0].item.name).toBe('Nuova sessione strutturale')
    expect(result.current.entries[0].item).not.toBe(rolloverInput)
    expect(result.current.startedAt).toBe(NOW + FOUR_HOURS_MS + 1)
    expect(result.current.entries[0].addedAt).toBe(NOW + FOUR_HOURS_MS + 1)
    expect(result.current.name).toBe('Pasto predefinito test-only')
  })
})
