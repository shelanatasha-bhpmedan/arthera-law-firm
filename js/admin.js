// Panel Admin: database klien, aktivasi akses email, publikasi vault terenkripsi
import { SERVICES } from './data-core.js';
import { FIRM } from './data-extra.js';
import { icon } from './icons.js';
import { buildVault, decryptJSON, normalizeEmail, lookupKey } from './vault.js';
import { loadVault, setSession } from './portal.js';
import { $, $$, esc, store, session, toast, modal, download, copyText, waLink, fmtDate } from './util.js';

let admin = null; // { pass, base: [], generated }
const ui = { q: '', f: 'all' };
const LOCAL = 'arthera_admin_local';
const DELETED = 'arthera_admin_deleted';

export async function restoreAdmin() {
  const p = session.get('arthera_admin');
  if (p && !admin) { try { await unlock(p); } catch { session.del('arthera_admin'); } }
}
async function unlock(pass) {
  const v = await loadVault();
  const data = await decryptJSON(v.admin, pass);
  admin = { pass, base: data.full || data.clients || [], generated: v.generated };
  session.set('arthera_admin', pass);
}

const clean = (r) => { const { _src, _pending, ...x } = r; return x; };
function records() {
  const del = new Set(store.get(DELETED, []));
  const map = new Map();
  admin.base.forEach((r) => map.set(normalizeEmail(r.email), { ...r, _src: 'vault' }));
  store.get(LOCAL, []).forEach((r) => {
    const k = normalizeEmail(r.email);
    const b = map.get(k);
    const pending = !b || JSON.stringify(clean({ ...b, ...r })) !== JSON.stringify(clean(b));
    map.set(k, { ...(b || {}), ...r, _src: b ? 'vault' : 'local', _pending: pending });
  });
  store.get('arthera_regs', []).forEach((r) => { const k = normalizeEmail(r.email); if (!map.has(k)) map.set(k, { ...r, _src: 'reg', _pending: true }); });
  del.forEach((k) => { const r = map.get(k); if (r) { r._deleted = true; r._pending = true; } });
  return [...map.values()];
}

