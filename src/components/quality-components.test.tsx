import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { getExtractedCatalogEntries } from '../catalog/foodCatalog'
import type { AnalizzaResponse } from '../types/analysis'
import { routeFromHash } from './appNavigation'
import AppShell from './AppShell'
import BottomTabs from './BottomTabs'
import InstallPrompt from './InstallPrompt'
import LanguageSelector from './LanguageSelector'
import PhotoCard from './PhotoCard'
import ResultPanel, { type ViewStatus } from './ResultPanel'

const mocks = vi.hoisted(() => ({
  changeLanguage: vi.fn(),
  registerDiary: vi.fn(),
  shareCard: vi.fn(),
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

vi.mock('../services/shareCard', () => ({ condividiCard: mocks.shareCard }))
vi.mock('../storage/diaryStore', () => ({
  DIARY_STORAGE_KEY: 'quality-diary',
  registraMangiato: mocks.registerDiary,
}))

const originalNavigatorDescriptors = new Map<PropertyKey, PropertyDescriptor | undefined>()
for (const key of ['userAgent', 'platform', 'maxTouchPoints', 'standalone'] as const) {
  originalNavigatorDescriptors.set(key, Object.getOwnPropertyDescriptor(window.navigator, key))
}
const setupMatchMedia = window.matchMedia

function setNavigatorValue(key: PropertyKey, value: unknown): void {
  Object.defineProperty(window.navigator, key, { configurable: true, value })
}

function restoreNavigator(): void {
  for (const [key, descriptor] of originalNavigatorDescriptors) {
    if (descriptor) Object.defineProperty(window.navigator, key, descriptor)
    else delete (window.navigator as unknown as Record<PropertyKey, unknown>)[key]
  }
}

function installMediaQuery(initialMatches = false) {
  let matches = initialMatches
  let changeListener: ((event: MediaQueryListEvent) => void) | undefined
  const mediaQuery = {
    get matches() { return matches },
    media: '(display-mode: standalone)',
    onchange: null,
    addEventListener: vi.fn((_type: string, listener: EventListenerOrEventListenerObject) => {
      changeListener = listener as (event: MediaQueryListEvent) => void
    }),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  } as unknown as MediaQueryList
  const matchMedia = vi.fn(() => mediaQuery)
  Object.defineProperty(window, 'matchMedia', { configurable: true, value: matchMedia })
  return {
    mediaQuery,
    setMatches(value: boolean) {
      matches = value
      changeListener?.({ matches: value, media: mediaQuery.media } as MediaQueryListEvent)
    },
  }
}

const callbacks = () => ({
  onRetry: vi.fn(),
  onIngredientGramsChange: vi.fn(),
  onPortionPresetChange: vi.fn(),
  onRawWeightModeChange: vi.fn(),
  onAddToSession: vi.fn(),
  onAnalyzeAnother: vi.fn(),
})

function resultProps(status: ViewStatus, overrides: Partial<React.ComponentProps<typeof ResultPanel>> = {}) {
  return {
    status,
    result: null,
    resultOrigin: 'photo' as const,
    error: '',
    hasInput: false,
    portionPreset: null,
    rawWeightMode: 'cooked' as const,
    addedToMeal: false,
    mealItemCount: 0,
    ...callbacks(),
    ...overrides,
  }
}

beforeEach(() => {
  window.history.replaceState(null, '', '#home')
  mocks.changeLanguage.mockReset()
  mocks.registerDiary.mockReset()
  mocks.shareCard.mockReset().mockResolvedValue(true)
  mocks.t.mockClear()
})

afterEach(() => {
  restoreNavigator()
  Object.defineProperty(window, 'matchMedia', { configurable: true, value: setupMatchMedia })
})

describe('AppShell, lingua e navigazione', () => {
  it.each([
    ['', { page: 'home' }],
    ['#/', { page: 'home' }],
    ['#/recipes/pasta%20fredda/', { page: 'recipes', id: 'pasta fredda' }],
    ['#barcode', { page: 'barcode' }],
    ['#search/alimento', { page: 'search', id: 'alimento' }],
    ['#meal/extra', null],
    ['#photo/id', null],
    ['#recipes/%E0%A4%A', null],
    ['#unknown', null],
  ])('interpreta in modo deterministico %s', (hash, expected) => {
    expect(routeFromHash(hash)).toEqual(expected)
  })

  it('normalizza un hash invalido e sincronizza route, scroll e tab alias', async () => {
    window.history.replaceState(null, '', '#unknown')
    render(<AppShell>{(route) => <output data-testid="route">{route.page}:{'id' in route ? route.id : ''}</output>}</AppShell>)

    await waitFor(() => expect(window.location.hash).toBe('#home'))
    expect(screen.getByTestId('route')).toHaveTextContent('home:')
    expect(screen.getByRole('link', { name: 'nav.tabs.home' })).toHaveAttribute('aria-current', 'page')

    window.location.hash = '#barcode'
    fireEvent(window, new HashChangeEvent('hashchange'))
    await waitFor(() => expect(screen.getByTestId('route')).toHaveTextContent('barcode:'))
    expect(screen.getByRole('link', { name: 'nav.tabs.search' })).toHaveAttribute('aria-current', 'page')
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'auto' })

    window.location.hash = '#advice'
    fireEvent(window, new HashChangeEvent('hashchange'))
    await waitFor(() => expect(screen.getByRole('link', { name: 'nav.tabs.diary' })).toHaveAttribute('aria-current', 'page'))
  })

  it('espone sei bottom tabs e una sola tab corrente', () => {
    render(<BottomTabs activeTab="recipes" />)
    const nav = screen.getByRole('navigation', { name: 'nav.mainAria' })
    expect(nav.querySelectorAll('a')).toHaveLength(6)
    expect(screen.getByRole('link', { name: 'nav.tabs.recipes' })).toHaveAttribute('href', '#recipes')
    expect(nav.querySelectorAll('[aria-current="page"]')).toHaveLength(1)
  })

  it('normalizza la lingua e inoltra solo un cambio effettivo', async () => {
    const user = userEvent.setup()
    render(<LanguageSelector />)
    const selector = screen.getByRole('combobox', { name: 'shell.languageLabel' })
    expect(selector).toHaveValue('it')
    expect(screen.getAllByRole('option')).toHaveLength(5)

    await user.selectOptions(selector, 'en')
    expect(mocks.changeLanguage).toHaveBeenCalledWith('en')
  })
})

describe('InstallPrompt', () => {
  it('cattura il prompt Chromium, lo consuma e sparisce dopo appinstalled', async () => {
    installMediaQuery(false)
    setNavigatorValue('userAgent', 'Mozilla/5.0 Chrome/123')
    const user = userEvent.setup()
    const prompt = vi.fn().mockResolvedValue(undefined)
    const installEvent = new Event('beforeinstallprompt', { cancelable: true })
    Object.defineProperties(installEvent, {
      prompt: { value: prompt },
      userChoice: { value: Promise.resolve({ outcome: 'dismissed', platform: 'web' }) },
    })
    render(<InstallPrompt />)

    window.dispatchEvent(installEvent)
    const action = await screen.findByRole('button', { name: 'install.action' })
    expect(installEvent.defaultPrevented).toBe(true)
    await user.click(action)
    await waitFor(() => expect(prompt).toHaveBeenCalledOnce())
    await waitFor(() => expect(screen.queryByRole('button', { name: 'install.action' })).not.toBeInTheDocument())

    window.dispatchEvent(new Event('appinstalled'))
    expect(screen.queryByRole('button', { name: 'install.action' })).not.toBeInTheDocument()
  })

  it('mostra istruzioni iOS, distingue Chrome e chiude con Escape', async () => {
    installMediaQuery(false)
    setNavigatorValue('userAgent', 'Mozilla/5.0 (iPhone) CriOS/123')
    setNavigatorValue('platform', 'iPhone')
    setNavigatorValue('maxTouchPoints', 5)
    const user = userEvent.setup()
    render(<InstallPrompt />)

    const action = await screen.findByRole('button', { name: 'install.action' })
    expect(action).toHaveAttribute('aria-haspopup', 'dialog')
    expect(mocks.t).toHaveBeenCalledWith('install.ios.locationChrome')
    await user.click(action)
    expect(screen.getByRole('dialog', { name: 'install.ios.title' })).toBeInTheDocument()
    fireEvent.keyDown(window, { key: 'Escape' })
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })

  it('resta nascosto in standalone e reagisce al cambio display-mode', async () => {
    const media = installMediaQuery(false)
    setNavigatorValue('userAgent', 'Mozilla/5.0 Chrome/123')
    const installEvent = new Event('beforeinstallprompt', { cancelable: true })
    Object.defineProperties(installEvent, {
      prompt: { value: vi.fn().mockResolvedValue(undefined) },
      userChoice: { value: Promise.resolve({ outcome: 'accepted', platform: 'web' }) },
    })
    render(<InstallPrompt />)
    window.dispatchEvent(installEvent)
    expect(await screen.findByRole('button', { name: 'install.action' })).toBeInTheDocument()

    media.setMatches(true)
    await waitFor(() => expect(screen.queryByRole('button', { name: 'install.action' })).not.toBeInTheDocument())
  })
})

describe('PhotoCard', () => {
  it('inoltra selezione e drop del primo file', async () => {
    const onFile = vi.fn()
    const props = { image: null, busy: false, preparing: false, analyzing: false, onFile, onAnalyze: vi.fn(), onClear: vi.fn() }
    const { container } = render(<PhotoCard {...props} />)
    const [camera] = Array.from(container.querySelectorAll<HTMLInputElement>('input[type="file"]'))
    const photo = new File(['photo'], 'piatto.png', { type: 'image/png' })

    fireEvent.change(camera, { target: { files: [photo] } })
    expect(onFile).toHaveBeenCalledWith(photo)
    expect(camera.value).toBe('')

    const dropZone = screen.getByText('analysis.photo.dropHint').closest('div')
    fireEvent.dragEnter(dropZone!)
    fireEvent.drop(dropZone!, { dataTransfer: { files: [photo, new File(['x'], 'second.png')] } })
    expect(onFile).toHaveBeenLastCalledWith(photo)
  })

  it('rende metadati, stato accessibile e disabilita azioni durante analisi', async () => {
    const user = userEvent.setup()
    const onAnalyze = vi.fn()
    const onClear = vi.fn()
    render(<PhotoCard
      image={{ base64: 'verified', previewUrl: 'blob:verified', width: 640, height: 480, bytes: 1024, mime: 'image/jpeg', name: 'piatto.jpg' }}
      busy
      preparing={false}
      analyzing
      onFile={vi.fn()}
      onAnalyze={onAnalyze}
      onClear={onClear}
    />)

    expect(screen.getByRole('img', { name: 'analysis.photo.selectedAlt' })).toHaveAttribute('src', 'blob:verified')
    expect(screen.getByRole('status')).toHaveTextContent('analysis.photo.status')
    expect(screen.getByRole('button', { name: 'analysis.photo.removeAria' })).toBeDisabled()
    const analyze = screen.getByRole('button', { name: /analysis.photo.analyzing/ })
    expect(analyze).toBeDisabled()
    await user.click(analyze)
    expect(onAnalyze).not.toHaveBeenCalled()
  })
})

describe('ResultPanel', () => {
  it('copre empty, loading ed errore con retry condizionale', async () => {
    const { rerender } = render(<ResultPanel {...resultProps('idle')} />)
    expect(screen.getByRole('heading', { name: 'analysis.result.emptyTitle' })).toBeInTheDocument()

    rerender(<ResultPanel {...resultProps('analyzing')} />)
    expect(screen.getByRole('heading', { name: 'analysis.result.loadingTitle' })).toBeInTheDocument()

    const onRetry = vi.fn()
    rerender(<ResultPanel {...resultProps('error', { error: 'errore-controllato', hasInput: false, onRetry })} />)
    expect(screen.getByText('errore-controllato')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'common.actions.retry' })).not.toBeInTheDocument()

    rerender(<ResultPanel {...resultProps('error', { error: 'errore-controllato', hasInput: true, onRetry })} />)
    await userEvent.click(screen.getByRole('button', { name: 'common.actions.retry' }))
    expect(onRetry).toHaveBeenCalledOnce()
  })

  it('rende il fallback non-food senza calcoli nutrizionali', () => {
    const result: AnalizzaResponse = { e_cibo: false, ingredienti: [] }
    render(<ResultPanel {...resultProps('success', { result })} />)
    expect(screen.getByRole('heading', { name: 'analysis.result.notRecognized' })).toBeInTheDocument()
  })

  it('usa un alimento verificato del catalogo per editing, porzioni e azioni', async () => {
    const food = getExtractedCatalogEntries().find((entry) => entry.nascondi !== true)
    expect(food).toBeDefined()
    const result: AnalizzaResponse = {
      e_cibo: true,
      piatto: food!.nome,
      ingredienti: [{ nome: food!.nome, catalogo_id: food!.id, grammi: food!.porzione_standard_g }],
      confidenza: 0.9,
    }
    const actions = callbacks()
    mocks.registerDiary.mockImplementation(() => {
      const entry = { id: 'verified-entry' }
      window.localStorage.setItem('quality-diary', JSON.stringify([entry]))
      return entry
    })
    render(<ResultPanel {...resultProps('success', { result, portionPreset: 1, ...actions })} />)

    expect(screen.getByRole('heading', { name: food!.nome })).toBeInTheDocument()
    expect(screen.getByLabelText('analysis.pump.outputAria')).toBeInTheDocument()
    fireEvent.change(screen.getByLabelText('common.aria.gramsOf'), { target: { value: String(food!.porzione_standard_g + 1) } })
    expect(actions.onIngredientGramsChange).toHaveBeenCalledWith(0, food!.porzione_standard_g + 1)

    await userEvent.click(screen.getByRole('button', { name: /analysis.portion.small/ }))
    expect(actions.onPortionPresetChange).toHaveBeenCalledWith(0.7)
    await userEvent.click(screen.getByRole('button', { name: 'common.actions.addToMeal' }))
    expect(actions.onAddToSession).toHaveBeenCalledOnce()
    await userEvent.click(screen.getByRole('button', { name: 'common.actions.ateIt' }))
    expect(mocks.registerDiary).toHaveBeenCalledOnce()
    expect(await screen.findByRole('button', { name: 'common.actions.registered' })).toBeDisabled()
    await userEvent.click(screen.getByRole('button', { name: 'common.actions.sharePng' }))
    await waitFor(() => expect(mocks.shareCard).toHaveBeenCalledOnce())
    expect(screen.getByText('common.feedback.shareSuccess')).toBeInTheDocument()
  })
})

