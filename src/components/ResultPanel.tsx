import { getFoodByCatalogId } from '../catalog/foodCatalog'
import { calculateGlycemicImpact } from '../domain/impactCalculator'
import { formatConfidence, formatNumber } from '../domain/nutrition'
import {
  calculateIngredientNutrition,
  calculateMealNutrition,
  effectiveIngredientGrams,
} from '../domain/nutritionCalculator'
import type { AnalizzaResponse } from '../types/analysis'
import type { GlycemicImpactBand, NutritionValues } from '../types/nutrition'
import { RefreshIcon, SparklesIcon, UtensilsIcon } from './Icons'

export type ViewStatus = 'idle' | 'preparing' | 'analyzing' | 'success' | 'error'

interface ResultPanelProps {
  status: ViewStatus
  result: AnalizzaResponse | null
  error: string
  hasImage: boolean
  onRetry(): void
  onIngredientGramsChange(index: number, grams: number): void
}

interface ResultStateProps {
  result: AnalizzaResponse
  onIngredientGramsChange(index: number, grams: number): void
}

const TOTAL_NUTRIENTS: Array<{ key: keyof NutritionValues; label: string; unit: string }> = [
  { key: 'energia_kcal', label: 'Energia', unit: 'kcal' },
  { key: 'carboidrati_disponibili_g', label: 'Carboidrati disponibili', unit: 'g' },
  { key: 'fibre_g', label: 'Fibre', unit: 'g' },
  { key: 'proteine_g', label: 'Proteine', unit: 'g' },
  { key: 'grassi_totali_g', label: 'Grassi', unit: 'g' },
]

function impactClasses(band: GlycemicImpactBand): string {
  if (band === 'basso') return 'bg-mint-soft text-mint'
  if (band === 'medio') return 'bg-amber-soft text-amber-strong'
  return 'bg-coral-soft text-coral'
}

function LoadingState() {
  return (
    <div className="flex min-h-[34rem] flex-col items-center justify-center px-6 text-center">
      <div className="relative grid size-24 place-items-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-mint/15" />
        <span className="absolute inset-2 animate-spin rounded-full border-2 border-brand/10 border-t-mint" />
        <SparklesIcon className="size-9 text-brand" />
      </div>
      <p className="mt-7 text-xs font-bold tracking-[0.18em] text-mint uppercase">Analisi in corso</p>
      <h2 className="mt-2 text-3xl font-semibold text-brand">Osserviamo il tuo piatto</h2>
      <p className="mt-3 max-w-sm text-sm leading-6 text-muted">Riconoscimento degli ingredienti e preparazione dei dati.</p>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex min-h-[34rem] flex-col justify-center p-6 sm:p-8">
      <div className="grid size-14 place-items-center rounded-2xl bg-mint-soft text-mint"><UtensilsIcon className="size-7" /></div>
      <p className="mt-8 text-xs font-bold tracking-[0.18em] text-mint uppercase">Passaggio 2</p>
      <h2 className="mt-2 max-w-md text-3xl font-semibold leading-tight text-brand sm:text-4xl">Scopri cosa c’è nel piatto.</h2>
      <p className="mt-4 max-w-lg leading-7 text-muted">Dopo l’analisi puoi correggere i grammi: nutrienti e impatto vengono ricalcolati subito dal catalogo locale.</p>
    </div>
  )
}

