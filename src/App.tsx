import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import AppShell from './components/AppShell'
import AdviceScreen from './screens/AdviceScreen'
import { mealItemFromAnalysis } from './domain/meal'
import { fattoreCrudo, normalizeRawWeight } from './domain/rawWeight'
import DiaryScreen from './screens/DiaryScreen'
import ExplanationScreen from './screens/ExplanationScreen'
import HomeScreen from './screens/HomeScreen'
import LearnScreen from './screens/LearnScreen'
import MealScreen from './screens/MealScreen'
import PhotoScreen from './screens/PhotoScreen'
import RecipesScreen from './screens/RecipesScreen'
import SearchScreen from './screens/SearchScreen'
import { resolveSupportedLanguage } from './i18n/languages'
import { AnalysisError, photoAnalysisService } from './services/photoAnalysisService'
import {
  ImagePreparationError,
  prepareImage,
  type PreparedImage,
} from './services/imagePreparation'
import { textAnalysisService } from './services/textAnalysisService'
import { MealSessionProvider, useMealSession } from './state/mealSession'
import {
  type AnalizzaResponse,
  type AnalysisLanguage,
  type AnalysisOrigin,
  type PortionPreset,
  type RawWeightMode,
} from './types/analysis'
import type { ViewStatus } from './components/ResultPanel'

const ACCESS_KEY_STORAGE = 'glicogig_access_key'

function initialAccessKey(): string {
  try {
    return window.sessionStorage.getItem(ACCESS_KEY_STORAGE) || ''
  } catch {
    return ''
  }
}

function currentAnalysisLanguage(language: string | null | undefined): AnalysisLanguage {
  return resolveSupportedLanguage(language)
}

function imageErrorKey(error: unknown): string {
  if (!(error instanceof ImagePreparationError)) return 'errors.image.prepareFallback'
  if (error.code === 'READ_FAILED') return 'errors.image.read'
  if (error.code === 'PREPARE_FAILED') return 'errors.image.prepare'
  if (error.code === 'CONVERT_FAILED') return 'errors.image.convert'
  if (error.code === 'INVALID_TYPE') return 'errors.image.type'
  if (error.code === 'SOURCE_TOO_LARGE') return 'errors.image.sourceTooLarge'
  if (error.code === 'UNSUPPORTED_PROCESSING') return 'errors.image.unsupported'
  return 'errors.image.compressedTooLarge'
}

function photoErrorKey(error: unknown): string {
  if (!(error instanceof AnalysisError)) return 'errors.analysisGeneric'
  if (error.code === 'NETWORK_ERROR') return 'errors.photo.network'
  if (error.status === 400) return 'errors.photo.badRequest'
  if (error.status === 401) return 'errors.photo.badPassword'
  if (error.status === 402) return 'errors.photo.unavailable'
  if (error.status === 413) return 'errors.photo.tooLarge'
  if (error.status === 429) return 'errors.photo.rateLimit'
  if (error.status === 0 || (error.status >= 200 && error.status < 300)) {
    return 'errors.photo.invalidResponse'
  }
  return 'errors.photo.unavailable'
}

function textErrorKey(error: unknown): string {
  if (!(error instanceof AnalysisError)) return 'errors.analysisGeneric'
  if (error.code === 'NETWORK_ERROR') return 'errors.text.network'
  if (error.status === 400) return 'errors.text.invalid'
  if (error.status === 401) return 'errors.text.badPassword'
  if (error.status === 402) return 'errors.text.unavailable'
  if (error.status === 413) return 'errors.text.tooLong'
  if (error.status === 429) return 'errors.text.rateLimit'
  if (error.status === 0 || (error.status >= 200 && error.status < 300)) {
    return 'errors.text.invalid'
  }
  return 'errors.text.unavailable'
}

function deepAnalysisSnapshot(result: AnalizzaResponse): AnalizzaResponse {
  return structuredClone(result)
}

