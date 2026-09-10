import { useEffect, useRef, useState } from 'react'
import AppShell from './components/AppShell'
import { normalizeEditedGrams } from './domain/nutritionCalculator'
import DiaryScreen from './screens/DiaryScreen'
import HomeScreen from './screens/HomeScreen'
import LearnScreen from './screens/LearnScreen'
import PhotoScreen from './screens/PhotoScreen'
import RecipesScreen from './screens/RecipesScreen'
import SearchScreen from './screens/SearchScreen'
import { photoAnalysisService } from './services/photoAnalysisService'
import { prepareImage, type PreparedImage } from './services/imagePreparation'
import { MealSessionProvider, useMealSession } from './state/mealSession'
import type { AnalizzaResponse } from './types/analysis'
import type { ViewStatus } from './components/ResultPanel'

const ACCESS_KEY_STORAGE = 'glicogig_access_key'

function initialAccessKey(): string {
  try {
    return window.sessionStorage.getItem(ACCESS_KEY_STORAGE) || ''
  } catch {
    return ''
  }
}

function messageFromError(error: unknown, fallback: string): string {
  return error instanceof Error && error.message ? error.message : fallback
}

function AppContent() {
  const [image, setImage] = useState<PreparedImage | null>(null)
  const [result, setResult] = useState<AnalizzaResponse | null>(null)
  const [status, setStatus] = useState<ViewStatus>('idle')
  const [error, setError] = useState('')
  const [accessKey, setAccessKey] = useState(initialAccessKey)
  const [showAccessKey, setShowAccessKey] = useState(false)
  const requestController = useRef<AbortController | null>(null)
  const preparationToken = useRef(0)
  const resultSection = useRef<HTMLDivElement>(null)
  const { addMeal } = useMealSession()
  const busy = status === 'preparing' || status === 'analyzing'

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

  async function handleFile(file: File): Promise<void> {
    const token = ++preparationToken.current
    requestController.current?.abort()
    setImage(null)
    setStatus('preparing')
    setError('')
    setResult(null)
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
      setError(messageFromError(caughtError, 'Non riesco a preparare questa foto.'))
    }
  }

  async function handleAnalyze(): Promise<void> {
    if (!image || busy) return
    if (import.meta.env.PROD && !accessKey.trim()) {
      setError('Inserisci la password del sito prima di avviare l’analisi.')
      setStatus('error')
      return
    }

    const controller = new AbortController()
    requestController.current = controller
    setStatus('analyzing')
    setError('')
    setResult(null)

    try {
      const analysis = await photoAnalysisService.analyze({
        imageBase64: image.base64,
        accessKey: accessKey.trim(),
        signal: controller.signal,
      })
      setResult(analysis)
      setStatus('success')
      window.navigator.vibrate?.(30)
    } catch (caughtError) {
      if (caughtError instanceof Error && caughtError.name === 'AbortError') return
      setError(messageFromError(caughtError, 'Analisi non riuscita. Riprova tra poco.'))
      setStatus('error')
    } finally {
      if (requestController.current === controller) requestController.current = null
    }
  }

  function handleIngredientGramsChange(index: number, grams: number): void {
    setResult((current) => {
      if (!current || index < 0 || index >= current.ingredienti.length) return current
      return {
        ...current,
        ingredienti: current.ingredienti.map((ingredient, ingredientIndex) => (
          ingredientIndex === index
            ? { ...ingredient, grammi: normalizeEditedGrams(grams) }
            : ingredient
        )),
      }
    })
  }

  function clearImage(): void {
    preparationToken.current += 1
    requestController.current?.abort()
    setImage(null)
    setResult(null)
    setError('')
    setStatus('idle')
  }

  function addCurrentMealAndReset(): void {
    if (!result?.e_cibo) return
    addMeal(result)
    clearImage()
  }

  return (
    <AppShell>
      {(activeTab) => {
        if (activeTab === 'home') return <HomeScreen />
        if (activeTab === 'search') return <SearchScreen />
        if (activeTab === 'recipes') return <RecipesScreen />
        if (activeTab === 'diary') return <DiaryScreen />
        if (activeTab === 'learn') return <LearnScreen />
        return (
          <PhotoScreen
            image={image}
            result={result}
            status={status}
            error={error}
            accessKey={accessKey}
            showAccessKey={showAccessKey}
            resultSection={resultSection}
            onAccessKeyChange={setAccessKey}
            onToggleAccessKey={() => setShowAccessKey((visible) => !visible)}
            onFile={handleFile}
            onAnalyze={() => void handleAnalyze()}
            onClear={clearImage}
            onRetry={() => void handleAnalyze()}
            onIngredientGramsChange={handleIngredientGramsChange}
            onAddToSession={addCurrentMealAndReset}
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
