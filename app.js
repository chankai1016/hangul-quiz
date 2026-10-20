/* =============================================================
   한글 자모 테스트 — app.js
   ============================================================= */

const $ = (s) => document.querySelector(s);
const LS_LANG = 'hq.lang';
const LS_STATS = 'hq.stats';
const LS_AUDIO = 'hq.audio';

const S = {
  lang: 'ja',
  pool: new Set(['basic', 'tense', 'vowel', 'final']),
  count: 10,
  queue: [],
  i: 0,
  opts: [],       // この問題の選択肢（順番を固定する）
  sel: null,      // 選択中の値
  judged: false,  // 確定済みか
  log: [],
  audio: { gender: 'auto', uri: 'auto', mode: 'seq', auto: true },
  voices: []
};

/* =============================================================
   ローマ字 → ハングル（選択肢の音声用）
   ============================================================= */
const RR_INIT = [
  ['kk', 'ㄲ'], ['tt', 'ㄸ'], ['pp', 'ㅃ'], ['ss', 'ㅆ'], ['jj', 'ㅉ'], ['ch', 'ㅊ'],
  ['g', 'ㄱ'], ['n', 'ㄴ'], ['d', 'ㄷ'], ['r', 'ㄹ'], ['l', 'ㄹ'], ['m', 'ㅁ'],
  ['b', 'ㅂ'], ['s', 'ㅅ'], ['j', 'ㅈ'], ['k', 'ㅋ'], ['t', 'ㅌ'], ['p', 'ㅍ'],
  ['h', 'ㅎ'], ['', 'ㅇ']
];
const RR_VOW = [
  ['yae', 'ㅒ'], ['yeo', 'ㅕ'], ['wae', 'ㅙ'], ['wo', 'ㅝ'], ['we', 'ㅞ'], ['wi', 'ㅟ'],
  ['ui', 'ㅢ'], ['yu', 'ㅠ'], ['ya', 'ㅑ'], ['ye', 'ㅖ'], ['yo', 'ㅛ'], ['wa', 'ㅘ'],
  ['ae', 'ㅐ'], ['eo', 'ㅓ'], ['eu', 'ㅡ'], ['oe', 'ㅚ'],
  ['a', 'ㅏ'], ['e', 'ㅔ'], ['o', 'ㅗ'], ['u', 'ㅜ'], ['i', 'ㅣ']
];
const RR_FIN2 = [
  ['ng', 'ㅇ'], ['gs', 'ㄳ'], ['nj', 'ㄵ'], ['nh', 'ㄶ'], ['lg', 'ㄺ'], ['lm', 'ㄻ'],
  ['lb', 'ㄼ'], ['ls', 'ㄽ'], ['lt', 'ㄾ'], ['lp', 'ㄿ'], ['lh', 'ㅀ'], ['bs', 'ㅄ']
];
/* 二重パッチム（合成文字）への対応表 */
const DOUBLE_FINAL = {
  'ㄱㅅ': 'ㄳ', 'ㄴㅈ': 'ㄵ', 'ㄴㅎ': 'ㄶ', 'ㄹㄱ': 'ㄺ', 'ㄹㅁ': 'ㄻ',
  'ㄹㅂ': 'ㄼ', 'ㄹㅅ': 'ㄽ', 'ㄹㅌ': 'ㄾ', 'ㄹㅍ': 'ㄿ', 'ㄹㅎ': 'ㅀ', 'ㅂㅅ': 'ㅄ'
};

const RR_FIN1 = [
  ['ss', 'ㅆ'], ['ch', 'ㅊ'], ['k', 'ㄱ'], ['n', 'ㄴ'], ['l', 'ㄹ'], ['m', 'ㅁ'],
  ['p', 'ㅂ'], ['t', 'ㅌ'], ['s', 'ㅅ'], ['j', 'ㅈ'], ['h', 'ㅎ'], ['b', 'ㅂ']
];

/**
 * 文化観光部2000年式のローマ字をハングル1音節に戻す。
 * 失敗したら null（音声はローマ字をそのまま読む fallback に回す）。
 */
