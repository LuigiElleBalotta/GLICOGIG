import { useMemo, useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ActivityIcon,
  CalendarIcon,
  CameraIcon,
  CheckIcon,
  DiaryIcon,
  EditIcon,
  PlusIcon,
  SaveIcon,
  ShareIcon,
  TrashIcon,
} from '../components/Icons'
import { estimateManualImpact, mealItemFromManual } from '../domain/meal'
import {
  andamentoSettimana,
  bilancioOggi,
  datiAnelliOggi,
  giorniConsecutivi,
  progressiSetteGiorni,
  reportSettimana,
} from '../domain/progress'
import type { StabilityLevel } from '../domain/stability'
import { selectDiaryEntryName } from '../i18n/diarySelectors'
import { LANGUAGE_LOCALES, resolveSupportedLanguage } from '../i18n/languages'
import { useDayKey } from '../lib/useDayKey'
import { condividiCard } from '../services/shareCard'
import {
  DIARY_STORAGE_KEY,
  registraMangiato,
  rimuoviDalDiario,
  rinominaVoce,
  spostaSlot,
  useDiario,
} from '../storage/diaryStore'
import type { DiaryEntry } from '../types/diary'
import type { GlycemicImpactBand } from '../types/nutrition'

const SLOT_OPTIONS = ['Colazione', 'Pranzo', 'Cena', 'Spuntino'] as const
const SLOT_KEYS: Record<(typeof SLOT_OPTIONS)[number], string> = {
  Colazione: 'diary.slots.breakfast',
  Pranzo: 'diary.slots.lunch',
  Cena: 'diary.slots.dinner',
  Spuntino: 'diary.slots.snack',
}
const LEVEL_KEYS: Record<StabilityLevel, string> = {
  moltoStabile: 'classification.stability.veryStable',
  bellaGiornata: 'classification.stability.goodDay',
  nellaMedia: 'classification.stability.average',
  impegnativa: 'classification.stability.demanding',
}
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

function dayDate(day: string): Date {
  return new Date(`${day}T12:00:00`)
}

function displayDay(day: string, today: string, locale: string, todayLabel: string): string {
  if (day === today) return todayLabel
  return dayDate(day).toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'short' })
}

function displayDate(day: string, locale: string): string {
  return dayDate(day).toLocaleDateString(locale)
}

function displayDayNumber(day: string, locale: string): string {
  return dayDate(day).toLocaleDateString(locale, { day: 'numeric' })
}

function formatNumber(value: number | null | undefined, locale: string, fallback: string): string {
  return value == null || !Number.isFinite(value)
    ? fallback
    : new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(value)
}

function ProgressRing({ label, value }: { label: string; value: number }) {
  const { t, i18n } = useTranslation()
  const language = resolveSupportedLanguage(i18n.resolvedLanguage ?? i18n.language)
  const formattedValue = formatNumber(value, LANGUAGE_LOCALES[language], t('common.labels.notAvailable'))

  return (
    <div className="rounded-2xl border border-line bg-surface p-3 text-center">
      <div className="relative mx-auto size-20" role="img" aria-label={t('common.aria.ringValue', { label, value: formattedValue })}>
        <svg className="size-20 -rotate-90" viewBox="0 0 36 36" aria-hidden="true">
          <circle className="fill-none stroke-line" cx="18" cy="18" r="15.5" strokeWidth="3" />
          <circle className="fill-none stroke-brand" cx="18" cy="18" r="15.5" pathLength="100" strokeDasharray={`${value} 100`} strokeLinecap="round" strokeWidth="3" />
        </svg>
        <strong className="absolute inset-0 flex items-center justify-center text-lg text-ink">{formattedValue}%</strong>
      </div>
      <span className="mt-2 block text-xs font-bold text-muted">{label}</span>
    </div>
  )
}

