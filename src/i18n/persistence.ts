import { getJSON, setJSON } from '../storage/localJson'
import {
  DEFAULT_LANGUAGE,
  isSupportedLanguage,
  resolveSupportedLanguage,
  type SupportedLanguage,
} from './languages'

export const LANGUAGE_STORAGE_KEY = 'glicogig_language_v1'

export function readStoredLanguage(): SupportedLanguage | null {
  const stored = getJSON<unknown>(LANGUAGE_STORAGE_KEY, null)
  return typeof stored === 'string' && isSupportedLanguage(stored) ? stored : null
}

export function detectInitialLanguage(): SupportedLanguage {
  const stored = readStoredLanguage()
  if (stored) return stored
  if (typeof navigator === 'undefined') return DEFAULT_LANGUAGE

  for (const candidate of navigator.languages ?? [navigator.language]) {
    const base = candidate?.trim().toLowerCase().split(/[-_]/, 1)[0]
    if (base && isSupportedLanguage(base)) return base
  }
  return DEFAULT_LANGUAGE
}

export function persistLanguage(language: SupportedLanguage): boolean {
  return setJSON(LANGUAGE_STORAGE_KEY, language)
}

export function syncDocumentLanguage(language: string | null | undefined): SupportedLanguage {
  const supported = resolveSupportedLanguage(language)
  if (typeof document !== 'undefined') document.documentElement.lang = supported
  return supported
}
