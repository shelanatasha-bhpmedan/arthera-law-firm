// Ruang baca draf dokumen: balik halaman, tanda tangan elektronik, cetak/PDF
import { icon } from './icons.js';
import { paperFlip, chime } from './sound.js';
import { $, $$, esc, store, modal, toast, printHTML, fmtDateTime, prefersReducedMotion } from './util.js';

const sigKey = (lk, docKey) => `arthera_sig_${lk.slice(0, 16)}_${docKey}`;
export const getSignature = (lk, docKey) => store.get(sigKey(lk, docKey));

function fillSlots(container, sig, onSign) {
  // Slot milik pihak lain (mis. data-sign-slot="arthera") diisi lewat link tanda tangan masing-masing, bukan dari portal klien
  $$('[data-sign-slot]', container).filter((s) => !s.dataset.signSlot || s.dataset.signSlot === 'klien').forEach((slot) => {
    slot.classList.toggle('signed', !!sig);
    if (sig) {
      slot.innerHTML = `<div><img src="${sig.img}" alt="Tanda tangan ${esc(sig.name)}"><div class="sig-meta">Disetujui elektronik oleh ${esc(sig.name)}<br>${esc(sig.at)}</div></div>`;
    } else if (onSign) {
      slot.innerHTML = `<button type="button" data-do-sign>${icon('pen-line')} Bubuhkan tanda tangan</button>`;
      $('[data-do-sign]', slot).addEventListener('click', onSign);
    } else {
      slot.innerHTML = '<div class="sig-meta" style="color:#8A5E1E">Kolom tanda tangan</div>';
    }
  });
}

function sheetHTML(sheet, i, total, meta) {
  return `
    <div class="sheet-head"><img src="assets/logo-line.png" alt="Arthera Law Firm"><span>${esc(meta.ref || '')} · Hal. ${i + 1}/${total}</span></div>
    <div class="wm"><span>DRAF</span></div>
    <div class="doc-content">${sheet.html}</div>`;
}

