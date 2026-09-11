import { RECIPES } from '../catalog/datasets'
import type { Recipe } from '../types/content'
import type { DiaryEntry, DiaryTotals } from '../types/diary'
import type { StabilityLevel } from './stability'
import { indiceStabilita, livelloStabilita } from './stability'

const DAY_MS = 86_400_000
const SEVEN_DAYS = 7
const BAND_RANK = {
  trascurabile: 0,
  basso: 1,
  medio: 2,
  alto: 3,
} as const

export interface DailyProgress {
  giorno: string
  totali: DiaryTotals
  indice: number | null
  livello: StabilityLevel | null
}

export interface SevenDayProgress {
  dal: string
  al: string
  giorni: DailyProgress[]
  totali: DiaryTotals
  giorniConVoci: number
  indice: number | null
  livello: StabilityLevel | null
}

export interface ProgressRings {
  equilibrio: number
  freni: number
  varieta: number
}

export type DailyBalance = 'buono' | 'discreto' | 'daBilanciare'
export type WeeklyVerdict = 'equilibrata' | 'moderata' | 'intensa'
export type ProgressGoal = 'dimagrire' | 'massa' | 'mantenere' | null

export interface WeeklyBalanceTrend {
  key: 'meglio' | 'margine' | 'linea'
  pct: number
}

export interface WeeklyReportMacros {
  prot: number
  carbo: number
  grassi: number
  fibre: number
}

export type WeeklyMacroAdvice =
  | 'diario.macroDimagrireProt'
  | 'diario.macroDimagrireOk'
  | 'diario.macroMassaProt'
  | 'diario.macroMassaOk'
  | 'diario.macroMantieni'

export type WeeklyFocus = 'diario.focusDifficile' | 'diario.focusOk'

export interface WeeklyReport {
  nPasti: number
  giorniAttivi: number
  kcalGiorno: number
  macros: WeeklyReportMacros
  trend: number | null
  difficile: DiaryEntry | null
  perGiorno: number[]
  facili: Recipe[]
  macroAdvice: WeeklyMacroAdvice
  focus: WeeklyFocus
  verdetto: WeeklyVerdict
}

function localDay(input: Date): string {
  return new Date(input.getTime() - input.getTimezoneOffset() * 60_000)
    .toISOString()
    .slice(0, 10)
}

function dayAtOffset(reference: Date, offset: number): string {
  return localDay(new Date(reference.getTime() - offset * DAY_MS))
}

function entriesForDay(entries: readonly DiaryEntry[], day: string): DiaryEntry[] {
  return entries.filter((entry) => entry.giorno === day)
}

function rankForBand(band: DiaryEntry['fascia'] | undefined): number {
  return band == null ? 1 : BAND_RANK[band] ?? 1
}

function sumEntries(entries: readonly DiaryEntry[]): DiaryTotals {
  return entries.reduce<DiaryTotals>((total, entry) => ({
    kcal: total.kcal + entry.kcal,
    carbo: total.carbo + entry.carbo,
    prot: total.prot + entry.prot,
    grassi: total.grassi + entry.grassi,
    fibre: total.fibre + entry.fibre,
    n: total.n + 1,
  }), { kcal: 0, carbo: 0, prot: 0, grassi: 0, fibre: 0, n: 0 })
}

function stability(entries: readonly DiaryEntry[]): Pick<DailyProgress, 'indice' | 'livello'> {
  const index = indiceStabilita(entries.map((entry) => ({
    cg: entry.cg,
    fascia: entry.fascia,
  })))
  return {
    indice: index,
    livello: index === null ? null : livelloStabilita(index),
  }
}

function slotDiPasto(entry: DiaryEntry): string {
  if (entry.slot) return entry.slot

  const date = new Date(entry.ts)
  let hour = date.getHours() + date.getMinutes() / 60
  if (hour < 4) hour += 24
  if (hour < 10.5) return 'colazione'
  if (hour < 12) return 'spuntino_m'
  if (hour < 15) return 'pranzo'
  if (hour < 18.5) return 'spuntino_p'
  return 'cena'
}

