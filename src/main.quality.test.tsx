import type { ReactNode } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  createRoot: vi.fn(),
  register: vi.fn(),
  renderRoot: vi.fn(),
}))

vi.mock('react-dom/client', () => ({ createRoot: mocks.createRoot }))
vi.mock('./i18n', () => ({ default: { language: 'it', qualityMock: true } }))
vi.mock('./App', async () => {
  const React = await import('react')
  return { default: () => React.createElement('div', { 'data-testid': 'mock-app' }) }
})
vi.mock('react-i18next', async () => {
  const React = await import('react')
  return {
    I18nextProvider: ({ children }: { children: ReactNode }) => React.createElement(React.Fragment, null, children),
  }
})

const originalServiceWorker = Object.getOwnPropertyDescriptor(window.navigator, 'serviceWorker')

beforeEach(() => {
  vi.resetModules()
  document.body.innerHTML = '<div id="root"></div>'
  mocks.createRoot.mockReset().mockReturnValue({ render: mocks.renderRoot, unmount: vi.fn() })
  mocks.register.mockReset().mockResolvedValue({ scope: '/' })
  mocks.renderRoot.mockReset()
  Object.defineProperty(window.navigator, 'serviceWorker', {
    configurable: true,
    value: { register: mocks.register },
  })
  vi.stubEnv('PROD', false)
})

afterEach(() => {
  vi.unstubAllEnvs()
  vi.restoreAllMocks()
  if (originalServiceWorker) Object.defineProperty(window.navigator, 'serviceWorker', originalServiceWorker)
  else Reflect.deleteProperty(window.navigator, 'serviceWorker')
})

describe('bootstrap main', () => {
  it('monta App nel root con createRoot una sola volta', async () => {
    const root = document.getElementById('root')
    await import('./main')
    expect(mocks.createRoot).toHaveBeenCalledOnce()
    expect(mocks.createRoot).toHaveBeenCalledWith(root)
    expect(mocks.renderRoot).toHaveBeenCalledOnce()
    expect(mocks.renderRoot.mock.calls[0][0]).toEqual(expect.objectContaining({ type: expect.anything() }))
    expect(mocks.register).not.toHaveBeenCalled()
  })

  it('fallisce esplicitamente quando manca #root', async () => {
    document.body.innerHTML = '<main></main>'
    await expect(import('./main')).rejects.toThrow('Elemento root non trovato.')
    expect(mocks.createRoot).not.toHaveBeenCalled()
  })

  it('non registra il service worker in development o senza API browser', async () => {
    await import('./main')
    expect(mocks.register).not.toHaveBeenCalled()

    vi.resetModules()
    mocks.createRoot.mockClear()
    Reflect.deleteProperty(window.navigator, 'serviceWorker')
    vi.stubEnv('PROD', true)
    await import('./main')
    window.dispatchEvent(new Event('load'))
    expect(mocks.register).not.toHaveBeenCalled()
  })

  it('registra /sw.js al load in produzione', async () => {
    vi.stubEnv('PROD', true)
    let loadListener: EventListener | undefined
    vi.spyOn(window, 'addEventListener').mockImplementation((type, listener) => {
      if (type === 'load') loadListener = listener as EventListener
    })
    await import('./main')
    expect(loadListener).toBeDefined()
    expect(mocks.register).not.toHaveBeenCalled()
    loadListener!(new Event('load'))
    expect(mocks.register).toHaveBeenCalledWith('/sw.js')
  })

  it('verifica che main agganci e gestisca il rifiuto della registrazione', async () => {
    vi.stubEnv('PROD', true)
    let rejectionHandler: ((error: unknown) => unknown) | undefined
    const catchHandler = vi.fn((handler: (error: unknown) => unknown) => {
      rejectionHandler = handler
      return Promise.resolve()
    })
    mocks.register.mockReturnValueOnce({ catch: catchHandler })
    let loadListener: EventListener | undefined
    vi.spyOn(window, 'addEventListener').mockImplementation((type, listener) => {
      if (type === 'load') loadListener = listener as EventListener
    })
    await import('./main')
    loadListener!(new Event('load'))
    expect(catchHandler).toHaveBeenCalledOnce()
    expect(rejectionHandler?.(new Error('service worker unavailable'))).toBeUndefined()
  })
})
