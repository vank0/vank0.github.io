import {
  maxHRFromAge, effectiveMaxHR, zoneFor, effortRate, kcalPerSec,
  stationFor, adaptLevel, round2, LEVELS, gridRows, buildHandout,
} from './hr.js';
import { ZONE_COLORS, ZONE_LABELS } from './charts.js';
import { sensors, bluetoothSupported } from './sensors.js';
import { t, LANGS, getLang, setLang, initLang, applyI18n } from './i18n.js';

/* ---------- icons (inline SVG, no library, no emoji) ---------- */
const IC = (inner, filled) =>
  `<svg viewBox="0 0 24 24" width="1em" height="1em" class="ic" aria-hidden="true" ` +
  (filled ? 'fill="currentColor">' : 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">') +
  inner + '</svg>';
const ICONS = {
  plus: IC('<path d="M12 5v14M5 12h14"/>'),
  minus: IC('<path d="M5 12h14"/>'),
  close: IC('<path d="M18 6L6 18M6 6l12 12"/>'),
  reset: IC('<path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>'),
  play: IC('<path d="M6 4l14 8-14 8z"/>', true),
  pause: IC('<path d="M7 4h3v16H7zM14 4h3v16h-3z"/>', true),
  skip: IC('<path d="M5 4l11 8-11 8z"/><path d="M18 5h2v14h-2z"/>', true),
  shuffle: IC('<path d="M16 3h5v5"/><path d="M4 20 21 3"/><path d="M21 16v5h-5"/><path d="M15 15l6 6"/><path d="M4 4l5 5"/>'),
  volume: IC('<path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19.5 5a9 9 0 0 1 0 14"/>'),
  mute: IC('<path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M23 9l-6 6M17 9l6 6"/>'),
  crown: IC('<path d="M2 18h20l-1.5-9-5.5 4.5L12 6 9 13.5 3.5 9z"/>', true),
  expand: IC('<path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3"/>'),
  compress: IC('<path d="M8 3v3a2 2 0 0 1-2 2H3M16 3v3a2 2 0 0 0 2 2h3M8 21v-3a2 2 0 0 0-2-2H3M16 21v-3a2 2 0 0 1 2-2h3"/>'),
  trash: IC('<path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>'),
  chevron: IC('<path d="M6 9l6 6 6-6"/>'),
  chevronLeft: IC('<path d="M15 18l-6-6 6-6"/>'),
  // medal: ribbon tails + disc with a struck centre (no emoji — house rule)
  medal: '<svg viewBox="0 0 24 24" width="1em" height="1em" class="ic" aria-hidden="true">' +
    '<path fill="currentColor" d="M7.2 1.5L10.8 8H13L9.4 1.5zM16.8 1.5L13.2 8H11l3.6-6.5z"/>' +
    '<circle cx="12" cy="15.5" r="6.5" fill="currentColor"/>' +
    '<circle cx="12" cy="15.5" r="3.2" fill="rgba(0,0,0,0.38)"/></svg>',
  flame: IC('<path d="M12 23a7 7 0 0 0 7-7c0-5-4-7.2-5.6-11C12.6 8 10.8 9.2 9.4 11 8 12.8 5 14 5 16a7 7 0 0 0 7 7z"/>', true),
  bluetooth: IC('<path d="M6.5 6.5l11 11L12 22V2l5.5 5.5-11 11"/>'),
  copy: IC('<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M6 15H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1"/>'),
  paste: IC('<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/>'),
  qr: IC('<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3h-3zM19 19h2v2h-2z"/>'),
  person: IC('<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>'),
};
function applyIcons(root = document) {
  root.querySelectorAll('[data-icon]').forEach(el => {
    if (el.querySelector('.ic')) return;                 // don't double-insert
    if (ICONS[el.dataset.icon]) el.insertAdjacentHTML('afterbegin', ICONS[el.dataset.icon]);
  });
}

/* ---------- storage ---------- */
const store = {
  get: (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};

/* ---------- state ---------- */
const DEFAULT_CONFIG = {
  intervals: { sets: 1, rounds: 6, setRepeat: 2, work: 40, rest: 20, restSet: 60, prepare: 10, warmup: 0, cooldown: 0 },
  targetZone: { low: 3, high: 4 },
  playlistUrl: '',
  videoVolume: 50,          // music sits under the cues, which always play at full scale
  exercisesOn: false,
  exerciseMode: 'simple',   // 'simple' = one exercise per station | 'levels' = light/medium/hard
  exercises: [],            // exercises[setIdx][stationIdx] = { light, medium, hard }; simple mode uses `medium`
};
// Ships in the Presets list on first run — a ready-to-run 6-station full-body circuit.
const DEMO_PRESET = {
  name: 'Demo circuit (6 stations)',
  config: {
    intervals: { sets: 1, rounds: 6, setRepeat: 3, work: 40, rest: 20, restSet: 60, prepare: 10, warmup: 0, cooldown: 0 },
    targetZone: { low: 3, high: 4 },
    playlistUrl: '',
    exercisesOn: true,
    exerciseMode: 'levels',   // the demo ships all three variants to show the adaptive feature
    exercises: [[
      { light: 'Air squats', medium: 'Goblet squat', hard: 'Jump squats' },
      { light: 'Knee push-ups', medium: 'Push-ups', hard: 'Decline push-ups' },
      { light: 'Band row', medium: 'Ring row', hard: 'Pull-ups' },
      { light: 'Plank', medium: 'Plank taps', hard: 'Plank walkout' },
      { light: 'Step touch', medium: 'Mountain climbers', hard: 'Burpees' },
      { light: 'Glute bridge', medium: 'KB deadlift', hard: 'KB swing' },
    ]],
  },
};

let config = Object.assign(structuredClone(DEFAULT_CONFIG), store.get('zb_config', {}));
config.intervals = Object.assign(structuredClone(DEFAULT_CONFIG.intervals), config.intervals || {});
config.targetZone = Object.assign({ low: 3, high: 4 }, config.targetZone || {});

const members = new Map();   // id -> member (insertion order = add order)
let activeExSet = 0;         // which set tab is open in the editor
let curWork = { round: 1, set: 1, upcoming: false };   // work interval the cards display
let currentView = 'members';
let sessionSecs = 0;                 // wall-clock length of the finished class (for the handout)

const RING_LEN = 2 * Math.PI * 54;
const $ = (id) => document.getElementById(id);

/* ---------- helpers ---------- */
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const memberList = () => [...members.values()];
const memberMaxHR = (m) => effectiveMaxHR({ maxHROverride: m.maxHROverride, age: m.age });
const stationCount = () => Math.max(1, config.intervals.rounds);

function fmt(sec) {
  sec = Math.max(0, Math.round(sec));
  return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`;
}
function toast(msg) {
  const el = $('toast'); el.textContent = msg; el.hidden = false;
  clearTimeout(toast._t); toast._t = setTimeout(() => { el.hidden = true; }, 2200);
}
const PHASE_KEY = { prepare: 'prepare', warmup: 'warmup', work: 'work', rest: 'rest', restSet: 'restSetPhase', cooldown: 'cooldown' };
const phaseName = (type) => t(PHASE_KEY[type] || type);
const PHASE_COLOR = { prepare: '#8b9dff', warmup: '#ffd166', work: '#24d18a', rest: '#ff8f4d', restSet: '#ff8f4d', cooldown: '#4dd0ff' };
let progSegs = [];   // per-phase progress-bar segments (built at start)

/* ============================================================
   PLAN BUILDER + ENGINE  (lifted from tabata-timer)
   ============================================================ */
function buildPlan(c) {
  const plan = [];
  if (c.prepare > 0) plan.push({ type: 'prepare', dur: c.prepare });
  if (c.warmup > 0)  plan.push({ type: 'warmup', dur: c.warmup });
  const reps = Math.max(1, c.setRepeat || 1);
  const totalBlocks = c.sets * reps;
  let block = 0;
  for (let s = 1; s <= c.sets; s++) {
    for (let rep = 1; rep <= reps; rep++) {
      block++;
      for (let r = 1; r <= c.rounds; r++) {
        plan.push({ type: 'work', dur: c.work, round: r, set: s, rep });
        if (c.rest > 0 && r < c.rounds) plan.push({ type: 'rest', dur: c.rest, round: r, set: s, rep });
      }
      if (block < totalBlocks && c.restSet > 0) plan.push({ type: 'restSet', dur: c.restSet, set: s, rep });
    }
  }
  if (c.cooldown > 0) plan.push({ type: 'cooldown', dur: c.cooldown });
  return plan;
}
function planTotals(plan) {
  return {
    total: plan.reduce((a, p) => a + p.dur, 0),
    workCount: plan.filter(p => p.type === 'work').length,
  };
}

const engine = { plan: [], idx: 0, running: false, phaseStart: 0, accrued: 0, totalBefore: 0, grandTotal: 0, raf: null, interval: null, lastCountSec: -1 };

function startWorkout() {
  engine.plan = buildPlan(config.intervals);
  if (!engine.plan.length) { toast(t('nothingToRun')); return; }
  resetSessionStats();
  engine.idx = 0; engine.accrued = 0; engine.totalBefore = 0;
  engine.grandTotal = planTotals(engine.plan).total;
  engine.running = true;
  buildProgress();
  $('setup').hidden = true; $('workout').hidden = false;
  audio.unlock();
  requestWakeLock();
  video.start();
  enterPhase(0, true);
  engine.phaseStart = performance.now();
  startLoops();
  startSampleLoop();
  setPlayIcon();
  renderWorkout(true);            // first paint of the board animates in
  focusSoon('playBtn');
}
function enterPhase(i, firstEnter) {
  // Leaving a work interval: bank its stats and adapt now, so the level shown
  // during the following rest is already the one they'll do next.
  const prev = firstEnter ? null : engine.plan[engine.idx];
  if (prev?.type === 'work') { flushWorkInterval(prev); applyAdaptation(); }

  engine.idx = i; engine.accrued = 0; engine.phaseStart = performance.now(); engine.lastCountSec = -1;
  const phase = engine.plan[i];
  if (phase.type === 'work') {
    for (const m of members.values()) { m.intervalZones = []; m.intervalBpms = []; }   // fresh window
  }
  curWork = focusWorkFor(i);
  audio.go(phase.type);
  paintPhase(phase);
  renderWorkout();
}

// Which work interval the member cards should show. During rest/prepare/warmup
// that's the one coming up, so people can line up their next station.
function focusWorkFor(i) {
  const p = engine.plan[i];
  if (p?.type === 'work') return { round: p.round, set: p.set, upcoming: false };
  for (let j = i + 1; j < engine.plan.length; j++) {
    const q = engine.plan[j];
    if (q.type === 'work') return { round: q.round, set: q.set, upcoming: true };
  }
  for (let j = i - 1; j >= 0; j--) {                     // nothing ahead (cooldown): keep the last one
    const q = engine.plan[j];
    if (q.type === 'work') return { round: q.round, set: q.set, upcoming: false };
  }
  return { round: 1, set: 1, upcoming: false };
}

// Bank one work interval per member for the post-class handout.
function flushWorkInterval(phase) {
  const st = stationCount();
  for (const m of members.values()) {
    const bpms = m.intervalBpms || [];
    m.log.push({
      set: phase.set,
      station: stationFor(m.startStation, phase.round, st),
      name: config.exercisesOn ? exerciseAt(phase.set, stationFor(m.startStation, phase.round, st), m.level) : '',
      samples: bpms.length,
      avgBpm: bpms.length ? bpms.reduce((a, b) => a + b, 0) / bpms.length : 0,
      maxBpm: bpms.length ? Math.max(...bpms) : 0,
    });
    m.intervalBpms = [];
  }
}
function paintPhase(phase) {
  const wk = $('workout');
  wk.className = 'screen workout-screen ' + phase.type;
  if (!$('ytBg').hidden) wk.classList.add('has-video');
  $('phaseLabel').textContent = phaseName(phase.type);   // beacon (countdown appended in header)
}
function buildProgress() {
  const track = $('progTrack'); track.innerHTML = ''; progSegs = [];
  for (const p of engine.plan) {
    const seg = document.createElement('div');
    seg.className = 'seg';
    seg.style.flexGrow = p.dur;
    seg.style.setProperty('--seg-c', PHASE_COLOR[p.type] || '#888');
    seg.innerHTML = '<span class="seg-fill"></span>';
    track.appendChild(seg); progSegs.push(seg);
  }
}
function currentPhaseElapsed() {
  return engine.running ? engine.accrued + (performance.now() - engine.phaseStart) / 1000 : engine.accrued;
}
function startLoops() {
  stopLoops();
  engine.interval = setInterval(tick, 250);
  const raf = () => { if (!engine.running) return; tick(); engine.raf = requestAnimationFrame(raf); };
  engine.raf = requestAnimationFrame(raf);
}
function stopLoops() { clearInterval(engine.interval); cancelAnimationFrame(engine.raf); engine.interval = engine.raf = null; }
function tick() {
  const phase = engine.plan[engine.idx];
  if (!phase) return;
  let elapsed = currentPhaseElapsed();
  while (engine.plan[engine.idx] && elapsed >= engine.plan[engine.idx].dur) {
    const done = engine.plan[engine.idx];
    engine.totalBefore += done.dur;
    const carry = elapsed - done.dur;
    if (engine.idx + 1 >= engine.plan.length) { finishWorkout(); return; }
    enterPhase(engine.idx + 1, false);
    engine.accrued = carry; elapsed = currentPhaseElapsed();
  }
  renderTimer(engine.plan[engine.idx], elapsed);
}
function renderTimer(phase, elapsed) {
  const remain = Math.max(0, phase.dur - elapsed);
  const shown = Math.max(0, Math.ceil(remain - 0.0001));
  $('bigCount').textContent = String(shown).padStart(2, '0');
  if (engine.running && shown >= 1 && shown <= 3 && shown !== engine.lastCountSec) { engine.lastCountSec = shown; audio.countdown(); }
  const totalElapsed = engine.totalBefore + elapsed;
  $('elapsed').textContent = fmt(totalElapsed);
  $('remaining').textContent = fmt(Math.max(0, engine.grandTotal - totalElapsed));
  // segmented progress: completed = full, current = live, upcoming = empty
  const idx = engine.idx;
  for (let i = 0; i < progSegs.length; i++) {
    const fill = progSegs[i].firstElementChild;
    if (i < idx) { fill.style.width = '100%'; progSegs[i].classList.remove('active'); }
    else if (i === idx) { fill.style.width = (100 * Math.min(1, elapsed / phase.dur)) + '%'; progSegs[i].classList.add('active'); }
    else { fill.style.width = '0%'; progSegs[i].classList.remove('active'); }
  }
  $('progBubble').style.left = (100 * totalElapsed / engine.grandTotal) + '%';
  $('progBubbleSec').textContent = String(shown);
}
function finishWorkout() {
  const last = engine.plan[engine.idx];
  if (last?.type === 'work') flushWorkInterval(last);      // bank the final interval
  sessionSecs = engine.totalBefore + currentPhaseElapsed();
  engine.running = false; stopLoops(); stopSampleLoop();
  releaseWakeLock(); video.stop();
  audio.finish();
  showResults();
}

/* ---------- controls ---------- */
function togglePlay() {
  if (engine.running) {
    engine.accrued = currentPhaseElapsed(); engine.running = false;
    stopLoops(); stopSampleLoop(); video.pause();
  } else {
    engine.running = true; engine.phaseStart = performance.now();
    audio.unlock(); startLoops(); startSampleLoop(); video.resume();
  }
  setPlayIcon();
}
function setPlayIcon() {
  const b = $('playBtn'); b.innerHTML = engine.running ? ICONS.pause : ICONS.play;
}
function skip() {
  if (engine.idx + 1 >= engine.plan.length) { finishWorkout(); return; }
  engine.totalBefore += engine.plan[engine.idx].dur;
  enterPhase(engine.idx + 1, false);
  engine.phaseStart = performance.now(); engine.accrued = 0;
}
function resetWorkout() {
  engine.idx = 0; engine.accrued = 0; engine.totalBefore = 0;
  resetSessionStats();
  if (!engine.running) { engine.running = true; startLoops(); startSampleLoop(); setPlayIcon(); }
  enterPhase(0, true); engine.phaseStart = performance.now();
}
function endWorkout() {
  engine.running = false; stopLoops(); stopSampleLoop(); video.stop(); releaseWakeLock();
  $('workout').hidden = true; $('setup').hidden = false;
  renderSensorList();
  focusSoon('addPersonBtn');
}
function toggleFullscreen() {
  if (document.fullscreenElement) document.exitFullscreen?.();
  else document.documentElement.requestFullscreen?.().catch(() => {});
}
function setView(v) {
  if (v === currentView || viewAnimating) return;   // ignore re-taps mid-transition
  currentView = v;
  $('viewMembers').classList.toggle('active', v === 'members');
  $('viewStations').classList.toggle('active', v === 'stations');
  swapView();
}
function toggleView() { setView(currentView === 'members' ? 'stations' : 'members'); }
function focusSoon(id) { setTimeout(() => { try { $(id).focus(); } catch {} }, 30); }

/* ---------- keyboard + TV-remote control ----------
   D-pad arrows / OK / Back map to workout actions; Tizen/webOS back = keyCode 10009. */
function onKey(e) {
  const back = e.key === 'Escape' || e.key === 'Backspace' || e.key === 'GoBack' || e.key === 'BrowserBack' || e.keyCode === 10009;
  const playPause = e.key === 'MediaPlayPause' || e.keyCode === 179 || e.keyCode === 10252;
  const onBtn = document.activeElement?.tagName === 'BUTTON';
  const activate = e.key === 'Enter' || e.key === ' ';

  if (!$('handout').hidden) {
    if (activate && onBtn) return;
    if (activate || back) { e.preventDefault(); $('handoutBack').click(); }
    return;
  }
  if (!$('results').hidden) {
    if (activate && onBtn) return;                    // let the focused button activate natively
    if (back) { e.preventDefault(); $('resultsBack').click(); }
    else if (activate) { e.preventDefault(); $('getResultsBtn').click(); }
    return;
  }
  if (!$('workout').hidden) {
    if (activate && onBtn) return;                    // focused control handles Enter/Space itself
    if (e.key === ' ' || e.key === 'Enter' || e.key === 'k' || playPause) { e.preventDefault(); togglePlay(); }
    else if (e.key === 'ArrowRight' || e.key === 'l' || e.key === 'MediaTrackNext' || e.keyCode === 417) { e.preventDefault(); skip(); }
    else if (e.key === 'ArrowLeft' || e.key === 'j' || e.key === 'MediaTrackPrevious' || e.keyCode === 412) { e.preventDefault(); resetWorkout(); }
    else if (back) { e.preventDefault(); endWorkout(); }
    else if (e.key === 'f' || e.key === 'F') { e.preventDefault(); toggleFullscreen(); }
    else if (e.key === 'm' || e.key === 'M') { e.preventDefault(); video.toggleMute(); }
    else if (e.key === '+' || e.key === '=') { e.preventDefault(); video.nudgeVolume(10); }
    else if (e.key === '-' || e.key === '_') { e.preventDefault(); video.nudgeVolume(-10); }
    else if (e.key === 'v' || e.key === 'V' || e.key === 'ArrowUp' || e.key === 'ArrowDown') { e.preventDefault(); toggleView(); }
    return;
  }
  // setup: let native focus/arrows drive most things; Enter starts only when not on a control/input
  const tag = document.activeElement?.tagName;
  if (e.key === 'Enter' && (!tag || tag === 'BODY')) { e.preventDefault(); $('startBtn').click(); }
}

/* ---------- wake lock (keep TV awake) ---------- */
let wakeLock = null;
async function requestWakeLock() { try { wakeLock = await navigator.wakeLock?.request('screen'); } catch {} }
function releaseWakeLock() { try { wakeLock?.release(); } catch {} wakeLock = null; }
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible' && engine.running && !wakeLock) requestWakeLock(); });

/* ============================================================
   ADAPTIVE DIFFICULTY
   ============================================================ */
function applyAdaptation() {
  for (const m of members.values()) {
    if (!m.intervalZones.length) { m.arrow = ''; continue; }
    const avg = m.intervalZones.reduce((a, z) => a + z, 0) / m.intervalZones.length;
    const next = adaptLevel(m.level, avg, config.targetZone);
    m.arrow = next < m.level ? 'down' : next > m.level ? 'up' : '';
    m.level = next;
  }
}

/* ============================================================
   REALTIME SAMPLE LOOP (1 Hz accrual + render)
   ============================================================ */
let sampleTimer = null;
function startSampleLoop() { stopSampleLoop(); sampleTimer = setInterval(sampleTick, 1000); }
function stopSampleLoop() { clearInterval(sampleTimer); sampleTimer = null; }
function sampleTick() {
  const now = Date.now();
  for (const m of members.values()) {
    if (!m.connected) continue;
    const maxHR = memberMaxHR(m);
    const { zone } = zoneFor(m.bpm, { maxHR, restHR: m.restHR });
    m.points += effortRate(zone) / 60;
    m.kcal += kcalPerSec(m.bpm, { sex: m.sex, weightKg: m.weightKg, heightCm: m.heightCm, age: m.age });
    m.intervalZones.push(zone);
    // session stats for the post-class handout
    m.zoneSecs[zone]++;
    if (m.bpm > 0) { m.bpmSum += m.bpm; m.bpmCount++; if (m.bpm > m.maxBpm) m.maxBpm = m.bpm; m.intervalBpms.push(m.bpm); }
  }
  renderWorkout();
}

/* ============================================================
   SENSOR CALLBACKS
   ============================================================ */
// People are the identity; a HR device may be attached later (or never).
const deviceToPerson = new Map();   // deviceId -> personId
function personId() { try { return crypto.randomUUID(); } catch { return 'p' + Date.now() + Math.floor(Math.random() * 1e6); } }
function newPerson(name) {
  return {
    id: personId(), name: name || `Person ${members.size + 1}`,
    sex: 'm', age: 35, weightKg: 75, heightCm: 175, restHR: 60, maxHROverride: 0, betaBlocker: false,
    deviceId: null, startStation: members.size, level: 1, arrow: '',
    bpm: 0, connected: false, battery: null,
    samples: [], points: 0, kcal: 0, intervalZones: [], expanded: false,
    ...blankSession(),
  };
}
// Per-class stats, reset on every start/reset.
function blankSession() {
  return { zoneSecs: [0, 0, 0, 0, 0, 0], maxBpm: 0, bpmSum: 0, bpmCount: 0, log: [], intervalBpms: [] };
}
function resetSessionStats() {
  for (const m of members.values()) {
    m.points = 0; m.kcal = 0; m.samples = []; m.intervalZones = []; m.level = 1; m.arrow = '';
    Object.assign(m, blankSession());
  }
  sessionSecs = 0;
}
function addPerson() {
  const p = newPerson();
  members.set(p.id, p);
  renderSensorList(); saveRoster(); updateSummary();
  focusSoon('addPersonBtn');
}
// Connect a HR strap and assign it to this person (called from the row's Connect button = user gesture).
async function connectPerson(p) {
  try {
    const { id: deviceId } = await sensors.add();
    const prevPid = deviceToPerson.get(deviceId);
    if (prevPid && prevPid !== p.id) {                 // steal the device from a previous owner
      const prev = members.get(prevPid);
      if (prev) { prev.deviceId = null; prev.connected = false; prev.bpm = 0; prev.battery = null; }
    }
    if (p.deviceId && p.deviceId !== deviceId) { deviceToPerson.delete(p.deviceId); try { sensors.remove(p.deviceId); } catch {} }
    p.deviceId = deviceId; p.connected = true;
    deviceToPerson.set(deviceId, p.id);
    renderSensorList(); saveRoster();
  } catch (e) { if (e?.name !== 'NotFoundError') toast(t('pairingFailed', { msg: e?.message || e })); }
}
function disconnectPerson(p) {
  if (p.deviceId) { try { sensors.remove(p.deviceId); } catch {} deviceToPerson.delete(p.deviceId); }
  p.deviceId = null; p.connected = false; p.bpm = 0; p.battery = null;
  renderSensorList(); saveRoster();
}
const personByDevice = (deviceId) => members.get(deviceToPerson.get(deviceId));
sensors.onAdded = () => {};   // assignment handled in connectPerson
sensors.onStatus = (deviceId, connected) => { const m = personByDevice(deviceId); if (m) { m.connected = connected; renderSensorList(); if (!$('workout').hidden) renderWorkout(); } };
sensors.onBattery = (deviceId, pct) => { const m = personByDevice(deviceId); if (m) { m.battery = pct; renderSensorList(); } };
sensors.onSample = (deviceId, bpm, ts) => {
  const m = personByDevice(deviceId); if (!m) return;
  m.connected = true; m.bpm = bpm; m.samples.push({ ts, bpm });
  if (m.samples.length > 200) m.samples.shift();
  if ($('setup').hidden === false) { const el = $('bpm-' + cssId(m.id)); if (el) el.innerHTML = `${bpm}<small> bpm</small>`; }
};

const cssId = (id) => id.replace(/[^a-zA-Z0-9_-]/g, '');

/* ============================================================
   SETUP: sensors list
   ============================================================ */
function saveRoster() {
  store.set('zb_roster', memberList().filter(m => !m.demo).map(m => ({
    id: m.id, name: m.name, sex: m.sex, age: m.age, weightKg: m.weightKg, heightCm: m.heightCm,
    restHR: m.restHR, maxHROverride: m.maxHROverride, betaBlocker: m.betaBlocker, startStation: m.startStation, deviceId: m.deviceId,
  })));
}
function renderSensorList() {
  const list = $('sensorList');
  $('sensorEmpty').hidden = members.size > 0;
  list.innerHTML = '';
  for (const m of members.values()) {
    const id = cssId(m.id);
    const dotClass = !m.deviceId ? 'none' : m.connected ? 'on' : 'off';
    const connectControl = m.deviceId
      ? `<span class="sr-bpm" id="bpm-${id}">${m.connected && m.bpm ? m.bpm : '–'}<small> bpm</small></span>
         <span class="sr-bat">${m.battery != null ? m.battery + '%' : ''}</span>
         <button class="sr-disconnect glass btn-ghost small" title="${esc(t('disconnectHR'))}" data-icon="close"></button>`
      : `<button class="sr-connect glass btn-ghost small" data-icon="bluetooth"><span>${esc(t('connectHR'))}</span></button>`;
    const row = document.createElement('div');
    row.className = 'sensor-row';
    row.innerHTML = `
      <div class="sr-head">
        <span class="sr-dot ${dotClass}"></span>
        <input class="sr-name" value="${esc(m.name)}" placeholder="${esc(t('personNamePh'))}" />
        ${connectControl}
        <button class="sr-expand" data-icon="chevron" aria-label="details"></button>
        <button class="sr-del" data-icon="trash" aria-label="remove"></button>
      </div>
      <div class="sr-details">
        <label>${esc(t('sex'))}<select class="f-sex"><option value="m"${m.sex==='m'?' selected':''}>${esc(t('male'))}</option><option value="f"${m.sex==='f'?' selected':''}>${esc(t('female'))}</option></select></label>
        <label>${esc(t('age'))}<input type="number" class="f-age" min="10" max="100" value="${m.age}" /></label>
        <label>${esc(t('weightKg'))}<input type="number" class="f-weightKg" min="20" max="250" value="${m.weightKg}" /></label>
        <label>${esc(t('heightCm'))}<input type="number" class="f-heightCm" min="100" max="230" value="${m.heightCm}" /></label>
        <label>${esc(t('restingHR'))}<input type="number" class="f-restHR" min="30" max="120" value="${m.restHR}" /></label>
        <label>${esc(t('maxHROverride'))}<input type="number" class="f-maxHROverride" min="0" max="230" value="${m.maxHROverride || ''}" placeholder="${esc(t('autoMax', { n: maxHRFromAge(m.age) }))}" /></label>
        <label class="sr-beta">${esc(t('betaBlockers'))}<input type="checkbox" class="switch f-betaBlocker"${m.betaBlocker?' checked':''} /></label>
      </div>`;
    // wire
    row.querySelector('.sr-name').addEventListener('input', e => { m.name = e.target.value; saveRoster(); });
    row.querySelector('.sr-expand').addEventListener('click', () => row.querySelector('.sr-details').classList.toggle('open'));
    row.querySelector('.sr-connect')?.addEventListener('click', () => connectPerson(m));
    row.querySelector('.sr-disconnect')?.addEventListener('click', () => disconnectPerson(m));
    row.querySelector('.sr-del').addEventListener('click', () => {
      if (m.deviceId) { try { sensors.remove(m.deviceId); } catch {} deviceToPerson.delete(m.deviceId); }
      members.delete(m.id); renderSensorList(); saveRoster(); updateSummary();
    });
    const bind = (cls, key, num) => row.querySelector(cls).addEventListener('input', e => {
      m[key] = num ? (parseFloat(e.target.value) || 0) : e.target.value; saveRoster();
      if (key === 'age') row.querySelector('.f-maxHROverride').placeholder = t('autoMax', { n: maxHRFromAge(m.age) });
    });
    bind('.f-sex', 'sex'); bind('.f-age', 'age', 1); bind('.f-weightKg', 'weightKg', 1);
    bind('.f-heightCm', 'heightCm', 1); bind('.f-restHR', 'restHR', 1); bind('.f-maxHROverride', 'maxHROverride', 1);
    row.querySelector('.f-betaBlocker').addEventListener('change', e => { m.betaBlocker = e.target.checked; saveRoster(); });
    list.appendChild(row);
  }
  applyIcons(list);
  updateSummary();
}
const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ============================================================
   SETUP: config inputs / steppers / target / exercises / playlist
   ============================================================ */
function renderConfigInputs() {
  document.querySelectorAll('.stepper').forEach(st => {
    const key = st.dataset.key, input = st.querySelector('input');
    input.value = config.intervals[key];
    const commit = (v) => {
      const val = clamp(Math.round(v), +input.min, +input.max);
      config.intervals[key] = val; input.value = val;
      saveConfig(); updateSummary();
      if (key === 'rounds' || key === 'sets') { reconcileExercises(); renderExercises(); updateStationLabels(); }
    };
    st.querySelector('.dec').onclick = () => commit(config.intervals[key] - (+input.step || 1));
    st.querySelector('.inc').onclick = () => commit(config.intervals[key] + (+input.step || 1));
    input.onchange = () => commit(+input.value);
  });
  // target zone selects
  for (const sel of [$('targetLow'), $('targetHigh')]) {
    sel.innerHTML = [1,2,3,4,5].map(z => `<option value="${z}">Z${z}</option>`).join('');
  }
  $('targetLow').value = config.targetZone.low;
  $('targetHigh').value = config.targetZone.high;
  const onTarget = () => {
    let lo = +$('targetLow').value, hi = +$('targetHigh').value;
    if (lo > hi) { hi = lo; $('targetHigh').value = hi; }
    config.targetZone = { low: lo, high: hi }; saveConfig();
  };
  $('targetLow').onchange = onTarget; $('targetHigh').onchange = onTarget;
  // exercises toggle
  $('exToggle').checked = config.exercisesOn;
  $('exToggle').onchange = () => { config.exercisesOn = $('exToggle').checked; saveConfig(); renderExercises(); updateStationLabels(); };
  const setMode = (mode) => { config.exerciseMode = mode; saveConfig(); renderExercises(); };
  $('modeSimple').onclick = () => setMode('simple');
  $('modeLevels').onclick = () => setMode('levels');
  // playlist
  video.setVolume(config.videoVolume ?? 50, false);
  $('playlistUrl').value = config.playlistUrl || '';
  $('playlistUrl').oninput = () => {
    config.playlistUrl = $('playlistUrl').value.trim();
    saveConfig(); video.setUrl(config.playlistUrl);
    clearTimeout($('playlistUrl')._t);                    // only save once they stop typing
    $('playlistUrl')._t = setTimeout(() => rememberVideo(config.playlistUrl), 800);
    renderVideoLib();
  };
  // Resync the player/status from config here too — loading a preset replaces
  // config.playlistUrl without going through the input's oninput handler, which
  // used to leave a stale "Video ready." and a live player for a removed video.
  video.setUrl(config.playlistUrl || '');
  updateStationLabels();
}
function updateStationLabels() {
  document.querySelectorAll('[data-station-label]').forEach(el => {
    el.textContent = config.exercisesOn ? t('stationsPerSet') : t('roundsPerSet');
  });
}
function reconcileExercises() {
  const sets = config.intervals.sets, st = stationCount();
  config.exercises = config.exercises || [];
  config.exercises.length = sets;
  for (let s = 0; s < sets; s++) {
    config.exercises[s] = config.exercises[s] || [];
    config.exercises[s].length = st;
    for (let i = 0; i < st; i++) config.exercises[s][i] = config.exercises[s][i] || { light: '', medium: '', hard: '' };
  }
  if (activeExSet >= sets) activeExSet = 0;
  saveConfig();
}
const isLevels = () => config.exerciseMode === 'levels';
let exClipboard = '';   // in-app copy buffer for exercise names

// Copy the open set's stations over every other set — most circuits repeat.
function applyExercisesToAllSets() {
  reconcileExercises();
  const src = config.exercises[activeExSet];
  const others = config.exercises.length - 1;
  if (others < 1) return;
  config.exercises = config.exercises.map((set, i) => i === activeExSet ? set : structuredClone(src));
  saveConfig(); renderExercises();
  toast(others > 1 ? t('copiedSetToOthers', { n: activeExSet + 1, m: others }) : t('copiedSetToOne', { n: activeExSet + 1 }));
}

function renderExercises() {
  const on = config.exercisesOn;
  $('exTabs').hidden = !on; $('exStations').hidden = !on; $('shuffleBtn').hidden = !on;
  $('exModeRow').hidden = !on; $('exModeHint').hidden = !on;
  $('exHint').hidden = on;
  if (!on) return;
  reconcileExercises();
  const levels = isLevels();
  $('modeSimple').classList.toggle('active', !levels);
  $('modeLevels').classList.toggle('active', levels);
  $('exModeHint').textContent = t(levels ? 'hintLevels' : 'hintSimple');

  const sets = config.intervals.sets;
  const tabs = $('exTabs'); tabs.innerHTML = '';
  tabs.hidden = sets < 2;
  $('applyAllBtn').hidden = sets < 2;
  if (sets > 1) {
    for (let s = 0; s < sets; s++) {
      const b = document.createElement('button');
      b.className = 'ex-tab' + (s === activeExSet ? ' active' : '');
      b.textContent = t('setN', { n: s + 1 });
      b.onclick = () => { activeExSet = s; renderExercises(); };
      tabs.appendChild(b);
    }
  }

  const wrap = $('exStations'); wrap.innerHTML = '';
  const set = config.exercises[activeExSet];
  const names = new Set();
  config.exercises.forEach(s => s.forEach(st => ['light', 'medium', 'hard'].forEach(k => st[k] && names.add(st[k]))));
  $('exOptions').innerHTML = [...names].map(n => `<option value="${esc(n)}">`).join('');

  const keys = levels ? ['light', 'medium', 'hard'] : ['medium'];
  const ph = { light: t('phLight'), medium: levels ? t('phMedium') : t('phExercise'), hard: t('phHard') };
  set.forEach((station, i) => {
    const row = document.createElement('div');
    row.className = 'ex-station' + (levels ? ' levels' : '');
    row.innerHTML = `<span class="ex-num">${i + 1}</span>` + keys.map(k => `
      <span class="ex-field ${k}">
        <input class="f-${k}" list="exOptions" placeholder="${ph[k]}" value="${esc(station[k])}" />
        <span class="ex-cp">
          <button class="cp-copy" data-k="${k}" title="${esc(t('copy'))}" data-icon="copy"></button>
          <button class="cp-paste" data-k="${k}" title="${esc(t('paste'))}" data-icon="paste"></button>
        </span>
      </span>`).join('');
    keys.forEach(k => {
      const input = row.querySelector('.f-' + k);
      input.addEventListener('input', e => { station[k] = e.target.value; saveConfig(); });
      row.querySelector(`.cp-copy[data-k="${k}"]`).onclick = () => {
        exClipboard = input.value.trim();
        navigator.clipboard?.writeText(exClipboard).catch(() => {});   // also to the OS clipboard when allowed
        toast(exClipboard ? t('copiedX', { x: exClipboard }) : t('nothingToCopy'));
      };
      row.querySelector(`.cp-paste[data-k="${k}"]`).onclick = () => {
        if (!exClipboard) { toast(t('copyFirst')); return; }
        input.value = exClipboard; station[k] = exClipboard; saveConfig();
      };
    });
    wrap.appendChild(row);
  });
  applyIcons(wrap);
}
$('shuffleBtn') && ($('shuffleBtn').onclick = () => {
  const st = stationCount();
  memberList().forEach((m, i) => { m.startStation = i; });
  // Fisher-Yates on the offsets
  const offs = memberList().map(m => m.startStation);
  for (let i = offs.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [offs[i], offs[j]] = [offs[j], offs[i]]; }
  memberList().forEach((m, i) => { m.startStation = offs[i] % st; });
  saveRoster(); toast(t('shuffled'));
});

function saveConfig() { store.set('zb_config', config); }
function updateSummary() {
  const tot = planTotals(buildPlan(config.intervals));   // not `t` — that's the translator
  $('sumTotal').textContent = fmt(tot.total);
  $('sumRounds').textContent = tot.workCount;
  $('sumMembers').textContent = members.size;
  // Bulgarian needs the singular for 1; English does too.
  $('sumRoundsLabel').textContent = t(tot.workCount === 1 ? 'intervalsOne' : 'intervals');
  $('sumMembersLabel').textContent = t(members.size === 1 ? 'membersLowerOne' : 'membersLower');
}

/* ============================================================
   DEMO MODE — ?demo=8 fills the roster with simulated straps.
   For showing the board off (or testing on a TV, where there's no console).
   Demo people are never written to the saved roster.
   ============================================================ */
const DEMO_NAMES = ['Anna', 'Ben', 'Cara', 'Dan', 'Eve', 'Finn', 'Gina', 'Hugo', 'Iris', 'Jon', 'Kim', 'Lena'];
function startDemo(n) {
  n = clamp(n, 1, 12);
  for (let i = 0; i < n; i++) {
    const p = newPerson(DEMO_NAMES[i]);
    p.demo = true;
    p.age = 24 + (i * 4) % 28;
    p.deviceId = 'demo-' + i;
    p.connected = true;
    p.battery = 60 + (i * 7) % 40;
    members.set(p.id, p);
    deviceToPerson.set(p.deviceId, p.id);
  }
  renderSensorList();
  // Feed through the real sensor callback so the simulated path is identical
  // to a live strap. Everyone drifts round a personal baseline and lifts
  // during work intervals.
  let tick = 0;
  setInterval(() => {
    tick++;
    let i = 0;
    for (const m of members.values()) {
      if (!m.demo) continue;
      const working = engine.running && engine.plan[engine.idx]?.type === 'work';
      const target = 104 + i * 7 + (working ? 26 : 0);
      const bpm = clamp(Math.round(target + 8 * Math.sin(tick / 7 + i) + (Math.random() * 6 - 3)), 55, 205);
      sensors.onSample(m.deviceId, bpm, Date.now());
      i++;
    }
  }, 1000);
  toast(`Demo mode · ${n} simulated members`);
}

/* ============================================================
   VIDEO LIBRARY — saved music, click a card to use it
   ============================================================ */
const SEED_VIDEOS = [
  'https://www.youtube.com/watch?v=q24y9Uu8Ud8',
  'https://www.youtube.com/watch?v=dN6p2m1dH1E',
  'https://www.youtube.com/watch?v=bsEjJNT6w5U',
  'https://www.youtube.com/watch?v=x1AqpdhzrxA',
  'https://www.youtube.com/watch?v=MugC8vHrqtg',
];
const videoLib = () => store.get('zb_videos', []);
const saveVideoLib = (list) => store.set('zb_videos', list);

// Remember a URL the trainer actually used. Title/thumb fill in from oEmbed.
function rememberVideo(url) {
  const media = video.parse(url);
  if (!media) return;
  const list = videoLib();
  if (list.some(v => v.url === url || (v.kind === media.kind && v.mediaId === media.id))) return;
  list.unshift({ url, kind: media.kind, mediaId: media.id, title: '', thumb: '' });
  saveVideoLib(list.slice(0, 24));           // ponytail: cap the list, nobody scrolls past two dozen
  renderVideoLib();
  fetchVideoMeta(url);
}
// YouTube oEmbed needs no API key and is CORS-open; cached so we ask once per video.
async function fetchVideoMeta(url) {
  try {
    const r = await fetch('https://www.youtube.com/oembed?url=' + encodeURIComponent(url) + '&format=json');
    if (!r.ok) return;
    const { title, thumbnail_url: thumb } = await r.json();
    const list = videoLib();
    const item = list.find(v => v.url === url);
    if (!item) return;
    item.title = title || ''; item.thumb = thumb || '';
    saveVideoLib(list); renderVideoLib();
  } catch { /* offline or blocked — the card falls back to the video id */ }
}
function renderVideoLib() {
  const wrap = $('videoLib'); if (!wrap) return;
  const list = videoLib();
  wrap.innerHTML = '';
  for (const v of list) {
    const inUse = config.playlistUrl === v.url;
    const thumb = v.thumb || (v.kind === 'video' ? `https://i.ytimg.com/vi/${v.mediaId}/mqdefault.jpg` : '');
    const card = document.createElement('div');
    card.className = 'vid-card' + (inUse ? ' active' : '');
    card.setAttribute('role', 'button');
    card.tabIndex = 0;
    card.title = v.title || v.url;                       // full title on hover
    card.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); } };
    card.innerHTML = `
      ${thumb ? `<img class="vid-thumb" src="${esc(thumb)}" alt="" loading="lazy" />` : '<div class="vid-thumb"></div>'}
      ${inUse ? '<span class="vid-badge">IN USE</span>' : ''}
      <span class="vid-del" data-del="1" aria-label="remove">✕</span>
      <span class="vid-title">${esc(v.title || (v.kind === 'playlist' ? 'Playlist ' : '') + v.mediaId)}</span>`;
    card.onclick = (e) => {
      if (e.target.dataset.del) {
        saveVideoLib(videoLib().filter(x => x.url !== v.url));
        renderVideoLib();
        return;
      }
      $('playlistUrl').value = v.url;
      config.playlistUrl = v.url; saveConfig();
      video.setUrl(v.url);
      renderVideoLib();
    };
    wrap.appendChild(card);
  }
  // fill in any titles we don't have yet (seeded entries, or a failed earlier fetch)
  list.filter(v => !v.title).slice(0, 6).forEach(v => fetchVideoMeta(v.url));
}

