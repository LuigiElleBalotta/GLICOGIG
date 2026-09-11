import { describe, expect, it } from 'vitest'
import { RECIPES, QUIZ_QUESTIONS } from '../catalog/datasets'
import {
  getExtractedCatalogEntries,
  getFoodByCatalogId,
} from '../catalog/foodCatalog'
import type { AnalizzaResponse } from '../types/analysis'
import type { BarcodeProductBoundary, ProdottoBarcode } from '../types/barcode'
import type { FoodCatalogEntry } from '../types/catalog'
import type { Recipe } from '../types/content'
import type { DiaryEntry } from '../types/diary'
import {
  BARCODE_PATTERN,
  correggiSecco,
  normalizzaBarcode,
  num,
  porzioneGrammi,
  prodottoBarcodeDaBoundary,
} from './barcodeProduct'
import {
  N_AL_GIORNO,
  giornoIndice,
  hashQuizQuestionId,
  mescolaOpzioni,
  mulberry32,
  quizDelGiorno,
} from './dailyQuiz'
import {
  calculateGlycemicImpact,
  calcolaImpatto,
  classificaFascia,
  glycemicImpactBand,
  isBevanda,
  pesatoCotto,
  pesoCibo,
  stimaPiattoIntero,
} from './impactCalculator'
import {
  estimateManualImpact,
  mealItemFromAnalysis,
  mealItemFromBarcode,
  mealItemFromFood,
  mealItemFromManual,
  mealItemFromPhoto,
  mealItemFromRecipe,
  recipeMethodEvidence,
  recipeReliability,
} from './meal'
import { formatConfidence } from './nutrition'
import {
  calculateIngredientNutrition,
  calculateMealNutrition,
  effectiveIngredientGrams,
  normalizeEditedGrams,
} from './nutritionCalculator'
import { adjustGlycemicIndexForPreparation, aggiustaIGperPreparazione } from './preparation'
import {
  aggregatoGiorno,
  andamentoSettimana,
  bilancioOggi,
  datiAnelliOggi,
  giorniConsecutivi,
  pastoPiuDifficile,
  piattiPiuFacili,
  progressiOggi,
  progressiSetteGiorni,
  ratioBilancio,
  reportSettimana,
  verdettoSettimana,
} from './progress'
import {
  fattoreCrudo,
  grammiCrudi,
  nomeSenzaCottura,
  normalizeRawWeight,
} from './rawWeight'
import { indiceStabilita, livelloStabilita, qualitaPasto } from './stability'

function verifiedFood(id: string): FoodCatalogEntry {
  const food = getFoodByCatalogId(id)
  if (!food) throw new Error(`Missing VERIFIED food fixture: ${id}`)
  return food
}

function verifiedRecipeFixture(id: string): Recipe {
  const recipe = RECIPES.find((candidate) => candidate.id === id)
  if (!recipe) throw new Error(`Missing VERIFIED recipe fixture: ${id}`)
  return recipe
}

const spaghetti = verifiedFood('spaghetti-cotti-al-dente')
const verifiedRecipe = verifiedRecipeFixture('spaghetti-al-pomodoro')
const verifiedQuestion = QUIZ_QUESTIONS.find(({ id }) => id === 'ig-cg-1')

if (!verifiedQuestion) {
  throw new Error('The required VERIFIED quiz fixture must exist')
}

function bandInput(
  overrides: Partial<Parameters<typeof classificaFascia>[0]> = {},
): Parameters<typeof classificaFascia>[0] {
  return {
    cg: 5,
    carbo: 10,
    ig: 50,
    fibre: null,
    proteine: null,
    grassi: null,
    fibre100: null,
    proteine100: null,
    grassi100: null,
    zuccheri100: null,
    carbo100: null,
    liquido: false,
    ...overrides,
  }
}

function testOnlyBarcode(overrides: Partial<ProdottoBarcode> = {}): ProdottoBarcode {
  return {
    codice: '12345678',
    nome: 'Prodotto fixture test-only',
    carbo100: 20,
    carboCorretto: false,
    zuccheri100: 2,
    fibre100: 3,
    proteine100: 4,
    grassi100: 5,
    porzioneG: 30,
    ...overrides,
  }
}

const REFERENCE = new Date(2026, 0, 14, 12, 0, 0, 0)

function localDayAt(offset: number): string {
  const date = new Date(REFERENCE)
  date.setDate(date.getDate() - offset)
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-')
}

function localTimestamp(hour = 12, minute = 0, offset = 0): number {
  const date = new Date(REFERENCE)
  date.setDate(date.getDate() - offset)
  date.setHours(hour, minute, 0, 0)
  return date.getTime()
}

let diarySequence = 0
function testOnlyDiaryEntry(overrides: Partial<DiaryEntry> = {}): DiaryEntry {
  diarySequence += 1
  return {
    id: `test-entry-${diarySequence}`,
    ts: localTimestamp(),
    giorno: localDayAt(0),
    nome: 'Pasto fixture test-only',
    nome_en: null,
    nome_es: null,
    nome_de: null,
    nome_fr: null,
    fonte: null,
    fascia: 'basso',
    cg: 10,
    kcal: 100,
    carbo: 10,
    prot: 0,
    grassi: 0,
    fibre: 0,
    grammi: 100,
    ...overrides,
  }
}

function diaryWithRatio(offset: number, ratio: number, id: string): DiaryEntry {
  return testOnlyDiaryEntry({
    id,
    giorno: localDayAt(offset),
    ts: localTimestamp(12, 0, offset),
    carbo: 10,
    prot: ratio * 10,
  })
}

function recipeWithFoodIds(ids: readonly string[]): Recipe {
  const ingredient = verifiedRecipe.ingredienti[0]
  if (!ingredient) throw new Error('The VERIFIED recipe needs an ingredient fixture')
  return {
    ...verifiedRecipe,
    ingredienti: ids.map((id) => ({ ...ingredient, id })),
  }
}

