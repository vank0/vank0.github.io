// Sun and moon math. Formulas after SunCalc (Vladimir Agafonkin, BSD-2), from
// Astronomy Answers; moonrise threshold from Meeus. Minute-level accuracy.
const rad = Math.PI / 180;
const obliquity = rad * 23.4397;
const toDays = (t) => t / 864e5 - 10957.5; // ms since epoch -> days since J2000

const raOf = (l, b) =>
  Math.atan2(Math.sin(l) * Math.cos(obliquity) - Math.tan(b) * Math.sin(obliquity), Math.cos(l));
const decOf = (l, b) =>
  Math.asin(Math.sin(b) * Math.cos(obliquity) + Math.cos(b) * Math.sin(obliquity) * Math.sin(l));
const hourAngle = (d, lon, ra) => rad * (280.16 + 360.9856235 * d) + rad * lon - ra;
const altOf = (H, phi, dec) =>
  Math.asin(Math.sin(phi) * Math.sin(dec) + Math.cos(phi) * Math.cos(dec) * Math.cos(H));
// Compass bearing in degrees, clockwise from north.
const bearingOf = (H, phi, dec) =>
  (Math.atan2(Math.sin(H), Math.cos(H) * Math.sin(phi) - Math.tan(dec) * Math.cos(phi)) / rad + 540) % 360;

function sunCoords(d) {
  const M = rad * (357.5291 + 0.98560028 * d);
  const C = rad * (1.9148 * Math.sin(M) + 0.02 * Math.sin(2 * M) + 0.0003 * Math.sin(3 * M));
  const L = M + C + rad * 102.9372 + Math.PI;
  return { ra: raOf(L, 0), dec: decOf(L, 0) };
}

function moonCoords(d) {
  const L = rad * (218.316 + 13.176396 * d);
  const M = rad * (134.963 + 13.064993 * d);
  const F = rad * (93.272 + 13.22935 * d);
  const l = L + rad * 6.289 * Math.sin(M);
  const b = rad * 5.128 * Math.sin(F);
  return { ra: raOf(l, b), dec: decOf(l, b), dist: 385001 - 20905 * Math.cos(M) };
}

// Geometric altitude of the sun's centre, degrees. t = ms.
export function sunAltitude(t, lat, lon) {
  const d = toDays(t), s = sunCoords(d);
  return altOf(hourAngle(d, lon, s.ra), rad * lat, s.dec) / rad;
}

export function sunPosition(t, lat, lon) {
  const d = toDays(t), s = sunCoords(d), H = hourAngle(d, lon, s.ra), phi = rad * lat;
  return { altitude: altOf(H, phi, s.dec) / rad, azimuth: bearingOf(H, phi, s.dec) };
}

// Geocentric altitude (degrees), bearing, and parallactic angle (degrees) of the moon.
export function moonPosition(t, lat, lon) {
  const d = toDays(t), c = moonCoords(d), H = hourAngle(d, lon, c.ra), phi = rad * lat;
  return {
    altitude: altOf(H, phi, c.dec) / rad,
    azimuth: bearingOf(H, phi, c.dec),
    parallactic: Math.atan2(Math.sin(H), Math.tan(phi) * Math.cos(c.dec) - Math.sin(c.dec) * Math.cos(H)) / rad,
  };
}

// phase: 0 new, 0.25 first quarter, 0.5 full, 0.75 last quarter. fraction: lit share of disc.
// angle: position angle of the bright limb, degrees eastward from celestial north.
export function moonPhase(t) {
  const d = toDays(t), s = sunCoords(d), m = moonCoords(d), sunDist = 149598000;
  const phi = Math.acos(Math.sin(s.dec) * Math.sin(m.dec) + Math.cos(s.dec) * Math.cos(m.dec) * Math.cos(s.ra - m.ra));
  const inc = Math.atan2(sunDist * Math.sin(phi), m.dist - sunDist * Math.cos(phi));
  const angle = Math.atan2(
    Math.cos(s.dec) * Math.sin(s.ra - m.ra),
    Math.sin(s.dec) * Math.cos(m.dec) - Math.cos(s.dec) * Math.sin(m.dec) * Math.cos(s.ra - m.ra),
  );
  return {
    fraction: (1 + Math.cos(inc)) / 2,
    phase: 0.5 + (0.5 * inc * (angle < 0 ? -1 : 1)) / Math.PI,
    angle: angle / rad,
  };
}

