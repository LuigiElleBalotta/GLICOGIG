import type { RefObject } from 'react'
import PhotoCard from '../components/PhotoCard'
import ResultPanel, { type ViewStatus } from '../components/ResultPanel'
import {
  CameraIcon,
  EyeIcon,
  EyeOffIcon,
  LayersIcon,
  LockIcon,
  SparklesIcon,
  TrashIcon,
} from '../components/Icons'
import { formatNumber } from '../domain/nutrition'
import type { PreparedImage } from '../services/imagePreparation'
import { useMealSession } from '../state/mealSession'
import type {
  AnalizzaResponse,
  AnalysisOrigin,
  PortionPreset,
  RawWeightMode,
} from '../types/analysis'

interface PhotoScreenProps {
  analysisMode: AnalysisOrigin
  completeMeal: boolean
  image: PreparedImage | null
  text: string
  result: AnalizzaResponse | null
  resultOrigin: AnalysisOrigin
  portionPreset: PortionPreset | null
  rawWeightMode: RawWeightMode
  addedToMeal: boolean
  mealItemCount: number
  status: ViewStatus
  error: string
  accessKey: string
  showAccessKey: boolean
  resultSection: RefObject<HTMLDivElement | null>
  onAnalysisModeChange(value: AnalysisOrigin): void
  onCompleteMealStart(): void
  onSingleDish(): void
  onAccessKeyChange(value: string): void
  onToggleAccessKey(): void
  onFile(file: File): void | Promise<void>
  onTextChange(value: string): void
  onAnalyzePhoto(): void
  onAnalyzeText(): void
  onClear(): void
  onRetry(): void
  onIngredientGramsChange(index: number, grams: number): void
  onPortionPresetChange(value: PortionPreset): void
  onRawWeightModeChange(value: RawWeightMode): void
  onAddToSession(): void
  onAnalyzeAnother(): void
}

function SessionSummary() {
  const { entries, summary, removeItem, clearMeal } = useMealSession()
  if (!entries.length) return null

  return (
    <section className="mb-5 rounded-3xl border border-brand/30 bg-brand-soft/45 p-4 sm:p-5" aria-label="Sessione pasto corrente">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 text-[11px] font-extrabold tracking-[0.16em] text-brand uppercase"><LayersIcon className="size-4" /> Pasto in corso</p>
          <h2 className="mt-1 text-xl font-extrabold text-ink">{summary.plates} {summary.plates === 1 ? 'piatto' : 'piatti'} · {formatNumber(summary.carbs)} g carbo</h2>
          <p className="mt-1 text-xs text-muted">CG cumulativo {formatNumber(summary.glycemicLoad)} · {formatNumber(summary.totalGrams)} g totali</p>
        </div>
        <div className="flex gap-2"><a className="secondary-button" href="#meal">Apri Pasto</a><button className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-coral/30 px-3 text-xs font-bold text-coral" type="button" onClick={clearMeal}><TrashIcon className="size-4" /> Svuota</button></div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {entries.map(({ id, item }) => (
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-ink" key={id}>
            {item.name}
            <button className="text-muted transition hover:text-coral" type="button" onClick={() => removeItem(id)} aria-label={`Rimuovi ${item.name} dal pasto`}>×</button>
          </span>
        ))}
      </div>
      {summary.unresolved > 0 && <p className="mt-3 text-xs text-amber">{summary.unresolved} elementi non risolti non contribuiscono ai nutrienti.</p>}
    </section>
  )
}