function rrToHangul(rr) {
  if (!rr) return null;
  const s = String(rr).toLowerCase();
  let pos = 0;

  // 初声
  let cho = null;
  for (const [k, v] of RR_INIT) {
    if (k && s.startsWith(k, pos)) { cho = v; pos += k.length; break; }
  }
  if (!cho) { cho = 'ㅇ'; } // 母音始まり

  // 中声
  let jung = null;
  for (const [k, v] of RR_VOW) {
    if (s.startsWith(k, pos)) { jung = v; pos += k.length; break; }
  }
  if (!jung) return null;

  // 終声
  let jong = '';
  const rest = s.slice(pos);
  if (rest) {
    const two = RR_FIN2.find(([k]) => k === rest);
    if (two) { jong = two[1]; pos = s.length; }
    else {
      const one = RR_FIN1.find(([k]) => k === rest);
      if (one) { jong = one[1]; pos = s.length; }
      else if (rest.length === 2) {
        const a = RR_FIN1.find(([k]) => k === rest[0]);
        const b = RR_FIN1.find(([k]) => k === rest[1]);
        if (a && b) {
          // 'ㄹ'+'ㄱ' は2文字。二重パッチムは合成済みの1文字（ㄺ）なので変換表を挟む
          const pair = DOUBLE_FINAL[a[1] + b[1]];
          if (pair) { jong = pair; pos = s.length; }
        }
      }
    }
  }
  if (pos !== s.length) return null;

  const ci = CHO_LIST.indexOf(cho);
  const vi = JUNG_LIST.indexOf(jung);
  const ji = JONG_LIST.indexOf(jong);
  if (ci < 0 || vi < 0 || ji < 0) return null;
  return String.fromCharCode(0xAC00 + ci * 588 + vi * 28 + ji);
}

/* =============================================================
   音声 / 語音 / speech
   ============================================================= */
const FEMALE_HINTS = ['female', 'woman', 'yuna', 'heami', 'sunhi', 'sunhee', 'soyoung', 'seoyeon',
  'jimin', 'sora', 'jihye', 'nari', 'sumi', 'kyuri', 'haneul', 'eunji', 'goeun', 'hyeryung',
  'google 한국의', 'google korean', '여성'];
const MALE_HINTS = ['male', 'man', 'injoon', 'minsang', 'junwoo', 'seojun', 'jihoon', 'hyunsu',
  'gook', 'nam', '남성'];

function guessGender(v) {
  const n = (v.name + ' ' + (v.voiceURI || '')).toLowerCase();
  if (FEMALE_HINTS.some((h) => n.includes(h))) return 'female';
  if (MALE_HINTS.some((h) => n.includes(h))) return 'male';
  return null;
}

const TTS = {
  supported: typeof window.speechSynthesis !== 'undefined' && typeof window.SpeechSynthesisUtterance !== 'undefined',
  init() {
    if (!this.supported) { renderVoices(); return; }
    const load = () => {
      const all = window.speechSynthesis.getVoices() || [];
      S.voices = all.filter((v) => /^ko(-|_)?/i.test(v.lang) || /korean/i.test(v.name));
      S.voices.forEach((v) => { v._g = guessGender(v); });
      renderVoices();
    };
    load();
    window.speechSynthesis.addEventListener('voiceschanged', load);
  },
  pick() {
    const { gender, uri } = S.audio;
    if (uri && uri !== 'auto') {
      const v = S.voices.find((x) => (x.voiceURI || x.name) === uri);
      if (v) return v;
    }
    if (!S.voices.length) return null;
    if (gender === 'auto') return S.voices[0];
    const g = S.voices.filter((v) => v._g === gender);
    return g.length ? g[0] : S.voices[0];
  },
  speak(text, rate, lang) {
    if (!this.supported || !text) return;
    try {
      const u = new SpeechSynthesisUtterance(text);
      const v = this.pick();
      u.lang = lang || 'ko-KR';
      if (v) u.voice = v;
      u.rate = rate || 0.85;
      u.pitch = 1;
      window.speechSynthesis.speak(u);
    } catch (e) { /* 非対応端末は無視 */ }
  },
  cancel() {
    if (this.supported) { try { window.speechSynthesis.cancel(); } catch (e) {} }
  },
  /** 選択肢の音を1つ読む */
  speakOption(rr, rate) {
    const h = rrToHangul(rr);
    this.speak(h || rr, rate || 0.85, h ? 'ko-KR' : 'ko-KR');
  },
  /** 「1. わ, 2. …」と通しで読む */
  speakSeq(values, rate) {
    const nums = ['일', '이', '삼', '사'];
    const parts = values.map((v, i) => {
      const h = rrToHangul(v) || v;
      return nums[i] + ', ' + h;
    });
    this.speak(parts.join('. ') + '.', rate || 0.8);
  }
};

