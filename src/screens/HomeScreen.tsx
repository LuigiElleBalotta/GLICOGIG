import { useMemo } from 'react'
import { DATASET_COUNTS } from '../catalog/datasets'
import {
  BookOpenIcon,
  CameraIcon,
  ChefHatIcon,
  ChevronRightIcon,
  DiaryIcon,
  SearchIcon,
} from '../components/Icons'
import { formatNumber } from '../domain/nutrition'
import { progressiOggi, progressiSetteGiorni } from '../domain/progress'
import { useDayKey } from '../lib/useDayKey'
import { useMealSession } from '../state/mealSession'
import { useDiario } from '../storage/diaryStore'
import type { StabilityLevel } from '../domain/stability'

const LEVEL_LABELS: Record<StabilityLevel, string> = {
  moltoStabile: 'Molto stabile',
  bellaGiornata: 'Bella giornata',
  nellaMedia: 'Nella media',
  impegnativa: 'Impegnativa',
}

const QUICK_ACTIONS = [
  { href: '#photo', label: 'Analizza un piatto', note: 'Da una foto', icon: CameraIcon },
  { href: '#search', label: 'Cerca alimento', note: 'Catalogo e barcode', icon: SearchIcon },
  { href: '#recipes', label: 'Sfoglia ricette', note: 'Valori per porzione', icon: ChefHatIcon },
  { href: '#learn', label: 'Impara', note: 'Capitoli e quiz', icon: BookOpenIcon },
] as const

export default function HomeScreen() {
  const localDay = useDayKey('local')
  const diaryEntries = useDiario()
  const today = useMemo(() => progressiOggi(diaryEntries), [diaryEntries, localDay])
  const week = useMemo(() => progressiSetteGiorni(diaryEntries), [diaryEntries, localDay])
  const { summary } = useMealSession()
  const todayEntries = diaryEntries.filter((entry) => entry.giorno === today.giorno)

  return (
    <div>
      <section className="mb-7 px-1">
        <p className="screen-kicker">Panoramica locale</p>
        <h1 className="screen-title">Conosci il pasto.<br /><span className="text-brand">Scegli con più contesto.</span></h1>
        <p className="screen-subtitle">Catalogo, ricette, diario e apprendimento lavorano sul dispositivo. Nessun dato utente demo.</p>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Contenuti verificati disponibili">
        <div className="metric-card"><strong>{DATASET_COUNTS.foods}</strong><span>alimenti</span></div>
        <div className="metric-card"><strong>{DATASET_COUNTS.recipes}</strong><span>ricette</span></div>
        <div className="metric-card"><strong>{DATASET_COUNTS.learningChapters}</strong><span>capitoli</span></div>
        <div className="metric-card"><strong>{DATASET_COUNTS.quizQuestions}</strong><span>domande quiz</span></div>
      </section>

      <section className="mt-5 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="app-card rounded-3xl border border-line bg-paper p-5 shadow-card sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="section-label">Oggi</p>
              <h2 className="mt-1 text-2xl font-extrabold text-ink">{today.totali.n ? `${today.totali.n} ${today.totali.n === 1 ? 'voce' : 'voci'}` : 'Diario vuoto'}</h2>
            </div>
            <a className="icon-link" href="#diary" aria-label="Apri il diario"><DiaryIcon className="size-5" /></a>
          </div>
          {today.totali.n ? (
            <>
              <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                <div className="data-tile"><span>Energia</span><strong>{formatNumber(today.totali.kcal)} kcal</strong></div>
                <div className="data-tile"><span>Carboidrati</span><strong>{formatNumber(today.totali.carbo)} g</strong></div>
                <div className="data-tile"><span>Proteine</span><strong>{formatNumber(today.totali.prot)} g</strong></div>
                <div className="data-tile"><span>Grassi</span><strong>{formatNumber(today.totali.grassi)} g</strong></div>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                <span className="status-badge">Indice {today.indice ?? 'n.d.'}</span>
                {today.livello && <span className="status-badge">{LEVEL_LABELS[today.livello]}</span>}
              </div>
            </>
          ) : (
            <p className="mt-4 max-w-lg text-sm leading-6 text-muted">Salva un alimento, una ricetta o un risultato foto per vedere qui i progressi reali.</p>
          )}
        </article>

        <article className="app-card rounded-3xl border border-line bg-paper p-5 shadow-card sm:p-6">
          <p className="section-label">Ultimi sette giorni</p>
          <h2 className="mt-1 text-2xl font-extrabold text-ink">{week.giorniConVoci} di 7 giorni attivi</h2>
          <div className="mt-5 flex h-20 items-end gap-2" aria-label="Voci del diario per giorno">
            {week.giorni.map((day) => {
              const max = Math.max(1, ...week.giorni.map(({ totali }) => totali.n))
              const height = day.totali.n ? Math.max(18, (day.totali.n / max) * 100) : 5
              return <div className="flex min-w-0 flex-1 flex-col items-center justify-end gap-1" key={day.giorno}><span className="w-full rounded-t-md bg-brand/75" style={{ height: `${height}%` }} /><span className="text-[9px] text-muted">{day.giorno.slice(8)}</span></div>
            })}
          </div>
          <p className="mt-3 text-xs text-muted">{week.indice === null ? 'La stabilità appare dopo il primo salvataggio.' : `Indice ${week.indice} · ${week.livello ? LEVEL_LABELS[week.livello] : ''}`}</p>
        </article>
      </section>

      {summary.plates > 0 && (
        <section className="mt-4 rounded-3xl border border-brand/30 bg-brand-soft/45 p-5">
          <p className="section-label text-brand">Sessione pasto in corso</p>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
            <div><strong className="text-2xl text-ink">{summary.plates} {summary.plates === 1 ? 'piatto' : 'piatti'}</strong><p className="mt-1 text-sm text-muted">{formatNumber(summary.carbo)} g carbo · CG {formatNumber(summary.cg)}</p></div>
            <a className="secondary-button" href="#photo">Continua la sessione <ChevronRightIcon className="size-4" /></a>
          </div>
        </section>
      )}

      <section className="mt-7">
        <div className="flex items-end justify-between gap-3 px-1"><div><p className="section-label">Accessi rapidi</p><h2 className="mt-1 text-2xl font-extrabold text-ink">Cosa vuoi fare?</h2></div></div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_ACTIONS.map(({ href, label, note, icon: Icon }) => (
            <a className="group rounded-3xl border border-line bg-surface p-4 transition hover:-translate-y-0.5 hover:border-brand/50" href={href} key={href}>
              <div className="flex items-center justify-between"><span className="grid size-11 place-items-center rounded-2xl bg-brand-soft text-brand"><Icon className="size-5" /></span><ChevronRightIcon className="size-5 text-muted transition group-hover:text-brand" /></div>
              <h3 className="mt-4 font-extrabold text-ink">{label}</h3><p className="mt-1 text-xs text-muted">{note}</p>
            </a>
          ))}
        </div>
      </section>

      {todayEntries.length > 0 && <p className="mt-6 text-xs text-muted">I dati mostrati derivano esclusivamente dalle {todayEntries.length} voci locali di oggi.</p>}
    </div>
  )
}
