import { BarcodeFormat, BrowserMultiFormatReader, type IScannerControls } from '@zxing/browser'
import { useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
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
import { effectiveIngredientGrams } from '../domain/nutritionCalculator'
import { reliabilityTranslationKey } from '../i18n/classificationKeys'
import { selectFoodDatasetFields, type LocalizedFoodView } from '../i18n/datasetSelectors'
import { LANGUAGE_LOCALES, resolveSupportedLanguage } from '../i18n/languages'
import { BarcodeServiceError, cercaProdotto } from '../services/barcodeService'
import { condividiCard, type ShareCardData } from '../services/shareCard'
import { useMealSession } from '../state/mealSession'
import { DIARY_STORAGE_KEY, registraMangiato } from '../storage/diaryStore'
import type { ProdottoBarcode } from '../types/barcode'
import type { FoodCatalogEntry } from '../types/catalog'

type LookupState = 'idle' | 'loading' | 'not-found' | 'error' | 'found'
type SaveState = 'idle' | 'success' | 'error'
type ShareState = 'idle' | 'sharing' | 'success' | 'error'
type FoodShareBand = 'alto' | 'medio' | 'basso' | 'trascurabile'
interface LocalizedMessage {
  key: string
  values?: Readonly<Record<string, string | number>>
}

function impactKey(value: string): 'classification.impact.negligible' | 'classification.impact.low' | 'classification.impact.medium' | 'classification.impact.high' | null {
  if (value === 'trascurabile') return 'classification.impact.negligible'
  if (value === 'basso') return 'classification.impact.low'
  if (value === 'medio') return 'classification.impact.medium'
  if (value === 'alto') return 'classification.impact.high'
  return null
}

function cameraErrorKey(error: unknown): string {
  const name = error instanceof Error ? error.name : ''
  if (name === 'NotAllowedError' || name === 'SecurityError') return 'barcode.camera.permission'
  if (name === 'NotFoundError' || name === 'DevicesNotFoundError') return 'barcode.camera.missing'
  if (name === 'NotReadableError' || name === 'TrackStartError') return 'barcode.camera.busy'
  if (name === 'OverconstrainedError') return 'barcode.camera.constraints'
  return 'barcode.camera.generic'
}

function barcodeErrorKey(error: unknown): string {
  if (!(error instanceof BarcodeServiceError)) return 'errors.barcode.lookupFailed'
  if (error.code === 'INVALID_BARCODE') return 'errors.barcode.invalidCode'
  if (error.code === 'NETWORK_ERROR') return 'errors.barcode.network'
  if (error.code === 'PROXY_UNAVAILABLE') return 'errors.barcode.proxyUnavailable'
  if (error.code === 'INVALID_RESPONSE') return 'errors.barcode.invalidResponse'
  return 'errors.barcode.lookupFailed'
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

function foodShareCard(
  food: FoodCatalogEntry,
  view: LocalizedFoodView,
  labels: Readonly<{ impact: string; energy: string; fibre: string; protein: string; note: string }>,
  bandLabel: string,
  formatNumber: (value: number) => string,
): ShareCardData | null {
  const title = view.displayName.trim()
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
    subtitle: [view.categoryLabel, view.subcategoryLabel].filter(Boolean).join(' · '),
    items: [
      { label: labels.impact, value: bandLabel },
      { label: labels.energy, value: `${formatNumber(energy)} kcal / 100 g` },
      { label: labels.fibre, value: `${formatNumber(fibre)} g / 100 g` },
      { label: labels.protein, value: `${formatNumber(protein)} g / 100 g` },
    ],
    note: labels.note,
  }
}

function FoodDetail({ food }: { food: FoodCatalogEntry }) {
  const { t, i18n } = useTranslation()
  const language = resolveSupportedLanguage(i18n.resolvedLanguage ?? i18n.language)
  const locale = LANGUAGE_LOCALES[language]
  const numberFormatter = useMemo(() => new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }), [locale])
  const formatNumber = (value: number | null | undefined) => typeof value === 'number' && Number.isFinite(value)
    ? numberFormatter.format(value)
    : t('common.labels.notAvailable')
  const view = useMemo(() => selectFoodDatasetFields(food, language), [food, language])
  const reliabilityKey = reliabilityTranslationKey(food.ig_affidabilita)
  const reliabilityLabel = reliabilityKey ? t(reliabilityKey) : t('common.labels.notAvailable')
  const { addItem } = useMealSession()
  const [grams, setGrams] = useState(food.porzione_standard_g)
  const [mealState, setMealState] = useState<'idle' | 'success'>('idle')
  const [saveState, setSaveState] = useState<SaveState>('idle')
  const [shareState, setShareState] = useState<ShareState>('idle')
  const usedGrams = effectiveIngredientGrams(food, grams)
  const item = mealItemFromFood(food, usedGrams)
  const bandTranslationKey = impactKey(item.band)
  const bandLabel = bandTranslationKey ? t(bandTranslationKey) : item.band
  const shareCard = foodShareCard(food, view, {
    impact: t('share.food.impactBand'),
    energy: t('common.metrics.energy'),
    fibre: t('common.metrics.fibre'),
    protein: t('common.metrics.protein'),
    note: t('share.food.note'),
  }, bandLabel, (value) => formatNumber(value))

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
    [t('common.metrics.energy'), item.kcal, 'kcal'],
    [t('common.metrics.availableCarbohydratesShort'), item.carbs, 'g'],
    [t('common.metrics.fibre'), item.fibre, 'g'],
    [t('common.metrics.protein'), item.protein, 'g'],
    [t('common.metrics.fat'), item.fat, 'g'],
  ] as const

  return (
    <article className="app-card rounded-3xl border border-brand/35 bg-paper p-5 shadow-card sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="section-label">{view.categoryLabel} · {view.subcategoryLabel}</p><h1 className="mt-1 text-2xl font-extrabold text-ink">{view.displayName}</h1>{view.displaySynonyms.length > 0 && <p className="mt-1 text-xs text-muted">{t('catalog.detail.also', { synonyms: view.displaySynonyms.join(', ') })}</p>}</div><span className={`status-badge ${item.band === 'alto' ? 'border-coral/30 bg-coral-soft text-coral' : ''}`}>{t('catalog.detail.impactSummary', { value: formatNumber(item.glycemicLoad), band: bandLabel })}</span></div>
      <label className="mt-5 block text-xs font-bold text-muted" htmlFor={`food-grams-${food.id}`}>{t('catalog.detail.gramsLabel')}</label><input id={`food-grams-${food.id}`} className="field mt-2 max-w-40" type="number" inputMode="decimal" min={1} max={2000} value={grams} onChange={(event) => updateGrams(event.target.value)} />
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">{values.map(([label, value, unit]) => <div className="data-tile" key={label}><span>{label}</span><strong>{formatNumber(value)} {unit}</strong></div>)}</div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4"><p className="rounded-xl bg-surface p-3 text-muted">{t('catalog.detail.averageGi')} <strong className="block text-brand">{formatNumber(food.ig_medio)}</strong></p><p className="rounded-xl bg-surface p-3 text-muted">{t('catalog.detail.giRange')} <strong className="block text-brand">{formatNumber(food.ig_min)}–{formatNumber(food.ig_max)}</strong></p><p className="rounded-xl bg-surface p-3 text-muted">{t('common.metrics.portion')} <strong className="block text-brand">{formatNumber(food.porzione_standard_g)} g</strong></p><p className="rounded-xl bg-surface p-3 text-muted">{t('catalog.detail.giReliability')} <strong className="block text-brand">{reliabilityLabel}</strong></p></div>
      <div className="mt-5 grid gap-2 sm:grid-cols-2"><button className="primary-button" type="button" onClick={addToMeal} disabled={mealState === 'success'}>{mealState === 'success' ? <CheckIcon className="size-5" /> : <LayersIcon className="size-5" />}{mealState === 'success' ? t('common.actions.addedToMeal') : t('common.actions.addToMeal')}</button><button className="secondary-button" type="button" onClick={save} disabled={saveState === 'success'}>{saveState === 'success' ? <CheckIcon className="size-5" /> : <SaveIcon className="size-5" />}{saveState === 'success' ? t('common.actions.registered') : t('common.actions.ateIt')}</button></div>
      {shareCard && <button className="secondary-button mt-2 w-full" type="button" onClick={() => void share()} disabled={shareState === 'sharing'} aria-busy={shareState === 'sharing'}><ShareIcon className="size-5" />{t('catalog.detail.shareChoice')}</button>}
      <div className="mt-2 text-xs" aria-live="polite">{saveState === 'error' && <p className="text-coral">{t('common.feedback.persistenceUnconfirmed')}</p>}{shareState === 'error' && <p className="text-coral">{t('common.feedback.shareIncomplete')}</p>}{shareState === 'success' && <p className="text-mint">{t('common.feedback.shareSaved')}</p>}{mealState === 'success' && <a className="font-bold text-brand underline" href="#meal">{t('common.actions.openMeal')}</a>}</div>
    </article>
  )
}

