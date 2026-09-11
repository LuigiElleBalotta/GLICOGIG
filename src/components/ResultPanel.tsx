import { useEffect, useState } from 'react'
import { getFoodByCatalogId, resolveFoodByName } from '../catalog/foodCatalog'
import { calculateGlycemicImpact } from '../domain/impactCalculator'
import { formatConfidence, formatNumber } from '../domain/nutrition'
import { fattoreCrudo, grammiCrudi } from '../domain/rawWeight'
import {
  calculateIngredientNutrition,
  calculateMealNutrition,
  effectiveIngredientGrams,
} from '../domain/nutritionCalculator'
import { condividiCard } from '../services/shareCard'
import { DIARY_STORAGE_KEY, registraMangiato } from '../storage/diaryStore'
import type {
  AnalizzaIngredient,
  AnalizzaResponse,
  AnalysisOrigin,
  PortionPreset,
  RawWeightMode,
} from '../types/analysis'
import type { FoodCatalogEntry } from '../types/catalog'
import type { GlycemicImpact, GlycemicImpactBand, MealNutrition, NutritionValues } from '../types/nutrition'
import {
  CheckIcon,
  PlusIcon,
  RefreshIcon,
  SaveIcon,
  ShareIcon,
  SparklesIcon,
  UtensilsIcon,
} from './Icons'

export type ViewStatus = 'idle' | 'preparing' | 'analyzing' | 'success' | 'error'

interface ResultPanelProps {
  status: ViewStatus
  result: AnalizzaResponse | null
  resultOrigin: AnalysisOrigin
  error: string
  hasInput: boolean
  portionPreset: PortionPreset | null
  rawWeightMode: RawWeightMode
  addedToMeal: boolean
  mealItemCount: number
  onRetry(): void
  onIngredientGramsChange(index: number, grams: number): void
  onPortionPresetChange(value: PortionPreset): void
  onRawWeightModeChange(value: RawWeightMode): void
  onAddToSession(): void
  onAnalyzeAnother(): void
}

interface ResultStateProps {
  result: AnalizzaResponse
  resultOrigin: AnalysisOrigin
  portionPreset: PortionPreset | null
  rawWeightMode: RawWeightMode
  addedToMeal: boolean
  mealItemCount: number
  onIngredientGramsChange(index: number, grams: number): void
  onPortionPresetChange(value: PortionPreset): void
  onRawWeightModeChange(value: RawWeightMode): void
  onAddToSession(): void
  onAnalyzeAnother(): void
}

type ActionState = 'idle' | 'working' | 'success' | 'error'

const TOTAL_NUTRIENTS: Array<{ key: keyof NutritionValues; label: string; unit: string }> = [
  { key: 'energia_kcal', label: 'Energia', unit: 'kcal' },
  { key: 'carboidrati_disponibili_g', label: 'Carboidrati disponibili', unit: 'g' },
  { key: 'fibre_g', label: 'Fibre', unit: 'g' },
  { key: 'proteine_g', label: 'Proteine', unit: 'g' },
  { key: 'grassi_totali_g', label: 'Grassi', unit: 'g' },
]

function impactClasses(band: GlycemicImpactBand): string {
  if (band === 'trascurabile') return 'bg-brand-soft text-brand'
  if (band === 'basso') return 'bg-mint-soft text-mint'
  if (band === 'medio') return 'bg-amber-soft text-amber-strong'
  return 'bg-coral-soft text-coral'
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

function resolveRowFood(ingredient: AnalizzaIngredient): FoodCatalogEntry | undefined {
  const byId = getFoodByCatalogId(ingredient.catalogo_id)
  if (byId) return byId
  const byName = resolveFoodByName(ingredient.nome)
  return byName.kind === 'resolved' ? byName.food : undefined
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
      {canRetry && <button className="primary-button mt-7" type="button" onClick={onRetry}><RefreshIcon className="size-5" /> Riprova</button>}
    </div>
  )
}

