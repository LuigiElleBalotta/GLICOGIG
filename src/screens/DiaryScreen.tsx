import { useMemo, useState, type FormEvent } from 'react'
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
import { formatNumber } from '../domain/nutrition'
import {
  andamentoSettimana,
  bilancioOggi,
  datiAnelliOggi,
  giorniConsecutivi,
  progressiSetteGiorni,
  reportSettimana,
} from '../domain/progress'
import type { StabilityLevel } from '../domain/stability'
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

const SLOT_OPTIONS = ['Colazione', 'Pranzo', 'Cena', 'Spuntino'] as const
const LEVEL_LABELS: Record<StabilityLevel, string> = {
  moltoStabile: 'Molto stabile',
  bellaGiornata: 'Bella giornata',
  nellaMedia: 'Nella media',
  impegnativa: 'Impegnativa',
}
const BALANCE_LABELS = {
  buono: 'Buono',
  discreto: 'Discreto',
  daBilanciare: 'Da bilanciare',
} as const
const VERDICT_LABELS = {
  equilibrata: 'Equilibrata',
  moderata: 'Moderata',
  intensa: 'Intensa',
} as const

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

function displayDay(day: string, today: string): string {
  if (day === today) return 'Oggi'
  return new Date(`${day}T12:00:00`).toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'short' })
}

function trendLabel(trend: ReturnType<typeof andamentoSettimana>): string {
  if (!trend) return 'n.d.'
  if (trend.key === 'meglio') return `${trend.pct}% meglio`
  if (trend.key === 'margine') return `${trend.pct}% di margine`
  return 'In linea'
}

function ProgressRing({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-3 text-center">
      <div className="relative mx-auto size-20" role="img" aria-label={`${label}: ${value}%`}>
        <svg className="size-20 -rotate-90" viewBox="0 0 36 36" aria-hidden="true">
          <circle className="fill-none stroke-line" cx="18" cy="18" r="15.5" strokeWidth="3" />
          <circle className="fill-none stroke-brand" cx="18" cy="18" r="15.5" pathLength="100" strokeDasharray={`${value} 100`} strokeLinecap="round" strokeWidth="3" />
        </svg>
        <strong className="absolute inset-0 flex items-center justify-center text-lg text-ink">{value}%</strong>
      </div>
      <span className="mt-2 block text-xs font-bold text-muted">{label}</span>
    </div>
  )
}

function DiaryRow({ entry }: { entry: DiaryEntry }) {
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(entry.nome)

  function commitRename(): void {
    if (rinominaVoce(entry.id, name)) setEditing(false)
  }

  return (
    <li className="rounded-2xl border border-line bg-surface p-4">
      <div className="flex items-start justify-between gap-3"><div className="min-w-0 flex-1">{editing ? <div className="flex gap-2"><input className="field min-w-0" value={name} maxLength={60} onChange={(event) => setName(event.target.value)} aria-label="Nuovo nome voce" /><button className="icon-link shrink-0" type="button" onClick={commitRename} aria-label="Conferma nome"><CheckIcon className="size-5" /></button></div> : <><p className="truncate font-extrabold text-ink">{entry.nome}</p><p className="mt-1 text-xs text-muted">{entry.fonte || 'fonte locale'} · {new Date(entry.ts).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}</p></>}</div><div className="flex shrink-0 gap-1"><button className="icon-link" type="button" onClick={() => setEditing((value) => !value)} aria-label={`Rinomina ${entry.nome}`}><EditIcon className="size-4" /></button><button className="icon-link text-coral" type="button" onClick={() => rimuoviDalDiario(entry.id)} aria-label={`Elimina ${entry.nome}`}><TrashIcon className="size-4" /></button></div></div>
      <div className="mt-3 flex flex-wrap gap-2 text-xs"><span className="status-badge">{formatNumber(entry.kcal)} kcal</span><span className="status-badge">{formatNumber(entry.carbo)} g carbo</span><span className="status-badge">CG {formatNumber(entry.cg)}</span><span className="status-badge">{entry.fascia}</span></div>
      <label className="mt-3 flex items-center gap-2 text-xs font-bold text-muted">Momento<select className="field min-h-9 flex-1 py-1.5" value={entry.slot ?? ''} onChange={(event) => spostaSlot(entry.id, event.target.value || null)}><option value="">Senza slot</option>{SLOT_OPTIONS.map((slot) => <option key={slot}>{slot}</option>)}</select></label>
    </li>
  )
}

