import { createRef } from 'react'
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { getFoodByCatalogId } from '../catalog/foodCatalog'
import { LEARNING_CHAPTERS, QUIZ_QUESTIONS, RECIPES } from '../catalog/datasets'
import { mealItemFromFood } from '../domain/meal'
import type { MealSessionEntry, MealSessionSummary } from '../state/mealSession'
import type { DiaryEntry } from '../types/diary'
import type { MealItem } from '../types/meal'
import AdviceScreen from './AdviceScreen'
import DiaryScreen from './DiaryScreen'
import ExplanationScreen from './ExplanationScreen'
import HomeScreen from './HomeScreen'
import LearnScreen from './LearnScreen'
import MealScreen from './MealScreen'
import PhotoScreen from './PhotoScreen'
import RecipesScreen from './RecipesScreen'
import SearchScreen from './SearchScreen'

interface MealMock {
  name: string
  startedAt: number | null
  entries: MealSessionEntry[]
  summary: MealSessionSummary
  setName: ReturnType<typeof vi.fn>
  startCompleteMeal: ReturnType<typeof vi.fn>
  addItem: ReturnType<typeof vi.fn>
  updateItem: ReturnType<typeof vi.fn>
  removeItem: ReturnType<typeof vi.fn>
  clearMeal: ReturnType<typeof vi.fn>
}

const mocks = vi.hoisted(() => ({
  addItem: vi.fn(),
  changeLanguage: vi.fn(),
  clearMeal: vi.fn(),
  dayKey: '2025-02-14',
  decodeConstraints: vi.fn(),
  decodeImage: vi.fn(),
  diaryEntries: [] as DiaryEntry[],
  lookupBarcode: vi.fn(),
  meal: null as unknown as MealMock,
  registerDiary: vi.fn(),
  removeDiary: vi.fn(),
  removeItem: vi.fn(),
  renameDiary: vi.fn(),
  saveQuiz: vi.fn(),
  setMealName: vi.fn(),
  shareCard: vi.fn(),
  shiftDiarySlot: vi.fn(),
  quizQuestions: [] as typeof QUIZ_QUESTIONS[number][],
  quizState: { fattoOggi: false, streak: 0, record: 0, scoreOggi: null as number | null },
  t: vi.fn((key: string) => key),
}))

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: mocks.t,
    i18n: {
      language: 'it',
      resolvedLanguage: 'it',
      changeLanguage: mocks.changeLanguage,
    },
  }),
}))

vi.mock('../lib/useDayKey', () => ({ useDayKey: () => mocks.dayKey }))
vi.mock('../state/mealSession', () => ({ useMealSession: () => mocks.meal }))
vi.mock('../storage/diaryStore', () => ({
  DIARY_STORAGE_KEY: 'quality-diary',
  registraMangiato: mocks.registerDiary,
  rimuoviDalDiario: mocks.removeDiary,
  rinominaVoce: mocks.renameDiary,
  spostaSlot: mocks.shiftDiarySlot,
  useDiario: () => mocks.diaryEntries,
}))
vi.mock('../services/shareCard', () => ({ condividiCard: mocks.shareCard }))
vi.mock('../services/barcodeService', async (importOriginal) => {
  const original = await importOriginal<typeof import('../services/barcodeService')>()
  return { ...original, cercaProdotto: mocks.lookupBarcode }
})
vi.mock('../domain/dailyQuiz', () => ({
  giornoIndice: () => 20_000,
  quizDelGiorno: () => mocks.quizQuestions,
}))
vi.mock('../storage/quizStore', () => ({
  QUIZ_STORAGE_KEYS: {
    ultimoGiorno: 'quiz-day',
    streak: 'quiz-streak',
    record: 'quiz-record',
    scoreOggi: 'quiz-score',
  },
  salvaRisultato: mocks.saveQuiz,
  statoQuiz: () => mocks.quizState,
}))
vi.mock('@zxing/browser', () => ({
  BarcodeFormat: { EAN_13: 'EAN_13', EAN_8: 'EAN_8', UPC_A: 'UPC_A', UPC_E: 'UPC_E' },
  BrowserMultiFormatReader: class {
    possibleFormats: unknown[] = []
    decodeFromConstraints(...args: unknown[]) { return mocks.decodeConstraints(...args) }
    decodeFromImageUrl(value: string) { return mocks.decodeImage(value) }
  },
}))

