// Pure HR/zone/calorie/circuit math. No DOM. Unit-tested by test.mjs (node test.mjs).
// Constants at top are the tunable knobs — physiology/hardware needs calibration.

export const ZONE_PCTS = [50, 60, 70, 80, 90];        // Z1..Z5 lower bounds (% of HRmax or HRR)
export const EFFORT_PER_MIN = [0, 0, 1, 2, 3, 4];      // points/min indexed by zone (0 = below Z1)
export const KCAL_PER_KJ = 1 / 4.184;                  // Keytel outputs kJ/min → kcal/min
export const LEVELS = ['light', 'medium', 'hard'];     // 0,1,2

// Heart Rate Measurement characteristic (0x2A37). Byte 0 flags; bit0 = uint16 vs uint8 BPM.
export function parseHR(dataView) {
  const flags = dataView.getUint8(0);
  return (flags & 0x01) ? dataView.getUint16(1, /*littleEndian*/ true) : dataView.getUint8(1);
}

// Tanaka. Rounded integer.
export function maxHRFromAge(age) {
  return Math.round(208 - 0.7 * age);
}

// Effective HRmax: explicit override wins, else age formula. Beta blockers handled at UI
// (badge + override prompt) — no reliable formula adjustment exists.
export function effectiveMaxHR({ maxHROverride, age } = {}) {
  if (maxHROverride > 0) return Math.round(maxHROverride);
  return maxHRFromAge(age || 30);
}

// Zone by % of HRmax, or Karvonen HR-reserve when a valid resting HR is present.
// Returns { zone: 0..5, pct }. zone 0 = below Z1 (still drawn/greyed).
export function zoneFor(bpm, { maxHR, restHR } = {}) {
  if (!bpm || !maxHR || maxHR <= 0) return { zone: 0, pct: 0 };
  let pct;
  if (restHR > 0 && maxHR > restHR) {
    pct = (bpm - restHR) / (maxHR - restHR) * 100;   // Karvonen (HRR)
  } else {
    pct = bpm / maxHR * 100;                          // %HRmax fallback
  }
  let zone = 0;
  for (let i = 0; i < ZONE_PCTS.length; i++) if (pct >= ZONE_PCTS[i]) zone = i + 1;
  return { zone, pct: round2(pct) };
}

export function effortRate(zone) {
  return EFFORT_PER_MIN[Math.max(0, Math.min(5, zone | 0))];
}

// Keytel et al. HR-based energy expenditure. Returns kcal/min, clamped ≥ 0.
export function keytelKcalPerMin(bpm, { sex, weightKg, age } = {}) {
  if (!bpm || !weightKg) return 0;
  const kj = sex === 'f'
    ? -20.4022 + 0.4472 * bpm - 0.1263 * weightKg + 0.074 * age
    : -55.0969 + 0.6309 * bpm + 0.1988 * weightKg + 0.2017 * age;
  return Math.max(0, kj * KCAL_PER_KJ);
}

// Mifflin-St Jeor BMR → kcal/min. Resting floor used when live HR is missing. Uses height.
export function mifflinBmrPerMin({ sex, weightKg, heightCm, age } = {}) {
  if (!weightKg || !heightCm) return 0;
  const perDay = 10 * weightKg + 6.25 * heightCm - 5 * age + (sex === 'f' ? -161 : 5);
  return Math.max(0, perDay / 1440);
}

// kcal accrued this second: Keytel while HR live, else BMR floor.
export function kcalPerSec(bpm, profile) {
  const perMin = bpm > 0 ? keytelKcalPerMin(bpm, profile) : mifflinBmrPerMin(profile);
  return perMin / 60;
}

// Circuit rotation: member's station at work-interval `round` (1-based) of a lap of S stations.
export function stationFor(startStation, round, S) {
  if (S <= 0) return 0;
  return (((startStation | 0) + (round - 1)) % S + S) % S;
}

// Adaptive difficulty at a work-interval boundary. One step, clamped to [0,2].
// avgZone above target band → ease off; below → push; in band → hold.
export function adaptLevel(currentLevel, avgZone, target) {
  const lvl = Math.max(0, Math.min(2, currentLevel | 0));
  if (avgZone == null) return lvl;
  if (avgZone > target.high) return Math.max(0, lvl - 1);
  if (avgZone < target.low)  return Math.min(2, lvl + 1);
  return lvl;
}

export function round2(n) {
  return Math.round(n * 100) / 100;
}