export function renderAdmin(view, nav) {
  if (!admin) return renderGate(view, nav);
  const all = records();
  const live = all.filter((r) => !r._deleted);
  const pending = all.filter((r) => r._pending).length;
  const q = ui.q.trim().toLowerCase();
  const list = live.filter((r) => (ui.f === 'all' || r.serviceKey === ui.f) && (!q || [r.name, r.email, r.clientId, r.scopeSummary, r.status].join(' ').toLowerCase().includes(q)));
  const cnt = (k) => live.filter((r) => (Array.isArray(k) ? k.includes(r.serviceKey) : r.serviceKey === k)).length;

  view.innerHTML = `
  <section class="page-head dark"><div class="frame-lines"></div>
    <div class="wrap"><div class="head-row">
      <div><span class="eyebrow">Internal · Administrator</span><h1 class="h2">Database Klien</h1><p class="lead">Aktifkan akses Portal Klien cukup dengan mendaftarkan email klien. Data dipublikasikan dalam bentuk terenkripsi.</p></div>
      <div class="head-actions">
        <button class="btn btn-gold" id="aAdd">${icon('plus')} Tambah Klien</button>
        <button class="btn btn-ghost" id="aImport">${icon('download')} Impor Registrasi</button>
      </div>
    </div></div>
  </section>
  <div class="wrap" style="padding:28px 0 90px">
    ${pending ? `<div class="notice">${icon('alert')}<div class="grow"><b>${pending} perubahan belum dipublikasikan.</b> Klien baru hanya dapat masuk dari perangkat lain setelah Anda menekan <b>Publikasikan</b> dan mengunggah <span class="mono">vault.json</span> ke GitHub.</div><button class="btn btn-dark btn-sm" id="aPublish">${icon('send')} Publikasikan</button></div>`
      : `<div class="notice" style="background:#EEF6F0;border-color:#C6DDCD;color:#2F5B45">${icon('check-circle')}<span>Semua data sudah sinkron dengan versi terbit (${admin.generated ? fmtDate(new Date(admin.generated)) : '-'}).</span></div>`}
    <div class="admin-stats">
      <div class="card astat"><b>${live.length}</b><span>Total Klien</span></div>
      <div class="card astat"><b>${cnt('merek')}</b><span>Merek & HKI</span></div>
      <div class="card astat"><b>${cnt(['ldd', 'retainer', 'korporasi'])}</b><span>LDD · Retainer · Korporasi</span></div>
      <div class="card astat"><b>${cnt('litigasi')}</b><span>Litigasi & PKPU</span></div>
    </div>
    <div class="admin-tools">
      <div class="chips-scroll">${[['all', 'Semua'], ...Object.entries(SERVICES).map(([k, s]) => [k, s.title.split(' ')[0] === 'Konsultan' ? 'Merek & HKI' : s.title.split(/[,&(]/)[0].trim()])].map(([k, l]) => `<button class="chip ${ui.f === k ? 'on' : ''}" data-f="${k}">${esc(l)}</button>`).join('')}</div>
      <div class="row">
        <div class="input-icon" style="width:260px">${icon('search')}<input class="input" id="aQ" placeholder="Cari nama, email, ID…" value="${esc(ui.q)}" style="padding-top:10px;padding-bottom:10px"></div>
        <button class="icon-btn" id="aCsv" title="Ekspor CSV">${icon('download')}</button>
        <button class="icon-btn" id="aLock" title="Kunci panel">${icon('lock')}</button>
      </div>
    </div>
    <div class="rec-list">
      ${list.length ? list.map((r) => `
        <div class="card rec">
          <div><div class="nm">${esc(r.name)}</div><div class="sub">${esc(r.email)} · ${esc(r.whatsapp || '-')}</div>
            <div class="row mt-1" style="gap:6px">${r._src === 'reg' ? '<span class="pill pill-warn">Registrasi baru</span>' : ''}${r._pending ? '<span class="pill pill-warn">Belum terbit</span>' : '<span class="pill pill-ok"><span class="dot"></span>Akses aktif</span>'}</div></div>
          <div><div class="small"><b>${esc((SERVICES[r.serviceKey] || {}).title || r.serviceTitle || '-')}</b></div><div class="sub">${esc(r.scopeSummary || '')}</div></div>
          <div><div class="small mono">${esc(r.clientId || '-')}</div><div class="sub">${esc(r.status || '')}</div></div>
          <div class="acts">
            <button class="icon-btn" data-a="view" data-e="${esc(r.email)}" title="Pratinjau portal">${icon('eye')}</button>
            <button class="icon-btn" data-a="copy" data-e="${esc(r.email)}" title="Salin info akses">${icon('copy')}</button>
            <button class="icon-btn" data-a="wa" data-e="${esc(r.email)}" title="Kirim akses via WhatsApp">${icon('message-circle')}</button>
            <button class="icon-btn" data-a="edit" data-e="${esc(r.email)}" title="Ubah">${icon('pencil')}</button>
            <button class="icon-btn" data-a="del" data-e="${esc(r.email)}" title="Hapus">${icon('trash-2')}</button>
          </div>
        </div>`).join('') : `<div class="card empty">${icon('search')}<div>Tidak ada data yang cocok.</div></div>`}
    </div>
  </div>`;

  const rerender = () => renderAdmin(view, nav);
  $('#aAdd', view).addEventListener('click', () => editModal(null, rerender));
  $('#aImport', view).addEventListener('click', () => importModal(rerender));
  $('#aPublish', view)?.addEventListener('click', () => publish());
  $('#aLock', view).addEventListener('click', () => { admin = null; session.del('arthera_admin'); toast('Panel admin dikunci'); rerender(); });
  $('#aCsv', view).addEventListener('click', () => exportCsv(live));
  $$('[data-f]', view).forEach((b) => b.addEventListener('click', () => { ui.f = b.dataset.f; rerender(); }));
  const qi = $('#aQ', view);
  qi.addEventListener('input', () => { ui.q = qi.value; rerender(); const n = $('#aQ', view); n.focus(); n.setSelectionRange(n.value.length, n.value.length); });
  $$('[data-a]', view).forEach((b) => b.addEventListener('click', async () => {
    const r = all.find((x) => normalizeEmail(x.email) === normalizeEmail(b.dataset.e));
    if (!r) return;
    const access = `Yth. ${r.name},\n\nAkses Portal Klien ARTHERA LAW FIRM Anda telah aktif.\nBuka: ${location.origin}${location.pathname}#/portal\nMasuk cukup dengan email: ${r.email}\n\nDi portal Anda dapat mengunggah berkas pendukung serta meninjau dan menyetujui draf dokumen.\n\nSalam,\nArthera Law Firm`;
    const act = b.dataset.a;
    if (act === 'copy') copyText(access, 'Info akses tersalin');
    if (act === 'wa') { const n = String(r.whatsapp || '').replace(/\D/g, '').replace(/^0/, '62'); window.open(waLink(n || FIRM.contacts[1].wa, access), '_blank', 'noopener'); }
    if (act === 'edit') editModal(r, rerender);
    if (act === 'view') { setSession({ rec: clean(r), lk: await lookupKey(r.email), source: r._src, admin: true }, { remember: false }); nav('#/portal'); }
    if (act === 'del') {
      modal({ eyebrow: 'Konfirmasi', title: `Hapus ${esc(r.name)}?`, body: '<p class="muted">Klien tidak akan dapat masuk ke portal setelah perubahan dipublikasikan.</p>', actions: '<button class="btn btn-ghost btn-sm" data-close>Batal</button><button class="btn btn-dark btn-sm" data-yes>Hapus</button>', onMount(m, close) {
        $('[data-yes]', m).addEventListener('click', () => {
          const k = normalizeEmail(r.email);
          store.set(LOCAL, store.get(LOCAL, []).filter((x) => normalizeEmail(x.email) !== k));
          store.set('arthera_regs', store.get('arthera_regs', []).filter((x) => normalizeEmail(x.email) !== k));
          if (r._src === 'vault') store.set(DELETED, [...new Set([...store.get(DELETED, []), k])]);
          close(); toast('Data dihapus', r._src === 'vault' ? 'Publikasikan untuk menerapkan' : ''); rerender();
        });
      } });
    }
  }));
}

