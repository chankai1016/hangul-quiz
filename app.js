/* =============================================================
   한글 자모 테스트 — app.js
   ============================================================= */

const $ = (s) => document.querySelector(s);
const LS_LANG = 'hq.lang';
const LS_STATS = 'hq.stats';

const S = {
  lang: 'ja',
  pool: new Set(['basic', 'tense', 'vowel', 'final']),
  count: 10,
  queue: [],
  i: 0,
  sel: null,
  log: []
};

/* ---------- utils ---------- */
function t(key, vars) {
  const dict = I18N[S.lang] || I18N.ja;
  let s = dict[key];
  if (s === undefined) s = I18N.ja[key];
  if (s === undefined) return key;
  if (Array.isArray(s)) return s;
  if (vars) {
    for (const k in vars) s = s.split('{' + k + '}').join(vars[k]);
  }
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

/* ---------- 音声 / 語音 / speech ---------- */
const TTS = {
  supported: typeof window.speechSynthesis !== 'undefined',
  voice: null,
  available: false,
  init() {
    if (!this.supported) return;
    const pick = () => {
      const vs = window.speechSynthesis.getVoices() || [];
      const k = vs.find((v) => /^ko(-|_)?/i.test(v.lang)) || vs.find((v) => /korean/i.test(v.name));
      this.voice = k || null;
      this.available = !!k;
      const w = $('#tswarn');
      if (w) w.classList.toggle('hidden', this.available);
    };
    pick();
    window.speechSynthesis.addEventListener('voiceschanged', pick);
  },
  speak(text, rate) {
    if (!this.supported) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'ko-KR';
      if (this.voice) u.voice = this.voice;
      u.rate = rate || 0.85;
      u.pitch = 1;
      window.speechSynthesis.speak(u);
    } catch (e) { /* 端末が音声非対応なら無視 */ }
  }
};

/* ---------- 言語 / 語言 / language ---------- */
function detectLang() {
  let saved = null;
  try { saved = localStorage.getItem(LS_LANG); } catch (e) {}
  if (saved && LANGS.indexOf(saved) !== -1) return saved;
  const n = (navigator.language || 'ja').toLowerCase();
  if (n.startsWith('zh')) return 'zh';
  if (n.startsWith('ja')) return 'ja';
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
  paint();
}

function applyStatic() {
  document.querySelectorAll('.langs button').forEach((b) => {
    b.setAttribute('aria-pressed', b.dataset.lang === S.lang ? 'true' : 'false');
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
  $('#resultEyebrow').textContent = t('resultEyebrow');
  $('#again').textContent = t('again');
  $('#review').textContent = t('review');
  $('#tosetup').textContent = t('toSetup');
  $('#foot1').textContent = t('footer1');
  $('#foot2').textContent = t('footer2');
  document.querySelectorAll('.eyebrow[data-i18n]').forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });

  buildChips();
  updatePoolCount();
  updateLifetime();
}

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
        if (S.pool.size === 1) return; // 最後の1つは外せない
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

/* ---------- 成績 / 成績 / stats ---------- */
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

/* ---------- 画面遷移 ---------- */
function show(id) {
  ['setup', 'quiz', 'result'].forEach((k) => {
    $('#' + k).classList.toggle('hidden', k !== id);
  });
  window.scrollTo({ top: 0, behavior: 'auto' });
}

function newRun() {
  const pool = poolItems();
  if (!pool.length) return;
  let q = shuffle(pool);
  const n = S.count > 0 ? Math.min(S.count, q.length) : q.length;
  start(shuffle(pool).slice(0, n));
}

function start(items) {
  S.queue = items;
  S.i = 0;
  S.sel = null;
  S.log = [];
  show('quiz');
  paint();
}

/* ---------- 出題の描画 ---------- */
function current() {
  return S.queue[S.i];
}

