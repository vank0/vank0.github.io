# ZoneBoard — HR Group-Class Console (design)

Date: 2026-07-23
Status: approved design, pre-implementation

## Purpose

A trainer-driven console for group interval / circuit classes, shown on a big-screen
TV. The trainer connects multiple Bluetooth heart-rate straps, names each member and
enters their profile, configures a circuit interval workout with a YouTube playlist,
then runs it. During the workout the screen shows a large tabata-style timer plus a
live per-member view of heart rate, HR zone, an HR line chart, which station/exercise
each member is on right now, an adaptive difficulty suggestion, calories, and a live
effort-points leaderboard.

Heavy visual/behavioural inspiration is taken from the existing `~/tabata-timer` PWA:
the glassmorphism look, the interval config grid, the timer engine (`buildPlan` +
timestamp-based engine), and the YouTube background are lifted from it.

## Hard constraints (not choices — limitations)

- **Web Bluetooth only** → Chromium browsers (Chrome/Edge) only. No Safari, no Firefox.
  Requires HTTPS or `localhost`. The TV must run a Chromium browser.
- Pairing shows **one device picker per sensor**; the trainer clicks "Add sensor" once
  per strap. Auto-reconnect handles mid-workout dropouts.
- Only straps exposing the **standard Heart Rate GATT service** work (Polar H10, Wahoo,
  Coospo, Magene, etc.). Optical-only watches (Apple Watch, most Garmin) do **not**
  broadcast over BLE and are out of scope.
- Practical concurrent-connection ceiling on a single BT adapter is roughly a handful to
  ~10 straps; beyond that reliability depends on the host adapter. Noted, not enforced.
- Big-screen desktop layout only — **not** mobile responsive (explicit non-goal).

## Stack & files

Vanilla JS PWA, **no build step** (same as tabata-timer). ES modules via
`<script type="module">` so pure logic can live in its own file and be unit-tested with
Node directly.

- `index.html` — setup + workout screens.
- `styles.css` — glass design tokens lifted from tabata + new HR/zone/grid styles.
- `app.js` — app state, render loop, timer engine (lifted from tabata `buildPlan` +
  engine), circuit/rotation derivation, adaptive-level logic, presets, persistence.
- `sensors.js` — Web Bluetooth: pairing, GATT connect, HR-measurement notifications,
  auto-reconnect, battery read. Emits `{id, bpm, ts}` and connection-state changes.
- `charts.js` — canvas HR sparkline with zone-color bands (one per member card).
- `hr.js` — **pure** functions, no DOM: `parseHR`, `maxHRFromAge`, `zoneFor`,
  `effortRate`, `keytelKcalPerMin`, `mifflinBmrPerMin`, `stationFor`, `adaptLevel`.
- `test.mjs` — `node:assert` self-check of `hr.js` (the only non-trivial paths).
- `manifest.webmanifest`, `sw.js`, `icons/` — PWA shell (lifted/adapted from tabata).

## Data model

```js
config = {
  intervals: { sets, rounds, setRepeat, work, rest, restSet, prepare, warmup, cooldown },
  targetZone: { low: 3, high: 4 },          // global adaptive target band
  playlistUrl: '',                          // YouTube playlist or video URL
  exercisesOn: true,
  circuits: [                               // one entry per set (1..sets)
    { stations: [                           // ideally length === rounds (= station count)
      { light: '', medium: '', hard: '' },  // one station = one exercise, 3 variants
      // ...
    ] },
    // ...
  ],
}

member[id] = {                              // keyed by BluetoothDevice.id
  name, sex,                                // sex: 'm' | 'f'  (Keytel)
  age, weightKg, heightCm, restHR,          // profile
  maxHROverride,                            // optional; overrides age formula
  betaBlocker,                              // bool → β badge + maxHR warning
  // derived / runtime:
  maxHR,                                    // override ?? maxHRFromAge(age)
  startStation,                             // rotation offset, round-robin default
  level,                                    // 0 light / 1 medium / 2 hard (default 1)
  bpm, connected, battery,
  samples: [{ ts, bpm }],                   // ring buffer, cap ~180 (≈3 min @1Hz)
  points, kcal,                             // running totals
  intervalZones: [],                        // zones sampled in the current work interval
}
```

