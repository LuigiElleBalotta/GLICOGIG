import type { IncomingMessage, ServerResponse } from 'node:http'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { createAnalyzeHandler, type AnalyzeHandlerConfig } from './api/analyze'
import { createAnalyzeTextHandler, type AnalyzeTextHandlerConfig } from './api/analyze-text'

const offEndpoint = 'https://world.openfoodfacts.org/api/v2/product'
const offFields = 'product_name,product_name_it,brands,nutriments,serving_size,image_front_small_url'
const barcodePattern = /^\d{6,14}$/
const barcodeTimeoutMs = 9_000
const maxAnalyzeBodyBytes = 4_100_000

const SOURCE_CHUNKS = new Map<string, string>([
  ['/src/data/verified-1.0.16-catalog.json', 'dataset-catalog'],
  ['/src/data/verified-1.0.16-learning.json', 'dataset-learning'],
  ['/src/data/verified-1.0.16-quiz.json', 'dataset-quiz'],
  ['/src/data/verified-1.0.16-recipes-01.json', 'dataset-recipes-01'],
  ['/src/data/verified-1.0.16-recipes-02.json', 'dataset-recipes-02'],
  ['/src/data/verified-1.0.16-recipes-03.json', 'dataset-recipes-03'],
  ['/src/i18n/resources/it.ts', 'i18n-it'],
  ['/src/i18n/resources/en.ts', 'i18n-en'],
  ['/src/i18n/resources/es.ts', 'i18n-es'],
  ['/src/i18n/resources/de.ts', 'i18n-de'],
  ['/src/i18n/resources/fr.ts', 'i18n-fr'],
  ['/src/screens/AdviceScreen.tsx', 'screen-advice'],
  ['/src/screens/DiaryScreen.tsx', 'screen-diary'],
  ['/src/screens/ExplanationScreen.tsx', 'screen-explanation'],
  ['/src/screens/HomeScreen.tsx', 'screen-home'],
  ['/src/screens/LearnScreen.tsx', 'screen-learn'],
  ['/src/screens/MealScreen.tsx', 'screen-meal'],
  ['/src/screens/PhotoScreen.tsx', 'screen-photo'],
  ['/src/screens/RecipesScreen.tsx', 'screen-recipes'],
  ['/src/screens/SearchScreen.tsx', 'screen-search'],
])

const FRAMEWORK_PACKAGES = ['react', 'react-dom', 'scheduler', 'i18next', 'react-i18next'] as const

function isNodeModulePackage(id: string, packageName: string): boolean {
  return id.includes(`/node_modules/${packageName}/`)
}

function manualChunks(id: string): string | undefined {
  const normalizedId = id.replace(/\\/g, '/').split('?', 1)[0]

  for (const [modulePath, chunkName] of SOURCE_CHUNKS) {
    if (normalizedId.endsWith(modulePath)) return chunkName
  }
  if (normalizedId.includes('/node_modules/@zxing/')) return 'zxing'
  if (FRAMEWORK_PACKAGES.some((packageName) => isNodeModulePackage(normalizedId, packageName))) {
    return 'framework'
  }
  return undefined
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function hasOwn(value: Record<string, unknown>, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(value, key)
}

function allowlistNutriments(value: unknown): Record<string, unknown> | undefined {
  if (!isRecord(value)) return undefined

  const nutriments: Record<string, unknown> = {}
  for (const key of ['carbohydrates_100g', 'sugars_100g', 'fiber_100g', 'proteins_100g', 'fat_100g']) {
    if (hasOwn(value, key)) nutriments[key] = value[key]
  }
  return nutriments
}

function allowlistProduct(value: Record<string, unknown>): Record<string, unknown> {
  const product: Record<string, unknown> = {}
  for (const key of ['product_name', 'product_name_it', 'brands', 'serving_size', 'image_front_small_url']) {
    if (hasOwn(value, key)) product[key] = value[key]
  }
  if (hasOwn(value, 'nutriments')) product.nutriments = allowlistNutriments(value.nutriments)
  return product
}

function sendJson(response: ServerResponse, status: number, payload: unknown): void {
  response.statusCode = status
  response.setHeader('Content-Type', 'application/json; charset=utf-8')
  response.setHeader('Cache-Control', 'no-store')
  response.setHeader('X-Content-Type-Options', 'nosniff')
  response.end(JSON.stringify(payload))
}

async function readRequestBody(request: IncomingMessage): Promise<string> {
  const chunks: Buffer[] = []
  let size = 0

  for await (const chunk of request) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
    size += buffer.length
    if (size > maxAnalyzeBodyBytes) throw new RangeError('PAYLOAD_TOO_LARGE')
    chunks.push(buffer)
  }
  return Buffer.concat(chunks).toString('utf8')
}

