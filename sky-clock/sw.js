// Offline support. Network first, so a fresh deploy shows up at once; the cache is only the fallback.
const CACHE = 'sky-clock-v1';
const SHELL = ['./', 'index.html', 'style.css', 'app.js', 'astro.js', 'zone.js', 'icon.svg', 'manifest.webmanifest'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)));
  self.skipWaiting();
});
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  const cacheable = url.origin === location.origin || /(^|\.)fonts\.(googleapis|gstatic)\.com$/.test(url.host);
  if (e.request.method !== 'GET' || !cacheable) return; // forecasts and city search always go to the network
  e.respondWith(
    fetch(e.request)
      .then((r) => {
        const copy = r.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
        return r;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true })),
  );
});