export function openReader({ title, subtitle = '', sheets, docKey, lk, clientName, ref = '', onChange }) {
  let cur = 0;
  let busy = false;
  const ov = document.createElement('div');
  ov.className = 'overlay';
  ov.innerHTML = `
    <div class="reader-bar">
      <div class="rt"><b>${esc(title)}</b><span id="rdSub">${esc(subtitle)}</span></div>
      <div class="reader-tools">
        <button class="icon-btn on-dark" data-r="prev" aria-label="Halaman sebelumnya">${icon('chevron-left')}</button>
        <button class="icon-btn on-dark" data-r="next" aria-label="Halaman berikutnya">${icon('chevron-right')}</button>
        <button class="btn btn-sm btn-gold" data-r="sign">${icon('signature')} <span>Tanda Tangan</span></button>
        <button class="icon-btn on-dark" data-r="print" aria-label="Cetak atau simpan PDF">${icon('printer')}</button>
        <button class="icon-btn on-dark" data-r="close" aria-label="Tutup">${icon('x')}</button>
      </div>
    </div>
    <div class="reader-stage"><div class="sheet-pages" id="rdPages"></div></div>
    <div class="reader-dots" id="rdDots">${sheets.map((_, i) => `<button aria-label="Halaman ${i + 1}" data-dot="${i}"></button>`).join('')}</div>`;
  document.body.appendChild(ov);
  document.body.classList.add('lock');
  requestAnimationFrame(() => ov.classList.add('show'));
  const pages = $('#rdPages', ov);

  const render = (i) => {
    const el = document.createElement('article');
    el.className = 'doc-sheet';
    el.innerHTML = sheetHTML(sheets[i], i, sheets.length, { ref });
    fillSlots(el, getSignature(lk, docKey), openSign);
    return el;
  };
  const sync = () => {
    $('#rdSub', ov).textContent = `Hal. ${cur + 1} dari ${sheets.length} · ${sheets[cur].tabLabel.replace(/\s*\(DRAF\)\s*/, '')}`;
    $$('[data-dot]', ov).forEach((d, i) => d.classList.toggle('on', i === cur));
    $('[data-r="prev"]', ov).disabled = cur === 0;
    $('[data-r="next"]', ov).disabled = cur === sheets.length - 1;
  };
  pages.appendChild(render(0));
  sync();

  const go = (to) => {
    if (busy || to === cur || to < 0 || to >= sheets.length) return;
    busy = true;
    const old = pages.lastElementChild;
    const fresh = render(to);
    const quick = prefersReducedMotion();
    paperFlip(0.85);
    if (to > cur) {
      pages.insertBefore(fresh, old);
      old.classList.add('turn-out');
      setTimeout(() => { old.remove(); busy = false; }, quick ? 10 : 820);
    } else {
      pages.appendChild(fresh);
      fresh.classList.add('turn-in-back');
      setTimeout(() => { old.remove(); fresh.classList.remove('turn-in-back'); busy = false; }, quick ? 10 : 820);
    }
    cur = to;
    sync();
  };

  function refreshSlots() {
    $$('.doc-sheet', pages).forEach((s) => fillSlots(s, getSignature(lk, docKey), openSign));
    const has = !!getSignature(lk, docKey);
    $('[data-r="sign"] span', ov).textContent = has ? 'Tanda Tangan ✓' : 'Tanda Tangan';
    onChange && onChange();
  }

  function openSign() {
    signatureModal({ name: clientName, existing: getSignature(lk, docKey), onSave: (sig) => {
      if (sig) store.set(sigKey(lk, docKey), sig); else store.del(sigKey(lk, docKey));
      refreshSlots();
      if (sig) {
        chime();
        toast('Draf disetujui secara elektronik', 'Tanda tangan tersimpan pada draf ini');
        const slotSheet = sheets.findIndex((s) => s.html.includes('data-sign-slot'));
        if (slotSheet >= 0 && slotSheet !== cur) setTimeout(() => go(slotSheet), 500);
      }
    } });
  }

  const doPrint = () => {
    const sig = getSignature(lk, docKey);
    const html = sheets.map((s, i) => `<section class="print-sheet"><div class="print-head"><img src="assets/logo-line.png" alt=""><span>${esc(title)} · ${esc(ref)} · DRAF · Hal. ${i + 1}/${sheets.length}</span></div><div class="doc-content">${s.html}</div></section>`).join('');
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    fillSlots(tmp, sig, null);
    printHTML(tmp.innerHTML, title);
  };

  const close = () => {
    ov.classList.remove('show');
    document.removeEventListener('keydown', onKey);
    setTimeout(() => { ov.remove(); if (!document.querySelector('.modal-back, .overlay')) document.body.classList.remove('lock'); }, 300);
  };
  ov.addEventListener('click', (e) => {
    const b = e.target.closest('[data-r]');
    const d = e.target.closest('[data-dot]');
    if (d) return go(Number(d.dataset.dot));
    if (!b) return;
    ({ prev: () => go(cur - 1), next: () => go(cur + 1), sign: openSign, print: doPrint, close })[b.dataset.r]();
  });
  const onKey = (e) => {
    if (document.querySelector('.modal-back')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') go(cur + 1);
    if (e.key === 'ArrowLeft') go(cur - 1);
  };
  document.addEventListener('keydown', onKey);
  // geser horizontal untuk membalik (sentuh)
  let sx = null, sy = null;
  pages.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
  pages.addEventListener('touchend', (e) => {
    if (sx == null) return;
    const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.6) go(cur + (dx < 0 ? 1 : -1));
    sx = sy = null;
  });
  refreshSlots();
}

