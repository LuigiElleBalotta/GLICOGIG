export interface AnalizzaRequest {
  image_base64: string
  device_id: string
  mime: 'image/jpeg'
  premium: boolean
}

export interface AnalizzaIngredient {
  nome: string
  catalogo_id?: string | null
  grammi: number
  cottura?: string | null
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

export interface PhotoAnalyzer {
  analyze(input: AnalyzePhotoInput): Promise<AnalizzaResponse>
}

export interface PhotoAnalysisServiceConfig {
  endpoint: string
  premium: boolean
}

export interface AnalysisErrorPayload {
  error?: string
  message?: string
  code?: string
}