function DiaryRow({ entry }: { entry: DiaryEntry }) {
  const { t, i18n } = useTranslation()
  const language = resolveSupportedLanguage(i18n.resolvedLanguage ?? i18n.language)
  const locale = LANGUAGE_LOCALES[language]
  const notAvailable = t('common.labels.notAvailable')
  const displayName = selectDiaryEntryName(entry, language)
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(displayName)
  const source = (() => {
    if (!entry.fonte) return t('common.labels.localSource')
    if (entry.fonte === 'manuale') return t('diary.week.manual')
    if (entry.fonte === 'foto') return t('meal.shortcuts.photo.label')
    if (entry.fonte === 'catalogo') return t('meal.shortcuts.catalog.label')
    if (entry.fonte === 'barcode') return t('meal.shortcuts.barcode.label')
    if (entry.fonte === 'ricetta') return t('meal.shortcuts.recipes.label')
    if (entry.fonte === 'pasto') return t('share.meal.fallbackTitle')
    return entry.fonte
  })()

  function commitRename(): void {
    if (rinominaVoce(entry.id, name)) setEditing(false)
  }

  return (
    <li className="rounded-2xl border border-line bg-surface p-4">
      <div className="flex items-start justify-between gap-3"><div className="min-w-0 flex-1">{editing ? <div className="flex gap-2"><input className="field min-w-0" value={name} maxLength={60} onChange={(event) => setName(event.target.value)} aria-label={t('diary.row.newNameAria')} /><button className="icon-link shrink-0" type="button" onClick={commitRename} aria-label={t('diary.row.confirmNameAria')}><CheckIcon className="size-5" /></button></div> : <><p className="truncate font-extrabold text-ink">{displayName}</p><p className="mt-1 text-xs text-muted">{source} · {new Date(entry.ts).toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })}</p></>}</div><div className="flex shrink-0 gap-1"><button className="icon-link" type="button" onClick={() => { if (!editing) setName(displayName); setEditing((value) => !value) }} aria-label={t('common.aria.rename', { name: displayName })}><EditIcon className="size-4" /></button><button className="icon-link text-coral" type="button" onClick={() => rimuoviDalDiario(entry.id)} aria-label={t('common.aria.delete', { name: displayName })}><TrashIcon className="size-4" /></button></div></div>
      <div className="mt-3 flex flex-wrap gap-2 text-xs"><span className="status-badge">{formatNumber(entry.kcal, locale, notAvailable)} kcal</span><span className="status-badge">{formatNumber(entry.carbo, locale, notAvailable)} g {t('common.metrics.carbohydrates').toLocaleLowerCase(locale)}</span><span className="status-badge">{t('common.metrics.glycemicLoadShort')} {formatNumber(entry.cg, locale, notAvailable)}</span><span className="status-badge">{t(IMPACT_KEYS[entry.fascia])}</span></div>
      <label className="mt-3 flex items-center gap-2 text-xs font-bold text-muted">{t('diary.slots.moment')}<select className="field min-h-9 flex-1 py-1.5" value={entry.slot ?? ''} onChange={(event) => spostaSlot(entry.id, event.target.value || null)}><option value="">{t('common.labels.noSlot')}</option>{SLOT_OPTIONS.map((slot) => <option value={slot} key={slot}>{t(SLOT_KEYS[slot])}</option>)}</select></label>
    </li>
  )
}

