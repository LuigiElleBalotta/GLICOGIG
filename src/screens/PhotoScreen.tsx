import { useMemo, type RefObject } from 'react'
import { useTranslation } from 'react-i18next'
import PhotoCard from '../components/PhotoCard'
import ResultPanel, { type ViewStatus } from '../components/ResultPanel'
import {
  CameraIcon,
  EyeIcon,
  EyeOffIcon,
  LayersIcon,
  LockIcon,
  SparklesIcon,
  TrashIcon,
} from '../components/Icons'
import { LANGUAGE_LOCALES, resolveSupportedLanguage } from '../i18n/languages'
import { selectMealItemName } from '../i18n/mealSelectors'
import type { PreparedImage } from '../services/imagePreparation'
import { useMealSession } from '../state/mealSession'
import type {
  AnalizzaResponse,
  AnalysisOrigin,
  PortionPreset,
  RawWeightMode,
} from '../types/analysis'

interface PhotoScreenProps {
  analysisMode: AnalysisOrigin
  completeMeal: boolean
  image: PreparedImage | null
  text: string
  result: AnalizzaResponse | null
  resultOrigin: AnalysisOrigin
  portionPreset: PortionPreset | null
  rawWeightMode: RawWeightMode
  addedToMeal: boolean
  mealItemCount: number
  status: ViewStatus
  error: string
  accessKey: string
  showAccessKey: boolean
  resultSection: RefObject<HTMLDivElement | null>
  onAnalysisModeChange(value: AnalysisOrigin): void
  onCompleteMealStart(): void
  onSingleDish(): void
  onAccessKeyChange(value: string): void
  onToggleAccessKey(): void
  onFile(file: File): void | Promise<void>
  onTextChange(value: string): void
  onAnalyzePhoto(): void
  onAnalyzeText(): void
  onClear(): void
  onRetry(): void
  onIngredientGramsChange(index: number, grams: number): void
  onPortionPresetChange(value: PortionPreset): void
  onRawWeightModeChange(value: RawWeightMode): void
  onAddToSession(): void
  onAnalyzeAnother(): void
}

function SessionSummary() {
  const { t, i18n } = useTranslation()
  const language = resolveSupportedLanguage(i18n.resolvedLanguage ?? i18n.language)
  const numberFormatter = useMemo(() => new Intl.NumberFormat(LANGUAGE_LOCALES[language], { maximumFractionDigits: 1 }), [language])
  const formatNumber = (value: number) => numberFormatter.format(value)
  const { entries, summary, removeItem, clearMeal } = useMealSession()
  if (!entries.length) return null

  return (
    <section className="mb-5 rounded-3xl border border-brand/30 bg-brand-soft/45 p-4 sm:p-5" aria-label={t('analysis.session.aria')}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 text-[11px] font-extrabold tracking-[0.16em] text-brand uppercase"><LayersIcon className="size-4" /> {t('analysis.session.title')}</p>
          <h2 className="mt-1 text-xl font-extrabold text-ink">{t('analysis.session.summary', { count: summary.plates, carbs: formatNumber(summary.carbs) })}</h2>
          <p className="mt-1 text-xs text-muted">{t('analysis.session.totals', { glycemicLoad: formatNumber(summary.glycemicLoad), grams: formatNumber(summary.totalGrams) })}</p>
        </div>
        <div className="flex gap-2"><a className="secondary-button" href="#meal">{t('common.actions.openMeal')}</a><button className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-coral/30 px-3 text-xs font-bold text-coral" type="button" onClick={clearMeal}><TrashIcon className="size-4" /> {t('analysis.session.clear')}</button></div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {entries.map(({ id, item }) => {
          const displayName = selectMealItemName(item, language)
          return (
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-ink" key={id}>
              {displayName}
              <button className="text-muted transition hover:text-coral" type="button" onClick={() => removeItem(id)} aria-label={t('common.aria.removeFromMeal', { name: displayName })}>×</button>
            </span>
          )
        })}
      </div>
      {summary.unresolved > 0 && <p className="mt-3 text-xs text-amber">{t('analysis.session.unresolved', { count: summary.unresolved })}</p>}
    </section>
  )
}

