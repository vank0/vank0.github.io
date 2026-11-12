// Template: vite.config.js fills in the file list and the version at build time.
const CACHE = 'vitrum-edd16efe9b';
const FILES = ["./","assets/caveat-cyrillic-700-normal-BIyejhEL.woff2","assets/caveat-latin-700-normal-D8_1Nw6V.woff2","assets/comfortaa-cyrillic-500-normal-Ca-TWkCb.woff2","assets/comfortaa-cyrillic-700-normal-BojaBofG.woff2","assets/comfortaa-latin-500-normal-Bc8WElh3.woff2","assets/comfortaa-latin-700-normal-DOtxUU44.woff2","assets/dist-BgOywc73.js","assets/fonts-D9gM3xP-.css","assets/index-B1Q2rhIx.js","assets/index-COEdoKgp.css","assets/libraw-CKnqEbQ6.wasm","assets/libraw-CrO9cM8O.js","assets/lobster-cyrillic-400-normal-DeMp0mA3.woff2","assets/lobster-latin-400-normal-VmWungf4.woff2","assets/montserrat-cyrillic-400-normal-BPq32Q8K.woff2","assets/montserrat-cyrillic-700-normal-D-Pqjtdp.woff2","assets/montserrat-latin-400-normal-BLhwKU8k.woff2","assets/montserrat-latin-700-normal-BdjcYUrC.woff2","assets/playfair-display-cyrillic-500-normal-GO7-LTbC.woff2","assets/playfair-display-cyrillic-800-normal-BNMG-Q7a.woff2","assets/playfair-display-latin-500-normal-DIxvyhka.woff2","assets/playfair-display-latin-800-normal-lwhkvH_6.woff2","assets/vision_bundle-BeiP3cWa.js","assets/worker-ChbM-AHb.js","icon-180.png","icon-192.png","icon-512.png","icon.svg","index.html","manifest.webmanifest"];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key.startsWith('vitrum-') && key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

// A published copy cannot set its own headers, and the RAW decoder needs the two that make a page
// cross-origin isolated (threads). So every answer leaves here with them added.
const isolate = (res) => {
  if (!res || res.status === 0) return res;
  const headers = new Headers(res.headers);
  headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
  return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
};

// The face model and its runtime (mp/) are eighteen megabytes that only the Select tab needs and that do not change
// with the app: fetched when first asked for, then kept in a cache of their own that outlives every update.
const FACES = 'faces-1';
const kept = (request) => caches.open(FACES).then((cache) => cache.match(request).then((hit) => hit || fetch(request).then((res) => { if (res.ok) cache.put(request, res.clone()); return res; })));

// The app is its own files and nothing else: answer from the cache, fall back to the network.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== location.origin) return;
  if (new URL(event.request.url).pathname.includes('/mp/')) { event.respondWith(kept(event.request).then(isolate)); return; }
  event.respondWith(caches.match(event.request, { ignoreSearch: true }).then((hit) => hit || fetch(event.request)).then(isolate));
});