function ManualEntryForm() {
  const { t, i18n } = useTranslation()
  const language = resolveSupportedLanguage(i18n.resolvedLanguage ?? i18n.language)
  const locale = LANGUAGE_LOCALES[language]
  const notAvailable = t('common.labels.notAvailable')
  const [name, setName] = useState('')
  const [grams, setGrams] = useState('100')
  const [carbs, setCarbs] = useState('0')
  const [protein, setProtein] = useState('0')
  const [fat, setFat] = useState('0')
  const [fibre, setFibre] = useState('0')
  const [slot, setSlot] = useState('')
  const [saveState, setSaveState] = useState<'idle' | 'success' | 'error'>('idle')
  const input = useMemo(() => ({
    name,
    carbs: Math.max(0, Number(carbs) || 0),
    protein: Math.max(0, Number(protein) || 0),
    fat: Math.max(0, Number(fat) || 0),
    fibre: Math.max(0, Number(fibre) || 0),
  }), [carbs, fat, fibre, name, protein])
  const estimate = useMemo(() => estimateManualImpact(input, language), [input, language])

  function submit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    if (!name.trim()) return
    const item = mealItemFromManual({
      ...input,
      grams: Math.max(0, Number(grams) || 0),
    }, language)
    try {
      const entry = registraMangiato({
        nome: item.name,
        fonte: 'manuale',
        fascia: item.band,
        cg: item.glycemicLoad,
        kcal: item.kcal,
        carbo: item.carbs,
        prot: item.protein,
        grassi: item.fat,
        fibre: item.fibre,
        grammi: item.grams,
        slot: slot || undefined,
      })
      setSaveState(diaryEntryPersisted(entry.id) ? 'success' : 'error')
      if (diaryEntryPersisted(entry.id)) setName('')
    } catch {
      setSaveState('error')
    }
  }

  const numberField = (label: string, value: string, setter: (next: string) => void) => <label className="text-xs font-bold text-muted">{label}<input className="field mt-1" type="number" inputMode="decimal" min={0} step="0.1" value={value} onChange={(event) => { setter(event.target.value); setSaveState('idle') }} /></label>

  return (
    <form className="mt-4" onSubmit={submit}>
      <label className="text-xs font-bold text-muted">{t('diary.manual.name')}<input className="field mt-1" value={name} maxLength={80} required onChange={(event) => { setName(event.target.value); setSaveState('idle') }} placeholder={t('diary.manual.placeholder')} /></label>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">{numberField(t('diary.manual.grams'), grams, setGrams)}{numberField(t('diary.manual.carbs'), carbs, setCarbs)}{numberField(t('diary.manual.fibre'), fibre, setFibre)}{numberField(t('diary.manual.protein'), protein, setProtein)}{numberField(t('diary.manual.fat'), fat, setFat)}<label className="text-xs font-bold text-muted">{t('diary.slots.moment')}<select className="field mt-1" value={slot} onChange={(event) => setSlot(event.target.value)}><option value="">{t('common.labels.noSlot')}</option>{SLOT_OPTIONS.map((value) => <option value={value} key={value}>{t(SLOT_KEYS[value])}</option>)}</select></label></div>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4"><div className="data-tile"><span>{t(estimate.indexSource === 'catalogo' ? 'diary.manual.catalogGi' : 'diary.manual.estimatedGi')}</span><strong>{formatNumber(estimate.glycemicIndex, locale, notAvailable)}</strong></div><div className="data-tile"><span>{t('common.metrics.glycemicLoadShort')}</span><strong>{formatNumber(estimate.glycemicLoad, locale, notAvailable)}</strong></div><div className="data-tile"><span>{t('common.labels.band')}</span><strong>{t(IMPACT_KEYS[estimate.band])}</strong></div><div className="data-tile"><span>{t('common.metrics.energy')}</span><strong>{formatNumber(estimate.kcal, locale, notAvailable)} kcal</strong></div></div>
      <p className="mt-3 text-xs leading-5 text-muted">{t('diary.manual.estimateNote')}</p>
      <button className="primary-button mt-4 w-full" type="submit" disabled={!name.trim() || saveState === 'success'}>{saveState === 'success' ? <CheckIcon className="size-5" /> : <SaveIcon className="size-5" />}{t(saveState === 'success' ? 'diary.manual.saved' : 'diary.manual.action')}</button>
      {saveState === 'error' && <p className="mt-2 text-xs text-coral">{t('common.feedback.persistenceUnconfirmed')}</p>}
    </form>
  )
}

