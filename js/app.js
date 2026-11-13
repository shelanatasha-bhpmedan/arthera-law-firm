// ARTHERA LAW FIRM: aplikasi utama (router, navigasi, palet perintah)
import { SERVICES, TEAM, PRACTICE_AREAS } from './data-core.js';
import { FIRM, SERVICE_META, COMPRO_PAGES } from './data-extra.js';
import { icon } from './icons.js';
import { sound, paperFlip } from './sound.js';
import { renderHome, renderServiceIndex, renderService, renderProfile, renderTeam, contactModal, destroyBook, titleCase } from './views.js';
import { gateHTML, wireGate, renderPortal, restoreSession, isLoggedIn, portalState } from './portal.js';
import { renderAdmin, restoreAdmin } from './admin.js';
import { $, $$, esc, session, observeReveal, waLink, copyText, toast } from './util.js';

const view = $('#view');
const topbar = $('#topbar');
let darkTop = true;

export function nav(hash) {
  if (location.hash === hash) route(); else location.hash = hash;
}

function parse() {
  const raw = location.hash.replace(/^#/, '') || '/';
  const [path, qs] = raw.split('?');
  const parts = path.split('/').filter(Boolean);
  return { parts, q: new URLSearchParams(qs || '') };
}

const TITLES = { home: 'Advokat, Konsultan Hukum & Kekayaan Intelektual' };
async function route() {
  const { parts, q } = parse();
  const [a, b, c] = parts;
  destroyBook();
  document.querySelectorAll('.overlay, .modal-back, .palette-back').forEach((el) => el.remove());
  document.body.classList.remove('lock');
  let title = TITLES.home;
  darkTop = true;
  let active = '';

  if (!a) { renderHome(view, nav); }
  else if (a === 'layanan' && b && SERVICES[b]) { renderService(view, b, Number(c) || 1, nav); title = SERVICES[b].title; active = 'layanan'; }
  else if (a === 'layanan') { renderServiceIndex(view); title = 'Layanan'; active = 'layanan'; }
  else if (a === 'profil') { renderProfile(view, { slide: b ? Math.max(0, Math.min(14, Number(b) - 1)) : null, open: q.get('buka') === '1' }); title = 'Company Profile'; active = 'profil'; }
  else if (a === 'tim') { renderTeam(view, b); title = b && TEAM[b] ? titleCase(TEAM[b].name) : 'Partner & Advokat'; active = 'tim'; }
  else if (a === 'portal') {
    await restoreSession();
    active = 'portal';
    if (isLoggedIn()) { darkTop = false; renderPortal(view, { onLogout: () => nav('#/portal') }); title = 'Portal Klien'; }
    else {
      view.innerHTML = `<section class="portal-gate"><div class="frame-lines"></div><img class="hero-watermark" src="assets/emblem-light.png" alt="">${gateHTML()}</section>
        <div class="wrap center" style="padding:40px 0 70px"><p class="muted">Belum memiliki akses? <a class="btn-link" href="#/layanan">Pilih layanan & isi registrasi ${icon('arrow-right')}</a></p></div>`;
      wireGate(view, () => route());
      setTimeout(() => $('#gateEmail')?.focus({ preventScroll: true }), 400);
      title = 'Portal Klien';
    }
  }
  else if (a === 'admin') { await restoreAdmin(); renderAdmin(view, nav); title = 'Admin'; }
  else { renderHome(view, nav); }

  const emerald = (a === 'layanan' && b === 'merek') || (a === 'portal' && isLoggedIn() && portalState().rec.serviceKey === 'merek');
  document.body.classList.toggle('theme-emerald', !!emerald);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', emerald ? '#04170F' : '#0A0908');
  document.title = `${title} · Arthera Law Firm`;
  view.classList.remove('view-enter'); void view.offsetWidth; view.classList.add('view-enter');
  if (!(a === 'profil' && b)) window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  $$('.nav [data-nav]').forEach((l) => l.classList.toggle('active', l.dataset.nav === active));
  updatePortalBtn();
  onScroll();
  observeReveal(view);
  closeSheet();
}

function updatePortalBtn() {
  const lbl = isLoggedIn() ? 'Portal Saya' : 'Portal Klien';
  $$('[data-portal-label]').forEach((el) => { el.textContent = lbl; });
}

function onScroll() {
  topbar.classList.toggle('solid', !darkTop || window.scrollY > 40);
}

// ---------- menu seluler ----------
function openSheet() { $('#sheet').classList.add('open'); document.body.classList.add('lock'); }
function closeSheet() { $('#sheet')?.classList.remove('open'); if (!document.querySelector('.modal-back, .overlay, .palette-back, .book-stage.full')) document.body.classList.remove('lock'); }

// ---------- palet perintah (⌘K) ----------
function paletteItems() {
  const go = (h) => () => nav(h);
  const items = [
    { g: 'Navigasi', t: 'Beranda', s: 'Halaman utama', i: 'home', run: go('#/') },
    { g: 'Navigasi', t: 'Semua Layanan', s: 'Menu layanan hukum', i: 'layers', run: go('#/layanan') },
    { g: 'Navigasi', t: 'Company Profile', s: 'Buka flipbook 15 halaman', i: 'book-open', run: go('#/profil?buka=1') },
    { g: 'Navigasi', t: 'Partner & Advokat', s: 'Curriculum vitae tim', i: 'users', run: go('#/tim') },
    { g: 'Navigasi', t: 'Portal Klien', s: 'Masuk dengan email', i: 'folder-lock', run: go('#/portal') },
    { g: 'Navigasi', t: 'Panel Admin', s: 'Internal · database klien', i: 'database', run: go('#/admin'), hidden: true },
    ...Object.entries(SERVICES).flatMap(([k, s]) => [
      { g: 'Layanan', t: s.title, s: 'Alur layanan', i: SERVICE_META[k].icon, run: go(`#/layanan/${k}/1`), kw: SERVICE_META[k].blurb },
      { g: 'Layanan', t: `Registrasi · ${SERVICE_META[k].short}`, s: 'Formulir registrasi', i: 'file-pen', run: go(`#/layanan/${k}/2`) }
    ]),
    ...Object.values(TEAM).map((p) => ({ g: 'Partner & Advokat', t: titleCase(p.name), s: p.role_id, i: 'user', run: go(`#/tim/${p.id}`), kw: p.competencies.join(' ') })),
    ...COMPRO_PAGES.map((p, i) => ({ g: 'Company Profile', t: `Hal. ${p.no} · ${p.title}`, s: 'Buka di flipbook', i: 'book-marked', run: go(`#/profil/${i + 1}`) })),
    ...PRACTICE_AREAS.map((p) => ({ g: 'Bidang Praktik', t: p.id, s: p.en, i: 'gavel', run: () => { const k = /merek|kekayaan/i.test(p.id) ? 'merek' : /due diligence/i.test(p.id) ? 'ldd' : /litigasi|arbitrase|pailit|pajak|ketenagakerjaan/i.test(p.id) ? 'litigasi' : 'korporasi'; nav(`#/layanan/${k}`); } })),
    ...FIRM.contacts.map((c) => ({ g: 'Aksi Cepat', t: `WhatsApp ${c.name.split(',')[0]}`, s: c.role, i: 'message-circle', run: () => window.open(waLink(c.wa, 'Halo Arthera Law Firm, saya ingin berkonsultasi.'), '_blank', 'noopener') })),
    { g: 'Aksi Cepat', t: 'Tanya penawaran biaya', s: 'Tulis pesan ke Partner', i: 'mail', run: () => contactModal() },
    { g: 'Aksi Cepat', t: 'Salin alamat kantor', s: FIRM.addressShort, i: 'map-pin', run: () => copyText(FIRM.address, 'Alamat tersalin') },
    { g: 'Aksi Cepat', t: sound.on ? 'Matikan suara kertas' : 'Nyalakan suara kertas', s: 'Efek suara flipbook', i: sound.on ? 'volume-x' : 'volume-2', run: () => { sound.on = !sound.on; toast(sound.on ? 'Suara kertas aktif' : 'Suara kertas nonaktif'); if (sound.on) paperFlip(0.6); } }
  ];
  return items;
}

function openPalette() {
  if (document.querySelector('.palette-back')) return;
  const all = paletteItems();
  const back = document.createElement('div');
  back.className = 'palette-back';
  back.innerHTML = `<div class="palette" role="dialog" aria-label="Cari"><div class="palette-in">${icon('search')}<input placeholder="Cari layanan, halaman, partner, bidang praktik…" aria-label="Cari"><span class="kbd">ESC</span></div><div class="palette-list" role="listbox"></div></div>`;
  document.body.appendChild(back);
  document.body.classList.add('lock');
  requestAnimationFrame(() => back.classList.add('show'));
  const input = $('input', back), list = $('.palette-list', back);
  let sel = 0, shown = [];
  const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const draw = () => {
    const q = norm(input.value.trim());
    const toks = q.split(/\s+/).filter(Boolean);
    shown = all.filter((it) => (!it.hidden || q.includes('admin')) && toks.every((t) => norm(`${it.t} ${it.s} ${it.g} ${it.kw || ''}`).includes(t)));
    if (!q) shown = shown.filter((it) => ['Navigasi', 'Layanan', 'Aksi Cepat'].includes(it.g) && !/^Registrasi/.test(it.t));
    shown = shown.slice(0, 40);
    sel = Math.min(sel, Math.max(0, shown.length - 1));
    let lastG = '';
    list.innerHTML = shown.length ? shown.map((it, i) => {
      const head = it.g !== lastG ? `<div class="pal-group">${esc(it.g)}</div>` : '';
      lastG = it.g;
      return `${head}<button class="pal-item ${i === sel ? 'sel' : ''}" data-i="${i}" role="option">${icon(it.i)}<div><b>${esc(it.t)}</b><span>${esc(it.s || '')}</span></div></button>`;
    }).join('') : `<div class="pal-empty">Tidak ada hasil untuk “${esc(input.value)}”.</div>`;
    $('.pal-item.sel', list)?.scrollIntoView({ block: 'nearest' });
  };
  const close = () => { back.classList.remove('show'); setTimeout(() => { back.remove(); if (!document.querySelector('.modal-back, .overlay, .book-stage.full')) document.body.classList.remove('lock'); }, 250); };
  const run = (i) => { const it = shown[i]; if (!it) return; close(); setTimeout(it.run, 60); };
  input.addEventListener('input', () => { sel = 0; draw(); });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); sel = Math.min(shown.length - 1, sel + 1); draw(); }
    if (e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(0, sel - 1); draw(); }
    if (e.key === 'Enter') { e.preventDefault(); run(sel); }
    if (e.key === 'Escape') close();
  });
  list.addEventListener('click', (e) => { const b = e.target.closest('[data-i]'); if (b) run(Number(b.dataset.i)); });
  back.addEventListener('click', (e) => { if (e.target === back) close(); });
  draw();
  setTimeout(() => input.focus(), 30);
}

