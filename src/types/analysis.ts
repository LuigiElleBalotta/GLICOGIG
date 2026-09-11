export interface AnalizzaRequest {
  image_base64: string
  device_id: string
  mime: 'image/jpeg'
  premium: boolean
}

export const ANALYSIS_LANGUAGES = ['it', 'en', 'es', 'de', 'fr'] as const

export type AnalysisLanguage = typeof ANALYSIS_LANGUAGES[number]
export type AnalysisOrigin = 'photo' | 'text'
export type PortionPreset = 0.7 | 1 | 1.4
export type RawWeightMode = 'cooked' | 'dry'

export interface AnalizzaTestoRequest {
  text: string
  device_id: string
  premium: boolean
  lang: AnalysisLanguage
}

export interface AnalizzaIngredient {
  nome: string
  catalogo_id?: string | null
  grammi: number
  cottura?: string | null
  maturazione?: string | null
  [key: string]: unknown
}

export interface AnalizzaResponse {
  e_cibo: boolean
  piatto?: string
  ingredienti: AnalizzaIngredient[]
  impatto?: string
  descrizione?: string
  lezione?: string
  confidenza?: number
  quando_ha_senso?: string
  [key: string]: unknown
}

export interface AnalyzePhotoInput {
  imageBase64: string
  accessKey?: string
  signal?: AbortSignal
}

export interface AnalyzeTextInput {
  text: string
  lang: AnalysisLanguage
  accessKey?: string
  signal?: AbortSignal
}

export interface PhotoAnalyzer {
  analyze(input: AnalyzePhotoInput): Promise<AnalizzaResponse>
}

export interface TextAnalyzer {
  analyze(input: AnalyzeTextInput): Promise<AnalizzaResponse>
}

export interface PhotoAnalysisServiceConfig {
  endpoint: string
  premium: boolean
}

export interface TextAnalysisServiceConfig {
  endpoint: string
  premium: boolean
}

export interface AnalysisErrorPayload {
  error?: string
  message?: string
  code?: string
}