/* ============================================================
   PRESETS
   ============================================================ */
function renderPresets() {
  const list = $('presetList'); list.innerHTML = '';
  const presets = store.get('zb_presets', []);
  if (!presets.length) { list.innerHTML = `<span class="hint">${esc(t('noPresets'))}</span>`; return; }
  presets.forEach((p, i) => {
    const chip = document.createElement('span');
    chip.className = 'preset-chip';
    chip.innerHTML = `<span class="load">${esc(p.name)}</span><span class="del">✕</span>`;
    chip.querySelector('.load').onclick = () => loadPreset(p);
    chip.querySelector('.del').onclick = () => { presets.splice(i, 1); store.set('zb_presets', presets); renderPresets(); };
    list.appendChild(chip);
  });
}
function loadPreset(p) {
  config = structuredClone(p.config);
  config.intervals = Object.assign(structuredClone(DEFAULT_CONFIG.intervals), config.intervals);
  saveConfig();
  renderConfigInputs(); reconcileExercises(); renderExercises();
  toast(t('loadedPreset', { name: p.name }));
}
function saveCurrentPreset(name) {
  const presets = store.get('zb_presets', []);
  presets.push({ name, config: structuredClone(config) });
  store.set('zb_presets', presets); renderPresets();
}

/* ============================================================
   WORKOUT RENDER (members / stations / leaderboard)
   ============================================================ */
