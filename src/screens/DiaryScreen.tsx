import { useMemo, useState } from 'react'
import {
  ActivityIcon,
  CalendarIcon,
  CheckIcon,
  DiaryIcon,
  EditIcon,
  ShareIcon,
  TrashIcon,
} from '../components/Icons'
import { formatNumber } from '../domain/nutrition'
import { progressiOggi, progressiSetteGiorni } from '../domain/progress'
import type { StabilityLevel } from '../domain/stability'
import { useDayKey } from '../lib/useDayKey'
import { condividiCard } from '../services/shareCard'
import {
  rimuoviDalDiario,
  rinominaVoce,
  useDiario,
} from '../storage/diaryStore'
import type { DiaryEntry } from '../types/diary'

const LEVEL_LABELS: Record<StabilityLevel, string> = {
  moltoStabile: 'Molto stabile',
  bellaGiornata: 'Bella giornata',
  nellaMedia: 'Nella media',
  impegnativa: 'Impegnativa',
}

function DiaryRow({ entry }: { entry: DiaryEntry }) {
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(entry.nome)

  function commitRename(): void {
    if (rinominaVoce(entry.id, name)) setEditing(false)
  }

  return (
    <li className="rounded-2xl border border-line bg-surface p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          {editing ? <div className="flex gap-2"><input className="field min-w-0" value={name} maxLength={60} onChange={(event) => setName(event.target.value)} aria-label="Nuovo nome voce" /><button className="icon-link shrink-0" type="button" onClick={commitRename} aria-label="Conferma nome"><CheckIcon className="size-5" /></button></div> : <><p className="truncate font-extrabold text-ink">{entry.nome}</p><p className="mt-1 text-xs text-muted">{entry.fonte || 'fonte locale'} · {new Date(entry.ts).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}</p></>}
        </div>
        <div className="flex shrink-0 gap-1"><button className="icon-link" type="button" onClick={() => setEditing((value) => !value)} aria-label={`Rinomina ${entry.nome}`}><EditIcon className="size-4" /></button><button className="icon-link text-coral" type="button" onClick={() => rimuoviDalDiario(entry.id)} aria-label={`Elimina ${entry.nome}`}><TrashIcon className="size-4" /></button></div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2 text-xs"><span className="status-badge">{formatNumber(entry.kcal)} kcal</span><span className="status-badge">{formatNumber(entry.carbo)} g carbo</span><span className="status-badge">CG {formatNumber(entry.cg)}</span><span className="status-badge">{entry.fascia}</span></div>
    </li>
  )
}

export default function DiaryScreen() {
  const localDay = useDayKey('local')
  const entries = useDiario()
  const today = useMemo(() => progressiOggi(entries), [entries, localDay])
  const week = useMemo(() => progressiSetteGiorni(entries), [entries, localDay])
  const [shareState, setShareState] = useState<'idle' | 'working' | 'success' | 'error'>('idle')
  const todayEntries = entries.filter((entry) => entry.giorno === today.giorno).slice().sort((first, second) => second.ts - first.ts)

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
      <section className="mb-6 px-1"><p className="screen-kicker">Diario sul dispositivo</p><h1 className="screen-title">I tuoi pasti, <span className="text-brand">senza account.</span></h1><p className="screen-subtitle">Le voci restano nel localStorage del browser e non vengono inviate automaticamente. La card aggregata esce dal browser solo quando scegli di condividerla.</p></section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="metric-card"><strong>{today.totali.n}</strong><span>voci oggi</span></div>
        <div className="metric-card"><strong>{formatNumber(today.totali.carbo)}</strong><span>g carbo oggi</span></div>
        <div className="metric-card"><strong>{today.indice ?? 'n.d.'}</strong><span>{today.livello ? LEVEL_LABELS[today.livello] : 'livello oggi n.d.'}</span></div>
        <div className="metric-card"><strong>{week.giorniConVoci}/7</strong><span>giorni attivi</span></div>
      </section>

      <div className="mt-5 grid items-start gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="app-card rounded-3xl border border-line bg-paper p-5 shadow-card sm:p-6">
          <div className="flex items-center justify-between gap-3"><div><p className="section-label">{today.giorno}</p><h2 className="mt-1 text-2xl font-extrabold text-ink">Oggi</h2></div><CalendarIcon className="size-7 text-brand" /></div>
          {todayEntries.length ? <ul className="mt-4 space-y-2">{todayEntries.map((entry) => <DiaryRow entry={entry} key={entry.id} />)}</ul> : <div className="mt-5 rounded-2xl border border-dashed border-line p-7 text-center"><DiaryIcon className="mx-auto size-10 text-muted" /><h3 className="mt-3 font-extrabold text-ink">Nessuna voce oggi</h3><p className="mt-2 text-sm leading-6 text-muted">Aggiungi un alimento, una ricetta o un risultato foto. Non sono inseriti dati demo.</p></div>}
        </section>

        <section className="space-y-4">
          <article className="app-card rounded-3xl border border-line bg-paper p-5 shadow-card sm:p-6">
            <div className="flex items-start justify-between gap-3"><div><p className="section-label">Sette giorni</p><h2 className="mt-1 text-2xl font-extrabold text-ink">Stabilità</h2></div><ActivityIcon className="size-7 text-mint" /></div>
            <div className="mt-5 flex h-28 items-end gap-2">
              {week.giorni.map((day) => {
                const height = day.indice === null ? 4 : Math.max(12, day.indice)
                return <div className="flex min-w-0 flex-1 flex-col items-center justify-end gap-1" key={day.giorno}><span className={`w-full rounded-t-md ${day.indice === null ? 'bg-line' : 'bg-mint/75'}`} style={{ height: `${height}%` }} title={day.indice === null ? 'Nessun dato' : `Indice ${day.indice}`} /><span className="text-[9px] text-muted">{day.giorno.slice(8)}</span></div>
              })}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2"><div className="data-tile"><span>Indice periodo</span><strong>{week.indice ?? 'n.d.'}</strong></div><div className="data-tile"><span>Livello</span><strong>{week.livello ? LEVEL_LABELS[week.livello] : 'n.d.'}</strong></div></div>
          </article>

          <article className="rounded-3xl border border-line bg-surface p-5">
            <p className="section-label">Totali sette giorni</p>
            <div className="mt-3 grid grid-cols-2 gap-2"><div className="data-tile"><span>Energia</span><strong>{formatNumber(week.totali.kcal)} kcal</strong></div><div className="data-tile"><span>Carboidrati</span><strong>{formatNumber(week.totali.carbo)} g</strong></div><div className="data-tile"><span>Proteine</span><strong>{formatNumber(week.totali.prot)} g</strong></div><div className="data-tile"><span>Fibre</span><strong>{formatNumber(week.totali.fibre)} g</strong></div></div>
            <button className="secondary-button mt-4 w-full" type="button" onClick={() => void shareProgress()} disabled={shareState === 'working' || week.totali.n === 0}><ShareIcon className="size-5" />{shareState === 'working' ? 'Preparazione…' : 'Condividi progressi'}</button>
            <div className="mt-2 text-xs" aria-live="polite">{shareState === 'success' && <p className="text-mint">Card condivisa o scaricata.</p>}{shareState === 'error' && <p className="text-coral">Condivisione annullata o non disponibile.</p>}</div>
          </article>
        </section>
      </div>
    </div>
  )
}