const originalSecureContext = Object.getOwnPropertyDescriptor(window, 'isSecureContext')
const originalMediaDevices = Object.getOwnPropertyDescriptor(window.navigator, 'mediaDevices')
const originalCreateObjectURL = Object.getOwnPropertyDescriptor(URL, 'createObjectURL')
const originalRevokeObjectURL = Object.getOwnPropertyDescriptor(URL, 'revokeObjectURL')

function emptySummary(overrides: Partial<MealSessionSummary> = {}): MealSessionSummary {
  return {
    plates: 0,
    totalGrams: 0,
    kcal: 0,
    carbs: 0,
    protein: 0,
    fat: 0,
    fibre: 0,
    glycemicLoad: 0,
    band: 'trascurabile',
    unresolved: 0,
    ...overrides,
  }
}

function summaryFor(item: MealItem, overrides: Partial<MealSessionSummary> = {}): MealSessionSummary {
  return emptySummary({
    plates: 1,
    totalGrams: item.grams,
    kcal: item.kcal,
    carbs: item.carbs,
    protein: item.protein,
    fat: item.fat,
    fibre: item.fibre,
    glycemicLoad: item.glycemicLoad,
    band: item.band,
    unresolved: item.unresolved,
    ...overrides,
  })
}

function verifiedFood() {
  const food = getFoodByCatalogId('spaghetti-cotti-al-dente')
  if (!food) throw new Error('Fixture VERIFIED spaghetti-cotti-al-dente non trovata')
  return food
}

function verifiedRecipe() {
  const recipe = RECIPES.find(({ id }) => id === 'spaghetti-al-pomodoro')
  if (!recipe) throw new Error('Fixture VERIFIED spaghetti-al-pomodoro non trovata')
  return recipe
}

function diaryEntry(overrides: Partial<DiaryEntry> = {}): DiaryEntry {
  return {
    id: 'diary-1',
    ts: new Date('2025-02-14T12:30:00').getTime(),
    giorno: '2025-02-14',
    nome: 'Spaghetti verificati',
    nome_en: null,
    nome_es: null,
    nome_de: null,
    nome_fr: null,
    fonte: 'catalogo',
    fascia: 'medio',
    cg: 12,
    kcal: 320,
    carbo: 55,
    prot: 11,
    grassi: 4,
    fibre: 5,
    grammi: 180,
    slot: 'Pranzo',
    ...overrides,
  }
}

function mealWith(item?: MealItem, summaryOverrides: Partial<MealSessionSummary> = {}): MealMock {
  const entries = item ? [{ id: 'meal-1', item, addedAt: Date.now() }] : []
  return {
    name: 'Pasto verificato',
    startedAt: item ? Date.now() : null,
    entries,
    summary: item ? summaryFor(item, summaryOverrides) : emptySummary(summaryOverrides),
    setName: mocks.setMealName,
    startCompleteMeal: vi.fn(),
    addItem: mocks.addItem,
    updateItem: vi.fn(),
    removeItem: mocks.removeItem,
    clearMeal: mocks.clearMeal,
  }
}

function persistDiaryEntry(entry = diaryEntry()): DiaryEntry {
  window.localStorage.setItem('quality-diary', JSON.stringify([entry]))
  return entry
}

function photoProps(overrides: Partial<React.ComponentProps<typeof PhotoScreen>> = {}): React.ComponentProps<typeof PhotoScreen> {
  return {
    analysisMode: 'photo',
    completeMeal: false,
    image: null,
    text: '',
    result: null,
    resultOrigin: 'photo',
    portionPreset: null,
    rawWeightMode: 'cooked',
    addedToMeal: false,
    mealItemCount: 0,
    status: 'idle',
    error: '',
    accessKey: '',
    showAccessKey: false,
    resultSection: createRef<HTMLDivElement>(),
    onAnalysisModeChange: vi.fn(),
    onCompleteMealStart: vi.fn(),
    onSingleDish: vi.fn(),
    onAccessKeyChange: vi.fn(),
    onToggleAccessKey: vi.fn(),
    onFile: vi.fn(),
    onTextChange: vi.fn(),
    onAnalyzePhoto: vi.fn(),
    onAnalyzeText: vi.fn(),
    onClear: vi.fn(),
    onRetry: vi.fn(),
    onIngredientGramsChange: vi.fn(),
    onPortionPresetChange: vi.fn(),
    onRawWeightModeChange: vi.fn(),
    onAddToSession: vi.fn(),
    onAnalyzeAnother: vi.fn(),
    ...overrides,
  }
}

