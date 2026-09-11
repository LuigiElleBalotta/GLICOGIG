import { describe, expect, it } from 'vitest'
import type { CatalogLanguage, FoodCatalogEntry } from '../types/catalog'
import {
  CATALOG_EXTRACTION_META,
  getExtractedCatalogEntries,
  getFoodByCatalogId,
  getFoodByName,
  getLocalizedFoodName,
  getLocalizedFoodSynonyms,
  isStrongFoodNameMatch,
  normalizeFoodName,
  resolveFoodByName,
  searchFoods,
} from './foodCatalog'

function verifiedFood(id: string): FoodCatalogEntry {
  const food = getFoodByCatalogId(id)
  if (!food) throw new Error(`Missing VERIFIED food fixture: ${id}`)
  return food
}

const spaghetti = verifiedFood('spaghetti-cotti-al-dente')
const LANGUAGES = ['it', 'en', 'es', 'de', 'fr'] as const satisfies readonly CatalogLanguage[]

describe('foodCatalog — normalizzazione', () => {
  it.each([
    [null, ''],
    [undefined, ''],
    ['', ''],
    ['  PASTA   al DÉNTE  ', 'pasta al dente'],
    ['Crème brûlée—XL', 'creme brulee xl'],
    ['Pane_integrale/100%', 'pane integrale 100'],
    ['àèìòù', 'aeiou'],
    ['ß', ''],
  ] as const)('normalizza %s in %s', (input, expected) => {
    expect(normalizeFoodName(input)).toBe(expected)
  })

  it('è idempotente anche dopo punteggiatura, diacritici e spazi', () => {
    const once = normalizeFoodName('  Crème—brûlée / XL  ')
    expect(normalizeFoodName(once)).toBe(once)
  })
})

describe('foodCatalog — match forte', () => {
  it('accetta uguaglianza normalizzata e contenimento in entrambe le direzioni', () => {
    expect(isStrongFoodNameMatch('Pasta al dente', 'pàsta al dente')).toBe(true)
    expect(isStrongFoodNameMatch('spaghetti cotti', 'spaghetti cotti al dente')).toBe(true)
    expect(isStrongFoodNameMatch('spaghetti cotti al dente', 'spaghetti cotti')).toBe(true)
  })

  it('accetta almeno un token comune lungo quattro o più caratteri', () => {
    expect(isStrongFoodNameMatch('pane rustico', 'zuppa rustico-style')).toBe(true)
    expect(isStrongFoodNameMatch('riso rosso', 'rosso venere')).toBe(true)
  })

  it('rifiuta input vuoti e token comuni più corti di quattro caratteri', () => {
    expect(isStrongFoodNameMatch('', 'pasta')).toBe(false)
    expect(isStrongFoodNameMatch('---', 'pasta')).toBe(false)
    expect(isStrongFoodNameMatch('riso uno', 'riso due')).toBe(true)
    expect(isStrongFoodNameMatch('the uno', 'the due')).toBe(false)
    expect(isStrongFoodNameMatch('abc def', 'abc xyz')).toBe(false)
  })
})

describe('foodCatalog — localizzazione', () => {
  it.each(LANGUAGES)('restituisce il nome VERIFIED della lingua %s senza fallback', (language) => {
    const expected = language === 'en'
      ? spaghetti.nome_en
      : language === 'es'
        ? spaghetti.nome_es
        : language === 'de'
          ? spaghetti.nome_de
          : language === 'fr'
            ? spaghetti.nome_fr
            : spaghetti.nome
    expect(getLocalizedFoodName(spaghetti, language)).toBe(expected)
  })

  it.each(LANGUAGES)('restituisce i sinonimi VERIFIED della lingua %s', (language) => {
    const expected = language === 'en'
      ? spaghetti.sinonimi_en
      : language === 'es'
        ? spaghetti.sinonimi_es
        : language === 'de'
          ? spaghetti.sinonimi_de
          : language === 'fr'
            ? spaghetti.sinonimi_fr
            : spaghetti.sinonimi
    expect(getLocalizedFoodSynonyms(spaghetti, language)).toBe(expected)
  })

  it('assegna il rank esatto al nome inglese nella lingua richiesta', () => {
    expect(spaghetti.nome_en).toBe('Al dente cooked spaghetti')
    const english = resolveFoodByName(spaghetti.nome_en, { language: 'en' })
    expect(english.kind).toBe('resolved')
    if (english.kind !== 'resolved') return
    expect(english.food.id).toBe(spaghetti.id)
    expect(english.matchedBy).toBe('exact_name')

    const italian = resolveFoodByName(spaghetti.nome_en, { language: 'it' })
    if (italian.kind !== 'not_found') {
      expect(italian.matchedBy).not.toBe('exact_name')
    }
  })

  it.each(LANGUAGES)('risolve il nome esatto localizzato in %s', (language) => {
    const name = getLocalizedFoodName(spaghetti, language)
    const result = resolveFoodByName(name, { language })
    expect(result.kind).toBe('resolved')
    if (result.kind !== 'resolved') return
    expect(result.food.id).toBe(spaghetti.id)
    expect(result.matchedBy).toBe('exact_name')
  })
})