describe('impactCalculator — bande, classificazione e riconoscimento', () => {
  it.each([
    [-1, 'basso'],
    [10, 'basso'],
    [10.01, 'medio'],
    [19, 'medio'],
    [19.01, 'alto'],
  ] as const)('classifica il carico %s nella banda %s', (load, expected) => {
    expect(glycemicImpactBand(load)).toBe(expected)
  })

  it('rende trascurabili meno di 5 g di carboidrati anche con CG alto', () => {
    expect(classificaFascia(bandInput({ cg: 30, carbo: 4, ig: 80 }))).toEqual({
      fascia: 'trascurabile',
      veloce: false,
      zucchero: false,
    })
  })

  it('alza un alimento veloce da basso a medio al confine IG 60', () => {
    expect(classificaFascia(bandInput({ ig: 60 }))).toEqual({
      fascia: 'medio',
      veloce: true,
      zucchero: false,
    })
  })

  it('non considera veloce un alimento con freni esattamente pari a 5', () => {
    expect(classificaFascia(bandInput({ ig: 70, fibre100: 2.5 }))).toEqual({
      fascia: 'basso',
      veloce: false,
      zucchero: false,
    })
  })

  it('inferisce i freni per 100 g dai totali e dal peso ricavato', () => {
    expect(classificaFascia(bandInput({
      ig: 70,
      carbo: 10,
      carbo100: 20,
      fibre: 2,
    })).veloce).toBe(false)
  })

  it('riconosce la soglia zucchero e porta ad alto solo con zuccheri elevati o liquido', () => {
    const sugary = classificaFascia(bandInput({
      zuccheri100: 8,
      carbo100: 10,
      fibre100: 0,
    }))
    const highSugar = classificaFascia(bandInput({
      zuccheri100: 15,
      carbo100: 20,
      fibre100: 0,
    }))
    const liquid = classificaFascia(bandInput({ ig: 60, liquido: true }))

    expect(sugary).toEqual({ fascia: 'medio', veloce: true, zucchero: true })
    expect(highSugar).toEqual({ fascia: 'alto', veloce: true, zucchero: true })
    expect(liquid).toEqual({ fascia: 'alto', veloce: true, zucchero: false })
  })

  it('gestisce macro e IG null senza inventare velocità', () => {
    expect(classificaFascia(bandInput({
      cg: 20,
      carbo: null,
      ig: null,
    }))).toEqual({ fascia: 'alto', veloce: false, zucchero: false })
  })

  it.each([
    [null, false],
    ['Insalata', false],
    ['Spaghetti al pomodoro', true],
    ['RISO basmati', true],
  ] as const)('pesatoCotto(%s) restituisce %s', (name, expected) => {
    expect(pesatoCotto(name)).toBe(expected)
  })

  it('riconosce bevande per categoria esatta o nome, senza falsi positivi null', () => {
    expect(isBevanda(null, null)).toBe(false)
    expect(isBevanda('Elemento neutro', 'Bevande')).toBe(true)
    expect(isBevanda('Caffè espresso', null)).toBe(true)
    expect(isBevanda('Elemento neutro', 'bevande')).toBe(false)
  })

  it('somma soltanto grammi positivi non liquidi', () => {
    expect(pesoCibo([
      { nome: 'Spaghetti', catalogo_id: spaghetti.id, grammi: 180 },
      { nome: 'Acqua', grammi: 250 },
      { nome: 'Solido fixture', grammi: -20 },
      { nome: 'Solido fixture', grammi: 30 },
    ])).toBe(210)
  })
})

describe('impactCalculator — stima e calcolo integrato', () => {
  it.each([
    [null, 350],
    ['', 350],
    ['Piatto sconosciuto', 350],
    ['Risotto', 350],
    ['Pizza', 0],
  ] as const)('non stima %s con peso %s', (name, weight) => {
    expect(stimaPiattoIntero(name, weight)).toBeNull()
  })

  it('stima il profilo pizza ai confini positivi e conserva il limite negativo corrente', () => {
    expect(stimaPiattoIntero('Pizza margherita', 350)).toEqual({ carbo: 105, cg: 74, ig: 70 })
    expect(stimaPiattoIntero('Pizza', -100)).toEqual({ carbo: -30, cg: -21, ig: 70 })
  })

  it('restituisce un impatto vuoto completo senza ingredienti', () => {
    expect(calcolaImpatto([])).toEqual({
      cg: 0,
      carbo: 0,
      fibre: 0,
      prot: 0,
      grassi: 0,
      ig: null,
      fascia: 'trascurabile',
      trovati: 0,
      totali: 0,
      affidabilita: 'bassa',
      contributi: [],
      cotto: false,
      pianoIntero: false,
    })
  })

  it('calcola gli expected VERIFIED degli spaghetti per 100 g', () => {
    expect(calcolaImpatto([
      { nome: 'Spaghetti', catalogo_id: spaghetti.id, grammi: 100 },
    ])).toMatchObject({
      cg: 13.9,
      carbo: 29,
      fibre: 1.8,
      prot: 5.8,
      grassi: 0.9,
      ig: 48,
      fascia: 'medio',
      trovati: 1,
      totali: 1,
      affidabilita: 'media',
      contributi: [{ nome: 'Spaghetti cotti al dente', cg: 13.9 }],
      cotto: true,
      pianoIntero: false,
    })
  })

  it('usa la porzione VERIFIED quando i grammi richiesti sono zero', () => {
    const impact = calcolaImpatto([
      { nome: 'Spaghetti', catalogo_id: spaghetti.id, grammi: 0 },
    ])
    expect(impact).toMatchObject({ cg: 25.1, carbo: 52, ig: 48, trovati: 1 })
  })

  it('risolve per nome univoco se ID manca e non risolve i nomi ambigui', () => {
    const impact = calcolaImpatto([
      { nome: 'Spaghetti cotti al dente', grammi: 100 },
      { nome: 'riso', grammi: 100 },
    ])
    expect(impact.trovati).toBe(1)
    expect(impact.totali).toBe(2)
    expect(impact.affidabilita).toBe('bassa')
  })

  it('omette contributi sotto 0,5 ma conta il record trovato', () => {
    const impact = calcolaImpatto([
      { nome: 'Spaghetti', catalogo_id: spaghetti.id, grammi: 1 },
    ])
    expect(impact.trovati).toBe(1)
    expect(impact.contributi).toEqual([])
  })

  it('applica una stima piatto intero a una fixture strutturale senza dati nutrizionali', () => {
    expect(calcolaImpatto([
      { nome: 'Componente strutturale test-only', grammi: 350 },
    ], 'Pizza')).toMatchObject({
      cg: 74,
      carbo: 105,
      ig: 70,
      fascia: 'alto',
      trovati: 0,
      totali: 1,
      affidabilita: 'bassa',
      pianoIntero: true,
    })
  })

  it('mantiene equivalenti gli export italiano e inglese', () => {
    const ingredients = [{ nome: spaghetti.nome, catalogo_id: spaghetti.id, grammi: 100 }]
    expect(calculateGlycemicImpact(ingredients)).toEqual(calcolaImpatto(ingredients))
  })
})

