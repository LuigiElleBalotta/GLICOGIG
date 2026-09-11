import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { FALLBACK_LANGUAGE, SUPPORTED_LANGUAGES } from './languages'
import { detectInitialLanguage, persistLanguage, syncDocumentLanguage } from './persistence'
import { resources } from './resources'

const initialLanguage = detectInitialLanguage()

void i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLanguage,
    fallbackLng: FALLBACK_LANGUAGE,
    supportedLngs: [...SUPPORTED_LANGUAGES],
    load: 'languageOnly',
    interpolation: { escapeValue: false },
    returnNull: false,
    initAsync: false,
  })

function synchronizeLanguage(language: string): void {
  const supported = syncDocumentLanguage(language)
  persistLanguage(supported)
}

synchronizeLanguage(i18n.resolvedLanguage ?? initialLanguage)
i18n.on('languageChanged', synchronizeLanguage)

export default i18n
