import { act, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { AppRoute } from './components/appNavigation'
import { getFoodByCatalogId } from './catalog/foodCatalog'
import type PhotoScreen from './screens/PhotoScreen'
import { AnalysisError } from './services/photoAnalysisService'
import { ImagePreparationError, type ImagePreparationErrorCode, type PreparedImage } from './services/imagePreparation'
import type { AnalizzaResponse } from './types/analysis'
import App from './App'

const mocks = vi.hoisted(() => ({
  addItem: vi.fn(),
  language: 'it',
  photoAnalyze: vi.fn(),
  photoProps: null as unknown,
  prepareImage: vi.fn(),
  revokeObjectURL: vi.fn(),
  route: { page: 'photo' } as AppRoute,
  searchProps: null as unknown,
  startCompleteMeal: vi.fn(),
  t: vi.fn((key: string) => key),
  textAnalyze: vi.fn(),
  vibrate: vi.fn(),
}))

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: mocks.t,
    i18n: { language: mocks.language, resolvedLanguage: mocks.language },
  }),
}))

vi.mock('./components/AppShell', async () => {
  const React = await import('react')
  return {
    default: ({ children }: { children(route: AppRoute): React.ReactNode }) => React.createElement(React.Fragment, null, children(mocks.route)),
  }
})

vi.mock('./screens/PhotoScreen', async () => {
  const React = await import('react')
  return {
    default: (props: unknown) => {
      mocks.photoProps = props
      return React.createElement('div', { 'data-testid': 'photo-screen' })
    },
  }
})

vi.mock('./screens/HomeScreen', async () => {
  const React = await import('react')
  return { default: () => React.createElement('div', { 'data-testid': 'home-screen' }) }
})
vi.mock('./screens/MealScreen', async () => {
  const React = await import('react')
  return { default: () => React.createElement('div', { 'data-testid': 'meal-screen' }) }
})
vi.mock('./screens/DiaryScreen', async () => {
  const React = await import('react')
  return { default: () => React.createElement('div', { 'data-testid': 'diary-screen' }) }
})
vi.mock('./screens/AdviceScreen', async () => {
  const React = await import('react')
  return { default: () => React.createElement('div', { 'data-testid': 'advice-screen' }) }
})
vi.mock('./screens/ExplanationScreen', async () => {
  const React = await import('react')
  return { default: () => React.createElement('div', { 'data-testid': 'explanation-screen' }) }
})
vi.mock('./screens/SearchScreen', async () => {
  const React = await import('react')
  return {
    default: (props: unknown) => {
      mocks.searchProps = props
      return React.createElement('div', { 'data-testid': 'search-screen' })
    },
  }
})
vi.mock('./screens/RecipesScreen', async () => {
  const React = await import('react')
  return { default: (props: { recipeId?: string }) => React.createElement('div', { 'data-testid': 'recipes-screen', 'data-id': props.recipeId ?? '' }) }
})
vi.mock('./screens/LearnScreen', async () => {
  const React = await import('react')
  return { default: (props: { chapterId?: string }) => React.createElement('div', { 'data-testid': 'learn-screen', 'data-id': props.chapterId ?? '' }) }
})

vi.mock('./services/imagePreparation', async (importOriginal) => {
  const original = await importOriginal<typeof import('./services/imagePreparation')>()
  return { ...original, prepareImage: mocks.prepareImage }
})
vi.mock('./services/photoAnalysisService', async (importOriginal) => {
  const original = await importOriginal<typeof import('./services/photoAnalysisService')>()
  return { ...original, photoAnalysisService: { analyze: mocks.photoAnalyze } }
})
vi.mock('./services/textAnalysisService', () => ({ textAnalysisService: { analyze: mocks.textAnalyze } }))
vi.mock('./state/mealSession', async () => {
  const React = await import('react')
  return {
    MealSessionProvider: ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children),
  }
})
vi.mock('./state/mealSessionContext', () => ({
  useMealSession: () => ({
    addItem: mocks.addItem,
    startCompleteMeal: mocks.startCompleteMeal,
    summary: { plates: 2 },
  }),
}))

function currentPhotoProps(): React.ComponentProps<typeof PhotoScreen> {
  return mocks.photoProps as React.ComponentProps<typeof PhotoScreen>
}

