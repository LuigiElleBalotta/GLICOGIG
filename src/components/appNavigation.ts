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

export function tabForRoute(route: AppRoute): AppTab {
  if (route.page === 'barcode') return 'search'
  if (route.page === 'meal') return 'home'
  if (route.page === 'advice') return 'diary'
  if (route.page === 'explanation') return 'learn'
  return route.page
}
