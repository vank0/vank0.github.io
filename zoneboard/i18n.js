// Tiny i18n: English (default) + Bulgarian, choice persisted in localStorage.
// Markup opts in with data-i18n / data-i18n-ph / data-i18n-aria / data-i18n-html.

export const LANGS = { en: 'English', bg: 'Български' };
const STORE_KEY = 'zb_lang';

const EN = {
  // --- setup: chrome ---
  btWarn: "Web Bluetooth isn't available in this browser. Use <b>Chrome</b> or <b>Edge</b> over HTTPS or localhost.",
  language: 'Language',

  // --- presets ---
  presets: 'Presets',
  saveCurrent: 'Save current',
  noPresets: 'No presets saved.',
  savePreset: 'Save preset',
  presetNamePh: 'Preset name',
  cancel: 'Cancel',
  save: 'Save',

  // --- people ---
  people: 'People',
  addPerson: 'Add person',
  reconnectStraps: 'Reconnect known straps',
  noPeopleYet: 'No one yet. Add people, then optionally connect a HR monitor to each. People without a monitor still get a station and rotate.',
  personNamePh: 'Person name',
  connectHR: 'Connect HR',
  disconnectHR: 'Disconnect HR',
  details: 'Details',
  remove: 'Remove',
  sex: 'Sex',
  male: 'Male',
  female: 'Female',
  age: 'Age',
  weightKg: 'Weight (kg)',
  heightCm: 'Height (cm)',
  restingHR: 'Resting HR',
  maxHROverride: 'Max HR override',
  autoMax: 'auto {n}',
  betaBlockers: 'Beta blockers',

  // --- workout config ---
  workout: 'Workout',
  sets: 'Sets',
  roundsPerSet: 'Rounds / set',
  stationsPerSet: 'Stations / set',
  setRepeat: 'Set repeat (laps)',
  workSec: 'Work (sec)',
  restSec: 'Rest (sec)',
  restBetweenSets: 'Rest between sets (sec)',
  prepareSec: 'Prepare (sec)',
  warmupSec: 'Warmup (sec)',
  cooldownSec: 'Cooldown (sec)',
  adaptiveTarget: 'Adaptive target zone',
  toWord: 'to',

  // --- exercises ---
  exercisesPerStation: 'Exercises per station',
  exHint: 'Toggle on to name the exercise at each station.',
  nameExercises: 'name exercises',
  difficulty: 'Difficulty',
  modeSimple: 'Single exercise',
  modeLevels: 'Light / medium / hard',
  hintSimple: 'One exercise per station — everyone does the same thing. Switch to light/medium/hard for HR-adaptive variants.',
  hintLevels: 'Three variants per station. The app shows each member the one its adaptive logic picks from their heart rate.',
  setN: 'Set {n}',
  applyToAll: 'Apply to all sets',
  phLight: 'Light',
  phMedium: 'Medium',
  phHard: 'Hard',
  phExercise: 'Exercise',
  shuffleStations: 'Shuffle start stations',
  copy: 'Copy',
  paste: 'Paste',

  // --- music ---
  youtubePlaylist: 'YouTube playlist',
  playlistPh: 'Paste a YouTube playlist or video link',
  videoHintIdle: 'Plays behind the workout on the big screen.',
  videoReady: 'Video ready.',
  playlistReady: 'Playlist ready.',
  videoInvalid: "Couldn't read that YouTube link.",
  musicVolumeHint: 'Music volume is on the workout screen, next to the mute button. Timer cues always play at full volume, over the music.',
  musicVolume: 'Music volume {n}%',

  // --- start bar ---
  keyHint: 'Keyboard / TV remote — during a class: <b>OK/Space</b> play·pause · <b>▶</b> skip · <b>◀</b> reset · <b>▲▼</b> switch view · <b>Back/Esc</b> end · <b>F</b> fullscreen · <b>M</b> mute music · <b>+ −</b> music volume',
  total: 'total',
  intervals: 'intervals',
  intervalsOne: 'interval',
  membersLower: 'members',
  membersLowerOne: 'member',
  startClass: 'Start class',

  // --- phases ---
  prepare: 'Prepare',
  warmup: 'Warmup',
  work: 'Work',
  rest: 'Rest',
  restSetPhase: 'Set Rest',
  cooldown: 'Cooldown',

  // --- workout screen ---
  membersView: 'Members',
  stationsView: 'Stations',
  backToSetupAria: 'back to setup',
  fullscreenAria: 'fullscreen',
  resetAria: 'reset',
  playPauseAria: 'play/pause',
  skipAria: 'skip',
  musicQuieter: 'music quieter',
  muteMusic: 'mute music',
  musicLouder: 'music louder',
  musicVolumeGroup: 'music volume',
  upNext: 'UP NEXT',
  thenS: 'Then · S{n}',
  station: 'Station {n}',
  upNextStation: 'Up next · Station {n}',
  noMonitor: 'no monitor',
  reconnecting: 'reconnecting…',
  pts: 'pts',
  kcal: 'kcal',
  empty: 'empty',
  rank: 'Rank {n}',
  elapsed: 'Elapsed',
  remaining: 'Remaining',

  // --- results ---
  classComplete: 'Class Complete',
  resultsSub: '{n} members · {kcal} kcal torched · {pts} total points',
  resultsSubOne: '1 member · {kcal} kcal torched · {pts} total points',
  noMembersConnected: 'No members connected.',
  backToSetup: 'Back to setup',
  getResults: 'Get results',

  // --- handout ---
  scanTitle: 'Scan to take your results home',
  scanHint: 'Point your phone camera at your card',
  tooMuchData: 'too much data',
  qrMeta: '{kcal} kcal · {pts} pts',
  qrMetaHR: '{kcal} kcal · {pts} pts · avg {avg} bpm',
  hoStations: 'Stations',
  hoStationsHR: 'Stations avg/peak',
  hoHR: 'HR {avg} avg · {peak} peak · {max} max',
  hoNoMonitor: 'No heart-rate monitor worn.',
  hoLine2: '{time} · {kcal} kcal · {pts} pts',

  // --- toasts ---
  nothingToRun: 'Nothing to run — set some work time.',
  pairingFailed: 'Pairing failed: {msg}',
  copiedSetToOthers: 'Copied set {n} to {m} other sets',
  copiedSetToOne: 'Copied set {n} to 1 other set',
  copiedX: 'Copied “{x}”',
  nothingToCopy: 'Nothing to copy',
  copyFirst: 'Copy an exercise first',
  shuffled: 'Start stations shuffled',
  loadedPreset: 'Loaded “{name}”',
  reconnectedN: 'Reconnected {n}',
  noKnownStraps: 'No known straps in range',
  reconnectFailed: 'Reconnect failed',
};