function BarcodeProductCard({ product }: { product: ProdottoBarcode }) {
  const { t, i18n } = useTranslation()
  const language = resolveSupportedLanguage(i18n.resolvedLanguage ?? i18n.language)
  const numberFormatter = useMemo(() => new Intl.NumberFormat(LANGUAGE_LOCALES[language], { maximumFractionDigits: 1 }), [language])
  const formatNumber = (value: number | null | undefined) => typeof value === 'number' && Number.isFinite(value)
    ? numberFormatter.format(value)
    : t('common.labels.notAvailable')
  const { addItem } = useMealSession()
  const [grams, setGrams] = useState(product.porzioneG && product.porzioneG > 0 ? product.porzioneG : 100)
  const [mealState, setMealState] = useState<'idle' | 'success'>('idle')
  const [saveState, setSaveState] = useState<SaveState>('idle')
  const resolution = product.nome
    ? resolveFoodByName(product.nome)
    : { kind: 'not_found' as const }
  const localFood = resolution.kind === 'resolved' ? resolution.food : null
  const localFoodView = localFood ? selectFoodDatasetFields(localFood, language) : null
  const item = localFood ? mealItemFromBarcode(product, localFood, grams) : null
  const itemBandKey = item ? impactKey(item.band) : null
  const itemBandLabel = item && itemBandKey ? t(itemBandKey) : item?.band ?? ''
  const nutrientRows = [
    [t('common.metrics.carbohydrates'), product.carbo100],
    [t('common.metrics.sugars'), product.zuccheri100],
    [t('common.metrics.fibre'), product.fibre100],
    [t('common.metrics.protein'), product.proteine100],
    [t('common.metrics.fat'), product.grassi100],
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
      <p className="section-label">{t('barcode.product.normalized', { code: product.codice })}</p><h2 className="mt-1 text-xl font-extrabold text-ink">{product.nome ?? t('common.labels.notAvailable')}</h2>{product.marca && <p className="mt-1 text-sm text-muted">{product.marca}</p>}
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">{nutrientRows.map(([label, value]) => <div className="data-tile" key={label}><span>{t('barcode.product.per100', { label })}</span><strong>{formatNumber(value)} g</strong></div>)}</div>
      <div className="mt-4 flex flex-wrap items-end gap-3"><label className="text-xs font-bold text-muted">{t('common.labels.quantity')}<input className="field mt-1 block w-32" type="number" inputMode="decimal" min={1} max={2000} value={grams} onChange={(event) => updateGrams(event.target.value)} /></label><span className="status-badge">{t('barcode.product.declaredServing', { value: product.porzioneG === null ? t('common.labels.notAvailable') : `${formatNumber(product.porzioneG)} g` })}</span>{product.carboCorretto && <span className="status-badge border-amber/30 bg-amber-soft text-amber">{t('barcode.product.dryCorrection')}</span>}</div>
      {item && localFood && localFoodView ? <div className="mt-4 rounded-2xl border border-mint/25 bg-mint-soft p-4 text-sm text-mint"><p><strong>{t('barcode.product.uniqueMatch')}</strong> {t('barcode.product.uniqueMatchBody', { food: localFoodView.displayName, glycemicLoad: formatNumber(item.glycemicLoad), band: itemBandLabel })}</p><div className="mt-3 grid gap-2 sm:grid-cols-2"><button className="primary-button" type="button" onClick={addToMeal} disabled={mealState === 'success'}>{mealState === 'success' ? <CheckIcon className="size-5" /> : <LayersIcon className="size-5" />}{mealState === 'success' ? t('common.actions.addedToMeal') : t('common.actions.addToMeal')}</button><button className="secondary-button" type="button" onClick={save} disabled={saveState === 'success'}>{saveState === 'success' ? <CheckIcon className="size-5" /> : <SaveIcon className="size-5" />}{saveState === 'success' ? t('common.actions.registered') : t('common.actions.ateIt')}</button></div></div> : <p className="mt-4 rounded-2xl border border-amber/25 bg-amber-soft p-4 text-sm leading-6 text-amber"><AlertIcon className="mr-2 inline size-4" />{localFood ? t('barcode.product.missingGi') : t('barcode.product.ambiguous')}</p>}
      <div className="mt-2 text-xs">{saveState === 'error' && <p className="text-coral">{t('common.feedback.persistenceUnconfirmed')}</p>}{mealState === 'success' && <a className="font-bold text-brand underline" href="#meal">{t('common.actions.openMeal')}</a>}</div>
    </article>
  )
}

