/* ============================================================
   Tabata Timer — dependency-free PWA
   Timekeeping is timestamp-based (performance.now) so it never
   drifts when the tab is throttled/backgrounded. Audio cues are
   pre-scheduled on the Web Audio clock so they still fire when
   the screen is off.
   ============================================================ */
'use strict';

/* ---------- Config & persistence ---------- */
const DEFAULT_CONFIG = {
  prepare: 10, work: 20, rest: 10, rounds: 8,
  sets: 1, setRepeat: 1, restSet: 60, warmup: 0, cooldown: 0,
  exercisesOn: false, exercises: [],   // exercises[setIndex][roundIndex] = name
};

// Merge onto defaults and make `exercises` an owned 2D array so per-config
// edits never mutate a shared reference (e.g. the default/preset templates).
function normalizeConfig(c) {
  const merged = { ...DEFAULT_CONFIG, ...c };
  merged.exercisesOn = !!merged.exercisesOn;
  merged.exercises = normalizeExercises(merged.exercises);
  return merged;
}

// Accepts the current 2D shape or the legacy flat (per-round, shared) array
// and always returns a deep-copied 2D array: exercises[set][round].
function normalizeExercises(ex) {
  if (!Array.isArray(ex)) return [];
  if (ex.length && typeof ex[0] === 'string') return [ex.slice()]; // migrate legacy flat → set 1
  return ex.map(set => (Array.isArray(set) ? set.slice() : []));
}
const DEFAULT_CUES = { volume: 0.8, voiceOn: true, countdownOn: true, spokenCountdownOn: false, halfwayOn: true, vibrateOn: true, wakeOn: true };

const BUILTIN_PRESETS = [
  { id: 'tabata',  name: 'Classic Tabata', config: { ...DEFAULT_CONFIG }, builtin: true },
  { id: 'hiit',    name: 'HIIT 40/20',     config: { prepare: 10, work: 40, rest: 20, rounds: 8, sets: 1, restSet: 60, warmup: 0, cooldown: 0 }, builtin: true },
  { id: 'emom',    name: 'EMOM x10',       config: { prepare: 10, work: 60, rest: 0, rounds: 10, sets: 1, restSet: 0, warmup: 0, cooldown: 0 }, builtin: true },
  { id: 'strong',  name: '3 Sets / 20-40', config: { prepare: 10, work: 20, rest: 40, rounds: 6, sets: 3, restSet: 90, warmup: 60, cooldown: 60 }, builtin: true },
  { id: 'hiit4515', name: 'HIIT 45/15',    config: { prepare: 10, work: 45, rest: 15, rounds: 10, sets: 1, restSet: 0, warmup: 0, cooldown: 0 }, builtin: true },
  { id: 'boxing',  name: 'Boxing 3×3',     config: { prepare: 10, work: 180, rest: 60, rounds: 3, sets: 1, restSet: 0, warmup: 0, cooldown: 0 }, builtin: true },
  { id: 'fgb',     name: 'Fight Gone Bad', config: { prepare: 10, work: 60, rest: 0, rounds: 5, sets: 3, restSet: 60, warmup: 0, cooldown: 0 }, builtin: true },
  { id: 'sprint',  name: 'Sprint 8',       config: { prepare: 15, work: 30, rest: 90, rounds: 8, sets: 1, restSet: 0, warmup: 120, cooldown: 60 }, builtin: true },
  { id: 'amrap',   name: 'AMRAP 20',       config: { prepare: 10, work: 1200, rest: 0, rounds: 1, sets: 1, restSet: 0, warmup: 0, cooldown: 0 }, builtin: true },
];

// Cardio / HIIT / Tabata exercise suggestions (deduped; sorted at build time).
const EXERCISE_SUGGESTIONS = [
  'Battle Ropes', 'Bear Crawl', 'Bear Plank', 'Bicycle Crunches', 'Bird Dog', 'Box Jumps',
  'Broad Jumps', 'Burpees', 'Butt Kicks', 'Calf Raises', 'Chin-ups', 'Commandos', 'Crab Walk',
  'Cross Jacks', 'Crunches', 'Curtsy Lunges', 'Cycling', 'Dead Bug', 'Diamond Push-ups',
  'Donkey Kicks', 'Elliptical', 'Fast Feet', 'Fire Hydrants', 'Flutter Kicks', 'Frog Jumps',
  'Glute Bridges', 'Grapevine', 'Heel Taps', 'High Knees', 'Hip Thrusts', 'Inchworms', 'Jab Cross',
  'Jog in Place', 'Jump Lunges', 'Jump Rope', 'Jump Squats', 'Jumping Jacks', 'Kettlebell Swings',
  'Kick Throughs', 'Knee Tucks', 'Lateral Bounds', 'Lateral Shuffle', 'Leg Raises', 'Lunges',
  'Mountain Climbers', 'Pike Push-ups', 'Plank', 'Plank Jacks', 'Plank to Push-up', 'Pop Squats',
  'Pull-ups', 'Punches', 'Push-ups', 'Reverse Crunches', 'Reverse Lunges', 'Rowing',
  'Running in Place', 'Russian Twists', 'Scissor Kicks', 'Seal Jacks', 'Shadow Boxing',
  'Side Lunges', 'Side Plank', 'Sit-ups', 'Skaters', 'Speed Skaters', 'Spider-Man Push-ups',
  'Split Squats', 'Sprawls', 'Sprints', 'Squat Jacks', 'Squat Jumps', 'Squat Pulses',
  'Squat Thrusts', 'Squats', 'Stair Climbs', 'Star Jumps', 'Step-ups', 'Superman', 'Toe Taps',
  'Toe Touches', 'Triceps Dips', 'Tuck Jumps', 'V-ups', 'Walking Lunges', 'Wall Sit',
  'Windshield Wipers',
];

const store = {
  get(key, fallback) { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; } },
  set(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} },
};

let config = normalizeConfig(store.get('tt_config', {}));
let cues = { ...DEFAULT_CUES, ...store.get('tt_cues', {}) };
let presets = store.get('tt_presets', []);          // user presets
let recentId = store.get('tt_recent', 'tabata');    // selected preset id, or null when config diverges
let editMode = false;                                // true while editing an existing preset's settings
let history = store.get('tt_history', []);           // completed-workout log

/* ---------- i18n ---------- */
function detectLang() {
  const supported = LANGS.map(l => l.code);
  for (const l of (navigator.languages || [navigator.language || 'en'])) {
    const code = String(l).toLowerCase().split('-')[0];
    if (supported.includes(code)) return code;
  }
  return 'en';
}
let lang = store.get('tt_lang', null) || detectLang();

function t(key, params) {
  const dict = I18N[lang] || I18N.en;
  let s = dict[key] != null ? dict[key] : (I18N.en[key] != null ? I18N.en[key] : key);
  if (params) for (const k in params) s = s.split('{' + k + '}').join(params[k]);
  return s;
}
const phaseName = (type) => t(type);   // phase types map 1:1 to translation keys

/* ---------- Icons (inline SVG, no external library) ---------- */
const IC = (inner, filled) =>
  `<svg viewBox="0 0 24 24" width="1em" height="1em" class="ic" aria-hidden="true" ` +
  (filled ? `fill="currentColor">` : `fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">`) +
  inner + `</svg>`;
const ICONS = {
  share: IC('<path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/><path d="M12 15V3"/><path d="M7 8l5-5 5 5"/>'),
  plus: IC('<path d="M12 5v14M5 12h14"/>'),
  minus: IC('<path d="M5 12h14"/>'),
  copy: IC('<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M6 15H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1"/>'),
  close: IC('<path d="M18 6L6 18M6 6l12 12"/>'),
  volume: IC('<path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19.5 5a9 9 0 0 1 0 14"/>'),
  mute: IC('<path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M23 9l-6 6M17 9l6 6"/>'),
  reset: IC('<path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>'),
  play: IC('<path d="M6 4l14 8-14 8z"/>', true),
  pause: IC('<path d="M7 4h3v16H7zM14 4h3v16h-3z"/>', true),
  skip: IC('<path d="M5 4l11 8-11 8z"/><path d="M18 5h2v14h-2z"/>', true),
  edit: IC('<path d="M17 3a2.83 2.83 0 0 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>'),
  trash: IC('<path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>'),
  check: IC('<path d="M20 6L9 17l-5-5"/>'),
  shuffle: IC('<path d="M16 3h5v5"/><path d="M4 20 21 3"/><path d="M21 16v5h-5"/><path d="M15 15l6 6"/><path d="M4 4l5 5"/>'),
};
function applyIcons() {
  document.querySelectorAll('[data-icon]').forEach(el => {
    if (ICONS[el.dataset.icon]) el.insertAdjacentHTML('afterbegin', ICONS[el.dataset.icon]);
  });
}