function renderGate(view, nav) {
  view.innerHTML = `
  <section class="portal-gate">
    <div class="gate-card card-dark reveal in" id="aGate">
      <div class="frame-lines"></div>
      <div class="lock">${icon('database')}</div>
      <span class="eyebrow light">Internal Executive System</span>
      <h1 class="h2 mt-1" style="font-size:2.3rem">Panel Administrator</h1>
      <form id="aForm"><div class="input-icon">${icon('key-round')}<input class="input" type="password" id="aPass" placeholder="Kata sandi administrator" autocomplete="current-password"></div>
      <button class="btn btn-gold btn-lg" type="submit">${icon('unlock')} Masuk</button><p class="tiny" id="aMsg" style="color:#E8B4A0;text-align:center;min-height:1.2em"></p></form>
    </div>
  </section>`;
  $('#aForm', view).addEventListener('submit', async (e) => {
    e.preventDefault();
    try { await unlock($('#aPass', view).value); toast('Akses administrator terbuka'); renderAdmin(view, nav); }
    catch { $('#aMsg', view).textContent = 'Kata sandi tidak sesuai.'; const g = $('#aGate', view); g.classList.remove('shake'); void g.offsetWidth; g.classList.add('shake'); }
  });
}

const FIELDS = [
  ['name', 'Nama klien / perusahaan', 'text', true], ['email', 'Email (kunci akses portal)', 'email', true],
  ['whatsapp', 'WhatsApp', 'tel'], ['serviceKey', 'Layanan', 'service'],
  ['clientId', 'Nomor PKS / ID Klien', 'text'], ['invoiceNo', 'Nomor Invoice / Offering Letter', 'text'],
  ['date', 'Tanggal', 'text'], ['pic', 'PIC Arthera', 'text'],
  ['scopeSummary', 'Ruang lingkup singkat', 'text', false, true], ['status', 'Status penanganan', 'text', false, true], ['stage', 'Tahap saat ini', 'stage']
];
const PAY = [['bank', 'Bank'], ['accNo', 'Nomor rekening'], ['accName', 'Atas nama'], ['reference', 'Berita transfer'], ['due', 'Batas pelunasan']];
const RET = [['companyAddress', 'Alamat perusahaan'], ['companyCity', 'Kota'], ['repName', 'Nama pejabat penandatangan'], ['repTitle', 'Jabatan pejabat'], ['deedRef', 'Dasar kewenangan (akta)'], ['retainerMonths', 'Jangka waktu'], ['paymentSchedule', 'Skema pembayaran']];