function prepared(name = 'dish.jpg', base64 = 'base64-dish'): PreparedImage {
  return {
    base64,
    previewUrl: `blob:${name}`,
    width: 640,
    height: 480,
    bytes: 1024,
    mime: 'image/jpeg',
    name,
  }
}

function verifiedAnalysis(overrides: Partial<AnalizzaResponse> = {}): AnalizzaResponse {
  const food = getFoodByCatalogId('spaghetti-cotti-al-dente')
  if (!food) throw new Error('Fixture VERIFIED spaghetti-cotti-al-dente non trovata')
  return {
    e_cibo: true,
    piatto: food.nome,
    ingredienti: [{ nome: food.nome, catalogo_id: food.id, grammi: food.porzione_standard_g }],
    confidenza: 0.95,
    ...overrides,
  }
}

async function selectPreparedImage(image = prepared()): Promise<void> {
  mocks.prepareImage.mockResolvedValueOnce(image)
  await act(async () => {
    await currentPhotoProps().onFile(new File(['dish'], image.name, { type: 'image/jpeg' }))
  })
  expect(currentPhotoProps().image).toEqual(image)
}

async function analyzePhoto(result: AnalizzaResponse = verifiedAnalysis()): Promise<void> {
  mocks.photoAnalyze.mockResolvedValueOnce(result)
  act(() => currentPhotoProps().onAnalyzePhoto())
  await waitFor(() => expect(currentPhotoProps().status).toBe('success'))
}

beforeEach(() => {
  mocks.route = { page: 'photo' }
  mocks.language = 'it'
  mocks.photoProps = null
  mocks.searchProps = null
  mocks.addItem.mockReset().mockReturnValue({ id: 'meal-added' })
  mocks.photoAnalyze.mockReset()
  mocks.prepareImage.mockReset()
  mocks.startCompleteMeal.mockReset()
  mocks.textAnalyze.mockReset()
  mocks.t.mockClear()
  mocks.revokeObjectURL.mockReset()
  mocks.vibrate.mockReset()
  Object.defineProperty(URL, 'revokeObjectURL', { configurable: true, value: mocks.revokeObjectURL })
  Object.defineProperty(window.navigator, 'vibrate', { configurable: true, value: mocks.vibrate })
  Object.defineProperty(window, 'requestAnimationFrame', {
    configurable: true,
    value: vi.fn((callback: FrameRequestCallback) => {
      callback(0)
      return 1
    }),
  })
  Object.defineProperty(window, 'cancelAnimationFrame', { configurable: true, value: vi.fn() })
  window.sessionStorage.clear()
  vi.stubEnv('PROD', false)
})

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('routing App', () => {
  it.each([
    [{ page: 'home' }, 'home-screen'],
    [{ page: 'meal' }, 'meal-screen'],
    [{ page: 'barcode' }, 'search-screen'],
    [{ page: 'search', id: 'food-id' }, 'search-screen'],
    [{ page: 'recipes', id: 'recipe-id' }, 'recipes-screen'],
    [{ page: 'diary' }, 'diary-screen'],
    [{ page: 'advice' }, 'advice-screen'],
    [{ page: 'learn', id: 'chapter-id' }, 'learn-screen'],
    [{ page: 'explanation' }, 'explanation-screen'],
    [{ page: 'photo' }, 'photo-screen'],
  ] satisfies [AppRoute, string][])('rende %j', (route, marker) => {
    mocks.route = route
    render(<App />)
    expect(screen.getByTestId(marker)).toBeInTheDocument()
    if (route.page === 'barcode') expect(mocks.searchProps).toEqual({ mode: 'barcode' })
    if (route.page === 'search') expect(mocks.searchProps).toEqual({ foodId: route.id })
    if (route.page === 'recipes') expect(screen.getByTestId(marker)).toHaveAttribute('data-id', route.id)
    if (route.page === 'learn') expect(screen.getByTestId(marker)).toHaveAttribute('data-id', route.id)
  })
})

