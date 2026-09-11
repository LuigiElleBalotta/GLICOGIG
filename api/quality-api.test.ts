import { afterEach, describe, expect, it, vi } from 'vitest'
import barcodeHandler from './barcode'
import { createAnalyzeHandler } from './analyze'
import { createAnalyzeTextHandler } from './analyze-text'

type HeaderValue = string | string[] | undefined

interface AnalysisRequest {
  method?: string
  headers: Record<string, HeaderValue>
  body?: unknown
}

interface BarcodeRequest {
  method?: string
  query: Record<string, string | string[] | undefined>
}

interface RecordedResponse {
  status: number
  headers: Record<string, string>
  body: unknown
  rawBody: string
}

function createResponseRecorder() {
  const headers: Record<string, string> = {}
  let rawBody = ''
  const response = {
    statusCode: 0,
    setHeader: vi.fn((name: string, value: string) => {
      headers[name.toLowerCase()] = value
    }),
    end: vi.fn((body: string) => {
      rawBody = body
    }),
  }

  return {
    response,
    result: (): RecordedResponse => ({
      status: response.statusCode,
      headers,
      body: rawBody ? JSON.parse(rawBody) as unknown : undefined,
      rawBody,
    }),
  }
}

const validPhotoBody = {
  image_base64: 'a'.repeat(100),
  device_id: 'dev_quality-test',
  mime: 'image/jpeg',
  premium: true,
}

const validTextBody = {
  text: '80 g di pane',
  device_id: 'dev_quality-test',
  premium: true,
  lang: 'it',
}

async function invokeAnalyze(
  handler: ReturnType<typeof createAnalyzeHandler>,
  overrides: Partial<AnalysisRequest> = {},
): Promise<RecordedResponse> {
  const recorder = createResponseRecorder()
  const request: AnalysisRequest = {
    method: 'POST',
    headers: { 'x-app-access-key': 'secret' },
    body: validPhotoBody,
    ...overrides,
  }
  await handler(request, recorder.response)
  return recorder.result()
}

async function invokeAnalyzeText(
  handler: ReturnType<typeof createAnalyzeTextHandler>,
  overrides: Partial<AnalysisRequest> = {},
): Promise<RecordedResponse> {
  const recorder = createResponseRecorder()
  const request: AnalysisRequest = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-app-access-key': 'secret',
    },
    body: validTextBody,
    ...overrides,
  }
  await handler(request, recorder.response)
  return recorder.result()
}