/* ---------- DOM ---------- */
const $ = (id) => document.getElementById(id);
const setupEl = $('setup'), timerEl = $('timer');
const els = {
  installBtn: $('installBtn'), shareBtn: $('shareBtn'), startBtn: $('startBtn'), langSelect: $('langSelect'),
  presetList: $('presetList'), savePresetBtn: $('savePresetBtn'),
  editBar: $('editBar'), editBarLabel: $('editBarLabel'), editSave: $('editSave'), editCancel: $('editCancel'),
  copySetsBtn: $('copySetsBtn'), presetsMore: $('presetsMore'), configMore: $('configMore'), workoutGrid: $('workoutGrid'),
  sumTotal: $('sumTotal'), sumRounds: $('sumRounds'), sumWork: $('sumWork'),
  volume: $('volume'), voiceOn: $('voiceOn'), countdownOn: $('countdownOn'),
  spokenCountdownOn: $('spokenCountdownOn'), halfwayOn: $('halfwayOn'),
  vibrateOn: $('vibrateOn'), wakeOn: $('wakeOn'), vibrateRow: $('vibrateRow'), vibrateNote: $('vibrateNote'),
  exercisesOn: $('exercisesOn'), exercisesHint: $('exercisesHint'),
  exerciseTabs: $('exerciseTabs'), exerciseList: $('exerciseList'), exActions: $('exActions'), shuffleBtn: $('shuffleBtn'),
  historyList: $('historyList'), clearHistoryBtn: $('clearHistoryBtn'),
  themeSelect: $('themeSelect'), accentSwatches: $('accentSwatches'),
  exportBtn: $('exportBtn'), importBtn: $('importBtn'), importFile: $('importFile'),
  updateBanner: $('updateBanner'), refreshBtn: $('refreshBtn'), srAnnounce: $('srAnnounce'),
  timerHint: $('timerHint'), setupHint: $('setupHint'),
  phaseLabel: $('phaseLabel'), exerciseName: $('exerciseName'), roundInfo: $('roundInfo'), setInfo: $('setInfo'),
  bigCount: $('bigCount'), nextUp: $('nextUp'), ring: $('ring'),
  elapsed: $('elapsed'), remaining: $('remaining'), totalBar: $('totalBar'),
  playBtn: $('playBtn'), skipBtn: $('skipBtn'), resetBtn: $('resetBtn'),
  backBtn: $('backBtn'), muteBtn: $('muteBtn'),
  modal: $('modal'), presetName: $('presetName'), modalOk: $('modalOk'), modalCancel: $('modalCancel'),
  shareModal: $('shareModal'), qrBox: $('qrBox'), shareUrlField: $('shareUrlField'),
  copyUrlBtn: $('copyUrlBtn'), shareClose: $('shareClose'), shareExtras: $('shareExtras'),
  videoUrl: $('videoUrl'), videoStatus: $('videoStatus'), videoVolume: $('videoVolume'),
  ytBg: $('ytBg'), ytScrim: $('ytScrim'),
  toast: $('toast'),
};

const RING_LEN = 2 * Math.PI * 54; // r=54

/* ============================================================
   PLAN BUILDER — flatten config into an ordered phase list
   ============================================================ */
function buildPlan(c) {
  const plan = [];
  if (c.prepare > 0) plan.push({ type: 'prepare', dur: c.prepare, label: 'Prepare' });
  if (c.warmup > 0)  plan.push({ type: 'warmup',  dur: c.warmup,  label: 'Warmup' });

  // Each set (1..sets) runs `setRepeat` times before moving to the next set.
  const reps = Math.max(1, c.setRepeat || 1);
  const totalBlocks = c.sets * reps;
  let block = 0;
  for (let s = 1; s <= c.sets; s++) {
    for (let rep = 1; rep <= reps; rep++) {
      block++;
      for (let r = 1; r <= c.rounds; r++) {
        plan.push({ type: 'work', dur: c.work, label: 'Work', round: r, set: s, rep });
        // Rest after each work except the last round of a block (that boundary
        // uses the between-set rest) and except the very end of the workout.
        if (c.rest > 0 && r < c.rounds) {
          plan.push({ type: 'rest', dur: c.rest, label: 'Rest', round: r, set: s, rep });
        }
      }
      // Rest between sets — inserted between every consecutive block (repeats
      // and set changes alike), but not after the final block.
      if (block < totalBlocks && c.restSet > 0) {
        plan.push({ type: 'restSet', dur: c.restSet, label: 'Set Rest', set: s, rep });
      }
    }
  }
  if (c.cooldown > 0) plan.push({ type: 'cooldown', dur: c.cooldown, label: 'Cooldown' });
  return plan;
}

function planTotals(plan) {
  const total = plan.reduce((a, p) => a + p.dur, 0);
  const work = plan.filter(p => p.type === 'work').reduce((a, p) => a + p.dur, 0);
  const workCount = plan.filter(p => p.type === 'work').length;
  return { total, work, workCount };
}

/* ============================================================
   ENGINE — timestamp-based, throttle-proof
   ============================================================ */
const engine = {
  plan: [],
  idx: 0,
  running: false,
  phaseStart: 0,      // performance.now() reference for current phase start
  accrued: 0,         // seconds elapsed in current phase before last pause
  totalBefore: 0,     // total seconds elapsed in phases before current idx
  grandTotal: 0,
  raf: null,
  interval: null,
  scheduledBeeps: [], // cancellable audio nodes
  lastWholeSec: -1,
};

function startWorkout() {
  engine.plan = buildPlan(config);
  if (!engine.plan.length) { toast(t('tNothing')); return; }
  engine.idx = 0;
  engine.accrued = 0;
  engine.totalBefore = 0;
  engine.grandTotal = planTotals(engine.plan).total;
  engine.running = true;
  engine.lastWholeSec = -1;

  showTimer();
  audio.unlock();
  requestWakeLock();
  video.start();
  enterPhase(0, true);
  engine.phaseStart = performance.now();
  scheduleAllCues(0);
  startLoops();
}

function enterPhase(i, firstEnter) {
  engine.idx = i;
  engine.accrued = 0;
  engine.phaseStart = performance.now();
  engine.lastWholeSec = -1;
  engine.saidHalfway = false;
  engine.lastSpokenSec = null;

  const phase = engine.plan[i];
  paintPhase(phase);
  announcePhase(phase, firstEnter);
  announceForScreenReader(phase);
  flashScreen();
  vibrateFor(phase);
}

// Concise phase description for assistive tech (aria-live region).
function announceForScreenReader(phase) {
  let sr = phaseName(phase.type);
  const ex = exerciseFor(phase);
  if (ex) sr += '. ' + ex;
  if (phase.round) sr += '. ' + t('roundOf', { r: phase.round, n: config.rounds });
  if (config.sets > 1 && phase.set) sr += '. ' + t('setOf', { s: phase.set, n: config.sets });
  els.srAnnounce.textContent = sr;
}

// Mid-interval voice cues: "Halfway" and the spoken 3-2-1 countdown.
function voiceCues(phase, elapsed) {
  if (!phase || !cues.voiceOn) return;
  const remain = phase.dur - elapsed;
  if (cues.halfwayOn && phase.type === 'work' && phase.dur >= 20 && !engine.saidHalfway && elapsed >= phase.dur / 2) {
    engine.saidHalfway = true;
    say(t('vHalfway'));
    return;
  }
  if (cues.spokenCountdownOn) {
    const sec = Math.ceil(remain - 0.05);
    if (sec >= 1 && sec <= 3 && sec !== engine.lastSpokenSec) {
      engine.lastSpokenSec = sec;
      say(String(sec));
    }
  }
}

function currentPhaseElapsed() {
  if (!engine.running) return engine.accrued;
  return engine.accrued + (performance.now() - engine.phaseStart) / 1000;
}
function currentPlanTime() {
  return engine.totalBefore + currentPhaseElapsed();
}

/* Two drivers: setInterval is the backbone (keeps firing when the tab is
   backgrounded, so phases still advance); rAF adds visual smoothness when
   the page is actually painting. Both call the same idempotent tick(). */
function startLoops() {
  stopLoops();
  engine.interval = setInterval(tick, 250);
  const raf = () => { if (!engine.running) return; tick(); engine.raf = requestAnimationFrame(raf); };
  engine.raf = requestAnimationFrame(raf);
}
function stopLoops() {
  clearInterval(engine.interval); engine.interval = null;
  cancelAnimationFrame(engine.raf); engine.raf = null;
}