function averageRatio(
  entries: readonly DiaryEntry[],
  reference: Date,
  firstOffset: number,
  lastOffset: number,
): number | null {
  const ratios: number[] = []
  for (let offset = firstOffset; offset <= lastOffset; offset += 1) {
    const ratio = ratioBilancio(entriesForDay(entries, dayAtOffset(reference, offset)))
    if (ratio !== null) ratios.push(ratio)
  }
  if (!ratios.length) return null
  return ratios.reduce((total, ratio) => total + ratio, 0) / ratios.length
}

function averageGlycemicLoad(entries: readonly DiaryEntry[]): number {
  return entries.reduce((total, entry) => total + entry.cg, 0) / entries.length
}

function kcalRicetta(recipe: Recipe): number | null {
  return recipe?.per_porzione?.kcal ?? null
}

function fasciaCalorica(kcal: number | null): 'leggero' | 'medio' | 'sostanzioso' | null {
  if (kcal === null) return null
  if (kcal <= 230) return 'leggero'
  if (kcal <= 380) return 'medio'
  return 'sostanzioso'
}

/** Aggregato puro per una singola chiave giorno locale. */
export function aggregatoGiorno(
  entries: readonly DiaryEntry[],
  day: string,
): DailyProgress {
  const dayEntries = entriesForDay(entries, day)
  return {
    giorno: day,
    totali: sumEntries(dayEntries),
    ...stability(dayEntries),
  }
}

/** Aggregato di oggi, senza valori demo o letture remote. */
export function progressiOggi(
  entries: readonly DiaryEntry[],
  reference: Date = new Date(),
): DailyProgress {
  return aggregatoGiorno(entries, localDay(reference))
}

/** Aggregato dei sette giorni locali terminanti nel giorno di riferimento. */
export function progressiSetteGiorni(
  entries: readonly DiaryEntry[],
  reference: Date = new Date(),
): SevenDayProgress {
  const dayKeys = Array.from({ length: SEVEN_DAYS }, (_, index) => {
    const day = new Date(reference.getTime())
    day.setDate(day.getDate() - (SEVEN_DAYS - 1 - index))
    return localDay(day)
  })
  const includedDays = new Set(dayKeys)
  const includedEntries = entries.filter((entry) => includedDays.has(entry.giorno))
  const days = dayKeys.map((day) => aggregatoGiorno(includedEntries, day))

  return {
    dal: dayKeys[0],
    al: dayKeys[dayKeys.length - 1],
    giorni: days,
    totali: sumEntries(includedEntries),
    giorniConVoci: days.filter((day) => day.totali.n > 0).length,
    ...stability(includedEntries),
  }
}

/** Replica pura VERIFIED di datiAnelliOggi #18459. */
export function datiAnelliOggi(
  entries: readonly DiaryEntry[],
  reference: Date = new Date(),
): ProgressRings {
  const todayEntries = entriesForDay(entries, localDay(reference))
  if (!todayEntries.length) return { equilibrio: 0, freni: 0, varieta: 0 }

  const lowImpact = todayEntries.filter((entry) => (
    entry.fascia === 'trascurabile' || entry.fascia === 'basso'
  )).length
  const equilibrio = Math.round(100 * lowImpact / todayEntries.length)
  const carbs = todayEntries.reduce((total, entry) => total + (entry.carbo || 0), 0)
  const brakes = todayEntries.reduce((total, entry) => (
    total + 2 * (entry.fibre || 0) + (entry.prot || 0) + (entry.grassi || 0)
  ), 0)
  const brakeRatio = carbs > 0 ? brakes / carbs : 1
  const freni = Math.round(100 * Math.max(0, Math.min(1, brakeRatio)))
  const uniqueNames = new Set(todayEntries.map((entry) => (
    (entry.nome || '').toLowerCase().trim()
  )))
  const uniqueSlots = new Set(todayEntries.map(slotDiPasto))
  const varieta = Math.round(Math.min(100, 12 * uniqueNames.size + 8 * uniqueSlots.size))

  return { equilibrio, freni, varieta }
}