async function invokeBarcode(overrides: Partial<BarcodeRequest> = {}): Promise<RecordedResponse> {
  const recorder = createResponseRecorder()
  const request: BarcodeRequest = {
    method: 'GET',
    query: { code: '123456' },
    ...overrides,
  }
  await barcodeHandler(request, recorder.response)
  return recorder.result()
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

function expectSecurityHeaders(result: RecordedResponse): void {
  expect(result.headers).toMatchObject({
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    'x-content-type-options': 'nosniff',
  })
}

afterEach(() => {
  vi.useRealTimers()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
  vi.unstubAllEnvs()
})

describe('api/analyze', () => {
  it('rifiuta metodi diversi da POST prima della configurazione e imposta header sicuri', async () => {
    const fetchMock = vi.fn<typeof fetch>()
    vi.stubGlobal('fetch', fetchMock)

    const result = await invokeAnalyze(createAnalyzeHandler(), {
      method: 'GET',
      headers: {},
      body: undefined,
    })

    expect(result).toMatchObject({
      status: 405,
      body: { code: 'METHOD_NOT_ALLOWED' },
    })
    expect(result.headers.allow).toBe('POST')
    expectSecurityHeaders(result)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('distingue configurazione access key ed endpoint mancanti senza contattare upstream', async () => {
    vi.stubEnv('APP_ACCESS_KEY', '')
    vi.stubEnv('ANALYSIS_ENDPOINT', '')
    const fetchMock = vi.fn<typeof fetch>()
    vi.stubGlobal('fetch', fetchMock)

    const missingKey = await invokeAnalyze(createAnalyzeHandler(), { headers: {} })
    const missingEndpoint = await invokeAnalyze(createAnalyzeHandler({ accessKey: 'secret' }))

    expect(missingKey).toMatchObject({ status: 503, body: { code: 'MISSING_SERVER_CONFIG' } })
    expect(missingEndpoint).toMatchObject({ status: 503, body: { code: 'MISSING_SERVER_CONFIG' } })
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it.each([
    undefined,
    ['secret'],
    'wrong',
    'secre',
  ])('rifiuta header auth non scalare o non corrispondente: %#', async (accessKey) => {
    const fetchMock = vi.fn<typeof fetch>()
    vi.stubGlobal('fetch', fetchMock)
    const result = await invokeAnalyze(createAnalyzeHandler({
      accessKey: 'secret',
      endpoint: 'https://upstream.test/photo',
    }), {
      headers: { 'x-app-access-key': accessKey },
    })

    expect(result).toMatchObject({ status: 401, body: { code: 'INVALID_ACCESS_KEY' } })
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('separa JSON malformato da payload non valido', async () => {
    const fetchMock = vi.fn<typeof fetch>()
    vi.stubGlobal('fetch', fetchMock)
    const handler = createAnalyzeHandler({ accessKey: 'secret', endpoint: 'https://upstream.test/photo' })

    const invalidJson = await invokeAnalyze(handler, { body: '{rotto' })
    const missingBody = await invokeAnalyze(handler, { body: undefined })

    expect(invalidJson).toMatchObject({ status: 400, body: { code: 'INVALID_JSON' } })
    expect(missingBody).toMatchObject({ status: 400, body: { code: 'INVALID_PAYLOAD' } })
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it.each([
    [{ ...validPhotoBody, image_base64: 'a'.repeat(99) }, 'Immagine mancante.'],
    [{ ...validPhotoBody, image_base64: 'a'.repeat(3_900_001) }, 'Immagine troppo grande.'],
    [{ ...validPhotoBody, image_base64: `data:${'a'.repeat(100)}` }, 'Invia il Base64 senza prefisso'],
    [{ ...validPhotoBody, device_id: 'device_quality' }, 'Device ID non valido.'],
    [{ ...validPhotoBody, device_id: `dev_${'x'.repeat(157)}` }, 'Device ID non valido.'],
    [{ ...validPhotoBody, mime: 'image/png' }, 'Formato immagine non supportato.'],
  ])('valida schema e limiti del payload foto %#', async (body, error) => {
    const fetchMock = vi.fn<typeof fetch>()
    vi.stubGlobal('fetch', fetchMock)
    const result = await invokeAnalyze(createAnalyzeHandler({
      accessKey: 'secret',
      endpoint: 'https://upstream.test/photo',
    }), { body })

    expect(result).toMatchObject({
      status: 400,
      body: { code: 'INVALID_PAYLOAD', error: expect.stringContaining(error) },
    })
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('accetta i limiti inclusivi, body stringa senza Content-Type e filtra il payload upstream', async () => {
    const maxBase64 = 'z'.repeat(3_900_000)
    const fetchMock = stubFetch(jsonResponse({ accepted: true }, 202))
    const handler = createAnalyzeHandler({
      accessKey: 'secret',
      endpoint: 'https://upstream.test/photo',
      premium: 'false',
    })
    const result = await invokeAnalyze(handler, {
      headers: { 'x-app-access-key': 'secret' },
      body: JSON.stringify({
        ...validPhotoBody,
        image_base64: maxBase64,
        device_id: `dev_${'x'.repeat(156)}`,
        premium: 'truthy-client-value',
        extra: 'discarded',
      }),
    })

    expect(result).toMatchObject({ status: 202, body: { accepted: true } })
    expectSecurityHeaders(result)
    expect(fetchMock).toHaveBeenCalledOnce()
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe('https://upstream.test/photo')
    expect(init).toMatchObject({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: expect.any(AbortSignal),
    })
    const payload = JSON.parse(String(init?.body)) as Record<string, unknown>
    expect(payload.image_base64).toHaveLength(3_900_000)
    expect(payload).toEqual({
      image_base64: maxBase64,
      device_id: `dev_${'x'.repeat(156)}`,
      mime: 'image/jpeg',
      premium: false,
    })
  })

  it('inoltra status e JSON upstream, normalizzando una risposta vuota', async () => {
    stubFetch(jsonResponse({ limited: true }, 429), new Response(null, { status: 204 }))
    const handler = createAnalyzeHandler({ accessKey: 'secret', endpoint: 'https://upstream.test/photo' })

    const limited = await invokeAnalyze(handler)
    const empty = await invokeAnalyze(handler)

    expect(limited).toMatchObject({ status: 429, body: { limited: true } })
    expect(empty).toMatchObject({ status: 204, body: {} })
  })

  it('mappa JSON upstream malformato e indisponibilità di rete', async () => {
    const fetchMock = vi.fn<typeof fetch>()
      .mockResolvedValueOnce(new Response('{rotto', { status: 200 }))
      .mockRejectedValueOnce(new TypeError('offline'))
    vi.stubGlobal('fetch', fetchMock)
    const handler = createAnalyzeHandler({ accessKey: 'secret', endpoint: 'https://upstream.test/photo' })

    await expect(invokeAnalyze(handler)).resolves.toMatchObject({
      status: 502,
      body: { code: 'INVALID_UPSTREAM_RESPONSE' },
    })
    await expect(invokeAnalyze(handler)).resolves.toMatchObject({
      status: 502,
      body: { code: 'UPSTREAM_UNAVAILABLE' },
    })
  })

  it('aborta upstream dopo 25 secondi e restituisce 504', async () => {
    vi.useFakeTimers()
    const fetchMock = abortingFetch()
    const pending = invokeAnalyze(createAnalyzeHandler({
      accessKey: 'secret',
      endpoint: 'https://upstream.test/photo',
    }))

    await vi.advanceTimersByTimeAsync(25_000)

    await expect(pending).resolves.toMatchObject({
      status: 504,
      body: { code: 'UPSTREAM_TIMEOUT' },
    })
    expect(fetchMock.mock.calls[0][1]?.signal).toBeInstanceOf(AbortSignal)
    expect(fetchMock.mock.calls[0][1]?.signal?.aborted).toBe(true)
  })
})

describe('api/analyze-text', () => {
  it('applica metodo e Content-Type prima di configurazione, auth e body', async () => {
    const fetchMock = vi.fn<typeof fetch>()
    vi.stubGlobal('fetch', fetchMock)
    const handler = createAnalyzeTextHandler()

    const method = await invokeAnalyzeText(handler, { method: 'GET', headers: {} })
    const mediaType = await invokeAnalyzeText(handler, {
      headers: { 'content-type': 'text/plain' },
    })
    const mediaTypeArray = await invokeAnalyzeText(handler, {
      headers: { 'content-type': ['application/json'] },
    })

    expect(method).toMatchObject({ status: 405, body: { code: 'METHOD_NOT_ALLOWED' } })
    expect(method.headers.allow).toBe('POST')
    expect(mediaType).toMatchObject({ status: 415, body: { code: 'UNSUPPORTED_MEDIA_TYPE' } })
    expect(mediaTypeArray).toMatchObject({ status: 415, body: { code: 'UNSUPPORTED_MEDIA_TYPE' } })
    expectSecurityHeaders(method)
    expectSecurityHeaders(mediaType)
    expectSecurityHeaders(mediaTypeArray)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('richiede config server e auth scalare prima del parsing JSON', async () => {
    vi.stubEnv('APP_ACCESS_KEY', '')
    vi.stubEnv('ANALYSIS_TEXT_ENDPOINT', '')
    vi.stubEnv('ANALYSIS_ENDPOINT', '')
    const fetchMock = vi.fn<typeof fetch>()
    vi.stubGlobal('fetch', fetchMock)

    const missingKey = await invokeAnalyzeText(createAnalyzeTextHandler(), { body: '{rotto' })
    const missingEndpoint = await invokeAnalyzeText(createAnalyzeTextHandler({ accessKey: 'secret' }))
    const authArray = await invokeAnalyzeText(createAnalyzeTextHandler({
      accessKey: 'secret',
      endpoint: 'https://upstream.test/text',
    }), {
      headers: {
        'content-type': 'application/json',
        'x-app-access-key': ['secret'],
      },
      body: '{rotto',
    })

    expect(missingKey).toMatchObject({ status: 503, body: { code: 'MISSING_SERVER_CONFIG' } })
    expect(missingEndpoint).toMatchObject({ status: 503, body: { code: 'MISSING_SERVER_CONFIG' } })
    expect(authArray).toMatchObject({ status: 401, body: { code: 'INVALID_ACCESS_KEY' } })
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it.each([undefined, 'wrong', 'secre'])('rifiuta auth testuale mancante o errata: %#', async (accessKey) => {
    const fetchMock = vi.fn<typeof fetch>()
    vi.stubGlobal('fetch', fetchMock)
    const result = await invokeAnalyzeText(createAnalyzeTextHandler({
      accessKey: 'secret',
      endpoint: 'https://upstream.test/text',
    }), {
      headers: {
        'content-type': 'application/json',
        'x-app-access-key': accessKey,
      },
    })

    expect(result).toMatchObject({ status: 401, body: { code: 'INVALID_ACCESS_KEY' } })
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('separa JSON malformato dalla validazione exact-key', async () => {
    const fetchMock = vi.fn<typeof fetch>()
    vi.stubGlobal('fetch', fetchMock)
    const handler = createAnalyzeTextHandler({ accessKey: 'secret', endpoint: 'https://upstream.test/text' })

    const invalidJson = await invokeAnalyzeText(handler, { body: '{rotto' })
    const extraKey = await invokeAnalyzeText(handler, { body: { ...validTextBody, extra: true } })

    expect(invalidJson).toMatchObject({ status: 400, body: { code: 'INVALID_JSON' } })
    expect(extraKey).toMatchObject({ status: 400, body: { code: 'INVALID_PAYLOAD' } })
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it.each([
    [{ text: 'x', device_id: 'dev_x', premium: true }, 'Campi del body non validi.'],
    [{ ...validTextBody, text: 42 }, 'Testo mancante.'],
    [{ ...validTextBody, text: '   ' }, 'Testo mancante.'],
    [{ ...validTextBody, text: 'x'.repeat(2001) }, 'Testo troppo lungo.'],
    [{ ...validTextBody, device_id: 'dev_bad!' }, 'Device ID non valido.'],
    [{ ...validTextBody, device_id: `dev_${'x'.repeat(157)}` }, 'Device ID non valido.'],
    [{ ...validTextBody, premium: 1 }, 'Valore premium non valido.'],
    [{ ...validTextBody, lang: 'pt' }, 'Lingua non supportata.'],
  ])('valida schema, tipi e limiti del payload testo %#', async (body, error) => {
    const fetchMock = vi.fn<typeof fetch>()
    vi.stubGlobal('fetch', fetchMock)
    const result = await invokeAnalyzeText(createAnalyzeTextHandler({
      accessKey: 'secret',
      endpoint: 'https://upstream.test/text',
    }), { body })

    expect(result).toMatchObject({
      status: 400,
      body: { code: 'INVALID_PAYLOAD', error },
    })
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('accetta charset, testo trim a 2000 caratteri e applica premium server-side', async () => {
    const fetchMock = stubFetch(jsonResponse({ e_cibo: false, ingredienti: [] }, 201))
    const handler = createAnalyzeTextHandler({
      accessKey: 'secret',
      endpoint: 'https://upstream.test/text',
      premium: 'false',
    })
    const result = await invokeAnalyzeText(handler, {
      headers: {
        'content-type': ' Application/JSON ; charset=utf-8',
        'x-app-access-key': 'secret',
      },
      body: JSON.stringify({
        ...validTextBody,
        text: `  ${'x'.repeat(2000)}  `,
      }),
    })

    expect(result).toMatchObject({ status: 201, body: { e_cibo: false, ingredienti: [] } })
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe('https://upstream.test/text')
    expect(init).toMatchObject({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      redirect: 'error',
      signal: expect.any(AbortSignal),
    })
    expect(JSON.parse(String(init?.body))).toEqual({
      ...validTextBody,
      text: 'x'.repeat(2000),
      premium: false,
    })
  })

  it.each([
    [{ endpoint: 'https://config.test/text' }, 'https://env-text.test/text', 'https://env-photo.test/photo', 'https://config.test/text'],
    [{}, 'https://env-text.test/text', 'https://env-photo.test/photo', 'https://env-text.test/text'],
    [{}, '', 'https://env-photo.test/photo', 'https://env-photo.test/photo'],
  ])('risolve endpoint config, dedicato e fallback foto %#', async (config, textEnv, photoEnv, expected) => {
    vi.stubEnv('ANALYSIS_TEXT_ENDPOINT', textEnv)
    vi.stubEnv('ANALYSIS_ENDPOINT', photoEnv)
    const fetchMock = stubFetch(jsonResponse({ ok: true }))
    const handler = createAnalyzeTextHandler({ accessKey: 'secret', ...config })

    await invokeAnalyzeText(handler)

    expect(fetchMock.mock.calls[0][0]).toBe(expected)
  })

  it('inoltra status/body vuoto e mappa JSON malformato o rete', async () => {
    const fetchMock = vi.fn<typeof fetch>()
      .mockResolvedValueOnce(jsonResponse({ limited: true }, 429))
      .mockResolvedValueOnce(new Response(null, { status: 204 }))
      .mockResolvedValueOnce(new Response('{rotto', { status: 200 }))
      .mockRejectedValueOnce(new TypeError('offline'))
    vi.stubGlobal('fetch', fetchMock)
    const handler = createAnalyzeTextHandler({ accessKey: 'secret', endpoint: 'https://upstream.test/text' })

    await expect(invokeAnalyzeText(handler)).resolves.toMatchObject({ status: 429, body: { limited: true } })
    await expect(invokeAnalyzeText(handler)).resolves.toMatchObject({ status: 204, body: {} })
    await expect(invokeAnalyzeText(handler)).resolves.toMatchObject({
      status: 502,
      body: { code: 'INVALID_UPSTREAM_RESPONSE' },
    })
    await expect(invokeAnalyzeText(handler)).resolves.toMatchObject({
      status: 502,
      body: { code: 'UPSTREAM_UNAVAILABLE' },
    })
  })

  it('aborta upstream dopo 25 secondi e restituisce 504', async () => {
    vi.useFakeTimers()
    const fetchMock = abortingFetch()
    const pending = invokeAnalyzeText(createAnalyzeTextHandler({
      accessKey: 'secret',
      endpoint: 'https://upstream.test/text',
    }))

    await vi.advanceTimersByTimeAsync(25_000)

    await expect(pending).resolves.toMatchObject({
      status: 504,
      body: { code: 'UPSTREAM_TIMEOUT' },
    })
    expect(fetchMock.mock.calls[0][1]?.signal?.aborted).toBe(true)
  })
})

describe('api/barcode', () => {
  it('rifiuta metodo non GET con header Allow e security header', async () => {
    const fetchMock = vi.fn<typeof fetch>()
    vi.stubGlobal('fetch', fetchMock)
    const result = await invokeBarcode({ method: 'POST' })

    expect(result).toMatchObject({ status: 405, body: { code: 'METHOD_NOT_ALLOWED' } })
    expect(result.headers.allow).toBe('GET')
    expectSecurityHeaders(result)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it.each([
    undefined,
    ['123456'],
    '',
    '12345',
    '123456789012345',
    '12345A',
  ])('rifiuta query barcode non scalare o fuori allowlist: %#', async (code) => {
    const fetchMock = vi.fn<typeof fetch>()
    vi.stubGlobal('fetch', fetchMock)
    const result = await invokeBarcode({ query: { code } })

    expect(result).toMatchObject({ status: 400, body: { code: 'INVALID_BARCODE' } })
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('normalizza il codice e limita URL, campi e opzioni upstream', async () => {
    const fetchMock = stubFetch(jsonResponse({ status: 0 }))
    const result = await invokeBarcode({ query: { code: ' 123456 ' } })

    expect(result).toMatchObject({ status: 200, body: { status: 'not_found' } })
    expect(fetchMock).toHaveBeenCalledOnce()
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe(
      'https://world.openfoodfacts.org/api/v2/product/123456.json?fields=product_name,product_name_it,brands,nutriments,serving_size,image_front_small_url',
    )
    expect(init).toMatchObject({
      method: 'GET',
      redirect: 'error',
      signal: expect.any(AbortSignal),
    })
  })

  it('converte 404 in not_found e altri status upstream in 502', async () => {
    stubFetch(new Response(null, { status: 404 }), new Response(null, { status: 503 }))

    await expect(invokeBarcode()).resolves.toMatchObject({ status: 200, body: { status: 'not_found' } })
    await expect(invokeBarcode()).resolves.toMatchObject({ status: 502, body: { code: 'UPSTREAM_ERROR' } })
  })

  it.each([
    [new Response('{rotto', { status: 200 }), 'INVALID_UPSTREAM_RESPONSE'],
    [jsonResponse(null), 'INVALID_UPSTREAM_RESPONSE'],
    [jsonResponse({ status: 2, product: {} }), 'INVALID_UPSTREAM_RESPONSE'],
  ])('rifiuta JSON o schema upstream non valido %#', async (upstream, code) => {
    stubFetch(upstream)
    await expect(invokeBarcode()).resolves.toMatchObject({ status: 502, body: { code } })
  })

  it.each([
    { status: 0, product: { product_name: 'ignored' } },
    { status: 1 },
    { status: 1, product: null },
  ])('normalizza status 0 o prodotto assente in not_found %#', async (payload) => {
    stubFetch(jsonResponse(payload))
    await expect(invokeBarcode()).resolves.toMatchObject({ status: 200, body: { status: 'not_found' } })
  })

  it('applica allowlist chiusa a prodotto e nutrienti senza mutare i valori', async () => {
    stubFetch(jsonResponse({
      status: 1,
      product: {
        product_name: 'Pane',
        product_name_it: 'Pane italiano',
        brands: 'Marca',
        serving_size: '30 g',
        image_front_small_url: 'https://img.test/pane.png',
        categories: 'secret-extra',
        nutriments: {
          carbohydrates_100g: '42.5',
          sugars_100g: 3,
          fiber_100g: null,
          proteins_100g: 8,
          fat_100g: 2,
          salt_100g: 99,
        },
      },
      extra_root: true,
    }))

    const result = await invokeBarcode()

    expect(result).toEqual({
      status: 200,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'no-store',
        'x-content-type-options': 'nosniff',
      },
      body: {
        status: 'found',
        product: {
          product_name: 'Pane',
          product_name_it: 'Pane italiano',
          brands: 'Marca',
          serving_size: '30 g',
          image_front_small_url: 'https://img.test/pane.png',
          nutriments: {
            carbohydrates_100g: '42.5',
            sugars_100g: 3,
            fiber_100g: null,
            proteins_100g: 8,
            fat_100g: 2,
          },
        },
      },
      rawBody: expect.any(String),
    })
  })

  it('mappa rete in 502 e timeout a 9 secondi in 504', async () => {
    const networkFetch = vi.fn<typeof fetch>().mockRejectedValue(new TypeError('offline'))
    vi.stubGlobal('fetch', networkFetch)
    await expect(invokeBarcode()).resolves.toMatchObject({
      status: 502,
      body: { code: 'UPSTREAM_UNAVAILABLE' },
    })

    vi.useFakeTimers()
    const timeoutFetch = abortingFetch()
    const pending = invokeBarcode()
    await vi.advanceTimersByTimeAsync(9_000)

    await expect(pending).resolves.toMatchObject({
      status: 504,
      body: { code: 'UPSTREAM_TIMEOUT' },
    })
    expect(timeoutFetch.mock.calls[0][1]?.signal?.aborted).toBe(true)
  })
})