describe('stability', () => {
  it.each([
    [10, 'basso', 100],
    [10, 'medio', 80],
    [10, 'alto', 45],
    [20, 'basso', 78],
    [60, 'basso', 15],
  ] as const)('qualità CG %s / %s = %s', (cg, band, expected) => {
    expect(qualitaPasto(cg, band)).toBe(expected)
  })

  it('restituisce null sul vuoto e una media pesata arrotondata', () => {
    expect(indiceStabilita([])).toBeNull()
    expect(indiceStabilita([
      { cg: 10, fascia: 'basso' },
      { cg: 20, fascia: 'medio' },
    ])).toBe(85)
  })

  it('tratta null, zero e NaN come CG zero col peso minimo 8', () => {
    expect(indiceStabilita([
      { cg: null, fascia: 'basso' },
      { cg: 0, fascia: 'basso' },
      { cg: Number.NaN, fascia: 'basso' },
    ])).toBe(100)
  })

  it.each([
    [85, 'moltoStabile'],
    [84, 'bellaGiornata'],
    [70, 'bellaGiornata'],
    [69, 'nellaMedia'],
    [55, 'nellaMedia'],
    [54, 'impegnativa'],
  ] as const)('mappa indice %s su %s', (index, expected) => {
    expect(livelloStabilita(index)).toBe(expected)
  })
})

describe('preparation', () => {
  it.each([
    [undefined, undefined, 48],
    ['al dente', undefined, 43],
    ['molto cotto', undefined, 55],
    ['freddo', undefined, 42],
    ['con limone', undefined, 44],
    [undefined, 'Pasta al dente', 43],
  ] as const)('aggiusta IG 48 con %s / %s a %s', (preparation, name, expected) => {
    expect(aggiustaIGperPreparazione(48, preparation, name)).toBe(expected)
  })

  it('combina i fattori e limita la variazione a 25 punti', () => {
    expect(aggiustaIGperPreparazione(48, 'al dente freddo con limone')).toBe(35)
    expect(aggiustaIGperPreparazione(100, 'al dente freddo con limone')).toBe(75)
  })

  it('clampa il risultato globale tra 1 e 100', () => {
    expect(aggiustaIGperPreparazione(1, 'freddo con limone')).toBe(1)
    expect(aggiustaIGperPreparazione(100, 'molto cotto')).toBe(100)
  })

  it('espone un alias inglese equivalente', () => {
    expect(adjustGlycemicIndexForPreparation(48, 'freddo')).toBe(
      aggiustaIGperPreparazione(48, 'freddo'),
    )
  })
})

describe('rawWeight', () => {
  it.each([
    [Number.NaN, 0],
    [Number.POSITIVE_INFINITY, 0],
    [Number.NEGATIVE_INFINITY, 0],
    [-1, 0],
    [0, 0],
    [50.5, 51],
    [2000, 2000],
    [2000.5, 2000],
  ] as const)('normalizza %s in %s', (input, expected) => {
    expect(normalizeRawWeight(input)).toBe(expected)
  })

  it.each([
    ['Pasta fresca cotta', 1.9],
    ['Spaghetti cotti', 2.3],
    ['Riso integrale cotto', 3.3],
    ['Risotto cotto', 2.8],
    ['Couscous cotto', 2.8],
    ['Quinoa cotta', 2.8],
    ['Farro bollito', 2.5],
    ['Polenta cotta', 4],
    ['Ceci lessi', 2.4],
  ] as const)('riconosce fattore crudo di %s', (name, expected) => {
    expect(fattoreCrudo(name)).toBe(expected)
  })

  it('richiede un marker di cottura e restituisce null per regole assenti', () => {
    expect(fattoreCrudo('Pasta al dente')).toBeNull()
    expect(fattoreCrudo('Ingrediente cotto sconosciuto')).toBeNull()
  })

  it('converte senza clamp e gestisce il fattore assente', () => {
    expect(grammiCrudi('Spaghetti cotti', 180)).toBe(78)
    expect(grammiCrudi('Insalata', 100)).toBeNull()
    expect(grammiCrudi('Polenta cotta', -40)).toBe(-10)
  })

  it('rimuove soltanto i suffissi di cottura previsti', () => {
    expect(nomeSenzaCottura('Spaghetti cotti al dente')).toBe('Spaghetti')
    expect(nomeSenzaCottura('Ceci lessi')).toBe('Ceci')
    expect(nomeSenzaCottura('Porridge')).toBe('Porridge')
    expect(nomeSenzaCottura('')).toBe('')
  })
})