beforeEach(() => {
  vi.setSystemTime(new Date('2025-02-14T12:00:00'))
  const item = mealItemFromFood(verifiedFood(), verifiedFood().porzione_standard_g)
  mocks.meal = mealWith()
  mocks.diaryEntries = []
  mocks.quizQuestions = [QUIZ_QUESTIONS[0]]
  mocks.quizState = { fattoOggi: false, streak: 0, record: 0, scoreOggi: null }
  mocks.addItem.mockReset().mockReturnValue({ id: 'added', item, addedAt: Date.now() })
  mocks.clearMeal.mockReset()
  mocks.lookupBarcode.mockReset()
  mocks.decodeConstraints.mockReset()
  mocks.decodeImage.mockReset()
  mocks.registerDiary.mockReset().mockImplementation(() => persistDiaryEntry())
  mocks.removeDiary.mockReset()
  mocks.removeItem.mockReset()
  mocks.renameDiary.mockReset().mockReturnValue(true)
  mocks.saveQuiz.mockReset().mockImplementation((score: number) => {
    const state = { fattoOggi: true, streak: 1, record: score, scoreOggi: score }
    window.localStorage.setItem('quiz-day', JSON.stringify(20_000))
    window.localStorage.setItem('quiz-streak', JSON.stringify(state.streak))
    window.localStorage.setItem('quiz-record', JSON.stringify(state.record))
    window.localStorage.setItem('quiz-score', JSON.stringify(score))
    return state
  })
  mocks.setMealName.mockReset()
  mocks.shareCard.mockReset().mockResolvedValue(true)
  mocks.shiftDiarySlot.mockReset()
  mocks.t.mockClear()
  Object.defineProperty(window, 'isSecureContext', { configurable: true, value: false })
  Object.defineProperty(window.navigator, 'mediaDevices', {
    configurable: true,
    value: { getUserMedia: vi.fn() },
  })
  Object.defineProperty(URL, 'createObjectURL', { configurable: true, value: vi.fn(() => 'blob:barcode') })
  Object.defineProperty(URL, 'revokeObjectURL', { configurable: true, value: vi.fn() })
  vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => undefined)
  vi.stubGlobal('MediaStream', class { getTracks() { return [] } })
})

afterAll(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
  if (originalSecureContext) Object.defineProperty(window, 'isSecureContext', originalSecureContext)
  else Reflect.deleteProperty(window, 'isSecureContext')
  if (originalMediaDevices) Object.defineProperty(window.navigator, 'mediaDevices', originalMediaDevices)
  else Reflect.deleteProperty(window.navigator, 'mediaDevices')
  if (originalCreateObjectURL) Object.defineProperty(URL, 'createObjectURL', originalCreateObjectURL)
  else Reflect.deleteProperty(URL, 'createObjectURL')
  if (originalRevokeObjectURL) Object.defineProperty(URL, 'revokeObjectURL', originalRevokeObjectURL)
  else Reflect.deleteProperty(URL, 'revokeObjectURL')
})

