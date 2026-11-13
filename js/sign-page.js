// Halaman tanda tangan elektronik: ttd.html#<token>
// Token di link adalah kunci untuk membuka isi dokumen (terenkripsi di sign-vault.json) sekaligus bukti hak menandatangani.
// Tanda tangan dan berkas e-Meterai dikirim ke Google Drive Arthera lewat web app Apps Script (js/config.js).
import { decryptJSON } from './vault.js';
import { signLookup, ROLE_LABEL } from './sign-core.js';
import { signatureModal } from './reader.js';
import { $, $$, esc, toast, printHTML } from './util.js';
import { icon } from './icons.js';
import { ARTHERA_ENDPOINT, EMETERAI_INFO_URL } from './config.js';

const root = $('#ttd');
const token = decodeURIComponent(location.hash.slice(1)).trim();
let data = null;          // isi link yang sudah didekripsi
let status = {};          // { docKey: { klien: {name, at, img}, arthera: {...}, meterai: {fileName, at} } }

const KOP = `<div class="ltr-kop"><img src="assets/logo-line.png" alt="Arthera Law Firm"><div>Advokat, Konsultan Hukum &amp; Kekayaan Intelektual<br>artheralawfirm@gmail.com · 0852-8614-4102</div></div>`;
const paper = (d) => `<div class="ttd-paper ltr">${KOP}${d.sheets.map((s) => s.html).join('')}</div>`;

const fail = (title, text) => { root.innerHTML = `<div class="card ttd-card"><div class="ttd-eyebrow">Arthera Law Firm</div><h1>${esc(title)}</h1><p class="muted">${esc(text)}</p></div>`; };

async function api(body) {
  const res = await fetch(ARTHERA_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify({ token, ...body }) });
  const out = await res.json();
  if (!out.ok) throw new Error(out.error || 'Server menolak permintaan');
  return out;
}

async function loadStatus() {
  if (!ARTHERA_ENDPOINT) return;
  try { status = (await api({ kind: 'status' })).status || {}; }
  catch (e) { toast('Status tanda tangan belum bisa dimuat', e.message, 'err'); }
}

const myRole = () => data.role;
const needs = (d, role) => d.signers.includes(role);
const signedBy = (d, role) => !!(status[d.key] && status[d.key][role]);
const docDone = (d) => needs(d, myRole()) ? signedBy(d, myRole()) && (!(d.meterai && myRole() === 'klien') || !!(status[d.key] && status[d.key].meterai)) : true;

function fillDocSlots(container, d, interactive) {
  $$('[data-sign-slot]', container).forEach((slot) => {
    const role = slot.dataset.signSlot || 'klien';
    const sig = status[d.key] && status[d.key][role];
    slot.classList.toggle('signed', !!sig);
    if (sig && sig.img) {
      slot.innerHTML = `<div><img src="${sig.img}" alt="Tanda tangan ${esc(sig.name)}"><div class="sig-meta">Ditandatangani elektronik oleh ${esc(sig.name)}<br>${esc(sig.at)}</div></div>`;
    } else if (sig) {
      slot.innerHTML = `<div class="sig-meta">Ditandatangani elektronik oleh ${esc(sig.name)}<br>${esc(sig.at)}</div>`;
    } else if (interactive && role === myRole()) {
      slot.innerHTML = `<button type="button" data-do-sign>${icon('pen-line')} Tanda tangani di sini</button>`;
    } else {
      slot.innerHTML = `<div class="sig-meta" style="color:#8A5E1E">Menunggu tanda tangan ${esc(ROLE_LABEL[role] || role)}</div>`;
    }
  });
}


// ---------- Tata letak: menu samping (daftar surat) + tab langkah per surat ----------
let cur = 0;   // surat yang dibuka
let step = 0;  // tab langkah yang dibuka

function stepsFor(d) {
  const mine = needs(d, myRole());
  if (!mine) return [{ id: 'read', label: 'Baca surat' }];
  const s = [{ id: 'sign', label: 'Baca & tanda tangan' }];
  if (d.meterai && myRole() === 'klien') s.push({ id: 'pdf', label: 'Unduh PDF' }, { id: 'meterai', label: 'Beli e-Meterai' }, { id: 'send', label: 'Kirim ke Arthera' });
  return s;
}

function stepDone(d, id) {
  const met = status[d.key] && status[d.key].meterai;
  if (id === 'sign') return signedBy(d, myRole());
  if (id === 'pdf' || id === 'meterai' || id === 'send') return !!met;
  return false;
}

function pillFor(d) {
  if (!needs(d, myRole())) return '<span class="ttd-pill">Dibaca</span>';
  if (docDone(d)) return '<span class="ttd-pill ok">Selesai</span>';
  return signedBy(d, myRole()) ? '<span class="ttd-pill">Perlu e-Meterai</span>' : '<span class="ttd-pill">Perlu TTD</span>';
}

