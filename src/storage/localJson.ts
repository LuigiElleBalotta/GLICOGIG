function getLocalStorage(): Storage | null {
  if (typeof window === 'undefined') return null

  try {
    return window.localStorage
  } catch {
    return null
  }
}

/** Lettura JSON tollerante a storage assente, negato o corrotto. */
export function getJSON<T>(key: string, fallback: T): T {
  const storage = getLocalStorage()
  if (!storage) return fallback

  try {
    const raw = storage.getItem(key)
    return raw === null ? fallback : JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

/** Scrittura locale best-effort; false indica che il valore non è stato persistito. */
export function setJSON<T>(key: string, value: T): boolean {
  const storage = getLocalStorage()
  if (!storage) return false

  try {
    const serialized = JSON.stringify(value)
    if (serialized === undefined) return false
    storage.setItem(key, serialized)
    return true
  } catch {
    return false
  }
}
