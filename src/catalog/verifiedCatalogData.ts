import apkCatalogData from './apkCatalogData.json'
import type { FoodCatalogEntry } from '../types/catalog'

/** Dataset completo estratto senza trasformazioni dalla funzione Hermes #14256. */
export const VERIFIED_CATALOG_ENTRIES = apkCatalogData.alimenti as unknown as readonly FoodCatalogEntry[]

/** Metadati originali inclusi nello stesso oggetto esportato dall'APK. */
export const VERIFIED_CATALOG_SOURCE_META = apkCatalogData._meta
