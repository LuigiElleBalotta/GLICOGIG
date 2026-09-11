import { useTranslation } from 'react-i18next'
import { APP_TABS, type AppTab } from './appNavigation'

interface BottomTabsProps {
  activeTab: AppTab
}

export default function BottomTabs({ activeTab }: BottomTabsProps) {
  const { t } = useTranslation()

  return (
    <nav className="app-bottom-tabs" aria-label={t('nav.mainAria')}>
      <div className="mx-auto grid max-w-3xl grid-cols-6 px-1.5 pt-1.5">
        {APP_TABS.map(({ id, icon: Icon }) => {
          const active = id === activeTab
          return (
            <a
              className={`bottom-tab ${active ? 'bottom-tab-active' : ''}`}
              href={`#${id}`}
              aria-current={active ? 'page' : undefined}
              key={id}
            >
              <span className={`bottom-tab-icon ${id === 'photo' ? 'bottom-tab-photo' : ''}`}><Icon className="size-5" /></span>
              <span>{t(`nav.tabs.${id}`)}</span>
            </a>
          )
        })}
      </div>
    </nav>
  )
}
