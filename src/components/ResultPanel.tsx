import { RefreshIcon, SparklesIcon, UtensilsIcon } from './Icons'
import { formatConfidence, formatNumber } from '../domain/nutrition'
import type { AnalizzaResponse } from '../types/analysis'

export type ViewStatus = 'idle' | 'preparing' | 'analyzing' | 'success' | 'error'

interface ResultPanelProps {
  status: ViewStatus
  result: AnalizzaResponse | null
  error: string
  hasImage: boolean
  onRetry(): void
}

function LoadingState() {
  return <div className="flex min-h-[34rem] flex-col items-center justify-center px-6 text-center"><div className="relative grid size-24 place-items-center"><span className="absolute inset-0 animate-ping rounded-full bg-mint/15" /><span className="absolute inset-2 animate-spin rounded-full border-2 border-brand/10 border-t-mint" /><SparklesIcon className="size-9 text-brand" /></div><p className="mt-7 text-xs font-bold tracking-[0.18em] text-mint uppercase">Analisi in corso</p><h2 className="mt-2 font-display text-3xl font-semibold text-brand">Osserviamo il tuo piatto</h2><p className="mt-3 max-w-sm text-sm leading-6 text-muted">Riconoscimento degli ingredienti e preparazione dei dati.</p></div>
}

function EmptyState() {
  return <div className="flex min-h-[34rem] flex-col justify-center p-6 sm:p-8"><div className="grid size-14 place-items-center rounded-2xl bg-mint-soft text-mint"><UtensilsIcon className="size-7" /></div><p className="mt-8 text-xs font-bold tracking-[0.18em] text-mint uppercase">Passaggio 2</p><h2 className="mt-2 max-w-md font-display text-3xl font-semibold leading-tight text-brand sm:text-4xl">Scopri cosa c’è davvero nel piatto.</h2><p className="mt-4 max-w-lg leading-7 text-muted">La risposta fotografica mostrerà soltanto ingredienti e metadati realmente restituiti dal servizio. I valori nutrizionali appariranno quando il relativo catalogo locale è risolto.</p></div>
}

function ErrorState({ message, canRetry, onRetry }: { message: string; canRetry: boolean; onRetry(): void }) {
  return <div className="flex min-h-[34rem] flex-col items-center justify-center px-7 text-center"><div className="grid size-16 place-items-center rounded-full bg-coral-soft text-2xl font-black text-coral">!</div><p className="mt-6 text-xs font-bold tracking-[0.18em] text-coral uppercase">Qualcosa non ha funzionato</p><h2 className="mt-2 font-display text-3xl font-semibold text-brand">Analisi non completata</h2><p className="mt-3 max-w-sm leading-7 text-muted">{message}</p>{canRetry && <button className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-2xl bg-brand px-6 font-bold text-white hover:bg-brand-deep" type="button" onClick={onRetry}><RefreshIcon className="size-5" /> Riprova</button>}</div>
}

function ResultState({ result }: { result: AnalizzaResponse }) {
  if (!result.e_cibo) return <div className="flex min-h-[34rem] flex-col items-center justify-center p-7 text-center"><UtensilsIcon className="size-12 text-amber" /><h2 className="mt-5 font-display text-3xl font-semibold text-brand">Nessun piatto riconosciuto</h2><p className="mt-3 max-w-sm text-muted">{result.descrizione || 'Prova una foto più vicina e luminosa.'}</p></div>
  const confidence = formatConfidence(result.confidenza)
  return <div className="p-5 sm:p-7"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-bold tracking-[0.18em] text-mint uppercase">Piatto riconosciuto</p><h2 className="mt-2 font-display text-3xl font-semibold text-brand sm:text-4xl">{result.piatto || 'Piatto senza nome'}</h2>{result.descrizione && <p className="mt-3 max-w-lg text-sm leading-6 text-muted">{result.descrizione}</p>}</div>{confidence && <span className="rounded-full bg-brand-soft px-3 py-1.5 text-xs font-bold text-brand">Confidenza {confidence}</span>}</div><div className="mt-7"><h3 className="mb-3 text-sm font-extrabold text-brand">Ingredienti restituiti</h3><div className="divide-y divide-line overflow-hidden rounded-2xl border border-line">{result.ingredienti.map((ingredient, index) => <div className="grid grid-cols-[1fr_auto] gap-4 bg-white px-4 py-3.5" key={`${ingredient.catalogo_id || ingredient.nome}-${index}`}><div className="min-w-0"><p className="truncate text-sm font-bold text-ink">{ingredient.nome}</p><p className="mt-1 truncate text-xs text-muted">{ingredient.catalogo_id || 'catalogo_id assente'}{ingredient.cottura ? ` · ${ingredient.cottura}` : ''}</p></div><span className="self-center rounded-full bg-brand-soft px-3 py-1 text-xs font-extrabold text-brand">{formatNumber(ingredient.grammi)} g</span></div>)}</div></div>{result.lezione && <p className="mt-5 rounded-2xl bg-mint-soft p-4 text-sm leading-6 text-brand"><strong>Lezione:</strong> {result.lezione}</p>}{result.quando_ha_senso && <p className="mt-3 rounded-2xl bg-amber-soft p-4 text-sm leading-6 text-ink"><strong>Quando ha senso:</strong> {result.quando_ha_senso}</p>}<details className="mt-5 rounded-2xl border border-line px-4 py-3 text-xs text-muted"><summary className="cursor-pointer font-bold text-brand">Dati tecnici della risposta</summary><pre className="mt-3 max-h-56 overflow-auto whitespace-pre-wrap break-all rounded-xl bg-brand-deep p-3 text-[11px] leading-5 text-white/80">{JSON.stringify(result, null, 2)}</pre></details></div>
}

export default function ResultPanel({ status, result, error, hasImage, onRetry }: ResultPanelProps) {
  return <section className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/90 shadow-card backdrop-blur" aria-live="polite">{status === 'analyzing' && <LoadingState />}{status === 'error' && <ErrorState message={error} canRetry={hasImage} onRetry={onRetry} />}{status === 'success' && result && <ResultState result={result} />}{(status === 'idle' || status === 'preparing') && <EmptyState />}</section>
}
