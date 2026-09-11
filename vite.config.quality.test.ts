// @vitest-environment node

import type { IncomingMessage, ServerResponse } from 'node:http'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { ConfigEnv, Plugin, UserConfig } from 'vite'
import barcodeApiHandler from './api/barcode'
import viteConfig from './vite.config'

type Middleware = (
  request: IncomingMessage,
  response: ServerResponse,
  next: () => void,
) => void | Promise<void>

interface Registration {
  path: string
  middleware: Middleware
}

interface RequestOptions {
  method?: string
  url?: string
  headers?: Record<string, string | string[] | undefined>
  chunks?: readonly (string | Buffer)[]
  streamError?: Error
}

interface MiddlewareResult {
  status: number
  headers: Record<string, string>
  body: unknown
  rawBody: string
  end: ReturnType<typeof vi.fn>
  next: ReturnType<typeof vi.fn>
}

const targetPluginNames = [
  'glicogig-analyze-text-dev-middleware',
  'glicogig-analyze-dev-middleware',
  'glicogig-barcode-dev-middleware',
] as const

async function resolvePlugins(mode = 'quality-test'): Promise<Plugin[]> {
  const factory = viteConfig as unknown as (
    env: ConfigEnv,
  ) => UserConfig | Promise<UserConfig>
  const config = await factory({
    command: 'serve',
    mode,
    isSsrBuild: false,
    isPreview: false,
  })

  return (config.plugins ?? []).filter((candidate): candidate is Plugin => (
    typeof candidate === 'object'
    && candidate !== null
    && !Array.isArray(candidate)
    && 'name' in candidate
  ))
}

async function getTargetPlugin(name: typeof targetPluginNames[number]): Promise<Plugin> {
  const plugin = (await resolvePlugins()).find((candidate) => candidate.name === name)
  if (!plugin) throw new Error(`Plugin non trovato: ${name}`)
  return plugin
}

async function registrationsFor(plugin: Plugin, preview = false): Promise<Registration[]> {
  const registrations: Registration[] = []
  const use = vi.fn((path: string, middleware: Middleware) => {
    registrations.push({ path, middleware })
  })
  const server = { middlewares: { use } }
  const rawHook = preview ? plugin.configurePreviewServer : plugin.configureServer
  if (!rawHook) return registrations
  const hook = typeof rawHook === 'function' ? rawHook : rawHook.handler
  await Promise.resolve((hook as (server: unknown) => unknown).call(plugin, server))
  return registrations
}

function createRequest(options: RequestOptions = {}): IncomingMessage {
  const chunks = options.chunks ?? []
  return {
    method: options.method ?? 'GET',
    url: options.url ?? '/',
    headers: options.headers ?? {},
    async *[Symbol.asyncIterator]() {
      for (const chunk of chunks) yield chunk
      if (options.streamError) throw options.streamError
    },
  } as unknown as IncomingMessage
}

function createServerResponse(headersSent = false) {
  const headers: Record<string, string> = {}
  let rawBody = ''
  let sent = headersSent
  const setHeader = vi.fn((name: string, value: string) => {
    headers[name.toLowerCase()] = value
  })
  const end = vi.fn((body?: string) => {
    rawBody = body ?? ''
    sent = true
  })
  const response = {
    statusCode: 200,
    get headersSent() {
      return sent
    },
    setHeader,
    end,
  }

  return {
    response: response as unknown as ServerResponse,
    result: (next: ReturnType<typeof vi.fn>): MiddlewareResult => ({
      status: response.statusCode,
      headers,
      body: rawBody ? JSON.parse(rawBody) as unknown : undefined,
      rawBody,
      end,
      next,
    }),
  }
}

async function runMiddleware(
  registration: Registration,
  requestOptions: RequestOptions,
  headersSent = false,
): Promise<MiddlewareResult> {
  const recorder = createServerResponse(headersSent)
  const next = vi.fn()
  await registration.middleware(createRequest(requestOptions), recorder.response, next)
  return recorder.result(next)
}