describe('dailyQuiz', () => {
  it('produce generatori deterministici, limitati a [0, 1), e dipendenti dal seed', () => {
    const first = mulberry32(123)
    const second = mulberry32(123)
    const different = mulberry32(124)
    const firstValues = [first(), first(), first()]
    expect(firstValues).toEqual([second(), second(), second()])
    expect(firstValues.every((value) => value >= 0 && value < 1)).toBe(true)
    expect(firstValues).not.toEqual([different(), different(), different()])
  })

  it('calcola hash unsigned deterministici e sensibili a contenuto/case', () => {
    expect(hashQuizQuestionId('ig-cg-1')).toBe(hashQuizQuestionId('ig-cg-1'))
    expect(hashQuizQuestionId('ig-cg-1')).not.toBe(hashQuizQuestionId('IG-CG-1'))
    expect(hashQuizQuestionId('')).toBe(2_166_136_261)
    expect(hashQuizQuestionId('é')).toBeGreaterThanOrEqual(0)
  })

  it.each([
    ['1970-01-01T00:00:00.000Z', 0],
    ['1970-01-01T23:59:59.999Z', 0],
    ['1970-01-02T00:00:00.000Z', 1],
    ['1969-12-31T23:59:59.999Z', -1],
  ] as const)('calcola giorno UTC di %s', (iso, expected) => {
    expect(giornoIndice(new Date(iso))).toBe(expected)
  })

  it('mescola tutte le lingue con la stessa permutazione senza mutare il payload VERIFIED', () => {
    const originalItalian = [...verifiedQuestion.opzioni]
    const originalCorrect = verifiedQuestion.opzioni[verifiedQuestion.corretta]
    const shuffled = mescolaOpzioni(verifiedQuestion, 42)

    expect(shuffled.opzioni[shuffled.corretta]).toBe(originalCorrect)
    shuffled.opzioni.forEach((option, index) => {
      const sourceIndex = verifiedQuestion.opzioni.indexOf(option)
      expect(sourceIndex).toBeGreaterThanOrEqual(0)
      expect(shuffled.opzioni_en[index]).toBe(verifiedQuestion.opzioni_en[sourceIndex])
      expect(shuffled.opzioni_es[index]).toBe(verifiedQuestion.opzioni_es[sourceIndex])
      expect(shuffled.opzioni_de[index]).toBe(verifiedQuestion.opzioni_de[sourceIndex])
      expect(shuffled.opzioni_fr[index]).toBe(verifiedQuestion.opzioni_fr[sourceIndex])
    })
    expect(verifiedQuestion.opzioni).toEqual(originalItalian)
  })

  it('rifiuta opzioni localizzate disallineate e indici corretti fuori range', () => {
    const misaligned = { ...verifiedQuestion, opzioni_en: [] }
    const negativeCorrect = { ...verifiedQuestion, corretta: -1 }
    const excessiveCorrect = { ...verifiedQuestion, corretta: verifiedQuestion.opzioni.length }

    expect(() => mescolaOpzioni(misaligned, 1)).toThrow(/misaligned localized options/)
    expect(() => mescolaOpzioni(negativeCorrect, 1)).toThrow(/invalid correct option/)
    expect(() => mescolaOpzioni(excessiveCorrect, 1)).toThrow(/invalid correct option/)
  })

  it('seleziona dieci domande allineate e deterministiche per una data UTC fissa', () => {
    const date = new Date('2026-08-07T12:00:00.000Z')
    const first = quizDelGiorno(date)
    const second = quizDelGiorno(date)

    expect(first).toHaveLength(N_AL_GIORNO)
    expect(first).toEqual(second)
    expect(new Set(first.map(({ id }) => id)).size).toBe(N_AL_GIORNO)
    first.forEach((question) => {
      expect(question.opzioni_en).toHaveLength(question.opzioni.length)
      expect(question.opzioni_es).toHaveLength(question.opzioni.length)
      expect(question.opzioni_de).toHaveLength(question.opzioni.length)
      expect(question.opzioni_fr).toHaveLength(question.opzioni.length)
      expect(question.corretta).toBeGreaterThanOrEqual(0)
      expect(question.corretta).toBeLessThan(question.opzioni.length)
    })
  })

  it('cambia la finestra giornaliera alla mezzanotte UTC', () => {
    const before = quizDelGiorno(new Date('2026-08-07T23:59:59.999Z'))
    const after = quizDelGiorno(new Date('2026-08-08T00:00:00.000Z'))
    expect(after).not.toEqual(before)
  })
})

describe('barcodeProduct', () => {
  it('mantiene il pattern pubblico coerente con la normalizzazione', () => {
    expect(BARCODE_PATTERN.test('123456')).toBe(true)
    expect(BARCODE_PATTERN.test('12345678901234')).toBe(true)
    expect(BARCODE_PATTERN.test('12345')).toBe(false)
  })

  it.each([
    [' 123456 ', '123456'],
    ['12345678901234', '12345678901234'],
    ['', null],
    ['12345', null],
    ['123456789012345', null],
    ['123 456', null],
    ['12345A', null],
  ] as const)('normalizza barcode %s', (input, expected) => {
    expect(normalizzaBarcode(input)).toBe(expected)
  })

  it.each([
    [12, 12],
    ['12.5', 12.5],
    ['12abc', 12],
    ['', null],
    [null, null],
    [undefined, null],
    [Number.POSITIVE_INFINITY, null],
  ] as const)('converte valore numerico %s', (input, expected) => {
    expect(num(input)).toBe(expected)
  })

  it.each([
    ['30 g', 30],
    ['30,5 ml', 30.5],
    ['0 g', 0],
    ['30 oz', null],
    [undefined, null],
    ['-5 g', 5],
  ] as const)('estrae porzione %s nel limite runtime corrente', (input, expected) => {
    expect(porzioneGrammi(input)).toBe(expected)
  })

  it('corregge i secchi sotto la soglia 85% e rispetta il confine inclusivo', () => {
    expect(correggiSecco('Cracker fixture', null)).toEqual({ carbo100: 68, carboCorretto: true })
    expect(correggiSecco('Cracker fixture', 57.79)).toEqual({ carbo100: 68, carboCorretto: true })
    expect(correggiSecco('Cracker fixture', 57.8)).toEqual({ carbo100: 57.8, carboCorretto: false })
    expect(correggiSecco('Prodotto non secco', 12)).toEqual({ carbo100: 12, carboCorretto: false })
  })

  it('mappa e ripulisce una boundary strutturale test-only', () => {
    const boundary = {
      product_name_it: ' Nome italiano ',
      product_name: 'Generic name',
      brands: ' Marca uno, Marca due ',
      image_front_small_url: ' https://images.openfoodfacts.org/images/products/123/456/78/front_small.jpg ',
      serving_size: '30,5 g',
      nutriments: {
        carbohydrates_100g: '20.5',
        sugars_100g: '2',
        fiber_100g: 3,
        proteins_100g: '4.5',
        fat_100g: 5,
      },
    } satisfies BarcodeProductBoundary

    expect(prodottoBarcodeDaBoundary('12345678', boundary)).toEqual({
      codice: '12345678',
      nome: 'Nome italiano',
      marca: 'Marca uno',
      immagine: 'https://images.openfoodfacts.org/images/products/123/456/78/front_small.jpg',
      carbo100: 20.5,
      carboCorretto: false,
      zuccheri100: 2,
      fibre100: 3,
      proteine100: 4.5,
      grassi100: 5,
      porzioneG: 30.5,
    })
  })

  it('preferisce il nome generico e lascia null i nutrienti boundary assenti', () => {
    expect(prodottoBarcodeDaBoundary('non-normalizzato', {
      product_name_it: '   ',
      product_name: ' Nome generico ',
    })).toEqual({
      codice: 'non-normalizzato',
      nome: 'Nome generico',
      marca: undefined,
      immagine: undefined,
      carbo100: null,
      carboCorretto: false,
      zuccheri100: null,
      fibre100: null,
      proteine100: null,
      grassi100: null,
      porzioneG: null,
    })
  })
})

