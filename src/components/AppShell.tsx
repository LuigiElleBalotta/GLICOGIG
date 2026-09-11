import { useEffect, useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import InstallPrompt from './InstallPrompt'
import LanguageSelector from './LanguageSelector'
import BottomTabs from './BottomTabs'
import { routeFromHash, tabForRoute, type AppRoute } from './appNavigation'
import { ShieldIcon } from './Icons'

interface AppShellProps {
  children(route: AppRoute): ReactNode
}

export default function AppShell({ children }: AppShellProps) {
  const { t } = useTranslation()
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
          <a className="rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand" href="#home" aria-label={t('shell.homeAria')}>
            <p className="text-xl font-black tracking-[-0.05em] text-brand">{t('brand.name')}</p>
            <p className="text-[9px] font-extrabold tracking-[0.22em] text-amber uppercase">{t('brand.tagline')}</p>
          </a>
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <InstallPrompt />
            <span className="inline-flex min-h-10 items-center gap-2 rounded-full border border-brand/25 bg-brand-soft/80 px-3 text-xs font-bold text-brand">
              <ShieldIcon className="size-4" />
              <span className="hidden sm:inline">{t('shell.localDataBadge')}</span>
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