describe('access key, storage e ciclo immagine', () => {
  it('inizializza titolo e chiave, poi persiste e rimuove la sessione', async () => {
    window.sessionStorage.setItem('glicogig_access_key', 'stored-key')
    render(<App />)
    expect(document.title).toBe('brand.name · analysis.hero.kicker')
    expect(currentPhotoProps().accessKey).toBe('stored-key')

    act(() => currentPhotoProps().onAccessKeyChange('new-key'))
    await waitFor(() => expect(window.sessionStorage.getItem('glicogig_access_key')).toBe('new-key'))
    act(() => currentPhotoProps().onToggleAccessKey())
    expect(currentPhotoProps().showAccessKey).toBe(true)
    act(() => currentPhotoProps().onAccessKeyChange(''))
    await waitFor(() => expect(window.sessionStorage.getItem('glicogig_access_key')).toBeNull())
  })

  it('resta utilizzabile se sessionStorage genera errori', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('blocked') })
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('blocked') })
    vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => { throw new Error('blocked') })
    expect(() => render(<App />)).not.toThrow()
    expect(currentPhotoProps().accessKey).toBe('')
    act(() => currentPhotoProps().onAccessKeyChange('memory-only'))
    expect(currentPhotoProps().accessKey).toBe('memory-only')
  })

  it('conserva solo l’ultima preparazione e revoca la preview obsoleta', async () => {
    let resolveFirst!: (value: PreparedImage) => void
    let resolveSecond!: (value: PreparedImage) => void
    mocks.prepareImage
      .mockReturnValueOnce(new Promise<PreparedImage>((resolve) => { resolveFirst = resolve }))
      .mockReturnValueOnce(new Promise<PreparedImage>((resolve) => { resolveSecond = resolve }))
    render(<App />)

    let firstPromise!: Promise<void>
    let secondPromise!: Promise<void>
    act(() => {
      firstPromise = currentPhotoProps().onFile(new File(['1'], 'first.jpg', { type: 'image/jpeg' })) as Promise<void>
      secondPromise = currentPhotoProps().onFile(new File(['2'], 'second.jpg', { type: 'image/jpeg' })) as Promise<void>
    })
    await act(async () => {
      resolveSecond(prepared('second.jpg', 'second'))
      await secondPromise
    })
    expect(currentPhotoProps().image?.name).toBe('second.jpg')
    await act(async () => {
      resolveFirst(prepared('first.jpg', 'first'))
      await firstPromise
    })
    expect(currentPhotoProps().image?.name).toBe('second.jpg')
    expect(mocks.revokeObjectURL).toHaveBeenCalledWith('blob:first.jpg')
  })

  it.each([
    ['READ_FAILED', 'errors.image.read'],
    ['PREPARE_FAILED', 'errors.image.prepare'],
    ['CONVERT_FAILED', 'errors.image.convert'],
    ['INVALID_TYPE', 'errors.image.type'],
    ['SOURCE_TOO_LARGE', 'errors.image.sourceTooLarge'],
    ['UNSUPPORTED_PROCESSING', 'errors.image.unsupported'],
    ['OUTPUT_TOO_LARGE', 'errors.image.compressedTooLarge'],
  ] satisfies [ImagePreparationErrorCode, string][])('mappa errore immagine %s', async (code, expected) => {
    mocks.prepareImage.mockRejectedValueOnce(new ImagePreparationError(code, 'bad image'))
    render(<App />)
    await act(async () => {
      await currentPhotoProps().onFile(new File(['bad'], 'bad.jpg', { type: 'image/jpeg' }))
    })
    expect(currentPhotoProps()).toMatchObject({ status: 'error', error: expected })
  })

  it('usa il fallback per errori immagine non tipizzati', async () => {
    mocks.prepareImage.mockRejectedValueOnce(new Error('generic'))
    render(<App />)
    await act(async () => {
      await currentPhotoProps().onFile(new File(['bad'], 'bad.jpg', { type: 'image/jpeg' }))
    })
    expect(currentPhotoProps().error).toBe('errors.image.prepareFallback')
  })
})

