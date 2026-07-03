# RepCount

A no-build, offline-first PWA that counts exercise repetitions using the phone's
motion sensors. Put the phone flat on a machine's weight stack (e.g. a lat
pulldown); each full up-and-down cycle of the stack counts as one rep, with a
beep. Reaching the target plays a distinct fanfare; extra reps beep lower.

## How detection works

- Gravity direction is estimated with a slow exponential moving average of
  `accelerationIncludingGravity`.
- Linear acceleration is projected onto the gravity vector → signed vertical
  acceleration, then leaky-integrated into a pseudo vertical velocity.
- A rep is counted when the velocity exceeds the threshold in **both**
  directions (up move + down move, order-agnostic), subject to a minimum
  time-per-rep debounce.
- The **Sensitivity** slider scales the velocity threshold; the live graph on
  the counter card shows the signal against the threshold guides for tuning.

## Running it

Motion sensors require a **secure context** — `https://` or `localhost`.

- Local dev on the Mac: `python3 -m http.server 8080` and open
  `http://localhost:8080` (sensors won't exist on a laptop, but the UI works).
- On the iPhone you need HTTPS. Easiest options:
  - Deploy the folder to any static host (Netlify Drop, GitHub Pages,
    Cloudflare Pages) — it's plain static files, no build step.
  - Or tunnel locally: `npx ngrok http 8080` / Tailscale Serve.
- On iPhone open the HTTPS URL in Safari → Share → **Add to Home Screen** for
  the standalone app. The first tap on **Start set** triggers the iOS motion
  permission prompt (must be user-initiated; that's why it's on the button).

## Notes

- Screen wake lock is requested while a set runs, so the screen stays on while
  the phone sits on the stack.
- Audio uses the Web Audio API (no assets, works offline). Optional spoken
  count uses `speechSynthesis`.
- UI is English/Bulgarian, toggled top-right, persisted in `localStorage`
  along with settings.