function ManualEntryForm() {
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
  const estimate = useMemo(() => estimateManualImpact(input), [input])

  function submit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    if (!name.trim()) return
    const item = mealItemFromManual({
      ...input,
      grams: Math.max(0, Number(grams) || 0),
    })
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
      <label className="text-xs font-bold text-muted">Nome alimento o piatto<input className="field mt-1" value={name} maxLength={80} required onChange={(event) => { setName(event.target.value); setSaveState('idle') }} placeholder="Es. panino preparato a casa" /></label>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">{numberField('Grammi', grams, setGrams)}{numberField('Carboidrati g', carbs, setCarbs)}{numberField('Fibre g', fibre, setFibre)}{numberField('Proteine g', protein, setProtein)}{numberField('Grassi g', fat, setFat)}<label className="text-xs font-bold text-muted">Momento<select className="field mt-1" value={slot} onChange={(event) => setSlot(event.target.value)}><option value="">Senza slot</option>{SLOT_OPTIONS.map((value) => <option key={value}>{value}</option>)}</select></label></div>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4"><div className="data-tile"><span>IG {estimate.indexSource === 'catalogo' ? 'catalogo' : 'stimato'}</span><strong>{estimate.glycemicIndex}</strong></div><div className="data-tile"><span>CG</span><strong>{estimate.glycemicLoad}</strong></div><div className="data-tile"><span>Fascia</span><strong>{estimate.band}</strong></div><div className="data-tile"><span>Energia</span><strong>{estimate.kcal} kcal</strong></div></div>
      <p className="mt-3 text-xs leading-5 text-muted">Stima verificata: match catalogo univoco quando disponibile; altrimenti regole locali per zero/light, zuccheri/liquidi e fallback prudente. Nessun dato nutrizionale esterno.</p>
      <button className="primary-button mt-4 w-full" type="submit" disabled={!name.trim() || saveState === 'success'}>{saveState === 'success' ? <CheckIcon className="size-5" /> : <SaveIcon className="size-5" />}{saveState === 'success' ? 'Voce registrata oggi' : 'Registra voce manuale'}</button>
      {saveState === 'error' && <p className="mt-2 text-xs text-coral">Persistenza locale non confermata.</p>}
    </form>
  )
}

