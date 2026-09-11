import { useEffect, useState } from 'react'
import {
  BarcodeIcon,
  CameraIcon,
  CheckIcon,
  ChefHatIcon,
  LayersIcon,
  SaveIcon,
  SearchIcon,
  ShareIcon,
  TrashIcon,
} from '../components/Icons'
import { formatNumber } from '../domain/nutrition'
import { sourceLabel } from '../domain/meal'
import { condividiCard } from '../services/shareCard'
import { useMealSession } from '../state/mealSession'
import { DIARY_STORAGE_KEY, registraMangiato } from '../storage/diaryStore'

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

type ActionState = 'idle' | 'working' | 'success' | 'error'

export default function MealScreen() {
  const {
    name,
    startedAt,
    entries,
    summary,
    setName,
    removeItem,
    clearMeal,
  } = useMealSession()
  const [saveState, setSaveState] = useState<ActionState>('idle')
  const [shareState, setShareState] = useState<ActionState>('idle')

  useEffect(() => {
    setSaveState('idle')
    setShareState('idle')
  }, [entries, name])

  const canSaveMeal = summary.unresolved === 0
    && summary.kcal !== null
    && summary.protein !== null
    && summary.fat !== null
    && summary.fibre !== null

  function saveMeal(): void {
    if (!entries.length || !name.trim() || !canSaveMeal) return
    setSaveState('working')
    try {
      const entry = registraMangiato({
        nome: name.trim(),
        fonte: 'pasto',
        fascia: summary.band,
        cg: summary.glycemicLoad,
        kcal: summary.kcal,
        carbo: summary.carbs,
        prot: summary.protein,
        grassi: summary.fat,
        fibre: summary.fibre,
        grammi: summary.totalGrams,
      })
      setSaveState(diaryEntryPersisted(entry.id) ? 'success' : 'error')
    } catch {
      setSaveState('error')
    }
  }

  async function shareMeal(): Promise<void> {
    if (!entries.length) return
    setShareState('working')
    const shared = await condividiCard({
      title: name.trim() || 'Il mio pasto',
      subtitle: `${summary.plates} ${summary.plates === 1 ? 'piatto' : 'piatti'} · ${formatNumber(summary.totalGrams)} g`,
      items: [
        { label: 'Energia', value: `${formatNumber(summary.kcal)} kcal` },
        { label: 'Carboidrati', value: `${formatNumber(summary.carbs)} g` },
        { label: 'Carico glicemico', value: `${formatNumber(summary.glycemicLoad)} · ${summary.band}` },
        { label: 'Proteine', value: `${formatNumber(summary.protein)} g` },
        { label: 'Grassi', value: `${formatNumber(summary.fat)} g` },
        { label: 'Fibre', value: `${formatNumber(summary.fibre)} g` },
      ],
      note: 'Totale dei piatti aggiunti esplicitamente alla sessione Pasto.',
    }, { fileName: 'glicogig-pasto.png' })
    setShareState(shared ? 'success' : 'error')
  }

  return (
    <div>
      <section className="mb-6 px-1">
        <p className="screen-kicker">Composizione multipiatto</p>
        <h1 className="screen-title">Costruisci il tuo <span className="text-brand">Pasto.</span></h1>
        <p className="screen-subtitle">Foto, alimenti, etichette e ricette confluiscono nella stessa sessione. Il diario riceve una sola voce aggregata, solo quando scegli “L’ho mangiato”.</p>
      </section>

      <section className="app-card rounded-3xl border border-line bg-paper p-5 shadow-card sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <label className="min-w-0 flex-1 text-xs font-bold text-muted" htmlFor="meal-name">Nome del pasto
            <input id="meal-name" className="field mt-2" value={name} maxLength={60} onChange={(event) => setName(event.target.value)} />
          </label>
          {startedAt && <p className="text-xs text-muted">Iniziato alle {new Date(startedAt).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}</p>}
        </div>

        {entries.length ? (
          <>
            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
              <div className="data-tile"><span>Piatti</span><strong>{summary.plates}</strong></div>
              <div className="data-tile"><span>Energia</span><strong>{formatNumber(summary.kcal)} kcal</strong></div>
              <div className="data-tile"><span>Carboidrati</span><strong>{formatNumber(summary.carbs)} g</strong></div>
              <div className="data-tile"><span>CG totale</span><strong>{formatNumber(summary.glycemicLoad)}</strong></div>
              <div className="data-tile"><span>Fascia</span><strong>{summary.band}</strong></div>
              <div className="data-tile"><span>Peso</span><strong>{formatNumber(summary.totalGrams)} g</strong></div>
            </div>

            <ul className="mt-5 space-y-2">
              {entries.map(({ id, item }) => (
                <li className="rounded-2xl border border-line bg-surface p-4" key={id}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0"><p className="font-extrabold text-ink">{item.name}</p><p className="mt-1 text-xs text-muted">{sourceLabel(item.source)} · {formatNumber(item.grams)} g</p></div>
                    <button className="icon-link shrink-0 text-coral" type="button" onClick={() => removeItem(id)} aria-label={`Rimuovi ${item.name} dal pasto`}><TrashIcon className="size-4" /></button>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs"><span className="status-badge">{formatNumber(item.kcal)} kcal</span><span className="status-badge">{formatNumber(item.carbs)} g carbo</span><span className="status-badge">CG {formatNumber(item.glycemicLoad)}</span><span className="status-badge">{item.band}</span></div>
                </li>
              ))}
            </ul>

            {summary.unresolved > 0 && <p className="mt-4 rounded-2xl border border-amber/25 bg-amber-soft p-4 text-sm text-amber">{summary.unresolved} elementi non risolti non contribuiscono ai nutrienti. I totali n.d. restano tali nella sessione.</p>}
            {!canSaveMeal && <p className="mt-4 rounded-2xl border border-coral/25 bg-coral-soft p-4 text-sm text-coral">Il Diario accetta questo Pasto solo quando tutti i nutrienti sono disponibili e nessun elemento è irrisolto. Puoi comunque correggere, rimuovere o condividere la sessione senza creare dati mancanti.</p>}
            <div className="mt-5 grid gap-2 sm:grid-cols-3">
              <button className="primary-button" type="button" onClick={saveMeal} disabled={saveState === 'working' || saveState === 'success' || !name.trim() || !canSaveMeal}>{saveState === 'success' ? <CheckIcon className="size-5" /> : <SaveIcon className="size-5" />}{saveState === 'working' ? 'Salvataggio…' : saveState === 'success' ? 'Pasto registrato' : 'L’ho mangiato'}</button>
              <button className="secondary-button" type="button" onClick={() => void shareMeal()} disabled={shareState === 'working'}><ShareIcon className="size-5" />{shareState === 'working' ? 'Preparazione…' : 'Condividi'}</button>
              <button className="secondary-button text-coral" type="button" onClick={clearMeal}><TrashIcon className="size-5" />Svuota pasto</button>
            </div>
            <div className="mt-2 text-xs" aria-live="polite">{saveState === 'error' && <p className="text-coral">Persistenza locale non confermata.</p>}{shareState === 'error' && <p className="text-coral">Condivisione annullata o non disponibile.</p>}{shareState === 'success' && <p className="text-mint">Card condivisa o scaricata.</p>}{saveState === 'success' && <a className="font-bold text-brand underline" href="#diary">Apri Progressi</a>}</div>
          </>
        ) : (
          <div className="mt-5 rounded-3xl border border-dashed border-line p-8 text-center"><LayersIcon className="mx-auto size-11 text-brand" /><h2 className="mt-3 text-xl font-extrabold text-ink">Il pasto è vuoto</h2><p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-muted">Aggiungi ogni piatto con la sua azione dedicata. Nulla viene registrato nel diario automaticamente.</p></div>
        )}
      </section>

      <section className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Aggiungi al pasto">
        <a className="rounded-3xl border border-line bg-surface p-4" href="#photo"><CameraIcon className="size-6 text-brand" /><strong className="mt-3 block text-ink">Foto</strong><span className="mt-1 block text-xs text-muted">Analizza un piatto</span></a>
        <a className="rounded-3xl border border-line bg-surface p-4" href="#search"><SearchIcon className="size-6 text-brand" /><strong className="mt-3 block text-ink">Catalogo</strong><span className="mt-1 block text-xs text-muted">Scegli alimento e grammi</span></a>
        <a className="rounded-3xl border border-line bg-surface p-4" href="#barcode"><BarcodeIcon className="size-6 text-amber" /><strong className="mt-3 block text-ink">Etichetta</strong><span className="mt-1 block text-xs text-muted">Cerca il codice a barre</span></a>
        <a className="rounded-3xl border border-line bg-surface p-4" href="#recipes"><ChefHatIcon className="size-6 text-brand" /><strong className="mt-3 block text-ink">Ricette</strong><span className="mt-1 block text-xs text-muted">Aggiungi una o più porzioni</span></a>
      </section>
    </div>
  )
}
