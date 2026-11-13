// Portal Klien: masuk hanya dengan email terdaftar
import { SERVICES, MEREK_UPLOAD_ITEMS } from './data-core.js';
import { UPLOAD_PRESETS, FIRM } from './data-extra.js';
import { buildRetainerOfferingLetterSheets, buildRetainerAgreementSheets } from './doc-templates.js';
import { icon } from './icons.js';
import { chime } from './sound.js';
import { openReader, getSignature } from './reader.js';
import { normalizeEmail, lookupKey, decryptJSON } from './vault.js';
import { $, $$, esc, store, session, toast, modal, idb, fmtBytes, download, copyText, waLink, mailLink, observeReveal } from './util.js';

let vaultP = null;
export const loadVault = () => (vaultP ||= fetch('vault.json', { cache: 'no-cache' }).then((r) => { if (!r.ok) throw new Error('vault'); return r.json(); }));

let current = null; // { rec, lk, source }
const ui = { tab: 'berkas', section: null };

export const portalState = () => current;
export const isLoggedIn = () => !!current;

export async function loginByEmail(email) {
  const e = normalizeEmail(email);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e)) return { error: 'format' };
  const lk = await lookupKey(e);
  try {
    const v = await loadVault();
    if (v.clients && v.clients[lk]) {
      const rec = await decryptJSON(v.clients[lk], e);
      return { rec, lk, source: 'vault' };
    }
  } catch (err) { /* vault gagal dimuat: lanjut ke data lokal */ }
  const local = [...store.get('arthera_admin_local', []), ...store.get('arthera_regs', [])].find((r) => normalizeEmail(r.email) === e);
  if (local) return { rec: local, lk, source: 'local' };
  return { error: 'notfound' };
}

export function setSession(res, { remember = true } = {}) {
  current = res;
  ui.tab = 'berkas'; ui.section = null;
  if (remember && !res.admin) session.set('arthera_client', normalizeEmail(res.rec.email));
}
export function logout() { current = null; session.del('arthera_client'); }

export async function restoreSession() {
  const em = session.get('arthera_client');
  if (!em || current) return;
  const res = await loginByEmail(em);
  if (!res.error) current = res;
}

// ---------- berkas unggahan ----------
const itemsFor = (rec) => JSON.parse(JSON.stringify(rec.serviceKey === 'merek' || !UPLOAD_PRESETS[rec.serviceKey] ? MEREK_UPLOAD_ITEMS : UPLOAD_PRESETS[rec.serviceKey]));
const stKey = () => `arthera_up_${current.lk.slice(0, 16)}`;
const fileKey = (id) => `${current.lk.slice(0, 16)}:${id}`;
const getUp = () => store.get(stKey(), { values: {}, files: {} });
const setUp = (v) => store.set(stKey(), v);
const isOptional = (it) => it.no === '•' || /opsional/i.test(`${it.label} ${it.hint || ''}`);

function computeProgress(items, up) {
  const nibDone = !!up.files.doc_nib_file;
  let done = 0, total = 0;
  const per = {};
  items.forEach((it) => {
    const skipped = nibDone && it.section === 'B' && ['4', '5', '6', '7', '8'].includes(it.no);
    const ok = skipped || (it.type === 'upload' ? !!up.files[it.id] : !!(up.values[it.id] || '').trim());
    per[it.section] ||= { done: 0, total: 0, title: it.sectionTitle };
    if (!isOptional(it)) { total++; per[it.section].total++; if (ok) { done++; per[it.section].done++; } }
    it._ok = ok; it._skipped = skipped;
  });
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0, per };
}

function docsFor(rec) {
  const out = [];
  Object.entries(rec.docs || {}).forEach(([key, d]) => out.push({ key, title: d.title, sheets: d.sheets }));
  const ctx = { pksNo: rec.clientId, clientName: rec.name };
  (rec.templates || []).forEach((t) => {
    if (t === 'retainer_ol') out.push({ key: t, title: `Draf Offering Letter Legal Retainer ${rec.invoiceNo || ''}`.trim(), sheets: buildRetainerOfferingLetterSheets(rec, ctx) });
    if (t === 'retainer_pjh') out.push({ key: t, title: `Draf Perjanjian Jasa Hukum Legal Retainer ${rec.clientId || ''}`.trim(), sheets: buildRetainerAgreementSheets(rec, ctx) });
  });
  return out;
}

