import { describe, expect, it } from 'vitest'
import { getFoodByCatalogId } from '../catalog/foodCatalog'
import { calculateIngredientNutrition, calculateMealNutrition, normalizeEditedGrams } from './nutritionCalculator'
import type { AnalizzaIngredient } from '../types/analysis'

const spaghetti = getFoodByCatalogId('spaghetti-cotti-al-dente')!

describe('calculateIngredientNutrition — formula VERIFIED valore × grammi / 100', () => {
  it.each([
    [50, 14.53],
    [100, 29.06],
    [200, 58.12],
  ])('scala i carboidrati disponibili per %i g', (grams, expectedCarbs) => {
    expect(calculateIngredientNutrition(spaghetti, grams).carboidrati_disponibili_g).toBeCloseTo(expectedCarbs, 10)
  })
})

describe('calculateMealNutrition', () => {
  const carbonaraCatalogPortions: AnalizzaIngredient[] = [
    { nome: 'Spaghetti', catalogo_id: 'spaghetti-cotti-al-dente', grammi: 180 },
    { nome: 'Guanciale', catalogo_id: 'guanciale', grammi: 30 },
    { nome: 'Uovo', catalogo_id: 'uovo-crudo-intero', grammi: 50 },
    { nome: 'Pecorino', catalogo_id: 'pecorino-romano', grammi: 30 },
  ]

  it('somma il piatto composto e mantiene l’IG dominante degli spaghetti', () => {
    const meal = calculateMealNutrition(carbonaraCatalogPortions)
    expect(meal.totalGrams).toBe(290)
    expect(meal.nutrition.carboidrati_disponibili_g).toBeCloseTo(53.757, 3)
    expect(meal.nutrition.proteine_g).toBeCloseTo(28.66, 2)
    expect(meal.dominantGlycemicIndex).toBe(48)
    expect(meal.unresolved).toHaveLength(0)
  })

  it('non inventa valori per catalogo_id assente o non estratto', () => {
    const meal = calculateMealNutrition([
      { nome: 'zzzxxyyqq-one', grammi: 100 },
      { nome: 'zzzxxyyqq-two', catalogo_id: 'non-estratto', grammi: 50 },
    ])
    expect(meal.resolved).toHaveLength(0)
    expect(meal.unresolved.map((item) => item.reason)).toEqual(['missing_catalog_id', 'catalog_id_not_found'])
  })
})

describe('normalizeEditedGrams — setGrammi #15811', () => {
  it.each([
    [-2, 0],
    [50.6, 51],
    [100, 100],
    [2500, 2000],
    [Number.NaN, 0],
  ])('normalizza %s in %i', (input, expected) => {
    expect(normalizeEditedGrams(input)).toBe(expected)
  })
})
