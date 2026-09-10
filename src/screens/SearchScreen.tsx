import { useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react'
import { getExtractedCatalogEntries, resolveFoodByName, searchFoods } from '../catalog/foodCatalog'
import {
  AlertIcon,
  BarcodeIcon,
  CheckIcon,
  SaveIcon,
  ScanIcon,
  SearchIcon,
} from '../components/Icons'
import {
  calculateGlycemicImpact,
  classificaFascia,
  isBevanda,
} from '../domain/impactCalculator'
import { formatNumber } from '../domain/nutrition'
import { calculateIngredientNutrition, effectiveIngredientGrams } from '../domain/nutritionCalculator'
import { cercaProdotto } from '../services/barcodeService'
import { DIARY_STORAGE_KEY, registraMangiato } from '../storage/diaryStore'
import type { FoodCatalogEntry } from '../types/catalog'
import type { ProdottoBarcode } from '../types/barcode'

interface DetectedBarcode {
  rawValue: string
}

interface BarcodeDetectorInstance {
  detect(source: ImageBitmap): Promise<DetectedBarcode[]>
}

interface BarcodeDetectorConstructor {
  new(options?: { formats?: string[] }): BarcodeDetectorInstance
  getSupportedFormats?(): Promise<string[]>
}

type LookupState = 'idle' | 'loading' | 'not-found' | 'error' | 'found'
type SaveState = 'idle' | 'success' | 'error'

function detectorConstructor(): BarcodeDetectorConstructor | undefined {
  return (globalThis as typeof globalThis & { BarcodeDetector?: BarcodeDetectorConstructor }).BarcodeDetector
}

function scale(value: number | null, grams: number): number | null {
  return value === null ? null : (value * grams) / 100
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

function FoodDetail({ food }: { food: FoodCatalogEntry }) {
  const [grams, setGrams] = useState(food.porzione_standard_g)
  const [saveState, setSaveState] = useState<SaveState>('idle')
  const usedGrams = effectiveIngredientGrams(food, grams)
  const nutrition = calculateIngredientNutrition(food, usedGrams)
  const impact = calculateGlycemicImpact([{ nome: food.nome, catalogo_id: food.id, grammi: usedGrams }], food.nome)

  function save(): void {
    try {
      const entry = registraMangiato({
        nome: food.nome,
        nome_en: food.nome_en,
        nome_es: food.nome_es,
        nome_de: food.nome_de,
        nome_fr: food.nome_fr,
        fonte: 'catalogo',
        fascia: impact.fascia,
        cg: impact.cg,
        kcal: nutrition.energia_kcal,
        carbo: impact.carbo,
        prot: nutrition.proteine_g,
        grassi: nutrition.grassi_totali_g,
        fibre: nutrition.fibre_g,
        grammi: usedGrams,
      })
      setSaveState(diaryEntryPersisted(entry.id) ? 'success' : 'error')
    } catch {
      setSaveState('error')
    }
  }

  const values = [
    ['Energia', formatNumber(nutrition.energia_kcal), 'kcal'],
    ['Carbo disponibili', formatNumber(nutrition.carboidrati_disponibili_g), 'g'],
    ['Zuccheri', formatNumber(nutrition.zuccheri_g), 'g'],
    ['Fibre', formatNumber(nutrition.fibre_g), 'g'],
    ['Proteine', formatNumber(nutrition.proteine_g), 'g'],
    ['Grassi', formatNumber(nutrition.grassi_totali_g), 'g'],
  ]

  return (
    <article className="app-card rounded-3xl border border-brand/35 bg-paper p-5 shadow-card sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div><p className="section-label">{food.categoria} · {food.sottocategoria}</p><h2 className="mt-1 text-2xl font-extrabold text-ink">{food.nome}</h2>{food.sinonimi.length > 0 && <p className="mt-1 text-xs text-muted">Anche: {food.sinonimi.join(', ')}</p>}</div>
        <span className={`status-badge ${impact.fascia === 'alto' ? 'border-coral/30 bg-coral-soft text-coral' : ''}`}>CG {formatNumber(impact.cg)} · {impact.fascia}</span>
      </div>
      <label className="mt-5 block text-xs font-bold text-muted" htmlFor={`food-grams-${food.id}`}>Quantità in grammi</label>
      <input id={`food-grams-${food.id}`} className="field mt-2 max-w-40" type="number" inputMode="decimal" min={1} max={2000} value={grams} onChange={(event) => { setGrams(Math.max(1, Math.min(2000, Number(event.target.value) || 1))); setSaveState('idle') }} />
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {values.map(([label, value, unit]) => <div className="data-tile" key={label}><span>{label}</span><strong>{value} {unit}</strong></div>)}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
        <p className="rounded-xl bg-surface p-3 text-muted">IG medio <strong className="block text-brand">{formatNumber(food.ig_medio)}</strong></p>
        <p className="rounded-xl bg-surface p-3 text-muted">IG min–max <strong className="block text-brand">{formatNumber(food.ig_min)}–{formatNumber(food.ig_max)}</strong></p>
        <p className="rounded-xl bg-surface p-3 text-muted">Porzione <strong className="block text-brand">{formatNumber(food.porzione_standard_g)} g</strong></p>
        <p className="rounded-xl bg-surface p-3 text-muted">Affidabilità IG <strong className="block text-brand">{food.ig_affidabilita || 'n.d.'}</strong></p>
      </div>
      <button className="primary-button mt-5" type="button" onClick={save} disabled={saveState === 'success'}>{saveState === 'success' ? <CheckIcon className="size-5" /> : <SaveIcon className="size-5" />}{saveState === 'success' ? 'Salvato nel diario' : 'Salva nel diario'}</button>
      {saveState === 'error' && <p className="mt-2 text-xs text-coral">Voce disponibile nella sessione, ma persistenza locale non confermata.</p>}
    </article>
  )
}

function BarcodeProductCard({ product }: { product: ProdottoBarcode }) {
  const [grams, setGrams] = useState(product.porzioneG && product.porzioneG > 0 ? product.porzioneG : 100)
  const [saveState, setSaveState] = useState<SaveState>('idle')
  const resolution = resolveFoodByName(product.nome)
  const localFood = resolution.kind === 'resolved' ? resolution.food : null
  const portionCarbs = scale(product.carbo100, grams)
  const localIndex = localFood?.ig_medio ?? null
  const barcodeImpact = localFood && localIndex !== null && portionCarbs !== null && portionCarbs >= 0
    ? (() => {
        const cg = Math.round(((localIndex * portionCarbs) / 100) * 10) / 10
        const { fascia } = classificaFascia({
          cg,
          carbo: portionCarbs,
          ig: localIndex,
          fibre: scale(product.fibre100, grams),
          proteine: scale(product.proteine100, grams),
          grassi: scale(product.grassi100, grams),
          fibre100: product.fibre100,
          proteine100: product.proteine100,
          grassi100: product.grassi100,
          zuccheri100: product.zuccheri100,
          carbo100: product.carbo100,
          liquido: isBevanda(product.nome, localFood.categoria),
        })
        return { carbo: portionCarbs, cg, fascia }
      })()
    : null

  const nutrientRows = [
    ['Carboidrati', product.carbo100],
    ['Zuccheri', product.zuccheri100],
    ['Fibre', product.fibre100],
    ['Proteine', product.proteine100],
    ['Grassi', product.grassi100],
  ] as const

  function updateGrams(value: string): void {
    setGrams(Math.max(1, Math.min(2000, Number(value) || 1)))
    setSaveState('idle')
  }

  function save(): void {
    if (!localFood || !barcodeImpact) return
    try {
      const entry = registraMangiato({
        nome: product.nome,
        nome_en: localFood.nome_en,
        nome_es: localFood.nome_es,
        nome_de: localFood.nome_de,
        nome_fr: localFood.nome_fr,
        fonte: 'barcode',
        fascia: barcodeImpact.fascia,
        cg: barcodeImpact.cg,
        carbo: barcodeImpact.carbo,
        prot: scale(product.proteine100, grams),
        grassi: scale(product.grassi100, grams),
        fibre: scale(product.fibre100, grams),
        grammi: grams,
      })
      setSaveState(diaryEntryPersisted(entry.id) ? 'success' : 'error')
    } catch {
      setSaveState('error')
    }
  }

  return (
    <article className="mt-4 rounded-3xl border border-brand/35 bg-brand-soft/30 p-5">
      <p className="section-label">Prodotto normalizzato · {product.codice}</p>
      <h3 className="mt-1 text-xl font-extrabold text-ink">{product.nome}</h3>
      {product.marca && <p className="mt-1 text-sm text-muted">{product.marca}</p>}
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
        {nutrientRows.map(([label, value]) => <div className="data-tile" key={label}><span>{label} / 100 g</span><strong>{formatNumber(value)} g</strong></div>)}
      </div>
      <div className="mt-4 flex flex-wrap items-end gap-3">
        <label className="text-xs font-bold text-muted">Quantità
          <input className="field mt-1 block w-32" type="number" inputMode="decimal" min={1} max={2000} value={grams} onChange={(event) => updateGrams(event.target.value)} />
        </label>
        <span className="status-badge">Porzione dichiarata: {product.porzioneG === null ? 'n.d.' : `${formatNumber(product.porzioneG)} g`}</span>
        {product.carboCorretto && <span className="status-badge border-amber/30 bg-amber-soft text-amber">Correzione prodotto secco verificata</span>}
      </div>
      {localFood && barcodeImpact ? (
        <div className="mt-4 rounded-2xl border border-mint/25 bg-mint-soft p-4 text-sm text-mint">
          <p><strong>Match locale unico:</strong> {localFood.nome}. CG {formatNumber(barcodeImpact.cg)} · {barcodeImpact.fascia}, calcolati con l’IG locale e i carboidrati dichiarati del prodotto.</p>
          <button className="primary-button mt-3" type="button" onClick={save} disabled={saveState === 'success'}>{saveState === 'success' ? <CheckIcon className="size-5" /> : <SaveIcon className="size-5" />}{saveState === 'success' ? 'Salvato nel diario' : 'Salva nel diario'}</button>
        </div>
      ) : (
        <p className="mt-4 rounded-2xl border border-amber/25 bg-amber-soft p-4 text-sm leading-6 text-amber"><AlertIcon className="mr-2 inline size-4" />{localFood ? 'Il match locale non dispone dell’IG o il prodotto non dichiara carboidrati validi. Il carico glicemico non viene inventato e il prodotto non può essere salvato.' : 'Il nome non risolve univocamente nel catalogo locale. Il prodotto non può essere salvato: GLICOGIG non inventa IG o carico glicemico.'}</p>
      )}
      {saveState === 'error' && <p className="mt-2 text-xs text-coral">Voce disponibile nella sessione, ma persistenza locale non confermata.</p>}
    </article>
  )
}

export default function SearchScreen() {
  const allFoods = useMemo(() => getExtractedCatalogEntries().filter((food) => food.nascondi !== true), [])
  const categories = useMemo(() => Array.from(new Set(allFoods.map(({ categoria }) => categoria))).sort(), [allFoods])
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [selected, setSelected] = useState<FoodCatalogEntry | null>(null)
  const [barcode, setBarcode] = useState('')
  const [lookupState, setLookupState] = useState<LookupState>('idle')
  const [lookupMessage, setLookupMessage] = useState('')
  const [product, setProduct] = useState<ProdottoBarcode | null>(null)
  const [scanState, setScanState] = useState('')
  const requestController = useRef<AbortController | null>(null)
  const Detector = detectorConstructor()

  useEffect(() => () => requestController.current?.abort(), [])

  const results = useMemo(() => {
    const source = query.trim().length >= 3 ? searchFoods(query) : allFoods
    return source.filter((food) => !category || food.categoria === category).slice(0, 40)
  }, [allFoods, category, query])

  async function lookup(value: string): Promise<void> {
    requestController.current?.abort()
    const controller = new AbortController()
    requestController.current = controller
    setLookupState('loading')
    setLookupMessage('')
    setProduct(null)
    try {
      const response = await cercaProdotto(value, { signal: controller.signal })
      if (response.status === 'not_found') {
        setLookupState('not-found')
        setLookupMessage('Prodotto non trovato.')
      } else {
        setProduct(response.product)
        setLookupState('found')
      }
    } catch (error) {
      if (controller.signal.aborted) return
      setLookupState('error')
      setLookupMessage(error instanceof Error ? error.message : 'Ricerca barcode non riuscita.')
    } finally {
      if (requestController.current === controller) requestController.current = null
    }
  }

  async function scanImage(event: ChangeEvent<HTMLInputElement>): Promise<void> {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file || !Detector) return
    setScanState('Lettura immagine in corso…')
    let bitmap: ImageBitmap | null = null
    try {
      const supported = Detector.getSupportedFormats ? await Detector.getSupportedFormats() : []
      const desired = ['ean_13', 'ean_8', 'upc_a', 'upc_e']
      const formats = desired.filter((format) => !supported.length || supported.includes(format))
      const detector = new Detector(formats.length ? { formats } : undefined)
      bitmap = await createImageBitmap(file)
      const detections = await detector.detect(bitmap)
      const detected = detections.map(({ rawValue }) => rawValue).find((value) => /^\d{6,14}$/.test(value.trim()))
      if (!detected) {
        setScanState('Nessun barcode valido rilevato. Inseriscilo manualmente.')
        return
      }
      setBarcode(detected)
      setScanState(`Codice ${detected} rilevato.`)
      await lookup(detected)
    } catch {
      setScanState('Lettura non disponibile per questa immagine. Usa il codice manuale.')
    } finally {
      bitmap?.close()
    }
  }

  return (
    <div>
      <section className="mb-6 px-1"><p className="screen-kicker">Catalogo verificato</p><h1 className="screen-title">Cerca ciò che <span className="text-brand">stai mangiando.</span></h1><p className="screen-subtitle">Gli alimenti nascosti restano esclusi dalla ricerca. I valori mancanti restano n.d.</p></section>

      <div className="grid items-start gap-5 lg:grid-cols-[1fr_0.9fr]">
        <section>
          <div className="app-card rounded-3xl border border-line bg-paper p-4 shadow-card sm:p-5">
            <label className="section-label" htmlFor="food-search">Nome o sinonimo</label>
            <div className="relative mt-2"><SearchIcon className="pointer-events-none absolute top-3.5 left-3.5 size-5 text-muted" /><input id="food-search" className="field pl-11" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Es. lenticchie, pane, mela…" /></div>
            <label className="mt-3 block text-xs font-bold text-muted" htmlFor="food-category">Categoria</label>
            <select id="food-category" className="field mt-2" value={category} onChange={(event) => setCategory(event.target.value)}><option value="">Tutte le categorie</option>{categories.map((value) => <option value={value} key={value}>{value}</option>)}</select>
          </div>
          <div className="mt-3 space-y-2">
            {results.map((food) => <button className={`w-full rounded-2xl border p-4 text-left transition ${selected?.id === food.id ? 'border-brand bg-brand-soft/55' : 'border-line bg-surface hover:border-brand/45'}`} type="button" key={food.id} onClick={() => setSelected(food)}><span className="block font-bold text-ink">{food.nome}</span><span className="mt-1 block text-xs text-muted">{food.categoria} · porzione {formatNumber(food.porzione_standard_g)} g · IG {formatNumber(food.ig_medio)}</span></button>)}
            {!results.length && <p className="empty-card">Nessun alimento visibile corrisponde ai filtri.</p>}
          </div>
        </section>
        <div className="space-y-5">
          {selected ? <FoodDetail food={selected} key={selected.id} /> : <div className="empty-card">Seleziona un alimento per vedere valori reali, quantità e impatto locale.</div>}

          <section className="app-card rounded-3xl border border-line bg-paper p-5 shadow-card">
            <div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-2xl bg-amber-soft text-amber"><BarcodeIcon className="size-5" /></span><div><p className="section-label">Barcode</p><h2 className="text-xl font-extrabold text-ink">Inserimento manuale</h2></div></div>
            <form className="mt-4 flex gap-2" onSubmit={(event) => { event.preventDefault(); void lookup(barcode) }}>
              <input className="field min-w-0 flex-1" value={barcode} onChange={(event) => setBarcode(event.target.value)} inputMode="numeric" pattern="[0-9]{6,14}" placeholder="6–14 cifre" aria-label="Codice a barre" />
              <button className="primary-button shrink-0" type="submit" disabled={lookupState === 'loading'}>{lookupState === 'loading' ? 'Cerco…' : 'Cerca'}</button>
            </form>
            {Detector ? (
              <label className="secondary-button mt-3 w-full"><ScanIcon className="size-5" /> Leggi da una foto locale<input className="sr-only" type="file" accept="image/*" capture="environment" onChange={(event) => void scanImage(event)} /></label>
            ) : <p className="mt-3 text-xs leading-5 text-muted">Lo scanner non è supportato dal browser: l’inserimento manuale resta disponibile.</p>}
            {scanState && <p className="mt-2 text-xs text-muted">{scanState}</p>}
            {(lookupState === 'error' || lookupState === 'not-found') && <p className="mt-3 text-sm text-coral">{lookupMessage}</p>}
            {product && <BarcodeProductCard product={product} key={`${product.codice}-${product.nome}`} />}
            <p className="mt-4 text-[11px] leading-5 text-muted">La ricerca passa solo dal proxy same-origin. Il browser non contatta direttamente Open Food Facts.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