function exerciseAt(setNum, station, level) {
  const slot = config.exercises?.[setNum - 1]?.[station];
  if (!slot) return '';
  if (!isLevels()) return (slot.medium || '').trim();          // simple mode: one exercise for everyone
  return (slot[LEVELS[level]] || slot.medium || slot.light || slot.hard || '').trim();
}
/* Card transitions. The HR tick re-renders once a second, so the enter
   animation must fire only on a view switch or first paint — never on a tick,
   or every card would pulse every second. `viewAnimating` holds off the tick
   for the length of the transition. */
const ENTER_MS = 220, ENTER_STAGGER = 22, EXIT_MS = 140, EXIT_STAGGER = 14;
const CARD_SEL = '.member-card, .st-card, .qr-card';
let viewAnimating = false;

// Lay out `cards` into balanced rows that fill the container (see gridRows).
// Each row carries --s, the type scale for its cards: a 4-across card is the
// 1x baseline, so a 2-across card (twice the width) gets 2x the type.
function layoutCards(container, cards, animate = false) {
  container.innerHTML = '';
  const rows = gridRows(cards.length);
  let i = 0;
  for (const count of rows) {
    const row = document.createElement('div');
    row.className = 'wk-row';
    row.style.setProperty('--s', (4 / count).toFixed(3));
    for (let c = 0; c < count; c++) {
      const card = cards[i];
      if (animate) {
        card.classList.add('card-enter');
        card.style.animationDelay = (i * ENTER_STAGGER) + 'ms';
        // Drop the class once it's done: `animation-fill-mode: both` would
        // otherwise pin opacity to 1 and undo the dimming on dropped cards.
        card.addEventListener('animationend', () => {
          card.classList.remove('card-enter');
          card.style.animationDelay = '';
        }, { once: true });
      }
      row.appendChild(card);
      i++;
    }
    container.appendChild(row);
  }
}
function renderWorkout(animate = false) {
  if ($('workout').hidden) return;
  if (viewAnimating && !animate) return;      // don't stomp a transition in flight
  layoutCards($('wkGrid'), currentView === 'members' ? renderMembers() : renderStations(), animate);
}
// Staggered exit, then staggered entry of the other view.
function swapView() {
  const grid = $('wkGrid');
  const leaving = [...grid.querySelectorAll(CARD_SEL)];
  viewAnimating = true;
  leaving.forEach((c, i) => {
    c.classList.add('card-exit');
    c.style.animationDelay = (i * EXIT_STAGGER) + 'ms';
  });
  const outMs = leaving.length ? EXIT_MS + (leaving.length - 1) * EXIT_STAGGER : 0;
  setTimeout(() => {
    renderWorkout(true);
    const n = grid.querySelectorAll(CARD_SEL).length;
    setTimeout(() => { viewAnimating = false; }, ENTER_MS + Math.max(0, n - 1) * ENTER_STAGGER);
  }, outMs);
}
function renderMembers() {
  const cards = [];
  const st = stationCount();
  // Medals for the current top 3 — only once someone has actually scored,
  // so the whole class doesn't start out tied for gold on 0 points.
  const leaders = memberList().filter(m => m.points > 0).sort((a, b) => b.points - a.points).slice(0, 3);
  const medalOf = new Map(leaders.map((m, i) => [m.id, i + 1]));
  for (const m of members.values()) {
    const maxHR = memberMaxHR(m);
    const { zone, pct } = zoneFor(m.bpm, { maxHR, restHR: m.restHR });
    const color = ZONE_COLORS[zone];
    const station = stationFor(m.startStation, curWork.round, st);
    const ex = config.exercisesOn ? exerciseAt(curWork.set, station, m.level) : '';
    const nextStation = stationFor(m.startStation, curWork.round + 1, st);
    const nextEx = config.exercisesOn ? exerciseAt(curWork.set, nextStation, m.level) : '';
    const arrow = !isLevels() ? '' : m.arrow === 'up' ? '<span class="arrow up">↑</span>' : m.arrow === 'down' ? '<span class="arrow down">↓</span>' : '';
    const hasDev = !!m.deviceId;
    const card = document.createElement('div');
    card.className = 'member-card' + (hasDev && !m.connected ? ' dropped' : '') + (hasDev ? '' : ' no-hr');
    card.style.borderTopColor = m.connected ? color : 'var(--z0)';
    // HR badge only when a monitor is streaming; otherwise a muted status tag
    const badge = m.connected
      ? `<span class="mc-zbadge" style="background:${color}">${ZONE_LABELS[zone]}</span><span class="mc-pct">${Math.round(pct)}%</span>`
      : `<span class="mc-tag">${esc(t(hasDev ? 'reconnecting' : 'noMonitor'))}</span>`;
    card.innerHTML = `
      <div class="mc-name">${esc(m.name)}${m.betaBlocker ? '<span class="mc-beta">β</span>' : ''}</div>
      <div class="mc-bpm-row">
        <span class="mc-bpm">${m.connected && m.bpm ? m.bpm : '–'}</span><span class="mc-bpm-unit">bpm</span>
        ${badge}
      </div>
      ${curWork.upcoming ? `<div class="mc-upnext-row"><span class="mc-upnext">${esc(t('upNext'))}</span></div>` : ''}
      <div class="mc-station">S${station + 1}${ex ? ` · <span style="color:${m.connected ? color : 'inherit'}">${esc(ex)}</span> ${arrow}` : ''}</div>
      <div class="mc-next-station">${esc(t('thenS', { n: nextStation + 1 }))}${nextEx ? ` · ${esc(nextEx)}` : ''}</div>
      <div class="mc-foot">
        <span>${medalOf.has(m.id) ? `<i class="mc-medal m${medalOf.get(m.id)}" title="${esc(t('rank', { n: medalOf.get(m.id) }))}">${ICONS.medal}</i>` : ''}${esc(t('pts'))} <b>${round2(m.points)}</b></span>
        <span><i class="mc-flame">${ICONS.flame}</i><b>${Math.round(m.kcal)}</b> ${esc(t('kcal'))}</span>
      </div>`;
    cards.push(card);
  }
  return cards;
}
function renderStations() {
  const cards = [];
  const st = stationCount();
  const occupants = Array.from({ length: st }, () => []);
  for (const m of members.values()) occupants[stationFor(m.startStation, curWork.round, st)].push(m);
  for (let i = 0; i < st; i++) {
    const slot = config.exercises?.[curWork.set - 1]?.[i] || {};
    const card = document.createElement('div');
    card.className = 'st-card';
    const exBlock = !config.exercisesOn ? ''
      : isLevels()
        ? `<div class="st-variants">
             <span class="v-light"><b>L</b>${esc(slot.light || '—')}</span>
             <span class="v-medium"><b>M</b>${esc(slot.medium || '—')}</span>
             <span class="v-hard"><b>H</b>${esc(slot.hard || '—')}</span></div>`
        : `<div class="st-single">${esc(slot.medium || '—')}</div>`;
    card.innerHTML = `
      <div class="st-title">${esc(t(curWork.upcoming ? 'upNextStation' : 'station', { n: i + 1 }))}</div>
      ${exBlock}
      <div class="st-chips">${occupants[i].length
        ? occupants[i].map(m => { const z = zoneFor(m.bpm, { maxHR: memberMaxHR(m), restHR: m.restHR }).zone; return `<span class="chip" style="background:${ZONE_COLORS[z]}">${esc(m.name)} ${m.connected && m.bpm ? m.bpm : ''}</span>`; }).join('')
        : `<span class="chip empty">${esc(t('empty'))}</span>`}</div>`;
    cards.push(card);
  }
  return cards;
}