function editModal(rec, done, prefill = null) {
  const r = rec ? clean(rec) : { serviceKey: 'merek', stage: 0, date: fmtDate(), status: 'Registrasi diverifikasi · Akses portal aktif', ...(prefill || {}) };
  const stageOpts = (k) => (SERVICES[k] || SERVICES.merek).flowSteps.map((s, i) => `<option value="${i}" ${Number(r.stage) === i ? 'selected' : ''}>${s.no} · ${esc(s.title)}</option>`).join('');
  const f = (k, l, t, req, full) => {
    let ctl;
    if (t === 'service') ctl = `<select class="select" name="${k}">${Object.entries(SERVICES).map(([sk, s]) => `<option value="${sk}" ${r.serviceKey === sk ? 'selected' : ''}>${esc(s.title)}</option>`).join('')}</select>`;
    else if (t === 'stage') ctl = `<select class="select" name="stage">${stageOpts(r.serviceKey)}</select>`;
    else ctl = `<input class="input" name="${k}" type="${t}" value="${esc(r[k] ?? '')}" ${req ? 'required' : ''} ${k === 'email' && rec && rec._src === 'vault' ? 'readonly' : ''}>`;
    return `<div class="field ${full ? 'full' : ''}"><label>${l}${req ? ' <span class="req">*</span>' : ''}</label>${ctl}</div>`;
  };
  modal({
    eyebrow: rec ? 'Ubah Data Klien' : 'Klien Baru',
    title: rec ? esc(rec.name) : 'Aktifkan akses portal klien',
    width: 820,
    body: `<form id="eForm"><div class="form-grid">${FIELDS.map(([k, l, t, req, full]) => f(k, l, t, req, full)).join('')}</div>
      <details class="mt-3" ${r.payment ? 'open' : ''}><summary class="h4" style="cursor:pointer">Informasi pembayaran</summary><div class="form-grid mt-2">${PAY.map(([k, l]) => `<div class="field"><label>${l}</label><input class="input" name="pay_${k}" value="${esc((r.payment || {})[k] || '')}"></div>`).join('')}</div></details>
      <details class="mt-2" id="eRet" ${r.serviceKey === 'retainer' ? 'open' : ''}><summary class="h4" style="cursor:pointer">Data draf Legal Retainer (otomatis terisi ke Offering Letter & Perjanjian)</summary><div class="form-grid mt-2">${RET.map(([k, l]) => `<div class="field"><label>${l}</label><input class="input" name="${k}" value="${esc(r[k] || '')}"></div>`).join('')}</div></details>
    </form>`,
    actions: `<button class="btn btn-ghost btn-sm" data-close>Batal</button><button class="btn btn-gold btn-sm" id="eSave">${icon('check')} Simpan</button>`,
    onMount(m, close) {
      const sel = $('[name="serviceKey"]', m);
      sel.addEventListener('change', () => { $('[name="stage"]', m).innerHTML = stageOpts(sel.value); $('#eRet', m).open = sel.value === 'retainer'; });
      $('#eSave', m).addEventListener('click', () => {
        const fd = new FormData($('#eForm', m));
        const o = { ...r };
        FIELDS.forEach(([k]) => { o[k] = (fd.get(k) ?? '').toString().trim(); });
        o.stage = Number(o.stage) || 0;
        o.email = normalizeEmail(o.email);
        if (!o.name || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(o.email)) { toast('Nama dan email valid wajib diisi', '', 'err'); return; }
        o.serviceTitle = SERVICES[o.serviceKey].title;
        const pay = {}; PAY.forEach(([k]) => { const v = (fd.get('pay_' + k) || '').toString().trim(); if (v) pay[k] = v; });
        if (Object.keys(pay).length) o.payment = pay; else delete o.payment;
        RET.forEach(([k]) => { const v = (fd.get(k) || '').toString().trim(); if (v) o[k] = v; else delete o[k]; });
        if (o.serviceKey === 'retainer') o.templates = ['retainer_ol', 'retainer_pjh']; else if (!(rec && rec.templates)) delete o.templates;
        o.updatedAt = new Date().toISOString();
        const local = store.get(LOCAL, []).filter((x) => normalizeEmail(x.email) !== o.email);
        local.push(clean(o));
        store.set(LOCAL, local);
        store.set(DELETED, store.get(DELETED, []).filter((k) => k !== o.email));
        close(); toast('Data klien tersimpan', 'Tekan Publikasikan agar akses berlaku di semua perangkat'); done();
      });
    }
  });
}

