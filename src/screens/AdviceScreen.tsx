import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ActivityIcon,
  DiaryIcon,
  LayersIcon,
  SparklesIcon,
  UtensilsIcon,
} from '../components/Icons'
import {
  andamentoSettimana,
  bilancioOggi,
  datiAnelliOggi,
  giorniConsecutivi,
  reportSettimana,
} from '../domain/progress'
import { selectDiaryEntryName } from '../i18n/diarySelectors'
import { LANGUAGE_LOCALES, resolveSupportedLanguage } from '../i18n/languages'
import { useDayKey } from '../lib/useDayKey'
import { useMealSession } from '../state/mealSessionContext'
import { useDiario } from '../storage/diaryStore'
import type { GlycemicImpactBand } from '../types/nutrition'

const BALANCE_KEYS = {
  buono: 'classification.balance.good',
  discreto: 'classification.balance.fair',
  daBilanciare: 'classification.balance.improve',
} as const

const VERDICT_KEYS = {
  equilibrata: 'classification.verdict.balanced',
  moderata: 'classification.verdict.moderate',
  intensa: 'classification.verdict.intense',
} as const

const IMPACT_KEYS: Record<GlycemicImpactBand, string> = {
  trascurabile: 'classification.impact.negligible',
  basso: 'classification.impact.low',
  medio: 'classification.impact.medium',
  alto: 'classification.impact.high',
}

function formatNumber(value: number | null | undefined, locale: string, fallback: string): string {
  return value == null || !Number.isFinite(value)
    ? fallback
    : new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(value)
}

