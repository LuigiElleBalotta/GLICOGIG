import type {
  AnalizzaIngredient,
  AnalizzaRequest,
  AnalizzaResponse,
  AnalysisErrorPayload,
  AnalyzePhotoInput,
  PhotoAnalyzer,
  PhotoAnalysisServiceConfig,
} from '../types/analysis'
import { createEphemeralRequestDeviceId } from './requestDeviceId'

const STATUS_MESSAGES: Partial<Record<number, string>> = {
  400: 'La foto o i dati inviati non sono validi.',
  401: 'Chiave personale non valida. Controllala e riprova.',
  402: 'La quota disponibile non consente questa analisi.',
  413: 'La foto è troppo grande per essere inviata.',
  429: 'Troppe richieste ravvicinate. Attendi un momento e riprova.',
}

export class AnalysisError extends Error {
  readonly status: number
  readonly code: string

  constructor(message: string, status = 0, code = 'ANALYSIS_ERROR') {
    super(message)
    this.name = 'AnalysisError'
    this.status = status
    this.code = code
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function parseIngredient(value: unknown): AnalizzaIngredient {
  if (!isRecord(value)) throw new AnalysisError('La risposta contiene un ingrediente non valido.')
  if (typeof value.nome !== 'string' || !value.nome.trim()) {
    throw new AnalysisError('La risposta contiene un ingrediente senza nome.')
  }
  if (typeof value.grammi !== 'number' || !Number.isFinite(value.grammi)) {
    throw new AnalysisError(`Quantità non valida per l’ingrediente “${value.nome}”.`)
  }
  if (value.catalogo_id != null && typeof value.catalogo_id !== 'string') {
    throw new AnalysisError(`catalogo_id non valido per l’ingrediente “${value.nome}”.`)
  }
  if (value.cottura != null && typeof value.cottura !== 'string') {
    throw new AnalysisError(`Cottura non valida per l’ingrediente “${value.nome}”.`)
  }

  return {
    ...value,
    nome: value.nome,
    catalogo_id: value.catalogo_id as string | null | undefined,
    grammi: value.grammi,
    cottura: value.cottura as string | null | undefined,
  }
}

function parseAnalizzaResponse(value: unknown): AnalizzaResponse {
  if (!isRecord(value) || typeof value.e_cibo !== 'boolean') {
    throw new AnalysisError('Il server non ha restituito un AnalizzaResponse valido.')
  }

  const rawIngredients = value.ingredienti
  if (value.e_cibo && !Array.isArray(rawIngredients)) {
    throw new AnalysisError('La risposta non contiene ingredienti validi.')
  }

  return {
    ...value,
    e_cibo: value.e_cibo,
    ingredienti: Array.isArray(rawIngredients) ? rawIngredients.map(parseIngredient) : [],
    piatto: typeof value.piatto === 'string' ? value.piatto : undefined,
    impatto: typeof value.impatto === 'string' ? value.impatto : undefined,
    descrizione: typeof value.descrizione === 'string' ? value.descrizione : undefined,
    lezione: typeof value.lezione === 'string' ? value.lezione : undefined,
    confidenza: typeof value.confidenza === 'number' ? value.confidenza : undefined,
    quando_ha_senso: typeof value.quando_ha_senso === 'string' ? value.quando_ha_senso : undefined,
  }
}

async function readResponse(response: Response): Promise<unknown> {
  const text = await response.text()
  if (!text) return null

  try {
    return JSON.parse(text) as unknown
  } catch {
    if (response.ok) throw new AnalysisError('Il server ha restituito una risposta non valida.', response.status)
    return { error: text }
  }
}

function errorPayload(value: unknown): AnalysisErrorPayload {
  return isRecord(value) ? value as AnalysisErrorPayload : {}
}

function isAbortError(error: unknown): boolean {
  return error instanceof Error && error.name === 'AbortError'
}

export function createPhotoAnalysisService(config: PhotoAnalysisServiceConfig): PhotoAnalyzer {
  return {
    async analyze({ imageBase64, accessKey, signal }: AnalyzePhotoInput): Promise<AnalizzaResponse> {
      const payload: AnalizzaRequest = {
        image_base64: imageBase64,
        device_id: createEphemeralRequestDeviceId(),
        mime: 'image/jpeg',
        premium: config.premium,
      }

      let response: Response
      try {
        response = await fetch(config.endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(accessKey ? { 'X-App-Access-Key': accessKey } : {}),
          },
          body: JSON.stringify(payload),
          signal,
        })
      } catch (error) {
        if (isAbortError(error)) throw error
        throw new AnalysisError('Connessione non riuscita. Controlla la rete e riprova.', 0, 'NETWORK_ERROR')
      }

      const data = await readResponse(response)
      if (!response.ok) {
        const serverError = errorPayload(data)
        const serverMessage = serverError.error || serverError.message
        throw new AnalysisError(
          typeof serverMessage === 'string'
            ? serverMessage
            : STATUS_MESSAGES[response.status] || 'Analisi non riuscita. Riprova tra poco.',
          response.status,
          serverError.code || 'ANALYSIS_ERROR',
        )
      }

      return parseAnalizzaResponse(data)
    },
  }
}

const configuredPremium = import.meta.env.VITE_ANALYSIS_PREMIUM?.toLowerCase() !== 'false'

export const photoAnalysisService = createPhotoAnalysisService({
  endpoint: import.meta.env.VITE_ANALYSIS_PATH || '/api/analyze',
  premium: configuredPremium,
})
