import { useMemo } from 'react'
import {
  ActivityIcon,
  DiaryIcon,
  LayersIcon,
  SparklesIcon,
  UtensilsIcon,
} from '../components/Icons'
import { formatNumber } from '../domain/nutrition'
import {
  andamentoSettimana,
  bilancioOggi,
  datiAnelliOggi,
  giorniConsecutivi,
  reportSettimana,
} from '../domain/progress'
import { useDayKey } from '../lib/useDayKey'
import { useMealSession } from '../state/mealSession'
import { useDiario } from '../storage/diaryStore'

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

function trendText(trend: ReturnType<typeof andamentoSettimana>): string {
  if (!trend) return 'Dati insufficienti'
  if (trend.key === 'meglio') return `${trend.pct}% meglio`
  if (trend.key === 'margine') return `${trend.pct}% di margine`
  return 'In linea'
}

export default function AdviceScreen() {
  const localDay = useDayKey('local')
  const diaryEntries = useDiario()
  const { entries: mealEntries, summary } = useMealSession()
  const progress = useMemo(() => {
    const reference = new Date()
    return {
      rings: datiAnelliOggi(diaryEntries, reference),
      balance: bilancioOggi(diaryEntries, reference),
      streak: giorniConsecutivi(diaryEntries, reference),
      trend: andamentoSettimana(diaryEntries, reference),
      report: reportSettimana(null, diaryEntries, reference),
    }
  }, [diaryEntries, localDay])

  return (
    <div>
      <section className="mb-6 px-1">
        <p className="screen-kicker">Consigli dai tuoi dati locali</p>
        <h1 className="screen-title">Più contesto, <span className="text-brand">senza inventare obiettivi.</span></h1>
        <p className="screen-subtitle">Questa vista combina il Pasto in corso e le registrazioni reali del Diario. Le sezioni che richiedono preferenze non configurate non vengono mostrate.</p>
      </section>

      {mealEntries.length > 0 ? (
        <section className="app-card rounded-3xl border border-brand/35 bg-paper p-5 shadow-card sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div><p className="section-label">Pasto in corso</p><h2 className="mt-1 text-2xl font-extrabold text-ink">{summary.plates} {summary.plates === 1 ? 'piatto' : 'piatti'}</h2></div>
            <LayersIcon className="size-7 text-brand" />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <div className="data-tile"><span>Carboidrati</span><strong>{formatNumber(summary.carbs)} g</strong></div>
            <div className="data-tile"><span>Carico glicemico</span><strong>{formatNumber(summary.glycemicLoad)}</strong></div>
            <div className="data-tile"><span>Fascia</span><strong>{summary.band}</strong></div>
            <div className="data-tile"><span>Fibre</span><strong>{formatNumber(summary.fibre)} g</strong></div>
          </div>
          {summary.unresolved > 0 && <p className="mt-4 rounded-2xl border border-amber/30 bg-amber-soft p-3 text-sm text-amber">{summary.unresolved} elementi non risolti rendono i totali parziali.</p>}
          <a className="secondary-button mt-4" href="#meal"><UtensilsIcon className="size-5" /> Apri il Pasto</a>
        </section>
      ) : (
        <section className="rounded-3xl border border-dashed border-line bg-surface p-6 text-center">
          <UtensilsIcon className="mx-auto size-9 text-muted" />
          <h2 className="mt-3 font-extrabold text-ink">Nessun Pasto in corso</h2>
          <p className="mt-2 text-sm text-muted">Componi un Pasto per visualizzarne qui il riepilogo locale.</p>
          <a className="secondary-button mt-4" href="#meal">Componi Pasto</a>
        </section>
      )}

      <section className="mt-5 grid gap-4 lg:grid-cols-2">
        <article className="app-card rounded-3xl border border-line bg-paper p-5 shadow-card sm:p-6">
          <div className="flex items-start justify-between gap-3"><div><p className="section-label">Oggi</p><h2 className="mt-1 text-2xl font-extrabold text-ink">Indicatori locali</h2></div><ActivityIcon className="size-7 text-brand" /></div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="data-tile"><span>Equilibrio</span><strong>{progress.rings.equilibrio}%</strong></div>
            <div className="data-tile"><span>Freni</span><strong>{progress.rings.freni}%</strong></div>
            <div className="data-tile"><span>Varietà</span><strong>{progress.rings.varieta}%</strong></div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="data-tile"><span>Bilancio</span><strong>{progress.balance ? BALANCE_LABELS[progress.balance] : 'n.d.'}</strong></div>
            <div className="data-tile"><span>Consecutività</span><strong>{progress.streak} {progress.streak === 1 ? 'giorno' : 'giorni'}</strong></div>
            <div className="data-tile"><span>Andamento</span><strong>{trendText(progress.trend)}</strong></div>
          </div>
        </article>

        <article className="app-card rounded-3xl border border-line bg-paper p-5 shadow-card sm:p-6">
          <div className="flex items-start justify-between gap-3"><div><p className="section-label">Ultimi sette giorni</p><h2 className="mt-1 text-2xl font-extrabold text-ink">Sintesi settimana</h2></div><SparklesIcon className="size-7 text-brand" /></div>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <div className="data-tile"><span>Voci</span><strong>{progress.report.nPasti}</strong></div>
            <div className="data-tile"><span>Giorni attivi</span><strong>{progress.report.giorniAttivi}</strong></div>
            <div className="data-tile"><span>Kcal / giorno</span><strong>{progress.report.kcalGiorno}</strong></div>
            <div className="data-tile"><span>Verdetto</span><strong>{VERDICT_LABELS[progress.report.verdetto]}</strong></div>
          </div>
          {progress.report.difficile ? (
            <div className="mt-4 rounded-2xl border border-amber/35 bg-amber-soft p-4">
              <p className="text-xs font-bold tracking-wide text-muted uppercase">Pasto più difficile</p>
              <p className="mt-1 font-extrabold text-ink">{progress.report.difficile.nome}</p>
              <p className="mt-1 text-xs text-muted">CG {formatNumber(progress.report.difficile.cg)} · {progress.report.difficile.fascia}</p>
            </div>
          ) : <p className="mt-4 text-sm leading-6 text-muted">Nessuna voce in fascia media o alta nella settimana.</p>}
          <a className="secondary-button mt-4" href="#diary"><DiaryIcon className="size-5" /> Apri Progressi</a>
        </article>
      </section>

      <p className="mt-6 border-t border-line pt-5 text-xs leading-5 text-muted">I riepiloghi derivano solo dal Pasto effimero e dal Diario locale. Non includono paywall, referral, analytics o raccomandazioni cliniche.</p>
    </div>
  )
}
