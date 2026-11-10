import {
  sunDay, moonDay, sunPosition, sunAltitude, moonPosition, moonPhase, bandAt, HORIZON, MOON_HORIZON,
} from './astro.js';
import { wall, zoned } from './zone.js';

const $ = (id) => document.getElementById(id);
const NS = 'http://www.w3.org/2000/svg';
const RING = 152; // band ring centre radius; ring is 40 wide (132..172)
const DEVICE_TZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
const DEFAULT_LOC = { lat: 42.6977, lon: 23.3219, tz: 'Europe/Sofia', name: 'Sofia' };
const PHASES = ['New moon', 'Waxing crescent', 'First quarter', 'Waxing gibbous',
  'Full moon', 'Waning gibbous', 'Last quarter', 'Waning crescent'];
const WINDS = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');

// ---------- small helpers ----------
const svg = (tag, attrs, parent) => {
  const n = document.createElementNS(NS, tag);
  for (const k in attrs) n.setAttribute(k, attrs[k]);
  parent.append(n);
  return n;
};
const el = (tag, props = {}, ...kids) => {
  const n = Object.assign(document.createElement(tag), props);
  n.append(...kids);
  return n;
};
const angleOf = (h) => h * 15 + 180; // midnight at the bottom, noon at the top
const pt = (deg, r) => [r * Math.sin((deg * Math.PI) / 180), -r * Math.cos((deg * Math.PI) / 180)];
const pad = (n) => String(n).padStart(2, '0');
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const span = (ms) => {
  const m = Math.round(ms / 6e4);
  if (m < 60) return `${m} min`;
  return `${Math.floor(m / 60)} h${m % 60 ? ` ${m % 60} min` : ''}`;
};
const bearing = (b) => `${Math.round(b) % 360}° ${WINDS[Math.round(b / 22.5) % 16]}`;
const phaseName = (p) => PHASES[Math.round(p * 8) % 8];
const store = {
  get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};

// Lit part of the moon with the bright limb on the right; callers rotate or mirror it.
function moonPath(phase, r) {
  const p = phase > 0.5 ? 1 - phase : phase;
  const rx = r * Math.abs(Math.cos(2 * Math.PI * p));
  return `M0 ${-r}A${r} ${r} 0 0 1 0 ${r}A${rx} ${r} 0 0 ${p < 0.25 ? 0 : 1} 0 ${-r}Z`;
}

// ---------- location ----------
const validTz = (tz) => {
  try { new Intl.DateTimeFormat('en', { timeZone: tz }); return true; } catch { return false; }
};
const validLoc = (v) => !!v && Number.isFinite(v.lat) && Math.abs(v.lat) <= 90
  && Number.isFinite(v.lon) && Math.abs(v.lon) <= 180 && typeof v.tz === 'string' && validTz(v.tz);
function savedLoc() {
  const v = store.get('clock.loc');
  if (v && !v.tz) v.tz = DEVICE_TZ; // saved before time zones existed
  return validLoc(v) ? v : null;
}

// Shared links: ?lat=&lon=&tz=&name=&t=
const params = new URLSearchParams(location.search);
const linked = {
  lat: Number(params.get('lat')), lon: Number(params.get('lon')),
  tz: params.get('tz') || DEVICE_TZ, name: params.get('name') || '',
};
const hasLinked = params.has('lat') && params.has('lon') && validLoc(linked);
let loc = hasLinked ? linked : savedLoc() ?? DEFAULT_LOC;
let preview = Number.isFinite(Date.parse(params.get('t'))) ? Date.parse(params.get('t')) : null;

// ---------- time in the place's zone ----------
const wallOf = (t) => wall(t, loc.tz);
const hoursOf = (t) => { const w = wallOf(t); return w.h + w.mi / 60 + w.s / 3600; };
const hhmm = (t) => { const w = wallOf(t); return `${pad(w.h)}:${pad(w.mi)}`; };
const dayStart = (t, k = 0) => { const w = wallOf(t); return zoned({ y: w.y, mo: w.mo, d: w.d + k }, loc.tz); };
const fmts = new Map();
const fmtDate = (t, opts) => {
  const key = loc.tz + JSON.stringify(opts);
  if (!fmts.has(key)) fmts.set(key, new Intl.DateTimeFormat(undefined, { timeZone: loc.tz, ...opts }));
  return fmts.get(key).format(t);
};
const fmtLoc = ({ lat, lon }) =>
  `${Math.abs(lat).toFixed(2)}° ${lat >= 0 ? 'N' : 'S'}, ${Math.abs(lon).toFixed(2)}° ${lon >= 0 ? 'E' : 'W'}`;

