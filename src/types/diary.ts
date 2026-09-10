import type { GlycemicImpactBand } from './nutrition'

export interface DiarySnapshot {
  nome: string
  nome_en: string | null
  nome_es: string | null
  nome_de: string | null
  nome_fr: string | null
  fonte: string | null
  fascia: GlycemicImpactBand
  cg: number
  kcal: number
  carbo: number
  prot: number
  grassi: number
  fibre: number
  grammi: number
}

export interface DiarySnapshotInput {
  nome: string
  nome_en?: string | null
  nome_es?: string | null
  nome_de?: string | null
  nome_fr?: string | null
  fonte?: string | null
  fascia: GlycemicImpactBand
  cg?: number | null
  kcal?: number | null
  carbo?: number | null
  prot?: number | null
  grassi?: number | null
  fibre?: number | null
  grammi?: number | null
}

export interface RegisterDiaryEntryInput extends DiarySnapshotInput {
  slot?: string | null
}

export interface DiaryEntry extends DiarySnapshot {
  id: string
  ts: number
  giorno: string
  slot?: string
}

export interface DiaryTotals {
  kcal: number
  carbo: number
  prot: number
  grassi: number
  fibre: number
  n: number
}
