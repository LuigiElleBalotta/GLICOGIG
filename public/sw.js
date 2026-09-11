const CACHE_NAME = 'glicogig-shell-v6'
const MANIFEST_URL = '/vite-manifest.json'
const APP_SHELL = [
  '/manifest.webmanifest',
  '/icons/glicogig-icon-192.svg',
  '/icons/glicogig-icon-512.svg',
  '/icons/glicogig-apple-touch-icon.png',
]

function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function sameOriginAssetsFromHtml(html) {
  const assets = new Set()
  for (const match of html.matchAll(/\b(?:src|href)=["']([^"'#]+)["']/gi)) {
    try {
      const url = new URL(match[1], self.location.origin)
      if (url.origin === self.location.origin && !url.pathname.startsWith('/api/')) {
        assets.add(`${url.pathname}${url.search}`)
      }
    } catch {
      // Un riferimento non valido non fa parte della shell installabile.
    }
  }
  return [...assets]
}

function sameOriginAssetsFromManifest(manifest) {
  if (!isRecord(manifest) || Object.keys(manifest).length === 0) {
    throw new Error('Manifest Vite non valido durante l’installazione.')
  }

  const assets = new Set()
  for (const record of Object.values(manifest)) {
    if (!isRecord(record) || typeof record.file !== 'string' || !record.file.trim()) {
      throw new Error('Record del manifest Vite non valido durante l’installazione.')
    }

    const candidates = [record.file]
    for (const field of ['css', 'assets']) {
      if (record[field] === undefined) continue
      if (!Array.isArray(record[field]) || record[field].some((value) => typeof value !== 'string' || !value.trim())) {
        throw new Error('Asset del manifest Vite non valido durante l’installazione.')
      }
      candidates.push(...record[field])
    }

    for (const candidate of candidates) {
      const url = new URL(candidate, self.location.origin)
      if (url.origin === self.location.origin) assets.add(`${url.pathname}${url.search}`)
    }
  }
  return [...assets]
}

async function precacheAppShell() {
  const [rootResponse, manifestResponse] = await Promise.all([
    fetch('/', { cache: 'reload' }),
    fetch(MANIFEST_URL, { cache: 'reload' }),
  ])
  if (!rootResponse.ok) throw new Error('Shell non disponibile durante l’installazione.')
  if (!manifestResponse.ok) throw new Error('Manifest Vite non disponibile durante l’installazione.')

  const [html, manifest] = await Promise.all([
    rootResponse.clone().text(),
    manifestResponse.clone().json(),
  ])
  const manifestAssets = sameOriginAssetsFromManifest(manifest)
  const cache = await caches.open(CACHE_NAME)
  await Promise.all([
    cache.put('/', rootResponse),
    cache.put(MANIFEST_URL, manifestResponse),
  ])
  await cache.addAll([...new Set([
    ...APP_SHELL,
    ...sameOriginAssetsFromHtml(html),
    ...manifestAssets,
  ])])
}

self.addEventListener('install', (event) => {
  event.waitUntil(precacheAppShell().then(() => self.skipWaiting()))
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys
        .filter((key) => key.startsWith('glicogig-shell-') && key !== CACHE_NAME)
        .map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  )
})

async function cacheResponse(request, response) {
  if (!response.ok) return
  try {
    const cache = await caches.open(CACHE_NAME)
    await cache.put(request, response.clone())
  } catch {
    // Una quota esaurita non deve rendere inutilizzabile la risposta di rete.
  }
}

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return

  const url = new URL(request.url)
  if (url.origin !== self.location.origin || url.pathname.startsWith('/api/')) return

  const isDesignSystemRequest = url.pathname === '/design-system'
    || url.pathname.startsWith('/design-system/')
  if (isDesignSystemRequest) return

  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const response = await fetch(request)
        if (url.pathname === '/') await cacheResponse('/', response)
        return response
      } catch {
        return caches.match('/')
      }
    })())
    return
  }

  event.respondWith((async () => {
    const cached = await caches.match(request)
    if (cached) return cached
    const response = await fetch(request)
    await cacheResponse(request, response)
    return response
  })())
})