const picWa = (rec) => (['merek', 'ldd'].includes(rec.serviceKey) ? FIRM.contacts[1] : FIRM.contacts[0]);

// ---------- GERBANG MASUK ----------
export function gateHTML({ compact = false } = {}) {
  return `
  <div class="gate-card card-dark ${compact ? '' : 'reveal'}" id="gateCard">
    <div class="frame-lines"></div>
    <div class="lock" id="gateLock">${icon('lock')}</div>
    <span class="eyebrow light">Portal Klien Arthera</span>
    <h2 class="h2 mt-1" style="font-size:clamp(1.9rem,3.4vw,2.6rem)">Masuk dengan <em class="it gold-text">email Anda</em></h2>
    <p class="lead mt-1" style="margin-inline:auto;font-size:15px">Tidak perlu nomor PKS atau kata sandi. Cukup email yang terdaftar pada registrasi layanan Anda.</p>
    <form id="gateForm" novalidate>
      <div class="input-icon">${icon('mail')}<input class="input" id="gateEmail" type="email" inputmode="email" autocomplete="email" placeholder="nama@email.com" required aria-label="Email terdaftar"></div>
      <button class="btn btn-gold btn-lg" type="submit" id="gateBtn">${icon('key-round')} <span>Buka Portal Saya</span></button>
      <p class="tiny" id="gateMsg" role="alert" style="color:#E8B4A0;min-height:1.2em;text-align:center"></p>
    </form>
    <div class="gate-note">${icon('fingerprint')}<span>Berkas dan draf dokumen Anda tersimpan terenkripsi (AES-256) dan hanya dapat dibuka dengan email terdaftar. Berkas unggahan disimpan di perangkat Anda sampai dikirim ke Arthera.</span></div>
  </div>`;
}

export function wireGate(root, onSuccess) {
  const form = $('#gateForm', root);
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = $('#gateBtn', root); const msg = $('#gateMsg', root);
    const email = $('#gateEmail', root).value;
    btn.disabled = true; $('span', btn).textContent = 'Memverifikasi…'; msg.textContent = '';
    const res = await loginByEmail(email);
    btn.disabled = false; $('span', btn).textContent = 'Buka Portal Saya';
    if (res.error) {
      msg.textContent = res.error === 'format' ? 'Format email belum benar.' : 'Email belum terdaftar. Silakan registrasi layanan terlebih dahulu atau hubungi Admin Arthera.';
      $('#gateCard', root).classList.remove('shake'); void $('#gateCard', root).offsetWidth; $('#gateCard', root).classList.add('shake');
      return;
    }
    setSession(res);
    const lock = $('#gateLock', root);
    lock.innerHTML = icon('unlock'); lock.classList.add('opening');
    chime();
    setTimeout(() => onSuccess(res), 700);
  });
}

