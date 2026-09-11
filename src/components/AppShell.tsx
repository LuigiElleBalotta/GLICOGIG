import { useEffect, useState, type ReactNode } from 'react'
import InstallPrompt from './InstallPrompt'
import BottomTabs, { APP_TABS, type AppTab } from './BottomTabs'
import { ShieldIcon } from './Icons'

const VALID_TABS = new Set<string>(APP_TABS.map(({ id }) => id))

export type AppRoute =
  | { page: AppTab; id?: string }
  | { page: 'meal' | 'barcode' | 'explanation' | 'advice' }

function isAppTab(value: string): value is AppTab {
  return VALID_TABS.has(value)
}

function decodeSegment(value: string): string | null {
  try {
    const decoded = decodeURIComponent(value).trim()
    return decoded || null
  } catch {
    return null
  }
}

export function routeFromHash(hash: string = window.location.hash): AppRoute | null {
  const path = hash.replace(/^#\/?/, '').replace(/\/$/, '')
  if (!path) return { page: 'home' }
  const segments = path.split('/')
  if (segments.length === 1) {
    const page = decodeSegment(segments[0])
    if (!page) return null
    if (isAppTab(page)) return { page }
    if (page === 'meal' || page === 'barcode' || page === 'explanation' || page === 'advice') return { page }
    return null
  }
  if (segments.length === 2) {
    const page = decodeSegment(segments[0])
    const id = decodeSegment(segments[1])
    if (!page || !id) return null
    if (page === 'recipes' || page === 'search' || page === 'learn') return { page, id }
  }
  return null
}

function tabForRoute(route: AppRoute): AppTab {
  if (route.page === 'barcode') return 'search'
  if (route.page === 'meal') return 'home'
  if (route.page === 'advice') return 'diary'
  if (route.page === 'explanation') return 'learn'
  return route.page
}

interface AppShellProps {
  children(route: AppRoute): ReactNode
}

export default function AppShell({ children }: AppShellProps) {
  const [route, setRoute] = useState<AppRoute>(() => routeFromHash() ?? { page: 'home' })

  useEffect(() => {
    if (!routeFromHash()) {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#home`)
    }
    const syncHash = () => {
      const nextRoute = routeFromHash()
      if (!nextRoute) {
        window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#home`)
        setRoute({ page: 'home' })
      } else {
        setRoute(nextRoute)
      }
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
    window.addEventListener('hashchange', syncHash)
    return () => window.removeEventListener('hashchange', syncHash)
  }, [])

  return (
    <div className="min-h-dvh bg-ivory text-ink">
      <div className="pointer-events-none fixed -top-40 -left-48 size-[30rem] rounded-full bg-brand/15 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none fixed top-1/3 -right-56 size-[30rem] rounded-full bg-amber/10 blur-3xl" aria-hidden="true" />

      <header className="app-safe-top sticky top-0 z-40 border-b border-line/70 bg-ivory/88 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <a className="rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand" href="#home" aria-label="GLICOGIG, vai alla home">
            <p className="text-xl font-black tracking-[-0.05em] text-brand">GLICOGIG</p>
            <p className="text-[9px] font-extrabold tracking-[0.22em] text-amber uppercase">Food intelligence</p>
          </a>
          <div className="flex items-center gap-2">
            <InstallPrompt />
            <span className="inline-flex min-h-10 items-center gap-2 rounded-full border border-brand/25 bg-brand-soft/80 px-3 text-xs font-bold text-brand">
              <ShieldIcon className="size-4" />
              <span className="hidden sm:inline">Dati locali</span>
            </span>
          </div>
        </div>
      </header>

      <main className="app-screen-shell relative mx-auto w-full max-w-6xl px-3 pb-28 pt-5 sm:px-6 sm:pt-7">
        {children(route)}
      </main>
      <BottomTabs activeTab={tabForRoute(route)} />
    </div>
  )
}
