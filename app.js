'use strict';
// ───────── 데이터 ─────────
const BANK = window.BANK, PSG = window.PSG, CONCEPTS = window.CONCEPTS, FLASH = window.FLASH, GRAMMAR = window.GRAMMAR || {}, DICT = window.DICT || {}, DICT_FORM = window.DICT_FORM || {};
const QMAP = {}; BANK.forEach(q => { QMAP[q.id] = q; });
const CMAP = {}; CONCEPTS.forEach(c => { CMAP[c.id] = c; });
const BY_C = {}; BANK.forEach(q => { (BY_C[q.c] = BY_C[q.c] || []).push(q.id); });
const BY_G = {}; BANK.forEach(q => { if (q.g) (BY_G[q.g] = BY_G[q.g] || []).push(q.id); });
const DLABEL = ['', '기본', '중급', '고급', '최고난도'];
const MK = ['(A)', '(B)', '(C)', '(D)'], LT = ['A', 'B', 'C', 'D'];
const PARTS = [5, 6, 7], PNAME = { 5: 'Part 5 · 단문 빈칸', 6: 'Part 6 · 장문 빈칸', 7: 'Part 7 · 독해' };

// ───────── 저장 ─────────
const KEY = 'toeic_rc_v1';
function blank() { return { v: 1, att: {}, days: {}, conf: {}, cdone: {}, mocks: [], fl: {}, resume: {}, myw: {}, set: { goal: 40, exam: '2026-11-29' } }; }
let S;
try { S = JSON.parse(localStorage.getItem(KEY)); } catch (e) { S = null; }
if (!S && window.__NATIVE_STATE) S = window.__NATIVE_STATE;
if (!S) S = blank();
S = Object.assign(blank(), S); S.set = Object.assign(blank().set, S.set);
const NATIVE = window.webkit && window.webkit.messageHandlers;
let CLOUD = null, cloudTimer = null;
function save() {
  S.at = Date.now();
  const t = JSON.stringify(S);
  try { localStorage.setItem(KEY, t); } catch (e) {}
  try { if (NATIVE && NATIVE.save) NATIVE.save.postMessage(t); } catch (e) {}
  if (CLOUD) { clearTimeout(cloudTimer); cloudTimer = setTimeout(() => { CLOUD.set({ json: JSON.stringify(S), at: S.at }).catch(() => {}); }, 1500); }
}
const today = () => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
function record(qid, ok) {
  const a = S.att[qid] || (S.att[qid] = { n: 0, c: 0, st: 0, w: false, wr: 0 });
  a.n++; a.last = today();
  if (ok) { a.c++; a.st++; if (a.w && a.st >= 2) a.w = false; }
  else { a.st = 0; a.w = true; a.wr++; }
  const d = S.days[today()] || (S.days[today()] = { n: 0, c: 0 });
  d.n++; if (ok) d.c++;
  save();
}

// ───────── 통계 ─────────
function conceptStat(cid) {
  let n = 0, c = 0, solved = 0;
  (BY_C[cid] || []).forEach(id => { const a = S.att[id]; if (a) { n += a.n; c += a.c; solved++; } });
  return { n, c, solved, total: (BY_C[cid] || []).length, acc: n ? c / n : null };
}
function overall(filter) {
  let n = 0, c = 0, solved = 0, total = 0;
  BANK.forEach(q => { if (filter && !filter(q)) return; total++; const a = S.att[q.id]; if (a) { n += a.n; c += a.c; solved++; } });
  return { n, c, solved, total, acc: n ? c / n : null };
}
function weakList() {
  return CONCEPTS.map(c => ({ c, s: conceptStat(c.id) })).filter(x => x.s.n >= 4)
    .map(x => Object.assign(x, { score: (x.s.c + 1) / (x.s.n + 2) })).sort((a, b) => a.score - b.score);
}
function wrongIds() { return BANK.filter(q => (S.att[q.id] && S.att[q.id].w) || S.conf[q.id]).map(q => q.id); }
function streakDays() {
  let k = 0; const d = new Date();
  if (!S.days[today()]) d.setDate(d.getDate() - 1);
  for (;;) { const key = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); if (S.days[key] && S.days[key].n > 0) { k++; d.setDate(d.getDate() - 1); } else break; }
  return k;
}
function dday() { const e = new Date(S.set.exam + 'T00:00:00'); const t = new Date(today() + 'T00:00:00'); return Math.round((e - t) / 86400000); }
const pct = v => v == null ? '—' : Math.round(v * 100) + '%';
const lvl = v => v == null ? '' : v < 0.6 ? 'low' : v < 0.8 ? 'mid' : 'high';