/* ============================================================
   RESULTS SCREEN (post-workout celebration)
   ============================================================ */
function showResults() {
  $('workout').hidden = true;
  $('results').hidden = false;
  const ranked = memberList().slice().sort((a, b) => b.points - a.points);
  const kcal = Math.round(ranked.reduce((a, m) => a + m.kcal, 0));
  const totalPts = round2(ranked.reduce((a, m) => a + m.points, 0));
  $('resultsSub').textContent = ranked.length
    ? t(ranked.length > 1 ? 'resultsSub' : 'resultsSubOne', { n: ranked.length, kcal, pts: totalPts })
    : t('noMembersConnected');
  buildPodium(ranked);
  buildResultsList(ranked);
  startConfetti();
  focusSoon('resultsBack');
}
function memberColor(m) { return ZONE_COLORS[zoneFor(m.bpm, { maxHR: memberMaxHR(m), restHR: m.restHR }).zone]; }
function buildPodium(ranked) {
  const pod = $('podium'); pod.innerHTML = '';
  const order = [{ m: ranked[1], place: 2 }, { m: ranked[0], place: 1 }, { m: ranked[2], place: 3 }];
  for (const { m, place } of order) {
    if (!m) continue;
    const el = document.createElement('div');
    el.className = 'pod pod-' + place;
    el.innerHTML = `
      ${place === 1 ? `<div class="pod-crown">${ICONS.crown}</div>` : ''}
      <div class="pod-card">
        <div class="pod-rank">${place}</div>
        <div class="pod-name">${esc(m.name)}</div>
        <div class="pod-pts" data-to="${round2(m.points)}">0</div>
        <div class="pod-kcal">${Math.round(m.kcal)} kcal</div>
      </div>`;
    pod.appendChild(el);
    animateCount(el.querySelector('.pod-pts'), round2(m.points), 1200, 700 + place * 120);
  }
}
function buildResultsList(ranked) {
  const list = $('resultsList'); list.innerHTML = '';
  ranked.forEach((m, i) => {
    const row = document.createElement('div');
    row.className = 'lb-row';
    row.style.animationDelay = (0.9 + i * 0.08) + 's';
    row.innerHTML = `<span class="lb-rank">${i + 1}</span>
      <span class="lb-name"><span class="lb-dot" style="background:${memberColor(m)}"></span>${esc(m.name)}</span>
      <span class="lb-pts">${round2(m.points)}<small>${Math.round(m.kcal)} kcal</small></span>`;
    list.appendChild(row);
  });
}
// count 0 → target with a rAF ramp (starts after `delay` ms)
function animateCount(el, to, dur, delay = 0) {
  setTimeout(() => {
    let startT = null;
    const step = (t) => {
      if (startT === null) startT = t;
      const k = Math.min(1, (t - startT) / dur);
      const eased = 1 - Math.pow(1 - k, 3);
      el.textContent = (to < 10 ? (to * eased).toFixed(1) : Math.round(to * eased));
      if (k < 1) requestAnimationFrame(step); else el.textContent = to;
    };
    requestAnimationFrame(step);
  }, delay);
}
let confettiRAF = null;
function startConfetti() {
  const cv = $('confetti'), ctx = cv.getContext('2d');
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const W = () => window.innerWidth, H = () => window.innerHeight;
  cv.width = W() * dpr; cv.height = H() * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const colors = ['#ffd35c', '#ff6b6b', '#6ea8fe', '#24d18a', '#c084fc', '#ff9f43'];
  const parts = Array.from({ length: 200 }, () => ({
    x: Math.random() * W(), y: Math.random() * -H(), w: 6 + Math.random() * 8, h: 8 + Math.random() * 12,
    c: colors[Math.floor(Math.random() * colors.length)], vy: 2 + Math.random() * 4, vx: -1.2 + Math.random() * 2.4,
    rot: Math.random() * 6.28, vr: -0.18 + Math.random() * 0.36,
  }));
  const frame = () => {
    ctx.clearRect(0, 0, W(), H());
    for (const p of parts) {
      p.y += p.vy; p.x += p.vx; p.rot += p.vr;
      if (p.y > H() + 20) { p.y = -20; p.x = Math.random() * W(); }
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = p.c; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); ctx.restore();
    }
    confettiRAF = requestAnimationFrame(frame);
  };
  confettiRAF = requestAnimationFrame(frame);
}
/* ============================================================
   HANDOUT — one QR per member holding their own session as plain text
   ============================================================ */
