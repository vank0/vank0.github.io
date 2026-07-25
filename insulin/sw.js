const CACHE = 'zoneboard-v10';
const ASSETS = ['.', 'index.html', 'styles.css', 'app.js', 'hr.js', 'charts.js', 'sensors.js', 'manifest.webmanifest', 'icons/icon.svg'];

self.addEventListener('install', (e) => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(() => {})); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;                 // never cache YouTube etc.
  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request)));
});
