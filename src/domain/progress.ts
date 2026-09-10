import type { DiaryEntry, DiaryTotals } from '../types/diary'
import type { StabilityLevel } from './stability'
import { indiceStabilita, livelloStabilita } from './stability'

const SEVEN_DAYS = 7

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

function localDay(input: Date): string {
  return new Date(input.getTime() - input.getTimezoneOffset() * 60_000)
    .toISOString()
    .slice(0, 10)
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

/** Aggregato puro per una singola chiave giorno locale. */
export function aggregatoGiorno(
  entries: readonly DiaryEntry[],
  day: string,
): DailyProgress {
  const dayEntries = entries.filter((entry) => entry.giorno === day)
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
