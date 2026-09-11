import { timingSafeEqual } from 'node:crypto'
import {
  ANALYSIS_LANGUAGES,
  type AnalizzaTestoRequest,
  type AnalysisLanguage,
} from '../src/types/analysis'

const MAX_TEXT_LENGTH = 2000
const UPSTREAM_TIMEOUT_MS = 25_000
const DEVICE_ID_PATTERN = /^dev_[A-Za-z0-9_-]+$/
const EXPECTED_KEYS = ['device_id', 'lang', 'premium', 'text']

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

export interface AnalyzeTextHandlerConfig {
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

function isAnalysisLanguage(value: unknown): value is AnalysisLanguage {
  return typeof value === 'string' && (ANALYSIS_LANGUAGES as readonly string[]).includes(value)
}

function hasExactKeys(value: Record<string, unknown>): boolean {
  const keys = Object.keys(value).sort()
  return keys.length === EXPECTED_KEYS.length && keys.every((key, index) => key === EXPECTED_KEYS[index])
}

function validatePayload(body: unknown): AnalizzaTestoRequest | string {
  if (!isRecord(body)) return 'Body JSON mancante.'
  if (!hasExactKeys(body)) return 'Campi del body non validi.'
  if (typeof body.text !== 'string') return 'Testo mancante.'
  const text = body.text.trim()
  if (!text) return 'Testo mancante.'
  if (text.length > MAX_TEXT_LENGTH) return 'Testo troppo lungo.'
  if (
    typeof body.device_id !== 'string'
    || body.device_id.length > 160
    || !DEVICE_ID_PATTERN.test(body.device_id)
  ) return 'Device ID non valido.'
  if (typeof body.premium !== 'boolean') return 'Valore premium non valido.'
  if (!isAnalysisLanguage(body.lang)) return 'Lingua non supportata.'
  return { text, device_id: body.device_id, premium: body.premium, lang: body.lang }
}

/** Boundary server-side per l’analisi testuale; il browser comunica solo con questo endpoint same-origin. */
export function createAnalyzeTextHandler(config: AnalyzeTextHandlerConfig = {}) {
  return async function handler(request: ApiRequest, response: ApiResponse): Promise<void> {
    if (request.method !== 'POST') {
      response.setHeader('Allow', 'POST')
      sendJson(response, 405, { error: 'Metodo non consentito.', code: 'METHOD_NOT_ALLOWED' })
      return
    }

    const contentType = request.headers['content-type']
    if (
      typeof contentType !== 'string'
      || contentType.split(';', 1)[0].trim().toLowerCase() !== 'application/json'
    ) {
      sendJson(response, 415, { error: 'Content-Type non supportato.', code: 'UNSUPPORTED_MEDIA_TYPE' })
      return
    }

    const expectedAccessKey = config.accessKey || process.env.APP_ACCESS_KEY
    if (!expectedAccessKey) {
      sendJson(response, 503, { error: 'APP_ACCESS_KEY non configurata sul server.', code: 'MISSING_SERVER_CONFIG' })
      return
    }

    const endpoint = config.endpoint || process.env.ANALYSIS_TEXT_ENDPOINT || process.env.ANALYSIS_ENDPOINT
    if (!endpoint) {
      sendJson(response, 503, { error: 'Endpoint di analisi testuale non configurato sul server.', code: 'MISSING_SERVER_CONFIG' })
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

    const parsed = validatePayload(rawBody)
    if (typeof parsed === 'string') {
      sendJson(response, 400, { error: parsed, code: 'INVALID_PAYLOAD' })
      return
    }

    const premium = (config.premium ?? process.env.ANALYSIS_PREMIUM)?.toLowerCase() !== 'false'
    const payload: AnalizzaTestoRequest = { ...parsed, premium }
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS)
    try {
      const upstream = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        redirect: 'error',
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

export default createAnalyzeTextHandler()