describe('PhotoScreen', () => {
  it('inoltra modalità, sessione, access key e riepilogo pasto', async () => {
    const user = userEvent.setup()
    const item = mealItemFromFood(verifiedFood(), verifiedFood().porzione_standard_g)
    mocks.meal = mealWith(item, { unresolved: 1 })
    const props = photoProps()
    render(<PhotoScreen {...props} />)

    expect(screen.getByRole('region', { name: 'analysis.session.aria' })).toBeInTheDocument()
    expect(screen.getByText('analysis.session.unresolved')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'analysis.mode.text' }))
    await user.click(screen.getByRole('button', { name: 'analysis.mode.completeMeal' }))
    await user.click(screen.getByRole('button', { name: 'analysis.accessKey.showAria' }))
    await user.type(screen.getByLabelText('analysis.accessKey.label'), 'secret')
    await user.click(screen.getByRole('button', { name: /common.aria.removeFromMeal/ }))
    await user.click(screen.getByRole('button', { name: 'analysis.session.clear' }))

    expect(props.onAnalysisModeChange).toHaveBeenCalledWith('text')
    expect(props.onCompleteMealStart).toHaveBeenCalledOnce()
    expect(props.onToggleAccessKey).toHaveBeenCalledOnce()
    expect(props.onAccessKeyChange).toHaveBeenCalled()
    expect(mocks.removeItem).toHaveBeenCalledWith('meal-1')
    expect(mocks.clearMeal).toHaveBeenCalledOnce()
  })

  it('gestisce input testuale, busy, clear e hasInput per il retry', async () => {
    const user = userEvent.setup()
    const props = photoProps({ analysisMode: 'text', text: 'pasta e verdure', status: 'error', error: 'errore' })
    const { rerender } = render(<PhotoScreen {...props} />)
    const textarea = screen.getByLabelText('analysis.text.label')
    expect(textarea).toHaveValue('pasta e verdure')
    expect(screen.getByText('15/2000')).toBeInTheDocument()
    await user.type(textarea, '!')
    await user.click(screen.getByRole('button', { name: 'analysis.text.action' }))
    await user.click(screen.getByRole('button', { name: 'common.actions.clear' }))
    await user.click(screen.getByRole('button', { name: 'common.actions.retry' }))
    expect(props.onTextChange).toHaveBeenCalled()
    expect(props.onAnalyzeText).toHaveBeenCalledOnce()
    expect(props.onClear).toHaveBeenCalledOnce()
    expect(props.onRetry).toHaveBeenCalledOnce()

    rerender(<PhotoScreen {...photoProps({ analysisMode: 'text', text: ' ', status: 'analyzing' })} />)
    expect(screen.getByLabelText('analysis.text.label')).toBeDisabled()
    expect(screen.getByRole('button', { name: 'analysis.text.analyzing' })).toBeDisabled()
  })
})

describe('HomeScreen e AdviceScreen', () => {
  it('rende dataset, stato vuoto e tutte le scorciatoie Home', () => {
    const { container } = render(<HomeScreen />)
    expect(screen.getByRole('heading', { name: 'home.today.empty' })).toBeInTheDocument()
    expect(screen.getByLabelText('home.verified.aria').children).toHaveLength(4)
    expect(container.querySelectorAll('a[href^="#"]')).toHaveLength(9)
    expect(screen.queryByText('home.meal.title')).not.toBeInTheDocument()
  })

  it('mostra riepiloghi reali di diario e pasto in Home e Advice', () => {
    const item = mealItemFromFood(verifiedFood(), verifiedFood().porzione_standard_g)
    mocks.diaryEntries = [diaryEntry()]
    mocks.meal = mealWith(item, { unresolved: 1 })
    const { unmount } = render(<HomeScreen />)
    expect(screen.getByRole('heading', { name: 'home.today.entries' })).toBeInTheDocument()
    expect(screen.getByText('home.meal.title')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /common.actions.openTheMeal/ })).toHaveAttribute('href', '#meal')
    unmount()

    render(<AdviceScreen />)
    expect(screen.getByText('advice.meal.unresolved')).toBeInTheDocument()
    expect(screen.getByText('diary.week.hardestMeal')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /common.actions.openProgress/ })).toHaveAttribute('href', '#diary')
  })

  it('copre i fallback Advice senza pasto e senza storico', () => {
    render(<AdviceScreen />)
    expect(screen.getByRole('heading', { name: 'advice.meal.emptyTitle' })).toBeInTheDocument()
    expect(screen.getByText('classification.verdict.insufficient')).toBeInTheDocument()
    expect(screen.getByText('advice.noHardMeal')).toBeInTheDocument()
  })
})