// ---------- DASBOR KLIEN ----------
export function renderPortal(view, { onLogout }) {
  const { rec } = current;
  const srv = SERVICES[rec.serviceKey] || SERVICES.merek;
  const items = itemsFor(rec);
  const up = getUp();
  const prog = computeProgress(items, up);
  const docs = docsFor(rec);
  const sections = Object.keys(prog.per);
  if (!ui.section || !sections.includes(ui.section)) ui.section = sections.find((s) => prog.per[s].done < prog.per[s].total) || sections[0];
  const stage = Number.isInteger(rec.stage) ? rec.stage : 0;
  const pic = picWa(rec);

  view.innerHTML = `
  <div class="portal-shell">
    <div class="wrap">
      ${current.admin ? `<div class="notice mt-1" style="margin-bottom:16px">${icon('eye')}<span>Mode pratinjau Admin: Anda melihat portal milik <b>${esc(rec.name)}</b>.</span></div>` : ''}
      <section class="card-dark portal-hero reveal">
        <div class="frame-lines"></div>
        <div style="position:relative">
          <div class="hello">Selamat datang,</div>
          <h1 class="h2">${esc(rec.name)}</h1>
          <div class="chips">
            <span class="pill">${icon(iconFor(rec.serviceKey))} ${esc(srv.title)}</span>
            ${rec.clientId ? `<span class="pill mono">${esc(rec.clientId)}</span>` : ''}
            <span class="pill">${icon('mail')} ${esc(rec.email)}</span>
          </div>
          <div class="row mt-3">
            <a class="btn btn-sm btn-gold" href="${waLink(pic.wa, `Halo ${pic.name.split(',')[0]}, saya ${rec.name}${rec.clientId ? ` (ID ${rec.clientId})` : ''}. Saya ingin bertanya terkait layanan ${srv.title}.`)}" target="_blank" rel="noopener">${icon('message-circle')} Hubungi PIC</a>
            <button class="btn btn-sm btn-ghost light" id="pLogout">${icon('log-out')} Keluar</button>
          </div>
        </div>
        <div class="ring" style="--p:${prog.pct}"><span>${prog.pct}%<small>Berkas</small></span></div>
      </section>

      <section class="card pad mt-3 reveal">
        <div class="row between">
          <div><span class="eyebrow">Status Penanganan</span><div class="h4 mt-1">${esc(rec.status || 'Registrasi diterima · Menunggu verifikasi Admin')}</div></div>
          ${rec.pic ? `<span class="pill pill-gold">${icon('user')} PIC: ${esc(rec.pic)}</span>` : ''}
        </div>
        <div class="tracker">${srv.flowSteps.map((s, i) => `<div class="trk ${i < stage ? 'done' : i === stage ? 'now' : ''}"><div class="b">${i < stage ? '✓' : s.no}</div><span>${esc(s.title)}</span></div>`).join('')}</div>
      </section>

      <div class="mt-4 row between">
        <div class="tabs" role="tablist">
          <button class="tab ${ui.tab === 'berkas' ? 'active' : ''}" data-ptab="berkas">${icon('folder-lock')} Berkas Pendukung <span class="count">${prog.done}/${prog.total}</span></button>
          <button class="tab ${ui.tab === 'draf' ? 'active' : ''}" data-ptab="draf">${icon('file-text')} Draf Dokumen <span class="count">${docs.length}</span></button>
          ${rec.payment ? `<button class="tab ${ui.tab === 'bayar' ? 'active' : ''}" data-ptab="bayar">${icon('landmark')} Pembayaran</button>` : ''}
        </div>
      </div>
      <div id="pTab" class="mt-1"></div>
    </div>
  </div>`;

  const tabEl = $('#pTab', view);
  const renderTab = () => {
    if (ui.tab === 'draf') renderDrafts(tabEl, docs, rec);
    else if (ui.tab === 'bayar' && rec.payment) renderPayment(tabEl, rec);
    else renderUploads(tabEl, rec, items, () => renderPortal(view, { onLogout }));
    observeReveal(tabEl);
  };
  renderTab();
  $$('[data-ptab]', view).forEach((b) => b.addEventListener('click', () => {
    ui.tab = b.dataset.ptab;
    $$('[data-ptab]', view).forEach((x) => x.classList.toggle('active', x === b));
    renderTab();
  }));
  $('#pLogout', view).addEventListener('click', () => { logout(); toast('Anda telah keluar dari Portal Klien'); onLogout(); });
  observeReveal(view);
}

const iconFor = (k) => ({ merek: 'award', ldd: 'file-search-2', retainer: 'shield-check', korporasi: 'landmark', litigasi: 'scale' }[k] || 'briefcase');

