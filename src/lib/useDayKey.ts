import { useEffect, useState } from 'react'

export type DayBoundary = 'local' | 'utc'

function dayKey(boundary: DayBoundary, date: Date = new Date()): string {
  if (boundary === 'utc') return date.toISOString().slice(0, 10)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function nextBoundaryTime(boundary: DayBoundary, date: Date): number {
  if (boundary === 'utc') {
    return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 1)
  }
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1).getTime()
}

/** Aggiorna la chiave al cambio del giorno e dopo il risveglio della scheda. */
export function useDayKey(boundary: DayBoundary): string {
  const [key, setKey] = useState(() => dayKey(boundary))

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    const refresh = () => setKey(dayKey(boundary))
    const schedule = () => {
      const now = new Date()
      const delay = Math.max(1000, nextBoundaryTime(boundary, now) - now.getTime() + 50)
      timeout = setTimeout(() => {
        refresh()
        schedule()
      }, delay)
    }
    const refreshIfVisible = () => {
      if (document.visibilityState === 'visible') refresh()
    }

    schedule()
    window.addEventListener('focus', refresh)
    document.addEventListener('visibilitychange', refreshIfVisible)
    return () => {
      clearTimeout(timeout)
      window.removeEventListener('focus', refresh)
      document.removeEventListener('visibilitychange', refreshIfVisible)
    }
  }, [boundary])

  return key
}