function analyzeDevMiddleware(config: AnalyzeHandlerConfig): Plugin {
  const handler = createAnalyzeHandler(config)
  return {
    name: 'glicogig-analyze-dev-middleware',
    configureServer(server) {
      server.middlewares.use('/api/analyze', async (request, response) => {
        try {
          const body = await readRequestBody(request)
          await handler({ method: request.method, headers: request.headers, body }, response)
        } catch (error) {
          if (response.headersSent) return
          const tooLarge = error instanceof RangeError && error.message === 'PAYLOAD_TOO_LARGE'
          sendJson(response, tooLarge ? 413 : 500, {
            error: tooLarge ? 'La foto è troppo grande.' : 'Errore del proxy locale.',
            code: tooLarge ? 'PAYLOAD_TOO_LARGE' : 'LOCAL_PROXY_ERROR',
          })
        }
      })
    },
  }
}

function analyzeTextDevMiddleware(config: AnalyzeTextHandlerConfig): Plugin {
  const handler = createAnalyzeTextHandler(config)
  const middleware = async (request: IncomingMessage, response: ServerResponse) => {
    try {
      const body = await readRequestBody(request)
      await handler({ method: request.method, headers: request.headers, body }, response)
    } catch (error) {
      if (response.headersSent) return
      const tooLarge = error instanceof RangeError && error.message === 'PAYLOAD_TOO_LARGE'
      sendJson(response, tooLarge ? 413 : 500, {
        error: tooLarge ? 'La descrizione è troppo grande.' : 'Errore del proxy testuale locale.',
        code: tooLarge ? 'PAYLOAD_TOO_LARGE' : 'LOCAL_PROXY_ERROR',
      })
    }
  }

  return {
    name: 'glicogig-analyze-text-dev-middleware',
    configureServer(server) {
      server.middlewares.use('/api/analyze-text', middleware)
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/analyze-text', middleware)
    },
  }
}

function barcodeDevMiddleware(): Plugin {
  const middleware = async (request: IncomingMessage, response: ServerResponse) => {
    if (request.method !== 'GET') {
      response.setHeader('Allow', 'GET')
      sendJson(response, 405, { error: 'Metodo non consentito.', code: 'METHOD_NOT_ALLOWED' })
      return
    }

    const requestUrl = new URL(request.url ?? '/', 'http://localhost')
    const code = requestUrl.searchParams.get('code')?.trim() ?? ''
    if (!barcodePattern.test(code)) {
      sendJson(response, 400, { error: 'Codice non valido.', code: 'INVALID_BARCODE' })
      return
    }

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), barcodeTimeoutMs)
    try {
      const url = `${offEndpoint}/${encodeURIComponent(code)}.json?fields=${offFields}`
      const upstream = await fetch(url, {
        method: 'GET',
        redirect: 'error',
        signal: controller.signal,
      })

      if (upstream.status === 404) {
        sendJson(response, 200, { status: 'not_found' })
        return
      }
      if (!upstream.ok) {
        sendJson(response, 502, { error: 'Servizio barcode non disponibile.', code: 'UPSTREAM_ERROR' })
        return
      }

      let payload: unknown
      try {
        payload = await upstream.json() as unknown
      } catch {
        sendJson(response, 502, { error: 'Risposta non valida dal servizio barcode.', code: 'INVALID_UPSTREAM_RESPONSE' })
        return
      }

      if (!isRecord(payload)) {
        sendJson(response, 502, { error: 'Risposta non valida dal servizio barcode.', code: 'INVALID_UPSTREAM_RESPONSE' })
        return
      }
      if (payload.status === 0 || !isRecord(payload.product)) {
        sendJson(response, 200, { status: 'not_found' })
        return
      }
      if (payload.status !== 1) {
        sendJson(response, 502, { error: 'Risposta non valida dal servizio barcode.', code: 'INVALID_UPSTREAM_RESPONSE' })
        return
      }

      sendJson(response, 200, {
        status: 'found',
        product: allowlistProduct(payload.product),
      })
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

  return {
    name: 'glicogig-barcode-dev-middleware',
    configureServer(server) {
      server.middlewares.use('/api/barcode', middleware)
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/barcode', middleware)
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      react(),
      tailwindcss(),
      analyzeTextDevMiddleware({
        accessKey: env.APP_ACCESS_KEY,
        endpoint: env.ANALYSIS_TEXT_ENDPOINT || env.ANALYSIS_ENDPOINT,
        premium: env.ANALYSIS_PREMIUM,
      }),
      analyzeDevMiddleware({
        accessKey: env.APP_ACCESS_KEY,
        endpoint: env.ANALYSIS_ENDPOINT,
        premium: env.ANALYSIS_PREMIUM,
      }),
      barcodeDevMiddleware(),
    ],
    build: {
      manifest: 'vite-manifest.json',
      rollupOptions: {
        output: {
          manualChunks,
        },
      },
    },
  }
})
