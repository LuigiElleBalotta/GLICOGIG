import { useEffect, useRef, useState } from 'react'
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
      setError('Inserisci la chiave personale configurata su Vercel prima di avviare l’analisi.')
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
    <main className="relative min-h-screen overflow-hidden bg-ivory text-ink">
      <div className="pointer-events-none absolute -top-32 -left-32 size-96 rounded-full bg-mint/10 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -right-52 size-[32rem] rounded-full bg-amber/10 blur-3xl" />
      <header className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 sm:px-8 lg:px-10">
        <a className="rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand" href="#top" aria-label="GLICOGIG, torna all’inizio">
          <p className="text-xl font-extrabold tracking-[-0.04em] text-brand">GLICOGIG</p>
          <p className="text-[10px] font-bold tracking-[0.18em] text-muted uppercase">Food signal</p>
        </a>
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/10 bg-white/75 px-3 py-2 text-xs font-bold text-brand shadow-sm backdrop-blur"><ShieldIcon className="size-4 text-mint" /><span className="hidden sm:inline">Accesso protetto</span><span className="sm:hidden">Privato</span></div>
      </header>
      <div id="top" className="relative mx-auto max-w-7xl px-5 pb-12 sm:px-8 lg:px-10 lg:pb-20">
        <section className="grid items-end gap-7 py-9 lg:grid-cols-[1fr_0.62fr] lg:py-14">
          <div><p className="inline-flex items-center gap-2 rounded-full bg-mint-soft px-3 py-1.5 text-xs font-extrabold tracking-wide text-mint uppercase"><span className="size-1.5 rounded-full bg-mint" /> Foto → ingredienti → impatto</p><h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-brand sm:text-6xl lg:text-7xl">Il tuo piatto,<br /><span className="text-mint">più facile da capire.</span></h1></div>
          <p className="max-w-xl text-base leading-7 text-muted lg:pb-2 lg:text-lg">Scatta una foto: GLICOGIG riconosce il cibo e organizza la risposta del tuo servizio in un report chiaro e leggibile.</p>
        </section>
        <section className="mb-5 rounded-3xl border border-brand/10 bg-white/75 p-4 shadow-sm backdrop-blur sm:flex sm:items-center sm:gap-4 sm:p-5">
          <div className="flex min-w-0 flex-1 items-center gap-3"><span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand-soft text-brand"><LockIcon className="size-5" /></span><div className="min-w-0 flex-1"><label className="text-xs font-extrabold tracking-wide text-brand uppercase" htmlFor="access-key">Password del sito</label><div className="relative mt-1.5"><input id="access-key" className="h-11 w-full rounded-xl border border-line bg-white px-3 pr-11 text-sm text-ink outline-none transition placeholder:text-muted/60 focus:border-brand focus:ring-3 focus:ring-brand/10" type={showAccessKey ? 'text' : 'password'} value={accessKey} onChange={(event) => setAccessKey(event.target.value)} placeholder="La APP_ACCESS_KEY configurata su Vercel" autoComplete="current-password" /><button className="absolute inset-y-0 right-0 grid w-11 place-items-center text-muted transition hover:text-brand" type="button" onClick={() => setShowAccessKey((visible) => !visible)} aria-label={showAccessKey ? 'Nascondi password' : 'Mostra password'}>{showAccessKey ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}</button></div></div></div>
          <p className="mt-3 max-w-md text-xs leading-5 text-muted sm:mt-0">È la stessa <code>APP_ACCESS_KEY</code> impostata su Vercel: impedisce ad altri di usare il tuo endpoint e resta soltanto in questa sessione del browser.</p>
        </section>
        <div className="grid items-start gap-5 lg:grid-cols-[0.88fr_1.12fr]"><PhotoCard image={image} busy={busy} onFile={handleFile} onAnalyze={() => void handleAnalyze()} onClear={clearImage} /><ResultPanel status={status} result={result} error={error} hasImage={Boolean(image)} onRetry={() => void handleAnalyze()} onIngredientGramsChange={handleIngredientGramsChange} /></div>
        <footer className="mt-8 flex flex-col gap-3 border-t border-brand/10 pt-6 text-xs leading-5 text-muted sm:flex-row sm:items-center sm:justify-between"><p>Le stime sono informative e non sostituiscono indicazioni mediche o nutrizionali professionali.</p><p className="font-semibold text-brand">GLICOGIG · React + TypeScript + Tailwind CSS 4</p></footer>
      </div>
    </main>
  )
}

export default App
