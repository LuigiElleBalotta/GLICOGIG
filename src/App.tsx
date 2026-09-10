import { useEffect, useRef, useState } from 'react'
import InstallPrompt from './components/InstallPrompt'
import PhotoCard from './components/PhotoCard'
import ResultPanel, { type ViewStatus } from './components/ResultPanel'
import { EyeIcon, EyeOffIcon, LockIcon, ShieldIcon } from './components/Icons'
import { normalizeEditedGrams } from './domain/nutritionCalculator'
import { photoAnalysisService } from './services/photoAnalysisService'
import { prepareImage, type PreparedImage } from './services/imagePreparation'
import type { AnalizzaResponse } from './types/analysis'

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

function App() {
  const [image, setImage] = useState<PreparedImage | null>(null)
  const [result, setResult] = useState<AnalizzaResponse | null>(null)
  const [status, setStatus] = useState<ViewStatus>('idle')
  const [error, setError] = useState('')
  const [accessKey, setAccessKey] = useState(initialAccessKey)
  const [showAccessKey, setShowAccessKey] = useState(false)
  const requestController = useRef<AbortController | null>(null)
  const resultSection = useRef<HTMLDivElement>(null)
  const busy = status === 'preparing' || status === 'analyzing'

  useEffect(() => {
    try {
      if (accessKey) window.sessionStorage.setItem(ACCESS_KEY_STORAGE, accessKey)
      else window.sessionStorage.removeItem(ACCESS_KEY_STORAGE)
    } catch {
      // L'accesso resta utilizzabile anche quando lo storage di sessione non è disponibile.
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
    requestController.current?.abort()
    setStatus('preparing')
    setError('')
    setResult(null)
    try {
      setImage(await prepareImage(file))
      setStatus('idle')
    } catch (caughtError) {
      setStatus('error')
      setError(messageFromError(caughtError, 'Non riesco a preparare questa foto.'))
    }
  }

  async function handleAnalyze(): Promise<void> {
    if (!image || busy) return
    if (import.meta.env.PROD && !accessKey.trim()) {
      setError('Inserisci la password del sito configurata su Vercel prima di avviare l’analisi.')
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
    requestController.current?.abort()
    setImage(null)
    setResult(null)
    setError('')
    setStatus('idle')
  }

  return (
    <main id="top" className="relative min-h-dvh overflow-x-clip bg-ivory text-ink">
      <div className="pointer-events-none fixed -top-40 -left-48 size-[30rem] rounded-full bg-brand/15 blur-3xl" />
      <div className="pointer-events-none fixed top-1/3 -right-56 size-[30rem] rounded-full bg-amber/10 blur-3xl" />

      <header className="app-safe-top sticky top-0 z-50 border-b border-line/70 bg-ivory/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <a className="rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand" href="#top" aria-label="GLICOGIG, torna all’inizio">
            <p className="text-xl font-black tracking-[-0.05em] text-brand">GLICOGIG</p>
            <p className="text-[9px] font-extrabold tracking-[0.22em] text-amber uppercase">Food intelligence</p>
          </a>
          <div className="flex items-center gap-2">
            <InstallPrompt />
            <div className="inline-flex min-h-10 items-center gap-2 rounded-full border border-brand/25 bg-brand-soft/80 px-3 text-xs font-bold text-brand">
              <ShieldIcon className="size-4" />
              <span className="hidden sm:inline">Accesso protetto</span>
              <span className="sm:hidden">Privato</span>
            </div>
          </div>
        </div>
      </header>

      <div className="app-safe-bottom relative mx-auto max-w-6xl px-3 pb-10 sm:px-6 lg:pb-16">
        <section className="grid items-end gap-5 px-1 py-7 sm:py-10 lg:grid-cols-[1fr_0.7fr] lg:py-12">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-amber/25 bg-amber-soft px-3 py-1.5 text-[11px] font-extrabold tracking-[0.14em] text-amber uppercase">
              <span className="size-1.5 rounded-full bg-amber shadow-[0_0_12px_var(--color-amber)]" /> Foto → ingredienti → impatto
            </p>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.045em] text-ink sm:text-6xl lg:text-7xl">
              Il tuo piatto,<br /><span className="text-brand">letto in un lampo.</span>
            </h1>
          </div>
          <p className="max-w-xl text-sm leading-6 text-muted sm:text-base lg:pb-1 lg:text-lg">Scatta, analizza e correggi le quantità. Nutrienti e carico glicemico si aggiornano direttamente sul dispositivo.</p>
        </section>

        <section className="mb-4 rounded-3xl border border-line bg-paper/90 p-4 shadow-card backdrop-blur sm:flex sm:items-center sm:gap-4 sm:p-5">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-2xl border border-brand/20 bg-brand-soft text-brand"><LockIcon className="size-5" /></span>
            <div className="min-w-0 flex-1">
              <label className="text-[11px] font-extrabold tracking-[0.14em] text-amber uppercase" htmlFor="access-key">Password del sito</label>
              <div className="relative mt-1.5">
                <input id="access-key" className="h-11 w-full rounded-xl border border-line bg-surface px-3 pr-11 text-sm text-ink outline-none transition placeholder:text-muted/60 focus:border-brand focus:ring-3 focus:ring-brand/15" type={showAccessKey ? 'text' : 'password'} value={accessKey} onChange={(event) => setAccessKey(event.target.value)} placeholder="APP_ACCESS_KEY configurata su Vercel" autoComplete="current-password" />
                <button className="absolute inset-y-0 right-0 grid w-11 place-items-center text-muted transition hover:text-brand" type="button" onClick={() => setShowAccessKey((visible) => !visible)} aria-label={showAccessKey ? 'Nascondi password' : 'Mostra password'}>{showAccessKey ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}</button>
              </div>
            </div>
          </div>
          <p className="mt-3 max-w-md text-xs leading-5 text-muted sm:mt-0">Protegge il proxy pubblico e resta soltanto nella sessione corrente del browser.</p>
        </section>

        <div className="grid items-start gap-4 lg:grid-cols-[0.88fr_1.12fr]">
          <PhotoCard
            image={image}
            busy={busy}
            preparing={status === 'preparing'}
            analyzing={status === 'analyzing'}
            onFile={handleFile}
            onAnalyze={() => void handleAnalyze()}
            onClear={clearImage}
          />
          <div ref={resultSection} className="scroll-mt-24">
            <ResultPanel status={status} result={result} error={error} hasImage={Boolean(image)} onRetry={() => void handleAnalyze()} onIngredientGramsChange={handleIngredientGramsChange} />
          </div>
        </div>

        <footer className="mt-7 flex flex-col gap-2 border-t border-line pt-5 text-xs leading-5 text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>Le stime sono informative e non sostituiscono indicazioni mediche o nutrizionali professionali.</p>
          <p className="font-semibold text-brand">GLICOGIG · PWA</p>
        </footer>
      </div>
    </main>
  )
}

export default App