export default function DiaryScreen() {
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

  async function shareProgress(): Promise<void> {
    setShareState('working')
    const shared = await condividiCard({
      title: 'Progressi GLICOGIG',
      subtitle: `${week.dal} — ${week.al}`,
      items: [
        { label: 'Giorni con voci', value: `${week.giorniConVoci} / 7` },
        { label: 'Voci totali', value: String(week.totali.n) },
        { label: 'Carboidrati', value: `${formatNumber(week.totali.carbo)} g` },
        { label: 'Energia', value: `${formatNumber(week.totali.kcal)} kcal` },
        { label: 'Indice stabilità', value: week.indice === null ? 'n.d.' : String(week.indice) },
      ],
      note: week.livello ? LEVEL_LABELS[week.livello] : 'Nessun dato disponibile.',
    }, { fileName: 'glicogig-progressi.png' })
    setShareState(shared ? 'success' : 'error')
  }

  return (
    <div>
      <section className="mb-6 px-1"><p className="screen-kicker">Progressi sul dispositivo</p><h1 className="screen-title">I tuoi pasti, <span className="text-brand">senza account.</span></h1><p className="screen-subtitle">Consulta sette giorni reali, correggi lo slot e aggiungi manualmente ciò che manca. Nessun dato demo.</p></section>

      <section className="grid gap-2 sm:grid-cols-7" aria-label="Seleziona giorno">{week.giorni.map((day) => <button className={`rounded-2xl border p-3 text-left transition ${selectedProgress.giorno === day.giorno ? 'border-brand bg-brand-soft text-brand' : 'border-line bg-surface text-muted'}`} type="button" onClick={() => setSelectedDay(day.giorno)} aria-pressed={selectedProgress.giorno === day.giorno} key={day.giorno}><span className="block text-[10px] font-bold uppercase">{displayDay(day.giorno, localDay)}</span><strong className="mt-1 block text-lg">{day.giorno.slice(8)}</strong><span className="mt-1 block text-[10px]">{day.totali.n} {day.totali.n === 1 ? 'voce' : 'voci'}</span></button>)}</section>

      <section className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><div className="metric-card"><strong>{selectedProgress.totali.n}</strong><span>voci nel giorno</span></div><div className="metric-card"><strong>{formatNumber(selectedProgress.totali.carbo)}</strong><span>g carboidrati</span></div><div className="metric-card"><strong>{selectedProgress.indice ?? 'n.d.'}</strong><span>{selectedProgress.livello ? LEVEL_LABELS[selectedProgress.livello] : 'stabilità n.d.'}</span></div><div className="metric-card"><strong>{week.giorniConVoci}/7</strong><span>giorni attivi</span></div></section>

      <div className="mt-5 grid items-start gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="app-card rounded-3xl border border-line bg-paper p-5 shadow-card sm:p-6"><div className="flex items-center justify-between gap-3"><div><p className="section-label">{selectedProgress.giorno}</p><h2 className="mt-1 text-2xl font-extrabold capitalize text-ink">{displayDay(selectedProgress.giorno, localDay)}</h2></div><CalendarIcon className="size-7 text-brand" /></div>{selectedEntries.length ? <ul className="mt-4 space-y-2">{selectedEntries.map((entry) => <DiaryRow entry={entry} key={entry.id} />)}</ul> : <div className="mt-5 rounded-2xl border border-dashed border-line p-7 text-center"><DiaryIcon className="mx-auto size-10 text-muted" /><h3 className="mt-3 font-extrabold text-ink">Nessuna voce</h3><p className="mt-2 text-sm leading-6 text-muted">Questo giorno non contiene registrazioni locali.</p></div>}</section>

        <section className="space-y-4">
          <article className="app-card rounded-3xl border border-line bg-paper p-5 shadow-card sm:p-6">
            <div className="flex items-start justify-between gap-3"><div><p className="section-label">Oggi</p><h2 className="mt-1 text-2xl font-extrabold text-ink">I tuoi anelli</h2></div><ActivityIcon className="size-7 text-brand" /></div>
            <div className="mt-5 grid grid-cols-3 gap-2"><ProgressRing label="Equilibrio" value={rings.equilibrio} /><ProgressRing label="Freni" value={rings.freni} /><ProgressRing label="Varietà" value={rings.varieta} /></div>
            <div className="mt-4 grid grid-cols-3 gap-2"><div className="data-tile"><span>Bilancio</span><strong>{balance ? BALANCE_LABELS[balance] : 'n.d.'}</strong></div><div className="data-tile"><span>Consecutività</span><strong>{streak} {streak === 1 ? 'giorno' : 'giorni'}</strong></div><div className="data-tile"><span>Andamento</span><strong>{trendLabel(balanceTrend)}</strong></div></div>
          </article>

          <article className="app-card rounded-3xl border border-line bg-paper p-5 shadow-card sm:p-6">
            <div className="flex items-start justify-between gap-3"><div><p className="section-label">Ultimi sette giorni</p><h2 className="mt-1 text-2xl font-extrabold text-ink">Report settimana</h2></div><span className="status-badge">{VERDICT_LABELS[weeklyReport.verdetto]}</span></div>
            <p className="mt-4 text-xs font-bold uppercase tracking-wide text-muted">Serie carico glicemico</p>
            <div className="mt-3 flex h-24 items-end gap-2">{weeklyReport.perGiorno.map((value, index) => { const day = week.giorni[index]; const height = value === 0 ? 4 : Math.max(12, value / maxWeeklyCg * 100); return <div className="flex min-w-0 flex-1 flex-col items-center justify-end gap-1" key={day.giorno}><span className="w-full rounded-t-md bg-brand" style={{ height: `${height}%` }} title={`CG ${value}`} /><span className="text-[9px] text-muted">{day.giorno.slice(8)}</span></div> })}</div>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4"><div className="data-tile"><span>Voci</span><strong>{weeklyReport.nPasti}</strong></div><div className="data-tile"><span>Giorni attivi</span><strong>{weeklyReport.giorniAttivi}</strong></div><div className="data-tile"><span>Kcal / giorno</span><strong>{weeklyReport.kcalGiorno}</strong></div><div className="data-tile"><span>Trend CG</span><strong>{weeklyReport.trend === null ? 'n.d.' : `${weeklyReport.trend > 0 ? '+' : ''}${weeklyReport.trend}%`}</strong></div></div>
            {weeklyReport.difficile ? <div className="mt-4 rounded-2xl border border-amber/40 bg-amber/10 p-4"><p className="text-xs font-bold uppercase tracking-wide text-muted">Pasto più difficile</p><p className="mt-1 font-extrabold text-ink">{weeklyReport.difficile.nome}</p><p className="mt-1 text-xs text-muted">CG {formatNumber(weeklyReport.difficile.cg)} · fascia {weeklyReport.difficile.fascia}</p></div> : <p className="mt-4 text-sm leading-6 text-muted">Nessuna voce in fascia media o alta nel report.</p>}
          </article>

          <article className="app-card rounded-3xl border border-line bg-paper p-5 shadow-card sm:p-6"><div className="flex items-start justify-between gap-3"><div><p className="section-label">Sette giorni</p><h2 className="mt-1 text-2xl font-extrabold text-ink">Stabilità</h2></div><ActivityIcon className="size-7 text-mint" /></div><div className="mt-5 flex h-28 items-end gap-2">{week.giorni.map((day) => { const height = day.indice === null ? 4 : Math.max(12, day.indice); return <button className="flex min-w-0 flex-1 flex-col items-center justify-end gap-1" type="button" onClick={() => setSelectedDay(day.giorno)} key={day.giorno}><span className={`w-full rounded-t-md ${day.indice === null ? 'bg-line' : day.giorno === selectedProgress.giorno ? 'bg-brand' : 'bg-mint/75'}`} style={{ height: `${height}%` }} title={day.indice === null ? 'Nessun dato' : `Indice ${day.indice}`} /><span className="text-[9px] text-muted">{day.giorno.slice(8)}</span></button> })}</div><div className="mt-4 grid grid-cols-2 gap-2"><div className="data-tile"><span>Indice periodo</span><strong>{week.indice ?? 'n.d.'}</strong></div><div className="data-tile"><span>Livello</span><strong>{week.livello ? LEVEL_LABELS[week.livello] : 'n.d.'}</strong></div></div></article>

          <article className="rounded-3xl border border-line bg-surface p-5"><div className="flex items-center justify-between gap-3"><div><p className="section-label">Oggi</p><h2 className="mt-1 text-xl font-extrabold text-ink">Aggiungi una voce</h2></div><button className="icon-link" type="button" onClick={() => setManualOpen((value) => !value)} aria-expanded={manualOpen}><PlusIcon className="size-5" /></button></div><div className="mt-3 grid grid-cols-2 gap-2"><a className="secondary-button" href="#photo"><CameraIcon className="size-5" />Foto</a><button className="secondary-button" type="button" onClick={() => setManualOpen((value) => !value)}><EditIcon className="size-5" />Manuale</button></div>{manualOpen && <ManualEntryForm />}</article>

          <article className="rounded-3xl border border-line bg-surface p-5"><p className="section-label">Totali sette giorni</p><div className="mt-3 grid grid-cols-2 gap-2"><div className="data-tile"><span>Energia</span><strong>{formatNumber(week.totali.kcal)} kcal</strong></div><div className="data-tile"><span>Carboidrati</span><strong>{formatNumber(week.totali.carbo)} g</strong></div><div className="data-tile"><span>Proteine</span><strong>{formatNumber(week.totali.prot)} g</strong></div><div className="data-tile"><span>Fibre</span><strong>{formatNumber(week.totali.fibre)} g</strong></div></div><button className="secondary-button mt-4 w-full" type="button" onClick={() => void shareProgress()} disabled={shareState === 'working' || week.totali.n === 0}><ShareIcon className="size-5" />{shareState === 'working' ? 'Preparazione…' : 'Condividi progressi'}</button><div className="mt-2 text-xs" aria-live="polite">{shareState === 'success' && <p className="text-mint">Card condivisa o scaricata.</p>}{shareState === 'error' && <p className="text-coral">Condivisione annullata o non disponibile.</p>}</div></article>
        </section>
      </div>
    </div>
  )
}