function paint() {
  if (!$('#result').classList.contains('hidden')) { renderResult(); return; }
  if ($('#quiz').classList.contains('hidden')) return;

  const it = current();
  if (!it) return;

  $('#qnum').textContent = S.i + 1;
  $('#qtotal').textContent = S.queue.length;
  $('#qcat').textContent = t('cat_' + it.c);
  $('#pbar').style.width = (S.i / S.queue.length) * 100 + '%';
  $('#glyph').textContent = it.h;
  $('#tally').textContent = '✓ ' + S.log.filter((x) => x.ok).length;

  // 選択肢
  const opts = shuffle([it.r].concat(it.d))
    .filter((v, i, a) => a.indexOf(v) === i)
    .slice(0, 4);
  const box = $('#opts');
  box.innerHTML = '';
  opts.forEach((v, idx) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'opt';
    b.innerHTML = '<span class="key">' + (idx + 1) + '</span><span class="rr"></span>';
    b.querySelector('.rr').textContent = v;
    if (S.sel !== null) {
      b.disabled = true;
      if (v === it.r) b.classList.add('correct');
      else if (v === S.sel) b.classList.add('wrong');
      else b.classList.add('dim');
    } else {
      b.addEventListener('click', () => answer(v));
    }
    box.appendChild(b);
  });

  // 判定と解説
  const fb = $('#feedback');
  if (S.sel === null) {
    fb.classList.add('hidden');
    $('#stamp').className = 'stamp';
    return;
  }
  fb.classList.remove('hidden');

  const ok = S.sel === it.r;
  const stamp = $('#stamp');
  stamp.textContent = t(ok ? 'correct' : 'incorrect');
  stamp.className = 'stamp' + (ok ? ' ok' : '') + ' show';

  let verdict;
  if (ok) {
    verdict = '<b class="ok">' + t('correct') + '</b><span>' + it.h + ' = <em>' + it.r + '</em></span>';
  } else {
    verdict = '<b class="ng">' + t('incorrect') + '</b><span>' + it.h + ' = <em>' + it.r +
      '</em>　' + t('yourAnswer', { v: S.sel }) + '</span>';
  }
  $('#verdict').innerHTML = verdict;
  $('#spec').innerHTML = specHTML(it.h);

  const noteEl = $('#note');
  if (it.n && it.n[S.lang]) {
    noteEl.textContent = it.n[S.lang];
    noteEl.classList.remove('hidden');
  } else {
    noteEl.classList.add('hidden');
  }
}

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
  // 日本語では字母名だけ、他言語では字母名＋ローマ字を併記
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

/* ---------- 回答 ---------- */
function answer(val) {
  if (S.sel !== null) return;
  const it = current();
  S.sel = val;
  S.log.push({ h: it.h, r: it.r, c: it.c, ok: val === it.r, got: val });
  paint();
  TTS.speak(it.h, 0.85);
}

function next() {
  if (S.sel === null) return;
  S.i += 1;
  S.sel = null;
  if (S.i >= S.queue.length) finish();
  else paint();
}

/* ---------- 結果 ---------- */
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

/* ---------- イベント ---------- */
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

$('#start').addEventListener('click', () => {
  TTS.init();
  newRun();
});

$('#next').addEventListener('click', next);

$('#again').addEventListener('click', newRun);

$('#review').addEventListener('click', () => {
  const wrong = S.log.filter((x) => !x.ok);
  if (!wrong.length) return;
  const items = wrong
    .map((w) => ITEMS.find((it) => it.h === w.h))
    .filter(Boolean);
  start(shuffle(items));
});

$('#tosetup').addEventListener('click', () => {
  show('setup');
  updateLifetime();
});

document.querySelectorAll('.audio button').forEach((b) => {
  b.addEventListener('click', () => {
    const it = current();
    if (it) TTS.speak(it.h, parseFloat(b.dataset.rate));
  });
});

$('#resetstats').addEventListener('click', () => {
  try { localStorage.removeItem(LS_STATS); } catch (e) {}
  updateLifetime();
});

document.addEventListener('keydown', (e) => {
  if ($('#quiz').classList.contains('hidden')) return;
  if (e.key >= '1' && e.key <= '4') {
    const b = document.querySelectorAll('.opt')[parseInt(e.key, 10) - 1];
    if (b && !b.disabled) b.click();
  }
  if (e.key === 'Enter' || e.key === ' ') {
    if (S.sel !== null) { e.preventDefault(); next(); }
  }
});

/* ---------- 起動 ---------- */
S.lang = detectLang();
TTS.init();
setLang(S.lang, false);
