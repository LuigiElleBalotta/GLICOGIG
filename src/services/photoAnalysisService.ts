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

export const INVALID_ANALYSIS_MESSAGE = 'Non sono riuscito a interpretare il risultato. Riprova con dati più precisi.'

const STATUS_MESSAGES: Partial<Record<number, string>> = {
  400: 'Non riesco ad analizzare questa foto. Provane una più nitida.',
  401: 'Password non corretta. Controllala e riprova.',
  402: 'Al momento non è possibile avviare un’altra analisi.',
  413: 'La foto è troppo grande. Scegline una più leggera.',
  429: 'Hai avviato troppe analisi ravvicinate. Attendi un momento e riprova.',
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

export function isAnalysisRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function optionalString(value: Record<string, unknown>, key: string): string | undefined {
  const candidate = value[key]
  if (candidate === undefined) return undefined
  if (typeof candidate !== 'string') throw new AnalysisError(INVALID_ANALYSIS_MESSAGE)
  return candidate
}

function optionalNullableString(
  value: Record<string, unknown>,
  key: string,
): string | null | undefined {
  const candidate = value[key]
  if (candidate === undefined || candidate === null) return candidate
  if (typeof candidate !== 'string') throw new AnalysisError(INVALID_ANALYSIS_MESSAGE)
  return candidate
}

function parseIngredient(value: unknown): AnalizzaIngredient {
  if (!isAnalysisRecord(value)) throw new AnalysisError(INVALID_ANALYSIS_MESSAGE)
  if (typeof value.nome !== 'string' || !value.nome.trim()) {
    throw new AnalysisError(INVALID_ANALYSIS_MESSAGE)
  }
  if (
    typeof value.grammi !== 'number'
    || !Number.isFinite(value.grammi)
    || value.grammi < 0
    || value.grammi > 2000
  ) {
    throw new AnalysisError(INVALID_ANALYSIS_MESSAGE)
  }

  const catalogId = optionalNullableString(value, 'catalogo_id')
  const cooking = optionalNullableString(value, 'cottura')
  const ripening = optionalNullableString(value, 'maturazione')
  return {
    nome: value.nome.trim(),
    ...(catalogId !== undefined ? { catalogo_id: catalogId } : {}),
    grammi: value.grammi,
    ...(cooking !== undefined ? { cottura: cooking } : {}),
    ...(ripening !== undefined ? { maturazione: ripening } : {}),
  }
}

export function parseAnalizzaResponse(value: unknown): AnalizzaResponse {
  if (!isAnalysisRecord(value) || typeof value.e_cibo !== 'boolean') {
    throw new AnalysisError(INVALID_ANALYSIS_MESSAGE)
  }

  const rawIngredients = value.ingredienti
  if (rawIngredients !== undefined && !Array.isArray(rawIngredients)) {
    throw new AnalysisError(INVALID_ANALYSIS_MESSAGE)
  }
  if (value.e_cibo && !Array.isArray(rawIngredients)) {
    throw new AnalysisError(INVALID_ANALYSIS_MESSAGE)
  }
  if (value.confidenza !== undefined && (
    typeof value.confidenza !== 'number' || !Number.isFinite(value.confidenza)
  )) {
    throw new AnalysisError(INVALID_ANALYSIS_MESSAGE)
  }

  const piatto = optionalString(value, 'piatto')
  const impatto = optionalString(value, 'impatto')
  const descrizione = optionalString(value, 'descrizione')
  const lezione = optionalString(value, 'lezione')
  const quandoHaSenso = optionalString(value, 'quando_ha_senso')

  return {
    e_cibo: value.e_cibo,
    ingredienti: Array.isArray(rawIngredients) ? rawIngredients.map(parseIngredient) : [],
    ...(piatto !== undefined ? { piatto } : {}),
    ...(impatto !== undefined ? { impatto } : {}),
    ...(descrizione !== undefined ? { descrizione } : {}),
    ...(lezione !== undefined ? { lezione } : {}),
    ...(value.confidenza !== undefined ? { confidenza: value.confidenza } : {}),
    ...(quandoHaSenso !== undefined ? { quando_ha_senso: quandoHaSenso } : {}),
  }
}

export async function readAnalysisResponse(response: Response): Promise<unknown> {
  const text = await response.text()
  if (!text) return null

  try {
    return JSON.parse(text) as unknown
  } catch {
    if (response.ok) throw new AnalysisError(INVALID_ANALYSIS_MESSAGE, response.status)
    return { error: text }
  }
}

export function analysisErrorPayload(value: unknown): AnalysisErrorPayload {
  return isAnalysisRecord(value) ? value as AnalysisErrorPayload : {}
}

export function isAnalysisAbortError(error: unknown): boolean {
  return error instanceof Error && error.name === 'AbortError'
}

function assertSameOriginPath(endpoint: string): void {
  if (!endpoint.startsWith('/') || endpoint.startsWith('//')) {
    throw new Error('L’endpoint di analisi fotografica deve essere same-origin.')
  }
}

export function createPhotoAnalysisService(config: PhotoAnalysisServiceConfig): PhotoAnalyzer {
  assertSameOriginPath(config.endpoint)
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
        if (isAnalysisAbortError(error)) throw error
        throw new AnalysisError('Connessione non riuscita. Controlla la rete e riprova.', 0, 'NETWORK_ERROR')
      }

      const data = await readAnalysisResponse(response)
      if (!response.ok) {
        const serverError = analysisErrorPayload(data)
        throw new AnalysisError(
          STATUS_MESSAGES[response.status] || 'Analisi non riuscita. Riprova tra poco.',
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