function tick() {
  const phase = engine.plan[engine.idx];
  if (!phase) return;
  // Mobile speech synthesis can suspend the audio context; nudge it back so cues keep firing.
  if (audio.ctx && audio.ctx.state !== 'running' && engine.running) audio.ctx.resume();
  let elapsed = currentPhaseElapsed();

  // Advance across any phases we may have blown past (heavy throttling)
  while (engine.plan[engine.idx] && elapsed >= engine.plan[engine.idx].dur) {
    const done = engine.plan[engine.idx];
    engine.totalBefore += done.dur;
    const carry = elapsed - done.dur;
    const nextIdx = engine.idx + 1;
    if (nextIdx >= engine.plan.length) { finishWorkout(); return; }
    enterPhase(nextIdx, false);
    engine.accrued = carry;                 // carry remainder into next phase
    elapsed = currentPhaseElapsed();
  }

  render(engine.plan[engine.idx], elapsed);
  if (engine.running) voiceCues(engine.plan[engine.idx], elapsed);
}

function render(phase, elapsed) {
  const remain = Math.max(0, phase.dur - elapsed);
  const shown = Math.ceil(remain - 0.0001);
  els.bigCount.textContent = String(Math.max(0, shown)).padStart(2, '0');

  // ring depletes
  const frac = phase.dur > 0 ? remain / phase.dur : 0;
  els.ring.style.strokeDashoffset = String(RING_LEN * (1 - frac));

  // totals
  const totalElapsed = engine.totalBefore + elapsed;
  els.elapsed.textContent = fmt(totalElapsed);
  els.remaining.textContent = fmt(Math.max(0, engine.grandTotal - totalElapsed));
  els.totalBar.style.width = (100 * totalElapsed / engine.grandTotal).toFixed(1) + '%';
}

function finishWorkout() {
  engine.running = false;
  stopLoops();
  cancelScheduledBeeps();
  engine.idx = engine.plan.length;
  timerEl.className = 'screen timer-screen done';
  els.phaseLabel.textContent = t('complete');
  els.roundInfo.textContent = t('wellDone');
  els.setInfo.textContent = '';
  els.bigCount.innerHTML = ICONS.check;
  els.nextUp.textContent = t('totalTime', { t: fmt(engine.grandTotal) });
  els.ring.style.strokeDashoffset = '0';
  els.elapsed.textContent = fmt(engine.grandTotal);
  els.remaining.textContent = '0:00';
  els.totalBar.style.width = '100%';
  els.playBtn.innerHTML = ICONS.reset;
  audio.chord([523, 659, 784, 1046], 0.6);
  say(t('vComplete'));
  vibrate([120, 60, 120, 60, 240]);
  video.stop();
  releaseWakeLock();
  recordHistory();
}

/* ---------- History ---------- */
function recordHistory() {
  const preset = recentId ? [...BUILTIN_PRESETS, ...presets].find(p => p.id === recentId) : null;
  const name = (preset && preset.name) || t('custom');
  history.unshift({ ts: Date.now(), name, dur: engine.grandTotal, cfg: { ...config, exercises: normalizeExercises(config.exercises) } });
  history = history.slice(0, 30);
  store.set('tt_history', history);
}
function relTime(ts) {
  const d = new Date(ts), now = new Date();
  if (d.toDateString() === now.toDateString()) return d.toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit' });
  return d.toLocaleDateString(lang, { month: 'short', day: 'numeric' });
}
function renderHistory() {
  els.clearHistoryBtn.hidden = history.length === 0;
  if (!history.length) { els.historyList.innerHTML = `<p class="history-empty">${escapeHtml(t('noHistory'))}</p>`; return; }
  els.historyList.innerHTML = '';
  history.slice(0, 10).forEach((h, i) => {
    const c = h.cfg || {};
    const item = document.createElement('button');
    item.className = 'history-item';
    const sub = `${c.work}s/${c.rest}s × ${c.rounds}${c.sets > 1 ? ` · ${c.sets}×${c.setRepeat || 1}` : ''} · ${fmt(h.dur || 0)}`;
    item.innerHTML = `<span class="h-main"><strong>${escapeHtml(h.name)}</strong><span class="h-sub">${escapeHtml(sub)}</span></span><span class="h-when">${escapeHtml(relTime(h.ts))}</span>`;
    item.addEventListener('click', () => repeatHistory(i));
    els.historyList.appendChild(item);
  });
}
function repeatHistory(i) {
  const h = history[i];
  if (!h) return;
  config = normalizeConfig(h.cfg);
  recentId = null; editMode = false; activeExSet = 0;
  store.set('tt_config', config); store.set('tt_recent', recentId);
  renderConfigInputs(); renderPresets();
  document.querySelector('.config-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function clearHistory() { history = []; store.set('tt_history', history); renderHistory(); }

/* ---------- Controls ---------- */
function togglePlay() {
  if (engine.idx >= engine.plan.length) { // finished → restart
    startWorkout(); return;
  }
  if (engine.running) pause(); else resume();
}
function pause() {
  engine.accrued = currentPhaseElapsed();
  engine.running = false;
  stopLoops();
  cancelScheduledBeeps();
  els.playBtn.innerHTML = ICONS.play;
  els.phaseLabel.textContent = t('paused');
  video.pause();
  releaseWakeLock();
}
function resume() {
  if (engine.idx >= engine.plan.length) return;
  engine.running = true;
  engine.phaseStart = performance.now();
  els.playBtn.innerHTML = ICONS.pause;
  paintPhase(engine.plan[engine.idx]);
  audio.unlock();
  scheduleAllCues(currentPlanTime());
  video.resume();
  requestWakeLock();
  startLoops();
}
function skip() {
  if (engine.idx >= engine.plan.length) return;
  const done = engine.plan[engine.idx];
  engine.totalBefore += done.dur;           // count full phase toward elapsed
  const next = engine.idx + 1;
  if (next >= engine.plan.length) { finishWorkout(); return; }
  const wasRunning = engine.running;
  enterPhase(next, false);
  cancelScheduledBeeps();
  if (wasRunning) scheduleAllCues(currentPlanTime());
  else { engine.running = false; render(engine.plan[next], 0); }
}

let resetArmed = false, resetTimer = null;
function reset() {
  if (!resetArmed) {                        // prevent accidental reset — arm first
    resetArmed = true;
    els.resetBtn.classList.add('confirm');
    els.resetBtn.innerHTML = ICONS.check;
    toast(t('tResetArm'));
    resetTimer = setTimeout(disarmReset, 2500);
    return;
  }
  disarmReset();
  hardStop();
  showSetup();
}
function disarmReset() {
  resetArmed = false;
  clearTimeout(resetTimer);
  els.resetBtn.classList.remove('confirm');
  els.resetBtn.innerHTML = ICONS.reset;
}
function hardStop() {
  engine.running = false;
  stopLoops();
  cancelScheduledBeeps();
  video.stop();
  releaseWakeLock();
}

/* ============================================================
   AUDIO — Web Audio, pre-scheduled cues survive backgrounding
   ============================================================ */
const audio = {
  ctx: null,
  master: null,
  unlocked: false,
  init() {
    if (this.ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.gain.value = cues.volume;
    this.master.connect(this.ctx.destination);
    // After an interruption (e.g. speech synthesis on mobile) the context
    // freezes; when it comes back, re-anchor the remaining cues to real time
    // so beeps stay in sync instead of being lost or drifting.
    this.ctx.onstatechange = () => {
      if (this.ctx.state === 'running' && engine.running && engine.interval) {
        scheduleAllCues(currentPlanTime());
      }
    };
  },
  unlock() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    if (!this.unlocked) {
      // play a silent blip to satisfy iOS gesture requirement
      const o = this.ctx.createOscillator(); const g = this.ctx.createGain();
      g.gain.value = 0.0001; o.connect(g); g.connect(this.ctx.destination);
      o.start(); o.stop(this.ctx.currentTime + 0.02);
      this.unlocked = true;
    }
  },
  setVolume(v) { cues.volume = v; if (this.master) this.master.gain.value = v; },
  // schedule a single tone at absolute AudioContext time
  toneAt(freq, when, dur = 0.15, type = 'sine', vol = 0.9) {
    if (!this.ctx) return null;
    const o = this.ctx.createOscillator(), g = this.ctx.createGain();
    o.type = type; o.frequency.value = freq;
    o.connect(g); g.connect(this.master);
    const t = Math.max(when, this.ctx.currentTime);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.start(t); o.stop(t + dur + 0.02);
    return o;
  },
  chord(freqs, dur = 0.4) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    freqs.forEach((f, i) => this.toneAt(f, now + i * 0.09, dur, 'sine', 0.6));
  },
};

/* Pre-schedule EVERY cue for the whole remaining workout on the Web Audio
   clock. Web Audio timing keeps running when the tab is backgrounded / the
   screen is locked, so beeps stay accurate even if JS timers are throttled.
   `fromPlanTime` is the plan offset (seconds) that maps to "now". */
function scheduleAllCues(fromPlanTime) {
  if (!audio.ctx) return;
  cancelScheduledBeeps();
  const anchor = audio.ctx.currentTime;
  const push = (o) => { if (o) engine.scheduledBeeps.push(o); };
  let planT = 0;

  for (let i = 0; i < engine.plan.length; i++) {
    const phase = engine.plan[i];
    const phaseStart = planT;
    const phaseEnd = planT + phase.dur;
    planT = phaseEnd;
    if (phaseEnd <= fromPlanTime + 0.01) continue; // already elapsed

    // 3-2-1 countdown beeps in final seconds of the interval
    if (cues.countdownOn) {
      for (let s = 3; s >= 1; s--) {
        const cueT = phaseEnd - s;
        if (cueT > phaseStart + 0.001 && cueT >= fromPlanTime) {
          push(audio.toneAt(880, anchor + (cueT - fromPlanTime), 0.12, 'triangle', 0.7));
        }
      }
    }
    // Transition tone at interval end — pitch encodes what comes next
    const next = engine.plan[i + 1];
    if (next) {
      const when = anchor + (phaseEnd - fromPlanTime);
      if (next.type === 'work') {          // rising double beep = go work
        push(audio.toneAt(660, when, 0.18, 'square', 0.8));
        push(audio.toneAt(990, when + 0.16, 0.22, 'square', 0.8));
      } else {                             // falling single tone = rest
        push(audio.toneAt(440, when, 0.28, 'sine', 0.8));
      }
    }
  }
}

function cancelScheduledBeeps() {
  engine.scheduledBeeps.forEach(o => { try { o.stop(); } catch {} });
  engine.scheduledBeeps = [];
}

/* ---------- Voice (SpeechSynthesis) ---------- */
let muted = false;
let speakSeq = 0;   // guards against a cancelled utterance's late onend un-ducking a newer one
function say(text) {
  if (muted || !cues.voiceOn || !('speechSynthesis' in window)) return;
  try {
    speechSynthesis.cancel();               // flush any lingering utterance first
    const mySeq = ++speakSeq;
    video.duck();                           // MUTE the video now (before speech) to free the audio session
    const u = new SpeechSynthesisUtterance(text);
    u.lang = VOICE_LANG[lang] || 'en-US';
    u.volume = Math.min(1, cues.volume + 0.1); u.rate = 1.05;
    // Restore the video and recover the beeps once THIS announcement finishes
    // (a superseded one's late onend is ignored). duck() also has a fail-safe timer.
    u.onend = u.onerror = () => {
      if (mySeq !== speakSeq) return;
      if (audio.ctx && audio.ctx.state !== 'running' && engine.running) audio.ctx.resume();
      video.unduck();
      video.kick();
    };
    // Start speaking a beat after muting so the video is already silent — this
    // stops iOS from cutting off the announcement or pausing the video.
    setTimeout(() => { if (mySeq === speakSeq) { try { speechSynthesis.speak(u); } catch {} } }, 160);
  } catch {}
}
function announcePhase(phase, firstEnter) {
  let text;
  if (phase.type === 'work') {
    const isLastRound = phase.round === config.rounds && config.rounds > 1;
    const ex = exerciseFor(phase);
    if (ex) text = isLastRound ? `${t('vLastRound')}. ${ex}` : ex;
    else text = isLastRound ? `${t('vLastRound')}. ${t('work')}` : `${t('work')}. ${t('vRoundN', { n: phase.round })}`;
  } else if (phase.type === 'rest') {
    text = t('rest');
  } else if (phase.type === 'restSet') {
    text = t('vSetComplete');
  } else if (phase.type === 'prepare') {
    text = firstEnter ? t('vGetReady') : t('prepare');
  } else {
    text = phaseName(phase.type);
  }
  say(text);
}

/* ---------- Vibration ---------- */
function vibrate(pattern) {
  if (cues.vibrateOn && navigator.vibrate) { try { navigator.vibrate(pattern); } catch {} }
}
function vibrateFor(phase) {
  if (phase.type === 'work') vibrate([200]);
  else if (phase.type === 'rest' || phase.type === 'restSet') vibrate([80, 60, 80]);
  else vibrate([120]);
}

/* ============================================================
   WAKE LOCK
   ============================================================ */
let wakeLock = null;
async function requestWakeLock() {
  if (!cues.wakeOn || !('wakeLock' in navigator)) return;
  try { wakeLock = await navigator.wakeLock.request('screen'); }
  catch { wakeLock = null; }
}
function releaseWakeLock() {
  if (wakeLock) { try { wakeLock.release(); } catch {} wakeLock = null; }
}
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    if (engine.running) { requestWakeLock(); if (audio.ctx && audio.ctx.state === 'suspended') audio.ctx.resume(); }
  }
});

