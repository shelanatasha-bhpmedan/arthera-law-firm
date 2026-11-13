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

function renderList() {
  const docs = data.docs;
  const done = docs.filter(docDone).length;
  root.innerHTML = `
    <div class="card ttd-card">
      <div class="ttd-eyebrow">Tanda Tangan Elektronik · ${esc(data.client.clientId)}</div>
      <h1>${esc(data.signer)}</h1>
      <p class="muted">${esc(data.client.matter)} · ${done}/${docs.length} dokumen selesai</p>
      ${ARTHERA_ENDPOINT ? '' : '<div class="ttd-note err"><b>Penyimpanan belum aktif.</b> Dokumen dapat dibaca, tetapi tanda tangan belum bisa dikirim ke Arthera. Silakan hubungi Admin Arthera.</div>'}
      ${myRole() === 'klien' ? '<div class="ttd-note">Setiap surat perlu <b>ditandatangani</b> lalu <b>dibubuhi e-Meterai Rp10.000</b>. Buka masing-masing surat untuk mengikuti langkahnya.</div>' : ''}
      <div class="ttd-list">${docs.map((d, i) => {
        const mine = needs(d, myRole());
        const pill = !mine ? '<span class="ttd-pill">Untuk dibaca</span>'
          : docDone(d) ? '<span class="ttd-pill ok">Selesai</span>'
          : signedBy(d, myRole()) ? '<span class="ttd-pill">Perlu e-Meterai</span>' : '<span class="ttd-pill">Perlu tanda tangan</span>';
        return `<button class="ttd-item" data-open="${i}"><span><b>${esc(d.title)}</b><small>${d.signers.map((r) => ROLE_LABEL[r]).join(' & ')}${d.meterai ? ' · e-Meterai' : ''}</small></span>${pill}</button>`;
      }).join('')}</div>
    </div>`;
  $$('[data-open]', root).forEach((b) => b.addEventListener('click', () => { location.hash = token; renderDoc(Number(b.dataset.open)); window.scrollTo(0, 0); }));
}

function printDoc(d) {
  const tmp = document.createElement('div');
  tmp.innerHTML = `<section class="print-sheet">${paper(d)}</section>`;
  fillDocSlots(tmp, d, false);
  printHTML(tmp.innerHTML, `${d.file || d.title} - ${data.client.name}`);
}

function renderDoc(i) {
  const d = data.docs[i];
  const mine = needs(d, myRole());
  const signed = signedBy(d, myRole());
  const met = status[d.key] && status[d.key].meterai;
  const meteraiStep = mine && d.meterai && myRole() === 'klien';
  root.innerHTML = `
    <div class="card ttd-card">
      <button class="btn btn-ghost btn-sm" data-back>${icon('chevron-left')} Semua dokumen</button>
      <div class="ttd-eyebrow mt-2">${esc(data.client.clientId)}</div>
      <h1>${esc(d.title)}</h1>
      ${mine ? '' : '<p class="muted">Dokumen ini tidak memerlukan tanda tangan Anda.</p>'}
      <div id="docBody">${paper(d)}</div>
      <div class="ttd-actions">
        ${mine && !signed ? `<button class="btn btn-gold" data-sign>${icon('signature')} Tanda tangani dokumen</button>` : ''}
        <button class="btn btn-ghost" data-print>${icon('printer')} Unduh PDF</button>
      </div>
      ${meteraiStep ? `
      <h2 class="h4 mt-3">Bubuhkan e-Meterai Rp10.000</h2>
      <div class="ttd-steps">
        <div class="ttd-step"><b>Tanda tangani dokumen</b><p>${signed ? 'Selesai.' : 'Tekan tombol <b>Tanda tangani dokumen</b> di atas.'}</p></div>
        <div class="ttd-step"><b>Unduh PDF yang sudah ditandatangani</b><p>Tekan <b>Unduh PDF</b>, lalu pilih <b>Simpan sebagai PDF</b>.</p><button class="btn btn-ghost btn-sm" data-print ${signed ? '' : 'disabled'}>${icon('download')} Unduh PDF</button></div>
        <div class="ttd-step"><b>Beli & bubuhkan e-Meterai</b><p>Beli e-Meterai Rp10.000 di distributor resmi Peruri, unggah PDF tadi di sana, lalu letakkan e-Meterai di kolom <b>Tempat e-Meterai</b> dekat tanda tangan Anda. Simpan PDF hasilnya.</p><a class="btn btn-gold btn-sm" href="${EMETERAI_INFO_URL}" target="_blank" rel="noopener">${icon('external-link')} Lihat distributor resmi e-Meterai</a></div>
        <div class="ttd-step"><b>Kirim PDF bermeterai ke Arthera</b><p>${met ? `Diterima: ${esc(met.fileName)} (${esc(met.at)}).` : 'Pilih PDF yang sudah dibubuhi e-Meterai.'}</p><label class="btn btn-ghost btn-sm" ${ARTHERA_ENDPOINT ? '' : 'aria-disabled="true"'}>${icon('upload')} ${met ? 'Kirim ulang PDF' : 'Pilih PDF bermeterai'}<input type="file" accept="application/pdf,.pdf" data-meterai hidden ${ARTHERA_ENDPOINT ? '' : 'disabled'}></label></div>
      </div>` : ''}
    </div>`;
  fillDocSlots($('#docBody', root), d, true);
  $('[data-back]', root).addEventListener('click', renderList);
  $$('[data-print]', root).forEach((b) => b.addEventListener('click', () => printDoc(d)));
  const openSign = () => {
    if (!ARTHERA_ENDPOINT) { toast('Penyimpanan belum aktif', 'Tanda tangan belum bisa dikirim. Hubungi Admin Arthera.', 'err'); return; }
    signatureModal({ name: data.signer, title: 'Tanda tangani dokumen',
      agreeHTML: `Saya telah membaca seluruh isi <b>${esc(d.title)}</b> dan dengan ini menandatanganinya secara elektronik sebagai <b>${esc(data.signer)}</b>.`,
      onSave: async (sig) => {
      if (!sig) return;
      try {
        toast('Mengirim tanda tangan…', 'Mohon tunggu');
        await api({ kind: 'sign', docKey: d.key, name: sig.name, at: sig.at, img: sig.img });
        status[d.key] = { ...(status[d.key] || {}), [myRole()]: { name: sig.name, at: sig.at, img: sig.img } };
        toast('Tanda tangan tersimpan', 'Sudah diterima Arthera');
        renderDoc(i);
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
      renderDoc(i);
    } catch (e) { toast('PDF GAGAL dikirim', `${e.message}. Silakan coba lagi.`, 'err'); }
  });
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
  renderList();
})();
