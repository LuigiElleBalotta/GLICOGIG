import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getFoodByCatalogId, resolveFoodByName } from '../catalog/foodCatalog'
import { calculateGlycemicImpact } from '../domain/impactCalculator'
import { formatConfidence } from '../domain/nutrition'
import { fattoreCrudo, grammiCrudi } from '../domain/rawWeight'
import {
  calculateIngredientNutrition,
  calculateMealNutrition,
  effectiveIngredientGrams,
} from '../domain/nutritionCalculator'
import { selectFoodDatasetFields } from '../i18n/datasetSelectors'
import { LANGUAGE_LOCALES, resolveSupportedLanguage } from '../i18n/languages'
import { condividiCard } from '../services/shareCard'
import { DIARY_STORAGE_KEY, registraMangiato } from '../storage/diaryStore'
import type {
  AnalizzaIngredient,
  AnalizzaResponse,
  AnalysisOrigin,
  PortionPreset,
  RawWeightMode,
} from '../types/analysis'
import type { FoodCatalogEntry } from '../types/catalog'
import type { GlycemicImpact, GlycemicImpactBand, MealNutrition, NutritionValues } from '../types/nutrition'
import {
  CheckIcon,
  PlusIcon,
  RefreshIcon,
  SaveIcon,
  ShareIcon,
  SparklesIcon,
  UtensilsIcon,
} from './Icons'

export type ViewStatus = 'idle' | 'preparing' | 'analyzing' | 'success' | 'error'

interface ResultPanelProps {
  status: ViewStatus
  result: AnalizzaResponse | null
  resultOrigin: AnalysisOrigin
  error: string
  hasInput: boolean
  portionPreset: PortionPreset | null
  rawWeightMode: RawWeightMode
  addedToMeal: boolean
  mealItemCount: number
  onRetry(): void
  onIngredientGramsChange(index: number, grams: number): void
  onPortionPresetChange(value: PortionPreset): void
  onRawWeightModeChange(value: RawWeightMode): void
  onAddToSession(): void
  onAnalyzeAnother(): void
}

interface ResultStateProps {
  result: AnalizzaResponse
  resultOrigin: AnalysisOrigin
  portionPreset: PortionPreset | null
  rawWeightMode: RawWeightMode
  addedToMeal: boolean
  mealItemCount: number
  onIngredientGramsChange(index: number, grams: number): void
  onPortionPresetChange(value: PortionPreset): void
  onRawWeightModeChange(value: RawWeightMode): void
  onAddToSession(): void
  onAnalyzeAnother(): void
}

type ActionState = 'idle' | 'working' | 'success' | 'error'
type NutrientLabelKey =
  | 'common.metrics.energy'
  | 'common.metrics.availableCarbohydrates'
  | 'common.metrics.fibre'
  | 'common.metrics.protein'
  | 'common.metrics.fat'

const TOTAL_NUTRIENTS: Array<{ key: keyof NutritionValues; labelKey: NutrientLabelKey; unit: string }> = [
  { key: 'energia_kcal', labelKey: 'common.metrics.energy', unit: 'kcal' },
  { key: 'carboidrati_disponibili_g', labelKey: 'common.metrics.availableCarbohydrates', unit: 'g' },
  { key: 'fibre_g', labelKey: 'common.metrics.fibre', unit: 'g' },
  { key: 'proteine_g', labelKey: 'common.metrics.protein', unit: 'g' },
  { key: 'grassi_totali_g', labelKey: 'common.metrics.fat', unit: 'g' },
]

function formatNumber(
  value: number | null | undefined,
  locale: string,
  fallback: string,
): string {
  return value == null || !Number.isFinite(value)
    ? fallback
    : new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(value)
}

function useLocalizedNumberFormatter() {
  const { t, i18n } = useTranslation()
  const language = resolveSupportedLanguage(i18n.resolvedLanguage ?? i18n.language)
  const locale = LANGUAGE_LOCALES[language]
  const fallback = t('common.labels.notAvailable')
  return {
    language,
    formatNumber: (value: number | null | undefined) => formatNumber(value, locale, fallback),
  }
}

function impactClasses(band: GlycemicImpactBand): string {
  if (band === 'trascurabile') return 'bg-brand-soft text-brand'
  if (band === 'basso') return 'bg-mint-soft text-mint'
  if (band === 'medio') return 'bg-amber-soft text-amber-strong'
  return 'bg-coral-soft text-coral'
}

