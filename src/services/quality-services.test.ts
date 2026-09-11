import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  AnalysisError,
  createPhotoAnalysisService,
  parseAnalizzaResponse,
  readAnalysisResponse,
} from './photoAnalysisService'
import { createTextAnalysisService } from './textAnalysisService'
import { BarcodeServiceError, cercaProdotto } from './barcodeService'
import {
  formatFileSize,
  prepareImage,
} from './imagePreparation'
import { condividiCard, creaCardPng, type ShareCardData } from './shareCard'

const validAnalysis = {
  e_cibo: true,
  ingredienti: [{ nome: ' Pane ', grammi: 80 }],
  piatto: 'Pane',
  confidenza: 0.9,
}

function responseWithJson(payload: unknown, status = 200, contentType = 'application/json'): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': contentType },
  })
}

function fetchStub(response: Response): ReturnType<typeof vi.fn<typeof fetch>> {
  const stub = vi.fn<typeof fetch>().mockResolvedValue(response)
  vi.stubGlobal('fetch', stub)
  return stub
}

afterEach(() => {
  vi.useRealTimers()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('photoAnalysisService', () => {
  it.each(['https://api.example.test/analyze', '//api.example.test/analyze', 'api/analyze'])(
    'rifiuta endpoint non same-origin: %s',
    (endpoint) => {
      expect(() => createPhotoAnalysisService({ endpoint, premium: true })).toThrow(/same-origin/)
    },
  )

  it('invia solo il payload previsto, header opzionale e lo stesso AbortSignal', async () => {
    const fetchMock = fetchStub(responseWithJson({ ...validAnalysis, extra: 'scartato' }))
    const controller = new AbortController()
    const service = createPhotoAnalysisService({ endpoint: '/custom/analyze', premium: false })

    await expect(service.analyze({
      imageBase64: 'base64-puro',
      accessKey: 'segreto',
      signal: controller.signal,
    })).resolves.toEqual({
      e_cibo: true,
      ingredienti: [{ nome: 'Pane', grammi: 80 }],
      piatto: 'Pane',
      confidenza: 0.9,
    })

    expect(fetchMock).toHaveBeenCalledOnce()
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe('/custom/analyze')
    expect(init).toMatchObject({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-App-Access-Key': 'segreto',
      },
      signal: controller.signal,
    })
    expect(JSON.parse(String(init?.body))).toEqual({
      image_base64: 'base64-puro',
      device_id: expect.stringMatching(/^dev_/),
      mime: 'image/jpeg',
      premium: false,
    })
  })

  it('non invia X-App-Access-Key quando la chiave è vuota', async () => {
    const fetchMock = fetchStub(responseWithJson(validAnalysis))
    const service = createPhotoAnalysisService({ endpoint: '/api/analyze', premium: true })

    await service.analyze({ imageBase64: 'abc', accessKey: '' })

    expect(fetchMock.mock.calls[0][1]?.headers).toEqual({ 'Content-Type': 'application/json' })
  })

  it.each([
    [400, 'BAD_PHOTO', 'Non riesco ad analizzare questa foto.'],
    [401, undefined, 'Password non corretta.'],
    [402, undefined, 'Al momento non è possibile'],
    [413, undefined, 'La foto è troppo grande.'],
    [429, undefined, 'troppe analisi'],
    [503, 'UPSTREAM_DOWN', 'Analisi non riuscita.'],
  ])('mappa status %i e conserva il code server', async (status, code, message) => {
    fetchStub(responseWithJson(code ? { code } : {}, status))
    const service = createPhotoAnalysisService({ endpoint: '/api/analyze', premium: true })

    await expect(service.analyze({ imageBase64: 'abc' })).rejects.toMatchObject({
      name: 'AnalysisError',
      status,
      code: code ?? 'ANALYSIS_ERROR',
      message: expect.stringContaining(message),
    })
  })

  it('tratta testo non JSON di errore come errore HTTP e JSON malformato 2xx come schema invalido', async () => {
    const service = createPhotoAnalysisService({ endpoint: '/api/analyze', premium: true })
    const fetchMock = vi.fn<typeof fetch>()
      .mockResolvedValueOnce(new Response('gateway down', { status: 502 }))
      .mockResolvedValueOnce(new Response('{rotto', { status: 200 }))
    vi.stubGlobal('fetch', fetchMock)

    await expect(service.analyze({ imageBase64: 'abc' })).rejects.toMatchObject({ status: 502 })
    await expect(service.analyze({ imageBase64: 'abc' })).rejects.toBeInstanceOf(AnalysisError)
  })

  it('distingue network failure e abort preservando l’errore AbortError', async () => {
    const abort = Object.assign(new Error('annullata'), { name: 'AbortError' })
    const fetchMock = vi.fn<typeof fetch>()
      .mockRejectedValueOnce(new TypeError('offline'))
      .mockRejectedValueOnce(abort)
    vi.stubGlobal('fetch', fetchMock)
    const service = createPhotoAnalysisService({ endpoint: '/api/analyze', premium: true })

    await expect(service.analyze({ imageBase64: 'abc' })).rejects.toMatchObject({
      status: 0,
      code: 'NETWORK_ERROR',
    })
    await expect(service.analyze({ imageBase64: 'abc' })).rejects.toBe(abort)
  })

  it('normalizza ingredienti assenti per non-cibo e body vuoto', async () => {
    expect(parseAnalizzaResponse({ e_cibo: false })).toEqual({ e_cibo: false, ingredienti: [] })
    await expect(readAnalysisResponse(new Response('', { status: 200 }))).resolves.toBeNull()
  })

  it.each([
    null,
    {},
    { e_cibo: 'true', ingredienti: [] },
    { e_cibo: true },
    { e_cibo: false, ingredienti: {} },
    { e_cibo: true, ingredienti: [null] },
    { e_cibo: true, ingredienti: [{ nome: ' ', grammi: 10 }] },
    { e_cibo: true, ingredienti: [{ nome: 'x', grammi: Number.NaN }] },
    { e_cibo: true, ingredienti: [{ nome: 'x', grammi: -0.1 }] },
    { e_cibo: true, ingredienti: [{ nome: 'x', grammi: 2000.1 }] },
    { e_cibo: true, ingredienti: [], confidenza: Number.POSITIVE_INFINITY },
    { e_cibo: true, ingredienti: [], piatto: 1 },
    { e_cibo: true, ingredienti: [{ nome: 'x', grammi: 1, cottura: 4 }] },
  ])('rifiuta schema di analisi non valido %#', (payload) => {
    expect(() => parseAnalizzaResponse(payload)).toThrow(AnalysisError)
  })

  it('accetta i limiti inclusivi degli ingredienti e i campi nullable', () => {
    expect(parseAnalizzaResponse({
      e_cibo: true,
      ingredienti: [
        { nome: 'zero', grammi: 0, catalogo_id: null },
        { nome: 'max', grammi: 2000, cottura: null, maturazione: 'maturo' },
      ],
      quando_ha_senso: 'sempre',
    })).toEqual({
      e_cibo: true,
      ingredienti: [
        { nome: 'zero', grammi: 0, catalogo_id: null },
        { nome: 'max', grammi: 2000, cottura: null, maturazione: 'maturo' },
      ],
      quando_ha_senso: 'sempre',
    })
  })
})

describe('textAnalysisService', () => {
  it.each(['https://api.example.test/text', '//api.example.test/text', 'api/text'])(
    'rifiuta endpoint non same-origin: %s',
    (endpoint) => {
      expect(() => createTextAnalysisService({ endpoint, premium: true })).toThrow(/same-origin/)
    },
  )

  it.each(['', '   ', 'x'.repeat(2001)])('rifiuta testo vuoto o oltre limite senza fetch', async (text) => {
    const fetchMock = vi.fn<typeof fetch>()
    vi.stubGlobal('fetch', fetchMock)
    const service = createTextAnalysisService({ endpoint: '/api/analyze-text', premium: true })

    await expect(service.analyze({ text, lang: 'it' })).rejects.toMatchObject({
      status: 400,
      code: 'INVALID_TEXT',
    })
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('accetta 2000 caratteri, trimma e inoltra lingua, header e signal', async () => {
    const fetchMock = fetchStub(responseWithJson(validAnalysis))
    const controller = new AbortController()
    const service = createTextAnalysisService({ endpoint: '/custom/text', premium: false })
    const text = `  ${'x'.repeat(2000)}  `

    await service.analyze({ text, lang: 'en', accessKey: 'chiave', signal: controller.signal })

    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe('/custom/text')
    expect(init).toMatchObject({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-App-Access-Key': 'chiave',
      },
      signal: controller.signal,
    })
    expect(JSON.parse(String(init?.body))).toEqual({
      text: 'x'.repeat(2000),
      device_id: expect.stringMatching(/^dev_/),
      premium: false,
      lang: 'en',
    })
  })

  it('mappa status testuali, errori rete e abort', async () => {
    const abort = Object.assign(new Error('stop'), { name: 'AbortError' })
    const fetchMock = vi.fn<typeof fetch>()
      .mockResolvedValueOnce(responseWithJson({ code: 'TOO_LONG' }, 413))
      .mockRejectedValueOnce(new Error('offline'))
      .mockRejectedValueOnce(abort)
    vi.stubGlobal('fetch', fetchMock)
    const service = createTextAnalysisService({ endpoint: '/api/analyze-text', premium: true })

    await expect(service.analyze({ text: 'pane', lang: 'it' })).rejects.toMatchObject({
      status: 413,
      code: 'TOO_LONG',
      message: 'La descrizione è troppo lunga.',
    })
    await expect(service.analyze({ text: 'pane', lang: 'it' })).rejects.toMatchObject({ code: 'NETWORK_ERROR' })
    await expect(service.analyze({ text: 'pane', lang: 'it' })).rejects.toBe(abort)
  })
})

describe('barcodeService', () => {
  it.each(['', '12345', '123456789012345', '12345A', ' 123 456 '])(
    'rifiuta barcode non valido senza rete: %s',
    async (code) => {
      const fetchMock = vi.fn<typeof fetch>()
      vi.stubGlobal('fetch', fetchMock)
      await expect(cercaProdotto(code)).rejects.toMatchObject({
        name: 'BarcodeServiceError',
        code: 'INVALID_BARCODE',
        status: 400,
      })
      expect(fetchMock).not.toHaveBeenCalled()
    },
  )

  it('normalizza il codice e usa opzioni fetch privacy-preserving', async () => {
    const fetchMock = fetchStub(responseWithJson({ status: 'not_found' }))
    const controller = new AbortController()

    await expect(cercaProdotto(' 123456 ', { signal: controller.signal })).resolves.toEqual({ status: 'not_found' })

    expect(fetchMock).toHaveBeenCalledWith('/api/barcode?code=123456', {
      method: 'GET',
      signal: controller.signal,
      cache: 'no-store',
      credentials: 'omit',
      referrerPolicy: 'no-referrer',
    })
  })

  it('accetta application/*+json, valida allowlist e normalizza il prodotto', async () => {
    fetchStub(responseWithJson({
      status: 'found',
      product: {
        product_name: 'Generic',
        product_name_it: '  Pane integrale ',
        brands: 'Marca Uno, Marca Due',
        serving_size: '30,5 g',
        image_front_small_url: ' https://images.openfoodfacts.org/images/products/123/456/78/front_small.png ',
        nutriments: {
          carbohydrates_100g: '42.5',
          sugars_100g: 3,
          fiber_100g: 'bad',
          proteins_100g: 8,
          fat_100g: 2,
        },
      },
    }, 200, 'application/problem+json; charset=utf-8'))

    await expect(cercaProdotto('123456')).resolves.toEqual({
      status: 'found',
      product: {
        codice: '123456',
        nome: 'Pane integrale',
        marca: 'Marca Uno',
        immagine: 'https://images.openfoodfacts.org/images/products/123/456/78/front_small.png',
        carbo100: 42.5,
        carboCorretto: false,
        zuccheri100: 3,
        fibre100: null,
        proteine100: 8,
        grassi100: 2,
        porzioneG: 30.5,
      },
    })
  })

  it.each([
    [new Response('<html>', { status: 503, headers: { 'Content-Type': 'text/html' } }), 'PROXY_UNAVAILABLE', 503],
    [new Response('{rotto', { status: 200, headers: { 'Content-Type': 'application/json' } }), 'INVALID_RESPONSE', 200],
    [new Response('', { status: 200, headers: { 'Content-Type': 'application/json' } }), 'INVALID_RESPONSE', undefined],
    [responseWithJson({ error: 'no' }, 502), 'LOOKUP_FAILED', 502],
  ])('applica la precedenza content-type/JSON/status %#', async (response, code, status) => {
    fetchStub(response)
    await expect(cercaProdotto('123456')).rejects.toMatchObject({ code, status })
  })

  it.each([
    null,
    {},
    { status: 'not_found', extra: true },
    { status: 'found' },
    { status: 'found', product: { leaked: true } },
    { status: 'found', product: { product_name: 42 } },
    { status: 'found', product: { nutriments: { salt_100g: 1 } } },
    { status: 'found', product: [], extra: true },
  ])('rifiuta schema o campi fuori allowlist %#', async (payload) => {
    fetchStub(responseWithJson(payload))
    await expect(cercaProdotto('123456')).rejects.toBeInstanceOf(BarcodeServiceError)
  })

  it('normalizza anche AbortError in NETWORK_ERROR come ogni errore fetch', async () => {
    const abort = Object.assign(new Error('stop'), { name: 'AbortError' })
    const fetchMock = vi.fn<typeof fetch>().mockRejectedValue(abort)
    vi.stubGlobal('fetch', fetchMock)

    await expect(cercaProdotto('123456')).rejects.toMatchObject({ code: 'NETWORK_ERROR' })
  })
})

interface CanvasImageMocksOptions {
  width?: number
  height?: number
  imageFails?: boolean
  blobSizes?: readonly (number | null)[]
  readerFails?: boolean
  contextAvailable?: boolean
}

function installImageMocks(options: CanvasImageMocksOptions = {}) {
  const qualities: number[] = []
  const fillRect = vi.fn()
  const drawImage = vi.fn()
  const context = { fillStyle: '', fillRect, drawImage } as unknown as CanvasRenderingContext2D
  const blobs = [...(options.blobSizes ?? [1000])]
  const createObjectURL = vi.fn()
    .mockReturnValueOnce('blob:source')
    .mockReturnValue('blob:preview')
  const revokeObjectURL = vi.fn()
  vi.stubGlobal('URL', { createObjectURL, revokeObjectURL })

  class FakeImage {
    onload: (() => void) | null = null
    onerror: (() => void) | null = null
    naturalWidth = options.width ?? 3200
    naturalHeight = options.height ?? 800

    set src(_value: string) {
      queueMicrotask(() => {
        if (options.imageFails) this.onerror?.()
        else this.onload?.()
      })
    }
  }
  vi.stubGlobal('Image', FakeImage)

  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(
    () => options.contextAvailable === false ? null : context,
  )
  vi.spyOn(HTMLCanvasElement.prototype, 'toBlob').mockImplementation((callback, type, quality) => {
    qualities.push(Number(quality))
    const size = blobs.shift() ?? null
    callback(size === null ? null : { size, type: type ?? '' } as Blob)
  })

  class FakeFileReader {
    result: string | ArrayBuffer | null = null
    onload: (() => void) | null = null
    onerror: (() => void) | null = null

    readAsDataURL() {
      queueMicrotask(() => {
        if (options.readerFails) this.onerror?.()
        else {
          this.result = 'data:image/jpeg;base64,QUJDRA=='
          this.onload?.()
        }
      })
    }
  }
  vi.stubGlobal('FileReader', FakeFileReader)

  return { qualities, fillRect, drawImage, createObjectURL, revokeObjectURL }
}

describe('imagePreparation', () => {
  it.each([
    [{ name: 'x.txt', type: 'text/plain', size: 10 }, 'INVALID_TYPE'],
    [{ name: 'x.jpg', type: 'image/jpeg', size: 20 * 1024 * 1024 + 1 }, 'SOURCE_TOO_LARGE'],
  ])('valida tipo e limite sorgente prima di creare URL %#', async (file, code) => {
    await expect(prepareImage(file as File)).rejects.toMatchObject({ code })
  })

  it('ridimensiona, prova qualità in ordine, converte base64 e revoca solo la sorgente', async () => {
    const mocks = installImageMocks({ blobSizes: [3_000_000, 2_000_000] })
    const file = new File(['foto'], 'piatto.png', { type: 'image/png' })

    await expect(prepareImage(file)).resolves.toEqual({
      base64: 'QUJDRA==',
      previewUrl: 'blob:preview',
      width: 1600,
      height: 400,
      bytes: 2_000_000,
      mime: 'image/jpeg',
      name: 'piatto.png',
    })

    expect(mocks.qualities).toEqual([0.86, 0.76])
    expect(mocks.fillRect).toHaveBeenCalledWith(0, 0, 1600, 400)
    expect(mocks.drawImage).toHaveBeenCalledWith(expect.any(FakeImagePlaceholder), 0, 0, 1600, 400)
    expect(mocks.createObjectURL).toHaveBeenCalledTimes(2)
    expect(mocks.revokeObjectURL).toHaveBeenCalledOnce()
    expect(mocks.revokeObjectURL).toHaveBeenCalledWith('blob:source')
  })

  it('mantiene dimensioni piccole e applica il minimo di un pixel', async () => {
    installImageMocks({ width: 0, height: 0 })
    const result = await prepareImage(new File(['x'], '', { type: 'image/jpeg' }))
    expect(result).toMatchObject({ width: 1, height: 1, name: 'foto-piatto.jpg' })
  })

  it.each([
    [{ imageFails: true }, 'READ_FAILED'],
    [{ contextAvailable: false }, 'UNSUPPORTED_PROCESSING'],
    [{ blobSizes: [null] }, 'PREPARE_FAILED'],
    [{ blobSizes: [3_000_000, 3_000_000, 3_000_000] }, 'OUTPUT_TOO_LARGE'],
    [{ readerFails: true }, 'CONVERT_FAILED'],
  ] as const)('propaga errore controllato e revoca la sorgente %#', async (options, code) => {
    const mocks = installImageMocks(options)
    const file = new File(['x'], 'x.jpg', { type: 'image/jpeg' })

    await expect(prepareImage(file)).rejects.toMatchObject({
      name: 'ImagePreparationError',
      code,
    })
    expect(mocks.revokeObjectURL).toHaveBeenCalledWith('blob:source')
    if (code === 'OUTPUT_TOO_LARGE') expect(mocks.qualities).toEqual([0.86, 0.76, 0.66])
  })

  it('formatta dimensioni finite ai confini', () => {
    expect(formatFileSize(Number.NaN)).toBe('')
    expect(formatFileSize(0)).toBe('1 KB')
    expect(formatFileSize(1536)).toBe('2 KB')
    expect(formatFileSize(1024 * 1024)).toBe('1.0 MB')
    expect(formatFileSize(1.25 * 1024 * 1024)).toBe('1.3 MB')
  })
})

// Solo per rendere esplicito che drawImage riceve l'istanza Image mockata senza legare il test al DOM.
class FakeImagePlaceholder {
  static [Symbol.hasInstance](value: unknown): boolean {
    return typeof value === 'object' && value !== null && 'naturalWidth' in value
  }
}

function shareContext(): CanvasRenderingContext2D {
  return {
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    quadraticCurveTo: vi.fn(),
    closePath: vi.fn(),
    fill: vi.fn(),
    fillRect: vi.fn(),
    fillText: vi.fn(),
    measureText: vi.fn((text: string) => ({ width: text.length * 12 } as TextMetrics)),
    createLinearGradient: vi.fn(() => ({ addColorStop: vi.fn() } as unknown as CanvasGradient)),
    fillStyle: '',
    font: '',
    textAlign: 'left',
  } as unknown as CanvasRenderingContext2D
}

function installShareCanvas(blob: Blob | null = new Blob(['png'], { type: 'image/png' })) {
  const canvases: HTMLCanvasElement[] = []
  const context = shareContext()
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(function getContext(this: HTMLCanvasElement) {
    canvases.push(this)
    return context
  })
  vi.spyOn(HTMLCanvasElement.prototype, 'toBlob').mockImplementation((callback, type) => {
    expect(type).toBe('image/png')
    callback(blob)
  })
  return { canvases, context }
}

class DeterministicFile extends Blob {
  readonly name: string
  readonly lastModified = 0
  readonly webkitRelativePath = ''

  constructor(bits: BlobPart[], name: string, options?: FilePropertyBag) {
    super(bits, options)
    this.name = name
  }
}

const shareData: ShareCardData = {
  title: 'Pasto molto lungo da mandare su più righe',
  subtitle: 'Stima',
  items: [
    { label: 'Carboidrati', value: '42 g' },
    { label: 'Porzione', value: '120 g' },
    { label: 'Impatto', value: 'medio' },
    { label: 'Fibre', value: '8 g' },
    { label: 'Proteine', value: '12 g' },
  ],
  note: 'Nota conclusiva della card',
}

describe('shareCard', () => {
  it('disegna PNG 1080 e calcola altezza da elementi e nota', async () => {
    const { canvases, context } = installShareCanvas()

    await expect(creaCardPng(shareData)).resolves.toMatchObject({ type: 'image/png' })

    expect(canvases[0].width).toBe(1080)
    expect(canvases[0].height).toBe(1370)
    expect(context.fillText).toHaveBeenCalledWith('GLICOGIG', 84, 104)
    expect(context.measureText).toHaveBeenCalled()
  })

  it('usa Web Share con File PNG e nome normalizzato', async () => {
    installShareCanvas()
    vi.stubGlobal('File', DeterministicFile)
    const canShare = vi.fn().mockReturnValue(true)
    const share = vi.fn().mockResolvedValue(undefined)
    vi.stubGlobal('navigator', { canShare, share })
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => undefined)

    await expect(condividiCard(shareData, { fileName: ' report ' })).resolves.toBe(true)

    expect(canShare).toHaveBeenCalledOnce()
    const data = canShare.mock.calls[0][0] as ShareData
    expect(data.title).toBe('GLICOGIG')
    expect(data.files?.[0]).toMatchObject({ name: 'report.png', type: 'image/png' })
    expect(share).toHaveBeenCalledWith(data)
    expect(click).not.toHaveBeenCalled()
  })

  it('su annullamento Web Share non scarica', async () => {
    installShareCanvas()
    vi.stubGlobal('File', DeterministicFile)
    vi.stubGlobal('navigator', {
      canShare: vi.fn().mockReturnValue(true),
      share: vi.fn().mockRejectedValue(new DOMException('annullata', 'AbortError')),
    })
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => undefined)

    await expect(condividiCard(shareData)).resolves.toBe(false)
    expect(click).not.toHaveBeenCalled()
  })

  it.each(['unsupported', 'share-error'])(
    'ripiega su download locale, normalizza nome e revoca URL: %s',
    async (scenario) => {
      vi.useFakeTimers()
      installShareCanvas()
      vi.stubGlobal('File', DeterministicFile)
      const canShare = vi.fn().mockReturnValue(scenario !== 'unsupported')
      const share = vi.fn().mockRejectedValue(new Error('share failed'))
      vi.stubGlobal('navigator', { canShare, share })
      const createObjectURL = vi.fn().mockReturnValue('blob:card')
      const revokeObjectURL = vi.fn()
      vi.stubGlobal('URL', { createObjectURL, revokeObjectURL })
      const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => undefined)

      await expect(condividiCard(shareData, { fileName: ' CARD.PNG ' })).resolves.toBe(true)

      expect(click).toHaveBeenCalledOnce()
      expect(document.querySelector('a')).toBeNull()
      expect(revokeObjectURL).not.toHaveBeenCalled()
      await vi.runAllTimersAsync()
      expect(revokeObjectURL).toHaveBeenCalledWith('blob:card')
    },
  )

  it('restituisce false se canvas non produce il blob', async () => {
    installShareCanvas(null)
    await expect(condividiCard(shareData)).resolves.toBe(false)
  })
})
