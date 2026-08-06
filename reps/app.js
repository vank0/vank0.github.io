/* RepCount — sensor-based rep counter PWA */
(() => {
  "use strict";

  // ---------------------------------------------------------------- i18n
  const STRINGS = {
    en: {
      "state.idle": "Ready — place phone on the weight stack",
      "state.needPermission": "Tap Start and allow motion access",
      "state.listening": "Listening for motion…",
      "state.counting": "Counting…",
      "state.hit": "Target reached! 🎉",
      "state.noSensor": "Motion sensors are not available on this device/browser",
      "state.denied": "Motion permission denied — enable it in Settings → Safari → Motion & Orientation Access",
      "state.insecure": "Motion sensors need HTTPS — open this page over https://",
      "theme.auto": "Theme: automatic (follows system)",
      "theme.light": "Theme: light",
      "theme.dark": "Theme: dark",
      "btn.start": "▶ Start set",
      "btn.stop": "■ Stop set",
      "btn.reset": "Reset",
      "settings.title": "Settings",
      "settings.target": "Target reps",
      "settings.sensitivity": "Sensitivity",
      "settings.minRep": "Min. seconds per rep",
      "settings.voice": "Speak the count",
      "settings.beep": "Beep on each rep",
      "help.title": "How to use",
      "help.1": "Set your target reps, press Start set, then place the phone flat on the machine's weight stack (screen up).",
      "help.2": "Each full up-and-down movement counts as one rep, with a beep.",
      "help.3": "When you reach the target you'll hear a distinct fanfare; extra reps get a lower tone.",
      "help.4": "If reps are missed or double-counted, adjust Sensitivity — the graph shows what the sensor sees.",
    },
    bg: {
      "state.idle": "Готово — поставете телефона върху тежестите",
      "state.needPermission": "Натиснете Старт и разрешете достъп до сензорите",
      "state.listening": "Изчакване на движение…",
      "state.counting": "Броене…",
      "state.hit": "Целта е достигната! 🎉",
      "state.noSensor": "Сензорите за движение не са налични на това устройство/браузър",
      "state.denied": "Достъпът до сензорите е отказан — разрешете го от Настройки → Safari → Достъп до движение и ориентация",
      "state.insecure": "Сензорите изискват HTTPS — отворете страницата през https://",
      "theme.auto": "Тема: автоматична (според системата)",
      "theme.light": "Тема: светла",
      "theme.dark": "Тема: тъмна",
      "btn.start": "▶ Старт",
      "btn.stop": "■ Стоп",
      "btn.reset": "Нулиране",
      "settings.title": "Настройки",
      "settings.target": "Целеви повторения",
      "settings.sensitivity": "Чувствителност",
      "settings.minRep": "Мин. секунди на повторение",
      "settings.voice": "Изговаряй броя",
      "settings.beep": "Звук при всяко повторение",
      "help.title": "Как се използва",
      "help.1": "Задайте целевите повторения, натиснете Старт и поставете телефона легнал върху тежестите на машината (с екрана нагоре).",
      "help.2": "Всяко пълно движение нагоре и надолу се брои като едно повторение, със звуков сигнал.",
      "help.3": "При достигане на целта ще чуете отличителен сигнал; допълнителните повторения са с по-нисък тон.",
      "help.4": "Ако повторения се пропускат или броят двойно, регулирайте Чувствителност — графиката показва какво отчита сензорът.",
    },
  };

  let lang = localStorage.getItem("rc.lang") ||
    ((navigator.language || "").toLowerCase().startsWith("bg") ? "bg" : "en");
  if (!STRINGS[lang]) lang = "en";

  const t = (key) => STRINGS[lang][key] || STRINGS.en[key] || key;

  function applyI18n() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.dataset.i18n);
    });
    $("#langBtn").textContent = lang.toUpperCase();
    // Start button label depends on running state
    $("#startBtn").textContent = running ? t("btn.stop") : t("btn.start");
    syncThemeUI();
  }

  // ---------------------------------------------------------------- theme
  // Modes: "auto" (follows system) → "light" → "dark", cycled by the button.
  const darkMedia = matchMedia("(prefers-color-scheme: dark)");
  let themeMode = localStorage.getItem("rc.theme") || "auto";
  if (!["auto", "light", "dark"].includes(themeMode)) themeMode = "auto";

  function resolvedTheme() {
    return themeMode === "auto" ? (darkMedia.matches ? "dark" : "light") : themeMode;
  }

  function applyTheme() {
    document.documentElement.dataset.theme = resolvedTheme();
    waveColors = null; // canvas re-reads CSS variables
    // Keep the browser/PWA chrome matched to the background.
    const bg = getComputedStyle(document.documentElement).getPropertyValue("--bg-a").trim();
    document.querySelector('meta[name="theme-color"]').setAttribute("content", bg || "#0b1220");
    syncThemeUI();
  }

  function syncThemeUI() {
    const btn = document.getElementById("themeBtn");
    if (!btn) return;
    btn.setAttribute("aria-label", t("theme." + themeMode));
    btn.title = t("theme." + themeMode);
    ["Auto", "Light", "Dark"].forEach((m) => {
      document.getElementById("themeIcon" + m).classList.toggle("active", m.toLowerCase() === themeMode);
    });
  }

  darkMedia.addEventListener("change", () => { if (themeMode === "auto") applyTheme(); });

  // ---------------------------------------------------------------- DOM
  const $ = (sel) => document.querySelector(sel);
  const repCountEl = $("#repCount");
  const repTargetEl = $("#repTarget");
  const stateLine = $("#stateLine");
  const startBtn = $("#startBtn");
  const waveCanvas = $("#wave");
  const waveCtx = waveCanvas.getContext("2d");

  // ---------------------------------------------------------------- settings
  const settings = {
    target: 12,
    sensitivity: 5, // 1..10, higher = more sensitive
    minRepSec: 1.5,
    voice: false,
    beep: true,
  };

  try {
    Object.assign(settings, JSON.parse(localStorage.getItem("rc.settings") || "{}"));
  } catch (_) { /* corrupt storage — keep defaults */ }

  function saveSettings() {
    localStorage.setItem("rc.settings", JSON.stringify(settings));
  }

  function syncSettingsUI() {
    $("#targetInput").value = settings.target;
    $("#sensInput").value = settings.sensitivity;
    $("#minRepInput").value = settings.minRepSec;
    $("#voiceToggle").checked = settings.voice;
    $("#beepToggle").checked = settings.beep;
    repTargetEl.textContent = "/ " + settings.target;
  }

  // ---------------------------------------------------------------- audio
  let audioCtx = null;

  function ensureAudio() {
    if (!audioCtx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) audioCtx = new AC();
    }
    if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
  }

  function tone(freq, startIn, dur, gain = 0.4, type = "sine") {
    if (!audioCtx) return;
    const t0 = audioCtx.currentTime + startIn;
    const osc = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(gain, t0 + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
    osc.connect(g).connect(audioCtx.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.05);
  }

  function cueRep() { if (settings.beep) tone(880, 0, 0.12); }
  function cueOverTarget() { if (settings.beep) tone(440, 0, 0.15, 0.35, "triangle"); }
  function cueTargetReached() {
    tone(660, 0.00, 0.18, 0.5);
    tone(880, 0.16, 0.18, 0.5);
    tone(1320, 0.32, 0.45, 0.5);
  }
  function cueStart() { tone(660, 0, 0.1, 0.3); }

  function speak(text) {
    if (!("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang === "bg" ? "bg-BG" : "en-US";
    u.rate = 1.1;
    speechSynthesis.speak(u);
  }

  // ---------------------------------------------------------------- rep detection
  //
  // The phone lies on the weight stack. We estimate the gravity direction with a
  // slow EMA, project linear acceleration onto it (signed vertical acceleration),
  // then leaky-integrate to a pseudo vertical velocity. One rep = movement in one
  // vertical direction followed by movement in the other (order-agnostic), with a
  // minimum time per rep as a debounce.
  //
  let running = false;
  let reps = 0;
  let gravity = { x: 0, y: 0, z: 9.81 };
  let vVel = 0;              // leaky-integrated vertical velocity (m/s-ish)
  let sawUp = false, sawDown = false;
  let sawUpAt = 0, sawDownAt = 0;
  let armed = true;          // disarmed after each count until velocity returns to neutral
  let lastRepAt = 0;
  let lastEventAt = 0;
  let motionSeen = false;

  const GRAV_ALPHA = 0.02;   // gravity EMA
  const VEL_DECAY_PER_S = 1.2; // leak rate: velocity decays e^-1.2 per second

  // Sensitivity 1..10 → velocity threshold in m/s (higher sensitivity = lower threshold)
  const velThreshold = () => 0.55 - settings.sensitivity * 0.045; // 0.505 .. 0.10

  const waveBuf = new Float32Array(160); // ring buffer for the graph
  let waveIdx = 0;

  function onMotion(e) {
    const now = performance.now();
    const dt = Math.min(0.1, (now - lastEventAt) / 1000) || 0.016;
    lastEventAt = now;

    let ax, ay, az;
    const acc = e.acceleration;
    const accG = e.accelerationIncludingGravity;
    if (accG && accG.x != null) {
      gravity.x += GRAV_ALPHA * (accG.x - gravity.x);
      gravity.y += GRAV_ALPHA * (accG.y - gravity.y);
      gravity.z += GRAV_ALPHA * (accG.z - gravity.z);
    }
    if (acc && acc.x != null) {
      ax = acc.x; ay = acc.y; az = acc.z;
    } else if (accG && accG.x != null) {
      ax = accG.x - gravity.x; ay = accG.y - gravity.y; az = accG.z - gravity.z;
    } else {
      return;
    }
    motionSeen = true;

    // Signed vertical acceleration: projection onto the gravity unit vector.
    const gMag = Math.hypot(gravity.x, gravity.y, gravity.z) || 9.81;
    const vAcc = (ax * gravity.x + ay * gravity.y + az * gravity.z) / gMag;

    // Leaky integration → pseudo velocity (drift-free enough at rep tempo).
    vVel = vVel * Math.exp(-VEL_DECAY_PER_S * dt) + vAcc * dt;

    waveBuf[waveIdx] = vVel;
    waveIdx = (waveIdx + 1) % waveBuf.length;

    if (!running) return;

    const thr = velThreshold();

    // After a count, wait until the current excursion settles back to neutral,
    // otherwise its tail immediately re-arms a direction flag and a single
    // movement would complete the next up+down pair (phantom rep).
    if (!armed) {
      if (Math.abs(vVel) < thr * 0.5) armed = true;
      return;
    }

    // A lone direction flag with no partner is stale after a few seconds
    // (e.g. someone bumped the machine once) — drop it.
    if (sawUp && now - sawUpAt > 6000) sawUp = false;
    if (sawDown && now - sawDownAt > 6000) sawDown = false;

    if (vVel > thr) { sawUp = true; sawUpAt = now; }
    if (vVel < -thr) { sawDown = true; sawDownAt = now; }

    if (sawUp && sawDown && now - lastRepAt >= settings.minRepSec * 1000) {
      sawUp = sawDown = false;
      armed = false;
      lastRepAt = now;
      countRep();
    }
  }

  function countRep() {
    reps++;
    repCountEl.textContent = reps;

    if (reps === settings.target) {
      repCountEl.classList.add("hit");
      stateLine.textContent = t("state.hit");
      cueTargetReached();
      if (settings.voice) setTimeout(() => speak(String(reps)), 900);
      if (navigator.vibrate) navigator.vibrate([100, 60, 100, 60, 200]);
    } else {
      if (reps > settings.target) cueOverTarget(); else cueRep();
      if (settings.voice) speak(String(reps));
      if (navigator.vibrate) navigator.vibrate(40);
      stateLine.textContent = t("state.counting");
      stateLine.classList.add("active");
    }
  }

  // ---------------------------------------------------------------- waveform
  let waveColors = null; // invalidated on theme change

  function getWaveColors() {
    if (!waveColors) {
      const cs = getComputedStyle(document.documentElement);
      waveColors = {
        guide: cs.getPropertyValue("--wave-guide").trim() || "#2a3644",
        line: cs.getPropertyValue("--wave-line").trim() || "#34d399",
        idle: cs.getPropertyValue("--wave-idle").trim() || "#4b5c6e",
      };
    }
    return waveColors;
  }

  function drawWave() {
    const w = waveCanvas.width, h = waveCanvas.height;
    const colors = getWaveColors();
    waveCtx.clearRect(0, 0, w, h);

    // threshold guides
    const thr = velThreshold();
    const scale = h / 2 / Math.max(0.6, thr * 3);
    waveCtx.strokeStyle = colors.guide;
    waveCtx.beginPath();
    waveCtx.moveTo(0, h / 2 - thr * scale); waveCtx.lineTo(w, h / 2 - thr * scale);
    waveCtx.moveTo(0, h / 2 + thr * scale); waveCtx.lineTo(w, h / 2 + thr * scale);
    waveCtx.stroke();

    waveCtx.strokeStyle = running ? colors.line : colors.idle;
    waveCtx.lineWidth = 2;
    waveCtx.beginPath();
    for (let i = 0; i < waveBuf.length; i++) {
      const v = waveBuf[(waveIdx + i) % waveBuf.length];
      const x = (i / (waveBuf.length - 1)) * w;
      const y = Math.min(h - 2, Math.max(2, h / 2 - v * scale));
      i === 0 ? waveCtx.moveTo(x, y) : waveCtx.lineTo(x, y);
    }
    waveCtx.stroke();
    requestAnimationFrame(drawWave);
  }

  // ---------------------------------------------------------------- wake lock
  let wakeLock = null;

  async function acquireWakeLock() {
    try {
      if ("wakeLock" in navigator) wakeLock = await navigator.wakeLock.request("screen");
    } catch (_) { /* not fatal */ }
  }

  document.addEventListener("visibilitychange", () => {
    if (running && document.visibilityState === "visible") acquireWakeLock();
  });

  // ---------------------------------------------------------------- start/stop
  async function start() {
    ensureAudio();

    if (!window.DeviceMotionEvent) {
      stateLine.textContent = t("state.noSensor");
      return;
    }
    if (!window.isSecureContext) {
      stateLine.textContent = t("state.insecure");
      return;
    }

    // iOS 13+ requires an explicit permission request from a user gesture.
    if (typeof DeviceMotionEvent.requestPermission === "function") {
      try {
        const res = await DeviceMotionEvent.requestPermission();
        if (res !== "granted") {
          stateLine.textContent = t("state.denied");
          return;
        }
      } catch (_) {
        stateLine.textContent = t("state.denied");
        return;
      }
    }

    reps = 0;
    sawUp = sawDown = false;
    armed = true;
    vVel = 0;
    lastRepAt = performance.now(); // grace period while placing the phone
    motionSeen = false;
    repCountEl.textContent = "0";
    repCountEl.classList.remove("hit");

    window.addEventListener("devicemotion", onMotion);
    running = true;
    startBtn.classList.add("running");
    startBtn.textContent = t("btn.stop");
    stateLine.textContent = t("state.listening");
    stateLine.classList.add("active");
    cueStart();
    acquireWakeLock();

    setTimeout(() => {
      if (running && !motionSeen) stateLine.textContent = t("state.noSensor");
    }, 2000);
  }

  function stop() {
    running = false;
    window.removeEventListener("devicemotion", onMotion);
    startBtn.classList.remove("running");
    startBtn.textContent = t("btn.start");
    stateLine.classList.remove("active");
    stateLine.textContent = t("state.idle");
    if (wakeLock) { wakeLock.release().catch(() => {}); wakeLock = null; }
  }

  // ---------------------------------------------------------------- UI wiring
  startBtn.addEventListener("click", () => (running ? stop() : start()));

  $("#resetBtn").addEventListener("click", () => {
    reps = 0;
    sawUp = sawDown = false;
    armed = true;
    repCountEl.textContent = "0";
    repCountEl.classList.remove("hit");
    stateLine.textContent = running ? t("state.listening") : t("state.idle");
  });

  $("#themeBtn").addEventListener("click", () => {
    themeMode = { auto: "light", light: "dark", dark: "auto" }[themeMode];
    localStorage.setItem("rc.theme", themeMode);
    applyTheme();
  });

  $("#langBtn").addEventListener("click", () => {
    lang = lang === "en" ? "bg" : "en";
    localStorage.setItem("rc.lang", lang);
    applyI18n();
  });

  $("#targetInput").addEventListener("change", (e) => {
    settings.target = Math.max(1, Math.min(200, Math.round(+e.target.value || 12)));
    e.target.value = settings.target;
    repTargetEl.textContent = "/ " + settings.target;
    saveSettings();
  });

  document.querySelectorAll(".step").forEach((btn) =>
    btn.addEventListener("click", () => {
      settings.target = Math.max(1, Math.min(200, settings.target + +btn.dataset.step));
      syncSettingsUI();
      saveSettings();
    })
  );

  document.querySelectorAll(".step2").forEach((btn) =>
    btn.addEventListener("click", () => {
      settings.minRepSec = Math.max(0.5, Math.min(10, +(settings.minRepSec + +btn.dataset.step).toFixed(1)));
      syncSettingsUI();
      saveSettings();
    })
  );

  $("#sensInput").addEventListener("input", (e) => {
    settings.sensitivity = +e.target.value;
    saveSettings();
  });

  $("#minRepInput").addEventListener("change", (e) => {
    settings.minRepSec = Math.max(0.5, Math.min(10, +e.target.value || 1.5));
    e.target.value = settings.minRepSec;
    saveSettings();
  });

  $("#voiceToggle").addEventListener("change", (e) => { settings.voice = e.target.checked; saveSettings(); });
  $("#beepToggle").addEventListener("change", (e) => { settings.beep = e.target.checked; saveSettings(); });

  // ---------------------------------------------------------------- boot
  syncSettingsUI();
  applyTheme();
  applyI18n();
  drawWave();

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
  }
})();
