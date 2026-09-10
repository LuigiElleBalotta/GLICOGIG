import { normalizzaBarcode } from '../src/domain/barcodeProduct'
import type {
  BarcodeApiResponse,
  BarcodeNutrimentsBoundary,
  BarcodeProductBoundary,
} from '../src/types/barcode'

const OFF_ENDPOINT = 'https://world.openfoodfacts.org/api/v2/product'
const OFF_FIELDS = 'product_name,product_name_it,brands,nutriments,serving_size,image_front_small_url'
const UPSTREAM_TIMEOUT_MS = 9_000

type QueryValue = string | string[] | undefined

interface ApiRequest {
  method?: string
  query: Record<string, QueryValue>
}

interface ApiResponse {
  statusCode: number
  setHeader(name: string, value: string): void
  end(body: string): void
}

function sendJson(response: ApiResponse, status: number, payload: unknown): void {
  response.statusCode = status
  response.setHeader('Content-Type', 'application/json; charset=utf-8')
  response.setHeader('Cache-Control', 'no-store')
  response.setHeader('X-Content-Type-Options', 'nosniff')
  response.end(JSON.stringify(payload))
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function hasOwn(value: Record<string, unknown>, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(value, key)
}

function allowlistNutriments(value: unknown): BarcodeNutrimentsBoundary | undefined {
  if (!isRecord(value)) return undefined

  const nutriments: BarcodeNutrimentsBoundary = {}
  if (hasOwn(value, 'carbohydrates_100g')) nutriments.carbohydrates_100g = value.carbohydrates_100g
  if (hasOwn(value, 'sugars_100g')) nutriments.sugars_100g = value.sugars_100g
  if (hasOwn(value, 'fiber_100g')) nutriments.fiber_100g = value.fiber_100g
  if (hasOwn(value, 'proteins_100g')) nutriments.proteins_100g = value.proteins_100g
  if (hasOwn(value, 'fat_100g')) nutriments.fat_100g = value.fat_100g
  return nutriments
}

function allowlistProduct(value: Record<string, unknown>): BarcodeProductBoundary {
  const product: BarcodeProductBoundary = {}
  if (hasOwn(value, 'product_name')) product.product_name = value.product_name
  if (hasOwn(value, 'product_name_it')) product.product_name_it = value.product_name_it
  if (hasOwn(value, 'brands')) product.brands = value.brands
  if (hasOwn(value, 'nutriments')) product.nutriments = allowlistNutriments(value.nutriments)
  if (hasOwn(value, 'serving_size')) product.serving_size = value.serving_size
  if (hasOwn(value, 'image_front_small_url')) product.image_front_small_url = value.image_front_small_url
  return product
}

export default async function handler(request: ApiRequest, response: ApiResponse): Promise<void> {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET')
    sendJson(response, 405, { error: 'Metodo non consentito.', code: 'METHOD_NOT_ALLOWED' })
    return
  }

  const queryCode = request.query.code
  const codice = typeof queryCode === 'string' ? normalizzaBarcode(queryCode) : null
  if (!codice) {
    sendJson(response, 400, { error: 'Codice non valido.', code: 'INVALID_BARCODE' })
    return
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS)
  try {
    const url = `${OFF_ENDPOINT}/${encodeURIComponent(codice)}?fields=${OFF_FIELDS}`
    const upstream = await fetch(url, {
      method: 'GET',
      redirect: 'error',
      signal: controller.signal,
    })

    if (upstream.status === 404) {
      const payload: BarcodeApiResponse = { status: 'not_found' }
      sendJson(response, 200, payload)
      return
    }
    if (!upstream.ok) {
      sendJson(response, 502, { error: 'Servizio barcode non disponibile.', code: 'UPSTREAM_ERROR' })
      return
    }

    let upstreamPayload: unknown
    try {
      upstreamPayload = await upstream.json() as unknown
    } catch {
      sendJson(response, 502, { error: 'Risposta non valida dal servizio barcode.', code: 'INVALID_UPSTREAM_RESPONSE' })
      return
    }

    if (!isRecord(upstreamPayload)) {
      sendJson(response, 502, { error: 'Risposta non valida dal servizio barcode.', code: 'INVALID_UPSTREAM_RESPONSE' })
      return
    }
    if (upstreamPayload.status === 0 || !isRecord(upstreamPayload.product)) {
      const payload: BarcodeApiResponse = { status: 'not_found' }
      sendJson(response, 200, payload)
      return
    }
    if (upstreamPayload.status !== 1) {
      sendJson(response, 502, { error: 'Risposta non valida dal servizio barcode.', code: 'INVALID_UPSTREAM_RESPONSE' })
      return
    }

    const payload: BarcodeApiResponse = {
      status: 'found',
      product: allowlistProduct(upstreamPayload.product),
    }
    sendJson(response, 200, payload)
  } catch (error) {
    const timedOut = error instanceof Error && error.name === 'AbortError'
    sendJson(response, timedOut ? 504 : 502, {
      error: timedOut
        ? 'Il servizio barcode non ha risposto in tempo.'
        : 'Servizio barcode non raggiungibile.',
      code: timedOut ? 'UPSTREAM_TIMEOUT' : 'UPSTREAM_UNAVAILABLE',
    })
  } finally {
    clearTimeout(timeout)
  }
}
