import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CloseIcon, PlusIcon, ShareIcon } from './Icons'

type InstallChoice = { outcome: 'accepted' | 'dismissed'; platform: string }

type InstallPromptEvent = Event & {
  prompt(): Promise<void>
  userChoice: Promise<InstallChoice>
}

type IosBrowser = 'chrome' | 'other'
type NavigatorWithStandalone = Navigator & { standalone?: boolean }

function detectIosBrowser(): IosBrowser | null {
  const appleMobile = /iPad|iPhone|iPod/.test(window.navigator.userAgent)
  const touchEnabledIpad = window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1
  if (!appleMobile && !touchEnabledIpad) return null
  return /CriOS/.test(window.navigator.userAgent) ? 'chrome' : 'other'
}

function runsStandalone(): boolean {
  return window.matchMedia('(display-mode: standalone)').matches
    || (window.navigator as NavigatorWithStandalone).standalone === true
}

export default function InstallPrompt() {
  const { t } = useTranslation()
  const [installEvent, setInstallEvent] = useState<InstallPromptEvent | null>(null)
  const [iosBrowser, setIosBrowser] = useState<IosBrowser | null>(null)
  const [installed, setInstalled] = useState(false)
  const [instructionsOpen, setInstructionsOpen] = useState(false)

  useEffect(() => {
    const displayMode = window.matchMedia('(display-mode: standalone)')

    function syncEnvironment() {
      setIosBrowser(detectIosBrowser())
      setInstalled(runsStandalone())
    }

    function capturePrompt(event: Event) {
      event.preventDefault()
      setInstallEvent(event as InstallPromptEvent)
    }

    function markInstalled() {
      setInstallEvent(null)
      setInstalled(true)
      setInstructionsOpen(false)
    }

    syncEnvironment()
    window.addEventListener('beforeinstallprompt', capturePrompt)
    window.addEventListener('appinstalled', markInstalled)
    displayMode.addEventListener('change', syncEnvironment)
    return () => {
      window.removeEventListener('beforeinstallprompt', capturePrompt)
      window.removeEventListener('appinstalled', markInstalled)
      displayMode.removeEventListener('change', syncEnvironment)
    }
  }, [])

  useEffect(() => {
    if (!instructionsOpen) return
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setInstructionsOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [instructionsOpen])

  if (installed || (!installEvent && !iosBrowser)) return null

  async function install() {
    const prompt = installEvent
    if (!prompt) {
      setInstructionsOpen(true)
      return
    }
    setInstallEvent(null)
    try {
      await prompt.prompt()
      await prompt.userChoice
    } catch {
      // Il browser può invalidare il prompt se lo stato d'installazione cambia.
    }
  }

  const shareLocation = t(iosBrowser === 'chrome'
    ? 'install.ios.locationChrome'
    : 'install.ios.locationSafari')

  return (
    <>
      <button
        className="min-h-10 rounded-full border border-amber/40 bg-amber-soft px-3 text-xs font-extrabold text-amber transition hover:border-amber hover:bg-amber/15"
        type="button"
        onClick={() => void install()}
        aria-haspopup={iosBrowser ? 'dialog' : undefined}
        aria-expanded={iosBrowser ? instructionsOpen : undefined}
      >
        {t('install.action')}
      </button>

      {instructionsOpen && (
        <div className="fixed inset-0 z-[100] grid place-items-end overflow-y-auto bg-ink/65 p-3 backdrop-blur-sm sm:place-items-center" role="presentation">
          <section
            className="max-h-[calc(100dvh-1.5rem)] w-full max-w-md overflow-y-auto rounded-3xl border border-brand/30 bg-paper p-5 text-ink shadow-2xl sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ios-install-title"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="section-label text-brand">{t('install.ios.kicker')}</p>
                <h2 className="mt-1 text-2xl font-extrabold" id="ios-install-title">{t('install.ios.title')}</h2>
              </div>
              <button
                className="grid size-10 shrink-0 place-items-center rounded-full border border-line text-muted transition hover:border-brand hover:text-brand"
                type="button"
                onClick={() => setInstructionsOpen(false)}
                aria-label={t('install.ios.closeAria')}
              >
                <CloseIcon className="size-5" />
              </button>
            </div>

            <p className="mt-3 text-sm leading-6 text-muted">{t('install.ios.intro')}</p>
            <ol className="mt-5 space-y-3">
              <li className="flex gap-3 rounded-2xl border border-line bg-surface p-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-soft font-black text-brand">1</span>
                <div><strong className="flex items-center gap-2"><ShareIcon className="size-4 text-brand" /> {t('install.ios.shareTitle')}</strong><p className="mt-1 text-xs leading-5 text-muted">{t('install.ios.shareLocation', { location: shareLocation })}</p></div>
              </li>
              <li className="flex gap-3 rounded-2xl border border-line bg-surface p-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-soft font-black text-brand">2</span>
                <div><strong className="flex items-center gap-2"><PlusIcon className="size-4 text-brand" /> {t('install.ios.addHomeTitle')}</strong><p className="mt-1 text-xs leading-5 text-muted">{t('install.ios.addHomeHint')}</p></div>
              </li>
              <li className="flex gap-3 rounded-2xl border border-line bg-surface p-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-soft font-black text-brand">3</span>
                <div><strong>{t('install.ios.confirmTitle')}</strong><p className="mt-1 text-xs leading-5 text-muted">{t('install.ios.confirmHint')}</p></div>
              </li>
            </ol>

            <button className="primary-button mt-5 w-full" type="button" onClick={() => setInstructionsOpen(false)}>{t('common.actions.understood')}</button>
          </section>
        </div>
      )}
    </>
  )
}