function impactTranslationKey(band: GlycemicImpactBand) {
  if (band === 'trascurabile') return 'classification.impact.negligible' as const
  if (band === 'basso') return 'classification.impact.low' as const
  if (band === 'medio') return 'classification.impact.medium' as const
  return 'classification.impact.high' as const
}

function diaryEntryPersisted(id: string): boolean {
  try {
    const raw = window.localStorage.getItem(DIARY_STORAGE_KEY)
    const stored: unknown = raw ? JSON.parse(raw) : null
    return Array.isArray(stored) && stored.some((entry) => (
      typeof entry === 'object' && entry !== null && 'id' in entry && entry.id === id
    ))
  } catch {
    return false
  }
}

function resolveRowFood(ingredient: AnalizzaIngredient): FoodCatalogEntry | undefined {
  const byId = getFoodByCatalogId(ingredient.catalogo_id)
  if (byId) return byId
  const byName = resolveFoodByName(ingredient.nome)
  return byName.kind === 'resolved' ? byName.food : undefined
}

function LoadingState() {
  const { t } = useTranslation()

  return (
    <div className="flex min-h-[34rem] flex-col items-center justify-center px-6 text-center">
      <div className="relative grid size-24 place-items-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-mint/15" />
        <span className="absolute inset-2 animate-spin rounded-full border-2 border-brand/10 border-t-mint" />
        <SparklesIcon className="size-9 text-brand" />
      </div>
      <p className="mt-7 text-xs font-bold tracking-[0.18em] text-mint uppercase">{t('analysis.result.loadingKicker')}</p>
      <h2 className="mt-2 text-3xl font-semibold text-brand">{t('analysis.result.loadingTitle')}</h2>
      <p className="mt-3 max-w-sm text-sm leading-6 text-muted">{t('analysis.result.loadingBody')}</p>
    </div>
  )
}

function EmptyState() {
  const { t } = useTranslation()

  return (
    <div className="flex min-h-[34rem] flex-col justify-center p-6 sm:p-8">
      <div className="grid size-14 place-items-center rounded-2xl bg-mint-soft text-mint"><UtensilsIcon className="size-7" /></div>
      <p className="mt-8 text-xs font-bold tracking-[0.18em] text-mint uppercase">{t('analysis.result.emptyStep')}</p>
      <h2 className="mt-2 max-w-md text-3xl font-semibold leading-tight text-brand sm:text-4xl">{t('analysis.result.emptyTitle')}</h2>
      <p className="mt-4 max-w-lg leading-7 text-muted">{t('analysis.result.emptyBody')}</p>
    </div>
  )
}

function ErrorState({ message, canRetry, onRetry }: { message: string; canRetry: boolean; onRetry(): void }) {
  const { t } = useTranslation()

  return (
    <div className="flex min-h-[34rem] flex-col items-center justify-center px-7 text-center">
      <div className="grid size-16 place-items-center rounded-full bg-coral-soft text-2xl font-black text-coral">!</div>
      <p className="mt-6 text-xs font-bold tracking-[0.18em] text-coral uppercase">{t('analysis.result.errorKicker')}</p>
      <h2 className="mt-2 text-3xl font-semibold text-brand">{t('analysis.result.errorTitle')}</h2>
      <p className="mt-3 max-w-sm leading-7 text-muted">{message}</p>
      {canRetry && <button className="primary-button mt-7" type="button" onClick={onRetry}><RefreshIcon className="size-5" /> {t('common.actions.retry')}</button>}
    </div>
  )
}

function NutrientGrid({ values, totalGrams }: { values: NutritionValues; totalGrams: number }) {
  const { t } = useTranslation()
  const { formatNumber } = useLocalizedNumberFormatter()

  return (
    <section className="mt-6">
      <div className="flex items-end justify-between gap-3">
        <div><p className="section-label">{t('analysis.result.totalKicker')}</p><h3 className="mt-1 text-lg font-extrabold text-brand">{t('analysis.result.nutritionTitle')}</h3></div>
        <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-extrabold text-brand">{formatNumber(totalGrams)} g</span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
        {TOTAL_NUTRIENTS.map(({ key, labelKey, unit }) => (
          <div className="rounded-2xl border border-line bg-surface px-3 py-3" key={key}>
            <p className="text-[11px] leading-4 text-muted">{t(labelKey)}</p>
            <p className="mt-1 text-lg font-extrabold text-brand">{formatNumber(values[key])}<span className="ml-1 text-[10px] font-bold text-muted">{unit}</span></p>
          </div>
        ))}
      </div>
    </section>
  )
}

