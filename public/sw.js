const CACHE_NAME = 'glicogig-shell-v5'
const APP_SHELL = [
  '/manifest.webmanifest',
  '/icons/glicogig-icon-192.svg',
  '/icons/glicogig-icon-512.svg',
  '/icons/glicogig-apple-touch-icon.png',
]

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

async function precacheAppShell() {
  const rootResponse = await fetch('/', { cache: 'reload' })
  if (!rootResponse.ok) throw new Error('Shell non disponibile durante l’installazione.')

  const html = await rootResponse.clone().text()
  const cache = await caches.open(CACHE_NAME)
  await cache.put('/', rootResponse)
  await cache.addAll([...new Set([...APP_SHELL, ...sameOriginAssetsFromHtml(html)])])
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

  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const response = await fetch(request)
        await cacheResponse('/', response)
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