export default function AdviceScreen() {
  const { t, i18n } = useTranslation()
  const language = resolveSupportedLanguage(i18n.resolvedLanguage ?? i18n.language)
  const locale = LANGUAGE_LOCALES[language]
  const notAvailable = t('common.labels.notAvailable')
  const localDay = useDayKey('local')
  const diaryEntries = useDiario()
  const { entries: mealEntries, summary } = useMealSession()
  const progress = useMemo(() => {
    const reference = new Date(`${localDay}T12:00:00`)
    return {
      rings: datiAnelliOggi(diaryEntries, reference),
      balance: bilancioOggi(diaryEntries, reference),
      streak: giorniConsecutivi(diaryEntries, reference),
      trend: andamentoSettimana(diaryEntries, reference),
      report: reportSettimana(null, diaryEntries, reference),
    }
  }, [diaryEntries, localDay])
  const trendText = !progress.trend
    ? t('classification.verdict.insufficient')
    : progress.trend.key === 'meglio'
      ? t('diary.trend.better', { pct: formatNumber(progress.trend.pct, locale, notAvailable) })
      : progress.trend.key === 'margine'
        ? t('diary.trend.margin', { pct: formatNumber(progress.trend.pct, locale, notAvailable) })
        : t('diary.trend.aligned')

  return (
    <div>
      <section className="mb-6 px-1">
        <p className="screen-kicker">{t('advice.hero.kicker')}</p>
        <h1 className="screen-title">{t('advice.hero.title')} <span className="text-brand">{t('advice.hero.accent')}</span></h1>
        <p className="screen-subtitle">{t('advice.hero.subtitle')}</p>
      </section>

      {mealEntries.length > 0 ? (
        <section className="app-card rounded-3xl border border-brand/35 bg-paper p-5 shadow-card sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div><p className="section-label">{t('home.meal.title')}</p><h2 className="mt-1 text-2xl font-extrabold text-ink">{t('home.meal.plates', { count: summary.plates })}</h2></div>
            <LayersIcon className="size-7 text-brand" />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <div className="data-tile"><span>{t('common.metrics.carbohydrates')}</span><strong>{formatNumber(summary.carbs, locale, notAvailable)} g</strong></div>
            <div className="data-tile"><span>{t('common.metrics.glycemicLoad')}</span><strong>{formatNumber(summary.glycemicLoad, locale, notAvailable)}</strong></div>
            <div className="data-tile"><span>{t('common.labels.band')}</span><strong>{t(IMPACT_KEYS[summary.band])}</strong></div>
            <div className="data-tile"><span>{t('common.metrics.fibre')}</span><strong>{formatNumber(summary.fibre, locale, notAvailable)} g</strong></div>
          </div>
          {summary.unresolved > 0 && <p className="mt-4 rounded-2xl border border-amber/30 bg-amber-soft p-3 text-sm text-amber">{t('advice.meal.unresolved', { count: summary.unresolved })}</p>}
          <a className="secondary-button mt-4" href="#meal"><UtensilsIcon className="size-5" /> {t('common.actions.openTheMeal')}</a>
        </section>
      ) : (
        <section className="rounded-3xl border border-dashed border-line bg-surface p-6 text-center">
          <UtensilsIcon className="mx-auto size-9 text-muted" />
          <h2 className="mt-3 font-extrabold text-ink">{t('advice.meal.emptyTitle')}</h2>
          <p className="mt-2 text-sm text-muted">{t('advice.meal.emptyBody')}</p>
          <a className="secondary-button mt-4" href="#meal">{t('advice.meal.compose')}</a>
        </section>
      )}

      <section className="mt-5 grid gap-4 lg:grid-cols-2">
        <article className="app-card rounded-3xl border border-line bg-paper p-5 shadow-card sm:p-6">
          <div className="flex items-start justify-between gap-3"><div><p className="section-label">{t('common.labels.today')}</p><h2 className="mt-1 text-2xl font-extrabold text-ink">{t('advice.todayTitle')}</h2></div><ActivityIcon className="size-7 text-brand" /></div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="data-tile"><span>{t('common.progress.balance')}</span><strong>{formatNumber(progress.rings.equilibrio, locale, notAvailable)}%</strong></div>
            <div className="data-tile"><span>{t('common.progress.brakes')}</span><strong>{formatNumber(progress.rings.freni, locale, notAvailable)}%</strong></div>
            <div className="data-tile"><span>{t('common.progress.variety')}</span><strong>{formatNumber(progress.rings.varieta, locale, notAvailable)}%</strong></div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="data-tile"><span>{t('common.progress.assessment')}</span><strong>{progress.balance ? t(BALANCE_KEYS[progress.balance]) : notAvailable}</strong></div>
            <div className="data-tile"><span>{t('common.progress.continuity')}</span><strong>{t('diary.rings.streak', { count: progress.streak })}</strong></div>
            <div className="data-tile"><span>{t('common.progress.trend')}</span><strong>{trendText}</strong></div>
          </div>
        </article>

        <article className="app-card rounded-3xl border border-line bg-paper p-5 shadow-card sm:p-6">
          <div className="flex items-start justify-between gap-3"><div><p className="section-label">{t('diary.week.title')}</p><h2 className="mt-1 text-2xl font-extrabold text-ink">{t('advice.weekTitle')}</h2></div><SparklesIcon className="size-7 text-brand" /></div>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <div className="data-tile"><span>{t('common.metrics.entries')}</span><strong>{formatNumber(progress.report.nPasti, locale, notAvailable)}</strong></div>
            <div className="data-tile"><span>{t('common.metrics.activeDays')}</span><strong>{formatNumber(progress.report.giorniAttivi, locale, notAvailable)}</strong></div>
            <div className="data-tile"><span>{t('common.metrics.kcalPerDay')}</span><strong>{formatNumber(progress.report.kcalGiorno, locale, notAvailable)}</strong></div>
            <div className="data-tile"><span>{t('common.progress.verdict')}</span><strong>{t(VERDICT_KEYS[progress.report.verdetto])}</strong></div>
          </div>
          {progress.report.difficile ? (
            <div className="mt-4 rounded-2xl border border-amber/35 bg-amber-soft p-4">
              <p className="text-xs font-bold tracking-wide text-muted uppercase">{t('diary.week.hardestMeal')}</p>
              <p className="mt-1 font-extrabold text-ink">{selectDiaryEntryName(progress.report.difficile, language)}</p>
              <p className="mt-1 text-xs text-muted">{t('catalog.detail.impactSummary', { value: formatNumber(progress.report.difficile.cg, locale, notAvailable), band: t(IMPACT_KEYS[progress.report.difficile.fascia]) })}</p>
            </div>
          ) : <p className="mt-4 text-sm leading-6 text-muted">{t('advice.noHardMeal')}</p>}
          <a className="secondary-button mt-4" href="#diary"><DiaryIcon className="size-5" /> {t('common.actions.openProgress')}</a>
        </article>
      </section>

      <p className="mt-6 border-t border-line pt-5 text-xs leading-5 text-muted">{t('advice.disclaimer')}</p>
    </div>
  )
}