describe('DiaryScreen e MealScreen', () => {
  it('gestisce righe diario, rename, slot, cancellazione, share e inserimento manuale', async () => {
    const user = userEvent.setup()
    mocks.diaryEntries = [diaryEntry()]
    render(<DiaryScreen />)

    await user.click(screen.getByRole('button', { name: /common.aria.rename/ }))
    const rename = screen.getByLabelText('diary.row.newNameAria')
    await user.clear(rename)
    await user.type(rename, 'Nuovo nome')
    await user.click(screen.getByRole('button', { name: 'diary.row.confirmNameAria' }))
    expect(mocks.renameDiary).toHaveBeenCalledWith('diary-1', 'Nuovo nome')

    await user.selectOptions(screen.getByLabelText('diary.slots.moment'), 'Cena')
    expect(mocks.shiftDiarySlot).toHaveBeenCalledWith('diary-1', 'Cena')
    await user.click(screen.getByRole('button', { name: /common.aria.delete/ }))
    expect(mocks.removeDiary).toHaveBeenCalledWith('diary-1')

    await user.click(screen.getByRole('button', { name: 'diary.week.share' }))
    await waitFor(() => expect(mocks.shareCard).toHaveBeenCalledOnce())
    expect(screen.getByText('common.feedback.shareSuccess')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'diary.week.manual' }))
    await user.type(screen.getByLabelText('diary.manual.name'), 'Piatto manuale')
    await user.click(screen.getByRole('button', { name: 'diary.manual.action' }))
    expect(mocks.registerDiary).toHaveBeenCalled()
    expect(await screen.findByRole('button', { name: 'diary.manual.saved' })).toBeDisabled()
  })

  it('rende il diario vuoto e segnala una persistenza manuale non confermata', async () => {
    const user = userEvent.setup()
    mocks.registerDiary.mockReturnValue(diaryEntry({ id: 'not-persisted' }))
    render(<DiaryScreen />)
    expect(screen.getByText('diary.day.emptyTitle')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'diary.week.share' })).toBeDisabled()
    await user.click(screen.getByRole('button', { name: 'diary.week.manual' }))
    await user.type(screen.getByLabelText('diary.manual.name'), 'Non persistito')
    await user.click(screen.getByRole('button', { name: 'diary.manual.action' }))
    expect(screen.getByText('common.feedback.persistenceUnconfirmed')).toBeInTheDocument()
  })

  it('usa nutrienti reali per rinominare, salvare, condividere e svuotare il pasto', async () => {
    const user = userEvent.setup()
    const item = mealItemFromFood(verifiedFood(), verifiedFood().porzione_standard_g)
    mocks.meal = mealWith(item)
    mocks.shareCard.mockResolvedValue(false)
    render(<MealScreen />)

    const name = screen.getByLabelText('meal.form.name')
    await user.clear(name)
    await user.type(name, 'Cena completa')
    expect(mocks.setMealName).toHaveBeenCalled()
    await user.click(screen.getByRole('button', { name: 'common.actions.ateIt' }))
    expect(mocks.registerDiary).toHaveBeenCalledOnce()
    expect(await screen.findByRole('button', { name: 'meal.saved' })).toBeDisabled()
    await user.click(screen.getByRole('button', { name: 'common.actions.share' }))
    expect(await screen.findByText('common.feedback.shareUnavailable')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'common.actions.emptyMeal' }))
    await user.click(screen.getByRole('button', { name: /common.aria.removeFromMeal/ }))
    expect(mocks.clearMeal).toHaveBeenCalledOnce()
    expect(mocks.removeItem).toHaveBeenCalledWith('meal-1')
  })

  it('rende stato vuoto e blocca il salvataggio di nutrienti irrisolti', () => {
    const { rerender } = render(<MealScreen />)
    expect(screen.getByRole('heading', { name: 'meal.empty.title' })).toBeInTheDocument()
    const item = { ...mealItemFromFood(verifiedFood(), 100), protein: null, unresolved: 1 }
    mocks.meal = mealWith(item, { protein: null, unresolved: 1 })
    rerender(<MealScreen />)
    expect(screen.getByText('meal.unresolved')).toBeInTheDocument()
    expect(screen.getByText('meal.cannotSave')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'common.actions.ateIt' })).toBeDisabled()
  })
})