function renderUploads(el, rec, items, rerenderAll) {
  const up = getUp();
  const prog = computeProgress(items, up);
  const secItems = items.filter((i) => i.section === ui.section);
  const secs = Object.entries(prog.per);
  el.innerHTML = `
    <div class="upload-layout">
      <nav class="card sec-nav" aria-label="Bagian berkas">
        ${secs.map(([k, v]) => `<button class="sec-btn ${k === ui.section ? 'active' : ''} ${v.done === v.total ? 'full' : ''}" data-sec="${k}"><span>${esc(v.title.replace(/^Bagian\s+/, '').replace(/\s*\(.*\)\s*$/, ''))}</span><span class="cnt">${v.done}/${v.total}</span></button>`).join('')}
      </nav>
      <div>
        <div class="doc-items">${secItems.map((it) => itemHTML(it, up)).join('')}</div>
        <div class="row between mt-2">
          ${(() => { const i = secs.findIndex(([k]) => k === ui.section); const p = secs[i - 1], n = secs[i + 1];
            return `${p ? `<button class="btn btn-ghost btn-sm" data-sec="${p[0]}">${icon('arrow-left')} Bagian ${p[0]}</button>` : '<span></span>'}${n ? `<button class="btn btn-dark btn-sm" data-sec="${n[0]}">Lanjut Bagian ${n[0]} ${icon('arrow-right')}</button>` : ''}`; })()}
        </div>
        <div class="card pack-bar">
          <div><b class="h4">Kirim berkas ke Arthera</b><div class="small muted">Satukan seluruh isian & unggahan menjadi satu paket rapi (.zip), lalu kirim ke tim kami.</div></div>
          <div class="row"><button class="btn btn-ghost btn-sm" id="pZip">${icon('archive')} Unduh Paket</button><button class="btn btn-gold btn-sm" id="pSend">${icon('send')} Kirim ke Arthera</button></div>
        </div>
      </div>
    </div>`;

  // pratinjau gambar dari IndexedDB
  secItems.filter((it) => it.type === 'upload' && up.files[it.id]).forEach(async (it) => {
    const rec2 = await idb.get(fileKey(it.id));
    const box = $(`[data-thumb="${it.id}"]`, el);
    if (!box || !rec2) return;
    if (rec2.type && rec2.type.startsWith('image/')) { const u = URL.createObjectURL(rec2.blob); box.innerHTML = `<img src="${u}" alt="">`; }
  });

  $$('[data-sec]', el).forEach((b) => b.addEventListener('click', () => { ui.section = b.dataset.sec; renderUploads(el, rec, items, rerenderAll); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }));

  const handleFile = async (id, file) => {
    if (!file) return;
    if (file.size > 15 * 1024 * 1024) { toast('Ukuran berkas maksimal 15 MB', file.name, 'err'); return; }
    await idb.set(fileKey(id), { blob: file, name: file.name, type: file.type, size: file.size });
    const u = getUp(); u.files[id] = { name: file.name, size: file.size, type: file.type, at: Date.now() }; setUp(u);
    toast('Berkas tersimpan', file.name);
    rerenderAll();
  };
  $$('.drop', el).forEach((dz) => {
    const id = dz.dataset.drop;
    const inp = $('input', dz);
    inp.addEventListener('change', () => handleFile(id, inp.files[0]));
    ['dragenter', 'dragover'].forEach((ev) => dz.addEventListener(ev, (e) => { e.preventDefault(); dz.classList.add('over'); }));
    ['dragleave', 'drop'].forEach((ev) => dz.addEventListener(ev, (e) => { e.preventDefault(); dz.classList.remove('over'); }));
    dz.addEventListener('drop', (e) => handleFile(id, e.dataTransfer.files[0]));
  });
  $$('[data-rm]', el).forEach((b) => b.addEventListener('click', async () => {
    const id = b.dataset.rm; await idb.del(fileKey(id));
    const u = getUp(); delete u.files[id]; setUp(u); toast('Berkas dihapus'); rerenderAll();
  }));
  $$('[data-view]', el).forEach((b) => b.addEventListener('click', async () => {
    const f = await idb.get(fileKey(b.dataset.view));
    if (!f) return toast('Berkas tidak ditemukan di perangkat ini', '', 'err');
    const u = URL.createObjectURL(f.blob); window.open(u, '_blank', 'noopener');
  }));
  let t;
  $$('[data-val]', el).forEach((inp) => inp.addEventListener('input', () => {
    clearTimeout(t);
    t = setTimeout(() => {
      const u = getUp(); u.values[inp.dataset.val] = inp.value; setUp(u);
      const tick = $(`[data-tick="${inp.dataset.val}"]`, el); tick && tick.classList.add('show');
      const p = computeProgress(items, u);
      $$('.sec-btn', el).forEach((sb) => { const v = p.per[sb.dataset.sec]; if (v) { $('.cnt', sb).textContent = `${v.done}/${v.total}`; sb.classList.toggle('full', v.done === v.total); } });
      const card = inp.closest('.doc-item'); const it = items.find((x) => x.id === inp.dataset.val);
      card && card.classList.toggle('done', !!inp.value.trim()); if (it && card) $('.no', card).textContent = inp.value.trim() ? '✓' : it.no;
      const ring = document.querySelector('.portal-hero .ring'); if (ring) { ring.style.setProperty('--p', p.pct); $('span', ring).firstChild.textContent = `${p.pct}%`; }
      const cnt = document.querySelector('[data-ptab="berkas"] .count'); if (cnt) cnt.textContent = `${p.done}/${p.total}`;
    }, 350);
  }));
  $('#pZip', el).addEventListener('click', () => buildZip(rec, items));
  $('#pSend', el).addEventListener('click', () => sendModal(rec, items));
}