// Fold the per-interval log into one row per station (laps merged).
function sessionFor(m) {
  const byKey = new Map();
  for (const r of m.log) {
    const key = r.set + ':' + r.station;
    let a = byKey.get(key);
    if (!a) { a = { set: r.set, station: r.station, name: '', samples: 0, sum: 0, maxBpm: 0 }; byKey.set(key, a); }
    a.samples += r.samples;
    a.sum += r.avgBpm * r.samples;
    a.maxBpm = Math.max(a.maxBpm, r.maxBpm);
    if (r.name) a.name = r.name;         // keep the variant they ended on
  }
  return {
    name: m.name,
    date: new Date().toISOString().slice(0, 10),
    durationSec: sessionSecs,
    kcal: m.kcal, points: m.points,
    samples: m.bpmCount,
    avgBpm: m.bpmCount ? m.bpmSum / m.bpmCount : 0,
    maxBpm: m.maxBpm, maxHR: memberMaxHR(m),
    zoneSecs: m.zoneSecs,
    stations: [...byKey.values()].map(a => ({ ...a, avgBpm: a.samples ? a.sum / a.samples : 0 })),
  };
}
// QR as inline SVG (dark modules on white). Falls back to a shorter payload if it won't fit.
function qrSvg(text) {
  for (const payload of [text, text.split('\n').slice(0, 6).join('\n')]) {
    try {
      const qr = qrcode(0, 'M');
      qr.addData(payload); qr.make();
      const n = qr.getModuleCount();
      let path = '';
      for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (qr.isDark(r, c)) path += `M${c} ${r}h1v1h-1z`;
      return `<svg viewBox="0 0 ${n} ${n}" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg"><path fill="#0b1020" d="${path}"/></svg>`;
    } catch { /* too long for a QR — retry with the summary only */ }
  }
  return `<span class="qr-meta">${esc(t('tooMuchData'))}</span>`;
}
function showHandout() {
  stopConfetti();
  $('results').hidden = true;
  $('handout').hidden = false;
  const cards = memberList().map(m => {
    const s = sessionFor(m);
    const text = buildHandout(s, 420, {
      line2: t('hoLine2'), hr: t('hoHR'), noMonitor: t('hoNoMonitor'),
      stations: t('hoStations'), stationsHR: t('hoStationsHR'),
    });
    const card = document.createElement('div');
    card.className = 'qr-card';
    card.innerHTML = `<div class="qr-name">${esc(m.name)}</div>
      <div class="qr-img">${qrSvg(text)}</div>
      <div class="qr-meta">${esc(s.samples
        ? t('qrMetaHR', { kcal: Math.round(s.kcal), pts: round2(s.points), avg: Math.round(s.avgBpm) })
        : t('qrMeta', { kcal: Math.round(s.kcal), pts: round2(s.points) }))}</div>`;
    return card;
  });
  layoutCards($('handoutGrid'), cards, true);
  focusSoon('handoutBack');
}