/** Replica pura VERIFIED di pastoPiuDifficile #18428. */
export function pastoPiuDifficile(entries: readonly DiaryEntry[]): DiaryEntry | null {
  const difficultEntries = entries.filter((entry) => rankForBand(entry.fascia) >= 2)
  if (!difficultEntries.length) return null
  return difficultEntries.reduce((difficult, entry) => (
    entry.cg > difficult.cg ? entry : difficult
  ))
}

/** Replica pura VERIFIED di giorniConsecutivi #18463, limitata ai sette giorni Hermes. */
export function giorniConsecutivi(
  entries: readonly DiaryEntry[],
  reference: Date = new Date(),
): number {
  let consecutiveDays = 0
  for (let offset = 0; offset < SEVEN_DAYS; offset += 1) {
    const hasEntries = entriesForDay(entries, dayAtOffset(reference, offset)).length > 0
    if (hasEntries) consecutiveDays += 1
    else if (offset !== 0) break
  }
  return consecutiveDays
}

/** Replica pura VERIFIED di ratioBilancio #18464. */
export function ratioBilancio(entries: readonly DiaryEntry[]): number | null {
  if (!entries.length) return null
  const carbs = entries.reduce((total, entry) => total + (entry.carbo || 0), 0)
  const brakes = entries.reduce((total, entry) => (
    total + 2 * (entry.fibre || 0) + (entry.prot || 0) + (entry.grassi || 0)
  ), 0)
  return carbs > 0 ? brakes / carbs : null
}

/** Replica pura VERIFIED di bilancioOggi #18465. */
export function bilancioOggi(
  entries: readonly DiaryEntry[],
  reference: Date = new Date(),
): DailyBalance | null {
  const ratio = ratioBilancio(entriesForDay(entries, localDay(reference)))
  if (ratio === null) return null
  if (ratio >= 0.6) return 'buono'
  if (ratio >= 0.3) return 'discreto'
  return 'daBilanciare'
}

/** Replica pura VERIFIED di andamentoSettimana #18466. */
export function andamentoSettimana(
  entries: readonly DiaryEntry[],
  reference: Date = new Date(),
): WeeklyBalanceTrend | null {
  const currentAverage = averageRatio(entries, reference, 0, 6)
  const previousAverage = averageRatio(entries, reference, 7, 13)
  if (currentAverage === null || previousAverage === null || previousAverage === 0) return null

  const percentage = Math.round((currentAverage - previousAverage) / previousAverage * 100)
  if (percentage >= 8) return { key: 'meglio', pct: Math.abs(percentage) }
  if (percentage <= -8) return { key: 'margine', pct: Math.abs(percentage) }
  return { key: 'linea', pct: 0 }
}

/** Replica pura VERIFIED di verdettoSettimana #18477. */
export function verdettoSettimana(entries: readonly DiaryEntry[]): WeeklyVerdict {
  if (!entries.length) return 'equilibrata'
  const demandingShare = entries.filter((entry) => rankForBand(entry.fascia) >= 2).length / entries.length
  if (demandingShare >= 0.5) return 'intensa'
  if (demandingShare >= 0.25) return 'moderata'
  return 'equilibrata'
}

