import { BarcodeFormat, BrowserMultiFormatReader, type IScannerControls } from '@zxing/browser'
import { useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react'
import {
  getExtractedCatalogEntries,
  getFoodByCatalogId,
  resolveFoodByName,
  searchFoods,
} from '../catalog/foodCatalog'
import {
  AlertIcon,
  BarcodeIcon,
  CameraIcon,
  CheckIcon,
  ChevronRightIcon,
  CloseIcon,
  ImageIcon,
  LayersIcon,
  SaveIcon,
  ScanIcon,
  SearchIcon,
  ShareIcon,
} from '../components/Icons'
import { BARCODE_PATTERN } from '../domain/barcodeProduct'
import { mealItemFromBarcode, mealItemFromFood } from '../domain/meal'
import { formatNumber } from '../domain/nutrition'
import { effectiveIngredientGrams } from '../domain/nutritionCalculator'
import { cercaProdotto } from '../services/barcodeService'
import { condividiCard, type ShareCardData } from '../services/shareCard'
import { useMealSession } from '../state/mealSession'
import { DIARY_STORAGE_KEY, registraMangiato } from '../storage/diaryStore'
import type { ProdottoBarcode } from '../types/barcode'
import type { FoodCatalogEntry } from '../types/catalog'

type LookupState = 'idle' | 'loading' | 'not-found' | 'error' | 'found'
type SaveState = 'idle' | 'success' | 'error'
type ShareState = 'idle' | 'sharing' | 'success' | 'error'
type FoodShareBand = 'alto' | 'medio' | 'basso' | 'trascurabile'

function cameraErrorMessage(error: unknown): string {
  const name = error instanceof Error ? error.name : ''
  if (name === 'NotAllowedError' || name === 'SecurityError') {
    return 'Permesso fotocamera negato. Abilitalo nelle impostazioni del browser oppure usa una foto o il codice manuale.'
  }
  if (name === 'NotFoundError' || name === 'DevicesNotFoundError') {
    return 'Nessuna fotocamera disponibile. Usa una foto o inserisci il codice manualmente.'
  }
  if (name === 'NotReadableError' || name === 'TrackStartError') {
    return 'La fotocamera è occupata o non può essere avviata. Chiudi le altre app che la usano e riprova.'
  }
  if (name === 'OverconstrainedError') {
    return 'La fotocamera non supporta i parametri richiesti. Usa una foto o il codice manuale.'
  }
  return 'Impossibile avviare la fotocamera. Usa una foto o inserisci il codice manualmente.'
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

function resolvedFoodShareBand(value: string): FoodShareBand | null {
  return value === 'alto' || value === 'medio' || value === 'basso' || value === 'trascurabile'
    ? value
    : null
}

function foodShareCard(food: FoodCatalogEntry): ShareCardData | null {
  const title = food.nome.trim()
  const band = resolvedFoodShareBand(food.fascia_impatto)
  const energy = food.energia_kcal
  const fibre = food.fibre_g
  const protein = food.proteine_g

  if (
    !title
    || !band
    || energy === null
    || fibre === null
    || !Number.isFinite(energy)
    || !Number.isFinite(fibre)
    || !Number.isFinite(protein)
    || energy < 0
    || fibre < 0
    || protein < 0
  ) return null

  return {
    title,
    subtitle: [food.categoria, food.sottocategoria].filter(Boolean).join(' · '),
    items: [
      { label: 'Fascia impatto', value: band },
      { label: 'Energia', value: `${energy} kcal / 100 g` },
      { label: 'Fibre', value: `${fibre} g / 100 g` },
      { label: 'Proteine', value: `${protein} g / 100 g` },
    ],
    note: 'Valori e classificazione del catalogo locale verificato.',
  }
}

function FoodDetail({ food }: { food: FoodCatalogEntry }) {
  const { addItem } = useMealSession()
  const [grams, setGrams] = useState(food.porzione_standard_g)
  const [mealState, setMealState] = useState<'idle' | 'success'>('idle')
  const [saveState, setSaveState] = useState<SaveState>('idle')
  const [shareState, setShareState] = useState<ShareState>('idle')
  const usedGrams = effectiveIngredientGrams(food, grams)
  const item = mealItemFromFood(food, usedGrams)
  const shareCard = foodShareCard(food)

  function updateGrams(value: string): void {
    setGrams(Math.max(1, Math.min(2000, Number(value) || 1)))
    setMealState('idle')
    setSaveState('idle')
  }

  function addToMeal(): void {
    addItem(item)
    setMealState('success')
  }

  function save(): void {
    try {
      const entry = registraMangiato({
        nome: item.name,
        nome_en: item.name_en,
        nome_es: item.name_es,
        nome_de: item.name_de,
        nome_fr: item.name_fr,
        fonte: 'catalogo',
        fascia: item.band,
        cg: item.glycemicLoad,
        kcal: item.kcal,
        carbo: item.carbs,
        prot: item.protein,
        grassi: item.fat,
        fibre: item.fibre,
        grammi: item.grams,
      })
      setSaveState(diaryEntryPersisted(entry.id) ? 'success' : 'error')
    } catch {
      setSaveState('error')
    }
  }

  async function share(): Promise<void> {
    if (!shareCard || shareState === 'sharing') return
    setShareState('sharing')
    setShareState(await condividiCard(shareCard) ? 'success' : 'error')
  }

  const values = [
    ['Energia', item.kcal, 'kcal'],
    ['Carbo disponibili', item.carbs, 'g'],
    ['Fibre', item.fibre, 'g'],
    ['Proteine', item.protein, 'g'],
    ['Grassi', item.fat, 'g'],
  ] as const

  return (
    <article className="app-card rounded-3xl border border-brand/35 bg-paper p-5 shadow-card sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="section-label">{food.categoria} · {food.sottocategoria}</p><h1 className="mt-1 text-2xl font-extrabold text-ink">{food.nome}</h1>{food.sinonimi.length > 0 && <p className="mt-1 text-xs text-muted">Anche: {food.sinonimi.join(', ')}</p>}</div><span className={`status-badge ${item.band === 'alto' ? 'border-coral/30 bg-coral-soft text-coral' : ''}`}>CG {formatNumber(item.glycemicLoad)} · {item.band}</span></div>
      <label className="mt-5 block text-xs font-bold text-muted" htmlFor={`food-grams-${food.id}`}>Quantità in grammi</label><input id={`food-grams-${food.id}`} className="field mt-2 max-w-40" type="number" inputMode="decimal" min={1} max={2000} value={grams} onChange={(event) => updateGrams(event.target.value)} />
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">{values.map(([label, value, unit]) => <div className="data-tile" key={label}><span>{label}</span><strong>{formatNumber(value)} {unit}</strong></div>)}</div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4"><p className="rounded-xl bg-surface p-3 text-muted">IG medio <strong className="block text-brand">{formatNumber(food.ig_medio)}</strong></p><p className="rounded-xl bg-surface p-3 text-muted">IG min–max <strong className="block text-brand">{formatNumber(food.ig_min)}–{formatNumber(food.ig_max)}</strong></p><p className="rounded-xl bg-surface p-3 text-muted">Porzione <strong className="block text-brand">{formatNumber(food.porzione_standard_g)} g</strong></p><p className="rounded-xl bg-surface p-3 text-muted">Affidabilità IG <strong className="block text-brand">{food.ig_affidabilita || 'n.d.'}</strong></p></div>
      <div className="mt-5 grid gap-2 sm:grid-cols-2"><button className="primary-button" type="button" onClick={addToMeal} disabled={mealState === 'success'}>{mealState === 'success' ? <CheckIcon className="size-5" /> : <LayersIcon className="size-5" />}{mealState === 'success' ? 'Aggiunto al pasto' : 'Aggiungi al pasto'}</button><button className="secondary-button" type="button" onClick={save} disabled={saveState === 'success'}>{saveState === 'success' ? <CheckIcon className="size-5" /> : <SaveIcon className="size-5" />}{saveState === 'success' ? 'Registrato' : 'L’ho mangiato'}</button></div>
      {shareCard && <button className="secondary-button mt-2 w-full" type="button" onClick={() => void share()} disabled={shareState === 'sharing'} aria-busy={shareState === 'sharing'}><ShareIcon className="size-5" />Condividi questa scelta</button>}
      <div className="mt-2 text-xs" aria-live="polite">{saveState === 'error' && <p className="text-coral">Persistenza locale non confermata.</p>}{shareState === 'error' && <p className="text-coral">Condivisione non completata.</p>}{shareState === 'success' && <p className="text-mint">Card condivisa o salvata sul dispositivo.</p>}{mealState === 'success' && <a className="font-bold text-brand underline" href="#meal">Apri Pasto</a>}</div>
    </article>
  )
}

function BarcodeProductCard({ product }: { product: ProdottoBarcode }) {
  const { addItem } = useMealSession()
  const [grams, setGrams] = useState(product.porzioneG && product.porzioneG > 0 ? product.porzioneG : 100)
  const [mealState, setMealState] = useState<'idle' | 'success'>('idle')
  const [saveState, setSaveState] = useState<SaveState>('idle')
  const resolution = resolveFoodByName(product.nome)
  const localFood = resolution.kind === 'resolved' ? resolution.food : null
  const item = localFood ? mealItemFromBarcode(product, localFood, grams) : null
  const nutrientRows = [
    ['Carboidrati', product.carbo100],
    ['Zuccheri', product.zuccheri100],
    ['Fibre', product.fibre100],
    ['Proteine', product.proteine100],
    ['Grassi', product.grassi100],
  ] as const

  function updateGrams(value: string): void {
    setGrams(Math.max(1, Math.min(2000, Number(value) || 1)))
    setMealState('idle')
    setSaveState('idle')
  }

  function addToMeal(): void {
    if (!item) return
    addItem(item)
    setMealState('success')
  }

  function save(): void {
    if (!item) return
    try {
      const entry = registraMangiato({
        nome: item.name,
        nome_en: item.name_en,
        nome_es: item.name_es,
        nome_de: item.name_de,
        nome_fr: item.name_fr,
        fonte: 'barcode',
        fascia: item.band,
        cg: item.glycemicLoad,
        kcal: item.kcal,
        carbo: item.carbs,
        prot: item.protein,
        grassi: item.fat,
        fibre: item.fibre,
        grammi: item.grams,
      })
      setSaveState(diaryEntryPersisted(entry.id) ? 'success' : 'error')
    } catch {
      setSaveState('error')
    }
  }

  return (
    <article className="mt-5 rounded-3xl border border-brand/35 bg-brand-soft/30 p-5">
      <p className="section-label">Prodotto normalizzato · {product.codice}</p><h2 className="mt-1 text-xl font-extrabold text-ink">{product.nome}</h2>{product.marca && <p className="mt-1 text-sm text-muted">{product.marca}</p>}
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">{nutrientRows.map(([label, value]) => <div className="data-tile" key={label}><span>{label} / 100 g</span><strong>{formatNumber(value)} g</strong></div>)}</div>
      <div className="mt-4 flex flex-wrap items-end gap-3"><label className="text-xs font-bold text-muted">Quantità<input className="field mt-1 block w-32" type="number" inputMode="decimal" min={1} max={2000} value={grams} onChange={(event) => updateGrams(event.target.value)} /></label><span className="status-badge">Porzione dichiarata: {product.porzioneG === null ? 'n.d.' : `${formatNumber(product.porzioneG)} g`}</span>{product.carboCorretto && <span className="status-badge border-amber/30 bg-amber-soft text-amber">Correzione prodotto secco verificata</span>}</div>
      {item && localFood ? <div className="mt-4 rounded-2xl border border-mint/25 bg-mint-soft p-4 text-sm text-mint"><p><strong>Match locale unico:</strong> {localFood.nome}. CG {formatNumber(item.glycemicLoad)} · {item.band}, calcolati con l’IG locale e i carboidrati dichiarati.</p><div className="mt-3 grid gap-2 sm:grid-cols-2"><button className="primary-button" type="button" onClick={addToMeal} disabled={mealState === 'success'}>{mealState === 'success' ? <CheckIcon className="size-5" /> : <LayersIcon className="size-5" />}{mealState === 'success' ? 'Aggiunto al pasto' : 'Aggiungi al pasto'}</button><button className="secondary-button" type="button" onClick={save} disabled={saveState === 'success'}>{saveState === 'success' ? <CheckIcon className="size-5" /> : <SaveIcon className="size-5" />}{saveState === 'success' ? 'Registrato' : 'L’ho mangiato'}</button></div></div> : <p className="mt-4 rounded-2xl border border-amber/25 bg-amber-soft p-4 text-sm leading-6 text-amber"><AlertIcon className="mr-2 inline size-4" />{localFood ? 'Il match locale non dispone dell’IG o il prodotto non dichiara carboidrati validi. IG e CG non vengono inventati.' : 'Il nome non risolve univocamente nel catalogo locale. IG e CG non vengono inventati e il prodotto non può essere aggiunto.'}</p>}
      <div className="mt-2 text-xs">{saveState === 'error' && <p className="text-coral">Persistenza locale non confermata.</p>}{mealState === 'success' && <a className="font-bold text-brand underline" href="#meal">Apri Pasto</a>}</div>
    </article>
  )
}

function BarcodePanel() {
  const [barcode, setBarcode] = useState('')
  const [lookupState, setLookupState] = useState<LookupState>('idle')
  const [lookupMessage, setLookupMessage] = useState('')
  const [product, setProduct] = useState<ProdottoBarcode | null>(null)
  const [scanState, setScanState] = useState('')
  const [cameraActive, setCameraActive] = useState(false)
  const requestController = useRef<AbortController | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const scannerControls = useRef<IScannerControls | null>(null)
  const scanSession = useRef(0)
  const readerRef = useRef<BrowserMultiFormatReader | null>(null)

  function getReader(): BrowserMultiFormatReader {
    if (readerRef.current) return readerRef.current
    const reader = new BrowserMultiFormatReader()
    reader.possibleFormats = [
      BarcodeFormat.EAN_13,
      BarcodeFormat.EAN_8,
      BarcodeFormat.UPC_A,
      BarcodeFormat.UPC_E,
    ]
    readerRef.current = reader
    return reader
  }

  function releaseCamera(): void {
    scanSession.current += 1
    const video = videoRef.current
    const stream = video?.srcObject
    scannerControls.current?.stop()
    scannerControls.current = null
    if (stream instanceof MediaStream) {
      stream.getTracks().forEach((track) => track.stop())
    }
    if (video) {
      video.pause()
      video.srcObject = null
    }
  }

  function stopCamera(message = ''): void {
    releaseCamera()
    setCameraActive(false)
    if (message) setScanState(message)
  }

  useEffect(() => {
    const interruptCamera = () => {
      releaseCamera()
      setCameraActive(false)
    }
    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') interruptCamera()
    }

    window.addEventListener('pagehide', interruptCamera)
    document.addEventListener('visibilitychange', handleVisibility)
    return () => {
      window.removeEventListener('pagehide', interruptCamera)
      document.removeEventListener('visibilitychange', handleVisibility)
      requestController.current?.abort()
      releaseCamera()
    }
  }, [])

  function sanitize(value: string): void {
    setBarcode(value.replace(/\D/g, '').slice(0, 14))
    setLookupState('idle')
    setLookupMessage('')
    setProduct(null)
  }

  async function lookup(value: string): Promise<void> {
    stopCamera()
    const code = value.replace(/\D/g, '').slice(0, 14)
    setBarcode(code)
    if (!BARCODE_PATTERN.test(code)) {
      setLookupState('error')
      setLookupMessage('Inserisci un codice composto da 6–14 cifre.')
      setProduct(null)
      return
    }
    requestController.current?.abort()
    const controller = new AbortController()
    requestController.current = controller
    let timedOut = false
    const timeout = window.setTimeout(() => {
      timedOut = true
      controller.abort()
    }, 9_000)
    setLookupState('loading')
    setLookupMessage('')
    setProduct(null)
    try {
      const response = await cercaProdotto(code, { signal: controller.signal })
      if (response.status === 'not_found') {
        setLookupState('not-found')
        setLookupMessage('Prodotto non trovato.')
      } else {
        setProduct(response.product)
        setLookupState('found')
      }
    } catch (error) {
      if (controller.signal.aborted && !timedOut) return
      setLookupState('error')
      setLookupMessage(timedOut ? 'La ricerca ha superato 9 secondi. Riprova.' : error instanceof Error ? error.message : 'Ricerca barcode non riuscita.')
    } finally {
      window.clearTimeout(timeout)
      if (requestController.current === controller) requestController.current = null
    }
  }

  async function startCamera(): Promise<void> {
    stopCamera()
    if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) {
      setScanState('La fotocamera live richiede HTTPS (oppure localhost) e un browser compatibile. Puoi usare una foto o il codice manuale.')
      return
    }

    const video = videoRef.current
    if (!video) {
      setScanState('Anteprima fotocamera non disponibile. Usa una foto o il codice manuale.')
      return
    }

    const session = scanSession.current
    setCameraActive(true)
    setScanState('Avvio fotocamera…')
    setLookupState('idle')
    setLookupMessage('')
    setProduct(null)

    try {
      const controls = await getReader().decodeFromConstraints(
        {
          audio: false,
          video: {
            facingMode: { ideal: 'environment' },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        },
        video,
        (result, _error, frameControls) => {
          if (session !== scanSession.current || !result) return
          const detected = result.getText().trim()
          if (!BARCODE_PATTERN.test(detected)) return
          scannerControls.current = frameControls
          releaseCamera()
          setCameraActive(false)
          setScanState(`Codice ${detected} rilevato. Ricerca in corso…`)
          void lookup(detected)
        },
      )
      if (session !== scanSession.current) {
        controls.stop()
        return
      }
      scannerControls.current = controls
      setScanState('Inquadra il codice a barre dentro l’area centrale.')
    } catch (error) {
      if (session !== scanSession.current) return
      releaseCamera()
      setCameraActive(false)
      setScanState(cameraErrorMessage(error))
    }
  }

  async function scanImage(event: ChangeEvent<HTMLInputElement>): Promise<void> {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    stopCamera()
    const session = scanSession.current
    const imageUrl = URL.createObjectURL(file)
    setScanState('Lettura immagine in corso…')
    setLookupState('idle')
    setLookupMessage('')
    setProduct(null)
    try {
      const result = await getReader().decodeFromImageUrl(imageUrl)
      if (session !== scanSession.current) return
      const detected = result.getText().trim()
      if (!BARCODE_PATTERN.test(detected)) {
        setScanState('Nessun barcode EAN/UPC valido rilevato. Inseriscilo manualmente.')
        return
      }
      setScanState(`Codice ${detected} rilevato. Ricerca in corso…`)
      await lookup(detected)
    } catch {
      if (session === scanSession.current) {
        setScanState('Nessun barcode EAN/UPC leggibile nella foto. Usa un’altra immagine o il codice manuale.')
      }
    } finally {
      URL.revokeObjectURL(imageUrl)
    }
  }

  return (
    <section className="app-card rounded-3xl border border-line bg-paper p-5 shadow-card sm:p-6">
      <div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-2xl bg-amber-soft text-amber"><BarcodeIcon className="size-5" /></span><div><p className="section-label">Etichetta</p><h1 className="text-2xl font-extrabold text-ink">Codice a barre</h1></div></div>
      <p className="mt-3 text-sm leading-6 text-muted">Open Food Facts fornisce nome e macro dichiarati. GLICOGIG calcola l’impatto solo se il nome risolve univocamente nel catalogo locale.</p>
      <form className="mt-4 flex gap-2" onSubmit={(event) => { event.preventDefault(); void lookup(barcode) }}><input className="field min-w-0 flex-1" value={barcode} onChange={(event) => sanitize(event.target.value)} inputMode="numeric" pattern="[0-9]{6,14}" maxLength={14} placeholder="6–14 cifre" aria-label="Codice a barre" /><button className="primary-button shrink-0" type="submit" disabled={lookupState === 'loading'}>{lookupState === 'loading' ? 'Cerco…' : 'Cerca'}</button></form>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {cameraActive ? <button className="secondary-button w-full" type="button" onClick={() => stopCamera('Fotocamera chiusa. Puoi inserire il codice manualmente.')}><CloseIcon className="size-5" /> Chiudi fotocamera</button> : <button className="secondary-button w-full" type="button" onClick={() => void startCamera()}><CameraIcon className="size-5" /> Scansiona in diretta</button>}
        <label className="secondary-button w-full"><ImageIcon className="size-5" /> Leggi da una foto<input className="sr-only" type="file" accept="image/*" capture="environment" onChange={(event) => void scanImage(event)} /></label>
      </div>
      <div className={`relative mt-3 overflow-hidden rounded-2xl bg-black ${cameraActive ? '' : 'hidden'}`} aria-hidden={!cameraActive}>
        <video ref={videoRef} className="aspect-[4/3] w-full object-cover" autoPlay muted playsInline />
        <div className="pointer-events-none absolute inset-0 grid place-items-center"><div className="flex h-28 w-[78%] items-center justify-center rounded-2xl border-2 border-white/80 bg-black/10 text-white shadow-lg"><ScanIcon className="size-8" /></div></div>
      </div>
      {scanState && <p className="mt-2 text-xs leading-5 text-muted" role="status" aria-live="polite">{scanState}</p>}{(lookupState === 'error' || lookupState === 'not-found') && <p className="mt-3 text-sm text-coral">{lookupMessage}</p>}{product && <BarcodeProductCard product={product} key={`${product.codice}-${product.nome}`} />}
      <p className="mt-4 text-[11px] leading-5 text-muted">La fotocamera live richiede HTTPS o localhost. Immagini e video restano nel browser; solo il codice rilevato passa al proxy same-origin. L’immagine remota del prodotto non viene caricata.</p>
    </section>
  )
}

export default function SearchScreen({ foodId, mode = 'catalog' }: { foodId?: string; mode?: 'catalog' | 'barcode' }) {
  const allFoods = useMemo(() => getExtractedCatalogEntries().filter((food) => food.nascondi !== true), [])
  const categories = useMemo(() => Array.from(new Set(allFoods.map(({ categoria }) => categoria))).sort(), [allFoods])
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const selected = foodId ? getFoodByCatalogId(foodId) : undefined
  const results = useMemo(() => {
    const source = query.trim().length >= 3 ? searchFoods(query) : allFoods
    return source.filter((food) => !category || food.categoria === category).slice(0, 60)
  }, [allFoods, category, query])

  if (mode === 'barcode') return <div><a className="mb-4 inline-flex text-sm font-bold text-brand" href="#search">← Catalogo alimenti</a><BarcodePanel /></div>
  if (foodId) return selected ? <div><a className="mb-4 inline-flex text-sm font-bold text-brand" href="#search">← Tutti gli alimenti</a><FoodDetail food={selected} /></div> : <div><a className="text-sm font-bold text-brand" href="#search">← Tutti gli alimenti</a><p className="empty-card mt-4">L’alimento richiesto non esiste nel catalogo embedded.</p></div>

  return (
    <div>
      <section className="mb-6 px-1"><p className="screen-kicker">Catalogo verificato</p><h1 className="screen-title">Cerca ciò che <span className="text-brand">stai mangiando.</span></h1><p className="screen-subtitle">Gli alimenti nascosti restano esclusi. Ogni risultato apre una scheda collegabile e i valori mancanti restano n.d.</p></section>
      <div className="grid items-start gap-5 lg:grid-cols-[1fr_0.42fr]"><section><div className="app-card rounded-3xl border border-line bg-paper p-4 shadow-card sm:p-5"><label className="section-label" htmlFor="food-search">Nome o sinonimo</label><div className="relative mt-2"><SearchIcon className="pointer-events-none absolute top-3.5 left-3.5 size-5 text-muted" /><input id="food-search" className="field pl-11" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Es. lenticchie, pane, mela…" /></div><label className="mt-3 block text-xs font-bold text-muted" htmlFor="food-category">Categoria</label><select id="food-category" className="field mt-2" value={category} onChange={(event) => setCategory(event.target.value)}><option value="">Tutte le categorie</option>{categories.map((value) => <option value={value} key={value}>{value}</option>)}</select></div><div className="mt-3 grid gap-2 sm:grid-cols-2">{results.map((food) => <a className="group rounded-2xl border border-line bg-surface p-4 transition hover:border-brand/45" href={`#search/${encodeURIComponent(food.id)}`} key={food.id}><span className="flex items-start justify-between gap-3"><strong className="text-ink">{food.nome}</strong><ChevronRightIcon className="size-5 shrink-0 text-muted group-hover:text-brand" /></span><span className="mt-1 block text-xs text-muted">{food.categoria} · porzione {formatNumber(food.porzione_standard_g)} g · IG {formatNumber(food.ig_medio)}</span></a>)}</div>{!results.length && <p className="empty-card mt-3">Nessun alimento visibile corrisponde ai filtri.</p>}</section><aside className="rounded-3xl border border-line bg-surface p-5"><BarcodeIcon className="size-7 text-amber" /><h2 className="mt-3 text-xl font-extrabold text-ink">Hai un’etichetta?</h2><p className="mt-2 text-sm leading-6 text-muted">Apri il flusso dedicato per inserire o leggere il codice.</p><a className="secondary-button mt-4" href="#barcode">Apri Barcode <ChevronRightIcon className="size-4" /></a></aside></div>
    </div>
  )
}