describe('SearchScreen', () => {
  it('filtra il catalogo reale e copre risultato vuoto e dettaglio mancante', async () => {
    const user = userEvent.setup()
    const { rerender } = render(<SearchScreen />)
    const search = screen.getByLabelText('catalog.list.searchLabel')
    await user.type(search, 'Spaghetti cotti al dente')
    expect(screen.getByRole('link', { name: /Spaghetti cotti al dente/ })).toHaveAttribute('href', '#search/spaghetti-cotti-al-dente')
    await user.clear(search)
    await user.type(search, 'nessun-alimento-verificato-xyz')
    expect(screen.getByText('catalog.list.empty')).toBeInTheDocument()

    rerender(<SearchScreen foodId="inesistente" />)
    expect(screen.getByText('catalog.list.missing')).toBeInTheDocument()
  })

  it('calcola il dettaglio reale e inoltra grammi, pasto, diario e share', async () => {
    const user = userEvent.setup()
    mocks.shareCard.mockResolvedValue(false)
    render(<SearchScreen foodId="spaghetti-cotti-al-dente" />)
    expect(screen.getByRole('heading', { name: 'Spaghetti cotti al dente' })).toBeInTheDocument()
    const grams = screen.getByLabelText('catalog.detail.gramsLabel')
    fireEvent.change(grams, { target: { value: '2500' } })
    expect(grams).toHaveValue(2000)
    await user.click(screen.getByRole('button', { name: 'common.actions.addToMeal' }))
    expect(mocks.addItem).toHaveBeenCalledWith(expect.objectContaining({ source: { kind: 'catalog', foodId: 'spaghetti-cotti-al-dente' } }))
    await user.click(screen.getByRole('button', { name: 'common.actions.ateIt' }))
    expect(await screen.findByRole('button', { name: 'common.actions.registered' })).toBeDisabled()
    await user.click(screen.getByRole('button', { name: 'catalog.detail.shareChoice' }))
    expect(await screen.findByText('common.feedback.shareIncomplete')).toBeInTheDocument()
  })

  it('sanitizza barcode, gestisce invalid, not-found, errore tipizzato e prodotto con match locale', async () => {
    const user = userEvent.setup()
    const { BarcodeServiceError } = await import('../services/barcodeService')
    mocks.lookupBarcode
      .mockResolvedValueOnce({ status: 'not_found' })
      .mockRejectedValueOnce(new BarcodeServiceError('offline', 'NETWORK_ERROR'))
      .mockResolvedValueOnce({
        status: 'found',
        product: {
          codice: '8001234567890',
          nome: 'Spaghetti cotti al dente',
          marca: 'Quality',
          carbo100: 30,
          carboCorretto: false,
          zuccheri100: 1,
          fibre100: 2,
          proteine100: 6,
          grassi100: 1,
          porzioneG: 80,
        },
      })
    render(<SearchScreen mode="barcode" />)
    const input = screen.getByLabelText('barcode.panel.inputAria')
    await user.type(input, 'abc12')
    expect(input).toHaveValue('12')
    const barcodeForm = input.closest('form')
    expect(barcodeForm).not.toBeNull()
    fireEvent.submit(barcodeForm as HTMLFormElement)
    expect(screen.getByText('barcode.scan.invalidCode')).toBeInTheDocument()
    expect(mocks.lookupBarcode).not.toHaveBeenCalled()

    await user.clear(input)
    await user.type(input, '8001234567890')
    await user.click(screen.getByRole('button', { name: 'common.actions.search' }))
    expect(await screen.findByText('barcode.scan.notFound')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'common.actions.search' }))
    expect(await screen.findByText('errors.barcode.network')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'common.actions.search' }))
    expect(await screen.findByRole('heading', { name: 'Spaghetti cotti al dente' })).toBeInTheDocument()
    expect(screen.getAllByText(/barcode.product.uniqueMatch/).length).toBeGreaterThan(0)
    await user.click(screen.getByRole('button', { name: 'common.actions.addToMeal' }))
    expect(mocks.addItem).toHaveBeenCalledWith(expect.objectContaining({ source: expect.objectContaining({ kind: 'barcode' }) }))
  })

  it('copre ZXing deterministico per contesto non sicuro e scansione immagine', async () => {
    const user = userEvent.setup()
    const result = { getText: () => '8001234567890' }
    mocks.decodeImage.mockResolvedValue(result)
    mocks.lookupBarcode.mockResolvedValue({ status: 'not_found' })
    const { container } = render(<SearchScreen mode="barcode" />)
    await user.click(screen.getByRole('button', { name: /barcode.panel.liveScan/ }))
    expect(screen.getByRole('status')).toHaveTextContent('barcode.scan.secureContext')

    const fileInput = container.querySelector<HTMLInputElement>('input[type="file"]')
    expect(fileInput).not.toBeNull()
    fireEvent.change(fileInput!, { target: { files: [new File(['barcode'], 'barcode.png', { type: 'image/png' })] } })
    await waitFor(() => expect(mocks.decodeImage).toHaveBeenCalledWith('blob:barcode'))
    await waitFor(() => expect(mocks.lookupBarcode).toHaveBeenCalledWith('8001234567890', expect.any(Object)))
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:barcode')
  })

  it('avvia ZXing in secure context, chiude la camera e inoltra una detection valida', async () => {
    const user = userEvent.setup()
    const controls = { stop: vi.fn() }
    type ScanCallback = (result: { getText(): string } | undefined, error: unknown, frameControls: { stop(): void }) => void
    let scanCallback: ScanCallback | undefined
    Object.defineProperty(window, 'isSecureContext', { configurable: true, value: true })
    mocks.decodeConstraints.mockImplementation((_constraints: unknown, _video: unknown, callback: ScanCallback) => {
      scanCallback = callback
      return Promise.resolve(controls)
    })
    mocks.lookupBarcode.mockResolvedValue({ status: 'not_found' })
    render(<SearchScreen mode="barcode" />)

    await user.click(screen.getByRole('button', { name: /barcode.panel.liveScan/ }))
    await waitFor(() => expect(mocks.decodeConstraints).toHaveBeenCalledOnce())
    expect(screen.getByRole('status')).toHaveTextContent('barcode.scan.frameHint')
    await user.click(screen.getByRole('button', { name: /barcode.panel.closeCamera/ }))
    expect(controls.stop).toHaveBeenCalled()
    expect(screen.getByRole('status')).toHaveTextContent('barcode.scan.cameraClosed')

    controls.stop.mockClear()
    await user.click(screen.getByRole('button', { name: /barcode.panel.liveScan/ }))
    await waitFor(() => expect(mocks.decodeConstraints).toHaveBeenCalledTimes(2))
    act(() => scanCallback?.({ getText: () => '8001234567890' }, undefined, controls))
    await waitFor(() => expect(mocks.lookupBarcode).toHaveBeenCalledWith('8001234567890', expect.any(Object)))
    expect(controls.stop).toHaveBeenCalled()
    expect(await screen.findByText('barcode.scan.notFound')).toBeInTheDocument()
  })
})

