/* Blitz service worker — precache + cache-first. Списъкът и името се
   инжектират от Vite плъгина на build (public/ се копира дословно).
   Големите файлове (ръководството, 6.5MB) НЕ влизат в install списъка —
   те се кешират при първото отваряне, за да е бърза инсталацията. */
const ASSETS = ["./assets/golos-text-cyrillic-400-normal-BwL4n7Pb.woff","./assets/golos-text-cyrillic-400-normal-C7us6pn1.woff2","./assets/golos-text-cyrillic-500-normal-BSLQUuP1.woff2","./assets/golos-text-cyrillic-500-normal-hXinzVVQ.woff","./assets/golos-text-cyrillic-700-normal-BKmY45Ip.woff2","./assets/golos-text-cyrillic-700-normal-ClsrbE7_.woff","./assets/golos-text-latin-400-normal-Coi1FYaD.woff2","./assets/golos-text-latin-400-normal-DOuJOmdK.woff","./assets/golos-text-latin-500-normal-BQo4s7Kn.woff","./assets/golos-text-latin-500-normal-BznAvurO.woff2","./assets/golos-text-latin-700-normal-CxmN_Nfd.woff2","./assets/golos-text-latin-700-normal-DAuVRgMH.woff","./assets/index-DuvNH2u4.css","./assets/index-wzMC4qpu.js","./icons/icon-192.png","./icons/icon-512.png","./index.html","./manifest.webmanifest","./manual-mokka-my16-bg.pdf","./protokol-ptp.pdf"];
const CACHE = "blitz-7f71d3be3022";
const LAZY = /manual-.*\.pdf$/;

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS.filter((a) => !LAZY.test(a)))));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
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
          caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
        }
        return res;
      });
    })
  );
});