describe('analisi foto e mapping errori', () => {
  it('invia payload normalizzato, salva risultato e segnala successo', async () => {
    render(<App />)
    act(() => currentPhotoProps().onAccessKeyChange('  photo-key  '))
    await selectPreparedImage(prepared())
    const result = verifiedAnalysis()
    await analyzePhoto(result)
    expect(mocks.photoAnalyze).toHaveBeenCalledWith({
      imageBase64: 'base64-dish',
      accessKey: 'photo-key',
      signal: expect.any(AbortSignal),
    })
    expect(currentPhotoProps()).toMatchObject({
      result,
      resultOrigin: 'photo',
      portionPreset: 1,
      rawWeightMode: 'cooked',
      mealItemCount: 2,
    })
    expect(currentPhotoProps().result).not.toBe(result)
    expect(mocks.vibrate).toHaveBeenCalledWith(30)
  })

  it('richiede access key in produzione senza invocare il servizio', async () => {
    vi.stubEnv('PROD', true)
    render(<App />)
    await selectPreparedImage()
    act(() => currentPhotoProps().onAnalyzePhoto())
    await waitFor(() => expect(currentPhotoProps().status).toBe('error'))
    expect(currentPhotoProps().error).toBe('errors.accessKeyRequired')
    expect(mocks.photoAnalyze).not.toHaveBeenCalled()
  })

  it.each([
    [new AnalysisError('network', 0, 'NETWORK_ERROR'), 'errors.photo.network'],
    [new AnalysisError('bad', 400), 'errors.photo.badRequest'],
    [new AnalysisError('auth', 401), 'errors.photo.badPassword'],
    [new AnalysisError('quota', 402), 'errors.photo.unavailable'],
    [new AnalysisError('large', 413), 'errors.photo.tooLarge'],
    [new AnalysisError('rate', 429), 'errors.photo.rateLimit'],
    [new AnalysisError('invalid', 0), 'errors.photo.invalidResponse'],
    [new AnalysisError('invalid', 204), 'errors.photo.invalidResponse'],
    [new AnalysisError('other', 503), 'errors.photo.unavailable'],
    [new Error('generic'), 'errors.analysisGeneric'],
  ])('mappa errore foto %#', async (error, expected) => {
    render(<App />)
    await selectPreparedImage()
    mocks.photoAnalyze.mockRejectedValueOnce(error)
    act(() => currentPhotoProps().onAnalyzePhoto())
    await waitFor(() => expect(currentPhotoProps().status).toBe('error'))
    expect(currentPhotoProps().error).toBe(expected)
  })

  it('ignora AbortError lasciando lo stato in analisi', async () => {
    const abort = new Error('aborted')
    abort.name = 'AbortError'
    render(<App />)
    await selectPreparedImage()
    mocks.photoAnalyze.mockRejectedValueOnce(abort)
    act(() => currentPhotoProps().onAnalyzePhoto())
    await waitFor(() => expect(mocks.photoAnalyze).toHaveBeenCalled())
    expect(currentPhotoProps().status).toBe('analyzing')
    expect(currentPhotoProps().error).toBe('')
  })
})