Persistence: `config` and the member **roster** (id → profile fields, minus runtime) are
saved to `localStorage`. BLE requires re-pairing each session, but Chrome's
`navigator.bluetooth.getDevices()` lets us offer a one-click reconnect to known ids and
re-attach the saved profile.

## HR / zone / calorie math (`hr.js`)

All formulas are the tunable knobs; constants sit at the top of `hr.js`.

- `parseHR(dataView)` — Heart Rate Measurement (0x2A37). Byte 0 = flags. If `flags & 0x01`
  → BPM is uint16 LE at offset 1, else uint8 at offset 1. Returns integer BPM.
- `maxHRFromAge(age)` = `round(208 - 0.7 * age)` (Tanaka).
- `zoneFor(bpm, { maxHR, restHR })` — if `restHR` present use Karvonen HR-reserve:
  `pct = (bpm - restHR) / (maxHR - restHR) * 100`; else `pct = bpm / maxHR * 100`.
  Thresholds: `<50→0 (below), 50–60→Z1, 60–70→Z2, 70–80→Z3, 80–90→Z4, ≥90→Z5`.
  Returns `{ zone: 1..5, pct }` (zone 0 = below Z1, still drawn).
- `effortRate(zone)` — points **per minute**: Z1=0, Z2=1, Z3=2, Z4=3, Z5=4 (0 below Z1).
  Accrued per second as `points += effortRate(zone) / 60`.
- `keytelKcalPerMin(bpm, { sex, weightKg, age })`:
  - male: `(-55.0969 + 0.6309*bpm + 0.1988*weightKg + 0.2017*age) / 4.184`
  - female: `(-20.4022 + 0.4472*bpm - 0.1263*weightKg + 0.074*age) / 4.184`
  - clamped to ≥ 0.
- `mifflinBmrPerMin({ sex, weightKg, heightCm, age })` — Mifflin-St Jeor:
  `bmrDay = 10*weightKg + 6.25*heightCm - 5*age + (sex==='m' ? 5 : -161)`; `/1440`.
  Used as the per-second floor when HR is missing/invalid (this is where `heightCm` is
  used). `kcal += (validBpm ? keytelKcalPerMin(...) : mifflinBmrPerMin(...)) / 60`.

Rounding follows the user's standing convention: 2-digit rounding for displayed
derived numbers (kcal, points); BPM and zone are integers.

## Circuit / rotation (`stationFor`)

- Station count `S = rounds` (rounds/set). A "work" phase carries `round` (1..rounds).
- `stationFor(startStation, round, S)` = `(startStation + (round - 1)) % S`.
- Default `startStation` assignment: round-robin over members in connect order, so
  everyone begins on a different station (wraps if members > stations — normal for busy
  circuits; multiple members share a station).
- The member card shows their current station index + that station's exercise at their
  current `level`. The Stations view inverts it: per station, list the members whose
  `stationFor(...)` equals that station right now.

## Adaptive difficulty (`adaptLevel`)

- Runs at each **work-phase boundary** (on entering a new work interval), using the avg
  zone of the interval just completed (`member.intervalZones`).
- `adaptLevel(currentLevel, avgZone, target)`:
  - `avgZone > target.high` → `max(0, currentLevel - 1)` (too hard, ease off).
  - `avgZone < target.low` → `min(2, currentLevel + 1)` (too easy, push).
  - in-band → unchanged.
- Hysteresis: only one step per boundary; a member needs a full interval out of band to
  move, so it can't oscillate light↔hard within a round. Card shows a ↑/↓ arrow only on
  the interval where the level changed.