export default function DiaryScreen() {
  const { t, i18n } = useTranslation()
  const language = resolveSupportedLanguage(i18n.resolvedLanguage ?? i18n.language)
  const locale = LANGUAGE_LOCALES[language]
  const notAvailable = t('common.labels.notAvailable')
  const localDay = useDayKey('local')
  const entries = useDiario()
  const progress = useMemo(() => {
    const reference = new Date()
    return {
      week: progressiSetteGiorni(entries, reference),
      rings: datiAnelliOggi(entries, reference),
      balance: bilancioOggi(entries, reference),
      streak: giorniConsecutivi(entries, reference),
      balanceTrend: andamentoSettimana(entries, reference),
      weeklyReport: reportSettimana(null, entries, reference),
    }
  }, [entries, localDay])
  const { week, rings, balance, streak, balanceTrend, weeklyReport } = progress
  const [selectedDay, setSelectedDay] = useState(localDay)
  const [manualOpen, setManualOpen] = useState(false)
  const [shareState, setShareState] = useState<'idle' | 'working' | 'success' | 'error'>('idle')
  const selectedProgress = week.giorni.find(({ giorno }) => giorno === selectedDay) ?? week.giorni[week.giorni.length - 1]
  const selectedEntries = entries.filter((entry) => entry.giorno === selectedProgress.giorno).slice().sort((first, second) => second.ts - first.ts)
  const maxWeeklyCg = Math.max(1, ...weeklyReport.perGiorno)
  const trendLabel = !balanceTrend
    ? notAvailable
    : balanceTrend.key === 'meglio'
      ? t('diary.trend.better', { pct: formatNumber(balanceTrend.pct, locale, notAvailable) })
      : balanceTrend.key === 'margine'
        ? t('diary.trend.margin', { pct: formatNumber(balanceTrend.pct, locale, notAvailable) })
        : t('diary.trend.aligned')

  async function shareProgress(): Promise<void> {
    setShareState('working')
    const shared = await condividiCard({
      title: t('share.progress.title'),
      subtitle: `${displayDate(week.dal, locale)} — ${displayDate(week.al, locale)}`,
      items: [
        { label: t('share.progress.activeDays'), value: `${formatNumber(week.giorniConVoci, locale, notAvailable)} / ${formatNumber(7, locale, notAvailable)}` },
        { label: t('share.progress.totalEntries'), value: formatNumber(week.totali.n, locale, notAvailable) },
        { label: t('common.metrics.carbohydrates'), value: `${formatNumber(week.totali.carbo, locale, notAvailable)} g` },
        { label: t('common.metrics.energy'), value: `${formatNumber(week.totali.kcal, locale, notAvailable)} kcal` },
        { label: t('common.metrics.stabilityIndex'), value: formatNumber(week.indice, locale, notAvailable) },
      ],
      note: week.livello ? t(LEVEL_KEYS[week.livello]) : t('share.progress.noData'),
    }, { fileName: 'glicogig-progressi.png' })
    setShareState(shared ? 'success' : 'error')
  }

  return (
    <div>
      <section className="mb-6 px-1"><p className="screen-kicker">{t('diary.hero.kicker')}</p><h1 className="screen-title">{t('diary.hero.title')} <span className="text-brand">{t('diary.hero.accent')}</span></h1><p className="screen-subtitle">{t('diary.hero.subtitle')}</p></section>

      <section className="grid gap-2 sm:grid-cols-7" aria-label={t('diary.day.selectAria')}>{week.giorni.map((day) => <button className={`rounded-2xl border p-3 text-left transition ${selectedProgress.giorno === day.giorno ? 'border-brand bg-brand-soft text-brand' : 'border-line bg-surface text-muted'}`} type="button" onClick={() => setSelectedDay(day.giorno)} aria-pressed={selectedProgress.giorno === day.giorno} key={day.giorno}><span className="block text-[10px] font-bold uppercase">{displayDay(day.giorno, localDay, locale, t('common.labels.today'))}</span><strong className="mt-1 block text-lg">{displayDayNumber(day.giorno, locale)}</strong><span className="mt-1 block text-[10px]">{t('diary.day.entries', { count: day.totali.n })}</span></button>)}</section>

      <section className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><div className="metric-card"><strong>{formatNumber(selectedProgress.totali.n, locale, notAvailable)}</strong><span>{t('diary.day.entriesMetric')}</span></div><div className="metric-card"><strong>{formatNumber(selectedProgress.totali.carbo, locale, notAvailable)}</strong><span>{t('diary.day.carbsMetric')}</span></div><div className="metric-card"><strong>{formatNumber(selectedProgress.indice, locale, notAvailable)}</strong><span>{selectedProgress.livello ? t(LEVEL_KEYS[selectedProgress.livello]) : t('classification.stability.unavailable')}</span></div><div className="metric-card"><strong>{formatNumber(week.giorniConVoci, locale, notAvailable)}/{formatNumber(7, locale, notAvailable)}</strong><span>{t('diary.day.activeDaysMetric')}</span></div></section>

      <div className="mt-5 grid items-start gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="app-card rounded-3xl border border-line bg-paper p-5 shadow-card sm:p-6"><div className="flex items-center justify-between gap-3"><div><p className="section-label">{displayDate(selectedProgress.giorno, locale)}</p><h2 className="mt-1 text-2xl font-extrabold capitalize text-ink">{displayDay(selectedProgress.giorno, localDay, locale, t('common.labels.today'))}</h2></div><CalendarIcon className="size-7 text-brand" /></div>{selectedEntries.length ? <ul className="mt-4 space-y-2">{selectedEntries.map((entry) => <DiaryRow entry={entry} key={entry.id} />)}</ul> : <div className="mt-5 rounded-2xl border border-dashed border-line p-7 text-center"><DiaryIcon className="mx-auto size-10 text-muted" /><h3 className="mt-3 font-extrabold text-ink">{t('diary.day.emptyTitle')}</h3><p className="mt-2 text-sm leading-6 text-muted">{t('diary.day.emptyBody')}</p></div>}</section>

        <section className="space-y-4">
          <article className="app-card rounded-3xl border border-line bg-paper p-5 shadow-card sm:p-6">
            <div className="flex items-start justify-between gap-3"><div><p className="section-label">{t('common.labels.today')}</p><h2 className="mt-1 text-2xl font-extrabold text-ink">{t('diary.rings.title')}</h2></div><ActivityIcon className="size-7 text-brand" /></div>
            <div className="mt-5 grid grid-cols-3 gap-2"><ProgressRing label={t('common.progress.balance')} value={rings.equilibrio} /><ProgressRing label={t('common.progress.brakes')} value={rings.freni} /><ProgressRing label={t('common.progress.variety')} value={rings.varieta} /></div>
            <div className="mt-4 grid grid-cols-3 gap-2"><div className="data-tile"><span>{t('common.progress.assessment')}</span><strong>{balance ? t(BALANCE_KEYS[balance]) : notAvailable}</strong></div><div className="data-tile"><span>{t('common.progress.continuity')}</span><strong>{t('diary.rings.streak', { count: streak })}</strong></div><div className="data-tile"><span>{t('common.progress.trend')}</span><strong>{trendLabel}</strong></div></div>
          </article>

          <article className="app-card rounded-3xl border border-line bg-paper p-5 shadow-card sm:p-6">
            <div className="flex items-start justify-between gap-3"><div><p className="section-label">{t('diary.week.title')}</p><h2 className="mt-1 text-2xl font-extrabold text-ink">{t('diary.week.report')}</h2></div><span className="status-badge">{t(VERDICT_KEYS[weeklyReport.verdetto])}</span></div>
            <p className="mt-4 text-xs font-bold uppercase tracking-wide text-muted">{t('diary.week.glycemicSeries')}</p>
            <div className="mt-3 flex h-24 items-end gap-2">{weeklyReport.perGiorno.map((value, index) => { const day = week.giorni[index]; const height = value === 0 ? 4 : Math.max(12, value / maxWeeklyCg * 100); return <div className="flex min-w-0 flex-1 flex-col items-center justify-end gap-1" key={day.giorno}><span className="w-full rounded-t-md bg-brand" style={{ height: `${height}%` }} title={t('diary.week.glycemicTitle', { value: formatNumber(value, locale, notAvailable) })} /><span className="text-[9px] text-muted">{displayDayNumber(day.giorno, locale)}</span></div> })}</div>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4"><div className="data-tile"><span>{t('common.metrics.entries')}</span><strong>{formatNumber(weeklyReport.nPasti, locale, notAvailable)}</strong></div><div className="data-tile"><span>{t('common.metrics.activeDays')}</span><strong>{formatNumber(weeklyReport.giorniAttivi, locale, notAvailable)}</strong></div><div className="data-tile"><span>{t('common.metrics.kcalPerDay')}</span><strong>{formatNumber(weeklyReport.kcalGiorno, locale, notAvailable)}</strong></div><div className="data-tile"><span>{t('common.metrics.glycemicLoadTrend')}</span><strong>{weeklyReport.trend === null ? notAvailable : `${weeklyReport.trend > 0 ? '+' : ''}${formatNumber(weeklyReport.trend, locale, notAvailable)}%`}</strong></div></div>
            {weeklyReport.difficile ? <div className="mt-4 rounded-2xl border border-amber/40 bg-amber/10 p-4"><p className="text-xs font-bold uppercase tracking-wide text-muted">{t('diary.week.hardestMeal')}</p><p className="mt-1 font-extrabold text-ink">{selectDiaryEntryName(weeklyReport.difficile, language)}</p><p className="mt-1 text-xs text-muted">{t('diary.week.hardestMeta', { value: formatNumber(weeklyReport.difficile.cg, locale, notAvailable), band: t(IMPACT_KEYS[weeklyReport.difficile.fascia]) })}</p></div> : <p className="mt-4 text-sm leading-6 text-muted">{t('diary.week.noHardMealReport')}</p>}
          </article>

          <article className="app-card rounded-3xl border border-line bg-paper p-5 shadow-card sm:p-6"><div className="flex items-start justify-between gap-3"><div><p className="section-label">{t('diary.week.sevenDays')}</p><h2 className="mt-1 text-2xl font-extrabold text-ink">{t('diary.week.stability')}</h2></div><ActivityIcon className="size-7 text-mint" /></div><div className="mt-5 flex h-28 items-end gap-2">{week.giorni.map((day) => { const height = day.indice === null ? 4 : Math.max(12, day.indice); return <button className="flex min-w-0 flex-1 flex-col items-center justify-end gap-1" type="button" onClick={() => setSelectedDay(day.giorno)} key={day.giorno}><span className={`w-full rounded-t-md ${day.indice === null ? 'bg-line' : day.giorno === selectedProgress.giorno ? 'bg-brand' : 'bg-mint/75'}`} style={{ height: `${height}%` }} title={day.indice === null ? t('diary.week.noDataTitle') : t('diary.week.indexTitle', { index: formatNumber(day.indice, locale, notAvailable) })} /><span className="text-[9px] text-muted">{displayDayNumber(day.giorno, locale)}</span></button> })}</div><div className="mt-4 grid grid-cols-2 gap-2"><div className="data-tile"><span>{t('diary.week.periodIndex')}</span><strong>{formatNumber(week.indice, locale, notAvailable)}</strong></div><div className="data-tile"><span>{t('common.labels.level')}</span><strong>{week.livello ? t(LEVEL_KEYS[week.livello]) : notAvailable}</strong></div></div></article>

          <article className="rounded-3xl border border-line bg-surface p-5"><div className="flex items-center justify-between gap-3"><div><p className="section-label">{t('common.labels.today')}</p><h2 className="mt-1 text-xl font-extrabold text-ink">{t('diary.week.addEntry')}</h2></div><button className="icon-link" type="button" onClick={() => setManualOpen((value) => !value)} aria-expanded={manualOpen}><PlusIcon className="size-5" /></button></div><div className="mt-3 grid grid-cols-2 gap-2"><a className="secondary-button" href="#photo"><CameraIcon className="size-5" />{t('nav.tabs.photo')}</a><button className="secondary-button" type="button" onClick={() => setManualOpen((value) => !value)}><EditIcon className="size-5" />{t('diary.week.manual')}</button></div>{manualOpen && <ManualEntryForm />}</article>

          <article className="rounded-3xl border border-line bg-surface p-5"><p className="section-label">{t('diary.week.totals')}</p><div className="mt-3 grid grid-cols-2 gap-2"><div className="data-tile"><span>{t('common.metrics.energy')}</span><strong>{formatNumber(week.totali.kcal, locale, notAvailable)} kcal</strong></div><div className="data-tile"><span>{t('common.metrics.carbohydrates')}</span><strong>{formatNumber(week.totali.carbo, locale, notAvailable)} g</strong></div><div className="data-tile"><span>{t('common.metrics.protein')}</span><strong>{formatNumber(week.totali.prot, locale, notAvailable)} g</strong></div><div className="data-tile"><span>{t('common.metrics.fibre')}</span><strong>{formatNumber(week.totali.fibre, locale, notAvailable)} g</strong></div></div><button className="secondary-button mt-4 w-full" type="button" onClick={() => void shareProgress()} disabled={shareState === 'working' || week.totali.n === 0}><ShareIcon className="size-5" />{t(shareState === 'working' ? 'common.actions.preparing' : 'diary.week.share')}</button><div className="mt-2 text-xs" aria-live="polite">{shareState === 'success' && <p className="text-mint">{t('common.feedback.shareSuccess')}</p>}{shareState === 'error' && <p className="text-coral">{t('common.feedback.shareUnavailable')}</p>}</div></article>
        </section>
      </div>
    </div>
  )
}