function itemHTML(it, up) {
  const f = up.files[it.id];
  const val = up.values[it.id] || '';
  let ctrl;
  if (it._skipped) {
    ctrl = `<div class="notice" style="padding:10px 14px">${icon('check-circle')}<span>Tidak perlu diisi karena file NIB sudah diunggah.</span></div>`;
  } else if (it.type === 'upload') {
    ctrl = f ? `
      <div class="file-chip">
        <div class="thumb" data-thumb="${it.id}">${icon(/pdf/i.test(f.type) ? 'file-text' : 'image')}</div>
        <div class="meta"><b>${esc(f.name)}</b><span>✓ Tersimpan · ${fmtBytes(f.size)}</span></div>
        <button class="icon-btn" data-view="${it.id}" aria-label="Lihat">${icon('eye')}</button>
        <label class="icon-btn" aria-label="Ganti" style="cursor:pointer">${icon('refresh')}<input type="file" hidden accept=".jpg,.jpeg,.png,.pdf,.doc,.docx" data-replace="${it.id}"></label>
        <button class="icon-btn" data-rm="${it.id}" aria-label="Hapus">${icon('trash-2')}</button>
      </div>` : `
      <label class="drop" data-drop="${it.id}">
        ${icon('cloud-upload')}
        <div><b>Pilih berkas atau tarik ke sini</b><span>JPG, PNG, PDF, DOC · maks. 15 MB</span></div>
        <input type="file" hidden accept=".jpg,.jpeg,.png,.pdf,.doc,.docx">
      </label>`;
  } else if (it.type === 'textarea') {
    ctrl = `<textarea class="textarea" data-val="${it.id}" placeholder="${esc(it.placeholder || '')}">${esc(val)}</textarea><div class="saved-tick" data-tick="${it.id}">${icon('check')} Tersimpan otomatis</div>`;
  } else {
    ctrl = `<input class="input" data-val="${it.id}" value="${esc(val)}" placeholder="${esc(it.placeholder || '')}"><div class="saved-tick" data-tick="${it.id}">${icon('check')} Tersimpan otomatis</div>`;
  }
  return `
    <div class="card doc-item ${it._ok ? 'done' : ''}">
      <div class="no">${it._ok ? '✓' : esc(it.no)}</div>
      <div>
        <div class="lbl">${esc(it.label.replace(/^✏️\s*/, ''))} ${isOptional(it) ? '<span class="pill" style="margin-left:4px">Opsional</span>' : ''}</div>
        ${it.hint ? `<div class="hint">${esc(it.hint)}</div>` : ''}
        <div class="ctrl">${ctrl}</div>
      </div>
    </div>`;
}

document.addEventListener('change', (e) => {
  const inp = e.target.closest('[data-replace]');
  if (!inp || !current) return;
  const file = inp.files[0];
  if (!file) return;
  (async () => {
    if (file.size > 15 * 1024 * 1024) { toast('Ukuran berkas maksimal 15 MB', file.name, 'err'); return; }
    await idb.set(fileKey(inp.dataset.replace), { blob: file, name: file.name, type: file.type, size: file.size });
    const u = getUp(); u.files[inp.dataset.replace] = { name: file.name, size: file.size, type: file.type, at: Date.now() }; setUp(u);
    toast('Berkas diperbarui', file.name);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  })();
});