const shown = () => preview ?? Date.now();
function setPreview(t) {
  preview = t;
  document.body.classList.add('previewing');
}
function backToNow() {
  preview = null;
  document.body.classList.remove('previewing');
}

// ---------- state + refs ----------
const dial = document.querySelector('.dial');
const scrubTime = $('scrub-time'), scrubDate = $('scrub-date'), hit = $('hit');
const hourHand = $('hand-hour'), minHand = $('hand-min'), secHand = $('hand-sec'), body = $('body');
const nowMark = $('now-mark'), form = $('loc-form');
let day = null;
let lastSec = -1;
let cloudsOn = store.get('clock.clouds') === true;
let clouds = null;

// ---------- per day: everything that only changes with the date or place ----------
function buildDay(now) {
  const { lat, lon } = loc;
  const week = []; // shown day + 7 more ("next" after midnight, week table, jump buttons)
  for (let k = 0; k < 8; k++) {
    const start = dayStart(now, k), end = dayStart(now, k + 1);
    week.push({ start, end, ...sunDay(start, end, lat, lon) });
  }
  const today = week[0];
  const path = [];
  for (let t = today.start; t <= today.end; t += 6e5) path.push(sunPosition(t, lat, lon));
  day = {
    ...today, week, path,
    yesterday: sunDay(dayStart(now, -1), today.start, lat, lon).daylight,
    moon: moonDay(today.start, today.end, lat, lon),
  };
  drawDial();
  drawToday();
  drawSkyPath();
  drawWeek();
  paintSlider();
  lastSec = -1;
}

const hEnd = (t) => (t >= day.end ? 24 : hoursOf(t));
function arc(parent, r, from, to, attrs) {
  const a1 = angleOf(hoursOf(from));
  // ponytail: wall-clock angles; on a DST day the repeated/skipped hour just overlaps.
  const deg = Math.max(0, angleOf(hEnd(to)) - a1) + 0.3; // overlap hides anti-alias seams
  const c = 2 * Math.PI * r;
  svg('circle', { r, 'stroke-dasharray': `${(deg / 360) * c} ${c}`, transform: `rotate(${a1 - 90})`, ...attrs }, parent);
}

function drawDial() {
  const bands = $('bands');
  bands.replaceChildren();
  for (const s of day.segments) arc(bands, RING, s.start, s.end, { class: 'band', 'data-band': s.band.id });

  const moonArc = $('moon-arc');
  moonArc.replaceChildren();
  for (const u of day.moon.up) arc(moonArc, 125, u.start, u.end, { class: 'moon-arc' });

  const nums = $('numerals');
  nums.replaceChildren();
  const w = wallOf(day.start);
  for (let h = 0; h < 24; h++) {
    const id = bandAt(sunAltitude(zoned({ y: w.y, mo: w.mo, d: w.d, h }, loc.tz), loc.lat, loc.lon)).id;
    const [x, y] = pt(angleOf(h), RING);
    const cls = ['num', h % 6 ? '' : 'cardinal', id === 'day' || id === 'golden' ? 'on-light' : ''];
    svg('text', { x, y, class: cls.join(' ').trim() }, nums).textContent = h;
  }

  const events = $('events');
  events.replaceChildren();
  for (const e of day.sun) {
    const a = angleOf(hoursOf(e.t));
    const [x1, y1] = pt(a, 129);
    const [x2, y2] = pt(a, 175);
    svg('line', { x1, y1, x2, y2, class: 'event' }, events);
    const [x, y] = pt(a, 104);
    svg('text', { x, y: y - 7, class: 'event-name' }, events).textContent = e.up ? 'Sunrise' : 'Sunset';
    svg('text', { x, y: y + 9, class: 'event-time' }, events).textContent = hhmm(e.t);
  }
}

