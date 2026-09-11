import type { ComponentType, SVGProps } from 'react'
import { useTranslation } from 'react-i18next'
import {
  BookOpenIcon,
  CameraIcon,
  ChefHatIcon,
  DiaryIcon,
  HomeIcon,
  SearchIcon,
} from './Icons'

export type AppTab = 'home' | 'search' | 'photo' | 'recipes' | 'diary' | 'learn'

interface TabDefinition {
  id: AppTab
  icon: ComponentType<SVGProps<SVGSVGElement>>
}

export const APP_TABS: readonly TabDefinition[] = [
  { id: 'home', icon: HomeIcon },
  { id: 'search', icon: SearchIcon },
  { id: 'photo', icon: CameraIcon },
  { id: 'recipes', icon: ChefHatIcon },
  { id: 'diary', icon: DiaryIcon },
  { id: 'learn', icon: BookOpenIcon },
]

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
