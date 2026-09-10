import { VERIFIED_CATALOG_ENTRIES } from './verifiedCatalogData'
import type { CatalogExtractionMeta, FoodCatalogEntry } from '../types/catalog'

const foodById = new Map<string, FoodCatalogEntry>(
  VERIFIED_CATALOG_ENTRIES.map((food) => [food.id, food]),
)

export const CATALOG_EXTRACTION_META: CatalogExtractionMeta = {
  sourceFunction: '#14256',
  sourceOffset: '0x002cd72e',
  totalEntriesInApk: 228,
  extractedEntries: VERIFIED_CATALOG_ENTRIES.length,
  evidence: 'VERIFIED',
}

export function getFoodByCatalogId(catalogId: string | null | undefined): FoodCatalogEntry | undefined {
  return catalogId ? foodById.get(catalogId) : undefined
}

export function getExtractedCatalogEntries(): readonly FoodCatalogEntry[] {
  return VERIFIED_CATALOG_ENTRIES
}