describe('nutrition', () => {
  it.each([
    [undefined, null],
    [Number.NaN, null],
    [Number.POSITIVE_INFINITY, null],
    [0, '0%'],
    [0.756, '76%'],
    [1, '100%'],
    [-1, '-1'],
    [2, '2'],
  ] as const)('formatta confidence %s come %s', (input, expected) => {
    expect(formatConfidence(input)).toBe(expected)
  })
})

describe('nutritionCalculator', () => {
  it.each([
    [-1, 0],
    [0, 0],
    [50.5, 51],
    [2000, 2000],
    [2001, 2000],
    [Number.NaN, 0],
    [Number.POSITIVE_INFINITY, 2000],
    [Number.NEGATIVE_INFINITY, 0],
  ] as const)('normalizza grammi editati %s in %s', (input, expected) => {
    expect(normalizeEditedGrams(input)).toBe(expected)
  })

  it('usa ogni richiesta positiva e altrimenti la porzione VERIFIED', () => {
    expect(effectiveIngredientGrams(spaghetti, 50.25)).toBe(50.25)
    expect(effectiveIngredientGrams(spaghetti, 0)).toBe(spaghetti.porzione_standard_g)
    expect(effectiveIngredientGrams(spaghetti, -1)).toBe(spaghetti.porzione_standard_g)
    expect(effectiveIngredientGrams(spaghetti, Number.POSITIVE_INFINITY)).toBe(Number.POSITIVE_INFINITY)
  })

  it('scala ogni nutriente e preserva i null di una fixture strutturale', () => {
    const structuralUnknown = { ...spaghetti, energia_kcal: null } satisfies FoodCatalogEntry
    const nutrition = calculateIngredientNutrition(structuralUnknown, 50)
    expect(nutrition.energia_kcal).toBeNull()
    expect(nutrition.carboidrati_disponibili_g).toBeCloseTo(14.53, 10)
  })

  it('restituisce aggregati zero coerenti sul pasto vuoto', () => {
    const meal = calculateMealNutrition([])
    expect(meal.totalGrams).toBe(0)
    expect(meal.resolved).toEqual([])
    expect(meal.unresolved).toEqual([])
    expect(meal.dominantGlycemicIndex).toBeNull()
    expect(meal.unknownNutritionFields).toEqual([])
    expect(Object.values(meal.nutrition).every((value) => value === 0)).toBe(true)
    expect(Object.values(meal.per100).every((value) => value === 0)).toBe(true)
  })

  it('dà precedenza all’ID e usa il nome come fallback per ID assente o errato', () => {
    const meal = calculateMealNutrition([
      { nome: 'Nome volutamente errato', catalogo_id: spaghetti.id, grammi: 100 },
      { nome: spaghetti.nome, catalogo_id: 'id-assente', grammi: 100 },
      { nome: spaghetti.nome, grammi: 100 },
    ])
    expect(meal.resolved.map(({ resolvedBy }) => resolvedBy)).toEqual([
      'catalog_id',
      'name',
      'name',
    ])
    expect(meal.unresolved).toEqual([])
  })

  it('distingue ambiguity, ID mancante e ID non trovato', () => {
    const meal = calculateMealNutrition([
      { nome: 'riso', grammi: 100 },
      { nome: 'Ingrediente inesistente test-only', grammi: 100 },
      { nome: 'Ingrediente inesistente test-only', catalogo_id: 'id-assente', grammi: 100 },
    ])
    expect(meal.unresolved.map(({ reason }) => reason)).toEqual([
      'ambiguous_name',
      'missing_catalog_id',
      'catalog_id_not_found',
    ])
    expect(meal.unresolved[0].candidateIds).toEqual(
      [...(meal.unresolved[0].candidateIds ?? [])].sort(),
    )
  })

  it('usa il totale grezzo per per-100 ma arrotonda i grammi esposti', () => {
    const meal = calculateMealNutrition([
      { nome: spaghetti.nome, catalogo_id: spaghetti.id, grammi: 50.4 },
    ])
    expect(meal.totalGrams).toBe(50)
    expect(meal.per100.carboidrati_disponibili_g).toBeCloseTo(29.06, 10)
  })

  it('propaga i null realmente presenti nel dataset VERIFIED', () => {
    const foodWithUnknownEnergy = getExtractedCatalogEntries()
      .find((food) => food.energia_kcal === null)
    expect(foodWithUnknownEnergy).toBeDefined()
    if (!foodWithUnknownEnergy) return

    const meal = calculateMealNutrition([
      { nome: foodWithUnknownEnergy.nome, catalogo_id: foodWithUnknownEnergy.id, grammi: 100 },
    ])
    expect(meal.nutrition.energia_kcal).toBeNull()
    expect(meal.per100.energia_kcal).toBeNull()
    expect(meal.unknownNutritionFields).toContain('energia_kcal')
  })

  it('sceglie l’IG del contributo glicemico positivo dominante', () => {
    const meal = calculateMealNutrition([
      { nome: spaghetti.nome, catalogo_id: spaghetti.id, grammi: 100 },
      { nome: 'Guanciale', catalogo_id: 'guanciale', grammi: 100 },
    ])
    expect(meal.dominantGlycemicIndex).toBe(spaghetti.ig_medio)
  })
})