/* =============================================================
   utils
   ============================================================= */
function t(key, vars) {
  const dict = I18N[S.lang] || I18N.ja;
  let s = dict[key];
  if (s === undefined) s = I18N.ja[key];
  if (s === undefined) return key;
  if (Array.isArray(s)) return s;
  if (vars) for (const k in vars) s = s.split('{' + k + '}').join(vars[k]);
  return s;
}

function shuffle(a) {
  const b = a.slice();
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

function decompose(ch) {
  const c = ch.codePointAt(0) - 0xAC00;
  if (c < 0 || c > 11171) return null;
  return {
    cho: CHO_LIST[Math.floor(c / 588)],
    jung: JUNG_LIST[Math.floor((c % 588) / 28)],
    jong: JONG_LIST[c % 28]
  };
}

/* =============================================================
   設定の保存
   ============================================================= */
function loadAudio() {
  let a = null;
  try { a = JSON.parse(localStorage.getItem(LS_AUDIO)); } catch (e) {}
  if (a && typeof a === 'object') {
    S.audio = {
      gender: ['auto', 'female', 'male'].indexOf(a.gender) !== -1 ? a.gender : 'auto',
      uri: typeof a.uri === 'string' ? a.uri : 'auto',
      mode: a.mode === 'one' ? 'one' : 'seq',
      auto: a.auto !== false
    };
  }
}
function saveAudio() {
  try { localStorage.setItem(LS_AUDIO, JSON.stringify(S.audio)); } catch (e) {}
}

/* =============================================================
   言語
   ============================================================= */
function detectLang() {
  let saved = null;
  try { saved = localStorage.getItem(LS_LANG); } catch (e) {}
  if (saved && LANGS.indexOf(saved) !== -1) return saved;
  const n = (navigator.language || 'ja').toLowerCase();
  if (n.startsWith('zh')) return 'zh';
  if (n.startsWith('en')) return 'en';
  return 'ja';
}

function setLang(l, save) {
  if (LANGS.indexOf(l) === -1) return;
  S.lang = l;
  if (save !== false) { try { localStorage.setItem(LS_LANG, l); } catch (e) {} }
  document.documentElement.lang = t('htmlLang');
  document.title = t('title') + ' — 한글 자모 테스트';
  applyStatic();
  if (!$('#quiz').classList.contains('hidden')) paint();
  if (!$('#result').classList.contains('hidden')) renderResult();
}

/* =============================================================
   静的な文言
   ============================================================= */
function applyStatic() {
  document.querySelectorAll('.langs button').forEach((b) => {
    b.setAttribute('aria-pressed', b.dataset.lang === S.lang ? 'true' : 'false');
  });
  document.querySelectorAll('.eyebrow[data-i18n]').forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });

  $('#titleText').textContent = t('title');
  $('#subtitleText').textContent = t('subtitle');
  $('#ledeText').textContent = t('lede');
  $('#rangeLabel').textContent = t('rangeLabel');
  $('#countLabel').textContent = t('countLabel');
  $('#countNote').textContent = t('countNote');
  $('#start').textContent = t('start');
  $('#segAll').textContent = t('all');
  $('#resetstats').textContent = t('resetStats');
  $('#hint').textContent = t('hint');
  $('#listenLabel').textContent = t('listen');
  $('#slowLabel').textContent = t('slow');
  $('#next').textContent = t('next');
  $('#tswarn').textContent = t('ttsWarn');
  $('#tswarn2').textContent = t('ttsWarn');
  $('#resultEyebrow').textContent = t('resultEyebrow');
  $('#again').textContent = t('again');
  $('#review').textContent = t('review');
  $('#tosetup').textContent = t('toSetup');
  $('#foot1').textContent = t('footer1');
  $('#foot2').textContent = t('footer2');

  // 音声設定
  $('#audioEyebrow').textContent = t('audioEyebrow');
  $('#genderLabel').textContent = t('genderLabel');
  $('#genderNote').textContent = t('genderNote');
  $('#segAuto').textContent = t('genderAuto');
  $('#segFemale').textContent = t('genderFemale');
  $('#segMale').textContent = t('genderMale');
  $('#voiceLabel').textContent = t('voiceLabel');
  $('#modeLabel').textContent = t('modeLabel');
  $('#segSeq').textContent = t('modeSeq');
  $('#segOne').textContent = t('modeOne');
  $('#modeNote').textContent = t(S.audio.mode === 'seq' ? 'modeNoteSeq' : 'modeNoteOne');
  $('#autoLabel').textContent = t('autoLabel');
  $('#testVoice').textContent = t('testVoice');
  $('#listenAllLabel').textContent = t('listenAll');
  $('#confirm').textContent = t('confirm');

  syncAudioControls();
  buildChips();
  updatePoolCount();
  updateLifetime();
  renderVoices();
}

