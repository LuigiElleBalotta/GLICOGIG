import type { CatalogLanguage } from '../types/catalog'

export const SUPPORTED_LANGUAGES = ['it', 'en', 'es', 'de', 'fr'] as const satisfies readonly CatalogLanguage[]

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]

export const DEFAULT_LANGUAGE: SupportedLanguage = 'it'
export const FALLBACK_LANGUAGE: SupportedLanguage = 'it'

export const LANGUAGE_LOCALES: Readonly<Record<SupportedLanguage, string>> = Object.freeze({
  it: 'it-IT',
  en: 'en-GB',
  es: 'es-ES',
  de: 'de-DE',
  fr: 'fr-FR',
})

export const LANGUAGE_NATIVE_NAMES: Readonly<Record<SupportedLanguage, string>> = Object.freeze({
  it: 'Italiano',
  en: 'English',
  es: 'Español',
  de: 'Deutsch',
  fr: 'Français',
})

export function isSupportedLanguage(value: string): value is SupportedLanguage {
  return (SUPPORTED_LANGUAGES as readonly string[]).includes(value)
}

/** Normalizza tag BCP 47 o codici brevi; ogni valore non supportato ricade esplicitamente sull'italiano. */
export function resolveSupportedLanguage(value: string | null | undefined): SupportedLanguage {
  const base = value?.trim().toLowerCase().split(/[-_]/, 1)[0] ?? ''
  return isSupportedLanguage(base) ? base : FALLBACK_LANGUAGE
}
