// Canvas HR line chart with zone-colour bands behind the trace. One per member card.
import { ZONE_PCTS } from './hr.js';

// Z0..Z5 (index 0 = below Z1). Myzone-ish palette.
export const ZONE_COLORS = ['#6b7a99', '#5b8def', '#3aa0ff', '#24d18a', '#ff9f43', '#ff5b6b'];
export const ZONE_LABELS = ['—', 'Z1', 'Z2', 'Z3', 'Z4', 'Z5'];

// bpm value at a zone lower-bound percentage (Karvonen if restHR present, else %HRmax).
function bpmAtPct(pct, maxHR, restHR) {
  return restHR > 0 && maxHR > restHR
    ? restHR + (pct / 100) * (maxHR - restHR)
    : (pct / 100) * maxHR;
}

// samples: [{ ts(ms), bpm }] ascending. opts: { maxHR, restHR, windowSec, now(ms) }
export function drawChart(canvas, samples, opts) {
  const { maxHR = 190, restHR = 0, windowSec = 180 } = opts || {};
  const now = opts?.now ?? (samples.length ? samples[samples.length - 1].ts : 0);
  const ctx = canvas.getContext('2d');
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const w = canvas.clientWidth || 240, h = canvas.clientHeight || 90;
  if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
    canvas.width = w * dpr; canvas.height = h * dpr;
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);

  // y-axis in bpm. Floor a little below Z1, ceil a little above HRmax.
  const yMin = Math.max(30, Math.floor(bpmAtPct(ZONE_PCTS[0], maxHR, restHR)) - 15);
  const yMax = Math.ceil(maxHR + 8);
  const yToPx = (bpm) => h - ((bpm - yMin) / (yMax - yMin)) * h;

  // zone bands: band i spans [ZONE_PCTS[i-1] bpm .. next] for zones 1..5
  const bounds = ZONE_PCTS.map(p => bpmAtPct(p, maxHR, restHR)).concat(yMax);
  for (let z = 1; z <= 5; z++) {
    const lo = bounds[z - 1], hi = bounds[z];
    const yHi = yToPx(Math.min(hi, yMax)), yLo = yToPx(Math.max(lo, yMin));
    ctx.fillStyle = ZONE_COLORS[z] + '22';
    ctx.fillRect(0, yHi, w, Math.max(0, yLo - yHi));
  }

  if (samples.length < 2) return;
  // trace: x = time within window (right edge = now)
  const t0 = now - windowSec * 1000;
  const xToPx = (ts) => ((ts - t0) / (windowSec * 1000)) * w;
  ctx.beginPath();
  let started = false;
  for (const s of samples) {
    if (s.ts < t0) continue;
    const x = xToPx(s.ts), y = yToPx(Math.max(yMin, Math.min(yMax, s.bpm)));
    if (!started) { ctx.moveTo(x, y); started = true; } else ctx.lineTo(x, y);
  }
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.lineJoin = 'round';
  ctx.shadowColor = 'rgba(0,0,0,0.5)';
  ctx.shadowBlur = 3;
  ctx.stroke();
}
