// Template: vite.config.js fills in the file list and the version at build time.
const CACHE = 'vitrum-e531dd4c3d';
const FILES = ["./","assets/Agenda-BVwwatRN.js","assets/Bench-Bj95fbH2.js","assets/Cull-z44NGWNy.js","assets/Families-CE31Ytud.js","assets/Print-BFB0QEQ0.js","assets/Print3D-DHI_7VTe.js","assets/Settings-B5JSg3rh.js","assets/ai-BeaQ442o.js","assets/cards-BDDPRqwy.js","assets/caveat-cyrillic-700-normal-BIyejhEL.woff2","assets/caveat-latin-700-normal-D8_1Nw6V.woff2","assets/clip-Dt9SYgEQ.js","assets/comfortaa-cyrillic-500-normal-Ca-TWkCb.woff2","assets/comfortaa-cyrillic-700-normal-BojaBofG.woff2","assets/comfortaa-latin-500-normal-Bc8WElh3.woff2","assets/comfortaa-latin-700-normal-DOtxUU44.woff2","assets/controls-BEUQPQIy.js","assets/cormorant-garamond-cyrillic-500-italic-DVnfXoMy.woff2","assets/cormorant-garamond-cyrillic-500-normal-CyAY5ZLS.woff2","assets/cormorant-garamond-cyrillic-600-normal-C2atO-64.woff2","assets/cormorant-garamond-latin-500-italic-Y14P-dkT.woff2","assets/cormorant-garamond-latin-500-normal-BsRWmXhO.woff2","assets/cormorant-garamond-latin-600-normal-Co1r35X9.woff2","assets/db-CZ7hBenm.js","assets/dcp-B3KDZu8c.js","assets/depth-HabhyexZ.js","assets/dist-BgOywc73.js","assets/drift-xY885Epi.js","assets/edits-qqeqlYeU.js","assets/engine-GnBQo-cP.js","assets/faces-CHXH9ljd.js","assets/families-Dmqk7KBG.js","assets/fix-BNKAzqxu.js","assets/fixity--yKbIEg8.js","assets/fonts-ClK9UryQ.css","assets/forms-DTIdyihZ.js","assets/forum-cyrillic-400-normal-Cl8kDjnZ.woff2","assets/forum-latin-400-normal-OEvxT1Ba.woff2","assets/geometry-cmOQihwv.js","assets/google-CIVsznX_.js","assets/great-vibes-cyrillic-400-normal-C-wcqNJs.woff2","assets/great-vibes-latin-400-normal-q5-78SH_.woff2","assets/i18n-Nk5kuZ8Z.js","assets/index-D1fm0TFg.js","assets/index-tbf_rF4a.css","assets/jobs-DUISbvKO.js","assets/judge-BmJ5DKaw.js","assets/libraw-CKnqEbQ6.wasm","assets/libraw-CrO9cM8O.js","assets/lightroom-CM3kBmVu.js","assets/lobster-cyrillic-400-normal-DeMp0mA3.woff2","assets/lobster-latin-400-normal-VmWungf4.woff2","assets/lrcat-CT4ACjWj.js","assets/make-DeOUvKnq.js","assets/maps-DjIjX9me.js","assets/mark-Ca8bJIOh.js","assets/ml-BAb99xUL.js","assets/montserrat-cyrillic-400-normal-BPq32Q8K.woff2","assets/montserrat-cyrillic-700-normal-D-Pqjtdp.woff2","assets/montserrat-latin-400-normal-BLhwKU8k.woff2","assets/montserrat-latin-700-normal-BdjcYUrC.woff2","assets/near-MTG6SfI-.js","assets/onday-BUKA5c6l.js","assets/optics-CVUIf9kL.js","assets/ort.wasm.bundle.min-B3Hw3ueR.js","assets/people-D7-TSD1O.js","assets/playfair-display-cyrillic-500-normal-GO7-LTbC.woff2","assets/playfair-display-cyrillic-800-normal-BNMG-Q7a.woff2","assets/playfair-display-latin-500-normal-DIxvyhka.woff2","assets/playfair-display-latin-800-normal-lwhkvH_6.woff2","assets/preload-helper-DclECHGd.js","assets/products-Cv55NJAA.js","assets/restore-CjFsPUDx.js","assets/rights-BDGuCGNA.js","assets/rights-D-7XAj1_.js","assets/rolldown-runtime-COiEfhsA.js","assets/scan-HN0HNvK5.js","assets/state-B7v03bXi.js","assets/story-DAaYeg1f.js","assets/strip-DwAttG0h.js","assets/vision_bundle-cZV-QM9F.js","assets/who-6dGawQ5u.js","assets/worker-ChbM-AHb.js","assets/worker-Cy40tlON.js","google.html","icon-180.png","icon-192.png","icon-512.png","icon.svg","index.html","manifest.webmanifest"];

self.addEventListener('install', (event) => {
  // past the browser's own cache: the server lets it keep a page for ten minutes, and a new version must not be filled with the old one
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(FILES.map((file) => new Request(file, { cache: 'reload' })))).then(() => self.skipWaiting()));
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

// The face model and its runtime (mp/) are eighteen megabytes that only the Select tab needs, and the model that tells
// faces apart (id/) with its runtime (assets/ort-wasm…) twenty-five more. They do not change with the app: fetched when
// first asked for, then kept in a cache of their own that outlives every update. (After upgrading the runtime in mp/,
// give FACES a new name; the other carries its version in its file name.)
const FACES = 'faces-1';
const kept = (request) => caches.open(FACES).then((cache) => cache.match(request).then((hit) => hit || fetch(request).then((res) => { if (res.ok) cache.put(request, res.clone()); return res; })));

// The app is its own files and nothing else: answer from the cache, fall back to the network.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== location.origin) return;
  if (/\/(mp|id|models)\/|\/assets\/ort-wasm/.test(new URL(event.request.url).pathname)) { event.respondWith(kept(event.request).then(isolate)); return; }
  event.respondWith(caches.match(event.request, { ignoreSearch: true }).then((hit) => hit || fetch(event.request)).then(isolate));
});