function drawToday() {
  const { lat, lon } = loc;
  const whole = day.end - day.start;
  const sunParts = day.sun.map((e) => `${e.up ? 'sunrise' : 'sunset'} ${hhmm(e.t)} at ${bearing(sunPosition(e.t, lat, lon).azimuth)}`);
  if (!sunParts.length) sunParts.push(day.daylight ? 'the sun doesn’t set today' : 'the sun doesn’t rise today');
  $('sun-line').textContent = cap(sunParts.join(', '));
  $('noon-line').textContent = `Solar noon ${hhmm(day.noon.t)}, sun peaks at ${Math.round(day.noon.altitude)}°`;

  const diff = day.daylight - day.yesterday;
  let text = day.daylight <= 0 ? 'No daylight today' : day.daylight >= whole ? 'Daylight all day' : `${span(day.daylight)} of daylight`;
  if (day.daylight > 0 && day.daylight < whole && Math.abs(diff) >= 1000) {
    const a = Math.abs(diff);
    const amount = a < 6e4 ? `${Math.round(a / 1000)} s` : `${Math.floor(a / 6e4)} min ${Math.round((a % 6e4) / 1000)} s`;
    text += `, ${amount} ${diff > 0 ? 'longer' : 'shorter'} than yesterday`;
  }
  $('daylight-line').textContent = text;

  const mt = day.moon.events.map((e) => `${e.up ? 'moonrise' : 'moonset'} ${hhmm(e.t)}`);
  $('moon-times').textContent = mt.length ? cap(mt.join(', ')) : day.moon.up.length ? 'Moon up all day' : 'Moon down all day';

  $('timeline').replaceChildren(...day.segments.map((s) => {
    const b = el('button', { type: 'button', className: 'row-btn' },
      el('span', { className: 'swatch' }),
      el('span', { textContent: s.band.name }),
      el('span', { className: 'range', textContent: `${hhmm(s.start)}–${s.end >= day.end ? '24:00' : hhmm(s.end)}` }));
    b.addEventListener('click', () => setPreview(s.start));
    const li = el('li', {}, b);
    li.dataset.band = s.band.id;
    return li;
  }));
}

// Sky chart: looking down on the place, north up; centre is overhead, edge is the horizon.
const skyPt = (alt, az) => {
  const r = (100 * (90 - alt)) / 90;
  return [r * Math.sin((az * Math.PI) / 180), -r * Math.cos((az * Math.PI) / 180)];
};
function drawSkyPath() {
  const g = $('sky-path');
  g.replaceChildren();
  day.path.forEach((p, i) => {
    const q = day.path[i + 1];
    if (!q || (p.altitude < HORIZON && q.altitude < HORIZON)) return;
    const [x1, y1] = skyPt(Math.max(p.altitude, HORIZON), p.azimuth);
    const [x2, y2] = skyPt(Math.max(q.altitude, HORIZON), q.azimuth);
    svg('line', { x1, y1, x2, y2, class: 'sky-path', 'data-band': bandAt(Math.max(p.altitude, q.altitude)).id }, g);
  });
  for (const e of day.sun) {
    const [cx, cy] = skyPt(HORIZON, sunPosition(e.t, loc.lat, loc.lon).azimuth);
    svg('circle', { cx, cy, r: 3, class: 'sky-event' }, g);
  }
}
function placeSky(node, p, horizon) {
  const up = p.altitude >= horizon;
  node.setAttribute('display', up ? 'inline' : 'none');
  if (!up) return;
  const [x, y] = skyPt(p.altitude, p.azimuth);
  node.setAttribute('cx', x.toFixed(1));
  node.setAttribute('cy', y.toFixed(1));
}

function miniMoon(phase) {
  const s = document.createElementNS(NS, 'svg');
  s.setAttribute('viewBox', '-7 -7 14 14');
  s.setAttribute('class', 'mini-moon');
  s.setAttribute('aria-hidden', 'true');
  svg('circle', { r: 6, class: 'moon-dark' }, s);
  // ponytail: textbook orientation (waning lit left up north); the dial icon uses the true angle.
  const flip = (phase > 0.5) !== (loc.lat < 0);
  svg('path', { d: moonPath(phase, 6), class: 'moon-lit', transform: flip ? 'scale(-1 1)' : '' }, s);
  return s;
}