/* ============================================================
   RENDERING / PAINT
   ============================================================ */
function exerciseFor(phase) {
  if (!config.exercisesOn || phase.type !== 'work' || !phase.round) return '';
  const set = config.exercises[(phase.set || 1) - 1];
  return ((set && set[phase.round - 1]) || '').trim();
}

function paintPhase(phase) {
  timerEl.className = 'screen timer-screen ' + phase.type;
  if (!els.ytBg.hidden) timerEl.classList.add('has-video');   // survive phase re-paints
  els.phaseLabel.textContent = phaseName(phase.type);

  const ex = exerciseFor(phase);
  els.exerciseName.textContent = ex;
  els.exerciseName.hidden = !ex;

  if (phase.round) {
    els.roundInfo.textContent = t('roundOf', { r: phase.round, n: config.rounds });
  } else {
    els.roundInfo.textContent = phaseName(phase.type);
  }
  const parts = [];
  if (config.sets > 1 && phase.set) parts.push(t('setOf', { s: phase.set, n: config.sets }));
  if (config.setRepeat > 1 && phase.rep) parts.push(t('repOf', { r: phase.rep, n: config.setRepeat }));
  els.setInfo.textContent = parts.join(' · ');
  const next = engine.plan[engine.idx + 1];
  els.nextUp.textContent = t('next', { x: next ? (exerciseFor(next) || phaseName(next.type)) : t('finish') });
}

function flashScreen() {
  timerEl.classList.add('flash');
  setTimeout(() => timerEl.classList.remove('flash'), 420);
}