function syncAudioControls() {
  document.querySelectorAll('#genders .seg').forEach((b) => {
    b.setAttribute('aria-pressed', b.dataset.gender === S.audio.gender ? 'true' : 'false');
  });
  document.querySelectorAll('#modes .seg').forEach((b) => {
    b.setAttribute('aria-pressed', b.dataset.mode === S.audio.mode ? 'true' : 'false');
  });
  $('#autoPlay').checked = !!S.audio.auto;
}

function renderVoices() {
  const sel = $('#voiceSelect');
  if (!sel) return;
  const avail = S.voices.length;
  const warn = $('#tswarn');
  warn.classList.toggle('hidden', avail > 0);
  if (warn.textContent.trim() === '') warn.textContent = t('ttsWarn');

  sel.innerHTML = '';
  const auto = document.createElement('option');
  auto.value = 'auto';
  auto.textContent = t('voiceAuto');
  sel.appendChild(auto);

  S.voices.forEach((v) => {
    const o = document.createElement('option');
    o.value = v.voiceURI || v.name;
    const g = v._g === 'female' ? t('genderFemale') : v._g === 'male' ? t('genderMale') : '';
    o.textContent = v.name + (g ? ' · ' + g : '') + ' — ' + v.lang;
    sel.appendChild(o);
  });

  const exists = S.voices.some((v) => (v.voiceURI || v.name) === S.audio.uri);
  sel.value = exists ? S.audio.uri : 'auto';
  if (!exists && S.audio.uri !== 'auto') { S.audio.uri = 'auto'; saveAudio(); }

  $('#voiceCount').textContent = avail ? t('voiceCount', { n: avail }) : t('voiceNone');

  // 指定した性別の声が無い場合の注意
  let note = t('genderNote');
  if (S.audio.gender !== 'auto' && avail) {
    const want = S.audio.gender === 'female' ? t('genderFemale') : t('genderMale');
    if (!S.voices.some((v) => v._g === S.audio.gender)) note = t('genderMissing', { label: want });
  }
  $('#genderNote').textContent = note;
}

/* =============================================================
   カテゴリ・成績
   ============================================================= */
function buildChips() {
  const box = $('#cats');
  box.innerHTML = '';
  ['basic', 'tense', 'vowel', 'final'].forEach((key) => {
    const n = ITEMS.filter((it) => it.c === key).length;
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip';
    b.dataset.cat = key;
    b.setAttribute('aria-pressed', S.pool.has(key) ? 'true' : 'false');
    b.innerHTML = '<span>' + t('cat_' + key) + '</span><i>' + n + '</i>';
    b.addEventListener('click', () => {
      if (S.pool.has(key)) {
        if (S.pool.size === 1) return;
        S.pool.delete(key);
      } else {
        S.pool.add(key);
      }
      b.setAttribute('aria-pressed', S.pool.has(key) ? 'true' : 'false');
      updatePoolCount();
    });
    box.appendChild(b);
  });
}

function poolItems() {
  return ITEMS.filter((it) => S.pool.has(it.c));
}

function updatePoolCount() {
  $('#poolcount').textContent = t('pool', { n: poolItems().length });
}

function readStats() {
  let s = { answered: 0, correct: 0, runs: 0 };
  try { s = JSON.parse(localStorage.getItem(LS_STATS)) || s; } catch (e) {}
  return s;
}