describe('meal', () => {
  it('rifiuta una analisi non-cibo e conserva origine/nome fallback per un cibo', () => {
    const notFood = { e_cibo: false, ingredienti: [] } satisfies AnalizzaResponse
    const food = { e_cibo: true, ingredienti: [] } satisfies AnalizzaResponse
    expect(mealItemFromAnalysis(notFood, 'text', 'Fallback')).toBeNull()
    expect(mealItemFromAnalysis(food, 'text', 'Fallback')).toMatchObject({
      source: { kind: 'photo', analysisOrigin: 'text' },
      name: 'Fallback',
      grams: 0,
      unresolved: 0,
    })
    expect(mealItemFromPhoto(food, 'Foto')).toMatchObject({
      source: { kind: 'photo', analysisOrigin: 'photo' },
      name: 'Foto',
    })
  })

  it('crea comunque un item da analisi con ingredienti irrisolti', () => {
    const item = mealItemFromAnalysis({
      e_cibo: true,
      piatto: 'Piatto fixture test-only',
      ingredienti: [{ nome: 'Inesistente test-only', grammi: 100 }],
    }, 'photo', 'Fallback')
    expect(item).toMatchObject({
      name: 'Piatto fixture test-only',
      grams: 0,
      glycemicLoad: 0,
      unresolved: 1,
    })
  })

  it('crea un item catalogo usando la porzione standard VERIFIED', () => {
    const item = mealItemFromFood(spaghetti, 0)
    expect(item).toMatchObject({
      source: { kind: 'catalog', foodId: spaghetti.id },
      name: spaghetti.nome,
      grams: spaghetti.porzione_standard_g,
      carbs: 52,
      glycemicLoad: 22.5,
      unresolved: 0,
    })
    expect(item.kcal).toBeCloseTo(284.4, 10)
  })

  it('rifiuta barcode senza nome, carboidrati validi o IG', () => {
    const noIndexFood = getExtractedCatalogEntries().find((food) => food.ig_medio === null)
    expect(mealItemFromBarcode(testOnlyBarcode({ nome: null }), spaghetti, 100)).toBeNull()
    expect(mealItemFromBarcode(testOnlyBarcode({ carbo100: null }), spaghetti, 100)).toBeNull()
    expect(mealItemFromBarcode(testOnlyBarcode({ carbo100: -1 }), spaghetti, 100)).toBeNull()
    expect(noIndexFood).toBeDefined()
    if (noIndexFood) {
      expect(mealItemFromBarcode(testOnlyBarcode(), noIndexFood, 100)).toBeNull()
    }
  })

  it('clampa i grammi barcode e preserva macro null test-only', () => {
    const minimum = mealItemFromBarcode(testOnlyBarcode({
      fibre100: null,
      proteine100: null,
      grassi100: null,
    }), spaghetti, 0)
    const maximum = mealItemFromBarcode(testOnlyBarcode(), spaghetti, 3000)

    expect(minimum).toMatchObject({ grams: 1, carbs: 0.2, fibre: null, protein: null, fat: null })
    expect(maximum?.grams).toBe(2000)
  })

  it('estrae quantità e velocità dalla ricetta VERIFIED', () => {
    const evidence = recipeMethodEvidence(verifiedRecipe)
    expect(evidence.quantity?.food.id).toBe('spaghetti-cotti-al-dente')
    expect(evidence.speed?.food.id).toBe('spaghetti-cotti-al-dente')
    expect(evidence.quantity?.carbohydrateContribution).toBeGreaterThan(0)
    expect(evidence.speed?.glycemicContribution).toBeGreaterThan(0)
    expect(recipeMethodEvidence({ ...verifiedRecipe, ingredienti: [] })).toEqual({
      quantity: null,
      speed: null,
    })
  })

  it('scala la ricetta VERIFIED e clampa porzioni tra 0,5 e 2', () => {
    const standard = mealItemFromRecipe(verifiedRecipe, 1)
    const minimum = mealItemFromRecipe(verifiedRecipe, 0)
    const maximum = mealItemFromRecipe(verifiedRecipe, 3)

    expect(standard).toMatchObject({
      source: { kind: 'recipe', recipeId: verifiedRecipe.id, portions: 1 },
      grams: 301,
      kcal: 438,
      carbs: 56.8,
      protein: 15.3,
      fat: 14.5,
      fibre: 4.8,
      glycemicLoad: 25.1,
      band: 'alto',
    })
    expect(minimum.source).toMatchObject({ portions: 0.5 })
    expect(minimum.glycemicLoad).toBeCloseTo(12.55, 10)
    expect(maximum.source).toMatchObject({ portions: 2 })
    expect(maximum.glycemicLoad).toBeCloseTo(50.2, 10)
  })

  it('espone NaN per porzioni NaN come limite runtime corrente', () => {
    const item = mealItemFromRecipe(verifiedRecipe, Number.NaN)
    expect(item.source).toMatchObject({ portions: Number.NaN })
    expect(item.grams).toBeNaN()
    expect(item.glycemicLoad).toBeNaN()
  })

  it('stima input manuali da catalogo localizzato o euristiche strutturali', () => {
    expect(estimateManualImpact({
      name: spaghetti.nome_en,
      carbs: 10,
      protein: 0,
      fat: 0,
      fibre: 0,
    }, 'en')).toMatchObject({
      glycemicIndex: 43,
      glycemicLoad: 4,
      indexSource: 'catalogo',
    })
    expect(estimateManualImpact({
      name: 'Acqua light',
      carbs: 20,
      protein: 0,
      fat: 0,
      fibre: 0,
    })).toMatchObject({ glycemicIndex: 0, glycemicLoad: 0, indexSource: 'stima' })
    expect(estimateManualImpact({
      name: 'BibitaZuccheroFixture test-only',
      carbs: 20,
      protein: 0,
      fat: 0,
      fibre: 0,
    })).toMatchObject({ glycemicIndex: 65, glycemicLoad: 13, band: 'alto' })
    expect(estimateManualImpact({
      name: 'Pietanza strutturale test-only',
      carbs: 10,
      protein: 0,
      fat: 0,
      fibre: 0,
    })).toMatchObject({ glycemicIndex: 55, glycemicLoad: 6, indexSource: 'stima' })
  })

  it('normalizza macro, nome e grammi di un item manuale test-only', () => {
    const item = mealItemFromManual({
      name: '  xx  ',
      grams: -10,
      carbs: -1,
      protein: -2,
      fat: -3,
      fibre: -4,
    })
    expect(item).toMatchObject({
      source: { kind: 'manual' },
      name: 'xx',
      grams: 0,
      kcal: 0,
      carbs: 0,
      protein: 0,
      fat: 0,
      fibre: 0,
      glycemicLoad: 0,
      band: 'trascurabile',
    })
  })

  it.each(['alta', 'media', 'bassa'] as const)('restituisce affidabilità minima %s', (level) => {
    const food = getExtractedCatalogEntries().find((entry) => (
      entry.ig_medio !== null && entry.ig_affidabilita === level
    ))
    expect(food).toBeDefined()
    if (!food) return
    expect(recipeReliability(recipeWithFoodIds([food.id]))).toBe(level)
  })

  it('restituisce null senza ingredienti con IG', () => {
    const noIndexFood = getExtractedCatalogEntries().find((food) => food.ig_medio === null)
    expect(noIndexFood).toBeDefined()
    if (!noIndexFood) return
    expect(recipeReliability(recipeWithFoodIds([noIndexFood.id, 'id-assente']))).toBeNull()
  })
})