function fmt(sec) {
  sec = Math.max(0, Math.round(sec));
  const m = Math.floor(sec / 60), s = sec % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

/* ============================================================
   SETUP SCREEN WIRING
   ============================================================ */
function renderConfigInputs() {
  document.querySelectorAll('.stepper').forEach(st => {
    const key = st.dataset.key;
    st.querySelector('input').value = config[key];
  });
  syncCueInputs();
  renderExerciseList();
  updateSummary();
}

let activeExSet = 0;   // which set's exercises are being edited (UI state)

// Ensure exercises has one sub-array per set (grow only — never drop names
// a user typed if they temporarily lower the set/round count).
function ensureExercisesShape() {
  if (!Array.isArray(config.exercises)) config.exercises = [];
  for (let s = 0; s < config.sets; s++) {
    if (!Array.isArray(config.exercises[s])) config.exercises[s] = [];
  }
}

function renderExerciseList() {
  els.exercisesOn.checked = config.exercisesOn;
  els.exerciseList.hidden = !config.exercisesOn;
  els.exercisesHint.hidden = config.exercisesOn;
  els.exerciseTabs.hidden = !config.exercisesOn || config.sets <= 1;
  els.exActions.hidden = !config.exercisesOn;
  els.copySetsBtn.hidden = !config.exercisesOn || config.sets <= 1;
  if (!config.exercisesOn) return;

  ensureExercisesShape();
  activeExSet = Math.min(Math.max(0, activeExSet), config.sets - 1);
  els.copySetsBtn.innerHTML = ICONS.copy + '<span>' + escapeHtml(t('copySetToAll', { n: activeExSet + 1 })) + '</span>';
  renderExerciseTabs();
  renderExerciseInputs();
}

// Set-switcher tabs (only shown when there's more than one set).
function renderExerciseTabs() {
  els.exerciseTabs.innerHTML = '';
  if (config.sets <= 1) return;
  for (let s = 1; s <= config.sets; s++) {
    const tab = document.createElement('button');
    tab.className = 'ex-tab' + (s - 1 === activeExSet ? ' active' : '');
    tab.textContent = t('setTab', { n: s });
    tab.addEventListener('click', () => { activeExSet = s - 1; renderExerciseList(); });
    els.exerciseTabs.appendChild(tab);
  }
}

// One text field per round, bound to the currently-selected set.
function renderExerciseInputs() {
  ensureExercisesShape();
  const setArr = config.exercises[activeExSet];
  els.exerciseList.innerHTML = '';
  for (let r = 1; r <= config.rounds; r++) {
    const item = document.createElement('div');
    item.className = 'exercise-item';
    const num = document.createElement('span');
    num.className = 'ex-num';
    num.textContent = t('roundLabel', { n: r });
    const input = document.createElement('input');
    input.type = 'text';
    input.maxLength = 40;
    input.placeholder = 'e.g. Push-ups';
    input.setAttribute('list', 'exerciseOptions');
    input.value = setArr[r - 1] || '';
    input.addEventListener('input', () => {
      setArr[r - 1] = input.value;
      store.set('tt_config', config);
      configChanged();
    });
    item.append(num, input);
    els.exerciseList.appendChild(item);
  }
}

// Copy the active set's round names onto every other set.
function copySetToAll() {
  ensureExercisesShape();
  const source = (config.exercises[activeExSet] || []).slice();
  for (let s = 0; s < config.sets; s++) {
    if (s !== activeExSet) config.exercises[s] = source.slice();
  }
  store.set('tt_config', config);
  configChanged();
  toast(t('tCopiedSet', { n: activeExSet + 1 }));
}

// Randomize the order of the active set's exercise names (Fisher–Yates).
function shuffleExercises() {
  ensureExercisesShape();
  const arr = config.exercises[activeExSet];
  const n = config.rounds;
  for (let r = 0; r < n; r++) if (arr[r] == null) arr[r] = '';
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  store.set('tt_config', config);
  configChanged();
  renderExerciseInputs();
}

// The Web Vibration API is absent on iOS (WebKit) — there's no way to vibrate
// from a web page there, so surface it as unsupported rather than a dead toggle.
const VIBRATION_SUPPORTED = typeof navigator.vibrate === 'function';

function syncCueInputs() {
  els.volume.value = cues.volume;
  els.voiceOn.checked = cues.voiceOn;
  els.countdownOn.checked = cues.countdownOn;
  els.spokenCountdownOn.checked = cues.spokenCountdownOn;
  els.halfwayOn.checked = cues.halfwayOn;
  els.vibrateOn.checked = VIBRATION_SUPPORTED && cues.vibrateOn;
  els.wakeOn.checked = cues.wakeOn;
  if (!VIBRATION_SUPPORTED) {
    els.vibrateOn.disabled = true;
    els.vibrateRow.classList.add('unsupported');
    els.vibrateNote.hidden = false;
  }
}

function updateSummary() {
  const tt = planTotals(buildPlan(config));
  els.sumTotal.textContent = fmt(tt.total);
  els.sumRounds.textContent = tt.workCount;
  els.sumWork.textContent = fmt(tt.work);
  store.set('tt_config', config);
  renderAdvanced();
}

// Show/hide the advanced workout fields (Sets, Set repeat, Rest-between-sets,
// Warmup, Cooldown). Force them open when any is in use.
let configExpanded = false;
function renderAdvanced() {
  // Collapsible fields are Prepare / Warmup / Cooldown — open them if any is non-default.
  const forceOpen = config.prepare !== DEFAULT_CONFIG.prepare || config.warmup > 0 || config.cooldown > 0;
  const open = configExpanded || forceOpen;
  els.workoutGrid.classList.toggle('collapsed', !open);    // hides .adv fields, rest flow continuously
  els.configMore.hidden = forceOpen;                       // can't collapse while advanced fields are in use
  els.configMore.textContent = open ? t('showLess') : t('showMore');
}

function wireSteppers() {
  document.querySelectorAll('.stepper').forEach(st => {
    const key = st.dataset.key;
    const input = st.querySelector('input');
    const min = Number(input.min), max = Number(input.max), step = Number(input.step) || 1;
    const clamp = v => Math.max(min, Math.min(max, v));
    const commit = v => {
      config[key] = clamp(v); input.value = config[key]; updateSummary();
      if (key === 'rounds' || key === 'sets') renderExerciseList();  // resize round fields / set tabs
      configChanged();
    };
    st.querySelector('.dec').addEventListener('click', () => commit((Number(input.value) || 0) - step));
    st.querySelector('.inc').addEventListener('click', () => commit((Number(input.value) || 0) + step));
    input.addEventListener('change', () => commit(Number(input.value) || min));
  });
}

function renderPresets() {
  const all = [...presets, ...BUILTIN_PRESETS];   // user presets first (newest on top)
  els.presetList.innerHTML = '';
  all.forEach(p => {
    const c = p.config;
    const chip = document.createElement('button');
    chip.className = 'preset-chip' + (p.id === recentId ? ' active' : '') + (p.id === recentId && editMode ? ' editing' : '') + (!p.builtin ? ' has-actions' : '');
    chip.innerHTML = `<strong>${escapeHtml(p.name)}</strong><span>${c.work}s/${c.rest}s × ${c.rounds}${c.sets > 1 ? ` · ${c.sets} ${escapeHtml(t('sets'))}` : ''}</span>`;
    chip.addEventListener('click', () => applyPreset(p));
    if (!p.builtin) {
      const edit = document.createElement('button');
      edit.className = 'edit'; edit.innerHTML = ICONS.edit; edit.title = 'Edit preset';
      edit.addEventListener('click', (e) => { e.stopPropagation(); startEditPreset(p); });
      const del = document.createElement('button');
      del.className = 'del'; del.innerHTML = ICONS.trash; del.title = 'Delete preset';
      del.addEventListener('click', (e) => { e.stopPropagation(); deletePreset(p.id); });
      chip.append(edit, del);
    }
    els.presetList.appendChild(chip);
  });

  // Show-more: reveal only the first 3 until expanded. Auto-expand if the
  // selected preset (or an editor) would otherwise be hidden.
  const LIMIT = 6;
  const activeIdx = all.findIndex(p => p.id === recentId);
  if (editMode || activeIdx >= LIMIT) presetsExpanded = true;
  const canCollapse = all.length > LIMIT;
  els.presetsMore.hidden = !canCollapse;
  els.presetList.classList.toggle('collapsed', canCollapse && !presetsExpanded);
  els.presetsMore.textContent = presetsExpanded ? t('showLess') : `${t('showMore')} (${all.length - LIMIT})`;

  // Edit toolbar
  const editing = editMode ? all.find(p => p.id === recentId) : null;
  els.editBar.hidden = !editing;
  if (editing) els.editBarLabel.textContent = t('editingName', { name: editing.name });
}
let presetsExpanded = false;

// Any workout/exercise edit breaks the link to the selected preset — unless
// we're deliberately editing that preset (then it stays selected until saved).
function configChanged() {
  if (editMode) return;
  if (recentId !== null) { recentId = null; store.set('tt_recent', recentId); renderPresets(); }
}

function applyPreset(p) {
  editMode = false;
  config = normalizeConfig(p.config);
  activeExSet = 0;
  recentId = p.id;
  store.set('tt_recent', recentId);
  store.set('tt_config', config);
  renderConfigInputs();
  renderPresets();
}

function startEditPreset(p) {
  editMode = true;
  config = normalizeConfig(p.config);
  activeExSet = 0;
  recentId = p.id;
  store.set('tt_config', config);
  renderConfigInputs();
  renderPresets();
  toast(t('tEditing'));
}
function saveEdit() {
  const p = presets.find(x => x.id === recentId);
  if (p) {
    p.config = { ...config, exercises: normalizeExercises(config.exercises) };
    store.set('tt_presets', presets);
  }
  editMode = false;
  renderPresets();
  toast(t('tUpdated'));
}
function cancelEdit() {
  const p = presets.find(x => x.id === recentId);
  editMode = false;
  if (p) applyPreset(p);        // revert working config to the saved preset
  else { renderPresets(); }
}

function deletePreset(id) {
  presets = presets.filter(p => p.id !== id);
  store.set('tt_presets', presets);
  if (recentId === id) { recentId = null; store.set('tt_recent', recentId); editMode = false; }
  renderPresets();
  toast(t('tDeleted'));
}

function openSaveModal() {
  els.presetName.value = '';
  els.modal.hidden = false;
  setTimeout(() => els.presetName.focus(), 50);
}
function savePreset() {
  const name = els.presetName.value.trim();
  if (!name) { els.presetName.focus(); return; }
  const id = 'u_' + Date.now();
  presets.unshift({ id, name, config: { ...config, exercises: normalizeExercises(config.exercises) } });   // newest first
  store.set('tt_presets', presets);
  editMode = false;
  recentId = id;
  store.set('tt_recent', recentId);
  els.modal.hidden = true;
  renderPresets();
  toast(t('tSaved'));
}

function toggleMute() {
  muted = !muted;
  els.muteBtn.innerHTML = muted ? ICONS.mute : ICONS.volume;
  if (muted) { audio.setVolume(0); speechSynthesis?.cancel(); video.mute(); }
  else { audio.setVolume(cues.volume); video.unmute(); }
}

/* ---------- Screen switching ---------- */
function showTimer() {
  setupEl.hidden = true; timerEl.hidden = false;
  els.playBtn.innerHTML = ICONS.pause; muted = false; els.muteBtn.innerHTML = ICONS.volume;
  audio.setVolume(cues.volume);
  setTimeout(() => els.playBtn.focus(), 0);   // keyboard/TV: primary control focused
}
function showSetup() { timerEl.hidden = true; setupEl.hidden = false; renderPresets(); renderHistory(); }

/* ---------- Toast ---------- */
let toastTimer;
function toast(msg) {
  els.toast.textContent = msg; els.toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => els.toast.hidden = true, 2200);
}