function AppContent() {
  const { t, i18n } = useTranslation()
  const [analysisMode, setAnalysisMode] = useState<AnalysisOrigin>('photo')
  const [completeMeal, setCompleteMeal] = useState(false)
  const [image, setImage] = useState<PreparedImage | null>(null)
  const [text, setText] = useState('')
  const [result, setResult] = useState<AnalizzaResponse | null>(null)
  const [baseline, setBaseline] = useState<AnalizzaResponse | null>(null)
  const [resultOrigin, setResultOrigin] = useState<AnalysisOrigin>('photo')
  const [portionPreset, setPortionPreset] = useState<PortionPreset | null>(null)
  const [rawWeightMode, setRawWeightMode] = useState<RawWeightMode>('cooked')
  const [addedToMeal, setAddedToMeal] = useState(false)
  const [status, setStatus] = useState<ViewStatus>('idle')
  const [errorKey, setErrorKey] = useState<string | null>(null)
  const [accessKey, setAccessKey] = useState(initialAccessKey)
  const [showAccessKey, setShowAccessKey] = useState(false)
  const requestController = useRef<AbortController | null>(null)
  const preparationToken = useRef(0)
  const resultSection = useRef<HTMLDivElement>(null)
  const { addItem, startCompleteMeal, summary } = useMealSession()
  const busy = status === 'preparing' || status === 'analyzing'

  useEffect(() => {
    document.title = `${t('brand.name')} · ${t('analysis.hero.kicker')}`
  }, [i18n.language, i18n.resolvedLanguage, t])

  useEffect(() => {
    try {
      if (accessKey) window.sessionStorage.setItem(ACCESS_KEY_STORAGE, accessKey)
      else window.sessionStorage.removeItem(ACCESS_KEY_STORAGE)
    } catch {
      // L’accesso resta utilizzabile anche quando lo storage di sessione non è disponibile.
    }
  }, [accessKey])

  useEffect(() => () => {
    if (image?.previewUrl) URL.revokeObjectURL(image.previewUrl)
  }, [image])

  useEffect(() => () => requestController.current?.abort(), [])

  useEffect(() => {
    if (status !== 'success') return
    const frame = window.requestAnimationFrame(() => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      resultSection.current?.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'start',
      })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [status])

  function resetResultState(): void {
    setResult(null)
    setBaseline(null)
    setPortionPreset(null)
    setRawWeightMode('cooked')
    setAddedToMeal(false)
  }

  function storeAnalysis(analysis: AnalizzaResponse, origin: AnalysisOrigin): void {
    const snapshot = deepAnalysisSnapshot(analysis)
    setBaseline(snapshot)
    setResult(deepAnalysisSnapshot(snapshot))
    setResultOrigin(origin)
    setPortionPreset(1)
    setRawWeightMode('cooked')
    setAddedToMeal(false)
  }

  function requireAccessKey(): boolean {
    if (!import.meta.env.PROD || accessKey.trim()) return true
    setErrorKey('errors.accessKeyRequired')
    setStatus('error')
    return false
  }

  async function handleFile(file: File): Promise<void> {
    const token = ++preparationToken.current
    requestController.current?.abort()
    setImage(null)
    setStatus('preparing')
    setErrorKey(null)
    resetResultState()
    try {
      const prepared = await prepareImage(file)
      if (preparationToken.current !== token) {
        URL.revokeObjectURL(prepared.previewUrl)
        return
      }
      setImage(prepared)
      setStatus('idle')
    } catch (caughtError) {
      if (preparationToken.current !== token) return
      setStatus('error')
      setErrorKey(imageErrorKey(caughtError))
    }
  }

  async function handleAnalyzePhoto(): Promise<void> {
    if (!image || busy || !requireAccessKey()) return

    const controller = new AbortController()
    requestController.current = controller
    setStatus('analyzing')
    setErrorKey(null)
    resetResultState()

    try {
      const analysis = await photoAnalysisService.analyze({
        imageBase64: image.base64,
        accessKey: accessKey.trim(),
        signal: controller.signal,
      })
      storeAnalysis(analysis, 'photo')
      setStatus('success')
      window.navigator.vibrate?.(30)
    } catch (caughtError) {
      if (caughtError instanceof Error && caughtError.name === 'AbortError') return
      setErrorKey(photoErrorKey(caughtError))
      setStatus('error')
    } finally {
      if (requestController.current === controller) requestController.current = null
    }
  }

  async function handleAnalyzeText(): Promise<void> {
    const normalizedText = text.trim()
    if (!normalizedText || busy || !requireAccessKey()) {
      if (!normalizedText) {
        setErrorKey('errors.textRequired')
        setStatus('error')
      }
      return
    }

    const controller = new AbortController()
    requestController.current = controller
    setStatus('analyzing')
    setErrorKey(null)
    resetResultState()

    try {
      const analysis = await textAnalysisService.analyze({
        text: normalizedText,
        lang: currentAnalysisLanguage(i18n.resolvedLanguage ?? i18n.language),
        accessKey: accessKey.trim(),
        signal: controller.signal,
      })
      if (!analysis.e_cibo) {
        setErrorKey('errors.textNotFood')
        setStatus('error')
        return
      }
      storeAnalysis(analysis, 'text')
      setText('')
      setStatus('success')
      window.navigator.vibrate?.(30)
    } catch (caughtError) {
      if (caughtError instanceof Error && caughtError.name === 'AbortError') return
      setErrorKey(textErrorKey(caughtError))
      setStatus('error')
    } finally {
      if (requestController.current === controller) requestController.current = null
    }
  }

  function handleIngredientGramsChange(index: number, grams: number): void {
    setResult((current) => {
      if (!current || index < 0 || index >= current.ingredienti.length) return current
      const ingredient = current.ingredienti[index]
      const rawFactor = rawWeightMode === 'dry' ? fattoreCrudo(ingredient.nome) : null
      const cookedGrams = rawFactor === null
        ? normalizeRawWeight(grams)
        : normalizeRawWeight(grams * rawFactor)
      return {
        ...current,
        ingredienti: current.ingredienti.map((item, ingredientIndex) => (
          ingredientIndex === index
            ? { ...item, grammi: cookedGrams }
            : item
        )),
      }
    })
    setPortionPreset(null)
  }

  function handlePortionPresetChange(preset: PortionPreset): void {
    if (!baseline) return
    const next = deepAnalysisSnapshot(baseline)
    next.ingredienti = next.ingredienti.map((ingredient) => ({
      ...ingredient,
      grammi: normalizeRawWeight(ingredient.grammi * preset),
    }))
    setResult(next)
    setPortionPreset(preset)
  }

  function handleRawWeightModeChange(nextMode: RawWeightMode): void {
    if (nextMode === rawWeightMode) return
    setRawWeightMode(nextMode)
  }

  function clearAnalysis(): void {
    preparationToken.current += 1
    requestController.current?.abort()
    requestController.current = null
    setImage(null)
    setText('')
    resetResultState()
    setErrorKey(null)
    setStatus('idle')
  }

  function changeAnalysisMode(mode: AnalysisOrigin): void {
    if (mode === analysisMode) return
    clearAnalysis()
    setAnalysisMode(mode)
  }

  function beginCompleteMeal(): void {
    startCompleteMeal()
    setCompleteMeal(true)
  }

  function addCurrentMeal(): void {
    if (!result?.e_cibo || addedToMeal) return
    if (!completeMeal) beginCompleteMeal()
    const item = mealItemFromAnalysis(
      result,
      resultOrigin,
      t('analysis.result.unnamedDish'),
    )
    if (!item) return
    addItem(item)
    setAddedToMeal(true)
    window.navigator.vibrate?.(30)
  }

  function analyzeAnotherDish(): void {
    clearAnalysis()
  }

  return (
    <AppShell>
      {(route) => {
        if (route.page === 'home') return <HomeScreen />
        if (route.page === 'meal') return <MealScreen />
        if (route.page === 'barcode') return <SearchScreen mode="barcode" />
        if (route.page === 'search') return <SearchScreen foodId={route.id} />
        if (route.page === 'recipes') return <RecipesScreen recipeId={route.id} />
        if (route.page === 'diary') return <DiaryScreen />
        if (route.page === 'advice') return <AdviceScreen />
        if (route.page === 'learn') return <LearnScreen chapterId={route.id} />
        if (route.page === 'explanation') return <ExplanationScreen />
        return (
          <PhotoScreen
            analysisMode={analysisMode}
            completeMeal={completeMeal}
            image={image}
            text={text}
            result={result}
            resultOrigin={resultOrigin}
            portionPreset={portionPreset}
            rawWeightMode={rawWeightMode}
            addedToMeal={addedToMeal}
            mealItemCount={summary.plates}
            status={status}
            error={errorKey ? t(errorKey) : ''}
            accessKey={accessKey}
            showAccessKey={showAccessKey}
            resultSection={resultSection}
            onAnalysisModeChange={changeAnalysisMode}
            onCompleteMealStart={beginCompleteMeal}
            onSingleDish={() => setCompleteMeal(false)}
            onAccessKeyChange={setAccessKey}
            onToggleAccessKey={() => setShowAccessKey((visible) => !visible)}
            onFile={handleFile}
            onTextChange={setText}
            onAnalyzePhoto={() => void handleAnalyzePhoto()}
            onAnalyzeText={() => void handleAnalyzeText()}
            onClear={clearAnalysis}
            onRetry={() => void (analysisMode === 'photo' ? handleAnalyzePhoto() : handleAnalyzeText())}
            onIngredientGramsChange={handleIngredientGramsChange}
            onPortionPresetChange={handlePortionPresetChange}
            onRawWeightModeChange={handleRawWeightModeChange}
            onAddToSession={addCurrentMeal}
            onAnalyzeAnother={analyzeAnotherDish}
          />
        )
      }}
    </AppShell>
  )
}

export default function App() {
  return (
    <MealSessionProvider>
      <AppContent />
    </MealSessionProvider>
  )
}