describe('RecipesScreen e LearnScreen', () => {
  it('filtra ricette reali, mostra missing e usa dati nutrizionali nel dettaglio', async () => {
    const user = userEvent.setup()
    const recipe = verifiedRecipe()
    const { rerender } = render(<RecipesScreen />)
    const search = screen.getByRole('searchbox', { name: 'recipes.list.searchAria' })
    await user.type(search, recipe.nome)
    expect(screen.getByRole('link', { name: new RegExp(recipe.nome) })).toHaveAttribute('href', `#recipes/${recipe.id}`)
    await user.clear(search)
    await user.type(search, 'ricetta-che-non-esiste-xyz')
    expect(screen.getByText('recipes.list.empty')).toBeInTheDocument()

    rerender(<RecipesScreen recipeId="missing" />)
    expect(screen.getByRole('heading', { name: 'recipes.list.missingTitle' })).toBeInTheDocument()
    rerender(<RecipesScreen recipeId={recipe.id} />)
    expect(screen.getByRole('heading', { name: recipe.nome })).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute('src', expect.stringContaining('spaghettialpomodoro'))
    const portionGroup = screen.getByLabelText('recipes.detail.servingsAria')
    await user.click(within(portionGroup).getByRole('button', { name: '1½' }))
    await user.click(screen.getByRole('button', { name: 'common.actions.addToMeal' }))
    expect(mocks.addItem).toHaveBeenCalledWith(expect.objectContaining({ source: { kind: 'recipe', recipeId: recipe.id, portions: 1.5 } }))
    await user.click(screen.getByRole('button', { name: 'common.actions.ateIt' }))
    expect(await screen.findByRole('button', { name: 'common.actions.registeredFeminine' })).toBeDisabled()
    await user.click(screen.getByRole('button', { name: 'common.actions.share' }))
    expect(await screen.findByText('common.feedback.shareSuccess')).toBeInTheDocument()
  })

  it('rende indice, capitolo reale, metodo e capitolo mancante', () => {
    const chapter = LEARNING_CHAPTERS[0]
    const { rerender } = render(<LearnScreen />)
    expect(screen.getByRole('link', { name: /learn.list.quizDataset/ })).toHaveAttribute('href', '#learn/quiz')
    expect(screen.getByRole('link', { name: 'learn.list.method' })).toHaveAttribute('href', '#explanation')
    rerender(<LearnScreen chapterId={chapter.id} />)
    expect(screen.getByRole('heading', { name: chapter.titolo })).toBeInTheDocument()
    expect(screen.getByText('learn.chapter.disclaimer')).toBeInTheDocument()
    rerender(<LearnScreen chapterId="missing" />)
    expect(screen.getByText('learn.chapter.missing')).toBeInTheDocument()
  })

  it('completa un quiz deterministico e verifica la persistenza', async () => {
    const user = userEvent.setup()
    const question = QUIZ_QUESTIONS[0]
    mocks.quizQuestions = [question]
    render(<LearnScreen chapterId="quiz" />)
    expect(screen.getByRole('heading', { name: question.domanda })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: question.opzioni[question.corretta] }))
    expect(screen.getByText(/learn.quiz.correct/)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'learn.quiz.finish' }))
    expect(mocks.saveQuiz).toHaveBeenCalledWith(1)
    expect(screen.getByText('learn.quiz.saved')).toBeInTheDocument()
    expect(screen.queryByText('learn.quiz.persistenceError')).not.toBeInTheDocument()
  })

  it('rende quiz non disponibile e persistenza fallita', async () => {
    mocks.quizQuestions = []
    const { rerender } = render(<LearnScreen chapterId="quiz" />)
    expect(screen.getByText('learn.quiz.unavailable')).toBeInTheDocument()

    mocks.quizQuestions = [QUIZ_QUESTIONS[0]]
    mocks.saveQuiz.mockReturnValue({ fattoOggi: true, streak: 1, record: 0, scoreOggi: 0 })
    rerender(<LearnScreen chapterId="other" />)
    rerender(<LearnScreen chapterId="quiz" />)
    const question = QUIZ_QUESTIONS[0]
    await userEvent.click(screen.getByRole('button', { name: question.opzioni[(question.corretta + 1) % question.opzioni.length] }))
    await userEvent.click(screen.getByRole('button', { name: 'learn.quiz.finish' }))
    expect(screen.getByText('learn.quiz.sessionOnly')).toBeInTheDocument()
    expect(screen.getByText('learn.quiz.persistenceError')).toBeInTheDocument()
  })
})

describe('ExplanationScreen', () => {
  it('rende quattro dimensioni, formula, fonti, limiti e disclaimer', () => {
    render(<ExplanationScreen />)
    for (const dimension of ['quantity', 'speed', 'balance', 'preparation']) {
      expect(screen.getByRole('heading', { name: `method.dimensions.${dimension}.title` })).toBeInTheDocument()
    }
    expect(screen.getByText('method.formula.expression')).toBeInTheDocument()
    expect(screen.getByText(/method\.sources\.catalog/)).toBeInTheDocument()
    expect(screen.getByText('method.limitations.body')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /method.limitations.openLearn/ })).toHaveAttribute('href', '#learn')
    expect(screen.getByText('method.disclaimer')).toBeInTheDocument()
  })
})