/** Replica pura VERIFIED di piattiPiuFacili #18432 sul catalogo 1.0.16 locale. */
export function piattiPiuFacili(
  goal: ProgressGoal,
  consumedEntries: readonly DiaryEntry[],
  limit = 2,
): Recipe[] {
  const consumedNames = new Set(consumedEntries.map((entry) => (entry.nome || '').toLowerCase()))
  const lowLoad = (recipe: Recipe): boolean => (
    (BAND_RANK[recipe.per_porzione?.fascia] ?? 3) <= 1
  )
  const carbs = (recipe: Recipe): number => recipe.per_porzione?.carboidrati_disponibili_g ?? 0

  let candidates = RECIPES.filter((recipe) => lowLoad(recipe) && carbs(recipe) >= 25)
  if (candidates.length < limit) candidates = RECIPES.filter(lowLoad)

  let goalCandidates = candidates
  if (goal === 'massa') {
    const proteinCandidates = candidates.filter((recipe) => (
      (recipe.per_porzione?.proteine_g ?? 0) >= 15
    ))
    if (proteinCandidates.length >= limit) goalCandidates = proteinCandidates
  } else if (goal === 'dimagrire') {
    const lightCandidates = candidates.filter((recipe) => (
      fasciaCalorica(kcalRicetta(recipe)) === 'leggero'
    ))
    if (lightCandidates.length >= limit) goalCandidates = lightCandidates
  }

  return goalCandidates
    .filter((recipe) => !consumedNames.has((recipe.nome || '').toLowerCase()))
    .slice()
    .sort((first, second) => (
      (first.per_porzione?.carico_glicemico ?? 0)
      - (second.per_porzione?.carico_glicemico ?? 0)
    ))
    .slice(0, limit)
}

/** Replica pura VERIFIED di reportSettimana #18479. */
export function reportSettimana(
  goal: ProgressGoal,
  entries: readonly DiaryEntry[],
  reference: Date = new Date(),
): WeeklyReport {
  const currentCutoff = dayAtOffset(reference, 6)
  const currentEntries = entries.filter((entry) => entry.giorno >= currentCutoff)
  const totals = sumEntries(currentEntries)
  const activeDays = new Set(currentEntries.map((entry) => entry.giorno)).size
  const divisor = Math.max(activeDays, 1)
  const difficult = pastoPiuDifficile(currentEntries)
  const macros = {
    prot: Math.round(totals.prot / divisor),
    carbo: Math.round(totals.carbo / divisor),
    grassi: Math.round(totals.grassi / divisor),
    fibre: Math.round(totals.fibre / divisor),
  }
  const perDay = Array.from({ length: SEVEN_DAYS }, (_, index) => {
    const offset = SEVEN_DAYS - 1 - index
    return Math.round(entriesForDay(currentEntries, dayAtOffset(reference, offset))
      .reduce((total, entry) => total + entry.cg, 0))
  })
  const previousStart = dayAtOffset(reference, 13)
  const previousEnd = dayAtOffset(reference, 6)
  const previousEntries = entries.filter((entry) => (
    entry.giorno >= previousStart && entry.giorno < previousEnd
  ))

  let trend: number | null = null
  if (previousEntries.length >= 2 && currentEntries.length >= 2) {
    const previousAverage = averageGlycemicLoad(previousEntries)
    const currentAverage = averageGlycemicLoad(currentEntries)
    if (previousAverage > 0) {
      trend = Math.round((currentAverage - previousAverage) / previousAverage * 100)
    }
  }

  const lowProtein = macros.prot < 60
  let macroAdvice: WeeklyMacroAdvice = 'diario.macroMantieni'
  if (goal === 'dimagrire') {
    macroAdvice = lowProtein ? 'diario.macroDimagrireProt' : 'diario.macroDimagrireOk'
  } else if (goal === 'massa') {
    macroAdvice = lowProtein ? 'diario.macroMassaProt' : 'diario.macroMassaOk'
  }

  return {
    nPasti: currentEntries.length,
    giorniAttivi: activeDays,
    kcalGiorno: Math.round(totals.kcal / divisor),
    macros,
    trend,
    difficile: difficult,
    perGiorno: perDay,
    facili: piattiPiuFacili(goal, currentEntries, 2),
    macroAdvice,
    focus: difficult ? 'diario.focusDifficile' : 'diario.focusOk',
    verdetto: verdettoSettimana(currentEntries),
  }
}