function escapeHtml(s) { return s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

/* ============================================================
   BACKGROUND VIDEO — optional looping YouTube behind the timer.
   Requires network (it streams); the timer itself stays offline-capable.
   Uses the YouTube IFrame API so we can control volume, loop and mute.
   ============================================================ */
const video = {
  id: null,
  volume: 50,
  player: null,
  apiRequested: false,
  ready: false,
  wantPlay: false,   // set when Start was pressed before the player was ready
  userPaused: false, // true only when the workout itself is paused (vs. an audio-session interruption)
  duckTimer: null,   // safety timer so the video never stays ducked if speech never ends
  loopTimer: null,   // polls to re-loop before the end screen (recommended videos) can appear

  // Pull the 11-char video id out of the common YouTube URL shapes.
  parseId(url) {
    if (!url) return null;
    const m = String(url).match(/(?:youtu\.be\/|v=|\/embed\/|\/shorts\/|\/live\/)([A-Za-z0-9_-]{11})/);
    if (m) return m[1];
    const bare = String(url).trim();
    return /^[A-Za-z0-9_-]{11}$/.test(bare) ? bare : null;
  },

  setUrl(url) {
    this.id = this.parseId(url);
    store.set('tt_video', { url, volume: this.volume });
    this.updateStatus();
    if (this.id) this.loadApi();
  },

  // Reflect the current URL/id in the status line (re-derivable on language change).
  updateStatus() {
    const url = els.videoUrl.value || '';
    if (!url.trim()) { els.videoStatus.textContent = t('videoHint'); els.videoStatus.className = 'hint'; }
    else if (this.parseId(url)) { els.videoStatus.textContent = t('videoReady'); els.videoStatus.className = 'hint ok'; }
    else { els.videoStatus.textContent = t('videoInvalid'); els.videoStatus.className = 'hint err'; }
  },

  setVolume(v) {
    this.volume = v;
    store.set('tt_video', { url: els.videoUrl.value, volume: v });
    if (this.player && this.ready) {
      this.player.setVolume(v);
      if (v === 0) this.player.mute(); else this.player.unMute();
    }
  },

  loadApi() {
    if (this.apiRequested || (window.YT && window.YT.Player)) return;
    this.apiRequested = true;
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
  },

  ensurePlayer() {
    if (!this.id || !window.YT || !window.YT.Player) return;
    if (this.player) { this.player.loadVideoById(this.id); return; }
    this.player = new YT.Player('ytPlayer', {
      videoId: this.id,
      playerVars: {
        autoplay: 0, controls: 0, disablekb: 1, fs: 0, modestbranding: 1, playsinline: 1,
        rel: 0,                 // limit related videos to the same channel (can't be fully removed)
        loop: 1, playlist: this.id,
        iv_load_policy: 3,      // hide video annotations
        cc_load_policy: 0,      // no captions by default
        showinfo: 0,            // legacy: hide title/uploader (ignored by newer players, harmless)
      },
      events: {
        onReady: () => {
          this.ready = true;
          this.player.setVolume(this.volume);
          if (this.volume === 0) this.player.mute();
          this.hideCaptions();
          if (this.wantPlay) { this.wantPlay = false; this.player.playVideo(); }
        },
        onStateChange: (e) => {
          if (e.data === YT.PlayerState.PLAYING) this.hideCaptions();  // captions load with playback
          if (e.data === YT.PlayerState.ENDED) { this.player.seekTo(0); this.player.playVideo(); }
          // If something else paused us (e.g. a speech-synthesis interruption on
          // mobile) while the workout is still running, resume automatically.
          else if (e.data === YT.PlayerState.PAUSED && engine.running && !this.userPaused) {
            this.player.playVideo();
          }
        },
        onApiChange: () => this.hideCaptions(),   // fires when the captions module loads
      },
    });
  },

  start() {
    if (!this.id) return;
    this.userPaused = false;
    els.ytBg.hidden = false; els.ytScrim.hidden = false;
    timerEl.classList.add('has-video');
    if (this.player && this.ready) { this.player.setVolume(this.volume); this.player.playVideo(); }
    else { this.wantPlay = true; this.ensurePlayer(); }
    clearInterval(this.loopTimer);
    this.loopTimer = setInterval(() => this.maintainLoop(), 500);
  },

  // Re-loop shortly before the video ends so YouTube's end screen
  // (recommended videos / subscribe card) never gets a chance to render.
  maintainLoop() {
    if (!this.player || !this.ready) return;
    try {
      if (this.player.getPlayerState() !== YT.PlayerState.PLAYING) return;
      const d = this.player.getDuration(), c = this.player.getCurrentTime();
      if (d > 2 && d - c < 1.2) this.player.seekTo(0, true);
    } catch {}
  },
  pause()  { this.userPaused = true; if (this.player && this.ready) try { this.player.pauseVideo(); } catch {} },
  resume() { this.userPaused = false; if (this.id && this.player && this.ready) try { this.player.playVideo(); } catch {} else if (this.id) this.start(); },
  stop() {
    this.wantPlay = false; this.userPaused = false;
    clearInterval(this.loopTimer); this.loopTimer = null;
    clearTimeout(this.duckTimer);
    if (this.player && this.ready) try { this.player.stopVideo(); } catch {}
    els.ytBg.hidden = true; els.ytScrim.hidden = true;
    timerEl.classList.remove('has-video');
  },
  // Nudge playback back after an interruption (called when speech ends).
  kick() {
    if (!this.id || !this.player || !this.ready || !engine.running || this.userPaused) return;
    try { if (this.player.getPlayerState() !== YT.PlayerState.PLAYING) this.player.playVideo(); } catch {}
  },
  // Fully mute the video while a voice announcement plays. Ducking to a low
  // volume isn't enough on iOS — a still-audible video keeps the audio session,
  // which cuts off speech and pauses playback. A muted element releases it.
  duck() {
    if (!this.player || !this.ready) return;
    clearTimeout(this.duckTimer);
    try { this.player.mute(); } catch {}
    this.duckTimer = setTimeout(() => this.unduck(), 6000);   // fail-safe restore
  },
  unduck() {
    clearTimeout(this.duckTimer);
    if (!this.player || !this.ready) return;
    if (muted || this.volume === 0) return;   // respect a global mute / silent video
    try { this.player.unMute(); } catch {}
  },
  mute()   { if (this.player && this.ready) try { this.player.mute(); } catch {} },
  unmute() { if (this.player && this.ready && this.volume > 0) try { this.player.unMute(); } catch {} },
  // Force closed captions off. cc_load_policy only controls the default; unloading
  // the caption module is the reliable way to disable a user's forced/auto captions.
  hideCaptions() {
    if (!this.player) return;
    try { this.player.unloadModule('captions'); } catch {}
    try { this.player.unloadModule('cc'); } catch {}
  },
};

// The IFrame API calls this global once it finishes loading.
window.onYouTubeIframeAPIReady = () => { video.ready = false; video.ensurePlayer(); };

/* ============================================================
   SHARE — encode the current settings into a URL and back
   ============================================================ */
const b64urlEncode = (str) => btoa(unescape(encodeURIComponent(str))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const b64urlDecode = (b64) => decodeURIComponent(escape(atob(b64.replace(/-/g, '+').replace(/_/g, '/'))));

function buildShareUrl(includeExtras) {
  const c = config;
  const payload = {
    p: c.prepare, w: c.work, r: c.rest, ro: c.rounds, s: c.sets, srp: c.setRepeat,
    rs: c.restSet, wu: c.warmup, cd: c.cooldown,
    eo: c.exercisesOn ? 1 : 0,
    ex: c.exercisesOn ? c.exercises : [],
  };
  if (includeExtras) {
    payload.cu = { vol: cues.volume, vo: cues.voiceOn ? 1 : 0, co: cues.countdownOn ? 1 : 0, sc: cues.spokenCountdownOn ? 1 : 0, hw: cues.halfwayOn ? 1 : 0, vi: cues.vibrateOn ? 1 : 0, wa: cues.wakeOn ? 1 : 0 };
    payload.vd = { u: (els.videoUrl.value || '').trim(), vv: video.volume };
  }
  return `${location.origin}${location.pathname}?w=${b64urlEncode(JSON.stringify(payload))}`;
}

// Render a QR code for `text` as an inline SVG (dark modules on the white .qr-box).
function renderQR(text) {
  els.qrBox.innerHTML = '';
  try {
    const qr = qrcode(0, 'M');          // type 0 = auto-size, medium error correction
    qr.addData(text);
    qr.make();
    const n = qr.getModuleCount();
    let path = '';
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (qr.isDark(r, c)) path += `M${c} ${r}h1v1h-1z`;
      }
    }
    els.qrBox.innerHTML =
      `<svg viewBox="0 0 ${n} ${n}" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg">` +
      `<path fill="#0b1020" d="${path}"/></svg>`;
  } catch {
    els.qrBox.textContent = t('qrTooLong');
    els.qrBox.style.color = '#0b1020';
  }
}

