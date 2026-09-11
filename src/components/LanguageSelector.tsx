import { useTranslation } from 'react-i18next'
import {
  LANGUAGE_NATIVE_NAMES,
  SUPPORTED_LANGUAGES,
  resolveSupportedLanguage,
  type SupportedLanguage,
} from '../i18n/languages'

export default function LanguageSelector() {
  const { t, i18n } = useTranslation()
  const language = resolveSupportedLanguage(i18n.resolvedLanguage ?? i18n.language)

  const changeLanguage = (nextLanguage: SupportedLanguage) => {
    if (nextLanguage !== language) void i18n.changeLanguage(nextLanguage)
  }

  return (
    <label className="inline-flex min-h-10 items-center rounded-full border border-line bg-surface px-2 text-xs font-bold text-ink-muted">
      <span className="sr-only">{t('shell.languageLabel')}</span>
      <select
        className="cursor-pointer bg-transparent px-1 py-2 text-xs font-extrabold text-ink outline-none"
        aria-label={t('shell.languageLabel')}
        value={language}
        onChange={(event) => changeLanguage(event.currentTarget.value as SupportedLanguage)}
      >
        {SUPPORTED_LANGUAGES.map((code) => (
          <option key={code} value={code}>{LANGUAGE_NATIVE_NAMES[code]}</option>
        ))}
      </select>
    </label>
  )
}