function BarcodePanel() {
  const { t } = useTranslation()
  const [barcode, setBarcode] = useState('')
  const [lookupState, setLookupState] = useState<LookupState>('idle')
  const [lookupMessage, setLookupMessage] = useState<LocalizedMessage | null>(null)
  const [product, setProduct] = useState<ProdottoBarcode | null>(null)
  const [scanState, setScanState] = useState<LocalizedMessage | null>(null)
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
    if (stream instanceof MediaStream) stream.getTracks().forEach((track) => track.stop())
    if (video) {
      video.pause()
      video.srcObject = null
    }
  }

  function stopCamera(message: LocalizedMessage | null = null): void {
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
    setLookupMessage(null)
    setProduct(null)
  }

  async function lookup(value: string): Promise<void> {
    stopCamera()
    const code = value.replace(/\D/g, '').slice(0, 14)
    setBarcode(code)
    if (!BARCODE_PATTERN.test(code)) {
      setLookupState('error')
      setLookupMessage({ key: 'barcode.scan.invalidCode' })
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
    setLookupMessage(null)
    setProduct(null)
    try {
      const response = await cercaProdotto(code, { signal: controller.signal })
      if (response.status === 'not_found') {
        setLookupState('not-found')
        setLookupMessage({ key: 'barcode.scan.notFound' })
      } else {
        setProduct(response.product)
        setLookupState('found')
      }
    } catch (caughtError) {
      if (controller.signal.aborted && !timedOut) return
      setLookupState('error')
      setLookupMessage({
        key: timedOut ? 'barcode.scan.timeout' : barcodeErrorKey(caughtError),
      })
    } finally {
      window.clearTimeout(timeout)
      if (requestController.current === controller) requestController.current = null
    }
  }

  async function startCamera(): Promise<void> {
    stopCamera()
    if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) {
      setScanState({ key: 'barcode.scan.secureContext' })
      return
    }

    const video = videoRef.current
    if (!video) {
      setScanState({ key: 'barcode.scan.previewUnavailable' })
      return
    }

    const session = scanSession.current
    setCameraActive(true)
    setScanState({ key: 'barcode.scan.starting' })
    setLookupState('idle')
    setLookupMessage(null)
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
          setScanState({ key: 'barcode.scan.detected', values: { code: detected } })
          void lookup(detected)
        },
      )
      if (session !== scanSession.current) {
        controls.stop()
        return
      }
      scannerControls.current = controls
      setScanState({ key: 'barcode.scan.frameHint' })
    } catch (error) {
      if (session !== scanSession.current) return
      releaseCamera()
      setCameraActive(false)
      setScanState({ key: cameraErrorKey(error) })
    }
  }

  async function scanImage(event: ChangeEvent<HTMLInputElement>): Promise<void> {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    stopCamera()
    const session = scanSession.current
    const imageUrl = URL.createObjectURL(file)
    setScanState({ key: 'barcode.scan.readingImage' })
    setLookupState('idle')
    setLookupMessage(null)
    setProduct(null)
    try {
      const result = await getReader().decodeFromImageUrl(imageUrl)
      if (session !== scanSession.current) return
      const detected = result.getText().trim()
      if (!BARCODE_PATTERN.test(detected)) {
        setScanState({ key: 'barcode.scan.invalidImageCode' })
        return
      }
      setScanState({ key: 'barcode.scan.detected', values: { code: detected } })
      await lookup(detected)
    } catch {
      if (session === scanSession.current) setScanState({ key: 'barcode.scan.unreadableImage' })
    } finally {
      URL.revokeObjectURL(imageUrl)
    }
  }

  return (
    <section className="app-card rounded-3xl border border-line bg-paper p-5 shadow-card sm:p-6">
      <div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-2xl bg-amber-soft text-amber"><BarcodeIcon className="size-5" /></span><div><p className="section-label">{t('barcode.panel.kicker')}</p><h1 className="text-2xl font-extrabold text-ink">{t('barcode.panel.title')}</h1></div></div>
      <p className="mt-3 text-sm leading-6 text-muted">{t('barcode.panel.body')}</p>
      <form className="mt-4 flex gap-2" onSubmit={(event) => { event.preventDefault(); void lookup(barcode) }}><input className="field min-w-0 flex-1" value={barcode} onChange={(event) => sanitize(event.target.value)} inputMode="numeric" pattern="[0-9]{6,14}" maxLength={14} placeholder={t('barcode.panel.placeholder')} aria-label={t('barcode.panel.inputAria')} /><button className="primary-button shrink-0" type="submit" disabled={lookupState === 'loading'}>{lookupState === 'loading' ? t('common.actions.searching') : t('common.actions.search')}</button></form>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {cameraActive ? <button className="secondary-button w-full" type="button" onClick={() => stopCamera({ key: 'barcode.scan.cameraClosed' })}><CloseIcon className="size-5" /> {t('barcode.panel.closeCamera')}</button> : <button className="secondary-button w-full" type="button" onClick={() => void startCamera()}><CameraIcon className="size-5" /> {t('barcode.panel.liveScan')}</button>}
        <label className="secondary-button w-full"><ImageIcon className="size-5" /> {t('barcode.panel.scanPhoto')}<input className="sr-only" type="file" accept="image/*" capture="environment" onChange={(event) => void scanImage(event)} /></label>
      </div>
      <div className={`relative mt-3 overflow-hidden rounded-2xl bg-black ${cameraActive ? '' : 'hidden'}`} aria-hidden={!cameraActive}>
        <video ref={videoRef} className="aspect-[4/3] w-full object-cover" autoPlay muted playsInline />
        <div className="pointer-events-none absolute inset-0 grid place-items-center"><div className="flex h-28 w-[78%] items-center justify-center rounded-2xl border-2 border-white/80 bg-black/10 text-white shadow-lg"><ScanIcon className="size-8" /></div></div>
      </div>
      {scanState && <p className="mt-2 text-xs leading-5 text-muted" role="status" aria-live="polite">{t(scanState.key, scanState.values)}</p>}{(lookupState === 'error' || lookupState === 'not-found') && lookupMessage && <p className="mt-3 text-sm text-coral">{t(lookupMessage.key, lookupMessage.values)}</p>}{product && <BarcodeProductCard product={product} key={`${product.codice}-${product.nome ?? ''}`} />}
      <p className="mt-4 text-[11px] leading-5 text-muted">{t('barcode.panel.privacy')}</p>
    </section>
  )
}