function stopConfetti() {
  cancelAnimationFrame(confettiRAF); confettiRAF = null;
  const cv = $('confetti'); cv.getContext('2d').clearRect(0, 0, cv.width, cv.height);
}

/* ============================================================
   AUDIO CUES (Web Audio — countdown beeps + phase tones)
   ============================================================ */
const audio = {
  // Cues always play at full scale — they have to cut through the music.
  // (The mute button silences the video, not these.)
  ctx: null,
  unlock() {
    try {
      if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      if (this.ctx.state === 'suspended') this.ctx.resume();
    } catch {}
  },
  beep(freq, dur = 0.12, vol = 1) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const o = this.ctx.createOscillator(), g = this.ctx.createGain();
    o.type = 'sine'; o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, now);
    g.gain.linearRampToValueAtTime(vol, now + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    o.connect(g).connect(this.ctx.destination);
    o.start(now); o.stop(now + dur + 0.02);
  },
  countdown() { this.beep(880, 0.09, 0.85); },                 // 3-2-1 tick
  go(type) { this.beep(type === 'work' ? 1250 : 620, 0.3, 1); },      // phase start
  finish() { [0, 0.16, 0.32].forEach((d, i) => setTimeout(() => this.beep(600 + i * 300, 0.24, 1), d * 1000)); },
};