export default function PhotoScreen({
  analysisMode,
  completeMeal,
  image,
  text,
  result,
  resultOrigin,
  portionPreset,
  rawWeightMode,
  addedToMeal,
  mealItemCount,
  status,
  error,
  accessKey,
  showAccessKey,
  resultSection,
  onAnalysisModeChange,
  onCompleteMealStart,
  onSingleDish,
  onAccessKeyChange,
  onToggleAccessKey,
  onFile,
  onTextChange,
  onAnalyzePhoto,
  onAnalyzeText,
  onClear,
  onRetry,
  onIngredientGramsChange,
  onPortionPresetChange,
  onRawWeightModeChange,
  onAddToSession,
  onAnalyzeAnother,
}: PhotoScreenProps) {
  const busy = status === 'preparing' || status === 'analyzing'
  const hasInput = analysisMode === 'photo' ? Boolean(image) : Boolean(text.trim())

  return (
    <div>
      <section className="mb-5 px-1 sm:mb-7">
        <p className="screen-kicker">Analisi piatto</p>
        <h1 className="screen-title">Il tuo piatto, <span className="text-brand">letto in un lampo.</span></h1>
        <p className="screen-subtitle">Usa una foto oppure descrivi il piatto. Correggi poi quantità e pesi: nutrienti e carico glicemico si aggiornano sul dispositivo.</p>
      </section>

      <SessionSummary />

      <section className="mb-4 grid gap-3 rounded-3xl border border-line bg-paper/90 p-4 shadow-card backdrop-blur sm:grid-cols-2 sm:p-5">
        <div>
          <p className="section-label">Ingresso</p>
          <div className="mt-2 grid grid-cols-2 gap-2" role="group" aria-label="Modalità di analisi">
            <button className={analysisMode === 'photo' ? 'primary-button' : 'secondary-button'} type="button" onClick={() => onAnalysisModeChange('photo')} disabled={busy}><CameraIcon className="size-5" /> Foto</button>
            <button className={analysisMode === 'text' ? 'primary-button' : 'secondary-button'} type="button" onClick={() => onAnalysisModeChange('text')} disabled={busy}><SparklesIcon className="size-5" /> Testo</button>
          </div>
        </div>
        <div>
          <p className="section-label">Sessione</p>
          <div className="mt-2 grid grid-cols-2 gap-2" role="group" aria-label="Modalità pasto">
            <button className={!completeMeal ? 'primary-button' : 'secondary-button'} type="button" onClick={onSingleDish}>Piatto singolo</button>
            <button className={completeMeal ? 'primary-button' : 'secondary-button'} type="button" onClick={onCompleteMealStart}><LayersIcon className="size-5" /> Pasto completo</button>
          </div>
          <p className="mt-2 text-xs leading-5 text-muted">Avviando un pasto completo, una sessione più vecchia di 4 ore viene svuotata prima di continuare.</p>
        </div>
      </section>

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
        {analysisMode === 'photo' ? (
          <PhotoCard
            image={image}
            busy={busy}
            preparing={status === 'preparing'}
            analyzing={status === 'analyzing'}
            onFile={onFile}
            onAnalyze={onAnalyzePhoto}
            onClear={onClear}
          />
        ) : (
          <section className="app-card rounded-[1.75rem] border border-line bg-paper/95 p-4 shadow-card backdrop-blur sm:p-5">
            <div className="mb-4 flex items-start justify-between gap-4 px-1">
              <div><p className="text-[11px] font-bold tracking-[0.18em] text-amber uppercase">Passaggio 1</p><h2 className="mt-1 font-display text-2xl font-extrabold text-ink">Descrivi il piatto</h2></div>
              <span className="rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-bold text-brand">max 2000</span>
            </div>
            <label className="sr-only" htmlFor="dish-description">Ingredienti e quantità del piatto</label>
            <textarea id="dish-description" className="field min-h-52 resize-y leading-6" value={text} maxLength={2000} onChange={(event) => onTextChange(event.target.value)} disabled={busy} placeholder="Es. 80 g di riso integrale cotto, 120 g di ceci e verdure…" />
            <div className="mt-2 flex items-center justify-between gap-3 text-xs text-muted"><span>Indica preparazione e grammi quando li conosci.</span><span>{text.length}/2000</span></div>
            <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_auto]">
              <button className="primary-button" type="button" onClick={onAnalyzeText} disabled={busy || !text.trim()}><SparklesIcon className="size-5" />{status === 'analyzing' ? 'Analisi in corso…' : 'Analizza descrizione'}</button>
              <button className="secondary-button" type="button" onClick={onClear} disabled={busy || (!text && !result)}>Pulisci</button>
            </div>
            <p className="mt-4 text-xs leading-5 text-muted">Il browser invia solo testo, lingua e identificativo effimero al boundary same-origin. Nessuna immagine viene associata a questa modalità.</p>
          </section>
        )}
        <div ref={resultSection} className="scroll-mt-24">
          <ResultPanel
            status={status}
            result={result}
            resultOrigin={resultOrigin}
            error={error}
            hasInput={hasInput}
            portionPreset={portionPreset}
            rawWeightMode={rawWeightMode}
            addedToMeal={addedToMeal}
            mealItemCount={mealItemCount}
            onRetry={onRetry}
            onIngredientGramsChange={onIngredientGramsChange}
            onPortionPresetChange={onPortionPresetChange}
            onRawWeightModeChange={onRawWeightModeChange}
            onAddToSession={onAddToSession}
            onAnalyzeAnother={onAnalyzeAnother}
          />
        </div>
      </div>

      <p className="mt-6 border-t border-line pt-5 text-xs leading-5 text-muted">Le stime sono informative e non sostituiscono indicazioni mediche o nutrizionali professionali.</p>
    </div>
  )
}
