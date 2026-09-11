import { expect, test, type Page } from '@playwright/test'

const APP_ORIGIN = 'http://127.0.0.1:4173'

interface AnalysisTextPayload {
  device_id?: unknown
  lang?: unknown
  premium?: unknown
  text?: unknown
}

async function blockExternalRequests(page: Page): Promise<string[]> {
  const blockedRequests: string[] = []
  await page.route(/https?:\/\/.*/, async (route) => {
    const requestUrl = new URL(route.request().url())
    if (requestUrl.origin === APP_ORIGIN) {
      await route.fallback()
      return
    }
    blockedRequests.push(requestUrl.href)
    await route.abort('blockedbyclient')
  })
  return blockedRequests
}

test.use({
  locale: 'it-IT',
  serviceWorkers: 'block',
})

test('canonicalizza il routing, inizializza l’italiano e persiste la lingua scelta', async ({ page }) => {
  const externalRequests = await blockExternalRequests(page)

  await page.goto('/#route-inesistente')

  await expect(page).toHaveURL(/\/#home$/)
  await expect(page.locator('html')).toHaveAttribute('lang', 'it')
  await expect(page).toHaveTitle('GLICOGIG · Analisi piatto')
  await expect(page.getByRole('navigation', { name: 'Navigazione principale' })).toBeVisible()

  const languageSelector = page.getByRole('combobox', { name: 'Lingua dell’app' })
  await languageSelector.selectOption('en')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect.poll(() => page.evaluate(() => localStorage.getItem('glicogig_language_v1'))).toBe('"en"')

  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page.getByRole('combobox', { name: 'App language' })).toHaveValue('en')
  expect(externalRequests).toEqual([])
})

test('usa il catalogo VERIFIED, mantiene il Pasto effimero e persiste il Diario', async ({ page }) => {
  const externalRequests = await blockExternalRequests(page)

  await page.goto('/#search')
  await page.getByLabel('Nome o sinonimo').fill('spaghetti')
  await page.getByRole('link', { name: /^Spaghetti cotti al dente/ }).click()

  await expect(page).toHaveURL(/#search\/spaghetti-cotti-al-dente$/)
  await expect(page.getByRole('heading', { name: 'Spaghetti cotti al dente' })).toBeVisible()
  await expect(page.getByLabel('Quantità in grammi')).toHaveValue('180')

  await page.getByRole('button', { name: 'Aggiungi al pasto' }).click()
  await expect(page.getByRole('button', { name: 'Aggiunto al pasto' })).toBeDisabled()
  await page.getByRole('button', { name: 'L’ho mangiato' }).click()
  await expect(page.getByRole('button', { name: 'Registrato' })).toBeDisabled()

  const diary = await page.evaluate(() => {
    const raw = localStorage.getItem('glicogig_diario')
    return raw ? JSON.parse(raw) as unknown : null
  })
  expect(diary).toEqual([
    expect.objectContaining({
      fonte: 'catalogo',
      nome: 'Spaghetti cotti al dente',
      carbo: expect.any(Number),
      grammi: expect.any(Number),
      kcal: expect.any(Number),
    }),
  ])

  await page.getByRole('link', { name: /Apri Pasto/ }).click()
  await expect(page.locator('main').getByText('Spaghetti cotti al dente')).toBeVisible()

  await page.reload()
  await expect(page.locator('main').getByText('Spaghetti cotti al dente')).toHaveCount(0)

  await page.goto('/#diary')
  await expect(page.locator('main').getByText('Spaghetti cotti al dente').first()).toBeVisible()
  expect(externalRequests).toEqual([])
})

test('intercetta localmente l’analisi testuale non-food e conserva la password solo nella scheda', async ({ context, page }) => {
  const externalRequests = await blockExternalRequests(page)
  let capturedPayload: AnalysisTextPayload | null = null
  let capturedAccessKey: string | null = null

  await page.route('**/api/analyze-text', async (route) => {
    const request = route.request()
    capturedPayload = request.postDataJSON() as AnalysisTextPayload
    capturedAccessKey = await request.headerValue('x-app-access-key')
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ e_cibo: false }),
    })
  })

  await page.goto('/#photo')
  await page.getByRole('button', { name: 'Testo' }).click()
  await page.getByLabel('Password del sito').fill('e2e-local-key')
  await page.getByLabel('Ingredienti e quantità del piatto').fill('una scarpa blu')
  await page.getByRole('button', { name: 'Analizza descrizione' }).click()

  await expect(page.getByRole('heading', { name: 'Analisi non completata' })).toBeVisible()
  await expect(page.getByText('Valori nutrizionali')).toHaveCount(0)
  expect(capturedAccessKey).toBe('e2e-local-key')
  expect(capturedPayload).toEqual({
    device_id: expect.stringMatching(/^dev_[A-Za-z0-9_-]+$/),
    lang: 'it',
    premium: expect.any(Boolean),
    text: 'una scarpa blu',
  })
  await expect.poll(() => page.evaluate(() => sessionStorage.getItem('glicogig_access_key'))).toBe('e2e-local-key')

  await page.reload()
  await expect(page.getByLabel('Password del sito')).toHaveValue('e2e-local-key')

  const secondPage = await context.newPage()
  const secondPageExternalRequests = await blockExternalRequests(secondPage)
  await secondPage.goto('/#photo')
  await expect(secondPage.getByLabel('Password del sito')).toHaveValue('')
  expect(secondPageExternalRequests).toEqual([])
  expect(externalRequests).toEqual([])
})

test('gestisce un barcode not-found tramite la sola API locale intercettata', async ({ page }) => {
  const externalRequests = await blockExternalRequests(page)
  let requestedCode: string | null = null

  await page.route('**/api/barcode?*', async (route) => {
    const requestUrl = new URL(route.request().url())
    requestedCode = requestUrl.searchParams.get('code')
    expect(route.request().method()).toBe('GET')
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ status: 'not_found' }),
    })
  })

  await page.goto('/#barcode')
  await page.getByLabel('Codice a barre').fill('123456')
  await page.getByRole('button', { name: 'Cerca' }).click()

  await expect(page.getByText('Prodotto non trovato.')).toBeVisible()
  await expect(page.getByText(/Carboidrati \/ 100 g/)).toHaveCount(0)
  expect(requestedCode).toBe('123456')
  expect(externalRequests).toEqual([])
})