function ResultActions({
  result,
  resultOrigin,
  meal,
  impact,
  addedToMeal,
  mealItemCount,
  onAddToSession,
  onAnalyzeAnother,
}: {
  result: AnalizzaResponse
  resultOrigin: AnalysisOrigin
  meal: MealNutrition
  impact: GlycemicImpact
  addedToMeal: boolean
  mealItemCount: number
  onAddToSession(): void
  onAnalyzeAnother(): void
}) {
  const { t } = useTranslation()
  const { formatNumber } = useLocalizedNumberFormatter()
  const [saveState, setSaveState] = useState<ActionState>('idle')
  const [shareState, setShareState] = useState<ActionState>('idle')

  useEffect(() => {
    setSaveState('idle')
  }, [result])

  function saveToDiary(): void {
    setSaveState('working')
    try {
      const entry = registraMangiato({
        nome: result.piatto || t('analysis.result.unnamedDish'),
        fonte: resultOrigin,
        fascia: impact.fascia,
        cg: impact.cg,
        kcal: meal.nutrition.energia_kcal,
        carbo: impact.carbo,
        prot: meal.nutrition.proteine_g,
        grassi: meal.nutrition.grassi_totali_g,
        fibre: meal.nutrition.fibre_g,
        grammi: meal.totalGrams,
      })
      setSaveState(diaryEntryPersisted(entry.id) ? 'success' : 'error')
    } catch {
      setSaveState('error')
    }
  }

  async function shareResult(): Promise<void> {
    setShareState('working')
    const shared = await condividiCard({
      title: result.piatto || t('analysis.result.unnamedDish'),
      subtitle: t('share.analysis.subtitle'),
      items: [
        { label: t('common.metrics.carbohydrates'), value: `${formatNumber(impact.carbo)} g` },
        { label: t('common.metrics.glycemicLoad'), value: `${formatNumber(impact.cg)} · ${t(impactTranslationKey(impact.fascia))}` },
        { label: t('common.metrics.energy'), value: `${formatNumber(meal.nutrition.energia_kcal)} kcal` },
        { label: t('common.metrics.protein'), value: `${formatNumber(meal.nutrition.proteine_g)} g` },
        { label: t('common.metrics.fat'), value: `${formatNumber(meal.nutrition.grassi_totali_g)} g` },
      ],
      note: t('share.analysis.note'),
    }, { fileName: 'glicogig-piatto.png' })
    setShareState(shared ? 'success' : 'error')
  }

  return (
    <section className="mt-7 rounded-3xl border border-line bg-surface p-4 sm:p-5">
      <p className="section-label">{t('common.labels.actions')}</p>
      {addedToMeal ? (
        <div className="mt-3 rounded-2xl border border-mint/30 bg-mint-soft p-4" role="status">
          <p className="font-extrabold text-mint"><CheckIcon className="mr-2 inline size-5" />{t('analysis.actions.dishAdded')}</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <a className="primary-button" href="#meal"><UtensilsIcon className="size-5" /> {t('analysis.actions.openMealCount', { count: mealItemCount })}</a>
            <button className="secondary-button" type="button" onClick={onAnalyzeAnother}><PlusIcon className="size-5" /> {t('analysis.actions.analyzeAnother')}</button>
          </div>
        </div>
      ) : (
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          <button className="primary-button" type="button" onClick={saveToDiary} disabled={saveState === 'working' || saveState === 'success'}>
            {saveState === 'success' ? <CheckIcon className="size-5" /> : <SaveIcon className="size-5" />}
            {saveState === 'working' ? t('common.actions.saving') : saveState === 'success' ? t('common.actions.registered') : t('common.actions.ateIt')}
          </button>
          <button className="secondary-button" type="button" onClick={() => void shareResult()} disabled={shareState === 'working'}>
            <ShareIcon className="size-5" /> {shareState === 'working' ? t('common.actions.preparing') : t('common.actions.sharePng')}
          </button>
          <button className="secondary-button" type="button" onClick={onAddToSession}><PlusIcon className="size-5" /> {t('common.actions.addToMeal')}</button>
        </div>
      )}
      <div className="mt-3 text-xs" aria-live="polite">
        {saveState === 'error' && <p className="text-coral">{t('common.feedback.sessionPersistenceUnconfirmed')}</p>}
        {shareState === 'success' && <p className="text-mint">{t('common.feedback.shareSuccess')}</p>}
        {shareState === 'error' && <p className="text-coral">{t('common.feedback.shareUnavailable')}</p>}
      </div>
    </section>
  )
}