// Bands by sun altitude, brightest first. Golden/blue per the common photography
// definition (+6..-4 and -4..-6); the rest are the standard twilights.
export const BANDS = [
  { id: 'day', name: 'Day', min: 6 },
  { id: 'golden', name: 'Golden hour', min: -4 },
  { id: 'blue', name: 'Blue hour', min: -6 },
  { id: 'nautical', name: 'Nautical twilight', min: -12 },
  { id: 'astro', name: 'Astronomical twilight', min: -18 },
  { id: 'night', name: 'Night', min: -Infinity },
];
export const bandAt = (alt) => BANDS.find((b) => alt >= b.min);

export const HORIZON = -0.833; // sunrise/sunset: refraction + solar radius
export const MOON_HORIZON = 0.125; // moonrise/moonset on geocentric altitude (Meeus: parallax, refraction, radius)

// Sample f every minute over [start, end] (ms); crossings() bisects each threshold crossing to 1 s.
// Works at the poles too: no crossing just means one long stretch.
function sampled(f, start, end) {
  const ts = [], vs = [];
  for (let t = start; t < end; t += 6e4) { ts.push(t); vs.push(f(t)); }
  ts.push(end);
  vs.push(f(end));
  const crossings = (th) => {
    const out = [];
    for (let i = 1; i < ts.length; i++) {
      const up = vs[i] >= th;
      if ((vs[i - 1] >= th) === up) continue;
      let lo = ts[i - 1], hi = ts[i];
      while (hi - lo > 1000) {
        const mid = (lo + hi) / 2;
        if ((f(mid) >= th) === up) hi = mid;
        else lo = mid;
      }
      out.push({ t: Math.round(hi), up });
    }
    return out;
  };
  return { ts, vs, crossings };
}

// Up-intervals from crossing events, clipped to [start, end].
function intervals(upAtStart, events, start, end) {
  const out = [];
  let from = upAtStart ? start : null;
  for (const e of events) {
    if (e.up) from = e.t;
    else if (from !== null) { out.push({ start: from, end: e.t }); from = null; }
  }
  if (from !== null) out.push({ start: from, end });
  return out;
}

export function sunDay(start, end, lat, lon) {
  const s = sampled((t) => sunAltitude(t, lat, lon), start, end);
  const cuts = BANDS.slice(0, -1).flatMap((b) => s.crossings(b.min).map((c) => c.t)).sort((a, b) => a - b);
  const edges = [start, ...cuts, end];
  const segments = edges.slice(1).map((e, i) => ({
    start: edges[i],
    end: e,
    band: bandAt(sunAltitude((edges[i] + e) / 2, lat, lon)),
  }));
  const sun = s.crossings(HORIZON);
  let k = 0;
  s.vs.forEach((v, i) => { if (v > s.vs[k]) k = i; });
  const daylight = intervals(s.vs[0] >= HORIZON, sun, start, end).reduce((a, i) => a + i.end - i.start, 0);
  return { segments, sun, daylight, noon: { t: s.ts[k], altitude: s.vs[k] } };
}

export function moonDay(start, end, lat, lon) {
  const s = sampled((t) => moonPosition(t, lat, lon).altitude, start, end);
  const events = s.crossings(MOON_HORIZON);
  return { events, up: intervals(s.vs[0] >= MOON_HORIZON, events, start, end) };
}