function cloudAt(t) {
  if (!cloudsOn || !clouds || t == null) return null;
  const i = Math.round((t - clouds.t[0]) / 36e5);
  if (i < 0 || i >= clouds.t.length || !Number.isFinite(clouds.total[i])) return null;
  return { total: clouds.total[i], low: clouds.low[i], high: clouds.high[i] };
}

function drawWeek() {
  const td = (text) => el('td', { textContent: text });
  $('week').tBodies[0].replaceChildren(...day.week.slice(0, 7).map((wd) => {
    const rise = wd.sun.find((e) => e.up), set = wd.sun.find((e) => !e.up);
    const golden = wd.segments.find((s) => s.band.id === 'golden' && s.start > wd.noon.t);
    const { phase, fraction } = moonPhase(set?.t ?? wd.noon.t);
    const btn = el('button', { type: 'button', textContent: fmtDate(wd.start + 12 * 36e5, { weekday: 'short', day: 'numeric' }) });
    btn.addEventListener('click', () => setPreview(golden?.start ?? set?.t ?? wd.noon.t));
    const cl = cloudAt(set?.t);
    return el('tr', {},
      el('th', { scope: 'row' }, btn),
      td(rise ? hhmm(rise.t) : '—'),
      td(set ? hhmm(set.t) : '—'),
      td(golden ? hhmm(golden.start) : '—'),
      el('td', { className: 'moon-cell', title: phaseName(phase) }, miniMoon(phase), ` ${Math.round(fraction * 100)}%`),
      el('td', { className: 'cloud-col', textContent: cl ? `${cl.total}%` : '—', title: cl ? `Low cloud ${cl.low}%, high cloud ${cl.high}%` : '' }));
  }));
  $('week').classList.toggle('with-clouds', cloudsOn);
}

function paintSlider() {
  const pct = (t) => ((hEnd(t) / 24) * 100).toFixed(2);
  scrubTime.style.background = `linear-gradient(to right, ${day.segments
    .map((s) => `var(--${s.band.id}) ${pct(s.start)}% ${pct(s.end)}%`).join(', ')})`;
}

// ---------- once a second ----------
function tick(now) {
  const { lat, lon } = loc;
  const w = wallOf(now);
  $('time').textContent = `${pad(w.h)}:${pad(w.mi)}:${pad(w.s)}`;
  $('date').textContent = fmtDate(now, { weekday: 'long', day: 'numeric', month: 'long' });

  const i = day.segments.findIndex((s) => now >= s.start && now < s.end);
  const cur = day.segments[i];
  const next = day.segments[i + 1] ?? day.week[1].segments.find((s) => s.band !== cur.band);
  $('now').dataset.band = cur.band.id;
  $('band').textContent = cur.band.name;
  $('next').textContent = next ? `${next.band.name} in ${span(next.start - now)}` : '';
  [...$('timeline').children].forEach((li, j) => li.toggleAttribute('aria-current', j === i));
  document.body.style.setProperty('--glow', `var(--${cur.band.id})`);

  const sun = sunPosition(now, lat, lon), moon = moonPosition(now, lat, lon), ph = moonPhase(now);
  const night = sun.altitude < HORIZON, moonUp = moon.altitude >= MOON_HORIZON;
  $('sun').setAttribute('display', night ? 'none' : 'inline');
  $('moon').setAttribute('display', night ? 'inline' : 'none');
  $('moon').classList.toggle('below', !moonUp);
  $('moon-lit').setAttribute('d', moonPath(ph.phase, 11));
  // Lit limb faces the sun as seen from here: bright-limb angle minus parallactic angle,
  // counter-clockwise from up; the path draws it on the right (270°).
  $('moon-rot').setAttribute('transform', `rotate(${(270 - (ph.angle - moon.parallactic)).toFixed(1)})`);
  $('moon-line').textContent = `${phaseName(ph.phase)}, ${Math.round(ph.fraction * 100)}% lit`;
  $('sun-pos').textContent = sun.altitude >= HORIZON
    ? `Sun ${Math.round(sun.altitude)}° high, ${bearing(sun.azimuth)}`
    : `Sun ${Math.round(-sun.altitude)}° below the horizon`;
  $('moon-pos').textContent = moonUp ? `Moon ${Math.round(moon.altitude)}° high, ${bearing(moon.azimuth)}` : 'Moon below the horizon';
  placeSky($('sky-sun'), sun, HORIZON);
  placeSky($('sky-moon'), moon, MOON_HORIZON);

  const mins = w.h * 60 + w.mi;
  if (+scrubTime.value !== mins) scrubTime.value = mins;
  scrubTime.setAttribute('aria-valuetext', hhmm(now));
  const iso = `${w.y}-${pad(w.mo)}-${pad(w.d)}`;
  if (scrubDate.value !== iso && document.activeElement !== scrubDate) scrubDate.value = iso;
}