function updateLifetime() {
  const s = readStats();
  $('#lifetime').textContent = s.runs
    ? t('lifetime', { runs: s.runs, correct: s.correct, answered: s.answered })
    : t('lifetimeNone');
}

function saveStats(correct, total) {
  const s = readStats();
  s.answered += total;
  s.correct += correct;
  s.runs += 1;
  try { localStorage.setItem(LS_STATS, JSON.stringify(s)); } catch (e) {}
  updateLifetime();
}

/* =============================================================
   画面遷移
   ============================================================= */
function show(id) {
  ['setup', 'quiz', 'result'].forEach((k) => {
    $('#' + k).classList.toggle('hidden', k !== id);
  });
  window.scrollTo({ top: 0, behavior: 'auto' });
}

function newRun() {
  const pool = poolItems();
  if (!pool.length) return;
  const n = S.count > 0 ? Math.min(S.count, pool.length) : pool.length;
  start(shuffle(pool).slice(0, n));
}

function start(items) {
  S.queue = items;
  S.i = 0;
  S.log = [];
  show('quiz');
  enterQuestion();
}

/* =============================================================
   出題（選択肢の順番はここで固定する）
   ============================================================= */
function enterQuestion() {
  const it = S.queue[S.i];
  if (!it) return;
  S.opts = shuffle([it.r].concat(it.d))
    .filter((v, i, a) => a.indexOf(v) === i)
    .slice(0, 4);
  S.sel = null;
  S.judged = false;
  paint();

  if (S.audio.auto && S.audio.mode === 'seq') {
    setTimeout(() => TTS.speakSeq(S.opts, 0.8), 220);
  }
}

function paint() {
  const it = S.queue[S.i];
  if (!it) return;

  $('#qnum').textContent = S.i + 1;
  $('#qtotal').textContent = S.queue.length;
  $('#qcat').textContent = t('cat_' + it.c);
  $('#pbar').style.width = (S.i / S.queue.length) * 100 + '%';
  $('#glyph').textContent = it.h;
  $('#tally').textContent = '✓ ' + S.log.filter((x) => x.ok).length;

  // --- 選択肢 ---
  const box = $('#opts');
  box.innerHTML = '';
  S.opts.forEach((v, idx) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'opt';
    b.dataset.val = v;
    b.innerHTML =
      '<span class="key">' + (idx + 1) + '</span>' +
      '<span class="rr"></span>' +
      '<span class="spk" role="img" aria-hidden="true">' +
        '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 9v6h4l5 4V5L8 9H4zm12.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4z"/></svg>' +
      '</span>';
    b.querySelector('.rr').textContent = v;
    b.querySelector('.spk').setAttribute('title', t('optionAria', { n: idx + 1, v }));

    if (S.judged) {
      b.disabled = true;
      if (v === it.r) b.classList.add('correct');
      else if (v === S.sel) b.classList.add('wrong');
      else b.classList.add('dim');
    } else {
      if (v === S.sel) b.classList.add('selected');
      b.addEventListener('click', (ev) => {
        const spk = ev.target.closest('.spk');
        if (spk) { ev.stopPropagation(); TTS.speakOption(v, 0.8); return; }
        select(v, idx);
      });
    }
    box.appendChild(b);
  });

  // --- 通しで聞くボタン（個別モードでは小さめに残す） ---
  const la = $('#listenall');
  la.classList.toggle('compact', S.audio.mode === 'one');

  // --- 確定ボタン ---
  const cf = $('#confirm');
  cf.disabled = S.sel === null || S.judged;
  cf.classList.toggle('hidden', S.judged);
  if (!S.judged && S.sel === null) cf.dataset.hint = t('confirmHint');
  else delete cf.dataset.hint;

  // --- 解説 ---
  const fb = $('#feedback');
  if (!S.judged) {
    fb.classList.add('hidden');
    $('#stamp').className = 'stamp';
    return;
  }
  fb.classList.remove('hidden');

  const ok = S.sel === it.r;
  const stamp = $('#stamp');
  stamp.textContent = t(ok ? 'correct' : 'incorrect');
  stamp.className = 'stamp' + (ok ? ' ok' : '') + ' show';

  $('#verdict').innerHTML = ok
    ? '<b class="ok">' + t('correct') + '</b><span>' + it.h + ' = <em>' + it.r + '</em></span>'
    : '<b class="ng">' + t('incorrect') + '</b><span>' + it.h + ' = <em>' + it.r +
      '</em>　' + t('yourAnswer', { v: S.sel }) + '</span>';

  $('#spec').innerHTML = specHTML(it.h);

  const noteEl = $('#note');
  if (it.n && it.n[S.lang]) {
    noteEl.textContent = it.n[S.lang];
    noteEl.classList.remove('hidden');
  } else {
    noteEl.classList.add('hidden');
  }
}