// ───────── 유틸 ─────────
const $ = s => document.querySelector(s);
function esc(t) { return String(t).replace(/[&<>"]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m])); }
function md(t) { return esc(t).replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>').replace(/`([^`]+)`/g, '<code>$1</code>'); }
function enq(t) { return esc(t).replace(/-{4,}/g, '<span class="blank cur">&nbsp;</span>'); }
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function toast(t) { const el = document.createElement('div'); el.className = 'toast'; el.textContent = t; document.body.appendChild(el); setTimeout(() => el.remove(), 1800); }
function sheet(html) { closeSheet(); const bg = document.createElement('div'); bg.className = 'sheet-bg'; bg.id = 'sheet'; bg.innerHTML = '<div class="sheet"><div class="grab"></div>' + html + '</div>'; bg.addEventListener('click', e => { if (e.target === bg) closeSheet(); }); document.body.appendChild(bg); }
function ask(msg, yes, fn) {
  sheet(`<div class="q" style="font-weight:600">${esc(msg)}</div><div class="grid2" style="margin-top:12px"><button class="btn line" onclick="closeSheet()">취소</button><button class="btn" id="askYes">${esc(yes)}</button></div>`);
  $('#askYes').onclick = () => { closeSheet(); fn(); };
}
function closeSheet() { const s = $('#sheet'); if (s) s.remove(); }
const dtag = d => `<span class="tag d${d}">${DLABEL[d]}</span>`;
const ptag = p => `<span class="tag">Part ${p}</span>`;

// ───────── 지문 렌더링 ─────────
// 지문 문자열 규칙: {n} 빈칸, [n] 문장 삽입 위치, **굵게**
function inl(t, cur) {
  return esc(t).replace(/\{(\d)\}/g, (m, n) => `<span class="blank ${+n === cur ? 'cur' : ''}">(${n})</span>`)
    .replace(/\[(\d)\]/g, '<span class="ins">[$1]</span>').replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
}
function docHTML(d, cur) {
  let h = '';
  if (d.k) h += `<div class="doc-k">${esc(d.k)}</div>`;
  if (d.h && d.h.length) h += `<div class="doc-h">${d.h.map(([k, v]) => `<div><b>${esc(k)}</b> ${inl(v, cur)}</div>`).join('')}</div>`;
  if (d.t) h += `<div class="doc-t">${inl(d.t, cur)}</div>`;
  (d.b || []).forEach(x => {
    if (x.tb) h += `<table class="dt"><tr>${x.tb[0].map(c => `<th>${inl(c, cur)}</th>`).join('')}</tr>${x.tb.slice(1).map(r => `<tr>${r.map(c => `<td>${inl(c, cur)}</td>`).join('')}</tr>`).join('')}</table>`;
    else if (x.ch) h += `<div class="chat"><i>${esc(x.ch[0])}</i><b>${esc(x.ch[1])}</b>: ${inl(x.ch[2], cur)}</div>`;
    else h += `<p>${inl(x, cur)}</p>`;
  });
  return `<div class="doc">${h}</div>`;
}
let PSG_FULL = false;
function psgHTML(g, cur, inkable) {
  const p = PSG[g]; if (!p) return '';
  const body = p.docs.map(d => docHTML(d, cur)).join('');
  return `<div class="psg ${PSG_FULL ? 'full' : ''}"><div class="psg-sc">${inkable ? `<div class="inkw ${INK.on ? 'inking' : ''}" id="inkw" data-q="${g}">${body}<canvas class="ink" id="ink"></canvas></div>` : body}</div>
  <button class="psg-tg" onclick="PSG_FULL=!PSG_FULL;render()">${PSG_FULL ? '지문 접기 ▴' : '지문 전체 펼치기 ▾'}</button></div>`;
}
function setInfo(q) { if (!q.g) return ''; const ids = BY_G[q.g]; return `${ids.indexOf(q.id) + 1} / ${ids.length}번 문항`; }
function qText(q) { return q.p === 5 ? enq(q.q) : esc(q.q); }

// ───────── 라우팅 ─────────
let view = 'home', P = {}, QS = null, timerId = null;
const TABS = [['home', '홈', '<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>'], ['practice', '문제', '<path d="M5 4h14v16H5z"/><path d="M8 9h8M8 13h8M8 17h5"/>'],
  ['wrong', '오답', '<path d="M12 3l9 16H3z"/><path d="M12 10v4M12 17v.5"/>'], ['concepts', '문법', '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 21V5"/>'], ['stats', '분석', '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>']];
function go(v, p) { if (timerId && v !== 'mockrun') { clearInterval(timerId); timerId = null; } if (v === 'quiz') snapQS(); view = v; P = p || {}; render(); window.scrollTo(0, 0); }
function renderTabs() {
  const hide = view === 'quiz' || view === 'mockrun';
  $('#tabbar').style.display = hide ? 'none' : 'flex';
  document.body.style.paddingBottom = hide ? 'env(safe-area-inset-bottom)' : '';
  const root = { home: 'home', practice: 'practice', quiz: 'practice', result: 'practice', wrong: 'wrong', concepts: 'concepts', concept: 'concepts', stats: 'stats' }[view] || 'home';
  $('#tabbar').innerHTML = TABS.map(([k, l, ic]) => `<button class="${root === k ? 'on' : ''}" onclick="go('${k}')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ic}</svg>${l}</button>`).join('');
}
function render() {
  renderTabs();
  const f = { home, practice, quiz, result, wrong, concepts, concept, stats, mock, mockrun, mockresult, flash, settings }[view];
  $('#app').innerHTML = '<div class="wrap">' + f() + '</div>';
  closePop();
  inkMount();
}

// ───────── 홈 ─────────
function home() {
  const o = overall(), td = S.days[today()] || { n: 0, c: 0 }, w = weakList().slice(0, 4), wn = wrongIds().length, dd = dday();
  const goalP = Math.min(1, td.n / S.set.goal);
  const un = BANK.filter(q => !S.att[q.id]);
  return `
  <div class="top"><div><div class="sub">TOEIC RC · 목표 850+</div><h1>${dd > 0 ? 'D-' + dd : dd === 0 ? 'D-DAY' : '시험일 지남'}</h1></div>
    <button class="icon-btn" onclick="go('settings')">설정</button></div>
  <div class="hgrid"><div class="hl"><div class="card">
    <div class="top"><b>오늘 목표</b><span class="sub">${td.n} / ${S.set.goal}문항 · 연속 ${streakDays()}일</span></div>
    <div class="bar ${goalP >= 1 ? 'high' : ''}" style="margin-top:10px"><i style="width:${goalP * 100}%"></i></div>
    <div class="grid3" style="margin-top:14px">
      <div class="stat"><b>${o.solved}</b><span>푼 문제 / ${o.total}</span></div>
      <div class="stat"><b>${pct(o.acc)}</b><span>전체 정답률</span></div>
      <div class="stat"><b>${wn}</b><span>오답노트</span></div>
    </div>
  </div>
  <div class="grid2">
    ${resumeInfo('practice') ? `<button class="btn" onclick="resumeQS('practice')">이어서 풀기 <span style="opacity:.8;font-weight:500">· ${resumeInfo('practice').left}문제 남음</span></button>` : `<button class="btn" onclick="startPractice({p:5,n:30,order:'new',title:'Part 5 30문항'})">Part 5 30문항</button>`}
    <button class="btn ghost" onclick="go('mock')">RC 모의고사 100</button>
  </div>
  <div class="grid2" style="margin-top:10px">
    ${resumeInfo('wrong') ? `<button class="btn line" onclick="resumeQS('wrong')">오답 이어서 · ${resumeInfo('wrong').left}</button>` : `<button class="btn line" onclick="startWrong()" ${wn ? '' : 'disabled'}>오답 다시 풀기</button>`}
    <button class="btn line" onclick="go('flash')">단어 카드</button>
  </div>
  ${basicCard(un)}
  ${PARTS.map(p => { const s = overall(q => q.p === p), u = un.filter(q => q.p === p).length, sets = p === 5 ? 0 : new Set(BANK.filter(q => q.p === p).map(q => q.g)).size;
    return `<div class="card"><div class="top"><b>${PNAME[p]}</b><span class="sub">${s.solved}/${s.total}${sets ? ` · 지문 ${sets}개` : ''} · ${pct(s.acc)}</span></div>
    <div class="bar ${lvl(s.acc)}" style="margin:8px 0 10px"><i style="width:${s.total ? s.solved / s.total * 100 : 0}%"></i></div>
    <div class="grid2"><button class="btn ghost" onclick="startPractice({p:${p},n:${p === 5 ? 30 : p === 6 ? 16 : 20},order:'new',title:'Part ${p}'})">${p === 5 ? '30문항' : p === 6 ? '지문 4개' : '20문항 내외'}</button>
    <button class="btn line" ${u ? '' : 'disabled'} onclick="startPractice({p:${p},un:1,n:${p === 5 ? 30 : 16},order:'rand',title:'Part ${p} 안 푼 문제'})">안 푼 문제 ${u}</button></div></div>`; }).join('')}
  </div><div class="hr">
  <h2>약한 유형</h2>
  ${w.length ? w.map(x => conceptRow(x.c, x.s)).join('') : '<div class="card sub">유형당 4문제 이상 풀면 약한 유형을 찾아드려요.</div>'}
  </div><div class="hd">
  <h2>난이도별 Part 5</h2>
  <div class="grid2">${[1, 2, 3, 4].map(d => `<button class="btn line" onclick="startPractice({p:5,d:[${d}],n:20,title:'Part 5 ${DLABEL[d]}'})">${DLABEL[d]} <span class="sub">${BANK.filter(q => q.p === 5 && q.d === d).length}</span></button>`).join('')}</div>
  </div></div>`;
}
// 기본 난이도만 모아 푸는 카드
function basicCard(un) {
  const b = BANK.filter(q => q.d === 1); if (!b.length) return '';
  const s = overall(q => q.d === 1), left = un.filter(q => q.d === 1).length;
  const N = { 5: 20, 6: 8, 7: 10 };
  return `<div class="card"><div class="top"><b>기초 다지기</b><span class="sub">${s.solved}/${s.total} · ${pct(s.acc)}</span></div>
    <div class="bar ${lvl(s.acc)}" style="margin:8px 0 6px"><i style="width:${s.solved / s.total * 100}%"></i></div>
    <div class="sub" style="margin-bottom:10px">기본 난이도만 · 안 푼 문제부터 · 남은 문제 ${left}</div>
    <div class="grid3">${PARTS.map(p => { const n = b.filter(q => q.p === p).length; return n ? `<button class="btn ghost" style="padding:11px 4px" onclick="startPractice({p:${p},d:[1],n:${N[p]},order:'new',title:'기초 · Part ${p}'})">Part ${p} <span style="opacity:.7;font-weight:500">${n}</span></button>` : ''; }).join('')}</div></div>`;
}
function conceptRow(c, s) {
  return `<div class="card" onclick="go('concept',{id:'${c.id}'})">
    <div class="top"><div><span class="tag">P${c.p}</span><b>${esc(c.name)}</b></div><b>${pct(s.acc)}</b></div>
    <div class="bar ${lvl(s.acc)}" style="margin-top:8px"><i style="width:${(s.acc || 0) * 100}%"></i></div>
    <div class="sub" style="margin-top:6px">${s.c}/${s.n} 정답 · ${s.solved}/${s.total}문항 풀이</div></div>`;
}

// ───────── 문제 설정 ─────────
let PSET = { p: 0, un: 0, d: [1, 2, 3, 4], n: 30, order: 'new', cs: [] };
function practice() {
  const cs = CONCEPTS.filter(c => !PSET.p || c.p === PSET.p);
  const units = [...new Set(cs.map(c => c.p + '|' + c.unit))];
  const pool = poolFor(PSET);
  return `<h1>문제 풀기</h1><div class="sub">총 ${BANK.length}문항 · 조건에 맞는 문제 ${pool.length}개 · 지문 문제는 세트 단위로 묶어서 출제</div>
  <div class="card"><b>파트</b><div class="seg">${[[0, '전체'], [5, 'Part 5'], [6, 'Part 6'], [7, 'Part 7']].map(([v, l]) => `<button class="${PSET.p === v ? 'on' : ''}" onclick="PSET.p=${v};PSET.cs=[];render()">${l}</button>`).join('')}</div>
  <b>풀이 범위</b><div class="seg">${[[0, '전체'], [1, '안 푼 문제만']].map(([v, l]) => `<button class="${PSET.un === v ? 'on' : ''}" onclick="PSET.un=${v};render()">${l}</button>`).join('')}</div>
  <b>난이도</b><div class="seg">${[1, 2, 3, 4].map(d => `<button class="${PSET.d.includes(d) ? 'on' : ''}" onclick="togD(${d})">${DLABEL[d]}</button>`).join('')}</div>
  <b>문항 수</b><div class="seg">${[10, 20, 30, 50].map(n => `<button class="${PSET.n === n ? 'on' : ''}" onclick="PSET.n=${n};render()">${n}</button>`).join('')}</div>
  <b>순서</b><div class="seg">${[['new', '안 푼 것 먼저'], ['rand', '무작위'], ['weak', '약점 우선']].map(([v, l]) => `<button class="${PSET.order === v ? 'on' : ''}" onclick="PSET.order='${v}';render()">${l}</button>`).join('')}</div></div>
  <div class="card"><div class="top"><b>유형 선택</b><button class="sub" onclick="PSET.cs=[];render()">전체 해제</button></div>
  <div class="sub" style="margin:4px 0 8px">선택하지 않으면 전체 유형에서 출제</div>
  ${units.map(u => { const [p, name] = u.split('|'); return `<div style="margin-top:8px"><div class="sub">P${p} · ${esc(name)}</div>${cs.filter(c => c.unit === name && c.p == p).map(c => `<button class="chip ${PSET.cs.includes(c.id) ? 'on' : ''}" onclick="togC('${c.id}')">${esc(c.name)} <span style="opacity:.6">${(BY_C[c.id] || []).length}</span></button>`).join('')}</div>`; }).join('')}
  </div>
  <button class="btn" onclick="startPractice(PSET)" ${pool.length ? '' : 'disabled'}>${Math.min(PSET.n, pool.length)}문항 내외 시작</button>`;
}
function togD(d) { const i = PSET.d.indexOf(d); if (i >= 0) { if (PSET.d.length > 1) PSET.d.splice(i, 1); } else PSET.d.push(d); render(); }
function togC(id) { const i = PSET.cs.indexOf(id); if (i >= 0) PSET.cs.splice(i, 1); else PSET.cs.push(id); render(); }
function poolFor(o) {
  return BANK.filter(q => (!o.un || !S.att[q.id]) && (!o.p || q.p === o.p) && (!o.d || o.d.includes(q.d)) && (!o.cs || !o.cs.length || o.cs.includes(q.c)));
}
// 지문 문제는 같은 지문의 문항을 붙여서(순서대로) 넣는다
function expandSets(pool, n, inPool) {
  const out = [], seen = new Set();
  for (const q of pool) {
    if (out.length >= n) break;
    if (seen.has(q.id)) continue;
    if (q.g) { BY_G[q.g].forEach(id => { if (!seen.has(id) && (!inPool || inPool.has(id))) { seen.add(id); out.push(id); } }); }
    else { seen.add(q.id); out.push(q.id); }
  }
  return out;
}
function startPractice(o) {
  o = Object.assign({ p: 0, d: [1, 2, 3, 4], n: 30, order: 'new', cs: [] }, o);
  let pool = poolFor(o);
  if (o.order === 'new') pool = [...shuffle(pool.filter(q => !S.att[q.id])), ...shuffle(pool.filter(q => S.att[q.id]))];
  else if (o.order === 'weak') { const sc = id => { const s = conceptStat(QMAP[id].c); return s.n ? (s.c + 1) / (s.n + 2) : 0.5; }; pool = shuffle(pool).sort((a, b) => sc(a.id) - sc(b.id)); }
  else pool = shuffle(pool);
  const ids = expandSets(pool, o.n, new Set(pool.map(q => q.id)));
  if (!ids.length) return toast('조건에 맞는 문제가 없어요');
  INK.s = {}; PSG_FULL = false;
  QS = { ids, i: 0, mode: o.mode || 'practice', res: {}, picks: {}, pick: null, shown: false, title: o.title || '문제 풀기' };
  go('quiz');
}
function startWrong() { const ids = expandSets(shuffle(wrongIds().map(id => QMAP[id])), 9999, new Set(wrongIds())); if (!ids.length) return toast('오답이 없어요'); QS = { ids, i: 0, mode: 'wrong', res: {}, picks: {}, pick: null, shown: false, title: '오답 다시 풀기' }; go('quiz'); }

// ───────── 풀이 화면 ─────────
function optHTML(q, k, cl, extra, onclick) {
  return `<button class="opt ${cl}${extra || ''}" onclick="${onclick}"><span class="n">${LT[k]}</span><span class="ot ${/[가-힣]/.test(q.o[k]) ? '' : 'en'}">${esc(q.o[k])}${extra && extra.includes('hasw') ? whyH(q, k) : ''}</span></button>`;
}

// ───────── 지문 세트 묶음 화면 (Part 6·7) ─────────
function grp(ids, i) { const g = QMAP[ids[i]].g; if (!g) return [i, i + 1]; let a = i, b = i + 1; while (a > 0 && QMAP[ids[a - 1]].g === g) a--; while (b < ids.length && QMAP[ids[b]].g === g) b++; return [a, b]; }
function sqHead(q, n) { return `<div class="sq-h"><span class="sq-n">${n}</span>${CMAP[q.c] ? `<span class="tag">${esc(CMAP[q.c].name)}</span>` : ''}${dtag(q.d)}</div>`; }
function quizSet() {
  const [a, b] = grp(QS.ids, QS.i); if (QS.i !== a) QS.i = a;
  const gids = QS.ids.slice(a, b), q0 = QMAP[gids[0]], sh = gids.every(id => id in QS.res);
  QS.sp = QS.sp || {}; const pk = id => sh ? (QS.picks || {})[id] : QS.sp[id];
  const all = gids.every(id => pk(id) != null);
  const nc = gids.filter(id => QS.res[id]).length;
  const head = `<div class="top"><div>${ptag(q0.p)}<span class="tag">${PSG[q0.g].docs.length > 1 ? (PSG[q0.g].docs.length === 3 ? '삼중 지문' : '이중 지문') : '단일 지문'} · ${gids.length}문항</span></div>${inkBar()}</div>`;
  const qs = gids.map((id, j) => { const q = QMAP[id], p = pk(id), ok = p === q.a;
    return `<div class="sq" id="sq${id}">${sqHead(q, (a + j + 1) + '.')}<div class="q en">${qText(q)}</div>
    ${q.o.map((t, k) => { let cl = ''; if (sh) { if (k === q.a) cl = 'right'; else if (k === p) cl = 'wrong'; } else if (k === p) cl = 'sel';
      return optHTML(q, k, cl, sh ? `${k === p && k !== q.a ? ' open' : ''}${q.w && k !== q.a ? ' hasw' : ''}` : '', `setTap(this,${id},${k})`); }).join('')}
    ${sh ? `<div class="exp ${ok ? 'ok' : 'no'}"><b>${ok ? '정답' : p == null ? '미응답 · 정답 ' + MK[q.a] : '오답 · 정답 ' + MK[q.a]}</b><br>${md(q.e)}</div>
      <div class="row" style="flex-wrap:wrap"><button class="chip c" onclick="showConcept('${q.c}')">유형 정리</button><button class="chip ${S.conf[id] ? 'on' : ''}" onclick="togConf(${id})">${S.conf[id] ? '헷갈림 표시됨' : '헷갈림 표시'}</button></div>` : ''}</div>`; }).join('');
  return `<div class="top" style="margin-top:4px"><button class="icon-btn" onclick="quitQuiz()">✕</button>
    <span class="sub">${esc(QS.title)} · ${a + 1}–${b} / ${QS.ids.length}</span><span style="width:40px"></span></div>
  <div class="bar" style="margin:10px 0 14px"><i style="width:${Object.keys(QS.res).length / QS.ids.length * 100}%"></i></div>
  <div class="qa"><div class="qa-l">${head}${psgHTML(q0.g, null, true)}</div><div class="qa-r">
  ${sh ? `<div class="sq-sum ${nc === gids.length ? 'ok' : ''}">${gids.length}문항 중 ${nc}개 정답${q0.w !== undefined ? ' · 오답 보기를 누르면 이유가 보여요' : ''}</div>` : `<div class="sub" style="margin-bottom:4px">지문 하나에 딸린 ${gids.length}문항을 모두 고른 뒤 한 번에 채점해요</div>`}
  ${qs}
  <div class="navrow"><button class="btn line" onclick="prevQ()" ${a ? '' : 'disabled'}>‹ 이전</button>
  ${sh ? `<button class="btn" onclick="nextQ()">${b < QS.ids.length ? '다음 ›' : '결과 보기'}</button>` : `<button class="btn" id="chkbtn" onclick="checkSet()" ${all ? '' : 'disabled'}>${gids.length}문항 채점</button>`}</div>
  </div></div><div class="sub" style="text-align:center;margin-top:14px">${q0.g} · #${gids.join(', #')}</div>`;
}
function setTap(el, id, k) {
  const [a, b] = grp(QS.ids, QS.i), gids = QS.ids.slice(a, b);
  if (gids.every(x => x in QS.res)) { el.classList.toggle('open'); return; }
  QS.sp = QS.sp || {}; QS.sp[id] = k;
  el.parentElement.querySelectorAll('.opt').forEach(o => o.classList.remove('sel')); el.classList.add('sel');
  const btn = document.getElementById('chkbtn'); if (btn) btn.disabled = !gids.every(x => QS.sp[x] != null);
}
function checkSet() {
  const [a, b] = grp(QS.ids, QS.i), gids = QS.ids.slice(a, b); QS.picks = QS.picks || {};
  if (!gids.every(x => QS.sp[x] != null)) return;
  gids.forEach(id => { const q = QMAP[id], ok = QS.sp[id] === q.a; QS.res[id] = ok; QS.picks[id] = QS.sp[id]; record(id, ok); });
  snapQS(); render(); window.scrollTo(0, 0);
}
function quiz() {
  if (QMAP[QS.ids[QS.i]].g) return quizSet();
  const q = QMAP[QS.ids[QS.i]], c = CMAP[q.c], sh = QS.shown, ok = QS.pick === q.a;
  const head = `<div class="top"><div>${ptag(q.p)}${dtag(q.d)}<span class="tag">${esc(c.name)}</span></div>${inkBar()}</div>`;
  const qblock = q.g ? `<div class="qno">${setInfo(q)}</div><div class="q en">${qText(q)}</div>` : '';
  return `<div class="top" style="margin-top:4px"><button class="icon-btn" onclick="quitQuiz()">✕</button>
    <span class="sub">${esc(QS.title)} · ${QS.i + 1} / ${QS.ids.length}</span><span style="width:40px"></span></div>
  <div class="bar" style="margin:10px 0 14px"><i style="width:${Object.keys(QS.res).length / QS.ids.length * 100}%"></i></div>
  <div class="qa"><div class="qa-l">${head}
  ${q.g ? psgHTML(q.g, q.k, true) : `<div class="inkw ${INK.on ? 'inking' : ''}" id="inkw" data-q="${q.id}"><div class="q en">${qText(q)}</div><canvas class="ink" id="ink"></canvas></div>`}
  </div><div class="qa-r">${qblock}
  ${q.o.map((t, k) => { let cl = ''; if (sh) { if (k === q.a) cl = 'right'; else if (k === QS.pick) cl = 'wrong'; } else if (k === QS.pick) cl = 'sel';
    return optHTML(q, k, cl, sh ? `${k === QS.pick && k !== q.a ? ' open' : ''}${q.w && k !== q.a ? ' hasw' : ''}` : '', `optTap(this, ${k})`); }).join('')}
  ${sh && q.w ? '<div class="why-hint">보기를 누르면 왜 틀렸는지 보여요</div>' : ''}
  ${sh ? `<div class="exp ${ok ? 'ok' : 'no'}"><b>${ok ? '정답' : '오답 · 정답 ' + MK[q.a]}</b><br>${md(q.e)}${q.tr ? `<span class="tr">${esc(q.tr)}</span>` : ''}</div>
    <div class="row" style="flex-wrap:wrap"><button class="chip c" onclick="showConcept('${c.id}')">유형 정리: ${esc(c.name)}</button>
    <button class="chip ${S.conf[q.id] ? 'on' : ''}" onclick="togConf(${q.id})">${S.conf[q.id] ? '헷갈림 표시됨' : '헷갈림 표시'}</button></div>
    <div class="navrow"><button class="btn line" onclick="prevQ()" ${QS.i ? '' : 'disabled'}>‹ 이전</button><button class="btn" onclick="nextQ()">${QS.i + 1 < QS.ids.length ? '다음 문제 ›' : '결과 보기'}</button></div>`
  : `<div class="navrow"><button class="btn line" onclick="prevQ()" ${QS.i ? '' : 'disabled'}>‹ 이전</button><button class="btn" onclick="check()" ${QS.pick == null ? 'disabled' : ''}>정답 확인</button></div>`}
  </div></div>
  <div class="sub" style="text-align:center;margin-top:14px">#${q.id}${q.g ? ' · ' + q.g : ''}</div>`;
}
function pick(k) { if (QS.shown) return; QS.pick = k; render(); }
function check() { const q = QMAP[QS.ids[QS.i]]; if (QS.pick == null) return; const ok = QS.pick === q.a; QS.res[q.id] = ok; (QS.picks = QS.picks || {})[q.id] = QS.pick; record(q.id, ok); QS.shown = true; snapQS(); render(); }
function gotoQ(i) {
  const prevG = QMAP[QS.ids[QS.i]].g;
  if (QMAP[QS.ids[i]].g) i = grp(QS.ids, i)[0];
  QS.i = i; const id = QS.ids[i]; QS.picks = QS.picks || {};
  if (QMAP[id].g !== prevG) PSG_FULL = false;
  if (id in QS.res) { QS.pick = id in QS.picks ? QS.picks[id] : null; QS.shown = true; } else { QS.pick = null; QS.shown = false; }
  render(); window.scrollTo(0, 0);
}
function prevQ() { if (QS.i > 0) gotoQ(grp(QS.ids, QS.i - 1)[0]); }
function nextQ() { const e = grp(QS.ids, QS.i)[1]; if (e < QS.ids.length) gotoQ(e); else go('result'); }
function quitQuiz() {
  snapQS();
  if (QS.mode === 'wrong') { const r = S.resume.wrong; if (r) toast(`저장했어요 · ${r.ids.length - r.i}문제 남음`); go('wrong'); return; }
  if (Object.keys(QS.res).length) go('result'); else go('home');
}
function snapQS() {
  if (!QS) return; const k = QS.mode === 'wrong' ? 'wrong' : 'practice';
  S.resume = S.resume || {};
  let i = QS.ids.findIndex(id => !(id in QS.res));
  if (i < 0) delete S.resume[k];
  else S.resume[k] = { ids: QS.ids, i, res: QS.res, picks: QS.picks || {}, title: QS.title, mode: QS.mode };
  save();
}
function resumeInfo(k) { const r = S.resume && S.resume[k]; if (!r) return null; const left = r.ids.length - r.i; return left > 0 ? { r, left } : null; }
function resumeQS(k) {
  const x = resumeInfo(k); if (!x) return;
  QS = { ids: x.r.ids.filter(id => QMAP[id]), i: x.r.i, mode: x.r.mode, res: x.r.res || {}, picks: x.r.picks || {}, pick: null, shown: false, title: x.r.title };
  PSG_FULL = false; go('quiz');
}
function togConf(id) { if (S.conf[id]) delete S.conf[id]; else S.conf[id] = 1; save(); render(); }
function showConcept(id) { sheet(conceptBody(CMAP[id], true)); }

// ───────── 필기 ─────────
const INK = { on: false, col: '#e5484d', er: false, s: {}, pen: false };
const INK_COLS = ['#e5484d', '#2f6fde', '#1f9d55'];
function inkBar() {
  if (!INK.on) return `<button class="inkbtn" onclick="inkToggle()">✎ 필기</button>`;
  return `<div class="inkbar">${INK_COLS.map(c => `<button class="dot ${!INK.er && INK.col === c ? 'on' : ''}" style="--c:${c}" onclick="INK.col='${c}';INK.er=false;inkBarRefresh()"></button>`).join('')}
    <button class="inkbtn ${INK.er ? 'on' : ''}" onclick="INK.er=!INK.er;inkBarRefresh()">지우개</button>
    <button class="inkbtn" onclick="inkClear()">전체 지우기</button>
    <button class="inkbtn on" onclick="inkToggle()">완료</button></div>`;
}
function inkToggle() { INK.on = !INK.on; INK.er = false; render(); }
function inkBarRefresh() { const b = document.querySelector('.inkbar'); if (b) b.outerHTML = inkBar(); }
function inkClear() { const w = $('#inkw'); if (!w) return; INK.s[w.dataset.q] = []; inkDraw(); }
function inkKey() { const w = $('#inkw'); return w ? w.dataset.q : null; }
function inkStroke(ctx, st) {
  const p = st.p; if (!p.length) return;
  ctx.globalCompositeOperation = st.e ? 'destination-out' : 'source-over';
  ctx.strokeStyle = st.c; ctx.lineWidth = st.e ? 22 : 2.4; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(p[0][0], p[0][1]);
  if (p.length === 1) ctx.lineTo(p[0][0] + 0.1, p[0][1] + 0.1);
  for (let i = 1; i < p.length; i++) ctx.lineTo(p[i][0], p[i][1]);
  ctx.stroke();
}
function inkDraw() {
  const cv = $('#ink'); if (!cv) return; const ctx = cv.getContext('2d'), dpr = window.devicePixelRatio || 1;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, cv.width, cv.height); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  (INK.s[inkKey()] || []).forEach(st => inkStroke(ctx, st));
}
let inkRO = null;
function inkMount() {
  const w = $('#inkw'), cv = $('#ink'); if (inkRO) { inkRO.disconnect(); inkRO = null; } if (!w || !cv) return;
  const size = () => { const dpr = window.devicePixelRatio || 1, W = w.offsetWidth, H = w.offsetHeight;
    if (cv.width !== Math.round(W * dpr) || cv.height !== Math.round(H * dpr)) { cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); cv.style.width = W + 'px'; cv.style.height = H + 'px'; }
    inkDraw(); };
  size(); if (window.ResizeObserver) { inkRO = new ResizeObserver(size); inkRO.observe(w); }
  let cur = null;
  const pt = e => { const r = cv.getBoundingClientRect(); return [Math.round((e.clientX - r.left) * 10) / 10, Math.round((e.clientY - r.top) * 10) / 10]; };
  cv.onpointerdown = e => {
    if (!INK.on) return;
    if (e.pointerType === 'pen') INK.pen = true; else if (e.pointerType === 'touch' && INK.pen) return;
    e.preventDefault(); cv.setPointerCapture(e.pointerId);
    const k = inkKey(); cur = { c: INK.col, e: INK.er, p: [pt(e)], id: e.pointerId }; (INK.s[k] = INK.s[k] || []).push(cur); inkDraw();
  };
  cv.onpointermove = e => {
    if (!cur || e.pointerId !== cur.id) return; e.preventDefault();
    const evs = e.getCoalescedEvents ? e.getCoalescedEvents() : [e]; (evs.length ? evs : [e]).forEach(ev => cur.p.push(pt(ev)));
    const ctx = cv.getContext('2d'), dpr = window.devicePixelRatio || 1; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    inkStroke(ctx, { c: cur.c, e: cur.e, p: cur.p.slice(-evs.length - 1) });
  };
  cv.onpointerup = cv.onpointercancel = e => { if (cur && e.pointerId === cur.id) cur = null; };
}

// ───────── 결과 ─────────
function result() {
  const ids = Object.keys(QS.res).map(Number), ok = ids.filter(id => QS.res[id]).length, wrongs = ids.filter(id => !QS.res[id]);
  const byC = {}; ids.forEach(id => { const c = QMAP[id].c; byC[c] = byC[c] || [0, 0]; byC[c][0]++; if (QS.res[id]) byC[c][1]++; });
  const weak = Object.entries(byC).filter(([, v]) => v[1] < v[0]).sort((a, b) => a[1][1] / a[1][0] - b[1][1] / b[1][0]);
  return `<h1>결과</h1><div class="card" style="text-align:center"><div class="big">${ok} / ${ids.length}</div><div class="sub">정답률 ${pct(ids.length ? ok / ids.length : null)}</div></div>
  ${weak.length ? `<h2>이번에 틀린 유형</h2><div class="cgrid">${weak.map(([cid, v]) => `<div class="card" onclick="go('concept',{id:'${cid}'})"><div class="top"><b>${esc(CMAP[cid].name)}</b><span class="sub">${v[1]}/${v[0]}</span></div></div>`).join('')}</div>` : '<div class="card">전부 맞혔어요.</div>'}
  ${wrongs.length ? `<button class="btn" onclick="QS={ids:${JSON.stringify(wrongs)},i:0,mode:'wrong',res:{},picks:{},pick:null,shown:false,title:'틀린 문제 다시'};go('quiz')">틀린 ${wrongs.length}문제 바로 다시 풀기</button>` : ''}
  <button class="btn line" style="margin-top:10px" onclick="go('home')">홈으로</button>`;
}

// ───────── 오답노트 ─────────
function wrong() {
  const ids = wrongIds(); const g = {};
  ids.forEach(id => { const c = QMAP[id].c; (g[c] = g[c] || []).push(id); });
  const keys = Object.keys(g).sort((a, b) => g[b].length - g[a].length);
  return `<h1>오답노트</h1><div class="sub">틀린 문제와 헷갈림 표시한 문제 ${ids.length}개 · 연속 2번 맞히면 자동으로 빠져요</div>
  ${(() => { const x = resumeInfo('wrong'); if (!x) return ''; const done = x.r.i, tot = x.r.ids.length, ok = Object.values(x.r.res || {}).filter(Boolean).length;
    return `<div class="card"><div class="top"><b>풀던 오답 이어서</b><span class="sub">${esc(x.r.title)}</span></div>
    <div class="bar" style="margin:10px 0 6px"><i style="width:${done / tot * 100}%"></i></div>
    <div class="sub">${done}/${tot} 풀이 · 맞힘 ${ok} · ${x.left}문제 남음</div>
    <button class="btn" style="margin-top:10px" onclick="resumeQS('wrong')">이어서 풀기</button></div>`; })()}
  ${ids.length ? `<button class="btn ${resumeInfo('wrong') ? 'line' : ''}" style="margin:12px 0" onclick="startWrong()">${resumeInfo('wrong') ? '처음부터 새로 섞어서 풀기' : '전체 다시 풀기'}</button>` : '<div class="card">아직 오답이 없어요.</div>'}
  <div class="cgrid">${keys.map(k => `<div class="card"><div class="top"><b><span class="tag">P${CMAP[k].p}</span>${esc(CMAP[k].name)}</b><span class="pill">${g[k].length}</span></div>
    <div class="list">${g[k].slice(0, 40).map(id => { const q = QMAP[id], a = S.att[id] || {}; const t = q.q.replace(/-{4,}/g, '____'); return `<div class="it" onclick="peek(${id})"><span>${dtag(q.d)}${esc(t.slice(0, 60))}${t.length > 60 ? '…' : ''}</span><span class="sub">${a.wr ? '✕' + a.wr : ''}${S.conf[id] ? ' ?' : ''}</span></div>`; }).join('')}</div>
    <div class="grid2" style="margin-top:10px"><button class="btn ghost" onclick="QS={ids:${JSON.stringify(g[k])},i:0,mode:'wrong',res:{},picks:{},pick:null,shown:false,title:'오답 · ${esc(CMAP[k].name)}'};go('quiz')">이 유형 오답 풀기</button>
    <button class="btn line" onclick="go('concept',{id:'${k}'})">유형 정리</button></div></div>`).join('')}</div>`;
}
function optTap(el, k) { if (QS.shown) el.classList.toggle('open'); else pick(k); }
function whyH(q, k) { return q.w && k !== q.a && q.w[k] ? `<span class="why">✕ ${esc(q.w[k])}</span>` : ''; }
function peek(id) {
  const q = QMAP[id];
  sheet(`<div>${ptag(q.p)}${dtag(q.d)}<span class="tag">${esc(CMAP[q.c].name)}</span></div>${q.g ? psgHTML(q.g, q.k, false) + `<div class="qno">${setInfo(q)}</div>` : ''}<div class="q en">${qText(q)}</div>
  ${q.o.map((t, k) => optHTML(q, k, k === q.a ? 'right' : '', q.w && k !== q.a ? ' hasw' : '', "this.classList.toggle('open')")).join('')}
  ${q.w ? '<div class="why-hint">보기를 누르면 왜 틀렸는지 보여요</div>' : ''}
  <div class="exp ok">${md(q.e)}${q.tr ? `<span class="tr">${esc(q.tr)}</span>` : ''}</div>
  ${S.conf[id] ? `<button class="btn line" onclick="togConf(${id});closeSheet()">헷갈림 표시 해제</button>` : ''}`);
}

// ───────── 유형 정리 ─────────
function concepts() {
  const done = Object.keys(S.cdone).length;
  const units = [...new Set(CONCEPTS.map(c => c.p + '|' + c.unit))];
  return `<h1>문법 · 유형 노트</h1><div class="sub">${CONCEPTS.length}개 노트 중 ${done}개 학습 완료 · Part 5 문법은 규칙·예문·함정까지 정리</div>
  <div class="ugrid">${units.map(u => { const [p, name] = u.split('|'); return `<section><h2>Part ${p} · ${esc(name)}</h2><div class="card list">${CONCEPTS.filter(c => c.p == p && c.unit === name).map(c => { const st = conceptStat(c.id);
    return `<div class="it" onclick="go('concept',{id:'${c.id}'})"><span>${S.cdone[c.id] ? '✓ ' : ''}${esc(c.name)}</span><span class="sub">${st.n ? pct(st.acc) : ''} ${st.total}문항</span></div>`; }).join('')}</div></section>`; }).join('')}</div>`;
}
function conceptBody(c, inSheet) {
  const st = conceptStat(c.id);
  return `<div class="sub">Part ${c.p} · ${esc(c.unit)}</div><h1 style="font-size:21px">${esc(c.name)}</h1>
  <div class="row" style="margin:6px 0 4px"><span class="pill">정답률 ${pct(st.acc)}</span><span class="sub">${st.solved}/${st.total}문항 풀이</span></div>
  ${GRAMMAR[c.id] ? gramHTML(GRAMMAR[c.id]) : `<ul class="sum">${c.sum.map(t => `<li>${md(t)}</li>`).join('')}</ul>
  ${c.ex ? `<pre class="code" style="white-space:pre-wrap">${esc(c.ex.join('\n'))}</pre>` : ''}`}
  ${c.trap ? `<div class="trap"><b>함정</b><br>${c.trap.map(md).join('<br>')}</div>` : ''}
  ${inSheet ? '' : `<div class="grid2" style="margin-top:14px">
    <button class="btn" ${st.total ? '' : 'disabled'} onclick="startPractice({cs:['${c.id}'],n:20,order:'new',title:'${esc(c.name)}'})">이 유형 문제 풀기</button>
    <button class="btn ${S.cdone[c.id] ? 'line' : 'ghost'}" onclick="togDone('${c.id}')">${S.cdone[c.id] ? '학습 완료 취소' : '학습 완료'}</button></div>
    ${(() => { const un = (BY_C[c.id] || []).filter(id => !S.att[id]).length; return un ? `<button class="btn line" style="margin-top:8px" onclick="startPractice({cs:['${c.id}'],un:1,n:20,order:'rand',title:'${esc(c.name)} · 안 푼 문제'})">이 유형에서 안 푼 문제 ${un}개</button>` : ''; })()}`}`;
}
function gramHTML(g) {
  return `${g.intro ? `<p class="g-intro">${md(g.intro)}</p>` : ''}${(g.rules || []).map((r, i) => `<div class="g-rule"><div class="g-h"><span>${i + 1}</span><div>${md(r.h)}</div></div>${r.p ? `<div class="g-p">${md(r.p)}</div>` : ''}
    ${(r.ex || []).map(([en, ko]) => `<div class="g-ex"><div class="en tapw">${esc(en)}</div><div class="ko">${esc(ko)}</div></div>`).join('')}</div>`).join('')}
  ${g.list ? `<div class="g-list"><b>${esc(g.listTitle || '빈출 표현')}</b>${g.list.map(([en, ko]) => `<div class="it"><span class="en tapw">${esc(en)}</span><span class="ko">${esc(ko)}</span></div>`).join('')}</div>` : ''}`;
}
function concept() { return `<button class="icon-btn" onclick="go('concepts')">← 유형 목록</button>` + `<div class="card" style="margin-top:12px">${conceptBody(CMAP[P.id])}</div>`; }
function togDone(id) { if (S.cdone[id]) delete S.cdone[id]; else S.cdone[id] = today(); save(); render(); }

// ───────── 분석 ─────────
let STAB = 'weak';
function stats() {
  const ps = PARTS.map(p => overall(q => q.p === p));
  const ds = [1, 2, 3, 4].map(d => overall(q => q.d === d));
  const days = Object.keys(S.days).sort().slice(-14);
  const maxN = Math.max(1, ...days.map(k => S.days[k].n));
  let list = CONCEPTS.map(c => ({ c, s: conceptStat(c.id) }));
  if (STAB === 'weak') list = list.filter(x => x.s.n).sort((a, b) => (a.s.c + 1) / (a.s.n + 2) - (b.s.c + 1) / (b.s.n + 2));
  else if (STAB === 'none') list = list.filter(x => !x.s.solved);
  return `<h1>분석</h1>
  <div class="grid3">${ps.map((x, i) => `<div class="card stat"><b>${pct(x.acc)}</b><span>Part ${PARTS[i]} · ${x.solved}/${x.total}</span></div>`).join('')}</div>
  <div class="card"><b>난이도별</b>${ds.map((x, i) => `<div style="margin-top:10px"><div class="top"><span>${DLABEL[i + 1]}</span><span class="sub">${pct(x.acc)} · ${x.solved}/${x.total}</span></div><div class="bar ${lvl(x.acc)}"><i style="width:${(x.acc || 0) * 100}%"></i></div></div>`).join('')}</div>
  <div class="card"><b>최근 14일</b>${days.length ? `<div style="display:flex;align-items:flex-end;gap:4px;height:90px;margin-top:10px">${days.map(k => `<div style="flex:1;text-align:center"><div style="height:${S.days[k].n / maxN * 70}px;background:var(--pri);border-radius:4px 4px 0 0;opacity:${0.4 + 0.6 * S.days[k].c / S.days[k].n}"></div><div class="sub" style="font-size:9px">${k.slice(8)}</div></div>`).join('')}</div>` : '<div class="sub">아직 기록이 없어요</div>'}</div>
  ${S.mocks.length ? `<div class="card"><b>모의고사 기록</b><div class="list">${S.mocks.slice(-6).reverse().map(m => `<div class="it"><span>${m.date}</span><span>${m.c}/100 · 예상 ${m.score}점 <span class="sub">(P5 ${m.p5} · P6 ${m.p6} · P7 ${m.p7})</span></span></div>`).join('')}</div></div>` : ''}
  <h2>유형별</h2>
  <div class="seg">${[['weak', '약한 순'], ['all', '전체'], ['none', '안 푼 유형']].map(([v, l]) => `<button class="${STAB === v ? 'on' : ''}" onclick="STAB='${v}';render()">${l}</button>`).join('')}</div>
  ${list.length ? `<div class="cgrid">${list.map(x => conceptRow(x.c, x.s)).join('')}</div>` : '<div class="card sub">해당하는 유형이 없어요</div>'}`;
}

// ───────── 모의고사 (RC 100문항 · 75분) ─────────
let MK_S = null;
const SCORE_TBL = [[100, 495], [97, 495], [95, 490], [92, 470], [90, 455], [87, 435], [85, 420], [82, 400], [80, 385], [77, 365], [75, 350], [72, 330], [70, 315], [65, 285], [60, 255], [55, 225], [50, 200], [45, 175], [40, 150], [30, 105], [20, 65], [10, 30], [0, 5]];
function estScore(c) { for (let i = 0; i < SCORE_TBL.length - 1; i++) { const [c1, s1] = SCORE_TBL[i], [c2, s2] = SCORE_TBL[i + 1]; if (c >= c2) return Math.round((s2 + (s1 - s2) * (c - c2) / (c1 - c2)) / 5) * 5; } return 5; }
function mock() {
  const n = S.mocks.length;
  return `<button class="icon-btn" onclick="go('home')">← 홈</button><h1>RC 모의고사</h1>
  <div class="card"><ul class="sum"><li>실제 RC 구성 그대로 100문항: Part 5 30 · Part 6 4지문 16 · Part 7 54(단일 지문 → 복수 지문 순)</li><li>제한 시간 75분, 시간이 다 되면 자동 제출</li><li>안 푼 문제 위주로 뽑고, 모자라면 푼 문제에서 채움</li><li>예상 점수는 정답 수를 대략적인 환산표로 바꾼 값이라 실제 성적과 다를 수 있어요</li></ul></div>
  ${n ? `<div class="sub" style="margin:4px 2px 10px">최근: ${S.mocks[n - 1].date} · ${S.mocks[n - 1].c}/100 · 예상 ${S.mocks[n - 1].score}점</div>` : ''}
  <button class="btn" onclick="startMock()">시작</button>`;
}
function pickSets(part, wantQ, filt) {
  const sets = Object.keys(BY_G).filter(g => PSG[g].part === part && (!filt || filt(g)));
  const fresh = s => BY_G[s].every(id => !S.att[id]);
  const order = [...shuffle(sets.filter(fresh)), ...shuffle(sets.filter(s => !fresh(s)))];
  const out = []; let n = 0;
  for (const s of order) { if (n >= wantQ) break; if (n + BY_G[s].length > wantQ) continue; out.push(s); n += BY_G[s].length; }
  const rem = wantQ - n, L = g => BY_G[g].length, unused = order.filter(g => !out.includes(g));
  if (rem > 0) {
    const t = unused.find(g => L(g) === rem);
    if (t) out.push(t);
    else for (let k = 0; k < out.length; k++) { const u = unused.find(g => L(g) === L(out[k]) + rem); if (u) { out[k] = u; break; } }
  }
  return out;
}
function startMock() {
  const p5 = BANK.filter(q => q.p === 5); const want = { 1: 4, 2: 10, 3: 12, 4: 4 };
  let a = []; [1, 2, 3, 4].forEach(d => { const pool = p5.filter(q => q.d === d); a = a.concat([...shuffle(pool.filter(q => !S.att[q.id])), ...shuffle(pool.filter(q => S.att[q.id]))].slice(0, want[d])); });
  if (a.length < 30) a = a.concat(shuffle(p5.filter(q => !a.includes(q))).slice(0, 30 - a.length));
  a = shuffle(a).map(q => q.id);
  const s6 = pickSets(6, 16), multi = pickSets(7, 25, g => PSG[g].docs.length > 1), single = pickSets(7, 54 - multi.reduce((n, g) => n + BY_G[g].length, 0), g => PSG[g].docs.length === 1);
  single.sort((x, y) => BY_G[x].length - BY_G[y].length); multi.sort((x, y) => PSG[x].docs.length - PSG[y].docs.length);
  const ids = [...a, ...[].concat(...s6.map(g => BY_G[g])), ...[].concat(...single.map(g => BY_G[g])), ...[].concat(...multi.map(g => BY_G[g]))];
  INK.s = {}; PSG_FULL = false;
  MK_S = { ids, i: 0, ans: {}, end: Date.now() + 75 * 60 * 1000 };
  go('mockrun');
  timerId = setInterval(() => { const el = $('#mt'); if (!MK_S) return; const left = MK_S.end - Date.now(); if (left <= 0) { submitMock(true); return; } if (el) el.textContent = fmtT(left); }, 1000);
}
const fmtT = ms => { const s = Math.max(0, Math.floor(ms / 1000)); return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); };
function mkGo(i) { const pg = QMAP[MK_S.ids[MK_S.i]].g; if (QMAP[MK_S.ids[i]].g) i = grp(MK_S.ids, i)[0]; MK_S.i = i; const g = QMAP[MK_S.ids[i]].g; if (g !== pg) PSG_FULL = false; render(); scrollTo(0, 0); }
function mkTap(el, id, k) { MK_S.ans[id] = k; el.parentElement.querySelectorAll('.opt').forEach(o => o.classList.remove('sel')); el.classList.add('sel'); const c = document.getElementById('mkcnt'); if (c) c.textContent = Object.keys(MK_S.ans).length + '/' + MK_S.ids.length; }
function mockrun() {
  const [a, b] = grp(MK_S.ids, MK_S.i); if (MK_S.i !== a) MK_S.i = a;
  const gids = MK_S.ids.slice(a, b), q = QMAP[gids[0]], answered = Object.keys(MK_S.ans).length, N = MK_S.ids.length;
  const body = q.g ? gids.map((id, j) => { const x = QMAP[id]; return `<div class="sq"><div class="sq-h"><span class="sq-n">${a + j + 101}.</span></div><div class="q en">${qText(x)}</div>${x.o.map((t, k) => optHTML(x, k, MK_S.ans[id] === k ? 'sel' : '', '', `mkTap(this,${id},${k})`)).join('')}</div>`; }).join('')
    : q.o.map((t, k) => optHTML(q, k, MK_S.ans[q.id] === k ? 'sel' : '', '', `mkTap(this,${q.id},${k})`)).join('');
  return `<div class="top" style="margin-top:4px"><button class="icon-btn" onclick="ask('모의고사를 그만둘까요? 이번 풀이는 저장되지 않아요.', '그만두기', ()=>{MK_S=null;go('home')})">✕</button>
    <span class="timer" id="mt">${fmtT(MK_S.end - Date.now())}</span><button class="icon-btn" id="mkcnt" onclick="mockGrid()">${answered}/${N}</button></div>
  <div class="sub" style="margin-top:10px">Part ${q.p} · ${b - a > 1 ? `${a + 101}–${b + 100}번` : `${a + 101}번`}</div>
  <div class="qa"><div class="qa-l"><div class="top" style="justify-content:flex-end">${inkBar()}</div>
  ${q.g ? psgHTML(q.g, null, true) : `<div class="inkw ${INK.on ? 'inking' : ''}" id="inkw" data-q="${q.id}"><div class="q en">${qText(q)}</div><canvas class="ink" id="ink"></canvas></div>`}</div><div class="qa-r">
  ${body}
  <div class="grid2" style="margin-top:12px"><button class="btn line" ${a ? '' : 'disabled'} onclick="mkGo(grp(MK_S.ids, MK_S.i-1)[0])">이전</button>
  ${b < N ? `<button class="btn" onclick="mkGo(${b})">다음</button>` : `<button class="btn" onclick="submitMock()">제출</button>`}</div></div></div>`;
}
function mockGrid() {
  sheet(`<b>문항 이동</b><div style="display:grid;grid-template-columns:repeat(10,1fr);gap:5px;margin:12px 0">${MK_S.ids.map((id, i) => `<button class="chip ${MK_S.ans[id] != null ? 'on' : ''}" style="margin:0;padding:7px 0;font-size:12px" onclick="closeSheet();mkGo(${i})">${i + 101}</button>`).join('')}</div>
  <button class="btn" onclick="closeSheet();submitMock()">제출하고 채점</button>`);
}
function submitMock(auto, force) {
  const N = MK_S.ids.length;
  if (!auto && !force && Object.keys(MK_S.ans).length < N) return ask(`안 푼 문제가 ${N - Object.keys(MK_S.ans).length}개 있어요. 제출할까요?`, '제출', () => submitMock(false, true));
  clearInterval(timerId); timerId = null;
  const by = { 5: 0, 6: 0, 7: 0 }; const wrongs = [];
  MK_S.ids.forEach(id => { const q = QMAP[id], ok = MK_S.ans[id] === q.a; if (MK_S.ans[id] != null) record(id, ok); else { const a = S.att[id] || (S.att[id] = { n: 0, c: 0, st: 0, w: false, wr: 0 }); a.w = true; a.wr++; } if (ok) by[q.p]++; else wrongs.push(id); });
  const c = by[5] + by[6] + by[7], score = estScore(c * 100 / N);
  const tot = p => MK_S.ids.filter(id => QMAP[id].p === p).length;
  const r = { date: today(), c, score, p5: by[5], p6: by[6], p7: by[7], t5: tot(5), t6: tot(6), t7: tot(7), wrongs, used: Math.round((75 * 60 * 1000 - Math.max(0, MK_S.end - Date.now())) / 60000) };
  S.mocks.push({ date: r.date, c, score, p5: by[5], p6: by[6], p7: by[7] }); save();
  MK_S = null; go('mockresult', r);
}
function mockresult() {
  const r = P, byC = {};
  r.wrongs.forEach(id => { const c = QMAP[id].c; byC[c] = (byC[c] || 0) + 1; });
  return `<h1>모의고사 결과</h1><div class="card" style="text-align:center"><div class="big">${r.c} / 100</div>
  <div style="margin-top:6px"><span class="pill">예상 RC ${r.score}점</span> <span class="sub">· ${r.used}분 사용</span></div>
  <div class="grid3" style="margin-top:14px"><div class="stat"><b>${r.p5}/${r.t5}</b><span>Part 5</span></div><div class="stat"><b>${r.p6}/${r.t6}</b><span>Part 6</span></div><div class="stat"><b>${r.p7}/${r.t7}</b><span>Part 7</span></div></div></div>
  ${Object.keys(byC).length ? `<h2>틀린 유형</h2><div class="cgrid">${Object.entries(byC).sort((a, b) => b[1] - a[1]).map(([c, n]) => `<div class="card" onclick="go('concept',{id:'${c}'})"><div class="top"><b><span class="tag">P${CMAP[c].p}</span>${esc(CMAP[c].name)}</b><span class="sub">${n}문제</span></div></div>`).join('')}</div>` : ''}
  ${r.wrongs.length ? `<button class="btn" onclick="QS={ids:${JSON.stringify(r.wrongs)},i:0,mode:'wrong',res:{},picks:{},pick:null,shown:false,title:'모의고사 오답'};go('quiz')">틀린 ${r.wrongs.length}문제 해설 보며 다시 풀기</button>` : ''}
  <button class="btn line" style="margin-top:10px" onclick="go('home')">홈으로</button>`;
}

// ───────── 단어 카드 ─────────
let FC = null;
function myWords() { return Object.keys(S.myw || {}).sort((a, b) => (S.myw[b].t || '').localeCompare(S.myw[a].t || '')); }
function flash() {
  const mw = myWords(), mk = mw.filter(w => S.myw[w].k).length;
  if (!FC) return `<button class="icon-btn" onclick="go('home')">← 홈</button><h1>단어 카드</h1><div class="sub">문제·지문·문법 노트에서 단어를 누르면 뜻이 뜨고 내 단어장에 담을 수 있어요</div>
    <div class="card"><div class="top"><b>내 단어장</b><span class="sub">${mk}/${mw.length} 외움</span></div>
    <div class="row" style="margin:10px 0"><input id="nw" placeholder="영어 단어 입력해서 추가" autocapitalize="off" autocorrect="off" style="flex:1" onkeydown="if(event.key==='Enter')addTyped()"><button class="btn" style="width:auto;padding:10px 16px" onclick="addTyped()">추가</button></div>
    ${mw.length ? `<div class="grid2"><button class="btn" onclick="startFlash('my')">내 단어 외우기</button><button class="btn line" onclick="startFlash('myu')">모르는 것만</button></div>
    <div class="list" style="margin-top:8px">${mw.slice(0, 300).map(w => `<div class="it"><span><b class="en">${esc(w)}</b> <span class="sub">${esc(S.myw[w].m || '')}</span></span><span style="white-space:nowrap"><span class="sub">${S.myw[w].k ? '✓ ' : ''}</span><button class="sub" data-w="${esc(w)}" onclick="delWord(this.dataset.w)">삭제</button></span></div>`).join('')}</div>` : '<div class="sub">아직 담은 단어가 없어요.</div>'}</div>
    <h2>토익 빈출 단어</h2>
    <div class="cgrid">${FLASH.map((s, i) => { const known = s.cards.filter((c, j) => S.fl[i + '-' + j]).length; return `<div class="card" onclick="startFlash(${i})"><div class="top"><b>${esc(s.name)}</b><span class="sub">${known}/${s.cards.length} 외움</span></div><div class="bar high" style="margin-top:8px"><i style="width:${known / s.cards.length * 100}%"></i></div></div>`; }).join('')}</div>
    <button class="btn line" onclick="startFlash(-1)">모르는 카드만 전체 섞어서</button>`;
  const [si, ci] = FC.list[FC.i], card = si === 'my' ? [ci, (S.myw[ci] || {}).m || '(뜻 없음)', ''] : FLASH[si].cards[ci];
  return `<div class="top"><button class="icon-btn" onclick="FC=null;render()">✕</button><span class="sub">${FC.i + 1} / ${FC.list.length}</span><span></span></div>
  <div class="card flash" onclick="FC.flip=!FC.flip;render()">${FC.flip ? `<small style="margin:0 0 10px;font-family:Georgia,serif;font-size:17px">${esc(card[0])}</small><b>${md(card[1])}</b><small style="font-family:Georgia,serif">${esc(card[2] || '')}</small>` : `<span style="font-family:Georgia,serif">${esc(card[0])}</span><small>${si === 'my' ? '내 단어장' : esc(FLASH[si].name)} · 눌러서 뒤집기</small>`}</div>
  <div class="grid2"><button class="btn line" onclick="flAns(0)">모르겠어요</button><button class="btn" onclick="flAns(1)">알아요</button></div>`;
}
function startFlash(si) {
  let list = [];
  if (si === 'my' || si === 'myu') { list = myWords().filter(w => si === 'my' || !S.myw[w].k).map(w => ['my', w]); if (!list.length) return toast('외울 단어가 없어요'); FC = { list: shuffle(list), i: 0, flip: false }; return render(); }
  FLASH.forEach((s, i) => s.cards.forEach((c, j) => { if (si === -1 ? !S.fl[i + '-' + j] : i === si) list.push([i, j]); }));
  if (!list.length) return toast('모르는 카드가 없어요');
  FC = { list: shuffle(list), i: 0, flip: false }; render();
}
function flAns(k) { const [si, ci] = FC.list[FC.i]; if (si === 'my') { if (S.myw[ci]) S.myw[ci].k = k ? 1 : 0; } else if (k) S.fl[si + '-' + ci] = 1; else delete S.fl[si + '-' + ci]; save(); if (FC.i + 1 < FC.list.length) { FC.i++; FC.flip = false; render(); } else { FC = null; toast('세트 끝'); render(); } }

// ───────── 설정 · 백업 ─────────
function settings() {
  return `<button class="icon-btn" onclick="go('home')">← 홈</button><h1>설정</h1>
  <div class="card"><b>시험일</b><input type="date" value="${S.set.exam}" onchange="S.set.exam=this.value;save()">
  <b style="display:block;margin-top:12px">하루 목표 문항 수</b><input type="number" min="5" max="300" value="${S.set.goal}" onchange="S.set.goal=Math.max(5,+this.value||40);save()"></div>
  <div class="card"><b>백업</b><div class="sub" style="margin:4px 0 10px">앱을 다시 설치하기 전에 백업 코드를 복사해 메모 앱 등에 붙여 두세요. 보통은 같은 앱 위에 덮어 설치하면 기록이 유지돼요.</div>
  <button class="btn ghost" onclick="exportData()">백업 코드 만들기</button>
  <textarea id="bk" rows="4" style="margin-top:10px" placeholder="백업 코드를 여기에 붙여넣고 복원"></textarea>
  <button class="btn line" style="margin-top:8px" onclick="importData()">붙여넣은 코드로 복원</button></div>
  <div class="card"><b>초기화</b><button class="btn line" style="margin-top:8px;color:var(--bad)" onclick="ask('모든 풀이 기록을 지울까요? 되돌릴 수 없어요.', '지우기', ()=>{S=blank();save();toast('초기화했어요');render()})">모든 기록 지우기</button></div>
  <div class="sub" style="text-align:center">문제 ${BANK.length}개 (P5 ${BANK.filter(q => q.p === 5).length} · P6 ${BANK.filter(q => q.p === 6).length} · P7 ${BANK.filter(q => q.p === 7).length}) · 지문 ${Object.keys(PSG).length}개 · 단어 ${FLASH.reduce((a, s) => a + s.cards.length, 0)}개</div>`;
}
function exportData() {
  const t = $('#bk'); t.value = btoa(unescape(encodeURIComponent(JSON.stringify(S))));
  if (NATIVE && NATIVE.share) { NATIVE.share.postMessage('TOEIC RC 노트 백업 ' + today() + '\n' + t.value); return; }
  if (window.AndroidBridge) { try { AndroidBridge.share('TOEIC RC 노트 백업 ' + today() + '\n' + t.value); return; } catch (e) {} }
  t.select();
  const fallback = () => { try { document.execCommand('copy'); toast('복사했어요'); } catch (e) { toast('코드를 길게 눌러 복사하세요'); } };
  try { navigator.clipboard.writeText(t.value).then(() => toast('복사했어요'), fallback); } catch (e) { fallback(); }
}
function importData() {
  try { const raw = $('#bk').value.trim().split('\n').pop().trim(); const d = JSON.parse(decodeURIComponent(escape(atob(raw)))); if (!d.att) throw 0; S = Object.assign(blank(), d); save(); toast('복원했어요'); go('home'); }
  catch (e) { toast('코드가 올바르지 않아요'); }
}

// ───────── 단어 누르면 뜻 ─────────
function lemmaOf(w) {
  w = w.toLowerCase().replace(/^[^a-z]+|[^a-z]+$/g, '').replace(/['’]s$/, '');
  if (!w) return null;
  if (DICT[w]) return w;
  if (DICT_FORM[w]) return DICT_FORM[w];
  const tries = [];
  if (/ies$/.test(w)) tries.push(w.slice(0, -3) + 'y');
  if (/es$/.test(w)) tries.push(w.slice(0, -2));
  if (/s$/.test(w)) tries.push(w.slice(0, -1));
  if (/ied$/.test(w)) tries.push(w.slice(0, -3) + 'y');
  if (/ed$/.test(w)) { tries.push(w.slice(0, -2), w.slice(0, -1)); if (/(.)\1ed$/.test(w)) tries.push(w.slice(0, -3)); }
  if (/ing$/.test(w)) { tries.push(w.slice(0, -3), w.slice(0, -3) + 'e'); if (/(.)\1ing$/.test(w)) tries.push(w.slice(0, -4)); }
  if (/ier$/.test(w)) tries.push(w.slice(0, -3) + 'y');
  if (/iest$/.test(w)) tries.push(w.slice(0, -4) + 'y');
  if (/er$/.test(w)) tries.push(w.slice(0, -2), w.slice(0, -1));
  if (/est$/.test(w)) tries.push(w.slice(0, -3), w.slice(0, -2));
  if (/ily$/.test(w)) tries.push(w.slice(0, -3) + 'y');
  if (/ly$/.test(w)) tries.push(w.slice(0, -2));
  for (const t of tries) if (DICT[t]) return t;
  return w;
}
function wordAt(x, y) {
  let node, off;
  if (document.caretRangeFromPoint) { const r = document.caretRangeFromPoint(x, y); if (!r) return null; node = r.startContainer; off = r.startOffset; }
  else if (document.caretPositionFromPoint) { const p = document.caretPositionFromPoint(x, y); if (!p) return null; node = p.offsetNode; off = p.offset; }
  if (!node || node.nodeType !== 3) return null;
  const t = node.textContent; let a = off, b = off;
  const isW = c => /[A-Za-z'’-]/.test(c);
  if (!isW(t[a] || '') && isW(t[a - 1] || '')) { a--; b--; }
  while (a > 0 && isW(t[a - 1])) a--;
  while (b < t.length && isW(t[b])) b++;
  const raw = t.slice(a, b), word = raw.replace(/^[-'’]+|[-'’]+$/g, '');
  if (!/[A-Za-z]{2,}/.test(word)) return null;
  try { const rg = document.createRange(); const s0 = a + raw.indexOf(word); rg.setStart(node, s0); rg.setEnd(node, s0 + word.length); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(rg); return { word, rect: rg.getBoundingClientRect() }; } catch (e) { return { word, rect: { left: x, right: x, top: y, bottom: y } }; }
}
function closePop() { const p = document.getElementById('wpop'); if (p) { p.remove(); try { getSelection().removeAllRanges(); } catch (e) {} } }
function showPop(word, rect) {
  closePop();
  const lm = lemmaOf(word), m = DICT[lm], has = S.myw && S.myw[lm];
  const el = document.createElement('div'); el.id = 'wpop'; el.className = 'wpop';
  el.innerHTML = `<div class="top"><b class="en">${esc(lm)}</b>${lm !== word.toLowerCase() ? `<span class="sub">${esc(word)}</span>` : ''}</div>
    <div class="wm">${m ? esc(m) : '<span class="sub">사전에 없는 단어예요. 뜻을 직접 적어 담을 수 있어요.</span>'}</div>
    ${m ? '' : `<input id="wpm" placeholder="뜻 입력 (선택)" style="margin-top:6px;padding:7px 9px;font-size:14px">`}
    <div class="row" style="margin-top:8px"><button class="btn ${has ? 'line' : ''}" style="padding:8px 10px;font-size:14px" data-w="${esc(lm)}" onclick="togWord(this.dataset.w)">${has ? '단어장에서 빼기' : '+ 내 단어장'}</button><button class="btn line" style="padding:8px 10px;font-size:14px;width:70px" onclick="closePop()">닫기</button></div>`;
  document.body.appendChild(el);
  const W = el.offsetWidth, H = el.offsetHeight, vw = innerWidth, vh = innerHeight;
  const left = Math.min(Math.max(8, rect.left + (rect.right - rect.left) / 2 - W / 2), vw - W - 8);
  let top = rect.bottom + 8; if (top + H > vh - 8) top = Math.max(8, rect.top - H - 8);
  el.style.left = left + 'px'; el.style.top = top + 'px';
}
function togWord(lm) {
  S.myw = S.myw || {};
  if (S.myw[lm]) { delete S.myw[lm]; toast('단어장에서 뺐어요'); }
  else { const inp = document.getElementById('wpm'); S.myw[lm] = { m: DICT[lm] || (inp && inp.value.trim()) || '', t: today() + ' ' + Date.now(), k: 0 }; toast('내 단어장에 담았어요'); }
  save(); closePop(); if (view === 'flash') render();
}
function addTyped() {
  const v = (document.getElementById('nw') || {}).value || ''; const w = v.trim(); if (!w) return;
  const lm = /\s/.test(w) ? w.toLowerCase() : lemmaOf(w); S.myw = S.myw || {};
  if (S.myw[lm]) return toast('이미 있는 단어예요');
  let m = DICT[lm] || '';
  if (!m) m = prompt(`'${lm}' 뜻을 입력하세요 (사전에 없는 단어)`) || '';
  S.myw[lm] = { m, t: today() + ' ' + Date.now(), k: 0 }; save(); render(); toast(m ? `${lm}: ${m}` : '담았어요');
}
function delWord(w) { if (S.myw[w]) { delete S.myw[w]; save(); render(); } }
document.addEventListener('click', e => {
  const pop = document.getElementById('wpop');
  if (pop && pop.contains(e.target)) return;
  if (INK.on) return;
  const zone = e.target.closest && e.target.closest('.psg .doc, .q.en, .tapw');
  if (!zone) { closePop(); return; }
  const hit = wordAt(e.clientX, e.clientY);
  if (!hit) { closePop(); return; }
  showPop(hit.word, hit.rect);
});
window.addEventListener('scroll', () => closePop(), { passive: true });
document.addEventListener('scroll', () => closePop(), { passive: true, capture: true });

render();

// ───────── 안드로이드 뒤로가기 ─────────
window.androidBack = function () {
  if ($('#sheet')) return closeSheet();
  if (document.getElementById('wpop')) return closePop();
  if (view === 'mockrun') return ask('모의고사를 그만둘까요? 이번 풀이는 저장되지 않아요.', '그만두기', () => { MK_S = null; go('home'); });
  if (view === 'flash' && FC) { FC = null; return render(); }
  const up = { quiz: 'practice', result: 'practice', concept: 'concepts' }[view];
  if (up) return go(up);
  if (view !== 'home') return go('home');
  if (window.AndroidBridge) AndroidBridge.exit();
};
