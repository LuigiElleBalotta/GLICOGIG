import type { MealItem } from '../types/meal'
import type { SupportedLanguage } from './languages'

/**
 * Seleziona il nome dataset localizzato senza mutare la voce canonica del pasto.
 * I nomi acquisiti da foto, barcode o inserimento manuale restano quelli originali.
 */
export function selectMealItemName(item: MealItem, language: SupportedLanguage): string {
  if (language === 'it' || (item.source.kind !== 'catalog' && item.source.kind !== 'recipe')) {
    return item.name
  }

  const localized = {
    en: item.name_en,
    es: item.name_es,
    de: item.name_de,
    fr: item.name_fr,
  }[language]

  return typeof localized === 'string' && localized.trim() ? localized : item.name
}