- The very first work interval uses the default level (1 = medium) since there's no prior
  interval to judge.

## Web Bluetooth (`sensors.js`)

- `requestDevice({ filters: [{ services: ['heart_rate'] }], optionalServices: ['battery_service'] })`.
- Connect: `device.gatt.connect()` → `getPrimaryService('heart_rate')` →
  `getCharacteristic('heart_rate_measurement')` → `startNotifications()` →
  `characteristicvaluechanged` → `parseHR(event.target.value)` → emit `{id, bpm, ts}`.
- Battery: optional `battery_service` / `battery_level` read on connect + occasional poll.
- Reconnect: listen for `gattserverdisconnected`; retry `gatt.connect()` with capped
  backoff (e.g. 1s, 2s, 4s, cap 8s). Card shows a "reconnecting…" state meanwhile.
- Known-device reconnect on load via `navigator.bluetooth.getDevices()` (Chrome), matched
  to saved roster ids.

## Setup screen

Glass cards, tabata look:

1. **Presets** — save current full `config` under a name; load/delete. `localStorage`.
2. **Sensors** — "Add sensor" (pair). One compact row per member: status dot + name +
   live BPM always visible; an expandable panel holds sex, age, weight, height, resting
   HR, maxHR override, β toggle, battery, remove. Reconnect quick-list for known straps.
3. **Workout** — the tabata stepper grid, lifted: sets, rounds/set, set repeat, work,
   rest, rest between sets, prepare, warmup, cooldown. (When exercises are on, rounds/set
   is labelled as the station count.)
4. **Target zone** — global target band selector (default Z3–Z4).
5. **Exercises** — toggle on; a tab per set (circuit); per station three inputs
   (light / medium / hard) with a shared datalist of past names + a shuffle. Station rows
   numbered to match the rotation.
6. **YouTube playlist** — URL field (playlist `list=` or single video).
7. **Start** — with a summary (total time / intervals / work), same as tabata.

## Workout screen (center timer + views)

- **Background** — YouTube IFrame API playing the playlist (`listType: 'playlist'` when a
  `list=` id is present, else single-video loop) + a scrim, lifted from tabata.
- **Center timer core** (lifted) — phase label coloured per phase
  (prepare/warmup/work/rest/restSet/cooldown), progress ring, big count, context line
  ("Station 3 / 6 · Lap 2 · Set 1"), next-up, elapsed/remaining bar, controls
  (reset / play-pause / skip), End.
- **Members grid** (default view) — one card per member: name · big current BPM · zone
  badge + %HRR (colour-coded) · **current station + exercise variant + ↑/↓ suggestion** ·
  canvas HR line chart with zone-colour bands behind the trace · effort points · kcal ·
  β badge · greyed "reconnecting…" on dropout.
- **Stations view** (toggle) — per station: the exercise's three variants + chips of the
  members currently there. Answers "who's doing which exercise right now."
- **Leaderboard rail** (always visible) — live-sorted by effort points: rank + name +
  points + zone dot + kcal.

## Colours

Zone palette (Myzone-style): Z1 grey-blue, Z2 blue, Z3 green, Z4 orange, Z5 red. Phase
colours reuse tabata tokens (work green, rest orange, prepare violet, etc.).

## Testing

`test.mjs` runs under Node (`node test.mjs`) and asserts the pure `hr.js` paths:
`parseHR` uint8 vs uint16 flag handling, `zoneFor` thresholds and Karvonen vs %maxHR,
`maxHRFromAge`, `effortRate`, `keytelKcalPerMin` sign/sex, `stationFor` wrap, and
`adaptLevel` up/down/hold + clamping. No framework, no fixtures.

## Non-goals (YAGNI)

- No accounts, no backend, no cloud sync or long-term history.
- No internationalisation.
- No mobile / responsive layout.
- No native app; browser PWA only.
