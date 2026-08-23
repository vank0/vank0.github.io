/* Push handling, imported into the generated service worker.
 *
 * Lives here rather than in a custom `sw.ts` because vite-plugin-pwa is on the
 * `generateSW` strategy: workbox builds the worker and `workbox.importScripts`
 * is its documented hook for exactly this ("such as a push event listener").
 * Switching to `injectManifest` to own the whole file would mean re-authoring
 * the precache and runtime-caching config that already works.
 *
 * The push carries an ENCRYPTED discriminator and nothing else — see
 * supabase/functions/_shared/aes128gcm.ts. `{"k":"rest"}` is two bytes of
 * meaning; the words live here, so nothing about the user's training reaches
 * Apple's or Google's push service even in ciphertext. The cost is that this
 * file holds the copy, and a service worker cannot reach the app's i18n bundle,
 * so the strings are duplicated for the two shipped locales and chosen from the
 * tag the client stored at subscribe time.
 *
 * The copy is therefore PARAMETER-FREE by construction. Naming the routine
 * would mean either sending it (which the encryption makes safe but the privacy
 * rule declines) or two raw IndexedDB reads from a file no type-checker covers,
 * where a rename in db.ts breaks the reminder silently at 6am.
 */

const PUSH_COPY = {
  en: {
    rest: { title: "Rest over", body: "Next set." },
    plan: { title: "Workout time", body: "Your scheduled workout starts now." },
    leave: { title: "Time to leave", body: "Leave now to get there for your workout." },
    test: { title: "Notifications are working", body: "This is what a rest alert will look like." },
  },
  bg: {
    rest: { title: "Почивката свърши", body: "Следваща серия." },
    plan: { title: "Време за тренировка", body: "Планираната тренировка започва сега." },
    leave: { title: "Време е да тръгваш", body: "Тръгни сега, за да стигнеш за тренировката." },
    test: { title: "Известията работят", body: "Така ще изглежда сигналът за края на почивката." },
  },
};

/** Where each kind belongs. The schedule is a TAB of Progress, not a route of
 *  its own — a guessed /client/schedule hits the catch-all and lands on Today. */
const PUSH_URL = {
  rest: "./#/client",
  plan: "./#/client/progress?tab=history",
  leave: "./#/client/progress?tab=history",
  test: "./#/client",
};

/**
 * This app's own windows, and only this app's.
 *
 * `matchAll` returns every SAME-ORIGIN window, and `includeUncontrolled` widens
 * that to clients outside this worker's scope. One origin here serves /gymos/,
 * /gymos-coach/ and /gymos-gym/, plus every other PWA on vank0.github.io and the
 * previous /gymlog/ build that installed devices still hold. Unfiltered, an open
 * coach tab counted as "the user is looking at this", which silenced the rest
 * alert the whole feature exists for — and a notification tap focused whichever
 * of those apps was most recently used and then gave up.
 */
const ownWindows = (list) => list.filter((c) => c.url.startsWith(self.registration.scope));

/** The locale the app was in when it last stored one; falls back to English. */
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

/** The kind, from the encrypted payload. Defaults to `rest` so a push from an
 *  older sender (or a malformed body) still says something true — that was the
 *  only kind before payloads existed. */
function pushKind(event) {
  try {
    const k = event.data && event.data.json().k;
    return PUSH_COPY.en[k] ? k : "rest";
  } catch {
    return "rest";
  }
}

self.addEventListener("push", (event) => {
  event.waitUntil(
    (async () => {
      const kind = pushKind(event);
      const copy = PUSH_COPY[await pushLocale()][kind];
      const clientList = ownWindows(await self.clients.matchAll({ type: "window", includeUncontrolled: true }));
      const visible = clientList.some((c) => c.visibilityState === "visible");
      // ALWAYS show something. The old code returned silently when a window was
      // visible, on the reasoning that a notification for something you are
      // looking at is noise — but the subscription promised `userVisibleOnly`,
      // and Chrome enforces that by substituting its own "This site has been
      // updated in the background", which is strictly worse than the real
      // notification. Silent instead: it lands in the tray without buzzing a
      // phone whose owner is already looking at the timer.
      await self.registration.showNotification(copy.title, {
        body: copy.body,
        // Per kind. One shared tag made a plan reminder REPLACE a live rest
        // alert on the lock screen, and each kind wants its own
        // replace-the-previous behaviour anyway.
        tag: `gymlog-${kind}`,
        renotify: !visible,
        // A test is the one push whose whole purpose is to be noticed, and it is
        // sent from a screen the user is looking at — the exact case the silent
        // branch exists for. Never silence it.
        silent: visible && kind !== "test",
        icon: "icon-192.png",
        badge: "icon-192.png",
        data: { url: PUSH_URL[kind] || "./#/client", kind },
      });
    })(),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const data = event.notification.data || {};
  const url = data.url || "./";
  event.waitUntil(
    (async () => {
      const clientList = ownWindows(await self.clients.matchAll({ type: "window", includeUncontrolled: true }));
      // Focus the app if it is already open — never open a second copy of a
      // single-page app whose workout state lives in that tab.
      for (const c of clientList) {
        if (!("focus" in c)) continue;
        try {
          await c.focus();
        } catch {
          continue; // a client that refuses focus must not end the loop
        }
        // A rest alert deliberately just focuses: the workout screen is where
        // you already were. Anything else has somewhere to go, and the old code
        // discarded `data.url` whenever any window existed — so tapping a plan
        // reminder focused whatever page happened to be open and appeared to do
        // nothing at all.
        if (data.kind && data.kind !== "rest" && "navigate" in c) {
          try {
            return await c.navigate(url);
          } catch {
            /* cross-origin or a client that refuses navigation: focus stands */
          }
        }
        return c;
      }
      if (self.clients.openWindow) return self.clients.openWindow(url);
    })(),
  );
});

/**
 * The user agent can retire a subscription on its own — a browser update, a
 * profile repair, an expiry — and it says so exactly once, here. Nothing
 * listened, so the endpoint in Postgres went stale, the next send got a 410, and
 * the sender then deleted the user's last subscription: push over, permanently,
 * silently.
 *
 * A worker cannot write to Postgres (the session lives in the page), so this
 * only re-subscribes. The app upserts the new endpoint on its next launch, which
 * for an installed PWA is the same day. The key comes from the event itself
 * rather than being duplicated here, so it cannot drift from the one the app
 * subscribed with.
 */
self.addEventListener("pushsubscriptionchange", (event) => {
  event.waitUntil(
    (async () => {
      const key = event.oldSubscription && event.oldSubscription.options && event.oldSubscription.options.applicationServerKey;
      if (!key) return;
      try {
        await self.registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: key });
      } catch {
        /* the browser refused: the app re-subscribes from Settings */
      }
    })(),
  );
});