describe('progress — aggregati e anelli', () => {
  it('aggrega soltanto la chiave giorno richiesta', () => {
    const today = testOnlyDiaryEntry({ id: 'today', cg: 10, kcal: 200 })
    const yesterday = testOnlyDiaryEntry({
      id: 'yesterday',
      giorno: localDayAt(1),
      ts: localTimestamp(12, 0, 1),
      kcal: 300,
    })
    expect(aggregatoGiorno([today, yesterday], localDayAt(0))).toMatchObject({
      giorno: localDayAt(0),
      totali: { kcal: 200, carbo: 10, prot: 0, grassi: 0, fibre: 0, n: 1 },
      indice: 100,
      livello: 'moltoStabile',
    })
    expect(progressiOggi([today, yesterday], REFERENCE).totali.n).toBe(1)
  })

  it('include esattamente i sette giorni locali fino al riferimento', () => {
    const entries = [
      testOnlyDiaryEntry({ id: 'today', giorno: localDayAt(0), ts: localTimestamp(12, 0, 0) }),
      testOnlyDiaryEntry({ id: 'six', giorno: localDayAt(6), ts: localTimestamp(12, 0, 6) }),
      testOnlyDiaryEntry({ id: 'seven', giorno: localDayAt(7), ts: localTimestamp(12, 0, 7) }),
      testOnlyDiaryEntry({ id: 'future', giorno: localDayAt(-1), ts: localTimestamp(12, 0, -1) }),
    ]
    const progress = progressiSetteGiorni(entries, REFERENCE)
    expect(progress.dal).toBe(localDayAt(6))
    expect(progress.al).toBe(localDayAt(0))
    expect(progress.giorni).toHaveLength(7)
    expect(progress.totali.n).toBe(2)
    expect(progress.giorniConVoci).toBe(2)
  })

  it('restituisce anelli zero sul vuoto e calcola equilibrio/freni/varietà', () => {
    expect(datiAnelliOggi([], REFERENCE)).toEqual({ equilibrio: 0, freni: 0, varieta: 0 })
    const entries = [
      testOnlyDiaryEntry({
        id: 'ring-a',
        nome: ' Piatto A ',
        fascia: 'basso',
        slot: 'colazione',
        carbo: 10,
        fibre: 1,
        prot: 2,
        grassi: 1,
      }),
      testOnlyDiaryEntry({
        id: 'ring-b',
        nome: 'piatto a',
        fascia: 'alto',
        slot: 'pranzo',
        carbo: 10,
      }),
    ]
    expect(datiAnelliOggi(entries, REFERENCE)).toEqual({
      equilibrio: 50,
      freni: 25,
      varieta: 28,
    })
  })

  it('porta i freni a 100 senza carboidrati e inferisce tutti gli slot ai confini', () => {
    const hours = [[9, 0], [10, 30], [12, 0], [15, 0], [18, 30]] as const
    const entries = hours.map(([hour, minute], index) => testOnlyDiaryEntry({
      id: `slot-${index}`,
      nome: 'Stesso nome',
      ts: localTimestamp(hour, minute),
      carbo: 0,
    }))
    expect(datiAnelliOggi(entries, REFERENCE)).toEqual({
      equilibrio: 100,
      freni: 100,
      varieta: 52,
    })
  })
})