function paneHTML(d, id) {
  const met = status[d.key] && status[d.key].meterai;
  const signed = signedBy(d, myRole());
  if (id === 'read' || id === 'sign') {
    return `
      <div class="ttd-scroll" id="docBody">${paper(d)}</div>
      <div class="ttd-actions">
        ${id === 'sign' && !signed ? `<button class="btn btn-gold" data-sign>${icon('signature')} Tanda tangani dokumen</button>` : ''}
        ${id === 'sign' && signed ? `<span class="ttd-pill ok">${icon('check-circle')} Sudah Anda tandatangani</span>` : ''}
        <button class="btn btn-ghost" data-print>${icon('printer')} Unduh PDF</button>
      </div>`;
  }
  if (id === 'pdf') {
    return `<div class="ttd-pane">
      <h2>Unduh PDF yang sudah ditandatangani</h2>
      <p>${signed ? 'Tekan tombol di bawah, lalu pada jendela cetak pilih <b>Simpan sebagai PDF</b>. Simpan berkasnya di perangkat Anda untuk dibubuhi e-Meterai pada langkah berikutnya.' : 'Tanda tangani surat ini terlebih dahulu pada tab <b>Baca & tanda tangan</b>, kemudian kembali ke tab ini untuk mengunduh PDF-nya.'}</p>
      <button class="btn btn-gold" data-print ${signed ? '' : 'disabled'}>${icon('download')} Unduh PDF</button></div>`;
  }
  if (id === 'meterai') {
    return `<div class="ttd-pane">
      <h2>Beli & bubuhkan e-Meterai Rp10.000</h2>
      <p>Beli e-Meterai Rp10.000 melalui distributor resmi Peruri. Unggah PDF yang sudah Anda unduh ke layanan distributor tersebut, lalu letakkan e-Meterai pada kolom <b>Tempat e-Meterai</b> di dekat tanda tangan Anda. Setelah selesai, simpan PDF hasilnya.</p>
      <a class="btn btn-gold" href="${EMETERAI_INFO_URL}" target="_blank" rel="noopener">${icon('external-link')} Lihat distributor resmi e-Meterai</a></div>`;
  }
  if (id === 'send') {
    return `<div class="ttd-pane">
      <h2>Kirim PDF bermeterai ke Arthera</h2>
      <p>${met ? `PDF sudah diterima Arthera: <b>${esc(met.fileName)}</b> pada ${esc(met.at)}. Anda dapat mengirim ulang apabila ada perbaikan.` : 'Pilih PDF yang sudah ditandatangani dan dibubuhi e-Meterai. Berkas akan langsung tersimpan di folder dokumen Anda pada Arthera.'}</p>
      <label class="btn btn-gold" ${ARTHERA_ENDPOINT ? '' : 'aria-disabled="true"'}>${icon('upload')} ${met ? 'Kirim ulang PDF' : 'Pilih PDF bermeterai'}<input type="file" accept="application/pdf,.pdf" data-meterai hidden ${ARTHERA_ENDPOINT ? '' : 'disabled'}></label></div>`;
  }
  return '';
}

function render() {
  const docs = data.docs;
  const d = docs[cur];
  const steps = stepsFor(d);
  if (step >= steps.length) step = steps.length - 1;
  const done = docs.filter(docDone).length;
  const last = step === steps.length - 1;
  root.innerHTML = `
    <div class="ttd-shell">
      <aside class="ttd-side card">
        <div class="ttd-eyebrow">${esc(data.client.clientId)}</div>
        <div class="ttd-who">${esc(data.signer)}</div>
        <div class="ttd-progress"><i style="width:${Math.round((done / docs.length) * 100)}%"></i></div>
        <div class="tiny muted">${done} dari ${docs.length} surat selesai</div>
        <nav class="ttd-nav" aria-label="Daftar surat">${docs.map((x, i) => `
          <button class="ttd-nav-item ${i === cur ? 'on' : ''}" data-doc="${i}" aria-current="${i === cur ? 'true' : 'false'}">
            <span class="no">${i + 1}</span><span class="t">${esc(x.title)}</span>${pillFor(x)}
          </button>`).join('')}
        </nav>
      </aside>
      <section class="ttd-main card">
        ${ARTHERA_ENDPOINT ? '' : '<div class="ttd-note err"><b>Penyimpanan belum aktif.</b> Dokumen dapat dibaca, tetapi tanda tangan belum dapat dikirim ke Arthera. Silakan hubungi Admin Arthera.</div>'}
        <div class="ttd-head">
          <div><div class="ttd-eyebrow">Surat ${cur + 1} dari ${docs.length}</div><h1>${esc(d.title)}</h1></div>
        </div>
        <div class="ttd-tabs" role="tablist">${steps.map((s, i) => `
          <button role="tab" class="ttd-tab ${i === step ? 'on' : ''} ${stepDone(d, s.id) ? 'done' : ''}" data-step="${i}" aria-selected="${i === step}">
            <span class="n">${stepDone(d, s.id) ? '✓' : i + 1}</span>${esc(s.label)}</button>`).join('')}
        </div>
        <div class="ttd-panel">${paneHTML(d, steps[step].id)}</div>
        <div class="ttd-foot">
          <button class="btn btn-ghost btn-sm" data-prev ${step === 0 && cur === 0 ? 'disabled' : ''}>${icon('chevron-left')} ${step === 0 ? 'Surat sebelumnya' : 'Kembali'}</button>
          <button class="btn btn-dark btn-sm" data-next ${last && cur === docs.length - 1 ? 'disabled' : ''}>${last ? 'Surat berikutnya' : 'Lanjut'} ${icon('chevron-right')}</button>
        </div>
      </section>
    </div>`;
  const body = $('#docBody', root);
  if (body) fillDocSlots(body, d, steps[step].id === 'sign');
  wire(d, steps);
}

