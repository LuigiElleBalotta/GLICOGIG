import { de } from './de'
import { en } from './en'
import { es } from './es'
import { fr } from './fr'
import { it } from './it'

/**
 * Provenienza delle risorse i18next:
 * - copy UI editoriale inventariato dai componenti web e tradotto per questa applicazione;
 * - non estratto, non verificato e non attribuito agli artefatti APK verified-1.0.16;
 * - nessun record di catalogo, ricetta, learning o quiz è duplicato in queste risorse.
 *
 * I contenuti localizzati dei quattro dataset restano nei JSON verified e vengono letti
 * esclusivamente attraverso ../datasetSelectors con fallback italiano esplicito.
 */
export const UI_RESOURCE_PROVENANCE = Object.freeze({
  kind: 'editorial-ui-copy',
  extractedFromApk: false,
  verifiedDatasetContent: false,
  locales: ['it', 'en', 'es', 'de', 'fr'] as const,
})

/** Forma pronta per init({ resources }); nessuna dipendenza runtime viene introdotta qui. */
export const resources = {
  it: { translation: it },
  en: { translation: en },
  es: { translation: es },
  de: { translation: de },
  fr: { translation: fr },
} as const

export { de, en, es, fr, it }
export type { TranslationShape, UiTranslation } from './it'
