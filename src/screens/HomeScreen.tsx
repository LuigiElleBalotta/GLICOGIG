import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { DATASET_COUNTS } from '../catalog/datasets'
import {
  BarcodeIcon,
  BookOpenIcon,
  CameraIcon,
  ChefHatIcon,
  ChevronRightIcon,
  DiaryIcon,
  LayersIcon,
  SearchIcon,
  SparklesIcon,
} from '../components/Icons'
import { progressiOggi, progressiSetteGiorni } from '../domain/progress'
import type { StabilityLevel } from '../domain/stability'
import { LANGUAGE_LOCALES, resolveSupportedLanguage } from '../i18n/languages'
import { useDayKey } from '../lib/useDayKey'
import { useMealSession } from '../state/mealSessionContext'
import { useDiario } from '../storage/diaryStore'

const LEVEL_KEYS: Record<StabilityLevel, 'classification.stability.veryStable' | 'classification.stability.goodDay' | 'classification.stability.average' | 'classification.stability.demanding'> = {
  moltoStabile: 'classification.stability.veryStable',
  bellaGiornata: 'classification.stability.goodDay',
  nellaMedia: 'classification.stability.average',
  impegnativa: 'classification.stability.demanding',
}

const QUICK_ACTIONS = [
  { href: '#photo', key: 'analyze', icon: CameraIcon },
  { href: '#search', key: 'search', icon: SearchIcon },
  { href: '#barcode', key: 'barcode', icon: BarcodeIcon },
  { href: '#recipes', key: 'recipes', icon: ChefHatIcon },
  { href: '#meal', key: 'meal', icon: LayersIcon },
  { href: '#advice', key: 'advice', icon: SparklesIcon },
  { href: '#learn', key: 'learn', icon: BookOpenIcon },
  { href: '#explanation', key: 'explanation', icon: BookOpenIcon },
] as const

