import { useSyncExternalStore } from 'react'
import type {
  DiaryEntry,
  DiarySnapshot,
  DiarySnapshotInput,
  DiaryTotals,
  RegisterDiaryEntryInput,
} from '../types/diary'
import { getJSON, setJSON } from './localJson'

export const DIARY_STORAGE_KEY = 'glicogig_diario'
export const PENDING_SLOT_TTL_MS = 120_000
export const MAX_DIARY_ENTRIES = 800

const DAY_MS = 86_400_000
const EMPTY_DIARY: readonly DiaryEntry[] = []

type DiaryListener = (entries: DiaryEntry[]) => void

interface PendingSlot {
  slot: string
  createdAt: number
}

let entries: DiaryEntry[] = []
let loaded = false
let uidCounter = 0
let pendingSlot: PendingSlot | null = null
const listeners = new Set<DiaryListener>()

function numericValue(value: number | null | undefined): number {
  if (value == null) return 0
  if (!Number.isFinite(value)) {
    throw new TypeError('Il diario accetta solo valori numerici finiti.')
  }
  return value
}

function roundedValue(value: number | null | undefined): number {
  return Math.round(numericValue(value))
}

/** Crea lo snapshot persistibile con l'arrotondamento verificato. */
export function snapshotDaVoce(input: DiarySnapshotInput): DiarySnapshot {
  const carbo = numericValue(input.carbo)
  const prot = numericValue(input.prot)
  const grassi = numericValue(input.grassi)
  const fibre = numericValue(input.fibre)
  const kcal = numericValue(input.kcal == null
    ? 4 * carbo + 4 * prot + 9 * grassi + 2 * fibre
    : input.kcal)

  return {
    nome: input.nome,
    nome_en: input.nome_en ?? null,
    nome_es: input.nome_es ?? null,
    nome_de: input.nome_de ?? null,
    nome_fr: input.nome_fr ?? null,
    fonte: input.fonte ?? null,
    fascia: input.fascia,
    cg: roundedValue(input.cg),
    kcal: roundedValue(kcal),
    carbo: roundedValue(carbo),
    prot: roundedValue(prot),
    grassi: roundedValue(grassi),
    fibre: roundedValue(fibre),
    grammi: roundedValue(input.grammi),
  }
}

/** Giorno civile locale nel formato YYYY-MM-DD. */
export function giornoLocale(input?: Date | string | number | null): string {
  const date = input == null
    ? new Date()
    : input instanceof Date
      ? new Date(input.getTime())
      : new Date(input)
  return new Date(date.getTime() - date.getTimezoneOffset() * 60_000)
    .toISOString()
    .slice(0, 10)
}

function notify(persist: boolean): void {
  const snapshot = [...entries]
  for (const listener of listeners) {
    listener([...snapshot])
  }
  if (persist) setJSON(DIARY_STORAGE_KEY, entries)
}

/** Carica una sola volta; accetta solo un array e non migra le singole voci. */
export function caricaDiario(): DiaryEntry[] {
  if (!loaded) {
    const stored = getJSON<unknown>(DIARY_STORAGE_KEY, [])
    entries = Array.isArray(stored) ? [...stored] as DiaryEntry[] : []
    loaded = true
    notify(false)
  }
  return [...entries]
}

export function sottoscriviDiario(listener: DiaryListener): () => void {
  caricaDiario()
  listeners.add(listener)
  listener([...entries])
  return () => {
    listeners.delete(listener)
  }
}

export function impostaSlotPendente(slot: string | null | undefined): void {
  pendingSlot = slot ? { slot, createdAt: Date.now() } : null
}

function consumePendingSlot(now: number): string | undefined {
  const current = pendingSlot
  pendingSlot = null
  if (!current || now - current.createdAt >= PENDING_SLOT_TTL_MS) return undefined
  return current.slot
}

function nextId(now: number): string {
  return `d${now.toString(36)}${uidCounter++}`
}

/** Registra una copia dello snapshot e conserva solo le ultime 800 voci. */
export function registraMangiato(input: RegisterDiaryEntryInput): DiaryEntry {
  caricaDiario()
  const now = Date.now()
  const consumedSlot = consumePendingSlot(now)
  const selectedSlot = input.slot ?? consumedSlot
  const entry: DiaryEntry = {
    ...snapshotDaVoce(input),
    id: nextId(now),
    ts: now,
    giorno: giornoLocale(now),
    ...(selectedSlot === undefined ? {} : { slot: selectedSlot }),
  }

  entries = [...entries, entry].slice(-MAX_DIARY_ENTRIES)
  notify(true)
  return { ...entry }
}

export function rimuoviDalDiario(id: string): boolean {
  caricaDiario()
  const nextEntries = entries.filter((entry) => entry.id !== id)
  if (nextEntries.length === entries.length) return false
  entries = nextEntries
  notify(true)
  return true
}

export function rinominaVoce(id: string, name: string): boolean {
  caricaDiario()
  const normalizedName = name.trim().slice(0, 60)
  if (!normalizedName) return false

  let changed = false
  entries = entries.map((entry) => {
    if (entry.id !== id) return entry
    changed = true
    return {
      ...entry,
      nome: normalizedName,
      nome_en: normalizedName,
      nome_es: normalizedName,
      nome_de: normalizedName,
      nome_fr: normalizedName,
    }
  })
  if (changed) notify(true)
  return changed
}

export function spostaSlot(id: string, slot: string | null | undefined): boolean {
  caricaDiario()
  let changed = false
  entries = entries.map((entry) => {
    if (entry.id !== id) return entry
    changed = true
    const updated = { ...entry }
    if (!slot) delete updated.slot
    else updated.slot = slot
    return updated
  })
  if (changed) notify(true)
  return changed
}

export function vociDelGiorno(day: string = giornoLocale()): DiaryEntry[] {
  caricaDiario()
  return entries.filter((entry) => entry.giorno === day)
}

export function vociUltimiGiorni(days = 7, reference: Date = new Date()): DiaryEntry[] {
  caricaDiario()
  const normalizedDays = Number.isFinite(days) ? Math.max(1, Math.trunc(days)) : 7
  const cutoff = giornoLocale(new Date(reference.getTime() - (normalizedDays - 1) * DAY_MS))
  return entries.filter((entry) => entry.giorno >= cutoff)
}

export function vociTutte(): DiaryEntry[] {
  caricaDiario()
  return [...entries]
}

export function totali(values?: readonly DiaryEntry[]): DiaryTotals {
  const source = values ?? caricaDiario()
  return source.reduce<DiaryTotals>((total, entry) => ({
    kcal: total.kcal + entry.kcal,
    carbo: total.carbo + entry.carbo,
    prot: total.prot + entry.prot,
    grassi: total.grassi + entry.grassi,
    fibre: total.fibre + entry.fibre,
    n: total.n + 1,
  }), { kcal: 0, carbo: 0, prot: 0, grassi: 0, fibre: 0, n: 0 })
}

function subscribeReact(onStoreChange: () => void): () => void {
  return sottoscriviDiario(() => onStoreChange())
}

function getDiarySnapshot(): readonly DiaryEntry[] {
  return entries
}

/** Hook React con sottoscrizione e cleanup gestiti da useSyncExternalStore. */
export function useDiario(): readonly DiaryEntry[] {
  return useSyncExternalStore(subscribeReact, getDiarySnapshot, () => EMPTY_DIARY)
}