function importModal(done) {
  modal({
    eyebrow: 'Impor Registrasi',
    title: 'Tempel kode registrasi dari email klien',
    body: `<p class="small muted">Setiap email registrasi berisi baris <span class="mono">ARTHERA-REG:…</span>. Tempel di bawah untuk mengisi data klien secara otomatis.</p><textarea class="textarea mt-2" id="iCode" placeholder="ARTHERA-REG:..."></textarea>`,
    actions: `<button class="btn btn-ghost btn-sm" data-close>Batal</button><button class="btn btn-gold btn-sm" id="iGo">${icon('check')} Lanjutkan</button>`,
    onMount(m, close) {
      $('#iGo', m).addEventListener('click', () => {
        const raw = ($('#iCode', m).value.match(/ARTHERA-REG:([A-Za-z0-9_-]+)/) || [])[1];
        if (!raw) return toast('Kode registrasi tidak ditemukan', '', 'err');
        try {
          const json = JSON.parse(decodeURIComponent(escape(atob(raw.replace(/-/g, '+').replace(/_/g, '/')))));
          close(); editModal(null, done, json);
        } catch { toast('Kode registrasi tidak valid', '', 'err'); }
      });
    }
  });
}

async function publish() {
  const list = records().filter((r) => !r._deleted).map(clean);
  const close = modal({ eyebrow: 'Publikasi', title: 'Menyiapkan vault terenkripsi…', body: '<p class="muted">Mengenkripsi data setiap klien dengan email masing-masing.</p>' });
  try {
    const vault = await buildVault(list, admin.pass);
    download(new Blob([JSON.stringify(vault)], { type: 'application/json' }), 'vault.json');
    close();
    modal({
      eyebrow: 'Langkah terakhir', title: 'Unggah vault.json ke GitHub',
      body: `<ol class="stack-sm" style="padding-left:20px">
        <li>Buka repositori situs di GitHub.</li>
        <li>Pilih <b>Add file → Upload files</b>, lalu unggah <span class="mono">vault.json</span> yang baru saja terunduh (timpa yang lama).</li>
        <li>Tekan <b>Commit changes</b>. Vercel memperbarui situs otomatis dalam ±1 menit.</li></ol>
        <p class="small muted mt-2">${list.length} klien terenkripsi. Kata sandi admin tetap sama.</p>`,
      actions: '<button class="btn btn-gold btn-sm" data-close>Mengerti</button>'
    });
  } catch (e) { close(); toast('Gagal membuat vault', String(e.message || e), 'err'); }
}

function exportCsv(list) {
  const cols = ['clientId', 'invoiceNo', 'date', 'name', 'email', 'whatsapp', 'serviceTitle', 'scopeSummary', 'status', 'pic'];
  const q = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const csv = ['No,' + cols.join(','), ...list.map((r, i) => [i + 1, ...cols.map((c) => q(c === 'serviceTitle' ? (SERVICES[r.serviceKey] || {}).title : r[c]))].join(','))].join('\n');
  download(new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' }), 'Database Klien Arthera.csv');
  toast('Database diekspor ke CSV');
}