/* ============================================================
   YOUTUBE (lifted, extended for playlists)
   ============================================================ */
const video = {
  media: null, player: null, apiRequested: false, ready: false, wantPlay: false, userPaused: false, loopTimer: null,
  volume: 50, muted: false,
  setVolume(v, save = true) {
    this.volume = clamp(Math.round(v / 10) * 10, 0, 100);      // 10% steps
    if (save) { config.videoVolume = this.volume; saveConfig(); }
    const g = $('volGroup');
    g.style.setProperty('--vol', this.volume);            // the group *is* the level meter
    g.title = t('musicVolume', { n: this.volume });
    this.applyVolume();
  },
  applyVolume() {
    if (!this.player || !this.ready) return;
    try {
      this.player.setVolume(this.volume);
      if (this.muted || this.volume === 0) this.player.mute(); else this.player.unMute();
    } catch {}
  },
  // Mutes the music only — timer cues are Web Audio and stay audible.
  toggleMute() {
    this.muted = !this.muted;
    $('muteBtn').innerHTML = this.muted ? ICONS.mute : ICONS.volume;
    $('muteBtn').closest('.vol-group').classList.toggle('is-muted', this.muted);
    this.applyVolume();
    return this.muted;
  },
  // The percentage is on screen, so no toast needed.
  nudgeVolume(delta) {
    this.setVolume(this.volume + delta);
    if (this.muted && this.volume > 0) this.toggleMute();      // turning it up un-mutes
  },
  parse(url) {
    if (!url) return null;
    const pl = String(url).match(/[?&]list=([A-Za-z0-9_-]+)/);
    if (pl) return { kind: 'playlist', id: pl[1] };
    const v = String(url).match(/(?:youtu\.be\/|v=|\/embed\/|\/shorts\/|\/live\/)([A-Za-z0-9_-]{11})/);
    if (v) return { kind: 'video', id: v[1] };
    const bare = String(url).trim();
    return /^[A-Za-z0-9_-]{11}$/.test(bare) ? { kind: 'video', id: bare } : null;
  },
  setUrl(url) {
    const prev = this.media;
    this.media = this.parse(url);
    const el = $('playlistStatus');
    if (!url) { el.textContent = 'Plays behind the workout on the big screen.'; el.className = 'hint'; }
    else if (this.media) { el.textContent = this.media.kind === 'playlist' ? 'Playlist ready.' : 'Video ready.'; el.className = 'hint ok'; }
    else { el.textContent = "Couldn't read that YouTube link."; el.className = 'hint err'; }
    if (this.media) { this.loadApi(); this.ensurePlayer(); }   // built eagerly so Start plays within the click gesture (→ sound)
    else if (prev) this.destroy();   // URL cleared/invalid: tear the old player down or it keeps playing audio
  },
  // Drop the player entirely and put a fresh mount point back.
  destroy() {
    this.wantPlay = false; this.ready = false;
    clearInterval(this.loopTimer); this.loopTimer = null;
    try { this.player?.destroy(); } catch {}
    this.player = null;
    const bg = $('ytBg');
    bg.hidden = true; $('ytScrim').hidden = true;
    bg.innerHTML = '<div id="ytPlayer"></div>';
  },
  loadApi() {
    if (this.apiRequested || (window.YT && window.YT.Player)) return;
    this.apiRequested = true;
    const tag = document.createElement('script'); tag.src = 'https://www.youtube.com/iframe_api'; document.head.appendChild(tag);
  },
  ensurePlayer() {
    if (!this.media || !window.YT || !window.YT.Player) return;
    const vars = { autoplay: 0, controls: 0, disablekb: 1, fs: 0, modestbranding: 1, playsinline: 1, rel: 0, loop: 1, iv_load_policy: 3, cc_load_policy: 0 };
    if (this.media.kind === 'playlist') { vars.listType = 'playlist'; vars.list = this.media.id; }
    else { vars.playlist = this.media.id; }
    if (this.player) {
      if (this.media.kind === 'playlist') this.player.loadPlaylist({ list: this.media.id, listType: 'playlist' });
      else this.player.loadVideoById(this.media.id);
      return;
    }
    this.player = new YT.Player('ytPlayer', {
      videoId: this.media.kind === 'video' ? this.media.id : undefined,
      playerVars: vars,
      events: {
        onReady: () => {
          this.ready = true; this.applyVolume(); this.hideCaptions();
          if (this.wantPlay) { this.wantPlay = false; this._playSafe(); }
        },
        onStateChange: (e) => {
          if (e.data === YT.PlayerState.PLAYING) this.hideCaptions();   // caption module loads with playback
          if (e.data === YT.PlayerState.ENDED && this.media.kind === 'video') { this.player.seekTo(0); this.player.playVideo(); }
          else if (e.data === YT.PlayerState.PAUSED && engine.running && !this.userPaused) this.player.playVideo();
        },
        onApiChange: () => this.hideCaptions(),
      },
    });
  },
  // Force captions off — cc_load_policy only affects the default; unloading the module is reliable.
  hideCaptions() {
    if (!this.player) return;
    try { this.player.unloadModule('captions'); } catch {}
    try { this.player.unloadModule('cc'); } catch {}
  },
  start() {
    if (!this.media) return;
    this.userPaused = false;
    $('ytBg').hidden = false; $('ytScrim').hidden = false;
    if (this.player && this.ready) {
      this.applyVolume();
      try { this.player.playVideo(); } catch {}          // within Start's gesture → sound allowed
    } else { this.wantPlay = true; this.ensurePlayer(); }
    clearInterval(this.loopTimer);
    this.loopTimer = setInterval(() => this.maintainLoop(), 500);
  },
  // Play when NOT in a user gesture (onReady fired late): muted autoplay is always allowed, then unmute.
  _playSafe() {
    try { this.player.mute(); this.player.playVideo(); setTimeout(() => this.applyVolume(), 400); } catch {}
  },
  maintainLoop() {
    if (!this.player || !this.ready || this.media?.kind !== 'video') return;
    try { if (this.player.getPlayerState() === YT.PlayerState.PLAYING) { const d = this.player.getDuration(), c = this.player.getCurrentTime(); if (d > 2 && d - c < 1.2) this.player.seekTo(0, true); } } catch {}
  },
  pause() { this.userPaused = true; try { this.player?.pauseVideo(); } catch {} },
  // Guard on `media`: without it, resuming a paused workout would restart a player
  // left over from a video the trainer has since removed (audio with no picture).
  resume() { this.userPaused = false; if (!this.media) return; try { this.player?.playVideo(); } catch {} },
  stop() { this.wantPlay = false; clearInterval(this.loopTimer); try { this.player?.stopVideo(); } catch {} $('ytBg').hidden = true; $('ytScrim').hidden = true; },
};
window.onYouTubeIframeAPIReady = () => video.ensurePlayer();

