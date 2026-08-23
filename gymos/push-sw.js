/* Push handling, imported into the generated service worker.
 *
 * Lives here rather than in a custom `sw.ts` because vite-plugin-pwa is on the
 * `generateSW` strategy: workbox builds the worker and `workbox.importScripts`
 * is its documented hook for exactly this ("such as a push event listener").
 * Switching to `injectManifest` to own the whole file would mean re-authoring
 * the precache and runtime-caching config that already works.
 *
 * Pushes carry NO payload — see supabase/functions/_shared/webpush.ts. The text
 * is decided here, so nothing about the user's training passes through Apple's
 * or Google's push service. The cost is that this file holds the copy, and a
 * service worker cannot reach the app's i18n bundle, so the strings are
 * duplicated for the two shipped locales and chosen from the tag the client
 * stored at subscribe time.
 */

const PUSH_COPY = {
  en: { rest: { title: "Rest over", body: "Next set." } },
  bg: { rest: { title: "Почивката свърши", body: "Следваща серия." } },
};

/** The locale the app was in when it subscribed; falls back to English. */
async function pushLocale() {
  try {
    const cache = await caches.open("gymlog-push-prefs");
    const res = await cache.match("locale");
    const tag = res ? await res.text() : "en";
    return PUSH_COPY[tag] ? tag : "en";
  } catch {
    return "en";
  }
}

self.addEventListener("push", (event) => {
  event.waitUntil(
    (async () => {
      const copy = PUSH_COPY[await pushLocale()].rest;
      // If a tab is already visible the on-screen timer has it covered, and a
      // notification for something you are looking at is noise.
      const clientList = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
      if (clientList.some((c) => c.visibilityState === "visible")) return;
      await self.registration.showNotification(copy.title, {
        body: copy.body,
        // Same tag means a second alert REPLACES the first rather than stacking
        // — you only ever care about the current rest.
        tag: "gymlog-rest",
        renotify: true,
        icon: "icon-192.png",
        badge: "icon-192.png",
        data: { url: "./#/client" },
      });
    })(),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    (async () => {
      const url = (event.notification.data && event.notification.data.url) || "./";
      const clientList = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
      // Focus the app if it is already open — never open a second copy of a
      // single-page app whose workout state lives in that tab.
      for (const c of clientList) {
        if ("focus" in c) return c.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow(url);
    })(),
  );
});