export default function SearchScreen({ foodId, mode = 'catalog' }: { foodId?: string; mode?: 'catalog' | 'barcode' }) {
  const { t, i18n } = useTranslation()
  const language = resolveSupportedLanguage(i18n.resolvedLanguage ?? i18n.language)
  const locale = LANGUAGE_LOCALES[language]
  const numberFormatter = useMemo(() => new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }), [locale])
  const formatNumber = (value: number | null | undefined) => typeof value === 'number' && Number.isFinite(value)
    ? numberFormatter.format(value)
    : t('common.labels.notAvailable')
  const allFoods = useMemo(() => getExtractedCatalogEntries().filter((food) => food.nascondi !== true), [])
  const categories = useMemo(() => Array.from(new Map(allFoods.map((food) => [
    food.categoria,
    selectFoodDatasetFields(food, language).categoryLabel,
  ])).entries()).sort((a, b) => a[1].localeCompare(b[1], locale)), [allFoods, language, locale])
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const selected = foodId ? getFoodByCatalogId(foodId) : undefined
  const results = useMemo(() => {
    const source = query.trim().length >= 3 ? searchFoods(query, { language }) : allFoods
    return source.filter((food) => !category || food.categoria === category).slice(0, 60)
  }, [allFoods, category, language, query])

  if (mode === 'barcode') return <div><a className="mb-4 inline-flex text-sm font-bold text-brand" href="#search">{t('catalog.list.backCatalog')}</a><BarcodePanel /></div>
  if (foodId) return selected ? <div><a className="mb-4 inline-flex text-sm font-bold text-brand" href="#search">{t('catalog.list.backAll')}</a><FoodDetail food={selected} /></div> : <div><a className="text-sm font-bold text-brand" href="#search">{t('catalog.list.backAll')}</a><p className="empty-card mt-4">{t('catalog.list.missing')}</p></div>

  return (
    <div>
      <section className="mb-6 px-1"><p className="screen-kicker">{t('catalog.list.kicker')}</p><h1 className="screen-title">{t('catalog.list.title')} <span className="text-brand">{t('catalog.list.accent')}</span></h1><p className="screen-subtitle">{t('catalog.list.subtitle')}</p></section>
      <div className="grid items-start gap-5 lg:grid-cols-[1fr_0.42fr]"><section><div className="app-card rounded-3xl border border-line bg-paper p-4 shadow-card sm:p-5"><label className="section-label" htmlFor="food-search">{t('catalog.list.searchLabel')}</label><div className="relative mt-2"><SearchIcon className="pointer-events-none absolute top-3.5 left-3.5 size-5 text-muted" /><input id="food-search" className="field pl-11" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t('catalog.list.searchPlaceholder')} /></div><label className="mt-3 block text-xs font-bold text-muted" htmlFor="food-category">{t('catalog.list.category')}</label><select id="food-category" className="field mt-2" value={category} onChange={(event) => setCategory(event.target.value)}><option value="">{t('catalog.list.allCategories')}</option>{categories.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></div><div className="mt-3 grid gap-2 sm:grid-cols-2">{results.map((food) => { const view = selectFoodDatasetFields(food, language); return <a className="group rounded-2xl border border-line bg-surface p-4 transition hover:border-brand/45" href={`#search/${encodeURIComponent(food.id)}`} key={food.id}><span className="flex items-start justify-between gap-3"><strong className="text-ink">{view.displayName}</strong><ChevronRightIcon className="size-5 shrink-0 text-muted group-hover:text-brand" /></span><span className="mt-1 block text-xs text-muted">{t('catalog.list.cardMeta', { category: view.categoryLabel, grams: formatNumber(food.porzione_standard_g), gi: formatNumber(food.ig_medio) })}</span></a> })}</div>{!results.length && <p className="empty-card mt-3">{t('catalog.list.empty')}</p>}</section><aside className="rounded-3xl border border-line bg-surface p-5"><BarcodeIcon className="size-7 text-amber" /><h2 className="mt-3 text-xl font-extrabold text-ink">{t('catalog.list.barcodeTitle')}</h2><p className="mt-2 text-sm leading-6 text-muted">{t('catalog.list.barcodeBody')}</p><a className="secondary-button mt-4" href="#barcode">{t('catalog.list.openBarcode')} <ChevronRightIcon className="size-4" /></a></aside></div>
    </div>
  )
}