describe('rami qualità aggiuntivi dei componenti', () => {
  it('mantiene la lingua corrente e applica gli alias meal/explanation', async () => {
    const user = userEvent.setup()
    const { unmount } = render(<LanguageSelector />)
    await user.selectOptions(screen.getByRole('combobox', { name: 'shell.languageLabel' }), 'it')
    expect(mocks.changeLanguage).not.toHaveBeenCalled()
    unmount()

    window.history.replaceState(null, '', '#meal')
    const first = render(<AppShell>{(route) => <output>{route.page}</output>}</AppShell>)
    expect(screen.getByRole('link', { name: 'nav.tabs.home' })).toHaveAttribute('aria-current', 'page')
    first.unmount()

    window.history.replaceState(null, '', '#explanation')
    render(<AppShell>{(route) => <output>{route.page}</output>}</AppShell>)
    expect(screen.getByRole('link', { name: 'nav.tabs.learn' })).toHaveAttribute('aria-current', 'page')
  })

  it('distingue Safari iOS e resta nascosto con navigator.standalone', async () => {
    installMediaQuery(false)
    setNavigatorValue('userAgent', 'Mozilla/5.0 (iPhone) Version/17.0 Mobile Safari/604.1')
    setNavigatorValue('platform', 'iPhone')
    setNavigatorValue('maxTouchPoints', 5)
    const { unmount } = render(<InstallPrompt />)
    expect(await screen.findByRole('button', { name: 'install.action' })).toBeInTheDocument()
    expect(mocks.t).toHaveBeenCalledWith('install.ios.locationSafari')
    unmount()

    setNavigatorValue('standalone', true)
    render(<InstallPrompt />)
    expect(screen.queryByRole('button', { name: 'install.action' })).not.toBeInTheDocument()
  })

  it('chiude il prompt iOS dai controlli e assorbe un prompt Chromium fallito', async () => {
    installMediaQuery(false)
    setNavigatorValue('userAgent', 'Mozilla/5.0 (iPad) Version/17.0 Mobile Safari/604.1')
    setNavigatorValue('platform', 'iPad')
    setNavigatorValue('maxTouchPoints', 5)
    const user = userEvent.setup()
    const first = render(<InstallPrompt />)
    await user.click(await screen.findByRole('button', { name: 'install.action' }))
    await user.click(screen.getByRole('button', { name: 'common.actions.understood' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    first.unmount()

    setNavigatorValue('userAgent', 'Mozilla/5.0 Chrome/123')
    setNavigatorValue('platform', 'Win32')
    const prompt = vi.fn().mockRejectedValue(new Error('dismissed'))
    const installEvent = new Event('beforeinstallprompt', { cancelable: true })
    Object.defineProperties(installEvent, {
      prompt: { value: prompt },
      userChoice: { value: Promise.resolve({ outcome: 'dismissed', platform: 'web' }) },
    })
    render(<InstallPrompt />)
    window.dispatchEvent(installEvent)
    await user.click(await screen.findByRole('button', { name: 'install.action' }))
    await waitFor(() => expect(prompt).toHaveBeenCalledOnce())
    expect(screen.queryByRole('button', { name: 'install.action' })).not.toBeInTheDocument()
  })

  it('inoltra azioni PhotoCard e rende lo stato di preparazione', async () => {
    const user = userEvent.setup()
    const onAnalyze = vi.fn()
    const onClear = vi.fn()
    const image = { base64: 'verified', previewUrl: 'blob:verified', width: 10, height: 10, bytes: 500, mime: 'image/jpeg' as const, name: 'verified.jpg' }
    const { rerender } = render(<PhotoCard image={image} busy={false} preparing={false} analyzing={false} onFile={vi.fn()} onAnalyze={onAnalyze} onClear={onClear} />)
    await user.click(screen.getByRole('button', { name: 'analysis.photo.removeAria' }))
    await user.click(screen.getByRole('button', { name: 'analysis.photo.action' }))
    expect(onClear).toHaveBeenCalledOnce()
    expect(onAnalyze).toHaveBeenCalledOnce()

    rerender(<PhotoCard image={image} busy preparing analyzing={false} onFile={vi.fn()} onAnalyze={onAnalyze} onClear={onClear} />)
    expect(screen.getByRole('button', { name: 'analysis.photo.preparing' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'analysis.photo.removeAria' })).toBeDisabled()
  })

  it('segnala failure di diario/share e mostra il ramo già aggiunto al pasto', async () => {
    const user = userEvent.setup()
    const food = getExtractedCatalogEntries().find((entry) => entry.id === 'spaghetti-cotti-al-dente')
    expect(food).toBeDefined()
    const result: AnalizzaResponse = {
      e_cibo: true,
      piatto: food!.nome,
      ingredienti: [{ nome: food!.nome, catalogo_id: food!.id, grammi: food!.porzione_standard_g }],
    }
    mocks.registerDiary.mockReturnValue({ id: 'not-persisted' })
    mocks.shareCard.mockResolvedValue(false)
    const actions = callbacks()
    const { rerender } = render(<ResultPanel {...resultProps('success', { result, ...actions })} />)
    await user.click(screen.getByRole('button', { name: 'common.actions.ateIt' }))
    expect(screen.getByText('common.feedback.sessionPersistenceUnconfirmed')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'common.actions.sharePng' }))
    expect(await screen.findByText('common.feedback.shareUnavailable')).toBeInTheDocument()

    rerender(<ResultPanel {...resultProps('success', { result, addedToMeal: true, mealItemCount: 3, ...actions })} />)
    expect(screen.getByText('analysis.actions.dishAdded').closest('[role="status"]')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /analysis.actions.openMealCount/ })).toHaveAttribute('href', '#meal')
    await user.click(screen.getByRole('button', { name: /analysis.actions.analyzeAnother/ }))
    expect(actions.onAnalyzeAnother).toHaveBeenCalledOnce()
    expect(screen.getByLabelText('common.aria.gramsOf')).toBeDisabled()
  })
})