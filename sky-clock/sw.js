/**
 * @context Offline support. This file is a template: `vite build` fills in the placeholders
 *   below (see vite.config.js) and writes the result to dist/sw.js. It is not used in
 *   development. The page speaks to it from features/platform/offline.js.
 * @validation Read as text by the build and never bundled: no imports, and nothing a browser
 *   cannot run as it stands. Only the app's own GET requests are answered; forecasts and city
 *   search always go to the network. Messages in: { type: 'pictures' } or
 *   { type: 'keep-pictures' }; out: { type: 'pictures', kept, total }, with failed: true on a miss.
 * @ai_agent_instruction The build fills in only the first occurrence of each placeholder, so
 *   a placeholder's name must never be written in a comment above the line that uses it (this
 *   header names none). The handler for requests tries, in order: the large pictures, the
 *   hashed files under /assets/, then the network first. It runs only in `pnpm preview`.
 */
const CACHE = 'sky-clock-057461d7d0';
const PRECACHE = ["./","assets/Gallery-uD2_Axw_.js","assets/bg-C6fIJMOW.js","assets/camera-CE5st3s1.js","assets/camera-DC7KWmDY.js","assets/cormorant-garamond-italic-cyrillic-C5ZlGLFt.woff2","assets/cormorant-garamond-italic-latin-C-nL33vl.woff2","assets/cormorant-garamond-italic-latin-ext-PWzi_-0y.woff2","assets/cormorant-garamond-normal-cyrillic-BWCqVJN0.woff2","assets/cormorant-garamond-normal-latin-CUoBjw-S.woff2","assets/cormorant-garamond-normal-latin-ext-ltf1AbuM.woff2","assets/eggs-D-8cx6Uk.js","assets/events-worker-B7RdTC89.js","assets/folds-DJE7yDOx.js","assets/great-vibes-cyrillic-Dy8dZvp5.woff2","assets/great-vibes-latin-Bcoi9gjv.woff2","assets/guide-CGbBPcd1.js","assets/hooks-_f050hZG.js","assets/index-D_oaLX_A.css","assets/index-mQqjIbJN.js","assets/orloj-fonts-CHIjyb0W.css","assets/perspective-baGFAXKH.js","assets/photo-week-C13Q8ch-.js","assets/place-CaxvqTZY.js","assets/prefs-kCTK4uwA.js","assets/rolldown-runtime-DN1TCW_I.js","assets/start-D1zIhFCr.js","assets/sunstone-art-DE0tiKQ9.js","assets/timeline-BtS5JnEE.js","assets/toast-77vyFq12.js","assets/view-groups-Dj425mSG.js","icon-180.png","icon-192.png","icon-512.png","icon-maskable-192.png","icon-maskable-512.png","icon-maskable.svg","icon.svg","index.html","manifest.webmanifest","textures/256_moon.jpg","textures/256_sun.jpg","textures/4k_stars_milky_way.jpg"];
// The large pictures (the globes' and planets' textures, the Orloj's calendar plate): kept as they
// are first used, or all at once when the page asks. Their own cache outlives new versions, so a
// new version does not download 13 MB again.
const LATER = ["assets/orloj-calendar-BVDHQcnk.jpg","assets/orloj-calendar-art-DKa70IhX.js","textures/2k_earth_clouds.jpg","textures/2k_earth_daymap.jpg","textures/2k_earth_nightmap.jpg","textures/2k_earth_specular_map.png","textures/2k_jupiter.jpg","textures/2k_mars.jpg","textures/2k_mercury.jpg","textures/2k_moon.jpg","textures/2k_neptune.jpg","textures/2k_saturn.jpg","textures/2k_saturn_ring_alpha.png","textures/2k_sun.jpg","textures/2k_uranus.jpg","textures/2k_venus_atmosphere.jpg","textures/4k_earth_clouds.jpg","textures/4k_earth_daymap.jpg","textures/4k_earth_nightmap.jpg","textures/4k_earth_specular_map.jpg","textures/CREDITS.md"];
const KEEP = 'sky-clock-pictures';

self.addEventListener('install', (event) => {
  // 'reload' skips the browser's own cache: the offline copy must be what the server has now.
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(PRECACHE.map((url) => new Request(url, { cache: 'reload' })))));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) if (key !== CACHE && key !== KEEP) await caches.delete(key); // drop older versions
    const keep = await caches.open(KEEP), wanted = new Set(LATER.map((file) => new URL(file, self.registration.scope).href));
    for (const request of await keep.keys()) if (!wanted.has(request.url)) await keep.delete(request); // (a plate an older version drew)
    await self.clients.claim();
  })());
});

const isLater = (url) => LATER.some((file) => url.href === new URL(file, self.registration.scope).href);

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  const own = url.origin === location.origin;
  // Forecasts and city search always go to the network: only our own files are kept.
  if (event.request.method !== 'GET' || !own) return;

  // The large pictures: the kept copy if there is one (they change only with their name), else fetched and kept
  if (isLater(url)) {
    event.respondWith(caches.match(event.request, { cacheName: KEEP, ignoreVary: true }).then((hit) => hit ?? fetchAndKeep(event.request, event.request, KEEP)));
    return;
  }
  // Built files carry a hash of their contents in their name, so a kept copy can never be stale.
  // (ignoreVary: a server that answers 'Vary: Origin' would otherwise keep a module script, asked for with an Origin, from its copy)
  if (url.pathname.includes('/assets/')) {
    event.respondWith(caches.match(event.request, { ignoreVary: true }).then((hit) => hit ?? fetchAndKeep(event.request)));
    return;
  }
  // Everything else (the page, icons): the network first, so a new version shows at once;
  // the kept copy is the fallback when there is no network. 'no-cache' has the browser check with
  // the server instead of trusting its own copy: an old page would name built files that are gone.
  // (A navigation can't be re-wrapped with options, so the page is asked for by its address.)
  const fresh = new Request(event.request.mode === 'navigate' ? url.href : event.request, { cache: 'no-cache' });
  event.respondWith(fetchAndKeep(fresh, event.request).catch(() => caches.match(event.request, { ignoreSearch: true, ignoreVary: true })));
});

/** Fetches `request` and keeps a good answer under `key` (the request as the page made it). */
async function fetchAndKeep(request, key = request, cacheName = CACHE) {
  const response = await fetch(request);
  if (response.ok) {
    const copy = response.clone();
    caches.open(cacheName).then((cache) => cache.put(key, copy));
  }
  return response;
}

// The page asks how much of the large pictures is kept ({ type: 'pictures' }), or for all of them
// ({ type: 'keep-pictures' }); the answer, and progress while they come, go back as { type: 'pictures', kept, total, bytes }.
self.addEventListener('message', (event) => {
  const type = event.data?.type, reply = (msg) => event.source?.postMessage({ type: 'pictures', ...msg });
  if (type !== 'pictures' && type !== 'keep-pictures') return;
  event.waitUntil((async () => {
    const keep = await caches.open(KEEP), urls = LATER.map((file) => new URL(file, self.registration.scope).href);
    let kept = 0;
    for (const url of urls) if (await keep.match(url)) kept++;
    reply({ kept, total: urls.length });
    if (type !== 'keep-pictures') return;
    for (const url of urls) {
      if (await keep.match(url)) continue;
      try {
        const response = await fetch(url, { cache: 'reload' });
        if (response.ok) { await keep.put(url, response); kept++; }
      } catch { reply({ kept, total: urls.length, failed: true }); return; }
      reply({ kept, total: urls.length });
    }
  })());
});
