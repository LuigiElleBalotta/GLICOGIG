import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  BarcodeIcon,
  CameraIcon,
  CheckIcon,
  ChefHatIcon,
  LayersIcon,
  SaveIcon,
  SearchIcon,
  ShareIcon,
  TrashIcon,
} from '../components/Icons'
import { selectMealItemName } from '../i18n/mealSelectors'
import { LANGUAGE_LOCALES, resolveSupportedLanguage } from '../i18n/languages'
import { condividiCard } from '../services/shareCard'
import { useMealSession } from '../state/mealSession'
import { DIARY_STORAGE_KEY, registraMangiato } from '../storage/diaryStore'
import type { MealItem, MealItemSource } from '../types/meal'
import type { GlycemicImpactBand } from '../types/nutrition'

const IMPACT_KEYS: Record<GlycemicImpactBand, string> = {
  trascurabile: 'classification.impact.negligible',
  basso: 'classification.impact.low',
  medio: 'classification.impact.medium',
  alto: 'classification.impact.high',
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

function formatNumber(value: number | null | undefined, locale: string, fallback: string): string {
  return value == null || !Number.isFinite(value)
    ? fallback
    : new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(value)
}

type ActionState = 'idle' | 'working' | 'success' | 'error'

export default function MealScreen() {
  const { t, i18n } = useTranslation()
  const language = resolveSupportedLanguage(i18n.resolvedLanguage ?? i18n.language)
  const locale = LANGUAGE_LOCALES[language]
  const notAvailable = t('common.labels.notAvailable')
  const {
    name,
    startedAt,
    entries,
    summary,
    setName,
    removeItem,
    clearMeal,
  } = useMealSession()
  const [saveState, setSaveState] = useState<ActionState>('idle')
  const [shareState, setShareState] = useState<ActionState>('idle')

  useEffect(() => {
    setSaveState('idle')
    setShareState('idle')
  }, [entries, name])

  const canSaveMeal = summary.unresolved === 0
    && summary.kcal !== null
    && summary.protein !== null
    && summary.fat !== null
    && summary.fibre !== null

  const sourceText = (source: MealItemSource): string => {
    if (source.kind === 'photo') return t(source.analysisOrigin === 'text' ? 'analysis.mode.text' : 'meal.shortcuts.photo.label')
    if (source.kind === 'catalog') return t('meal.shortcuts.catalog.label')
    if (source.kind === 'barcode') return t('meal.shortcuts.barcode.label')
    if (source.kind === 'manual') return t('diary.week.manual')
    return t('share.recipe.subtitle', {
      category: t('meal.shortcuts.recipes.label'),
      count: source.portions,
    })
  }

  function saveMeal(): void {
    if (!entries.length || !name.trim() || !canSaveMeal) return
    setSaveState('working')
    try {
      const entry = registraMangiato({
        nome: name.trim(),
        fonte: 'pasto',
        fascia: summary.band,
        cg: summary.glycemicLoad,
        kcal: summary.kcal,
        carbo: summary.carbs,
        prot: summary.protein,
        grassi: summary.fat,
        fibre: summary.fibre,
        grammi: summary.totalGrams,
      })
      setSaveState(diaryEntryPersisted(entry.id) ? 'success' : 'error')
    } catch {
      setSaveState('error')
    }
  }

  async function shareMeal(): Promise<void> {
    if (!entries.length) return
    setShareState('working')
    const shared = await condividiCard({
      title: name.trim() || t('share.meal.fallbackTitle'),
      subtitle: t('share.meal.subtitle', {
        count: summary.plates,
        grams: formatNumber(summary.totalGrams, locale, notAvailable),
      }),
      items: [
        { label: t('common.metrics.energy'), value: `${formatNumber(summary.kcal, locale, notAvailable)} kcal` },
        { label: t('common.metrics.carbohydrates'), value: `${formatNumber(summary.carbs, locale, notAvailable)} g` },
        { label: t('common.metrics.glycemicLoad'), value: `${formatNumber(summary.glycemicLoad, locale, notAvailable)} · ${t(IMPACT_KEYS[summary.band])}` },
        { label: t('common.metrics.protein'), value: `${formatNumber(summary.protein, locale, notAvailable)} g` },
        { label: t('common.metrics.fat'), value: `${formatNumber(summary.fat, locale, notAvailable)} g` },
        { label: t('common.metrics.fibre'), value: `${formatNumber(summary.fibre, locale, notAvailable)} g` },
      ],
      note: t('share.meal.note'),
    }, { fileName: 'glicogig-pasto.png' })
    setShareState(shared ? 'success' : 'error')
  }

  return (
    <div>
      <section className="mb-6 px-1">
        <p className="screen-kicker">{t('meal.hero.kicker')}</p>
        <h1 className="screen-title">{t('meal.hero.title')} <span className="text-brand">{t('meal.hero.accent')}</span></h1>
        <p className="screen-subtitle">{t('meal.hero.subtitle')}</p>
      </section>

      <section className="app-card rounded-3xl border border-line bg-paper p-5 shadow-card sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <label className="min-w-0 flex-1 text-xs font-bold text-muted" htmlFor="meal-name">{t('meal.form.name')}
            <input id="meal-name" className="field mt-2" value={name} maxLength={60} onChange={(event) => setName(event.target.value)} />
          </label>
          {startedAt && <p className="text-xs text-muted">{t('meal.form.startedAt', { time: new Date(startedAt).toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' }) })}</p>}
        </div>

        {entries.length ? (
          <>
            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
              <div className="data-tile"><span>{t('common.metrics.plates')}</span><strong>{formatNumber(summary.plates, locale, notAvailable)}</strong></div>
              <div className="data-tile"><span>{t('common.metrics.energy')}</span><strong>{formatNumber(summary.kcal, locale, notAvailable)} kcal</strong></div>
              <div className="data-tile"><span>{t('common.metrics.carbohydrates')}</span><strong>{formatNumber(summary.carbs, locale, notAvailable)} g</strong></div>
              <div className="data-tile"><span>{t('common.metrics.totalGlycemicLoad')}</span><strong>{formatNumber(summary.glycemicLoad, locale, notAvailable)}</strong></div>
              <div className="data-tile"><span>{t('common.labels.band')}</span><strong>{t(IMPACT_KEYS[summary.band])}</strong></div>
              <div className="data-tile"><span>{t('common.metrics.weight')}</span><strong>{formatNumber(summary.totalGrams, locale, notAvailable)} g</strong></div>
            </div>

            <ul className="mt-5 space-y-2">
              {entries.map(({ id, item }) => {
                const displayName = selectMealItemName(item, language)
                return (
                  <li className="rounded-2xl border border-line bg-surface p-4" key={id}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0"><p className="font-extrabold text-ink">{displayName}</p><p className="mt-1 text-xs text-muted">{sourceText(item.source)} · {formatNumber(item.grams, locale, notAvailable)} g</p></div>
                      <button className="icon-link shrink-0 text-coral" type="button" onClick={() => removeItem(id)} aria-label={t('common.aria.removeFromMeal', { name: displayName })}><TrashIcon className="size-4" /></button>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs"><span className="status-badge">{formatNumber(item.kcal, locale, notAvailable)} kcal</span><span className="status-badge">{formatNumber(item.carbs, locale, notAvailable)} g {t('common.metrics.carbohydrates').toLocaleLowerCase(locale)}</span><span className="status-badge">{t('common.metrics.glycemicLoadShort')} {formatNumber(item.glycemicLoad, locale, notAvailable)}</span><span className="status-badge">{t(IMPACT_KEYS[item.band])}</span></div>
                  </li>
                )
              })}
            </ul>

            {summary.unresolved > 0 && <p className="mt-4 rounded-2xl border border-amber/25 bg-amber-soft p-4 text-sm text-amber">{t('meal.unresolved', { count: summary.unresolved })}</p>}
            {!canSaveMeal && <p className="mt-4 rounded-2xl border border-coral/25 bg-coral-soft p-4 text-sm text-coral">{t('meal.cannotSave')}</p>}
            <div className="mt-5 grid gap-2 sm:grid-cols-3">
              <button className="primary-button" type="button" onClick={saveMeal} disabled={saveState === 'working' || saveState === 'success' || !name.trim() || !canSaveMeal}>{saveState === 'success' ? <CheckIcon className="size-5" /> : <SaveIcon className="size-5" />}{t(saveState === 'working' ? 'common.actions.saving' : saveState === 'success' ? 'meal.saved' : 'common.actions.ateIt')}</button>
              <button className="secondary-button" type="button" onClick={() => void shareMeal()} disabled={shareState === 'working'}><ShareIcon className="size-5" />{t(shareState === 'working' ? 'common.actions.preparing' : 'common.actions.share')}</button>
              <button className="secondary-button text-coral" type="button" onClick={clearMeal}><TrashIcon className="size-5" />{t('common.actions.emptyMeal')}</button>
            </div>
            <div className="mt-2 text-xs" aria-live="polite">{saveState === 'error' && <p className="text-coral">{t('common.feedback.persistenceUnconfirmed')}</p>}{shareState === 'error' && <p className="text-coral">{t('common.feedback.shareUnavailable')}</p>}{shareState === 'success' && <p className="text-mint">{t('common.feedback.shareSuccess')}</p>}{saveState === 'success' && <a className="font-bold text-brand underline" href="#diary">{t('common.actions.openProgress')}</a>}</div>
          </>
        ) : (
          <div className="mt-5 rounded-3xl border border-dashed border-line p-8 text-center"><LayersIcon className="mx-auto size-11 text-brand" /><h2 className="mt-3 text-xl font-extrabold text-ink">{t('meal.empty.title')}</h2><p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-muted">{t('meal.empty.body')}</p></div>
        )}
      </section>

      <section className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label={t('meal.addAria')}>
        <a className="rounded-3xl border border-line bg-surface p-4" href="#photo"><CameraIcon className="size-6 text-brand" /><strong className="mt-3 block text-ink">{t('meal.shortcuts.photo.label')}</strong><span className="mt-1 block text-xs text-muted">{t('meal.shortcuts.photo.note')}</span></a>
        <a className="rounded-3xl border border-line bg-surface p-4" href="#search"><SearchIcon className="size-6 text-brand" /><strong className="mt-3 block text-ink">{t('meal.shortcuts.catalog.label')}</strong><span className="mt-1 block text-xs text-muted">{t('meal.shortcuts.catalog.note')}</span></a>
        <a className="rounded-3xl border border-line bg-surface p-4" href="#barcode"><BarcodeIcon className="size-6 text-amber" /><strong className="mt-3 block text-ink">{t('meal.shortcuts.barcode.label')}</strong><span className="mt-1 block text-xs text-muted">{t('meal.shortcuts.barcode.note')}</span></a>
        <a className="rounded-3xl border border-line bg-surface p-4" href="#recipes"><ChefHatIcon className="size-6 text-brand" /><strong className="mt-3 block text-ink">{t('meal.shortcuts.recipes.label')}</strong><span className="mt-1 block text-xs text-muted">{t('meal.shortcuts.recipes.note')}</span></a>
      </section>
    </div>
  )
}