// ---------- every frame: hands ----------
function frame() {
  const now = shown();
  if (!day || now >= day.end || now < day.start) buildDay(now);
  const w = wallOf(now);
  const s = w.s + (reduceMotion.matches ? 0 : (now % 1000) / 1000);
  const m = w.mi + s / 60;
  const h = w.h + m / 60;
  secHand.setAttribute('transform', `rotate(${s * 6})`);
  minHand.setAttribute('transform', `rotate(${m * 6})`);
  hourHand.setAttribute('transform', `rotate(${angleOf(h)})`);
  const [x, y] = pt(angleOf(h), RING);
  body.setAttribute('transform', `translate(${x.toFixed(2)} ${y.toFixed(2)})`);
  if (preview !== null) { // ghost marker: where real now sits on the shown day
    const real = Date.now();
    nowMark.setAttribute('display', real >= day.start && real < day.end ? 'inline' : 'none');
    nowMark.setAttribute('transform', `rotate(${angleOf(hoursOf(real))})`);
  }
  const sec = Math.floor(now / 1000); // whole timestamp, so scrubbing by minutes re-ticks too
  if (sec !== lastSec) {
    lastSec = sec;
    tick(now);
  }
  requestAnimationFrame(frame);
}

// ---------- scrubbing ----------
const shownWall = () => wallOf(shown());
scrubTime.addEventListener('input', () => {
  const w = shownWall();
  setPreview(zoned({ y: w.y, mo: w.mo, d: w.d, mi: +scrubTime.value }, loc.tz));
});
scrubDate.addEventListener('input', () => {
  if (!scrubDate.value) return;
  const [y, mo, d] = scrubDate.value.split('-').map(Number);
  const w = shownWall();
  setPreview(zoned({ y, mo, d, h: w.h, mi: w.mi }, loc.tz));
});
const stepDay = (k) => {
  const w = shownWall();
  setPreview(zoned({ y: w.y, mo: w.mo, d: w.d + k, h: w.h, mi: w.mi }, loc.tz));
};
$('prev-day').addEventListener('click', () => stepDay(-1));
$('next-day').addEventListener('click', () => stepDay(1));
$('now-btn').addEventListener('click', backToNow);

document.querySelectorAll('[data-jump]').forEach((b) => b.addEventListener('click', () => {
  const id = b.dataset.jump, from = shown();
  for (const [k, wd] of day.week.entries()) {
    // skip a band that only continues past midnight; we want where it begins
    const s = wd.segments.find((x) => x.band.id === id && x.start > from && !(k && x.start === wd.start));
    if (s) { $('jump-msg').textContent = ''; return setPreview(s.start); }
  }
  $('jump-msg').textContent = `No ${id === 'golden' ? 'golden' : 'blue'} hour here in the next week.`;
}));

