import { normalizzaBarcode, prodottoBarcodeDaBoundary } from '../domain/barcodeProduct'
import type {
  BarcodeNutrimentsBoundary,
  BarcodeProductBoundary,
  RisultatoBarcode,
} from '../types/barcode'

const BARCODE_ENDPOINT = '/api/barcode'
const PRODUCT_KEYS = new Set([
  'product_name',
  'product_name_it',
  'brands',
  'nutriments',
  'serving_size',
  'image_front_small_url',
])
const NUTRIMENT_KEYS = new Set([
  'carbohydrates_100g',
  'sugars_100g',
  'fiber_100g',
  'proteins_100g',
  'fat_100g',
])

type TextBoundaryKey = 'product_name' | 'product_name_it' | 'brands' | 'serving_size' | 'image_front_small_url'

export interface BarcodeLookupOptions {
  signal?: AbortSignal
}

export class BarcodeServiceError extends Error {
  constructor(
    message: string,
    readonly code: string,
    readonly status?: number,
  ) {
    super(message)
    this.name = 'BarcodeServiceError'
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function hasOnlyKeys(value: Record<string, unknown>, allowed: ReadonlySet<string>): boolean {
  return Object.keys(value).every((key) => allowed.has(key))
}

function parseNutriments(value: unknown): BarcodeNutrimentsBoundary | undefined {
  if (value === undefined) return undefined
  if (!isRecord(value) || !hasOnlyKeys(value, NUTRIMENT_KEYS)) {
    throw new BarcodeServiceError('Risposta barcode non valida.', 'INVALID_RESPONSE')
  }
  return {
    carbohydrates_100g: value.carbohydrates_100g,
    sugars_100g: value.sugars_100g,
    fiber_100g: value.fiber_100g,
    proteins_100g: value.proteins_100g,
    fat_100g: value.fat_100g,
  }
}

function parseProduct(value: unknown): BarcodeProductBoundary {
  if (!isRecord(value) || !hasOnlyKeys(value, PRODUCT_KEYS)) {
    throw new BarcodeServiceError('Risposta barcode non valida.', 'INVALID_RESPONSE')
  }

  const textKeys: readonly TextBoundaryKey[] = [
    'product_name',
    'product_name_it',
    'brands',
    'serving_size',
    'image_front_small_url',
  ]
  for (const key of textKeys) {
    if (value[key] !== undefined && typeof value[key] !== 'string') {
      throw new BarcodeServiceError('Risposta barcode non valida.', 'INVALID_RESPONSE')
    }
  }

  return {
    product_name: value.product_name,
    product_name_it: value.product_name_it,
    brands: value.brands,
    nutriments: parseNutriments(value.nutriments),
    serving_size: value.serving_size,
    image_front_small_url: value.image_front_small_url,
  }
}

function parseResponse(value: unknown): { status: 'found'; product: BarcodeProductBoundary } | { status: 'not_found' } {
  if (!isRecord(value)) {
    throw new BarcodeServiceError('Risposta barcode non valida.', 'INVALID_RESPONSE')
  }
  if (value.status === 'not_found' && hasOnlyKeys(value, new Set(['status']))) {
    return { status: 'not_found' }
  }
  if (value.status === 'found' && hasOnlyKeys(value, new Set(['status', 'product']))) {
    return { status: 'found', product: parseProduct(value.product) }
  }
  throw new BarcodeServiceError('Risposta barcode non valida.', 'INVALID_RESPONSE')
}

function errorMessage(value: unknown): string | undefined {
  return isRecord(value) && typeof value.error === 'string' ? value.error : undefined
}

export async function cercaProdotto(
  value: string,
  options: BarcodeLookupOptions = {},
): Promise<RisultatoBarcode> {
  const codice = normalizzaBarcode(value)
  if (!codice) {
    throw new BarcodeServiceError('Codice non valido.', 'INVALID_BARCODE', 400)
  }

  let response: Response
  try {
    response = await fetch(`${BARCODE_ENDPOINT}?code=${encodeURIComponent(codice)}`, {
      method: 'GET',
      signal: options.signal,
      cache: 'no-store',
      credentials: 'omit',
      referrerPolicy: 'no-referrer',
    })
  } catch (error) {
    if (error instanceof BarcodeServiceError) throw error
    throw new BarcodeServiceError('Servizio barcode non raggiungibile.', 'NETWORK_ERROR')
  }

  const contentType = response.headers.get('content-type')?.split(';', 1)[0].trim().toLowerCase() ?? ''
  const text = await response.text()
  if (contentType !== 'application/json' && !contentType.endsWith('+json')) {
    throw new BarcodeServiceError(
      'Proxy barcode non disponibile o non configurato.',
      'PROXY_UNAVAILABLE',
      response.status,
    )
  }

  let payload: unknown
  try {
    payload = text ? JSON.parse(text) as unknown : null
  } catch {
    throw new BarcodeServiceError('Risposta JSON del proxy barcode non valida.', 'INVALID_RESPONSE', response.status)
  }

  if (!response.ok) {
    throw new BarcodeServiceError(
      errorMessage(payload) ?? 'Ricerca barcode non riuscita.',
      'LOOKUP_FAILED',
      response.status,
    )
  }

  const result = parseResponse(payload)
  if (result.status === 'not_found') return result
  return { status: 'found', product: prodottoBarcodeDaBoundary(codice, result.product) }
}