function select(v, idx) {
  if (S.sel !== null && S.judged) return;
  S.sel = v;
  paint();
  if (S.audio.mode === 'one' || S.audio.auto) TTS.speakOption(v, 0.8);
}

function confirmAnswer() {
  if (S.sel === null || S.judged) return;
  const it = S.queue[S.i];
  S.judged = true;
  S.log.push({ h: it.h, r: it.r, c: it.c, ok: S.sel === it.r, got: S.sel });
  paint();
  TTS.speak(it.h, 0.85);
}

function next() {
  if (!S.judged) return;
  S.i += 1;
  if (S.i >= S.queue.length) finish();
  else enterQuestion();
}

/* =============================================================
   解説
   ============================================================= */
function specHTML(ch) {
  const d = decompose(ch);
  if (!d) return '';
  const rows = [];

  const ci = CHO_INFO[d.cho];
  if (ci) rows.push(specRow(d.cho, t('slotInitial'), t('kindC'), t('type_' + ci.t), ci.n, ci.rr, ci.d[S.lang]));

  const ji = JUNG_INFO[d.jung];
  if (ji) rows.push(specRow(d.jung, t('slotMedial'), t('kindV'), t('type_' + ji.t), '', '', ji.d[S.lang]));

  if (d.jong) {
    const jo = JONG_INFO[d.jong];
    if (jo) rows.push(specRow(d.jong, t('slotFinal'), t('kindF'), t('type_' + jo.t), jo.s, '', jo.d[S.lang]));
  } else {
    rows.push(
      '<div class="spec-row"><span class="jamo">—</span>' +
      '<span class="slot">' + t('slotFinal') + '<br>' + t('kindF') + '</span>' +
      '<span class="who">' + t('noFinal') + '<i>' + t('noFinalDesc') + '</i></span></div>'
    );
  }
  return rows.join('');
}

function specRow(jamo, slot, kind, typeLabel, name, rr, desc) {
  let nameHTML = '';
  if (name) {
    const showRr = S.lang !== 'ja' && rr;
    nameHTML = '<b>' + name + (showRr ? ' (' + rr + ')' : '') + '</b>';
  }
  const chip = typeLabel ? '<span class="typechip">' + typeLabel + '</span>' : '';
  return '<div class="spec-row">' +
    '<span class="jamo">' + jamo + '</span>' +
    '<span class="slot">' + slot + '<br>' + kind + '</span>' +
    '<span class="who">' + nameHTML + chip + '<i>' + desc + '</i></span>' +
    '</div>';
}

/* =============================================================
   結果
   ============================================================= */
function finish() {
  renderResult();
  show('result');
  saveStats(S.log.filter((x) => x.ok).length, S.log.length);
}

function renderResult() {
  const total = S.log.length || S.queue.length;
  const score = S.log.filter((x) => x.ok).length;
  const p = total ? score / total : 0;

  $('#rscore').textContent = score;
  $('#rtotal').textContent = '/ ' + total;
  const grades = t('grade');
  const idx = p === 1 ? 0 : p >= 0.8 ? 1 : p >= 0.5 ? 2 : 3;
  $('#rgrade').textContent = Math.round(p * 100) + '%　' + grades[idx];

  const wrong = S.log.filter((x) => !x.ok);
  const list = $('#missedlist');
  list.innerHTML = '';

  if (!wrong.length) {
    $('#missedTitle').textContent = t('reviewList');
    const p2 = document.createElement('p');
    p2.className = 'allgood';
    p2.textContent = t('allGood');
    list.appendChild(p2);
    $('#review').classList.add('hidden');
  } else {
    $('#missedTitle').textContent = t('missed', { n: wrong.length });
    $('#review').classList.remove('hidden');
    wrong.forEach((w) => {
      const row = document.createElement('div');
      row.className = 'mrow';
      const h = document.createElement('span');
      h.className = 'h';
      h.textContent = w.h;
      const a = document.createElement('span');
      a.className = 'a';
      a.textContent = w.r;
      const miss = document.createElement('i');
      miss.textContent = w.got;
      a.appendChild(miss);
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', t('listenAria', { h: w.h }));
      b.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4zm12.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4z"/></svg>';
      b.addEventListener('click', () => TTS.speak(w.h, 0.8));
      row.appendChild(h);
      row.appendChild(a);
      row.appendChild(b);
      list.appendChild(row);
    });
  }
}