let dragH = null;
function dragTo(e) {
  const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(dial.getScreenCTM().inverse());
  const deg = (Math.atan2(p.x, -p.y) * 180) / Math.PI; // clockwise from top
  const h = ((((deg - 180) % 360) + 360) % 360) / 15;
  const w = shownWall();
  let d = w.d;
  // Dragging past midnight rolls the date, so you can sweep from tonight into tomorrow.
  if (dragH !== null && dragH > 18 && h < 6) d += 1;
  if (dragH !== null && dragH < 6 && h > 18) d -= 1;
  dragH = h;
  setPreview(zoned({ y: w.y, mo: w.mo, d, mi: Math.round(h * 60) }, loc.tz));
}
hit.addEventListener('pointerdown', (e) => { hit.setPointerCapture(e.pointerId); dragH = null; dragTo(e); });
hit.addEventListener('pointermove', (e) => { if (hit.hasPointerCapture(e.pointerId)) dragTo(e); });
// ponytail: touch-action on SVG children is patchy on iOS; this stops the page scrolling mid-drag.
hit.addEventListener('touchstart', (e) => e.preventDefault(), { passive: false });

// ---------- place ----------
function setLoc(next, msg = '') {
  loc = next;
  store.set('clock.loc', loc);
  showLoc(msg);
  day = null; // rebuild on next frame
  clouds = null;
  loadClouds();
}
function showLoc(msg) {
  form.lat.value = loc.lat;
  form.lon.value = loc.lon;
  const coords = fmtLoc(loc);
  $('loc-label').textContent = loc.name ? `${loc.name}, ${coords}` : coords;
  $('tz-note').textContent = loc.tz === DEVICE_TZ ? '' : `Times in ${loc.tz.replaceAll('_', ' ')}`;
  $('loc-msg').textContent = msg;
}

function locate() {
  if (!navigator.geolocation) {
    $('loc-msg').textContent = 'This browser can’t share your location. Search for a city or enter coordinates.';
    return;
  }
  $('loc-msg').textContent = 'Finding your location…';
  navigator.geolocation.getCurrentPosition(
    (p) => setLoc({ lat: +p.coords.latitude.toFixed(4), lon: +p.coords.longitude.toFixed(4), tz: DEVICE_TZ, name: 'Your location' }, 'Using your location.'),
    (err) => {
      $('loc-msg').textContent = err.code === err.PERMISSION_DENIED
        ? 'Location access is off. Search for a city, enter coordinates, or allow access and try again.'
        : 'Couldn’t get your location. Search for a city or enter coordinates.';
    },
    { maximumAge: 36e5, timeout: 10000 },
  );
}
$('locate').addEventListener('click', locate);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  // ponytail: typed coordinates use this device's time zone; city search knows the real one.
  setLoc({ lat: +form.lat.value, lon: +form.lon.value, tz: DEVICE_TZ, name: '' }, 'Location saved.');
  $('loc').open = false;
});

$('search-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const q = e.target.q.value.trim();
  const list = $('results');
  list.replaceChildren();
  $('loc-msg').textContent = 'Searching…';
  try {
    const r = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=6&language=en&format=json`);
    if (!r.ok) throw new Error(r.status);
    const places = ((await r.json()).results ?? []).map((p) => ({
      label: [...new Set([p.name, p.admin1, p.country].filter(Boolean))].join(', '),
      place: { lat: Number(p.latitude), lon: Number(p.longitude), tz: p.timezone, name: [p.name, p.country].filter(Boolean).join(', ') },
    })).filter((p) => validLoc(p.place));
    $('loc-msg').textContent = places.length ? '' : `No places match “${q}”.`;
    list.replaceChildren(...places.map(({ label, place }) => {
      const b = el('button', { type: 'button', textContent: label });
      b.addEventListener('click', () => {
        list.replaceChildren();
        e.target.reset();
        setLoc(place, `Showing ${place.name}.`);
      });
      return el('li', {}, b);
    }));
  } catch {
    $('loc-msg').textContent = 'Couldn’t search right now. Check the connection, or enter coordinates.';
  }
});

$('share').addEventListener('click', async () => {
  const u = new URL(location.pathname, location.origin);
  u.searchParams.set('lat', loc.lat.toFixed(4));
  u.searchParams.set('lon', loc.lon.toFixed(4));
  u.searchParams.set('tz', loc.tz);
  if (loc.name) u.searchParams.set('name', loc.name);
  if (preview !== null) u.searchParams.set('t', new Date(preview).toISOString());
  try {
    await navigator.clipboard.writeText(u.href);
    $('loc-msg').textContent = preview === null ? 'Link to this place copied.' : 'Link to this place and time copied.';
  } catch {
    $('loc-msg').textContent = `Copy this link: ${u.href}`;
  }
});

// ---------- planning: clouds + calendar ----------
async function loadClouds() {
  if (!cloudsOn) return;
  const key = `${loc.lat},${loc.lon}`;
  $('clouds-msg').textContent = 'Loading the cloud forecast…';
  try {
    const r = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}`
      + '&hourly=cloud_cover,cloud_cover_low,cloud_cover_high&forecast_days=8&timeformat=unixtime&timezone=GMT');
    if (!r.ok) throw new Error(r.status);
    const h = (await r.json()).hourly;
    if (key !== `${loc.lat},${loc.lon}` || !cloudsOn) return; // place or setting changed meanwhile
    clouds = { t: h.time.map((s) => s * 1000), total: h.cloud_cover, low: h.cloud_cover_low, high: h.cloud_cover_high };
    $('clouds-msg').textContent = '';
    if (day) drawWeek();
  } catch {
    $('clouds-msg').textContent = 'Couldn’t load the cloud forecast. Check the connection and turn it on again.';
  }
}
$('clouds-on').checked = cloudsOn;
$('clouds-on').addEventListener('change', (e) => {
  cloudsOn = e.target.checked;
  store.set('clock.clouds', cloudsOn);
  if (cloudsOn) loadClouds();
  else $('clouds-msg').textContent = '';
  if (day) drawWeek();
});