function ResultState({
  result,
  resultOrigin,
  portionPreset,
  rawWeightMode,
  addedToMeal,
  mealItemCount,
  onIngredientGramsChange,
  onPortionPresetChange,
  onRawWeightModeChange,
  onAddToSession,
  onAnalyzeAnother,
}: ResultStateProps) {
  const { t } = useTranslation()
  const { formatNumber, language } = useLocalizedNumberFormatter()

  if (!result.e_cibo) {
    return (
      <div className="flex min-h-[34rem] flex-col items-center justify-center p-7 text-center">
        <UtensilsIcon className="size-12 text-amber" />
        <h2 className="mt-5 text-3xl font-semibold text-brand">{t('analysis.result.notRecognized')}</h2>
        <p className="mt-3 max-w-sm text-muted">{t('analysis.result.notRecognizedHint')}</p>
      </div>
    )
  }

  const reliability = formatConfidence(result.confidenza)
  const meal = calculateMealNutrition(result.ingredienti)
  const impact = calculateGlycemicImpact(result.ingredienti, result.piatto)
  const impactBandLabel = t(impactTranslationKey(impact.fascia))
  const convertibleIngredients = result.ingredienti.filter(({ nome }) => fattoreCrudo(nome)).length

  return (
    <div className="p-5 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-[0.18em] text-mint uppercase">{t('analysis.result.recognized')}</p>
          <h2 className="mt-2 text-3xl font-semibold text-brand sm:text-4xl">{result.piatto || t('analysis.result.unnamedDish')}</h2>
          {result.descrizione && <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">{result.descrizione}</p>}
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          {reliability && <span className="status-badge">{t('analysis.result.reliability', { value: reliability })}</span>}
          <span className="status-badge">{t(resultOrigin === 'text' ? 'analysis.result.fromText' : 'analysis.result.fromPhoto')}</span>
          {rawWeightMode === 'dry'
            ? <span className="status-badge">{t('analysis.result.dryWeight')}</span>
            : impact.cotto && <span className="status-badge">{t('analysis.result.cookedWeight')}</span>}
          {impact.pianoIntero && <span className="status-badge border-amber/30 bg-amber-soft text-amber">{t('analysis.result.wholeDishOverride')}</span>}
        </div>
      </div>

      <section className="relative mt-6 overflow-hidden rounded-3xl border border-brand/45 bg-gradient-to-br from-brand-soft via-surface to-amber-soft/40 p-5 shadow-[0_0_42px_rgb(41_182_255_/_0.12)] sm:p-6">
        <div className="pointer-events-none absolute -top-16 -right-14 size-40 rounded-full bg-brand/15 blur-3xl" aria-hidden="true" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] font-extrabold tracking-[0.18em] text-amber uppercase">{t('analysis.pump.kicker')}</p>
            <h3 className="mt-1 text-2xl font-extrabold text-ink">{t('analysis.pump.title')}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{t('analysis.pump.body')}</p>
          </div>
          <output className="shrink-0 text-6xl font-black leading-none tracking-[-0.06em] text-brand sm:text-7xl" aria-label={t('analysis.pump.outputAria', { carbs: formatNumber(impact.carbo) })}>
            {formatNumber(impact.carbo)}<span className="ml-2 text-2xl font-extrabold tracking-normal text-amber">g</span>
          </output>
        </div>
        <div className={`relative mt-5 rounded-2xl border px-4 py-3 text-xs leading-5 ${meal.unresolved.length ? 'border-coral/35 bg-coral-soft text-coral' : 'border-brand/20 bg-brand-deep/55 text-muted'}`}>
          {meal.unresolved.length ? (
            <p>{t('analysis.pump.partial', { count: meal.unresolved.length })}</p>
          ) : (
            <p>{t('analysis.pump.complete')}</p>
          )}
        </div>
      </section>

      <section className="mt-6 grid gap-3 sm:grid-cols-[0.75fr_1.25fr]">
        <div className={`rounded-3xl p-5 ${impactClasses(impact.fascia)}`}>
          <p className="text-xs font-extrabold tracking-[0.16em] uppercase">{t('common.metrics.glycemicLoad')}</p>
          <div className="mt-2 flex items-end gap-2"><strong className="text-4xl leading-none">{formatNumber(impact.cg)}</strong><span className="text-sm font-extrabold uppercase">{impactBandLabel}</span></div>
          <p className="mt-3 text-xs leading-5 opacity-80">{impact.trovati === impact.totali ? t('analysis.impact.includedAll') : t('analysis.impact.includedCount', { found: impact.trovati, total: impact.totali })}</p>
        </div>
        <div className="rounded-3xl border border-line bg-surface p-5">
          <p className="section-label">{t('analysis.impact.incidence')}</p>
          {impact.contributi.length ? (
            <div className="mt-3 space-y-2">
              {impact.contributi.map((item, index) => <div className="flex items-center justify-between gap-4 text-sm" key={`${item.nome}-${index}`}><span className="truncate font-semibold text-ink">{item.nome}</span><strong className="text-brand">+ {formatNumber(item.cg)}</strong></div>)}
            </div>
          ) : <p className="mt-3 text-sm leading-6 text-muted">{t('analysis.impact.empty')}</p>}
        </div>
      </section>

      <NutrientGrid values={meal.nutrition} totalGrams={meal.totalGrams} />

      <section className="mt-7 rounded-3xl border border-line bg-surface p-4 sm:p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="section-label">{t('common.metrics.portion')}</p>
            <div className="mt-2 grid grid-cols-3 gap-2" role="group" aria-label={t('analysis.portion.aria')}>
              {([
                [0.7, 'analysis.portion.small'],
                [1, 'analysis.portion.medium'],
                [1.4, 'analysis.portion.large'],
              ] as const).map(([preset, labelKey]) => (
                <button className={portionPreset === preset ? 'primary-button' : 'secondary-button'} type="button" key={preset} onClick={() => onPortionPresetChange(preset)} disabled={addedToMeal}>{t(labelKey)}<span className="text-[10px] opacity-75">×{preset}</span></button>
              ))}
            </div>
            <p className="mt-2 text-xs leading-5 text-muted">{t('analysis.portion.hint')}</p>
          </div>
          <div>
            <p className="section-label">{t('analysis.weight.title')}</p>
            {convertibleIngredients ? (
              <>
                <div className="mt-2 grid grid-cols-2 gap-2" role="group" aria-label={t('analysis.weight.aria')}>
                  <button className={rawWeightMode === 'cooked' ? 'primary-button' : 'secondary-button'} type="button" onClick={() => onRawWeightModeChange('cooked')} disabled={addedToMeal}>{t('analysis.weight.cooked')}</button>
                  <button className={rawWeightMode === 'dry' ? 'primary-button' : 'secondary-button'} type="button" onClick={() => onRawWeightModeChange('dry')} disabled={addedToMeal}>{t('analysis.weight.dry')}</button>
                </div>
                <p className="mt-2 text-xs leading-5 text-muted">{t('analysis.weight.conversion', { count: convertibleIngredients })}</p>
              </>
            ) : <p className="mt-2 text-xs leading-5 text-muted">{t('analysis.weight.unavailable')}</p>}
          </div>
        </div>
      </section>

      <section className="mt-7">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div><p className="section-label">{t('analysis.ingredients.kicker')}</p><h3 className="mt-1 text-lg font-extrabold text-brand">{t('analysis.ingredients.title')}</h3></div>
          <p className="text-xs text-muted">{t('analysis.ingredients.liveHint')}</p>
        </div>
        <div className="mt-3 divide-y divide-line overflow-hidden rounded-2xl border border-line">
          {result.ingredienti.map((ingredient, index) => {
            const food = resolveRowFood(ingredient)
            const cookedGrams = food ? effectiveIngredientGrams(food, ingredient.grammi) : ingredient.grammi
            const nutrition = food ? calculateIngredientNutrition(food, cookedGrams) : null
            const rawFactor = fattoreCrudo(ingredient.nome)
            const displayedGrams = rawWeightMode === 'dry'
              ? grammiCrudi(ingredient.nome, cookedGrams) ?? cookedGrams
              : cookedGrams
            return (
              <div className="grid gap-3 bg-surface px-4 py-4 sm:grid-cols-[1fr_auto] sm:items-center" key={`${ingredient.catalogo_id || ingredient.nome}-${index}`}>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-ink">{ingredient.nome}</p>
                  {ingredient.cottura && <p className="mt-1 truncate text-xs text-muted">{ingredient.cottura}</p>}
                  {rawFactor && <p className="mt-1 text-xs text-muted">{t('analysis.ingredients.rawFactor', { factor: rawFactor })}</p>}
                  {food && nutrition ? (
                    <p className="mt-2 text-xs leading-5 text-muted">{t('analysis.ingredients.carbs', { category: selectFoodDatasetFields(food, language).categoryLabel, carbs: formatNumber(nutrition.carboidrati_disponibili_g) })}</p>
                  ) : <p className="mt-2 text-xs font-semibold text-coral">{t('analysis.ingredients.insufficient')}</p>}
                </div>
                <label className="flex items-center justify-end gap-2 text-xs font-bold text-muted">
                  <span>{rawWeightMode === 'dry' && rawFactor ? t('analysis.ingredients.dryGrams') : t('analysis.ingredients.grams')}</span>
                  <input aria-label={t('common.aria.gramsOf', { name: ingredient.nome })} className="number-field" inputMode="numeric" max={2000} min={0} step={1} type="number" value={displayedGrams} disabled={addedToMeal} onChange={(event) => onIngredientGramsChange(index, Number(event.target.value))} />
                </label>
              </div>
            )
          })}
        </div>
      </section>

      <details className="mt-5 rounded-2xl border border-line px-4 py-3 text-xs text-muted">
        <summary className="font-bold text-brand">{t('analysis.ingredients.per100')}</summary>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
          {TOTAL_NUTRIENTS.map(({ key, labelKey, unit }) => <div className="rounded-xl bg-surface p-2" key={key}><span>{t(labelKey)}</span><strong className="mt-1 block text-brand">{formatNumber(meal.per100[key])} {unit}</strong></div>)}
        </div>
      </details>

      {result.lezione && <p className="mt-5 rounded-2xl bg-mint-soft p-4 text-sm leading-6 text-brand"><strong>{t('analysis.ingredients.lesson')}</strong> {result.lezione}</p>}
      {result.quando_ha_senso && <p className="mt-3 rounded-2xl bg-amber-soft p-4 text-sm leading-6 text-ink"><strong>{t('analysis.ingredients.context')}</strong> {result.quando_ha_senso}</p>}

      <ResultActions
        result={result}
        resultOrigin={resultOrigin}
        meal={meal}
        impact={impact}
        addedToMeal={addedToMeal}
        mealItemCount={mealItemCount}
        onAddToSession={onAddToSession}
        onAnalyzeAnother={onAnalyzeAnother}
      />
    </div>
  )
}