function refreshShareModal() {
  const url = buildShareUrl(els.shareExtras.checked);
  els.shareUrlField.value = url;
  renderQR(url);
}
function openShareModal() {
  refreshShareModal();
  els.shareModal.hidden = false;
  setTimeout(() => els.copyUrlBtn.focus(), 50);   // move focus into the modal
}

async function copyShareUrl() {
  const url = els.shareUrlField.value;
  try {
    await navigator.clipboard.writeText(url);
    toast(t('tLinkCopied'));
  } catch {
    els.shareUrlField.select();
    try { document.execCommand('copy'); toast(t('tLinkCopiedShort')); }
    catch { toast(t('tSelectCopy')); }
  }
}

// Read ?w=… on load; returns true if settings were applied.
function applySharedConfigFromUrl() {
  const w = new URLSearchParams(location.search).get('w');
  if (!w) return false;
  try {
    const d = JSON.parse(b64urlDecode(w));
    const clampNum = (v, def, min, max) => { const n = Math.round(+v); return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : def; };
    const ex = (Array.isArray(d.ex) ? d.ex : []).slice(0, 50)
      .map(a => (Array.isArray(a) ? a.slice(0, 99).map(x => String(x).slice(0, 40)) : []));
    config = normalizeConfig({
      prepare: clampNum(d.p, 10, 0, 60), work: clampNum(d.w, 20, 1, 600), rest: clampNum(d.r, 10, 0, 600),
      rounds: clampNum(d.ro, 8, 1, 99), sets: clampNum(d.s, 1, 1, 50), setRepeat: clampNum(d.srp, 1, 1, 20), restSet: clampNum(d.rs, 60, 0, 900),
      warmup: clampNum(d.wu, 0, 0, 900), cooldown: clampNum(d.cd, 0, 0, 900),
      exercisesOn: !!d.eo, exercises: ex,
    });
    recentId = null; editMode = false;
    store.set('tt_config', config);
    store.set('tt_recent', recentId);

    // Optional extras: cue settings and background video
    if (d.cu && typeof d.cu === 'object') {
      cues = {
        ...DEFAULT_CUES,
        volume: Number.isFinite(+d.cu.vol) ? Math.min(1, Math.max(0, +d.cu.vol)) : DEFAULT_CUES.volume,
        voiceOn: !!d.cu.vo, countdownOn: !!d.cu.co, vibrateOn: !!d.cu.vi, wakeOn: !!d.cu.wa,
        spokenCountdownOn: !!d.cu.sc, halfwayOn: 'hw' in d.cu ? !!d.cu.hw : DEFAULT_CUES.halfwayOn,
      };
      store.set('tt_cues', cues);
    }
    if (d.vd && typeof d.vd === 'object') {
      store.set('tt_video', {
        url: typeof d.vd.u === 'string' ? d.vd.u.slice(0, 200) : '',
        volume: clampNum(d.vd.vv, 50, 0, 100),
      });
    }

    history.replaceState(null, '', location.pathname);   // clean the URL so later edits/reloads take over
    return true;
  } catch { return false; }
}

/* ============================================================
   EVENT WIRING
   ============================================================ */
els.startBtn.addEventListener('click', startWorkout);
els.savePresetBtn.addEventListener('click', openSaveModal);
els.modalOk.addEventListener('click', savePreset);
els.modalCancel.addEventListener('click', () => els.modal.hidden = true);
els.presetName.addEventListener('keydown', e => { if (e.key === 'Enter') savePreset(); });

els.exercisesOn.addEventListener('change', () => {
  config.exercisesOn = els.exercisesOn.checked;
  store.set('tt_config', config);
  renderExerciseList();
  configChanged();
});
els.copySetsBtn.addEventListener('click', copySetToAll);
els.shareBtn.addEventListener('click', openShareModal);
els.copyUrlBtn.addEventListener('click', copyShareUrl);
els.shareExtras.addEventListener('change', refreshShareModal);
els.shareClose.addEventListener('click', () => els.shareModal.hidden = true);
els.shareModal.addEventListener('click', (e) => { if (e.target === els.shareModal) els.shareModal.hidden = true; });
els.editSave.addEventListener('click', saveEdit);
els.editCancel.addEventListener('click', cancelEdit);

// Background video
els.videoUrl.addEventListener('input', () => video.setUrl(els.videoUrl.value));
els.videoVolume.addEventListener('input', () => video.setVolume(Number(els.videoVolume.value)));

els.playBtn.addEventListener('click', () => { audio.unlock(); togglePlay(); });
els.skipBtn.addEventListener('click', () => { audio.unlock(); skip(); });
els.resetBtn.addEventListener('click', reset);
els.backBtn.addEventListener('click', () => { hardStop(); showSetup(); });
els.muteBtn.addEventListener('click', toggleMute);

els.volume.addEventListener('input', e => { cues.volume = Number(e.target.value); audio.setVolume(cues.volume); store.set('tt_cues', cues); });
[['voiceOn', els.voiceOn], ['countdownOn', els.countdownOn], ['spokenCountdownOn', els.spokenCountdownOn],
 ['halfwayOn', els.halfwayOn], ['vibrateOn', els.vibrateOn], ['wakeOn', els.wakeOn]]
  .forEach(([key, el]) => el.addEventListener('change', () => {
    cues[key] = el.checked; store.set('tt_cues', cues);
    if (key === 'vibrateOn' && el.checked) vibrate(30);
  }));

/* ============================================================
   KEYBOARD & TV-REMOTE NAVIGATION
   - Action shortcuts (Space/N/R/M/Esc on timer; S and 1-3 on setup)
   - Arrow keys move focus between controls (D-pad friendly), while
     sliders/selects/number steppers keep their native arrow behavior.
   - Enter/OK activates the focused control natively.
   ============================================================ */
const ARROWS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
function focusList() {
  const scope = timerEl.hidden ? setupEl : timerEl;
  return [...scope.querySelectorAll('a[href], button, input, select, [tabindex]')]
    .filter(el => !el.disabled && el.tabIndex >= 0 && el.getClientRects().length > 0);
}
// Reveal the discreet shortcut hints once the user actually uses a keyboard/remote.
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab' || ARROWS.includes(e.key)) document.body.classList.add('using-keyboard');
}, true);

document.addEventListener('keydown', (e) => {
  if (openModalEl()) return;                 // modal has its own Esc/Tab handling
  const el = document.activeElement;
  const key = e.key;

  if (!timerEl.hidden) {
    // Timer screen action shortcuts
    if (key === ' ' || key === 'k' || key === 'K') { e.preventDefault(); togglePlay(); return; }
    if (key === 'n' || key === 'N') { e.preventDefault(); skip(); return; }
    if (key === 'r' || key === 'R') { e.preventDefault(); reset(); return; }
    if (key === 'm' || key === 'M') { e.preventDefault(); toggleMute(); return; }
    if (key === 'Escape') { e.preventDefault(); hardStop(); showSetup(); return; }
  } else {
    // Setup screen shortcuts
    const typing = el && ((el.tagName === 'INPUT' && el.type !== 'range') || el.tagName === 'SELECT' || el.tagName === 'TEXTAREA');
    if (!typing) {
      if (key === 's' || key === 'S') { e.preventDefault(); startWorkout(); return; }
      if (key === '1') { switchTab('workout', true); return; }
      if (key === '2') { switchTab('history', true); return; }
      if (key === '3') { switchTab('settings', true); return; }
    }
  }

  // Arrow-key focus navigation (skip controls that use arrows natively)
  if (ARROWS.includes(key)) {
    if (el) {
      if (el.type === 'range') return;                                              // sliders adjust value
      if (el.tagName === 'SELECT') return;                                          // selects open/change
      if (el.tagName === 'INPUT' && el.type === 'number' && (key === 'ArrowUp' || key === 'ArrowDown')) return; // steppers adjust value
      if (el.classList.contains('tab') && (key === 'ArrowLeft' || key === 'ArrowRight')) return;                // tab switcher
    }
    const list = focusList();
    const i = list.indexOf(el);
    const fwd = key === 'ArrowDown' || key === 'ArrowRight';
    const nextEl = i === -1 ? list[0] : list[(i + (fwd ? 1 : -1) + list.length) % list.length];
    if (nextEl) { nextEl.focus(); e.preventDefault(); }
  }
});

