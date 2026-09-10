import { VERIFIED_CATALOG_ENTRIES } from './verifiedCatalogData'
import type { CatalogExtractionMeta, CatalogLanguage, FoodCatalogEntry } from '../types/catalog'

export interface FoodSearchOptions {
  language?: CatalogLanguage
  includeHidden?: boolean
}

export type FoodNameMatchKind = 'exact_name' | 'exact_synonym' | 'strong_name' | 'strong_synonym'

export type FoodNameResolution =
  | { kind: 'resolved'; food: FoodCatalogEntry; matchedBy: FoodNameMatchKind }
  | { kind: 'ambiguous'; candidates: readonly FoodCatalogEntry[]; matchedBy: FoodNameMatchKind }
  | { kind: 'not_found' }

interface RankedFoodMatch {
  food: FoodCatalogEntry
  rank: number
  matchedBy: FoodNameMatchKind
}

const foodById = new Map<string, FoodCatalogEntry>(
  VERIFIED_CATALOG_ENTRIES.map((food) => [food.id, food]),
)

export const CATALOG_EXTRACTION_META: CatalogExtractionMeta = {
  sourceFunction: '#17813',
  version: '1.0.16',
  totalEntriesInApk: VERIFIED_CATALOG_ENTRIES.length,
  extractedEntries: VERIFIED_CATALOG_ENTRIES.length,
  evidence: 'VERIFIED',
}

/** Replica normNome #18426. */
export function normalizeFoodName(value: string | null | undefined): string {
  return (value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Replica matchForte #18412. */
export function isStrongFoodNameMatch(first: string, second: string): boolean {
  const normalizedFirst = normalizeFoodName(first)
  const normalizedSecond = normalizeFoodName(second)
  if (!normalizedFirst || !normalizedSecond) return false
  if (
    normalizedFirst === normalizedSecond
    || normalizedFirst.includes(normalizedSecond)
    || normalizedSecond.includes(normalizedFirst)
  ) return true

  const secondTokens = new Set(normalizedSecond.split(' ').filter((token) => token.length >= 4))
  return normalizedFirst
    .split(' ')
    .filter((token) => token.length >= 4)
    .some((token) => secondTokens.has(token))
}

export function getLocalizedFoodName(food: FoodCatalogEntry, language: CatalogLanguage = 'it'): string {
  if (language === 'en') return food.nome_en
  if (language === 'es') return food.nome_es
  if (language === 'de') return food.nome_de
  if (language === 'fr') return food.nome_fr
  return food.nome
}

export function getLocalizedFoodSynonyms(
  food: FoodCatalogEntry,
  language: CatalogLanguage = 'it',
): readonly string[] {
  if (language === 'en') return food.sinonimi_en
  if (language === 'es') return food.sinonimi_es
  if (language === 'de') return food.sinonimi_de
  if (language === 'fr') return food.sinonimi_fr
  return food.sinonimi
}

function rankFoodMatch(
  food: FoodCatalogEntry,
  query: string,
  language: CatalogLanguage,
): RankedFoodMatch | null {
  const name = getLocalizedFoodName(food, language)
  const synonyms = getLocalizedFoodSynonyms(food, language)
  const normalizedName = normalizeFoodName(name)
  const normalizedSynonyms = synonyms.map(normalizeFoodName)

  if (normalizedName === query) return { food, rank: 0, matchedBy: 'exact_name' }
  if (normalizedSynonyms.includes(query)) return { food, rank: 1, matchedBy: 'exact_synonym' }
  if (isStrongFoodNameMatch(query, name)) return { food, rank: 2, matchedBy: 'strong_name' }
  if (synonyms.some((synonym) => isStrongFoodNameMatch(query, synonym))) {
    return { food, rank: 3, matchedBy: 'strong_synonym' }
  }
  return null
}

function compareMatches(first: RankedFoodMatch, second: RankedFoodMatch): number {
  if (first.rank !== second.rank) return first.rank - second.rank
  if (first.food.id < second.food.id) return -1
  if (first.food.id > second.food.id) return 1
  return 0
}

function rankedFoodMatches(query: string, options: FoodSearchOptions = {}): RankedFoodMatch[] {
  const normalizedQuery = normalizeFoodName(query)
  if (normalizedQuery.length < 3) return []

  const language = options.language ?? 'it'
  const matches: RankedFoodMatch[] = []
  for (const food of VERIFIED_CATALOG_ENTRIES) {
    if (!options.includeHidden && food.nascondi === true) continue
    const match = rankFoodMatch(food, normalizedQuery, language)
    if (match) matches.push(match)
  }
  return matches.sort(compareMatches)
}

export function getFoodByCatalogId(catalogId: string | null | undefined): FoodCatalogEntry | undefined {
  return catalogId ? foodById.get(catalogId) : undefined
}

/** Ricerca utente deterministica; esclude i record nascondi salvo opt-in esplicito. */
export function searchFoods(query: string, options: FoodSearchOptions = {}): readonly FoodCatalogEntry[] {
  return rankedFoodMatches(query, options).map(({ food }) => food)
}

/**
 * Fallback per ingredienti: include i record nascosti, ma risolve solo un miglior match unico.
 * In caso di collisione non sceglie in base all'ordine del dataset o a uno score arbitrario.
 */
export function resolveFoodByName(
  query: string,
  options: Omit<FoodSearchOptions, 'includeHidden'> = {},
): FoodNameResolution {
  const matches = rankedFoodMatches(query, { ...options, includeHidden: true })
  if (!matches.length) return { kind: 'not_found' }

  const bestRank = matches[0].rank
  const bestMatches = matches.filter((match) => match.rank === bestRank)
  const matchedBy = bestMatches[0].matchedBy
  if (bestMatches.length === 1) {
    return { kind: 'resolved', food: bestMatches[0].food, matchedBy }
  }
  return { kind: 'ambiguous', candidates: bestMatches.map(({ food }) => food), matchedBy }
}

export function getFoodByName(query: string): FoodCatalogEntry | undefined {
  const result = resolveFoodByName(query)
  return result.kind === 'resolved' ? result.food : undefined
}

export function getExtractedCatalogEntries(): readonly FoodCatalogEntry[] {
  return VERIFIED_CATALOG_ENTRIES
}
