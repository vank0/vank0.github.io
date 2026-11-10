// Wall-clock maths in any IANA time zone, via Intl. No library.
const cache = new Map();
function parts(tz) {
  let f = cache.get(tz);
  if (!f) {
    f = new Intl.DateTimeFormat('en-US', {
      timeZone: tz, hourCycle: 'h23',
      year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric',
    });
    cache.set(tz, f);
  }
  return f;
}

// Epoch ms -> wall-clock fields in tz.
export function wall(t, tz) {
  const o = {};
  for (const p of parts(tz).formatToParts(t)) o[p.type] = +p.value;
  return { y: o.year, mo: o.month, d: o.day, h: o.hour % 24, mi: o.minute, s: o.second };
}

const offset = (t, tz) => {
  const w = wall(t, tz);
  return Date.UTC(w.y, w.mo - 1, w.d, w.h, w.mi, w.s) - Math.floor(t / 1000) * 1000;
};

// Wall-clock fields in tz -> epoch ms. Fields may overflow (d + 1, mi = 1500); Date.UTC normalises.
export function zoned({ y, mo, d, h = 0, mi = 0 }, tz) {
  const guess = Date.UTC(y, mo - 1, d, h, mi);
  const t = guess - offset(guess, tz);
  return guess - offset(t, tz); // re-resolve with the offset in force at t (DST edges)
}