/* =============================================================
   イベント
   ============================================================= */
document.querySelectorAll('.langs button').forEach((b) => {
  b.addEventListener('click', () => setLang(b.dataset.lang));
});

document.querySelectorAll('#segs .seg').forEach((b) => {
  b.addEventListener('click', () => {
    document.querySelectorAll('#segs .seg').forEach((x) => x.setAttribute('aria-pressed', 'false'));
    b.setAttribute('aria-pressed', 'true');
    S.count = parseInt(b.dataset.n, 10);
  });
});

document.querySelectorAll('#genders .seg').forEach((b) => {
  b.addEventListener('click', () => {
    S.audio.gender = b.dataset.gender;
    S.audio.uri = 'auto';
    saveAudio();
    syncAudioControls();
    renderVoices();
    TTS.speakOption('wa', 0.8);
  });
});

document.querySelectorAll('#modes .seg').forEach((b) => {
  b.addEventListener('click', () => {
    S.audio.mode = b.dataset.mode;
    saveAudio();
    syncAudioControls();
    $('#modeNote').textContent = t(S.audio.mode === 'seq' ? 'modeNoteSeq' : 'modeNoteOne');
    $('#listenall').classList.toggle('compact', S.audio.mode === 'one');
  });
});

$('#voiceSelect').addEventListener('change', (e) => {
  S.audio.uri = e.target.value;
  saveAudio();
  TTS.speakOption('wa', 0.8);
});

$('#autoPlay').addEventListener('change', (e) => {
  S.audio.auto = e.target.checked;
  saveAudio();
});

$('#testVoice').addEventListener('click', () => {
  TTS.cancel();
  TTS.speakSeq(['wa', 'wo', 'wae', 'o'], 0.8);
});

$('#start').addEventListener('click', () => {
  TTS.init();
  newRun();
});

$('#listenall').addEventListener('click', () => {
  if (!S.opts.length) return;
  TTS.cancel();
  TTS.speakSeq(S.opts, 0.8);
});

$('#confirm').addEventListener('click', confirmAnswer);
$('#next').addEventListener('click', next);

$('#again').addEventListener('click', newRun);

$('#review').addEventListener('click', () => {
  const wrong = S.log.filter((x) => !x.ok);
  if (!wrong.length) return;
  const items = wrong.map((w) => ITEMS.find((it) => it.h === w.h)).filter(Boolean);
  start(shuffle(items));
});

$('#tosetup').addEventListener('click', () => {
  show('setup');
  updateLifetime();
});

document.querySelectorAll('.audio button').forEach((b) => {
  b.addEventListener('click', () => {
    const it = S.queue[S.i];
    if (it) { TTS.cancel(); TTS.speak(it.h, parseFloat(b.dataset.rate)); }
  });
});

$('#resetstats').addEventListener('click', () => {
  try { localStorage.removeItem(LS_STATS); } catch (e) {}
  updateLifetime();
});

document.addEventListener('keydown', (e) => {
  if ($('#quiz').classList.contains('hidden')) return;
  if (e.target && /^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName)) return;
  if (e.key >= '1' && e.key <= '4') {
    const idx = parseInt(e.key, 10) - 1;
    const v = S.opts[idx];
    if (v === undefined || S.judged) return;
    select(v, idx);
  }
  if (e.key === 'Enter') {
    e.preventDefault();
    if (!S.judged && S.sel !== null) confirmAnswer();
    else if (S.judged) next();
  }
  if (e.key === ' ' && S.judged) { e.preventDefault(); next(); }
});

/* =============================================================
   起動
   ============================================================= */
loadAudio();
S.lang = detectLang();
TTS.init();
setLang(S.lang, false);
