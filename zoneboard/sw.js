const CACHE = 'zoneboard-v31';
const ASSETS = ['.', 'index.html', 'styles.css', 'app.js', 'hr.js', 'charts.js', 'sensors.js', 'i18n.js', 'qrcode.js', 'manifest.webmanifest', 'icons/icon.svg'];

self.addEventListener('install', (e) => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(() => {})); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });

// Network-first: always run the newest code when online, fall back to cache offline.
// (Cache-first bit us repeatedly in dev — a stale index.html outlived every asset bump.)
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;                 // never touch YouTube etc.
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(e.request).then(hit => hit || Promise.reject(new Error('offline'))))
  );
});