export default function PhotoScreen({
  analysisMode,
  completeMeal,
  image,
  text,
  result,
  resultOrigin,
  portionPreset,
  rawWeightMode,
  addedToMeal,
  mealItemCount,
  status,
  error,
  accessKey,
  showAccessKey,
  resultSection,
  onAnalysisModeChange,
  onCompleteMealStart,
  onSingleDish,
  onAccessKeyChange,
  onToggleAccessKey,
  onFile,
  onTextChange,
  onAnalyzePhoto,
  onAnalyzeText,
  onClear,
  onRetry,
  onIngredientGramsChange,
  onPortionPresetChange,
  onRawWeightModeChange,
  onAddToSession,
  onAnalyzeAnother,
}: PhotoScreenProps) {
  const { t, i18n } = useTranslation()
  const language = resolveSupportedLanguage(i18n.resolvedLanguage ?? i18n.language)
  const numberFormatter = useMemo(() => new Intl.NumberFormat(LANGUAGE_LOCALES[language]), [language])
  const busy = status === 'preparing' || status === 'analyzing'
  const hasInput = analysisMode === 'photo' ? Boolean(image) : Boolean(text.trim())

  return (
    <div>
      <section className="mb-5 px-1 sm:mb-7">
        <p className="screen-kicker">{t('analysis.hero.kicker')}</p>
        <h1 className="screen-title">{t('analysis.hero.title')} <span className="text-brand">{t('analysis.hero.accent')}</span></h1>
        <p className="screen-subtitle">{t('analysis.hero.subtitle')}</p>
      </section>

      <SessionSummary />

      <section className="mb-4 grid gap-3 rounded-3xl border border-line bg-paper/90 p-4 shadow-card backdrop-blur sm:grid-cols-2 sm:p-5">
        <div>
          <p className="section-label">{t('analysis.mode.input')}</p>
          <div className="mt-2 grid grid-cols-2 gap-2" role="group" aria-label={t('analysis.mode.aria')}>
            <button className={analysisMode === 'photo' ? 'primary-button' : 'secondary-button'} type="button" onClick={() => onAnalysisModeChange('photo')} disabled={busy}><CameraIcon className="size-5" /> {t('analysis.mode.photo')}</button>
            <button className={analysisMode === 'text' ? 'primary-button' : 'secondary-button'} type="button" onClick={() => onAnalysisModeChange('text')} disabled={busy}><SparklesIcon className="size-5" /> {t('analysis.mode.text')}</button>
          </div>
        </div>
        <div>
          <p className="section-label">{t('analysis.mode.session')}</p>
          <div className="mt-2 grid grid-cols-2 gap-2" role="group" aria-label={t('analysis.mode.mealAria')}>
            <button className={!completeMeal ? 'primary-button' : 'secondary-button'} type="button" onClick={onSingleDish}>{t('analysis.mode.singleDish')}</button>
            <button className={completeMeal ? 'primary-button' : 'secondary-button'} type="button" onClick={onCompleteMealStart}><LayersIcon className="size-5" /> {t('analysis.mode.completeMeal')}</button>
          </div>
          <p className="mt-2 text-xs leading-5 text-muted">{t('analysis.mode.completeMealHint')}</p>
        </div>
      </section>

      <section className="mb-4 rounded-3xl border border-line bg-paper/90 p-4 shadow-card backdrop-blur sm:flex sm:items-center sm:gap-4 sm:p-5">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl border border-brand/20 bg-brand-soft text-brand"><LockIcon className="size-5" /></span>
          <div className="min-w-0 flex-1">
            <label className="text-[11px] font-extrabold tracking-[0.14em] text-amber uppercase" htmlFor="access-key">{t('analysis.accessKey.label')}</label>
            <div className="relative mt-1.5">
              <input id="access-key" className="field pr-11" type={showAccessKey ? 'text' : 'password'} value={accessKey} onChange={(event) => onAccessKeyChange(event.target.value)} placeholder={t('analysis.accessKey.placeholder')} autoComplete="current-password" />
              <button className="absolute inset-y-0 right-0 grid w-11 place-items-center text-muted transition hover:text-brand" type="button" onClick={onToggleAccessKey} aria-label={showAccessKey ? t('analysis.accessKey.hideAria') : t('analysis.accessKey.showAria')}>{showAccessKey ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}</button>
            </div>
          </div>
        </div>
        <p className="mt-3 max-w-md text-xs leading-5 text-muted sm:mt-0">{t('analysis.accessKey.hint')}</p>
      </section>

      <div className="grid items-start gap-4 lg:grid-cols-[0.88fr_1.12fr]">
        {analysisMode === 'photo' ? (
          <PhotoCard
            image={image}
            busy={busy}
            preparing={status === 'preparing'}
            analyzing={status === 'analyzing'}
            onFile={onFile}
            onAnalyze={onAnalyzePhoto}
            onClear={onClear}
          />
        ) : (
          <section className="app-card rounded-[1.75rem] border border-line bg-paper/95 p-4 shadow-card backdrop-blur sm:p-5">
            <div className="mb-4 flex items-start justify-between gap-4 px-1">
              <div><p className="text-[11px] font-bold tracking-[0.18em] text-amber uppercase">{t('analysis.text.step')}</p><h2 className="mt-1 font-display text-2xl font-extrabold text-ink">{t('analysis.text.title')}</h2></div>
              <span className="rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-bold text-brand">{t('analysis.text.maxCharacters')}</span>
            </div>
            <label className="sr-only" htmlFor="dish-description">{t('analysis.text.label')}</label>
            <textarea id="dish-description" className="field min-h-52 resize-y leading-6" value={text} maxLength={2000} onChange={(event) => onTextChange(event.target.value)} disabled={busy} placeholder={t('analysis.text.placeholder')} />
            <div className="mt-2 flex items-center justify-between gap-3 text-xs text-muted"><span>{t('analysis.text.hint')}</span><span>{numberFormatter.format(text.length)}/{numberFormatter.format(2000)}</span></div>
            <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_auto]">
              <button className="primary-button" type="button" onClick={onAnalyzeText} disabled={busy || !text.trim()}><SparklesIcon className="size-5" />{status === 'analyzing' ? t('analysis.text.analyzing') : t('analysis.text.action')}</button>
              <button className="secondary-button" type="button" onClick={onClear} disabled={busy || (!text && !result)}>{t('common.actions.clear')}</button>
            </div>
            <p className="mt-4 text-xs leading-5 text-muted">{t('analysis.text.privacy')}</p>
          </section>
        )}
        <div ref={resultSection} className="scroll-mt-24">
          <ResultPanel
            status={status}
            result={result}
            resultOrigin={resultOrigin}
            error={error}
            hasInput={hasInput}
            portionPreset={portionPreset}
            rawWeightMode={rawWeightMode}
            addedToMeal={addedToMeal}
            mealItemCount={mealItemCount}
            onRetry={onRetry}
            onIngredientGramsChange={onIngredientGramsChange}
            onPortionPresetChange={onPortionPresetChange}
            onRawWeightModeChange={onRawWeightModeChange}
            onAddToSession={onAddToSession}
            onAnalyzeAnother={onAnalyzeAnother}
          />
        </div>
      </div>

      <p className="mt-6 border-t border-line pt-5 text-xs leading-5 text-muted">{t('analysis.disclaimer')}</p>
    </div>
  )
}