$('ics').addEventListener('click', () => {
  const stamp = (t) => new Date(t).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const esc = (s) => s.replace(/[\\;,]/g, (c) => `\\${c}`);
  const where = esc(loc.name || fmtLoc(loc));
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Sky clock//EN', 'CALSCALE:GREGORIAN'];
  for (const wd of day.week.slice(0, 7)) {
    for (const s of wd.segments) {
      if (s.band.id !== 'golden' && s.band.id !== 'blue') continue;
      lines.push('BEGIN:VEVENT', `UID:${s.start}-${s.band.id}@sky-clock`, `DTSTAMP:${stamp(Date.now())}`,
        `DTSTART:${stamp(s.start)}`, `DTEND:${stamp(s.end)}`, `SUMMARY:${s.band.name}`, `LOCATION:${where}`,
        'BEGIN:VALARM', 'ACTION:DISPLAY', `DESCRIPTION:${s.band.name} in 15 minutes`, 'TRIGGER:-PT15M', 'END:VALARM',
        'END:VEVENT');
    }
  }
  lines.push('END:VCALENDAR');
  const a = el('a', {
    href: URL.createObjectURL(new Blob([lines.join('\r\n')], { type: 'text/calendar' })),
    download: 'golden-and-blue-hours.ics',
  });
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
});

// ---------- display mode ----------
let wakeLock = null;
async function setDisplay(on) {
  document.body.classList.toggle('display', on);
  if (on) {
    document.documentElement.requestFullscreen?.().catch(() => {});
    wakeLock = (await navigator.wakeLock?.request('screen').catch(() => null)) ?? null;
  } else {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    wakeLock?.release();
    wakeLock = null;
  }
}
$('display-btn').addEventListener('click', () => setDisplay(true));
$('exit-display').addEventListener('click', () => setDisplay(false));
document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement && document.body.classList.contains('display')) setDisplay(false);
});
document.addEventListener('visibilitychange', async () => {
  // the browser drops wake locks when the tab hides; take it back on return
  if (document.visibilityState === 'visible' && document.body.classList.contains('display')) {
    wakeLock = (await navigator.wakeLock?.request('screen').catch(() => null)) ?? null;
  }
});
addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (document.body.classList.contains('display')) setDisplay(false);
  else if (preview !== null) backToNow();
});

// ---------- start ----------
showLoc(hasLinked ? 'Showing a shared link.' : savedLoc() ? '' : 'Showing Sofia until your location is known.');
if (preview !== null) document.body.classList.add('previewing');
if (!hasLinked && !savedLoc()) locate();
loadClouds();
requestAnimationFrame(frame);
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
