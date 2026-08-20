/* My Mokka service worker — precache + cache-first. Списъкът и името се
   инжектират от Vite плъгина на build (public/ се копира дословно).
   Големите файлове (ръководството, 6.5MB) НЕ влизат в install списъка —
   те се кешират при първото отваряне, за да е бърза инсталацията. */
const ASSETS = ["./assets/golos-text-cyrillic-400-normal-C7us6pn1.woff2","./assets/golos-text-cyrillic-500-normal-BSLQUuP1.woff2","./assets/golos-text-cyrillic-700-normal-BKmY45Ip.woff2","./assets/golos-text-latin-400-normal-Coi1FYaD.woff2","./assets/golos-text-latin-500-normal-BznAvurO.woff2","./assets/golos-text-latin-700-normal-CxmN_Nfd.woff2","./assets/index-BgIf1drq.js","./assets/index-By2XxHsL.css","./assets/logbook-Dwm_J3fD.js","./icons/icon-192.png","./icons/icon-512.png","./icons/mark.svg","./index.html","./lights/CREDITS.md","./lights/tell-tales.ttf","./manifest.webmanifest","./manual-mokka-my16-bg.pdf","./protokol-ptp.pdf"];
const CACHE = "blitz-7df3f028cd1a";
/* PDF-ите не се променят между билдове. Държат се в отделен кеш с постоянно име,
   за да не се теглят 7 MB наново при всеки деплой. Шрифтовете НЕ са тук: малкият
   (tell-tales.ttf) се precache-ва при install, а едрите се кешират нормално. */
const STATIC = 'blitz-static-v1';
const LAZY = /\.pdf$/;

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS.filter((a) => !LAZY.test(a)))));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE && k !== STATIC).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('message', (e) => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return; // bgtoll и др. — директно
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then((hit) => {
      if (hit) return hit;
      return fetch(e.request).then((res) => {
        // Успешен GET от нашия origin се запазва → второто отваряне е offline.
        if (e.request.method === 'GET' && res.ok && res.type === 'basic') {
          const copy = res.clone();
          const bucket = LAZY.test(url.pathname) ? STATIC : CACHE;
          caches.open(bucket).then((c) => c.put(e.request, copy)).catch(() => {});
        }
        return res;
      });
    })
  );
});