function ErrorState({ message, canRetry, onRetry }: { message: string; canRetry: boolean; onRetry(): void }) {
  return (
    <div className="flex min-h-[34rem] flex-col items-center justify-center px-7 text-center">
      <div className="grid size-16 place-items-center rounded-full bg-coral-soft text-2xl font-black text-coral">!</div>
      <p className="mt-6 text-xs font-bold tracking-[0.18em] text-coral uppercase">Qualcosa non ha funzionato</p>
      <h2 className="mt-2 text-3xl font-semibold text-brand">Analisi non completata</h2>
      <p className="mt-3 max-w-sm leading-7 text-muted">{message}</p>
      {canRetry && <button className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-2xl bg-brand px-6 font-bold text-white hover:bg-brand-deep" type="button" onClick={onRetry}><RefreshIcon className="size-5" /> Riprova</button>}
    </div>
  )
}

function NutrientGrid({ values, totalGrams }: { values: NutritionValues; totalGrams: number }) {
  return (
    <section className="mt-6">
      <div className="flex items-end justify-between gap-3">
        <div><p className="text-xs font-bold tracking-[0.16em] text-muted uppercase">Totale piatto</p><h3 className="mt-1 text-lg font-extrabold text-brand">Valori nutrizionali</h3></div>
        <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-extrabold text-brand">{formatNumber(totalGrams)} g</span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
        {TOTAL_NUTRIENTS.map(({ key, label, unit }) => (
          <div className="rounded-2xl border border-line bg-surface px-3 py-3" key={key}>
            <p className="text-[11px] leading-4 text-muted">{label}</p>
            <p className="mt-1 text-lg font-extrabold text-brand">{formatNumber(values[key])}<span className="ml-1 text-[10px] font-bold text-muted">{unit}</span></p>
          </div>
        ))}
      </div>
    </section>
  )
}

function ResultState({ result, onIngredientGramsChange }: ResultStateProps) {
  if (!result.e_cibo) {
    return (
      <div className="flex min-h-[34rem] flex-col items-center justify-center p-7 text-center">
        <UtensilsIcon className="size-12 text-amber" />
        <h2 className="mt-5 text-3xl font-semibold text-brand">Nessun piatto riconosciuto</h2>
        <p className="mt-3 max-w-sm text-muted">{result.descrizione || 'Prova una foto più vicina e luminosa.'}</p>
      </div>
    )
  }

  const confidence = formatConfidence(result.confidenza)
  const meal = calculateMealNutrition(result.ingredienti)
  const impact = calculateGlycemicImpact(result.ingredienti)
  const missingIds = meal.unresolved.filter((item) => item.reason === 'missing_catalog_id').length
  const unknownIds = meal.unresolved.filter((item) => item.reason === 'catalog_id_not_found').length

  return (
    <div className="p-5 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-[0.18em] text-mint uppercase">Piatto riconosciuto</p>
          <h2 className="mt-2 text-3xl font-semibold text-brand sm:text-4xl">{result.piatto || 'Piatto senza nome'}</h2>
          {result.descrizione && <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">{result.descrizione}</p>}
        </div>
        <div className="flex flex-wrap gap-2">
          {confidence && <span className="rounded-full bg-brand-soft px-3 py-1.5 text-xs font-bold text-brand">Confidenza {confidence}</span>}
          {result.impatto && <span className="rounded-full bg-surface px-3 py-1.5 text-xs font-bold text-muted">Backend: {result.impatto}</span>}
        </div>
      </div>

      <section className="mt-6 grid gap-3 sm:grid-cols-[0.75fr_1.25fr]">
        <div className={`rounded-3xl p-5 ${impactClasses(impact.fascia)}`}>
          <p className="text-xs font-extrabold tracking-[0.16em] uppercase">Carico glicemico</p>
          <div className="mt-2 flex items-end gap-2"><strong className="text-4xl leading-none">{formatNumber(impact.cg)}</strong><span className="text-sm font-extrabold uppercase">{impact.fascia}</span></div>
          <p className="mt-3 text-xs leading-5 opacity-80">Affidabilità {impact.affidabilita} · {impact.trovati}/{impact.totali} ingredienti risolti</p>
        </div>
        <div className="rounded-3xl border border-line bg-surface p-5">
          <p className="text-xs font-extrabold tracking-[0.16em] text-muted uppercase">Contributi principali</p>
          {impact.contributi.length ? (
            <div className="mt-3 space-y-2">
              {impact.contributi.map((item) => <div className="flex items-center justify-between gap-4 text-sm" key={item.nome}><span className="truncate font-semibold text-ink">{item.nome}</span><strong className="text-brand">CG {formatNumber(item.cg)}</strong></div>)}
            </div>
          ) : <p className="mt-3 text-sm leading-6 text-muted">Nessun contributo pari o superiore a 0,5.</p>}
        </div>
      </section>

      <NutrientGrid values={meal.nutrition} totalGrams={meal.totalGrams} />

      {(missingIds > 0 || unknownIds > 0) && (
        <div className="mt-4 rounded-2xl border border-amber/25 bg-amber-soft p-4 text-sm leading-6 text-ink">
          {missingIds > 0 && <p><strong>{missingIds}</strong> ingredienti senza <code>catalogo_id</code>: esclusi dai calcoli.</p>}
          {unknownIds > 0 && <p><strong>{unknownIds}</strong> ID non presenti nel catalogo APK: esclusi dai calcoli.</p>}
        </div>
      )}

      <section className="mt-7">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div><p className="text-xs font-bold tracking-[0.16em] text-muted uppercase">Ingredienti</p><h3 className="mt-1 text-lg font-extrabold text-brand">Correggi le quantità</h3></div>
          <p className="text-xs text-muted">Ricalcolo locale, nessuna nuova analisi</p>
        </div>
        <div className="mt-3 divide-y divide-line overflow-hidden rounded-2xl border border-line">
          {result.ingredienti.map((ingredient, index) => {
            const food = getFoodByCatalogId(ingredient.catalogo_id)
            const grams = food ? effectiveIngredientGrams(food, ingredient.grammi) : ingredient.grammi
            const nutrition = food ? calculateIngredientNutrition(food, grams) : null
            return (
              <div className="grid gap-3 bg-white px-4 py-4 sm:grid-cols-[1fr_auto] sm:items-center" key={`${ingredient.catalogo_id || ingredient.nome}-${index}`}>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-ink">{ingredient.nome}</p>
                  <p className="mt-1 truncate text-xs text-muted">{ingredient.catalogo_id || 'catalogo_id assente'}{ingredient.cottura ? ` · ${ingredient.cottura}` : ''}</p>
                  {food && nutrition ? (
                    <p className="mt-2 text-xs leading-5 text-muted">{food.categoria} · {formatNumber(nutrition.carboidrati_disponibili_g)} g carboidrati disponibili{food.ig_medio !== null ? ` · IG ${formatNumber(food.ig_medio)}` : ' · IG n/a'}</p>
                  ) : <p className="mt-2 text-xs font-semibold text-coral">Valori locali non disponibili</p>}
                </div>
                <label className="flex items-center justify-end gap-2 text-xs font-bold text-muted">
                  <span>Grammi</span>
                  <input
                    aria-label={`Grammi di ${ingredient.nome}`}
                    className="h-10 w-24 rounded-xl border border-line bg-surface px-3 text-right text-sm font-extrabold text-brand outline-none focus:border-brand focus:ring-3 focus:ring-brand/10"
                    inputMode="numeric"
                    max={2000}
                    min={0}
                    step={1}
                    type="number"
                    value={grams}
                    onChange={(event) => onIngredientGramsChange(index, Number(event.target.value))}
                  />
                </label>
              </div>
            )
          })}
        </div>
      </section>

      <details className="mt-5 rounded-2xl border border-line px-4 py-3 text-xs text-muted">
        <summary className="font-bold text-brand">Valori per 100 g e risposta tecnica</summary>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
          {TOTAL_NUTRIENTS.map(({ key, label, unit }) => <div className="rounded-xl bg-surface p-2" key={key}><span>{label}</span><strong className="mt-1 block text-brand">{formatNumber(meal.per100[key])} {unit}</strong></div>)}
        </div>
        <pre className="mt-3 max-h-56 overflow-auto whitespace-pre-wrap break-all rounded-xl bg-brand-deep p-3 text-[11px] leading-5 text-white/80">{JSON.stringify(result, null, 2)}</pre>
      </details>

      {result.lezione && <p className="mt-5 rounded-2xl bg-mint-soft p-4 text-sm leading-6 text-brand"><strong>Lezione:</strong> {result.lezione}</p>}
      {result.quando_ha_senso && <p className="mt-3 rounded-2xl bg-amber-soft p-4 text-sm leading-6 text-ink"><strong>Quando ha senso:</strong> {result.quando_ha_senso}</p>}
    </div>
  )
}

export default function ResultPanel({ status, result, error, hasImage, onRetry, onIngredientGramsChange }: ResultPanelProps) {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/90 shadow-card backdrop-blur" aria-live="polite">
      {status === 'analyzing' && <LoadingState />}
      {status === 'error' && <ErrorState message={error} canRetry={hasImage} onRetry={onRetry} />}
      {status === 'success' && result && <ResultState result={result} onIngredientGramsChange={onIngredientGramsChange} />}
      {(status === 'idle' || status === 'preparing') && <EmptyState />}
    </section>
  )
}
