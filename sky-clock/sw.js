// Offline support. This file is a template: `vite build` fills in the two placeholders below
// (see vite.config.js) and writes the result to dist/sw.js. It is not used in development.
const CACHE = 'sky-clock-def702cbd1';
const PRECACHE = ["./","assets/bg-C6zTef65.js","assets/cormorant-garamond-italic-cyrillic-C5ZlGLFt.woff2","assets/cormorant-garamond-italic-latin-C-nL33vl.woff2","assets/cormorant-garamond-italic-latin-ext-PWzi_-0y.woff2","assets/cormorant-garamond-normal-cyrillic-BWCqVJN0.woff2","assets/cormorant-garamond-normal-latin-CUoBjw-S.woff2","assets/cormorant-garamond-normal-latin-ext-ltf1AbuM.woff2","assets/events-worker-B-mOYPID.js","assets/index-CVp5UaRb.js","assets/index-DZ9S98-4.css","assets/orloj-fonts-CHIjyb0W.css","assets/rolldown-runtime-DN1TCW_I.js","assets/start-CxyKMTxM.js","assets/sunstone-art-DE0tiKQ9.js","assets/toast-CBEhSObD.js","icon-180.png","icon-512.png","icon.svg","index.html","manifest.webmanifest"];

self.addEventListener('install', (event) => {
  // 'reload' skips the browser's own cache: the offline copy must be what the server has now.
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(PRECACHE.map((url) => new Request(url, { cache: 'reload' })))));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) if (key !== CACHE) await caches.delete(key); // drop older versions
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  const own = url.origin === location.origin;
  // Forecasts and city search always go to the network: only our own files are kept.
  if (event.request.method !== 'GET' || !own) return;

  // Built files carry a hash of their contents in their name, so a kept copy can never be stale.
  if (url.pathname.includes('/assets/')) {
    event.respondWith(caches.match(event.request).then((hit) => hit ?? fetchAndKeep(event.request)));
    return;
  }
  // Everything else (the page, textures, icons): the network first, so a new version shows at once;
  // the kept copy is the fallback when there is no network. 'no-cache' has the browser check with
  // the server instead of trusting its own copy: an old page would name built files that are gone.
  // (A navigation can't be re-wrapped with options, so the page is asked for by its address.)
  const fresh = new Request(event.request.mode === 'navigate' ? url.href : event.request, { cache: 'no-cache' });
  event.respondWith(fetchAndKeep(fresh, event.request).catch(() => caches.match(event.request, { ignoreSearch: true })));
});

/** Fetches `request` and keeps a good answer under `key` (the request as the page made it). */
async function fetchAndKeep(request, key = request) {
  const response = await fetch(request);
  if (response.ok) {
    const copy = response.clone();
    caches.open(CACHE).then((cache) => cache.put(key, copy));
  }
  return response;
}
