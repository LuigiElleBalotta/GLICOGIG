import type { ComponentType, SVGProps } from 'react'
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
  label: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
}

export const APP_TABS: readonly TabDefinition[] = [
  { id: 'home', label: 'Home', icon: HomeIcon },
  { id: 'search', label: 'Cerca', icon: SearchIcon },
  { id: 'photo', label: 'Foto', icon: CameraIcon },
  { id: 'recipes', label: 'Ricette', icon: ChefHatIcon },
  { id: 'diary', label: 'Diario', icon: DiaryIcon },
  { id: 'learn', label: 'Impara', icon: BookOpenIcon },
]

interface BottomTabsProps {
  activeTab: AppTab
}

export default function BottomTabs({ activeTab }: BottomTabsProps) {
  return (
    <nav className="app-bottom-tabs" aria-label="Navigazione principale">
      <div className="mx-auto grid max-w-3xl grid-cols-6 px-1.5 pt-1.5">
        {APP_TABS.map(({ id, label, icon: Icon }) => {
          const active = id === activeTab
          return (
            <a
              className={`bottom-tab ${active ? 'bottom-tab-active' : ''}`}
              href={`#${id}`}
              aria-current={active ? 'page' : undefined}
              key={id}
            >
              <span className={`bottom-tab-icon ${id === 'photo' ? 'bottom-tab-photo' : ''}`}><Icon className="size-5" /></span>
              <span>{label}</span>
            </a>
          )
        })}
      </div>
    </nav>
  )
}