describe('foodCatalog — lookup ID e dataset VERIFIED', () => {
  it('mantiene il lookup ID esatto, case-sensitive e senza fallback', () => {
    expect(getFoodByCatalogId(spaghetti.id)).toBe(spaghetti)
    expect(getFoodByCatalogId(undefined)).toBeUndefined()
    expect(getFoodByCatalogId(null)).toBeUndefined()
    expect(getFoodByCatalogId('')).toBeUndefined()
    expect(getFoodByCatalogId(spaghetti.id.toUpperCase())).toBeUndefined()
    expect(getFoodByCatalogId('id-non-presente')).toBeUndefined()
  })

  it('espone una collezione VERIFIED stabile, completa e con ID univoci', () => {
    const entries = getExtractedCatalogEntries()
    expect(entries).toBe(getExtractedCatalogEntries())
    expect(entries).toHaveLength(307)
    expect(new Set(entries.map(({ id }) => id)).size).toBe(entries.length)
    expect(entries.find(({ id }) => id === spaghetti.id)).toBe(spaghetti)
    expect(CATALOG_EXTRACTION_META).toEqual({
      sourceFunction: '#17813',
      version: '1.0.16',
      totalEntriesInApk: entries.length,
      extractedEntries: entries.length,
      evidence: 'VERIFIED',
    })
  })
})

describe('foodCatalog — ricerca e record hidden', () => {
  it.each(['', ' ', 'a', 'à', '--', 'zz'] as const)('rifiuta query normalizzate sotto tre caratteri: %s', (query) => {
    expect(searchFoods(query)).toEqual([])
    expect(resolveFoodByName(query)).toEqual({ kind: 'not_found' })
  })

  it('restituisce nessun risultato per testo inesistente', () => {
    const query = 'zzzxxyyqq'
    expect(searchFoods(query)).toEqual([])
    expect(resolveFoodByName(query)).toEqual({ kind: 'not_found' })
    expect(getFoodByName(query)).toBeUndefined()
  })

  it('esclude Farina 00 hidden dalla ricerca utente ma la include con opt-in', () => {
    expect(searchFoods('Farina 00').map(({ id }) => id)).not.toContain('farina-00')
    const included = searchFoods('Farina 00', { includeHidden: true })
    expect(included.map(({ id }) => id)).toContain('farina-00')
    expect(included[0]?.id).toBe('farina-00')
  })

  it('include sempre gli hidden nel resolver interno', () => {
    const result = resolveFoodByName('Farina 00')
    expect(result.kind).toBe('resolved')
    if (result.kind !== 'resolved') return
    expect(result.food.id).toBe('farina-00')
    expect(result.food.nascondi).toBe(true)
    expect(result.matchedBy).toBe('exact_name')
  })
})

describe('foodCatalog — ranking e risoluzione', () => {
  it('assegna priorità massima al nome esatto normalizzato', () => {
    const query = '  SPAGHETTI COTTI AL DÉNTE '
    const result = resolveFoodByName(query)
    expect(searchFoods(query)[0]?.id).toBe(spaghetti.id)
    expect(result.kind).toBe('resolved')
    if (result.kind !== 'resolved') return
    expect(result.food.id).toBe(spaghetti.id)
    expect(result.matchedBy).toBe('exact_name')
  })

  it('risolve il sinonimo VERIFIED pasta lunga con rank exact_synonym', () => {
    const result = resolveFoodByName('pasta lunga')
    expect(result.kind).toBe('resolved')
    if (result.kind !== 'resolved') return
    expect(result.food.id).toBe('pasta-cotta-al-dente')
    expect(result.matchedBy).toBe('exact_synonym')
  })

  it('copre un nome forte non esatto mantenendo il record target fra i risultati', () => {
    const query = `${spaghetti.nome} porzione`
    const matches = searchFoods(query)
    expect(matches.map(({ id }) => id)).toContain(spaghetti.id)

    const result = resolveFoodByName(query)
    if (result.kind === 'resolved') {
      expect(result.food.id).toBe(spaghetti.id)
      expect(result.matchedBy).toBe('strong_name')
    } else {
      expect(result.kind).toBe('ambiguous')
      if (result.kind === 'ambiguous') {
        expect(result.matchedBy).toBe('strong_name')
        expect(result.candidates.map(({ id }) => id)).toContain(spaghetti.id)
      }
    }
  })

  it('copre il rank strong_synonym con un sinonimo VERIFIED esteso', () => {
    const result = resolveFoodByName('vermicelli dettaglio-test')
    expect(result.kind).toBe('resolved')
    if (result.kind !== 'resolved') return
    expect(result.food.id).toBe('pasta-cotta-al-dente')
    expect(result.matchedBy).toBe('strong_synonym')
  })

  it('rende riso ambiguo senza scegliere arbitrariamente e ordina gli ID', () => {
    const result = resolveFoodByName('riso')
    expect(result.kind).toBe('ambiguous')
    if (result.kind !== 'ambiguous') return

    const ids = result.candidates.map(({ id }) => id)
    expect(ids.length).toBeGreaterThan(1)
    expect(ids).toEqual([...ids].sort())
    expect(result.matchedBy).toBe('strong_name')
    expect(getFoodByName('riso')).toBeUndefined()
  })

  it('getFoodByName restituisce solo una risoluzione univoca', () => {
    expect(getFoodByName(spaghetti.nome)).toBe(spaghetti)
    expect(getFoodByName('riso')).toBeUndefined()
    expect(getFoodByName('inesistente test only')).toBeUndefined()
  })

  it('ordina deterministicamente per rank e poi per ID', () => {
    const first = searchFoods('riso', { includeHidden: true }).map(({ id }) => id)
    const second = searchFoods('riso', { includeHidden: true }).map(({ id }) => id)
    expect(first).toEqual(second)

    const ambiguous = resolveFoodByName('riso')
    expect(ambiguous.kind).toBe('ambiguous')
    if (ambiguous.kind !== 'ambiguous') return
    const bestIds = ambiguous.candidates.map(({ id }) => id)
    expect(first.slice(0, bestIds.length)).toEqual(bestIds)
  })
})