const slug = (s) => s.replace(/^✏️\s*/, '').replace(/[\\/:*?"<>|]/g, '').replace(/\s+/g, ' ').trim().slice(0, 60);

async function buildZip(rec, items) {
  if (!window.JSZip) return toast('Modul paket belum termuat', '', 'err');
  const up = getUp();
  const zip = new window.JSZip();
  const lines = [`RINGKASAN BERKAS KLIEN · ARTHERA LAW FIRM`, ``, `Nama      : ${rec.name}`, `Email     : ${rec.email}`, `Layanan   : ${(SERVICES[rec.serviceKey] || {}).title || rec.serviceKey}`, `ID / PKS  : ${rec.clientId || '-'}`, `Dibuat    : ${new Date().toLocaleString('id-ID')}`, ``];
  let n = 0;
  for (const it of items) {
    const sec = it.sectionTitle;
    if (it.type === 'upload') {
      const meta = up.files[it.id];
      if (meta) {
        const f = await idb.get(fileKey(it.id));
        if (f) { const ext = (f.name.split('.').pop() || 'bin').toLowerCase(); zip.folder(slug(sec)).file(`${it.no === '•' ? 'X' : it.no.padStart(2, '0')} ${slug(it.label)}.${ext}`, f.blob); n++; }
        lines.push(`[✓] ${it.no}. ${slug(it.label)} → ${meta.name}`);
      } else lines.push(`[ ] ${it.no}. ${slug(it.label)} → (belum diunggah)`);
    } else {
      const v = (up.values[it.id] || '').trim();
      lines.push(`[${v ? '✓' : ' '}] ${it.no}. ${slug(it.label)}\n      ${v || '(belum diisi)'}`);
    }
  }
  zip.file('00 Ringkasan Isian.txt', lines.join('\n'));
  const blob = await zip.generateAsync({ type: 'blob' });
  download(blob, `Berkas ${rec.name.replace(/[\\/:*?"<>|]/g, '')} - Arthera.zip`);
  toast('Paket berkas siap', `${n} berkas + ringkasan isian`);
  return lines.join('\n');
}

function sendModal(rec, items) {
  const srv = SERVICES[rec.serviceKey] || SERVICES.merek;
  const pic = picWa(rec);
  modal({
    eyebrow: 'Kirim Berkas',
    title: 'Dua langkah, selesai.',
    body: `
      <div class="timeline" style="margin-top:6px">
        <div class="tl-item"><div class="tl-medal">1</div><div class="tl-body card"><b>Unduh paket berkas</b><p>Semua unggahan dan isian Anda disatukan dalam satu file .zip beserta ringkasannya.</p><button class="btn btn-dark btn-sm mt-1" data-s="zip">${icon('archive')} Unduh Paket (.zip)</button></div></div>
        <div class="tl-item"><div class="tl-medal">2</div><div class="tl-body card"><b>Kirim ke Arthera</b><p>Lampirkan file .zip tadi pada email, atau kirim melalui WhatsApp PIC Anda.</p>
          <div class="row mt-1"><button class="btn btn-gold btn-sm" data-s="mail">${icon('mail')} Email Arthera</button><button class="btn btn-ghost btn-sm" data-s="wa">${icon('message-circle')} WhatsApp ${esc(pic.name.split(' ')[0])}</button></div></div></div>
      </div>`,
    onMount(m) {
      m.addEventListener('click', async (e) => {
        const b = e.target.closest('[data-s]'); if (!b) return;
        const up = getUp(); const prog = computeProgress(itemsFor(rec), up);
        const msg = `Kepada Tim ARTHERA LAW FIRM,\n\nBerikut saya kirimkan berkas pendukung layanan ${srv.title}.\nNama: ${rec.name}\nEmail: ${rec.email}\nID/PKS: ${rec.clientId || '-'}\nKelengkapan: ${prog.done}/${prog.total} butir (${prog.pct}%)\n\nPaket berkas (.zip) saya lampirkan.\nTerima kasih.`;
        if (b.dataset.s === 'zip') buildZip(rec, items);
        if (b.dataset.s === 'mail') location.href = mailLink(FIRM.email, `Berkas Pendukung ${srv.title} - ${rec.name}`, msg);
        if (b.dataset.s === 'wa') window.open(waLink(pic.wa, msg), '_blank', 'noopener');
      });
    }
  });
}

function signBanner(rec) {
  if (!rec.signLink) return '';
  const n = (rec.signDocs || []).length;
  return `<a class="card notice mt-2 reveal" href="${esc(rec.signLink)}" target="_blank" rel="noopener" style="display:flex;gap:12px;align-items:center;text-decoration:none">
    ${icon('signature')}<div class="grow"><b>${n} surat menunggu tanda tangan elektronik & e-Meterai Anda</b>
    <div class="small muted">${esc((rec.signDocs || []).join(' · '))}</div></div><span class="btn btn-gold btn-sm">Buka & tanda tangani</span></a>`;
}

function renderDrafts(el, docs, rec) {
  if (!docs.length && rec.signLink) { el.innerHTML = signBanner(rec); return; }
  if (!docs.length) {
    el.innerHTML = `<div class="card empty mt-2 reveal">${icon('hourglass')}<div class="h4">Draf dokumen sedang disiapkan</div><p class="small mt-1">Draf perjanjian akan muncul di sini setelah registrasi Anda diverifikasi Admin Arthera.</p></div>`;
    return;
  }
  el.innerHTML = `${signBanner(rec)}<div class="doc-cards">${docs.map((d, i) => {
    const sig = getSignature(current.lk, d.key);
    return `<button class="card doc-card reveal" data-doc="${i}">
      <div class="paper-stack"><i></i><i></i><i><u></u><u></u><u></u><u></u><u></u></i></div>
      <span class="pill ${sig ? 'pill-ok' : 'pill-warn'}"><span class="dot"></span>${sig ? 'Disetujui elektronik' : 'Menunggu tanda tangan'}</span>
      <div class="h4">${esc(d.title)}</div>
      <div class="small muted">${d.sheets.length} halaman · Status DRAF</div>
      <span class="btn-link">${icon('book-open')} Buka & baca</span>
    </button>`;
  }).join('')}</div>
  <p class="small muted mt-2 row">${icon('info')} Draf bersifat rahasia (Pasal 19 UU No. 18 Tahun 2003 tentang Advokat) dan dapat dicetak atau disimpan sebagai PDF dari ruang baca.</p>`;
  $$('[data-doc]', el).forEach((b) => b.addEventListener('click', () => {
    const d = docs[Number(b.dataset.doc)];
    openReader({ title: d.title, sheets: d.sheets, docKey: d.key, lk: current.lk, clientName: rec.name, ref: rec.clientId || '', onChange: () => renderDrafts(el, docs, rec) });
  }));
}

function renderPayment(el, rec) {
  const p = rec.payment;
  el.innerHTML = `
    <div class="mt-2" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px;align-items:start">
      <div class="pay-card card-dark reveal">
        <div class="row between" style="position:relative"><b class="sc" style="font-size:1.4rem">${esc(p.bank)}</b><img src="assets/emblem-light.png" alt="" style="width:40px"></div>
        <div style="position:relative"><div class="chipcard"></div><div class="acc mt-2">${esc(p.accNo)}</div><div class="small" style="opacity:.75;margin-top:6px">a.n. ${esc(p.accName)}</div></div>
      </div>
      <div class="card pad reveal stack">
        <div><span class="eyebrow">Berita Transfer</span><div class="row mt-1"><b class="mono" style="font-size:1.05rem">${esc(p.reference)}</b><button class="btn btn-ghost btn-sm" data-cp="${esc(p.reference)}">${icon('copy')} Salin</button></div></div>
        <div><span class="eyebrow">Nomor Rekening</span><div class="row mt-1"><b class="mono" style="font-size:1.05rem">${esc(p.accNo)}</b><button class="btn btn-ghost btn-sm" data-cp="${esc(p.accNo.replace(/\s/g, ''))}">${icon('copy')} Salin</button></div></div>
        ${p.due ? `<div><span class="eyebrow">Batas Pelunasan</span><div class="h4 mt-1">${esc(p.due)}</div></div>` : ''}
        <p class="small muted">Setelah transfer, unggah bukti pembayaran pada tab <b>Berkas Pendukung</b>. Kuitansi lunas diterbitkan paling lambat 3 hari kerja setelah konfirmasi.</p>
      </div>
    </div>`;
  $$('[data-cp]', el).forEach((b) => b.addEventListener('click', () => copyText(b.dataset.cp, 'Tersalin')));
}
