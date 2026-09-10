import { useEffect, useState } from 'react'

type InstallChoice = { outcome: 'accepted' | 'dismissed'; platform: string }

type InstallPromptEvent = Event & {
  prompt(): Promise<void>
  userChoice: Promise<InstallChoice>
}

export default function InstallPrompt() {
  const [installEvent, setInstallEvent] = useState<InstallPromptEvent | null>(null)

  useEffect(() => {
    function capturePrompt(event: Event) {
      event.preventDefault()
      setInstallEvent(event as InstallPromptEvent)
    }

    function clearPrompt() {
      setInstallEvent(null)
    }

    window.addEventListener('beforeinstallprompt', capturePrompt)
    window.addEventListener('appinstalled', clearPrompt)
    return () => {
      window.removeEventListener('beforeinstallprompt', capturePrompt)
      window.removeEventListener('appinstalled', clearPrompt)
    }
  }, [])

  if (!installEvent) return null

  async function install() {
    const prompt = installEvent
    if (!prompt) return
    setInstallEvent(null)
    try {
      await prompt.prompt()
      await prompt.userChoice
    } catch {
      // Il browser può invalidare il prompt se lo stato d'installazione cambia.
    }
  }

  return (
    <button
      className="min-h-10 rounded-full border border-amber/40 bg-amber-soft px-3 text-xs font-extrabold text-amber transition hover:border-amber hover:bg-amber/15"
      type="button"
      onClick={() => void install()}
    >
      Installa app
    </button>
  )
}