// PWA install prompt
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault(); deferredPrompt = e; els.installBtn.hidden = false;
});
els.installBtn.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null; els.installBtn.hidden = true;
});

// Populate the exercise <datalist>, sorted alphabetically (case-insensitive).
function buildExerciseDatalist() {
  const dl = document.getElementById('exerciseOptions');
  if (!dl) return;
  const sorted = [...EXERCISE_SUGGESTIONS].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
  dl.innerHTML = sorted.map(name => `<option value="${escapeHtml(name)}"></option>`).join('');
}

/* ---------- Language ---------- */
function buildLangSelect() {
  els.langSelect.innerHTML = LANGS.map(l => `<option value="${l.code}">${l.name}</option>`).join('');
  els.langSelect.value = lang;
}

// Re-translate all static text + dynamic UI and set document direction.
function applyTranslations() {
  document.documentElement.lang = lang;
  document.documentElement.dir = RTL_LANGS.includes(lang) ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n) + (el.dataset.unit ? ` (${t(el.dataset.unit)})` : '');
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
  els.langSelect.value = lang;
  renderPresets();
  renderExerciseList();
  renderHistory();
  renderAdvanced();
  video.updateStatus();
  if (!timerEl.hidden && engine.plan[engine.idx]) paintPhase(engine.plan[engine.idx]);
}

function setLang(code) {
  lang = code;
  store.set('tt_lang', code);
  applyTranslations();
}
els.langSelect.addEventListener('change', () => setLang(els.langSelect.value));

/* ---------- Theme & accent ---------- */
const ACCENTS = [
  { a: '#6ea8fe', b: '#5b7cff' }, { a: '#24d18a', b: '#12b47a' }, { a: '#ff9f43', b: '#ff7043' },
  { a: '#ff6b9d', b: '#e84393' }, { a: '#a78bfa', b: '#7c5cff' },
];
let theme = store.get('tt_theme', 'auto');
let accentIdx = Math.min(Math.max(0, store.get('tt_accent', 0)), ACCENTS.length - 1);
const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)');

function applyTheme() {
  const resolved = theme === 'auto' ? (prefersLight && prefersLight.matches ? 'light' : 'dark') : theme;
  document.documentElement.dataset.theme = resolved;
  const ac = ACCENTS[accentIdx];
  document.documentElement.style.setProperty('--accent', ac.a);
  document.documentElement.style.setProperty('--accent-2', ac.b);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', resolved === 'light' ? '#eaeef6' : '#0b1020');
  els.themeSelect.value = theme;
}
function buildAccentSwatches() {
  els.accentSwatches.innerHTML = '';
  ACCENTS.forEach((ac, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.style.background = `linear-gradient(135deg, ${ac.a}, ${ac.b})`;
    b.className = i === accentIdx ? 'active' : '';
    b.setAttribute('aria-label', 'Accent ' + (i + 1));
    b.addEventListener('click', () => { accentIdx = i; store.set('tt_accent', i); applyTheme(); buildAccentSwatches(); });
    els.accentSwatches.appendChild(b);
  });
}
els.themeSelect.addEventListener('change', () => { theme = els.themeSelect.value; store.set('tt_theme', theme); applyTheme(); });
if (prefersLight && prefersLight.addEventListener) prefersLight.addEventListener('change', () => { if (theme === 'auto') applyTheme(); });

/* ---------- Backup / restore ---------- */
const BACKUP_KEYS = ['tt_config', 'tt_cues', 'tt_presets', 'tt_recent', 'tt_video', 'tt_history', 'tt_lang', 'tt_theme', 'tt_accent'];
function exportData() {
  const data = {};
  BACKUP_KEYS.forEach(k => { const v = localStorage.getItem(k); if (v !== null) data[k] = v; });
  const blob = new Blob([JSON.stringify({ app: 'tabata-timer', v: 1, data }, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'tabata-timer-backup.json';
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function importData(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      const data = parsed && parsed.data ? parsed.data : parsed;
      let n = 0;
      Object.keys(data).forEach(k => { if (k.startsWith('tt_') && typeof data[k] === 'string') { localStorage.setItem(k, data[k]); n++; } });
      if (n) location.reload();
    } catch { toast('Import failed'); }
  };
  reader.readAsText(file);
}
els.exportBtn.addEventListener('click', exportData);
els.importBtn.addEventListener('click', () => els.importFile.click());
els.importFile.addEventListener('change', (e) => { if (e.target.files[0]) importData(e.target.files[0]); });

/* ---------- Shuffle, history, update-banner wiring ---------- */
els.shuffleBtn.addEventListener('click', shuffleExercises);
els.clearHistoryBtn.addEventListener('click', clearHistory);
els.refreshBtn.addEventListener('click', () => location.reload());

/* ---------- Show more / less ---------- */
els.presetsMore.addEventListener('click', () => { presetsExpanded = !presetsExpanded; renderPresets(); });
els.configMore.addEventListener('click', () => { configExpanded = !configExpanded; renderAdvanced(); });

/* ---------- Tabs (Workout / History / Settings) ---------- */
const tabButtons = [...document.querySelectorAll('.tab')];
function switchTab(name, focus) {
  tabButtons.forEach(btn => {
    const on = btn.dataset.tab === name;
    btn.classList.toggle('active', on);
    btn.setAttribute('aria-selected', on ? 'true' : 'false');
    btn.tabIndex = on ? 0 : -1;
    if (on && focus) btn.focus();
  });
  document.querySelectorAll('.tab-panel').forEach(p => { p.hidden = p.id !== 'tab-' + name; });
}
tabButtons.forEach((btn, i) => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  btn.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const dir = e.key === 'ArrowRight' ? 1 : -1;
    const next = tabButtons[(i + dir + tabButtons.length) % tabButtons.length];
    switchTab(next.dataset.tab, true);
  });
});

/* ---------- Keyboard: modal Escape + focus trap (keyboard / TV remote) ---------- */
function openModalEl() { return !els.shareModal.hidden ? els.shareModal : (!els.modal.hidden ? els.modal : null); }
document.addEventListener('keydown', (e) => {
  const modal = openModalEl();
  if (!modal) return;
  if (e.key === 'Escape') { modal.hidden = true; e.preventDefault(); return; }
  if (e.key === 'Tab') {
    const f = modal.querySelectorAll('button, input, select, [tabindex]:not([tabindex="-1"])');
    const list = [...f].filter(el => !el.disabled && el.offsetParent !== null);
    if (!list.length) return;
    const first = list[0], last = list[list.length - 1];
    if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
    else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
  }
});

// Build the discreet keyboard-shortcut hints (icon + key badges, language-neutral).
function buildHints() {
  const chip = (keys, icon) => `<span class="kh">${keys.map(k => `<kbd>${k}</kbd>`).join('')}${icon || ''}</span>`;
  els.timerHint.innerHTML =
    chip(['Space'], ICONS.pause) + chip(['N'], ICONS.skip) + chip(['R'], ICONS.reset) +
    chip(['M'], ICONS.volume) + chip(['Esc'], ICONS.close);
  els.setupHint.innerHTML =
    chip(['S'], ICONS.play) + chip(['1', '2', '3']) + chip(['↑', '↓', '←', '→']);
}

/* ---------- Init ---------- */
applyIcons();
buildHints();
applyTheme();
buildAccentSwatches();
buildExerciseDatalist();
buildLangSelect();
const fromLink = applySharedConfigFromUrl();
wireSteppers();
renderConfigInputs();
renderPresets();

// Restore background-video settings
const vstore = store.get('tt_video', { url: '', volume: 50 });
video.volume = Number.isFinite(+vstore.volume) ? +vstore.volume : 50;
els.videoVolume.value = video.volume;
els.videoUrl.value = vstore.url || '';
if (vstore.url) video.setUrl(vstore.url);

applyTranslations();
if (fromLink) toast(t('tLoadedLink'));

// warm up speech voices list (some browsers load async)
if ('speechSynthesis' in window) speechSynthesis.getVoices();

/* ---------- Service worker + update prompt ---------- */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').then(reg => {
      reg.addEventListener('updatefound', () => {
        const nw = reg.installing;
        if (!nw) return;
        nw.addEventListener('statechange', () => {
          // A new version installed while a controller is already active → offer refresh.
          if (nw.state === 'installed' && navigator.serviceWorker.controller) els.updateBanner.hidden = false;
        });
      });
    }).catch(() => {});
  });
}