function NutrientGrid({ values, totalGrams }: { values: NutritionValues; totalGrams: number }) {
  return (
    <section className="mt-6">
      <div className="flex items-end justify-between gap-3">
        <div><p className="section-label">Totale piatto</p><h3 className="mt-1 text-lg font-extrabold text-brand">Valori nutrizionali</h3></div>
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

function ResultActions({
  result,
  resultOrigin,
  meal,
  impact,
  addedToMeal,
  mealItemCount,
  onAddToSession,
  onAnalyzeAnother,
}: {
  result: AnalizzaResponse
  resultOrigin: AnalysisOrigin
  meal: MealNutrition
  impact: GlycemicImpact
  addedToMeal: boolean
  mealItemCount: number
  onAddToSession(): void
  onAnalyzeAnother(): void
}) {
  const [saveState, setSaveState] = useState<ActionState>('idle')
  const [shareState, setShareState] = useState<ActionState>('idle')

  useEffect(() => {
    setSaveState('idle')
  }, [result])

  function saveToDiary(): void {
    setSaveState('working')
    try {
      const entry = registraMangiato({
        nome: result.piatto || 'Piatto senza nome',
        fonte: resultOrigin,
        fascia: impact.fascia,
        cg: impact.cg,
        kcal: meal.nutrition.energia_kcal,
        carbo: impact.carbo,
        prot: meal.nutrition.proteine_g,
        grassi: meal.nutrition.grassi_totali_g,
        fibre: meal.nutrition.fibre_g,
        grammi: meal.totalGrams,
      })
      setSaveState(diaryEntryPersisted(entry.id) ? 'success' : 'error')
    } catch {
      setSaveState('error')
    }
  }

  async function shareResult(): Promise<void> {
    setShareState('working')
    const shared = await condividiCard({
      title: result.piatto || 'Piatto senza nome',
      subtitle: 'Riepilogo calcolato da GLICOGIG',
      items: [
        { label: 'Carboidrati', value: `${formatNumber(impact.carbo)} g` },
        { label: 'Carico glicemico', value: `${formatNumber(impact.cg)} · ${impact.fascia}` },
        { label: 'Energia', value: `${formatNumber(meal.nutrition.energia_kcal)} kcal` },
        { label: 'Proteine', value: `${formatNumber(meal.nutrition.proteine_g)} g` },
        { label: 'Grassi', value: `${formatNumber(meal.nutrition.grassi_totali_g)} g` },
      ],
      note: 'Stima informativa basata sul catalogo locale. Controlla ingredienti e quantità.',
    }, { fileName: 'glicogig-piatto.png' })
    setShareState(shared ? 'success' : 'error')
  }

  return (
    <section className="mt-7 rounded-3xl border border-line bg-surface p-4 sm:p-5">
      <p className="section-label">Azioni</p>
      {addedToMeal ? (
        <div className="mt-3 rounded-2xl border border-mint/30 bg-mint-soft p-4" role="status">
          <p className="font-extrabold text-mint"><CheckIcon className="mr-2 inline size-5" />Piatto aggiunto. Vuoi aggiungere un altro piatto?</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <a className="primary-button" href="#meal"><UtensilsIcon className="size-5" /> Apri Pasto ({mealItemCount})</a>
            <button className="secondary-button" type="button" onClick={onAnalyzeAnother}><PlusIcon className="size-5" /> Analizza altro piatto</button>
          </div>
        </div>
      ) : (
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          <button className="primary-button" type="button" onClick={saveToDiary} disabled={saveState === 'working' || saveState === 'success'}>
            {saveState === 'success' ? <CheckIcon className="size-5" /> : <SaveIcon className="size-5" />}
            {saveState === 'working' ? 'Salvataggio…' : saveState === 'success' ? 'Registrato' : 'L’ho mangiato'}
          </button>
          <button className="secondary-button" type="button" onClick={() => void shareResult()} disabled={shareState === 'working'}>
            <ShareIcon className="size-5" /> {shareState === 'working' ? 'Preparazione…' : 'Condividi PNG'}
          </button>
          <button className="secondary-button" type="button" onClick={onAddToSession}><PlusIcon className="size-5" /> Aggiungi al pasto</button>
        </div>
      )}
      <div className="mt-3 text-xs" aria-live="polite">
        {saveState === 'error' && <p className="text-coral">Voce disponibile nella sessione, ma il browser non ne ha confermato la persistenza locale.</p>}
        {shareState === 'success' && <p className="text-mint">Card condivisa o scaricata.</p>}
        {shareState === 'error' && <p className="text-coral">Condivisione annullata o non disponibile.</p>}
      </div>
    </section>
  )
}

function ResultState({
  result,
  resultOrigin,
  portionPreset,
  rawWeightMode,
  addedToMeal,
  mealItemCount,
  onIngredientGramsChange,
  onPortionPresetChange,
  onRawWeightModeChange,
  onAddToSession,
  onAnalyzeAnother,
}: ResultStateProps) {
  if (!result.e_cibo) {
    return (
      <div className="flex min-h-[34rem] flex-col items-center justify-center p-7 text-center">
        <UtensilsIcon className="size-12 text-amber" />
        <h2 className="mt-5 text-3xl font-semibold text-brand">Nessun piatto riconosciuto</h2>
        <p className="mt-3 max-w-sm text-muted">{result.descrizione || 'Prova una foto più vicina e luminosa.'}</p>
      </div>
    )
  }

  const reliability = formatConfidence(result.confidenza)
  const meal = calculateMealNutrition(result.ingredienti)
  const impact = calculateGlycemicImpact(result.ingredienti, result.piatto)
  const convertibleIngredients = result.ingredienti.filter(({ nome }) => fattoreCrudo(nome)).length

  return (
    <div className="p-5 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-[0.18em] text-mint uppercase">Piatto riconosciuto</p>
          <h2 className="mt-2 text-3xl font-semibold text-brand sm:text-4xl">{result.piatto || 'Piatto senza nome'}</h2>
          {result.descrizione && <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">{result.descrizione}</p>}
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          {reliability && <span className="status-badge">Affidabilità {reliability}</span>}
          <span className="status-badge">Da {resultOrigin === 'text' ? 'testo' : 'foto'}</span>
          {rawWeightMode === 'dry'
            ? <span className="status-badge">Peso secco</span>
            : impact.cotto && <span className="status-badge">Peso cotto</span>}
          {impact.pianoIntero && <span className="status-badge border-amber/30 bg-amber-soft text-amber">Override piatto intero</span>}
        </div>
      </div>

      <section className="relative mt-6 overflow-hidden rounded-3xl border border-brand/45 bg-gradient-to-br from-brand-soft via-surface to-amber-soft/40 p-5 shadow-[0_0_42px_rgb(41_182_255_/_0.12)] sm:p-6">
        <div className="pointer-events-none absolute -top-16 -right-14 size-40 rounded-full bg-brand/15 blur-3xl" aria-hidden="true" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] font-extrabold tracking-[0.18em] text-amber uppercase">Controller microinfusore</p>
            <h3 className="mt-1 text-2xl font-extrabold text-ink">Carboidrati da inserire</h3>
            <p className="mt-2 text-sm leading-6 text-muted">Valore calcolato dall’impatto completo, incluso l’eventuale override del piatto intero.</p>
          </div>
          <output className="shrink-0 text-6xl font-black leading-none tracking-[-0.06em] text-brand sm:text-7xl" aria-label={`Carboidrati da inserire: ${formatNumber(impact.carbo)} grammi`}>
            {formatNumber(impact.carbo)}<span className="ml-2 text-2xl font-extrabold tracking-normal text-amber">g</span>
          </output>
        </div>
        <div className={`relative mt-5 rounded-2xl border px-4 py-3 text-xs leading-5 ${meal.unresolved.length ? 'border-coral/35 bg-coral-soft text-coral' : 'border-brand/20 bg-brand-deep/55 text-muted'}`}>
          {meal.unresolved.length ? (
            <p><strong>Stima parziale:</strong> {meal.unresolved.length} {meal.unresolved.length === 1 ? 'ingrediente è escluso' : 'ingredienti sono esclusi'} dal calcolo nutrizionale. Correggi ingredienti e quantità prima di usare il valore.</p>
          ) : (
            <p><strong className="text-brand">Calcolo completo:</strong> tutti gli ingredienti riconosciuti sono inclusi. Controlla comunque ingredienti e grammi prima di confermare sul dispositivo.</p>
          )}
        </div>
      </section>

      <section className="mt-6 grid gap-3 sm:grid-cols-[0.75fr_1.25fr]">
        <div className={`rounded-3xl p-5 ${impactClasses(impact.fascia)}`}>
          <p className="text-xs font-extrabold tracking-[0.16em] uppercase">Carico glicemico</p>
          <div className="mt-2 flex items-end gap-2"><strong className="text-4xl leading-none">{formatNumber(impact.cg)}</strong><span className="text-sm font-extrabold uppercase">{impact.fascia}</span></div>
          <p className="mt-3 text-xs leading-5 opacity-80">{impact.trovati === impact.totali ? 'Tutti gli ingredienti inclusi' : `${impact.trovati} di ${impact.totali} ingredienti inclusi`}</p>
        </div>
        <div className="rounded-3xl border border-line bg-surface p-5">
          <p className="section-label">Incidenza degli ingredienti</p>
          {impact.contributi.length ? (
            <div className="mt-3 space-y-2">
              {impact.contributi.map((item, index) => <div className="flex items-center justify-between gap-4 text-sm" key={`${item.nome}-${index}`}><span className="truncate font-semibold text-ink">{item.nome}</span><strong className="text-brand">+ {formatNumber(item.cg)}</strong></div>)}
            </div>
          ) : <p className="mt-3 text-sm leading-6 text-muted">Nessun ingrediente incide in modo rilevante sul carico.</p>}
        </div>
      </section>

      <NutrientGrid values={meal.nutrition} totalGrams={meal.totalGrams} />

      <section className="mt-7 rounded-3xl border border-line bg-surface p-4 sm:p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="section-label">Porzione</p>
            <div className="mt-2 grid grid-cols-3 gap-2" role="group" aria-label="Preset porzione">
              {([
                [0.7, 'Piccola'],
                [1, 'Media'],
                [1.4, 'Grande'],
              ] as const).map(([preset, label]) => (
                <button className={portionPreset === preset ? 'primary-button' : 'secondary-button'} type="button" key={preset} onClick={() => onPortionPresetChange(preset)} disabled={addedToMeal}>{label}<span className="text-[10px] opacity-75">×{preset}</span></button>
              ))}
            </div>
            <p className="mt-2 text-xs leading-5 text-muted">Ogni preset riparte dalla snapshot originale dell’analisi; una modifica manuale ai grammi deseleziona il preset.</p>
          </div>
          <div>
            <p className="section-label">Base del peso</p>
            {convertibleIngredients ? (
              <>
                <div className="mt-2 grid grid-cols-2 gap-2" role="group" aria-label="Peso cotto o secco">
                  <button className={rawWeightMode === 'cooked' ? 'primary-button' : 'secondary-button'} type="button" onClick={() => onRawWeightModeChange('cooked')} disabled={addedToMeal}>Cotto</button>
                  <button className={rawWeightMode === 'dry' ? 'primary-button' : 'secondary-button'} type="button" onClick={() => onRawWeightModeChange('dry')} disabled={addedToMeal}>Secco</button>
                </div>
                <p className="mt-2 text-xs leading-5 text-muted">Conversione disponibile per {convertibleIngredients} {convertibleIngredients === 1 ? 'ingrediente riconosciuto' : 'ingredienti riconosciuti'} con il relativo fattore cotto/crudo.</p>
              </>
            ) : <p className="mt-2 text-xs leading-5 text-muted">Nessun ingrediente contiene una preparazione cotta convertibile con le regole disponibili.</p>}
          </div>
        </div>
      </section>

      <section className="mt-7">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div><p className="section-label">Ingredienti</p><h3 className="mt-1 text-lg font-extrabold text-brand">Correggi le quantità</h3></div>
          <p className="text-xs text-muted">Le modifiche aggiornano subito tutti i valori</p>
        </div>
        <div className="mt-3 divide-y divide-line overflow-hidden rounded-2xl border border-line">
          {result.ingredienti.map((ingredient, index) => {
            const food = resolveRowFood(ingredient)
            const cookedGrams = food ? effectiveIngredientGrams(food, ingredient.grammi) : ingredient.grammi
            const nutrition = food ? calculateIngredientNutrition(food, cookedGrams) : null
            const rawFactor = fattoreCrudo(ingredient.nome)
            const displayedGrams = rawWeightMode === 'dry'
              ? grammiCrudi(ingredient.nome, cookedGrams) ?? cookedGrams
              : cookedGrams
            return (
              <div className="grid gap-3 bg-surface px-4 py-4 sm:grid-cols-[1fr_auto] sm:items-center" key={`${ingredient.catalogo_id || ingredient.nome}-${index}`}>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-ink">{ingredient.nome}</p>
                  {ingredient.cottura && <p className="mt-1 truncate text-xs text-muted">{ingredient.cottura}</p>}
                  {rawFactor && <p className="mt-1 text-xs text-muted">Fattore cotto/crudo ×{rawFactor}</p>}
                  {food && nutrition ? (
                    <p className="mt-2 text-xs leading-5 text-muted">{food.categoria} · {formatNumber(nutrition.carboidrati_disponibili_g)} g di carboidrati</p>
                  ) : <p className="mt-2 text-xs font-semibold text-coral">Dati insufficienti per includere questo ingrediente</p>}
                </div>
                <label className="flex items-center justify-end gap-2 text-xs font-bold text-muted">
                  <span>{rawWeightMode === 'dry' && rawFactor ? 'Grammi secchi' : 'Grammi'}</span>
                  <input aria-label={`Grammi di ${ingredient.nome}`} className="number-field" inputMode="numeric" max={2000} min={0} step={1} type="number" value={displayedGrams} disabled={addedToMeal} onChange={(event) => onIngredientGramsChange(index, Number(event.target.value))} />
                </label>
              </div>
            )
          })}
        </div>
      </section>

      <details className="mt-5 rounded-2xl border border-line px-4 py-3 text-xs text-muted">
        <summary className="font-bold text-brand">Mostra i valori per 100 g</summary>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
          {TOTAL_NUTRIENTS.map(({ key, label, unit }) => <div className="rounded-xl bg-surface p-2" key={key}><span>{label}</span><strong className="mt-1 block text-brand">{formatNumber(meal.per100[key])} {unit}</strong></div>)}
        </div>
      </details>

      {result.lezione && <p className="mt-5 rounded-2xl bg-mint-soft p-4 text-sm leading-6 text-brand"><strong>Lezione:</strong> {result.lezione}</p>}
      {result.quando_ha_senso && <p className="mt-3 rounded-2xl bg-amber-soft p-4 text-sm leading-6 text-ink"><strong>Quando ha senso:</strong> {result.quando_ha_senso}</p>}

      <ResultActions
        result={result}
        resultOrigin={resultOrigin}
        meal={meal}
        impact={impact}
        addedToMeal={addedToMeal}
        mealItemCount={mealItemCount}
        onAddToSession={onAddToSession}
        onAnalyzeAnother={onAnalyzeAnother}
      />
    </div>
  )
}

export default function ResultPanel({
  status,
  result,
  resultOrigin,
  error,
  hasInput,
  portionPreset,
  rawWeightMode,
  addedToMeal,
  mealItemCount,
  onRetry,
  onIngredientGramsChange,
  onPortionPresetChange,
  onRawWeightModeChange,
  onAddToSession,
  onAnalyzeAnother,
}: ResultPanelProps) {
  return (
    <section className="app-card overflow-hidden rounded-[1.75rem] border border-line bg-paper/95 shadow-card backdrop-blur" aria-live="polite">
      {status === 'analyzing' && <LoadingState />}
      {status === 'error' && <ErrorState message={error} canRetry={hasInput} onRetry={onRetry} />}
      {status === 'success' && result && (
        <ResultState
          result={result}
          resultOrigin={resultOrigin}
          portionPreset={portionPreset}
          rawWeightMode={rawWeightMode}
          addedToMeal={addedToMeal}
          mealItemCount={mealItemCount}
          onIngredientGramsChange={onIngredientGramsChange}
          onPortionPresetChange={onPortionPresetChange}
          onRawWeightModeChange={onRawWeightModeChange}
          onAddToSession={onAddToSession}
          onAnalyzeAnother={onAnalyzeAnother}
        />
      )}
      {(status === 'idle' || status === 'preparing') && <EmptyState />}
    </section>
  )
}