function go(nextCur, nextStep) {
  cur = nextCur; step = nextStep;
  render();
  const main = $('.ttd-main', root);
  if (main && main.getBoundingClientRect().top < 0) main.scrollIntoView({ block: 'start' });
}

function wire(d, steps) {
  $$('[data-doc]', root).forEach((b) => b.addEventListener('click', () => go(Number(b.dataset.doc), 0)));
  $$('[data-step]', root).forEach((b) => b.addEventListener('click', () => go(cur, Number(b.dataset.step))));
  $('[data-prev]', root).addEventListener('click', () => (step > 0 ? go(cur, step - 1) : go(cur - 1, 0)));
  $('[data-next]', root).addEventListener('click', () => (step < steps.length - 1 ? go(cur, step + 1) : go(cur + 1, 0)));
  $$('[data-print]', root).forEach((b) => b.addEventListener('click', () => printDoc(d)));
  const openSign = () => {
    if (!ARTHERA_ENDPOINT) { toast('Penyimpanan belum aktif', 'Tanda tangan belum dapat dikirim. Hubungi Admin Arthera.', 'err'); return; }
    signatureModal({ name: data.signer, title: 'Tanda tangani dokumen',
      agreeHTML: `Saya telah membaca seluruh isi <b>${esc(d.title)}</b> dan dengan ini menandatanganinya secara elektronik sebagai <b>${esc(data.signer)}</b>.`,
      onSave: async (sig) => {
        if (!sig) return;
        try {
          toast('Mengirim tanda tangan…', 'Mohon tunggu');
          await api({ kind: 'sign', docKey: d.key, name: sig.name, at: sig.at, img: sig.img });
          status[d.key] = { ...(status[d.key] || {}), [myRole()]: { name: sig.name, at: sig.at, img: sig.img } };
          toast('Tanda tangan tersimpan', 'Sudah diterima Arthera');
          render();
        } catch (e) { toast('Tanda tangan GAGAL dikirim', `${e.message}. Silakan coba lagi.`, 'err'); }
      } });
  };
  $$('[data-sign], [data-do-sign]', root).forEach((b) => b.addEventListener('click', openSign));
  const inp = $('[data-meterai]', root);
  if (inp) inp.addEventListener('change', async () => {
    const f = inp.files[0]; if (!f) return;
    if (!/\.pdf$/i.test(f.name)) { toast('Berkas harus PDF', f.name, 'err'); return; }
    if (f.size > 15 * 1024 * 1024) { toast('Ukuran maksimal 15 MB', f.name, 'err'); return; }
    try {
      toast('Mengirim PDF bermeterai…', 'Mohon tunggu');
      const dataBase64 = await new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(String(r.result).split(',')[1]); r.onerror = rej; r.readAsDataURL(f); });
      const out = await api({ kind: 'meterai', docKey: d.key, fileName: f.name, dataBase64 });
      status[d.key] = { ...(status[d.key] || {}), meterai: { fileName: out.fileName, at: out.at } };
      toast('PDF bermeterai diterima', out.fileName);
      render();
    } catch (e) { toast('PDF GAGAL dikirim', `${e.message}. Silakan coba lagi.`, 'err'); }
  });
}

function printDoc(d) {
  const tmp = document.createElement('div');
  tmp.innerHTML = `<section class="print-sheet">${paper(d)}</section>`;
  fillDocSlots(tmp, d, false);
  printHTML(tmp.innerHTML, `${d.file || d.title} - ${data.client.name}`);
}

(async () => {
  if (!token) return fail('Link tidak lengkap', 'Buka link tanda tangan persis seperti yang dikirim Arthera.');
  try {
    const v = await (await fetch('sign-vault.json', { cache: 'no-cache' })).json();
    const box = v.links[await signLookup(token)];
    if (!box) return fail('Link tidak dikenal', 'Link ini tidak berlaku atau sudah diganti. Silakan minta link baru ke Arthera.');
    data = await decryptJSON(box, token);
  } catch (e) { return fail('Dokumen tidak dapat dibuka', 'Periksa koneksi internet Anda, lalu muat ulang halaman ini.'); }
  await loadStatus();
  const firstOpen = data.docs.findIndex((x) => !docDone(x));
  cur = firstOpen === -1 ? 0 : firstOpen;
  render();
})();