// ---------- Modal tanda tangan (gambar / ketik) ----------
export function signatureModal({ name = '', existing = null, onSave, title = 'Bubuhkan tanda tangan pada draf', agreeHTML = '' }) {
  let mode = 'draw';
  let drawn = false;
  modal({
    eyebrow: 'Persetujuan Elektronik',
    title,
    width: 640,
    body: `
      <div class="seg" style="margin-bottom:14px"><button class="on" data-m="draw">GAMBAR</button><button data-m="type">KETIK</button></div>
      <div id="sgDraw"><div class="sigpad-wrap"><canvas></canvas><div class="baseline"></div><div class="x">×</div></div>
        <p class="tiny muted mt-1">Gunakan jari, stylus, atau mouse untuk menandatangani di atas garis.</p></div>
      <div id="sgType" hidden>
        <div class="field"><label>Nama penandatangan</label><input class="input" id="sgName" value="${esc(name)}"></div>
        <div class="typed-sig sigpad-wrap mt-2" id="sgPreview">${esc(name)}</div>
      </div>
      <label class="row mt-2 small" style="align-items:flex-start;gap:10px;flex-wrap:nowrap"><input type="checkbox" id="sgAgree" style="margin-top:5px;accent-color:#8A5E1E">
        <span>${agreeHTML || 'Saya menyatakan telah membaca draf ini dan menyetujuinya secara elektronik. Persetujuan ini bersifat <b>draf</b> dan tidak menggantikan penandatanganan dokumen final.'}</span></label>`,
    actions: `${existing ? '<button class="btn btn-ghost btn-sm" data-act="remove">Hapus tanda tangan</button>' : ''}<button class="btn btn-ghost btn-sm" data-act="clear">${icon('eraser')} Bersihkan</button><button class="btn btn-gold btn-sm" data-act="save">${icon('check')} Simpan</button>`,
    onMount(m, close) {
      const cv = $('canvas', m);
      const ctx = cv.getContext('2d');
      const fit = () => {
        const r = cv.getBoundingClientRect(); const dpr = window.devicePixelRatio || 1;
        cv.width = r.width * dpr; cv.height = r.height * dpr; ctx.scale(dpr, dpr);
        ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = '#1A2A5C';
      };
      requestAnimationFrame(fit);
      let pts = [];
      let down = false;
      const pos = (e) => { const r = cv.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top, t: performance.now() }; };
      cv.addEventListener('pointerdown', (e) => { down = true; cv.setPointerCapture(e.pointerId); pts = [pos(e)]; });
      cv.addEventListener('pointermove', (e) => {
        if (!down) return;
        const p = pos(e); const l = pts[pts.length - 1];
        const v = Math.hypot(p.x - l.x, p.y - l.y) / Math.max(1, p.t - l.t);
        ctx.lineWidth = Math.max(1.2, Math.min(3.4, 3.4 - v * 1.4));
        if (pts.length >= 2) {
          const pl = pts[pts.length - 2];
          ctx.beginPath(); ctx.moveTo((pl.x + l.x) / 2, (pl.y + l.y) / 2); ctx.quadraticCurveTo(l.x, l.y, (l.x + p.x) / 2, (l.y + p.y) / 2); ctx.stroke();
        } else { ctx.beginPath(); ctx.moveTo(l.x, l.y); ctx.lineTo(p.x, p.y); ctx.stroke(); }
        pts.push(p); drawn = true;
      });
      const end = () => { down = false; };
      cv.addEventListener('pointerup', end); cv.addEventListener('pointercancel', end);
      $$('[data-m]', m).forEach((b) => b.addEventListener('click', () => {
        mode = b.dataset.m;
        $$('[data-m]', m).forEach((x) => x.classList.toggle('on', x === b));
        $('#sgDraw', m).hidden = mode !== 'draw'; $('#sgType', m).hidden = mode !== 'type';
        if (mode === 'draw') requestAnimationFrame(fit);
      }));
      $('#sgName', m).addEventListener('input', (e) => { $('#sgPreview', m).textContent = e.target.value; });
      m.addEventListener('click', async (e) => {
        const a = e.target.closest('[data-act]'); if (!a) return;
        if (a.dataset.act === 'clear') { ctx.clearRect(0, 0, cv.width, cv.height); drawn = false; $('#sgName', m).value = ''; $('#sgPreview', m).textContent = ''; }
        if (a.dataset.act === 'remove') { onSave(null); close(); }
        if (a.dataset.act === 'save') {
          if (!$('#sgAgree', m).checked) { toast('Centang pernyataan persetujuan terlebih dahulu', '', 'err'); return; }
          let img;
          const signer = ($('#sgName', m).value || name).trim();
          if (mode === 'draw') {
            if (!drawn) { toast('Tanda tangan masih kosong', 'Silakan gambar tanda tangan Anda', 'err'); return; }
            img = trim(cv);
          } else {
            if (!signer) { toast('Isi nama penandatangan', '', 'err'); return; }
            try { await document.fonts.load('64px Allura'); } catch {}
            const c = document.createElement('canvas'); c.width = 900; c.height = 220;
            const x = c.getContext('2d'); x.fillStyle = '#1A2A5C'; x.font = '96px Allura, cursive'; x.textAlign = 'center'; x.textBaseline = 'middle';
            x.fillText(signer, 450, 115); img = trim(c);
          }
          onSave({ img, name: signer || name, at: fmtDateTime(new Date()), mode });
          close();
        }
      });
    }
  });
}

function trim(canvas) {
  const c = canvas.getContext('2d');
  const { width: w, height: h } = canvas;
  const d = c.getImageData(0, 0, w, h).data;
  let x0 = w, y0 = h, x1 = 0, y1 = 0;
  for (let y = 0; y < h; y += 2) for (let x = 0; x < w; x += 2) {
    if (d[(y * w + x) * 4 + 3] > 10) { if (x < x0) x0 = x; if (y < y0) y0 = y; if (x > x1) x1 = x; if (y > y1) y1 = y; }
  }
  if (x1 <= x0) return canvas.toDataURL('image/png');
  const pad = 12;
  x0 = Math.max(0, x0 - pad); y0 = Math.max(0, y0 - pad); x1 = Math.min(w, x1 + pad); y1 = Math.min(h, y1 + pad);
  const out = document.createElement('canvas'); out.width = x1 - x0; out.height = y1 - y0;
  out.getContext('2d').drawImage(canvas, x0, y0, out.width, out.height, 0, 0, out.width, out.height);
  return out.toDataURL('image/png');
}
