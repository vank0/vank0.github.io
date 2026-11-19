// App shell cache so Folio opens without a connection. Saved articles live in their own
// cache, written by the app (src/api.ts); Wikipedia requests never pass through here.
// ponytail: old hashed assets are never pruned. Bump the name to drop them all.
const SHELL = 'folio-shell-v1'

// The first visit is served before this worker is in charge, so nothing of it passes through
// `fetch` below. Store the page and the files it names now, or a first-time visitor who then
// goes offline has nothing to open. Later chunks and fonts are stored as they are used.
self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(SHELL)
      const page = await fetch('./', { cache: 'no-cache' })
      await cache.put('./', page.clone())
      const named = [...(await page.text()).matchAll(/(?:src|href)="(\.\/[^"]+)"/g)].map(m => m[1])
      await Promise.allSettled(named.map(url => cache.add(url)))
      await self.skipWaiting()
    })(),
  )
})
self.addEventListener('activate', event => {
  event.waitUntil(
    caches
      .keys()
      .then(names => Promise.all(names.filter(n => n.startsWith('folio-shell-') && n !== SHELL).map(n => caches.delete(n))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url)
  if (event.request.method !== 'GET' || url.origin !== location.origin) return
  event.respondWith(
    (async () => {
      const cache = await caches.open(SHELL)
      // Built files carry a content hash in their name: a cached copy is always right.
      if (url.pathname.includes('/assets/')) {
        const hit = await cache.match(event.request)
        if (hit) return hit
      }
      try {
        const fresh = await fetch(event.request)
        if (fresh.ok) cache.put(event.request, fresh.clone())
        return fresh
      } catch {
        return (await cache.match(event.request)) ?? (await cache.match('./')) ?? Response.error()
      }
    })(),
  )
})