describe('analisi testo, porzioni e sessione pasto', () => {
  it('valida testo vuoto e gestisce una risposta non-food', async () => {
    render(<App />)
    act(() => currentPhotoProps().onAnalysisModeChange('text'))
    act(() => currentPhotoProps().onAnalyzeText())
    expect(currentPhotoProps()).toMatchObject({ status: 'error', error: 'errors.textRequired' })

    act(() => currentPhotoProps().onTextChange('  acqua  '))
    mocks.textAnalyze.mockResolvedValueOnce({ e_cibo: false, ingredienti: [] })
    act(() => currentPhotoProps().onAnalyzeText())
    await waitFor(() => expect(currentPhotoProps().status).toBe('error'))
    expect(currentPhotoProps().error).toBe('errors.textNotFood')
  })

  it('invia testo, lingua e chiave normalizzati e pulisce il campo', async () => {
    mocks.language = 'en-US'
    render(<App />)
    act(() => currentPhotoProps().onAnalysisModeChange('text'))
    act(() => currentPhotoProps().onAccessKeyChange(' key '))
    act(() => currentPhotoProps().onTextChange('  spaghetti  '))
    const result = verifiedAnalysis()
    mocks.textAnalyze.mockResolvedValueOnce(result)
    act(() => currentPhotoProps().onAnalyzeText())
    await waitFor(() => expect(currentPhotoProps().status).toBe('success'))
    expect(mocks.textAnalyze).toHaveBeenCalledWith({
      text: 'spaghetti',
      lang: 'en',
      accessKey: 'key',
      signal: expect.any(AbortSignal),
    })
    expect(currentPhotoProps()).toMatchObject({ text: '', resultOrigin: 'text', portionPreset: 1 })
  })

  it.each([
    [new AnalysisError('network', 0, 'NETWORK_ERROR'), 'errors.text.network'],
    [new AnalysisError('bad', 400), 'errors.text.invalid'],
    [new AnalysisError('auth', 401), 'errors.text.badPassword'],
    [new AnalysisError('quota', 402), 'errors.text.unavailable'],
    [new AnalysisError('large', 413), 'errors.text.tooLong'],
    [new AnalysisError('rate', 429), 'errors.text.rateLimit'],
    [new AnalysisError('invalid', 0), 'errors.text.invalid'],
    [new AnalysisError('invalid', 201), 'errors.text.invalid'],
    [new AnalysisError('other', 500), 'errors.text.unavailable'],
    [new Error('generic'), 'errors.analysisGeneric'],
  ])('mappa errore testo %#', async (error, expected) => {
    render(<App />)
    act(() => currentPhotoProps().onAnalysisModeChange('text'))
    act(() => currentPhotoProps().onTextChange('pasta'))
    mocks.textAnalyze.mockRejectedValueOnce(error)
    act(() => currentPhotoProps().onAnalyzeText())
    await waitFor(() => expect(currentPhotoProps().status).toBe('error'))
    expect(currentPhotoProps().error).toBe(expected)
  })

  it('ricalcola sempre dal baseline, modifica grammi e commuta peso crudo', async () => {
    render(<App />)
    await selectPreparedImage()
    await analyzePhoto()
    const baseGrams = currentPhotoProps().result!.ingredienti[0].grammi
    act(() => currentPhotoProps().onPortionPresetChange(0.7))
    expect(currentPhotoProps().result!.ingredienti[0].grammi).toBeCloseTo(baseGrams * 0.7)
    act(() => currentPhotoProps().onPortionPresetChange(1.4))
    expect(currentPhotoProps().result!.ingredienti[0].grammi).toBeCloseTo(baseGrams * 1.4)
    act(() => currentPhotoProps().onIngredientGramsChange(0, 123))
    expect(currentPhotoProps().result!.ingredienti[0].grammi).toBe(123)
    expect(currentPhotoProps().portionPreset).toBeNull()
    act(() => currentPhotoProps().onRawWeightModeChange('dry'))
    expect(currentPhotoProps().rawWeightMode).toBe('dry')
    act(() => currentPhotoProps().onIngredientGramsChange(0, 100))
    expect(currentPhotoProps().result!.ingredienti[0].grammi).not.toBe(100)
  })

  it('avvia pasto completo, aggiunge una volta e resetta per un altro piatto', async () => {
    render(<App />)
    await selectPreparedImage()
    await analyzePhoto()
    act(() => currentPhotoProps().onAddToSession())
    expect(mocks.startCompleteMeal).toHaveBeenCalledOnce()
    expect(mocks.addItem).toHaveBeenCalledWith(expect.objectContaining({ source: { kind: 'photo', analysisOrigin: 'photo' } }))
    expect(currentPhotoProps()).toMatchObject({ completeMeal: true, addedToMeal: true })
    act(() => currentPhotoProps().onAddToSession())
    expect(mocks.addItem).toHaveBeenCalledOnce()
    act(() => currentPhotoProps().onAnalyzeAnother())
    expect(currentPhotoProps()).toMatchObject({ image: null, result: null, status: 'idle', addedToMeal: false })
  })

  it('single dish, cambio modalità e clear resettano gli stati', async () => {
    render(<App />)
    act(() => currentPhotoProps().onCompleteMealStart())
    expect(currentPhotoProps().completeMeal).toBe(true)
    act(() => currentPhotoProps().onSingleDish())
    expect(currentPhotoProps().completeMeal).toBe(false)
    await selectPreparedImage()
    act(() => currentPhotoProps().onAnalysisModeChange('text'))
    expect(currentPhotoProps()).toMatchObject({ analysisMode: 'text', image: null, status: 'idle' })
    act(() => currentPhotoProps().onTextChange('pasta'))
    act(() => currentPhotoProps().onClear())
    expect(currentPhotoProps()).toMatchObject({ text: '', result: null, error: '', status: 'idle' })
  })
})
