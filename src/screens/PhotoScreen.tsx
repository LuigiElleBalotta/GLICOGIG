import type { RefObject } from 'react'
import PhotoCard from '../components/PhotoCard'
import ResultPanel, { type ViewStatus } from '../components/ResultPanel'
import {
  EyeIcon,
  EyeOffIcon,
  LayersIcon,
  LockIcon,
  TrashIcon,
} from '../components/Icons'
import { formatNumber } from '../domain/nutrition'
import type { PreparedImage } from '../services/imagePreparation'
import { useMealSession } from '../state/mealSession'
import type { AnalizzaResponse } from '../types/analysis'

interface PhotoScreenProps {
  image: PreparedImage | null
  result: AnalizzaResponse | null
  status: ViewStatus
  error: string
  accessKey: string
  showAccessKey: boolean
  resultSection: RefObject<HTMLDivElement | null>
  onAccessKeyChange(value: string): void
  onToggleAccessKey(): void
  onFile(file: File): void | Promise<void>
  onAnalyze(): void
  onClear(): void
  onRetry(): void
  onIngredientGramsChange(index: number, grams: number): void
  onAddToSession(): void
}

function SessionSummary() {
  const { entries, summary, removeMeal, clearMeals } = useMealSession()
  if (!entries.length) return null

  return (
    <section className="mb-5 rounded-3xl border border-brand/30 bg-brand-soft/45 p-4 sm:p-5" aria-label="Sessione pasto corrente">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 text-[11px] font-extrabold tracking-[0.16em] text-brand uppercase"><LayersIcon className="size-4" /> Sessione pasto</p>
          <h2 className="mt-1 text-xl font-extrabold text-ink">{summary.plates} {summary.plates === 1 ? 'piatto' : 'piatti'} · {formatNumber(summary.carbo)} g carbo</h2>
          <p className="mt-1 text-xs text-muted">CG cumulativo {formatNumber(summary.cg)} · {formatNumber(summary.totalGrams)} g totali</p>
        </div>
        <button className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-coral/30 px-3 text-xs font-bold text-coral" type="button" onClick={clearMeals}><TrashIcon className="size-4" /> Svuota</button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {entries.map(({ id, result }) => (
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-ink" key={id}>
            {result.piatto || 'Piatto senza nome'}
            <button className="text-muted transition hover:text-coral" type="button" onClick={() => removeMeal(id)} aria-label={`Rimuovi ${result.piatto || 'piatto'} dalla sessione`}>×</button>
          </span>
        ))}
      </div>
      {summary.unresolved > 0 && <p className="mt-3 text-xs text-amber">{summary.unresolved} ingredienti non risolti non contribuiscono ai nutrienti.</p>}
    </section>
  )
}

export default function PhotoScreen({
  image,
  result,
  status,
  error,
  accessKey,
  showAccessKey,
  resultSection,
  onAccessKeyChange,
  onToggleAccessKey,
  onFile,
  onAnalyze,
  onClear,
  onRetry,
  onIngredientGramsChange,
  onAddToSession,
}: PhotoScreenProps) {
  const busy = status === 'preparing' || status === 'analyzing'

  return (
    <div>
      <section className="mb-5 px-1 sm:mb-7">
        <p className="screen-kicker">Analisi fotografica</p>
        <h1 className="screen-title">Il tuo piatto, <span className="text-brand">letto in un lampo.</span></h1>
        <p className="screen-subtitle">Scatta, analizza e correggi le quantità. Nutrienti e carico glicemico si aggiornano sul dispositivo.</p>
      </section>

      <SessionSummary />

      <section className="mb-4 rounded-3xl border border-line bg-paper/90 p-4 shadow-card backdrop-blur sm:flex sm:items-center sm:gap-4 sm:p-5">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl border border-brand/20 bg-brand-soft text-brand"><LockIcon className="size-5" /></span>
          <div className="min-w-0 flex-1">
            <label className="text-[11px] font-extrabold tracking-[0.14em] text-amber uppercase" htmlFor="access-key">Password del sito</label>
            <div className="relative mt-1.5">
              <input id="access-key" className="field pr-11" type={showAccessKey ? 'text' : 'password'} value={accessKey} onChange={(event) => onAccessKeyChange(event.target.value)} placeholder="Inserisci la password" autoComplete="current-password" />
              <button className="absolute inset-y-0 right-0 grid w-11 place-items-center text-muted transition hover:text-brand" type="button" onClick={onToggleAccessKey} aria-label={showAccessKey ? 'Nascondi password' : 'Mostra password'}>{showAccessKey ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}</button>
            </div>
          </div>
        </div>
        <p className="mt-3 max-w-md text-xs leading-5 text-muted sm:mt-0">Serve per l’analisi e resta solo nella sessione di questa scheda.</p>
      </section>

      <div className="grid items-start gap-4 lg:grid-cols-[0.88fr_1.12fr]">
        <PhotoCard
          image={image}
          busy={busy}
          preparing={status === 'preparing'}
          analyzing={status === 'analyzing'}
          onFile={onFile}
          onAnalyze={onAnalyze}
          onClear={onClear}
        />
        <div ref={resultSection} className="scroll-mt-24">
          <ResultPanel
            status={status}
            result={result}
            error={error}
            hasImage={Boolean(image)}
            onRetry={onRetry}
            onIngredientGramsChange={onIngredientGramsChange}
            onAddToSession={onAddToSession}
          />
        </div>
      </div>

      <p className="mt-6 border-t border-line pt-5 text-xs leading-5 text-muted">Le stime sono informative e non sostituiscono indicazioni mediche o nutrizionali professionali.</p>
    </div>
  )
}