// Bulgarian. Kept roughly as short as the English so the TV layout still fits.
const BG = {
  btWarn: 'Web Bluetooth не е достъпен в този браузър. Използвайте <b>Chrome</b> или <b>Edge</b> през HTTPS или localhost.',
  language: 'Език',

  presets: 'Шаблони',
  saveCurrent: 'Запази текущия шаблон',
  noPresets: 'Няма запазени шаблони.',
  savePreset: 'Запазване на шаблон',
  presetNamePh: 'Име на шаблона',
  cancel: 'Отказ',
  save: 'Запази',

  people: 'Хора',
  addPerson: 'Добави човек',
  reconnectStraps: 'Свържи запомнените',
  noPeopleYet: 'Още няма никого. Добавете хора и по желание свържете пулсомер към всеки. Хората без пулсомер също получават станция и участват в ротацията.',
  personNamePh: 'Име',
  connectHR: 'Свържи',
  disconnectHR: 'Разкачи',
  details: 'Детайли',
  remove: 'Премахни',
  sex: 'Пол',
  male: 'Мъж',
  female: 'Жена',
  age: 'Възраст',
  weightKg: 'Тегло (кг)',
  heightCm: 'Ръст (см)',
  restingHR: 'Пулс в покой',
  maxHROverride: 'Ръчен макс. пулс',
  autoMax: 'авт. {n}',
  betaBlockers: 'Бета-блокери',

  workout: 'Тренировка',
  sets: 'Блокове',
  roundsPerSet: 'Кръгове / блок',
  stationsPerSet: 'Станции / блок',
  setRepeat: 'Обиколки на блок',
  workSec: 'Работа (сек)',
  restSec: 'Почивка (сек)',
  restBetweenSets: 'Почивка между блокове (сек)',
  prepareSec: 'Подготовка (сек)',
  warmupSec: 'Загрявка (сек)',
  cooldownSec: 'Разпускане (сек)',
  adaptiveTarget: 'Целева зона',
  toWord: 'до',

  exercisesPerStation: 'Упражнения на станция',
  exHint: 'Включете, за да зададете упражнение на всяка станция.',
  nameExercises: 'задай упражнения',
  difficulty: 'Трудност',
  modeSimple: 'Едно упражнение',
  modeLevels: 'Леко / средно / тежко',
  hintSimple: 'Едно упражнение на станция — всички правят едно и също. Превключете на леко/средно/тежко за варианти според пулса.',
  hintLevels: 'Три варианта на станция. Приложението показва на всеки участник варианта, който адаптивната логика избира според пулса му.',
  setN: 'Блок {n}',
  applyToAll: 'Към всички блокове',
  phLight: 'Леко',
  phMedium: 'Средно',
  phHard: 'Тежко',
  phExercise: 'Упражнение',
  shuffleStations: 'Разбъркай началните станции',
  copy: 'Копирай',
  paste: 'Постави',

  youtubePlaylist: 'YouTube плейлист',
  playlistPh: 'Поставете връзка към YouTube плейлист или видео',
  videoHintIdle: 'Върви на фона на тренировката на големия екран.',
  videoReady: 'Видеото е готово.',
  playlistReady: 'Плейлистът е готов.',
  videoInvalid: 'Невалидна YouTube връзка.',
  musicVolumeHint: 'Силата на музиката е на екрана на тренировката, до бутона за заглушаване. Сигналите на таймера винаги звучат на пълна сила, над музиката.',
  musicVolume: 'Сила на музиката {n}%',

  keyHint: 'Клавиатура / дистанционно — по време на тренировка: <b>OK/Space</b> старт·пауза · <b>▶</b> напред · <b>◀</b> нулиране · <b>▲▼</b> смяна на изгледа · <b>Back/Esc</b> край · <b>F</b> цял екран · <b>M</b> заглуши музиката · <b>+ −</b> сила на музиката',
  total: 'общо',
  intervals: 'интервала',
  intervalsOne: 'интервал',
  membersLower: 'участници',
  membersLowerOne: 'участник',
  startClass: 'Старт',

  prepare: 'Подготовка',
  warmup: 'Загрявка',
  work: 'Работа',
  rest: 'Почивка',
  restSetPhase: 'Дълга почивка',
  cooldown: 'Разпускане',

  membersView: 'Участници',
  stationsView: 'Станции',
  backToSetupAria: 'обратно към настройките',
  fullscreenAria: 'цял екран',
  resetAria: 'нулиране',
  playPauseAria: 'старт/пауза',
  skipAria: 'напред',
  musicQuieter: 'по-тиха музика',
  muteMusic: 'заглуши музиката',
  musicLouder: 'по-силна музика',
  musicVolumeGroup: 'сила на музиката',
  upNext: 'СЛЕДВА',
  thenS: 'После · S{n}',
  station: 'Станция {n}',
  upNextStation: 'Следва · Станция {n}',
  noMonitor: 'без пулсомер',
  reconnecting: 'свързване…',
  pts: 'точки',
  kcal: 'ккал',
  empty: 'празна',
  rank: 'Място {n}',
  elapsed: 'Изминало',
  remaining: 'Оставащо',

  classComplete: 'Тренировката приключи',
  resultsSub: '{n} участници · {kcal} изгорени ккал · общо {pts} точки',
  resultsSubOne: '1 участник · {kcal} изгорени ккал · общо {pts} точки',
  noMembersConnected: 'Няма свързани участници.',
  backToSetup: 'Към настройките',
  getResults: 'Вземи резултатите',

  scanTitle: 'Сканирайте, за да вземете резултатите си',
  scanHint: 'Насочете камерата на телефона към вашата карта',
  tooMuchData: 'твърде много данни',
  qrMeta: '{kcal} ккал · {pts} точки',
  qrMetaHR: '{kcal} ккал · {pts} точки · ср. {avg} уд/мин',
  hoStations: 'Станции',
  hoStationsHR: 'Станции ср./пик',
  hoHR: 'Пулс {avg} ср. · {peak} пик · {max} макс.',
  hoNoMonitor: 'Без пулсомер.',
  hoLine2: '{time} · {kcal} ккал · {pts} точки',

  nothingToRun: 'Няма какво да се пусне — задайте време за работа.',
  pairingFailed: 'Свързването не успя: {msg}',
  copiedSetToOthers: 'Блок {n} е копиран в {m} други блока',
  copiedSetToOne: 'Блок {n} е копиран в 1 друг блок',
  copiedX: 'Копирано „{x}“',
  nothingToCopy: 'Няма какво да се копира',
  copyFirst: 'Първо копирайте упражнение',
  shuffled: 'Началните станции са разбъркани',
  loadedPreset: 'Зареден шаблон „{name}“',
  reconnectedN: 'Свързани: {n}',
  noKnownStraps: 'Няма запомнени пулсомери наблизо',
  reconnectFailed: 'Повторното свързване не успя',
};

const TABLES = { en: EN, bg: BG };
let lang = 'en';

export function getLang() { return lang; }
export function initLang() {
  try { const s = localStorage.getItem(STORE_KEY); if (s && TABLES[s]) lang = s; } catch {}
  document.documentElement.lang = lang;
  return lang;
}
export function setLang(l) {
  if (!TABLES[l]) return;
  lang = l;
  try { localStorage.setItem(STORE_KEY, l); } catch {}
  document.documentElement.lang = l;
}
// English is the fallback for any key a translation misses.
export function t(key, params) {
  let s = TABLES[lang]?.[key] ?? EN[key] ?? key;
  if (params) for (const [k, v] of Object.entries(params)) s = s.replaceAll(`{${k}}`, v);
  return s;
}
// Swap every tagged node in `root`.
export function applyI18n(root = document) {
  root.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  root.querySelectorAll('[data-i18n-html]').forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
  root.querySelectorAll('[data-i18n-ph]').forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
  root.querySelectorAll('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
  root.querySelectorAll('[data-i18n-title]').forEach(el => { el.title = t(el.dataset.i18nTitle); });
}
