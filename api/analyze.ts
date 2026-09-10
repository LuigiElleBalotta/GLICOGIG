import { timingSafeEqual } from 'node:crypto'
import type { AnalizzaRequest } from '../src/types/analysis'

const DEFAULT_ANALYSIS_ENDPOINT = 'https://glico-foto.business-fabiodenuzzo.workers.dev/analizza'
const MAX_BASE64_LENGTH = 3_900_000
const UPSTREAM_TIMEOUT_MS = 25_000

type HeaderValue = string | string[] | undefined

interface ApiRequest {
  method?: string
  headers: Record<string, HeaderValue>
  body?: unknown
}

interface ApiResponse {
  statusCode: number
  setHeader(name: string, value: string): void
  end(body: string): void
}

export interface AnalyzeHandlerConfig {
  accessKey?: string
  endpoint?: string
  premium?: string
}

function sendJson(response: ApiResponse, status: number, payload: unknown): void {
  response.statusCode = status
  response.setHeader('Content-Type', 'application/json; charset=utf-8')
  response.setHeader('Cache-Control', 'no-store')
  response.setHeader('X-Content-Type-Options', 'nosniff')
  response.end(JSON.stringify(payload))
}

function safeEqual(value: string, expected: string): boolean {
  const valueBuffer = Buffer.from(value)
  const expectedBuffer = Buffer.from(expected)
  return valueBuffer.length === expectedBuffer.length && timingSafeEqual(valueBuffer, expectedBuffer)
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function parseBody(body: unknown): unknown {
  return typeof body === 'string' ? JSON.parse(body) as unknown : body
}

function validatePayload(body: unknown): AnalizzaRequest | string {
  if (!isRecord(body)) return 'Body JSON mancante.'
  if (typeof body.image_base64 !== 'string' || body.image_base64.length < 100) return 'Immagine mancante.'
  if (body.image_base64.length > MAX_BASE64_LENGTH) return 'Immagine troppo grande.'
  if (body.image_base64.startsWith('data:')) return 'Invia il Base64 senza prefisso data URI.'
  if (typeof body.device_id !== 'string' || !body.device_id.startsWith('dev_') || body.device_id.length > 160) return 'Device ID non valido.'
  if (body.mime !== 'image/jpeg') return 'Formato immagine non supportato.'
  return { image_base64: body.image_base64, device_id: body.device_id, mime: 'image/jpeg', premium: Boolean(body.premium) }
}

/** Crea lo stesso boundary per Vercel e per il middleware locale Vite. */
export function createAnalyzeHandler(config: AnalyzeHandlerConfig = {}) {
  return async function handler(request: ApiRequest, response: ApiResponse): Promise<void> {
    if (request.method !== 'POST') {
      response.setHeader('Allow', 'POST')
      sendJson(response, 405, { error: 'Metodo non consentito.', code: 'METHOD_NOT_ALLOWED' })
      return
    }

    const expectedAccessKey = config.accessKey || process.env.APP_ACCESS_KEY
    if (!expectedAccessKey) {
      sendJson(response, 503, { error: 'APP_ACCESS_KEY non configurata sul server.', code: 'MISSING_SERVER_CONFIG' })
      return
    }

    const providedAccessKey = request.headers['x-app-access-key']
    if (typeof providedAccessKey !== 'string' || !safeEqual(providedAccessKey, expectedAccessKey)) {
      sendJson(response, 401, { error: 'Chiave personale non valida.', code: 'INVALID_ACCESS_KEY' })
      return
    }

    let rawBody: unknown
    try {
      rawBody = parseBody(request.body)
    } catch {
      sendJson(response, 400, { error: 'Body JSON non valido.', code: 'INVALID_JSON' })
      return
    }

    const payload = validatePayload(rawBody)
    if (typeof payload === 'string') {
      sendJson(response, 400, { error: payload, code: 'INVALID_PAYLOAD' })
      return
    }

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS)
    try {
      const premium = (config.premium ?? process.env.ANALYSIS_PREMIUM)?.toLowerCase() !== 'false'
      const upstream = await fetch(config.endpoint || process.env.ANALYSIS_ENDPOINT || DEFAULT_ANALYSIS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, premium }),
        signal: controller.signal,
      })
      const text = await upstream.text()
      let upstreamPayload: unknown
      try {
        upstreamPayload = text ? JSON.parse(text) as unknown : {}
      } catch {
        sendJson(response, 502, { error: 'Risposta non valida dal servizio di analisi.', code: 'INVALID_UPSTREAM_RESPONSE' })
        return
      }
      sendJson(response, upstream.status, upstreamPayload)
    } catch (error) {
      const timedOut = error instanceof Error && error.name === 'AbortError'
      sendJson(response, timedOut ? 504 : 502, {
        error: timedOut ? 'Il servizio di analisi non ha risposto in tempo.' : 'Servizio di analisi non raggiungibile.',
        code: timedOut ? 'UPSTREAM_TIMEOUT' : 'UPSTREAM_UNAVAILABLE',
      })
    } finally {
      clearTimeout(timeout)
    }
  }
}

export default createAnalyzeHandler()