describe('progress — difficoltà, serie e bilancio', () => {
  it('sceglie il primo pasto medio/alto a parità di CG', () => {
    const low = testOnlyDiaryEntry({ id: 'low', fascia: 'basso', cg: 100 })
    const first = testOnlyDiaryEntry({ id: 'first', fascia: 'medio', cg: 20 })
    const tied = testOnlyDiaryEntry({ id: 'tied', fascia: 'alto', cg: 20 })
    expect(pastoPiuDifficile([low])).toBeNull()
    expect(pastoPiuDifficile([low, first, tied])).toBe(first)
  })

  it('conta al massimo sette giorni e consente che la serie inizi ieri', () => {
    const seven = Array.from({ length: 7 }, (_, offset) => testOnlyDiaryEntry({
      id: `series-${offset}`,
      giorno: localDayAt(offset),
      ts: localTimestamp(12, 0, offset),
    }))
    expect(giorniConsecutivi(seven, REFERENCE)).toBe(7)
    expect(giorniConsecutivi(seven.slice(1), REFERENCE)).toBe(6)
    expect(giorniConsecutivi([seven[0], seven[2]], REFERENCE)).toBe(1)
  })

  it('calcola ratio null, zero-carbs e valori positivi', () => {
    expect(ratioBilancio([])).toBeNull()
    expect(ratioBilancio([testOnlyDiaryEntry({ carbo: 0, prot: 10 })])).toBeNull()
    expect(ratioBilancio([testOnlyDiaryEntry({ carbo: 10, fibre: 1, prot: 2, grassi: 1 })])).toBe(0.5)
  })

  it.each([
    [6, 'buono'],
    [3, 'discreto'],
    [2.9, 'daBilanciare'],
  ] as const)('classifica il confine freni %s/10 come %s', (protein, expected) => {
    expect(bilancioOggi([
      testOnlyDiaryEntry({ carbo: 10, prot: protein }),
    ], REFERENCE)).toBe(expected)
  })

  it('restituisce null per oggi vuoto o senza carboidrati', () => {
    expect(bilancioOggi([], REFERENCE)).toBeNull()
    expect(bilancioOggi([testOnlyDiaryEntry({ carbo: 0, prot: 10 })], REFERENCE)).toBeNull()
  })

  it.each([
    [1.1, 'meglio', 10],
    [0.9, 'margine', 10],
    [1.05, 'linea', 0],
  ] as const)('confronta ratio corrente %s con precedente 1', (current, key, pct) => {
    expect(andamentoSettimana([
      diaryWithRatio(0, current, `current-${current}`),
      diaryWithRatio(7, 1, `previous-${current}`),
    ], REFERENCE)).toEqual({ key, pct })
  })

  it('non produce andamento con periodi mancanti o baseline zero', () => {
    expect(andamentoSettimana([], REFERENCE)).toBeNull()
    expect(andamentoSettimana([
      diaryWithRatio(0, 1, 'current'),
      diaryWithRatio(7, 0, 'previous-zero'),
    ], REFERENCE)).toBeNull()
  })

  it.each([
    [[], 'equilibrata'],
    [['basso', 'basso', 'medio', 'basso'], 'moderata'],
    [['basso', 'alto'], 'intensa'],
  ] as const)('calcola verdetto %s', (bands, expected) => {
    const entries = bands.map((fascia, index) => testOnlyDiaryEntry({
      id: `verdict-${index}`,
      fascia,
    }))
    expect(verdettoSettimana(entries)).toBe(expected)
  })
})

describe('progress — suggerimenti e report', () => {
  it('restituisce ricette VERIFIED low-load ordinate, limitate e non consumate', () => {
    const suggestions = piattiPiuFacili(null, [], 3)
    expect(suggestions.length).toBeLessThanOrEqual(3)
    expect(suggestions.every(({ per_porzione }) => (
      per_porzione.fascia === 'trascurabile' || per_porzione.fascia === 'basso'
    ))).toBe(true)
    expect(suggestions.map(({ per_porzione }) => per_porzione.carico_glicemico)).toEqual(
      [...suggestions].map(({ per_porzione }) => per_porzione.carico_glicemico).sort((a, b) => a - b),
    )

    const consumed = suggestions[0]
    if (consumed) {
      const afterConsumption = piattiPiuFacili(null, [testOnlyDiaryEntry({
        nome: consumed.nome.toUpperCase(),
      })], 3)
      expect(afterConsumption.map(({ id }) => id)).not.toContain(consumed.id)
    }
    expect(piattiPiuFacili(null, [], 0)).toEqual([])
  })

  it('applica gli obiettivi quando esiste almeno un’alternativa VERIFIED sufficiente', () => {
    const mass = piattiPiuFacili('massa', [], 1)
    const slimming = piattiPiuFacili('dimagrire', [], 1)
    expect(mass).toHaveLength(1)
    expect(mass.every(({ per_porzione }) => per_porzione.proteine_g >= 15)).toBe(true)
    expect(slimming).toHaveLength(1)
    expect(slimming.every(({ per_porzione }) => per_porzione.kcal <= 230)).toBe(true)
  })

  it('produce un report vuoto coerente per obiettivo dimagrire', () => {
    const report = reportSettimana('dimagrire', [], REFERENCE)
    expect(report).toMatchObject({
      nPasti: 0,
      giorniAttivi: 0,
      kcalGiorno: 0,
      macros: { prot: 0, carbo: 0, grassi: 0, fibre: 0 },
      trend: null,
      difficile: null,
      perGiorno: [0, 0, 0, 0, 0, 0, 0],
      macroAdvice: 'diario.macroDimagrireProt',
      focus: 'diario.focusOk',
      verdetto: 'equilibrata',
    })
  })

  it('calcola medie attive, trend, focus e soglia proteica su fixture diario', () => {
    const currentDifficult = testOnlyDiaryEntry({
      id: 'current-difficult',
      giorno: localDayAt(0),
      ts: localTimestamp(12, 0, 0),
      fascia: 'alto',
      cg: 20,
      kcal: 500,
      carbo: 50,
      prot: 80,
      grassi: 20,
      fibre: 10,
    })
    const currentEasy = testOnlyDiaryEntry({
      id: 'current-easy',
      giorno: localDayAt(1),
      ts: localTimestamp(12, 0, 1),
      fascia: 'basso',
      cg: 10,
      kcal: 300,
      carbo: 30,
      prot: 40,
      grassi: 10,
      fibre: 6,
    })
    const previous = [
      testOnlyDiaryEntry({ id: 'previous-1', giorno: localDayAt(7), cg: 10 }),
      testOnlyDiaryEntry({ id: 'previous-2', giorno: localDayAt(8), cg: 10 }),
    ]
    const report = reportSettimana('massa', [currentDifficult, currentEasy, ...previous], REFERENCE)

    expect(report).toMatchObject({
      nPasti: 2,
      giorniAttivi: 2,
      kcalGiorno: 400,
      macros: { prot: 60, carbo: 40, grassi: 15, fibre: 8 },
      trend: 50,
      difficile: currentDifficult,
      macroAdvice: 'diario.macroMassaOk',
      focus: 'diario.focusDifficile',
      verdetto: 'intensa',
    })
  })

  it('include le date future nel cutoff aperto come limite runtime corrente', () => {
    const future = testOnlyDiaryEntry({
      id: 'future-report',
      giorno: localDayAt(-1),
      ts: localTimestamp(12, 0, -1),
    })
    expect(reportSettimana(null, [future], REFERENCE).nPasti).toBe(1)
  })
})