// ---------- init ----------
function init() {
  // preloader sekali per sesi
  const pre = $('#preloader');
  if (session.get('arthera_intro')) pre.remove();
  else { session.set('arthera_intro', 1); setTimeout(() => { pre.classList.add('done'); setTimeout(() => pre.remove(), 1000); }, 1500); }

  // isi mega menu & menu seluler
  const ROM = ['I', 'II', 'III', 'IV', 'V'];
  $('#mega').innerHTML = Object.entries(SERVICES).map(([k, s], i) => `<a href="#/layanan/${k}" class="${k === 'merek' ? 'emerald' : ''}">${icon(SERVICE_META[k].icon)}<div><strong>${ROM[i]} · ${esc(SERVICE_META[k].short)}</strong><span class="small">${esc(SERVICE_META[k].blurb)}</span></div></a>`).join('') + `<a href="#/portal">${icon('folder-lock')}<div><strong>Portal Klien</strong><span class="small">Berkas & draf dokumen, masuk dengan email.</span></div></a>`;
  $('#sheetSub').innerHTML = Object.entries(SERVICES).map(([k], i) => `<a href="#/layanan/${k}">${ROM[i]} · ${esc(SERVICE_META[k].short)}</a>`).join('');

  $('#menuBtn').addEventListener('click', openSheet);
  $('#sheetClose').addEventListener('click', closeSheet);
  $$('[data-open-palette]').forEach((b) => b.addEventListener('click', openPalette));
  $$('[data-open-contact]').forEach((b) => b.addEventListener('click', () => { closeSheet(); contactModal(); }));
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openPalette(); }
    if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName) && !document.querySelector('.modal-back, .overlay')) { e.preventDefault(); openPalette(); }
  });
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('hashchange', route);
  $('#year').textContent = new Date().getFullYear();
  route();

  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
  }
}

init();