/* ============================================================
   WIRE UP
   ============================================================ */
// Re-paint every localised surface after a language switch.
function applyLanguage() {
  applyI18n();
  updateStationLabels();
  renderPresets();
  renderVideoLib();
  renderExercises();
  renderSensorList();
  video.setUrl(config.playlistUrl || '');   // refresh the status line in the new language
  video.setVolume(video.volume, false);     // refreshes the volume tooltip
  if (!$('workout').hidden) { paintPhase(engine.plan[engine.idx]); renderWorkout(); }
}

function init() {
  initLang();
  applyI18n();
  applyIcons();
  setPlayIcon();
  if (localStorage.getItem('zb_presets') === null) store.set('zb_presets', [DEMO_PRESET]);   // seed once
  if (localStorage.getItem('zb_videos') === null) {
    saveVideoLib(SEED_VIDEOS.map(url => {
      const m = video.parse(url);
      return { url, kind: m.kind, mediaId: m.id, title: '', thumb: '' };
    }));
  }

  // load roster (people persist; devices need re-pairing but keep their assignment)
  for (const r of store.get('zb_roster', [])) {
    const p = Object.assign(newPerson(r.name), r); p.connected = false; p.bpm = 0; p.battery = null;
    members.set(p.id, p);
    if (p.deviceId) deviceToPerson.set(p.deviceId, p.id);
  }
  $('reconnectBtn').hidden = deviceToPerson.size === 0 || !bluetoothSupported();

  renderConfigInputs();
  reconcileExercises();
  renderExercises();
  renderPresets();
  renderVideoLib();
  renderSensorList();   // (renderConfigInputs already synced the video from config)

  $('addPersonBtn').onclick = addPerson;
  $('reconnectBtn').onclick = () => sensors.reconnectKnown([...deviceToPerson.keys()]).then(r => toast(r.length ? t('reconnectedN', { n: r.length }) : t('noKnownStraps'))).catch(() => toast(t('reconnectFailed')));
  if (!bluetoothSupported()) $('btWarn').hidden = false;

  $('startBtn').onclick = startWorkout;
  $('endBtn').onclick = endWorkout;
  $('playBtn').onclick = togglePlay;
  $('skipBtn').onclick = skip;
  $('resetBtn').onclick = resetWorkout;
  $('muteBtn').onclick = () => video.toggleMute();
  const sel = $('langSelect');
  sel.innerHTML = Object.entries(LANGS).map(([k, v]) => `<option value="${k}">${v}</option>`).join('');
  sel.value = getLang();
  sel.onchange = () => { setLang(sel.value); applyLanguage(); };
  $('applyAllBtn').onclick = applyExercisesToAllSets;
  $('volDown').onclick = () => video.nudgeVolume(-10);
  $('volUp').onclick = () => video.nudgeVolume(10);
  $('fullscreenBtn').onclick = toggleFullscreen;
  document.addEventListener('fullscreenchange', () => { $('fullscreenBtn').innerHTML = document.fullscreenElement ? ICONS.compress : ICONS.expand; });
  $('viewMembers').onclick = () => setView('members');
  $('viewStations').onclick = () => setView('stations');
  $('resultsBack').onclick = () => { stopConfetti(); $('results').hidden = true; $('setup').hidden = false; renderSensorList(); focusSoon('addPersonBtn'); };
  $('getResultsBtn').onclick = showHandout;
  $('handoutBack').onclick = () => { $('handout').hidden = true; $('setup').hidden = false; renderSensorList(); focusSoon('addPersonBtn'); };
  document.addEventListener('keydown', onKey);

  const demo = new URLSearchParams(location.search).get('demo');
  if (demo !== null) startDemo(parseInt(demo, 10) || 6);
  // Tapping the video to skip an ad moves focus into the YouTube iframe, which
  // would swallow every keyboard/remote shortcut. Take focus straight back.
  window.addEventListener('blur', () => setTimeout(() => {
    if (document.activeElement?.tagName === 'IFRAME') { document.activeElement.blur(); window.focus(); }
  }, 0));

  // preset modal
  $('savePresetBtn').onclick = () => { $('presetName').value = ''; $('modal').hidden = false; $('presetName').focus(); };
  $('modalCancel').onclick = () => { $('modal').hidden = true; };
  $('modalOk').onclick = () => { const n = $('presetName').value.trim(); if (!n) return; saveCurrentPreset(n); $('modal').hidden = true; };
}
init();

if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
