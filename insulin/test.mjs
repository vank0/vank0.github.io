// node test.mjs  — asserts the pure hr.js paths (the only non-trivial logic).
import assert from 'node:assert/strict';
import * as hr from './hr.js';

const dv = (...bytes) => new DataView(new Uint8Array(bytes).buffer);

// parseHR: flags bit0 selects uint8 vs uint16 LE
assert.equal(hr.parseHR(dv(0x00, 72)), 72, 'uint8 BPM');
assert.equal(hr.parseHR(dv(0x01, 0x2C, 0x01)), 300, 'uint16 LE BPM (300)');

// maxHRFromAge (Tanaka) + override
assert.equal(hr.maxHRFromAge(40), 180);
assert.equal(hr.effectiveMaxHR({ age: 40 }), 180);
assert.equal(hr.effectiveMaxHR({ age: 40, maxHROverride: 165 }), 165);

// zoneFor: %HRmax fallback (no restHR)
assert.equal(hr.zoneFor(180, { maxHR: 200 }).zone, 5, '90% → Z5');
assert.equal(hr.zoneFor(150, { maxHR: 200 }).zone, 3, '75% → Z3');
assert.equal(hr.zoneFor(80, { maxHR: 200 }).zone, 0, 'below 50% → zone 0');
// Karvonen uses restHR: same bpm reads a different zone than %HRmax
const k = hr.zoneFor(150, { maxHR: 200, restHR: 60 });   // (150-60)/140 = 64.3% HRR → Z2
assert.equal(k.zone, 2, 'Karvonen 64% HRR → Z2 (differs from 75% HRmax → Z3)');
assert.equal(hr.zoneFor(0, { maxHR: 200 }).zone, 0, 'no bpm → zone 0');

// effortRate
assert.deepEqual([0,1,2,3,4,5].map(hr.effortRate), [0,0,1,2,3,4]);

// keytel: male > 0 at exercise HR; female differs; clamps ≥0
assert.ok(hr.keytelKcalPerMin(150, { sex: 'm', weightKg: 80, age: 30 }) > 8);
assert.ok(hr.keytelKcalPerMin(150, { sex: 'f', weightKg: 65, age: 30 }) > 4);
assert.equal(hr.keytelKcalPerMin(40, { sex: 'm', weightKg: 80, age: 30 }), 0, 'low HR clamps to 0');

// mifflin BMR floor uses height, ~ within sane range (80kg/180cm/30m ≈ 1780/day ≈ 1.24/min)
const bmr = hr.mifflinBmrPerMin({ sex: 'm', weightKg: 80, heightCm: 180, age: 30 });
assert.ok(bmr > 1.0 && bmr < 1.5, `bmr/min ${bmr}`);

// stationFor: rotates + wraps; every member covers all stations across a lap
assert.equal(hr.stationFor(0, 1, 6), 0);
assert.equal(hr.stationFor(4, 3, 6), 0, '(4+2)%6=0');
assert.deepEqual([1,2,3,4,5,6].map(r => hr.stationFor(4, r, 6)).sort((a,b)=>a-b), [0,1,2,3,4,5]);

// adaptLevel: down when too hard, up when too easy, hold in band, clamp
const T = { low: 3, high: 4 };
assert.equal(hr.adaptLevel(2, 4.6, T), 1, 'too hard → down');
assert.equal(hr.adaptLevel(1, 2.2, T), 2, 'too easy → up');
assert.equal(hr.adaptLevel(1, 3.5, T), 1, 'in band → hold');
assert.equal(hr.adaptLevel(0, 4.9, T), 0, 'clamp low');
assert.equal(hr.adaptLevel(2, 1.0, T), 2, 'clamp high');
assert.equal(hr.adaptLevel(1, null, T), 1, 'no data → hold');

console.log('zoneFor Karvonen 150bpm/200max/60rest =>', k, '(expect ~64%)');
console.log('all hr.js assertions passed');