export default function HomeScreen() {
  const { t, i18n } = useTranslation()
  const language = resolveSupportedLanguage(i18n.resolvedLanguage ?? i18n.language)
  const locale = LANGUAGE_LOCALES[language]
  const numberFormatter = useMemo(() => new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }), [locale])
  const dayFormatter = useMemo(() => new Intl.DateTimeFormat(locale, { day: '2-digit' }), [locale])
  const formatNumber = (value: number) => numberFormatter.format(value)
  const localDay = useDayKey('local')
  const diaryEntries = useDiario()
  const today = useMemo(() => progressiOggi(diaryEntries, new Date(`${localDay}T12:00:00`)), [diaryEntries, localDay])
  const week = useMemo(() => progressiSetteGiorni(diaryEntries, new Date(`${localDay}T12:00:00`)), [diaryEntries, localDay])
  const { summary } = useMealSession()
  const todayEntries = diaryEntries.filter((entry) => entry.giorno === today.giorno)

  return (
    <div>
      <section className="mb-7 px-1">
        <p className="screen-kicker">{t('home.hero.kicker')}</p>
        <h1 className="screen-title">{t('home.hero.title')}<br /><span className="text-brand">{t('home.hero.accent')}</span></h1>
        <p className="screen-subtitle">{t('home.hero.subtitle')}</p>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label={t('home.verified.aria')}>
        <div className="metric-card"><strong>{t('home.verified.foods', { count: DATASET_COUNTS.foods })}</strong></div>
        <div className="metric-card"><strong>{t('home.verified.recipes', { count: DATASET_COUNTS.recipes })}</strong></div>
        <div className="metric-card"><strong>{t('home.verified.chapters', { count: DATASET_COUNTS.learningChapters })}</strong></div>
        <div className="metric-card"><strong>{t('home.verified.questions', { count: DATASET_COUNTS.quizQuestions })}</strong></div>
      </section>

      <section className="mt-5 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="app-card rounded-3xl border border-line bg-paper p-5 shadow-card sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div><p className="section-label">{t('common.labels.today')}</p><h2 className="mt-1 text-2xl font-extrabold text-ink">{today.totali.n ? t('home.today.entries', { count: today.totali.n }) : t('home.today.empty')}</h2></div>
            <a className="icon-link" href="#diary" aria-label={t('home.today.openDiaryAria')}><DiaryIcon className="size-5" /></a>
          </div>
          {today.totali.n ? <><div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4"><div className="data-tile"><span>{t('common.metrics.energy')}</span><strong>{formatNumber(today.totali.kcal)} kcal</strong></div><div className="data-tile"><span>{t('common.metrics.carbohydrates')}</span><strong>{formatNumber(today.totali.carbo)} g</strong></div><div className="data-tile"><span>{t('common.metrics.protein')}</span><strong>{formatNumber(today.totali.prot)} g</strong></div><div className="data-tile"><span>{t('common.metrics.fat')}</span><strong>{formatNumber(today.totali.grassi)} g</strong></div></div><div className="mt-4 flex flex-wrap items-center gap-2 text-xs"><span className="status-badge">{t('home.today.index', { value: today.indice === null ? t('common.labels.notAvailable') : formatNumber(today.indice) })}</span>{today.livello && <span className="status-badge">{t(LEVEL_KEYS[today.livello])}</span>}</div></> : <p className="mt-4 max-w-lg text-sm leading-6 text-muted">{t('home.today.emptyHint')}</p>}
        </article>

        <article className="app-card rounded-3xl border border-line bg-paper p-5 shadow-card sm:p-6">
          <p className="section-label">{t('home.week.title')}</p><h2 className="mt-1 text-2xl font-extrabold text-ink">{t('home.week.activeDays', { days: formatNumber(week.giorniConVoci) })}</h2>
          <div className="mt-5 flex h-20 items-end gap-2" aria-label={t('home.week.entriesAria')}>{week.giorni.map((day) => { const max = Math.max(1, ...week.giorni.map(({ totali }) => totali.n)); const height = day.totali.n ? Math.max(18, (day.totali.n / max) * 100) : 5; return <div className="flex min-w-0 flex-1 flex-col items-center justify-end gap-1" key={day.giorno}><span className="w-full rounded-t-md bg-brand/75" style={{ height: `${height}%` }} /><span className="text-[9px] text-muted">{dayFormatter.format(new Date(`${day.giorno}T00:00:00`))}</span></div> })}</div>
          <p className="mt-3 text-xs text-muted">{week.indice === null ? t('home.week.stabilityEmpty') : t('home.week.summary', { index: formatNumber(week.indice), level: week.livello ? t(LEVEL_KEYS[week.livello]) : '' })}</p>
        </article>
      </section>

      {summary.plates > 0 && <section className="mt-4 rounded-3xl border border-brand/30 bg-brand-soft/45 p-5"><p className="section-label text-brand">{t('home.meal.title')}</p><div className="mt-2 flex flex-wrap items-end justify-between gap-3"><div><strong className="text-2xl text-ink">{t('home.meal.plates', { count: summary.plates })}</strong><p className="mt-1 text-sm text-muted">{t('home.meal.summary', { carbs: formatNumber(summary.carbs), glycemicLoad: formatNumber(summary.glycemicLoad) })}</p></div><a className="secondary-button" href="#meal">{t('common.actions.openTheMeal')} <ChevronRightIcon className="size-4" /></a></div></section>}

      <section className="mt-7"><div className="px-1"><p className="section-label">{t('home.quick.kicker')}</p><h2 className="mt-1 text-2xl font-extrabold text-ink">{t('home.quick.title')}</h2></div><div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{QUICK_ACTIONS.map(({ href, key, icon: Icon }) => <a className="group rounded-3xl border border-line bg-surface p-4 transition hover:-translate-y-0.5 hover:border-brand/50" href={href} key={href}><div className="flex items-center justify-between"><span className="grid size-11 place-items-center rounded-2xl bg-brand-soft text-brand"><Icon className="size-5" /></span><ChevronRightIcon className="size-5 text-muted transition group-hover:text-brand" /></div><h3 className="mt-4 font-extrabold text-ink">{t(`home.quick.${key}.label`)}</h3><p className="mt-1 text-xs text-muted">{t(`home.quick.${key}.note`)}</p></a>)}</div></section>

      {todayEntries.length > 0 && <p className="mt-6 text-xs text-muted">{t('home.today.localData', { count: todayEntries.length })}</p>}
    </div>
  )
}