export default function ResultPanel({
  status,
  result,
  resultOrigin,
  error,
  hasInput,
  portionPreset,
  rawWeightMode,
  addedToMeal,
  mealItemCount,
  onRetry,
  onIngredientGramsChange,
  onPortionPresetChange,
  onRawWeightModeChange,
  onAddToSession,
  onAnalyzeAnother,
}: ResultPanelProps) {
  return (
    <section className="app-card overflow-hidden rounded-[1.75rem] border border-line bg-paper/95 shadow-card backdrop-blur" aria-live="polite">
      {status === 'analyzing' && <LoadingState />}
      {status === 'error' && <ErrorState message={error} canRetry={hasInput} onRetry={onRetry} />}
      {status === 'success' && result && (
        <ResultState
          result={result}
          resultOrigin={resultOrigin}
          portionPreset={portionPreset}
          rawWeightMode={rawWeightMode}
          addedToMeal={addedToMeal}
          mealItemCount={mealItemCount}
          onIngredientGramsChange={onIngredientGramsChange}
          onPortionPresetChange={onPortionPresetChange}
          onRawWeightModeChange={onRawWeightModeChange}
          onAddToSession={onAddToSession}
          onAnalyzeAnother={onAnalyzeAnother}
        />
      )}
      {(status === 'idle' || status === 'preparing') && <EmptyState />}
    </section>
  )
}