function jsonResponse(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

function stubFetch(...responses: Response[]): ReturnType<typeof vi.fn<typeof fetch>> {
  const mock = vi.fn<typeof fetch>()
  for (const response of responses) mock.mockResolvedValueOnce(response)
  vi.stubGlobal('fetch', mock)
  return mock
}

function abortingFetch(): ReturnType<typeof vi.fn<typeof fetch>> {
  const mock = vi.fn<typeof fetch>().mockImplementation((_input, init) => new Promise<Response>((_resolve, reject) => {
    init?.signal?.addEventListener('abort', () => {
      reject(Object.assign(new Error('timeout'), { name: 'AbortError' }))
    }, { once: true })
  }))
  vi.stubGlobal('fetch', mock)
  return mock
}

function expectSecurityHeaders(result: MiddlewareResult): void {
  expect(result.headers).toMatchObject({
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    'x-content-type-options': 'nosniff',
  })
}

async function invokeBarcodeApi(code = '123456'): Promise<Pick<MiddlewareResult, 'status' | 'headers' | 'body'>> {
  const recorder = createServerResponse()
  await barcodeApiHandler({ method: 'GET', query: { code } }, recorder.response)
  const result = recorder.result(vi.fn())
  return { status: result.status, headers: result.headers, body: result.body }
}

afterEach(() => {
  vi.useRealTimers()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
  vi.unstubAllEnvs()
})

describe('registrazione plugin Vite', () => {
  it('registra i tre plugin middleware nell’ordine dichiarato', async () => {
    const names = (await resolvePlugins())
      .map((plugin) => plugin.name)
      .filter((name): name is typeof targetPluginNames[number] => (
        targetPluginNames.includes(name as typeof targetPluginNames[number])
      ))

    expect(names).toEqual(targetPluginNames)
  })

  it('registra route dev e preview previste senza esporre analyze foto in preview', async () => {
    const photo = await getTargetPlugin('glicogig-analyze-dev-middleware')
    const text = await getTargetPlugin('glicogig-analyze-text-dev-middleware')
    const barcode = await getTargetPlugin('glicogig-barcode-dev-middleware')

    await expect(registrationsFor(photo)).resolves.toMatchObject([{ path: '/api/analyze' }])
    await expect(registrationsFor(photo, true)).resolves.toEqual([])
    await expect(registrationsFor(text)).resolves.toMatchObject([{ path: '/api/analyze-text' }])
    await expect(registrationsFor(text, true)).resolves.toMatchObject([{ path: '/api/analyze-text' }])
    await expect(registrationsFor(barcode)).resolves.toMatchObject([{ path: '/api/barcode' }])
    await expect(registrationsFor(barcode, true)).resolves.toMatchObject([{ path: '/api/barcode' }])
  })
})

describe('middleware analyze foto', () => {
  it('inoltra body a chunk e configurazione env allo stesso handler API', async () => {
    vi.stubEnv('APP_ACCESS_KEY', 'secret')
    vi.stubEnv('ANALYSIS_ENDPOINT', 'https://upstream.test/photo')
    vi.stubEnv('ANALYSIS_PREMIUM', 'false')
    const fetchMock = stubFetch(jsonResponse({ accepted: true }, 202))
    const [registration] = await registrationsFor(await getTargetPlugin('glicogig-analyze-dev-middleware'))
    const body = JSON.stringify({
      image_base64: 'a'.repeat(100),
      device_id: 'dev_vite-test',
      mime: 'image/jpeg',
      premium: true,
    })

    const result = await runMiddleware(registration, {
      method: 'POST',
      headers: { 'x-app-access-key': 'secret' },
      chunks: [body.slice(0, 50), Buffer.from(body.slice(50))],
    })

    expect(result).toMatchObject({ status: 202, body: { accepted: true } })
    expectSecurityHeaders(result)
    expect(result.next).not.toHaveBeenCalled()
    expect(fetchMock).toHaveBeenCalledOnce()
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe('https://upstream.test/photo')
    expect(JSON.parse(String(init?.body))).toMatchObject({ premium: false })
  })

  it('accetta esattamente 4.100.000 byte ma rifiuta il byte successivo con 413', async () => {
    vi.stubEnv('APP_ACCESS_KEY', 'secret')
    vi.stubEnv('ANALYSIS_ENDPOINT', 'https://upstream.test/photo')
    const [registration] = await registrationsFor(await getTargetPlugin('glicogig-analyze-dev-middleware'))
    const fetchMock = vi.fn<typeof fetch>()
    vi.stubGlobal('fetch', fetchMock)

    const atLimit = await runMiddleware(registration, {
      method: 'POST',
      headers: { 'x-app-access-key': 'secret' },
      chunks: [Buffer.alloc(4_100_000, 0x20)],
    })
    const overLimit = await runMiddleware(registration, {
      method: 'POST',
      headers: { 'x-app-access-key': 'secret' },
      chunks: [Buffer.alloc(4_100_000), Buffer.from('x')],
    })

    expect(atLimit).toMatchObject({ status: 400, body: { code: 'INVALID_JSON' } })
    expect(overLimit).toMatchObject({
      status: 413,
      body: { code: 'PAYLOAD_TOO_LARGE', error: 'La foto è troppo grande.' },
    })
    expectSecurityHeaders(overLimit)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('mappa errori dello stream a 500 e non risponde due volte se headersSent', async () => {
    const [registration] = await registrationsFor(await getTargetPlugin('glicogig-analyze-dev-middleware'))

    const failed = await runMiddleware(registration, {
      streamError: new Error('stream failed'),
    })
    const alreadySent = await runMiddleware(registration, {
      streamError: new Error('stream failed'),
    }, true)

    expect(failed).toMatchObject({
      status: 500,
      body: { code: 'LOCAL_PROXY_ERROR', error: 'Errore del proxy locale.' },
    })
    expectSecurityHeaders(failed)
    expect(alreadySent.end).not.toHaveBeenCalled()
    expect(alreadySent.rawBody).toBe('')
  })
})

describe('middleware analyze testo', () => {
  it('mantiene parità API in dev e preview, inclusi content-type e fallback endpoint', async () => {
    vi.stubEnv('APP_ACCESS_KEY', 'secret')
    vi.stubEnv('ANALYSIS_TEXT_ENDPOINT', '')
    vi.stubEnv('ANALYSIS_ENDPOINT', 'https://upstream.test/fallback')
    vi.stubEnv('ANALYSIS_PREMIUM', 'false')
    const fetchMock = stubFetch(
      jsonResponse({ e_cibo: false, ingredienti: [] }, 201),
      jsonResponse({ e_cibo: false, ingredienti: [] }, 201),
    )
    const plugin = await getTargetPlugin('glicogig-analyze-text-dev-middleware')
    const [devRegistration] = await registrationsFor(plugin)
    const [previewRegistration] = await registrationsFor(plugin, true)
    const body = JSON.stringify({
      text: ' 80 g di pane ',
      device_id: 'dev_vite-test',
      premium: true,
      lang: 'it',
    })
    const request = {
      method: 'POST',
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'x-app-access-key': 'secret',
      },
      chunks: [body],
    }

    const dev = await runMiddleware(devRegistration, request)
    const preview = await runMiddleware(previewRegistration, request)

    expect(dev).toMatchObject({ status: 201, body: { e_cibo: false, ingredienti: [] } })
    expect(preview).toMatchObject({ status: 201, body: dev.body })
    expect(fetchMock).toHaveBeenCalledTimes(2)
    for (const [url, init] of fetchMock.mock.calls) {
      expect(url).toBe('https://upstream.test/fallback')
      expect(init).toMatchObject({ redirect: 'error' })
      expect(JSON.parse(String(init?.body))).toMatchObject({ text: '80 g di pane', premium: false })
    }
  })

  it('propaga metodo/content-type dal boundary API e applica il limite body prima del metodo', async () => {
    const [registration] = await registrationsFor(await getTargetPlugin('glicogig-analyze-text-dev-middleware'))

    const unsupported = await runMiddleware(registration, {
      method: 'POST',
      headers: { 'content-type': 'text/plain' },
      chunks: ['{}'],
    })
    const oversizedGet = await runMiddleware(registration, {
      method: 'GET',
      chunks: [Buffer.alloc(4_100_001)],
    })

    expect(unsupported).toMatchObject({ status: 415, body: { code: 'UNSUPPORTED_MEDIA_TYPE' } })
    expect(oversizedGet).toMatchObject({
      status: 413,
      body: { code: 'PAYLOAD_TOO_LARGE', error: 'La descrizione è troppo grande.' },
    })
    expectSecurityHeaders(unsupported)
    expectSecurityHeaders(oversizedGet)
  })

  it('mappa errore stream testuale e rispetta headersSent', async () => {
    const [registration] = await registrationsFor(await getTargetPlugin('glicogig-analyze-text-dev-middleware'))

    const failed = await runMiddleware(registration, { streamError: new Error('broken') })
    const alreadySent = await runMiddleware(registration, { streamError: new Error('broken') }, true)

    expect(failed).toMatchObject({
      status: 500,
      body: { code: 'LOCAL_PROXY_ERROR', error: 'Errore del proxy testuale locale.' },
    })
    expect(alreadySent.end).not.toHaveBeenCalled()
  })
})

describe('middleware barcode', () => {
  it('valida metodo e query prima della rete con header coerenti', async () => {
    const fetchMock = vi.fn<typeof fetch>()
    vi.stubGlobal('fetch', fetchMock)
    const [registration] = await registrationsFor(await getTargetPlugin('glicogig-barcode-dev-middleware'))

    const method = await runMiddleware(registration, { method: 'POST', url: '/?code=123456' })
    const invalid = await runMiddleware(registration, { method: 'GET', url: '/?code=12345A' })

    expect(method).toMatchObject({ status: 405, body: { code: 'METHOD_NOT_ALLOWED' } })
    expect(method.headers.allow).toBe('GET')
    expect(invalid).toMatchObject({ status: 400, body: { code: 'INVALID_BARCODE' } })
    expectSecurityHeaders(method)
    expectSecurityHeaders(invalid)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('usa il primo parametro, URL allowlisted e opzioni redirect/signal', async () => {
    const fetchMock = stubFetch(jsonResponse({ status: 0 }))
    const [registration] = await registrationsFor(await getTargetPlugin('glicogig-barcode-dev-middleware'))

    const result = await runMiddleware(registration, {
      method: 'GET',
      url: '/?code=123456&code=999999',
    })

    expect(result).toMatchObject({ status: 200, body: { status: 'not_found' } })
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe(
      'https://world.openfoodfacts.org/api/v2/product/123456.json?fields=product_name,product_name_it,brands,nutriments,serving_size,image_front_small_url',
    )
    expect(init).toMatchObject({ method: 'GET', redirect: 'error', signal: expect.any(AbortSignal) })
  })

  const parityScenarios: ReadonlyArray<readonly [string, () => Response]> = [
    ['404', () => new Response(null, { status: 404 })],
    ['errore upstream', () => new Response(null, { status: 503 })],
    ['JSON malformato', () => new Response('{rotto', { status: 200 })],
    ['status not found', () => jsonResponse({ status: 0 })],
    ['status inatteso', () => jsonResponse({ status: 2, product: {} })],
    ['found allowlisted', () => jsonResponse({
      status: 1,
      product: {
        product_name: 'Pane',
        categories: 'discarded',
        nutriments: { carbohydrates_100g: 42, salt_100g: 9 },
      },
    })],
  ]

  it.each(parityScenarios)('mantiene parità con api/barcode per %s', async (_name, responseFactory) => {
    const fetchMock = vi.fn<typeof fetch>()
      .mockImplementation(async () => responseFactory())
    vi.stubGlobal('fetch', fetchMock)
    const [registration] = await registrationsFor(await getTargetPlugin('glicogig-barcode-dev-middleware'))

    const middlewareResult = await runMiddleware(registration, {
      method: 'GET',
      url: '/?code=123456',
    })
    const apiResult = await invokeBarcodeApi()

    expect({
      status: middlewareResult.status,
      headers: middlewareResult.headers,
      body: middlewareResult.body,
    }).toEqual(apiResult)
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('mantiene parità sugli errori di rete', async () => {
    const fetchMock = vi.fn<typeof fetch>().mockRejectedValue(new TypeError('offline'))
    vi.stubGlobal('fetch', fetchMock)
    const [registration] = await registrationsFor(await getTargetPlugin('glicogig-barcode-dev-middleware'))

    const middlewareResult = await runMiddleware(registration, {
      method: 'GET',
      url: '/?code=123456',
    })
    const apiResult = await invokeBarcodeApi()

    expect(middlewareResult).toMatchObject({ status: 502, body: { code: 'UPSTREAM_UNAVAILABLE' } })
    expect({
      status: middlewareResult.status,
      headers: middlewareResult.headers,
      body: middlewareResult.body,
    }).toEqual(apiResult)
  })

  it('aborta OpenFoodFacts a 9 secondi e restituisce 504', async () => {
    vi.useFakeTimers()
    const fetchMock = abortingFetch()
    const [registration] = await registrationsFor(await getTargetPlugin('glicogig-barcode-dev-middleware'))
    const pending = runMiddleware(registration, {
      method: 'GET',
      url: '/?code=123456',
    })

    await vi.advanceTimersByTimeAsync(9_000)

    await expect(pending).resolves.toMatchObject({
      status: 504,
      body: { code: 'UPSTREAM_TIMEOUT' },
    })
    expect(fetchMock.mock.calls[0][1]?.signal?.aborted).toBe(true)
  })
})
