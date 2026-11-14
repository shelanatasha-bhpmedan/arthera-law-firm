// Menu internal: Merek & NIB, dan Daftar Pengeluaran.
// Data di office-vault.json, terenkripsi terpisah untuk Super Admin dan Admin 2.
import { icon } from './icons.js';
import { $, $$, esc, store, toast, modal, download } from './util.js';
import { decryptJSON } from './vault.js';

const LOCAL_EXP = 'arthera_expenses_local';
let officeP = null;
const loadOffice = () => (officeP ||= fetch('office-vault.json', { cache: 'no-cache' }).then((r) => { if (!r.ok) throw new Error('office'); return r.json(); }));

/** Membuka data kantor dengan kata sandi. role: 'super' | 'ops'. */
export async function openOffice(pass, role) {
  const v = await loadOffice();
  return decryptJSON(v.boxes[role], pass);
}

const rp = (n) => 'Rp' + Math.round(Number(n) || 0).toLocaleString('id-ID');
const tgl = (iso) => { const d = new Date(iso + 'T00:00:00'); return isNaN(d) ? iso : d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }); };
const bulan = (iso) => { const d = new Date(iso + 'T00:00:00'); return isNaN(d) ? iso : d.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }); };
const dash = (v) => (v && String(v).trim() ? esc(v) : '<span class="muted">Belum ada</span>');
const pill = (tone, text) => `<span class="pill ${tone === 'ok' ? 'pill-ok' : 'pill-warn'}"><span class="dot"></span>${esc(text)}</span>`;

// ---------- Merek & NIB ----------
export function merekNibHTML(office) {
  const ms = office.matters || [];
  if (!ms.length) return `<div class="card empty">${icon('file-text')}<div>Belum ada perkara merek atau NIB.</div></div>`;
  return `<div class="off-list">${ms.map((m) => `
    <article class="card off-matter">
      <header class="off-mhead">
        <div><div class="eyebrow">${esc(m.clientId)}</div><h3 class="h4">${esc(m.merek ? m.merek.nama : m.client)}</h3><div class="sub">${esc(m.client)} · PIC ${esc(m.pic)}</div></div>
      </header>
      <div class="off-grid">
        ${m.merek ? `<section class="off-box">
          <div class="off-box-h">${icon('award')}<b>Merek</b>${pill(m.merek.tone, m.merek.status)}</div>
          <dl class="off-dl">
            <dt>Nama merek</dt><dd>${esc(m.merek.nama)}${m.merek.arti ? ` <span class="muted">(${esc(m.merek.arti)})</span>` : ''}</dd>
            <dt>Kelas</dt><dd>${esc(m.merek.kelas)}</dd>
            <dt>Jenis</dt><dd>${esc(m.merek.jenis)}</dd>
            <dt>No. permohonan</dt><dd>${dash(m.merek.noPermohonan)}</dd>
            <dt>Tanggal pengajuan</dt><dd>${dash(m.merek.tglPengajuan)}</dd>
            <dt>Sertifikat</dt><dd>${dash(m.merek.sertifikat)}</dd>
          </dl>
          <p class="off-note">${esc(m.merek.catatan)}</p>
        </section>` : ''}
        ${m.nib ? `<section class="off-box">
          <div class="off-box-h">${icon('building-2')}<b>NIB</b>${pill(m.nib.tone, m.nib.status)}</div>
          <dl class="off-dl">
            <dt>Usaha</dt><dd>${esc(m.nib.usaha)}</dd>
            <dt>Nomor NIB</dt><dd>${dash(m.nib.nomor)}</dd>
            <dt>KBLI</dt><dd>${dash(m.nib.kbli)}</dd>
            <dt>Tanggal terbit</dt><dd>${dash(m.nib.tglTerbit)}</dd>
          </dl>
          <p class="off-note">${esc(m.nib.catatan)}</p>
        </section>` : ''}
      </div>
      ${(m.outputs || []).length ? `<div class="off-out">
        <div class="off-out-h">Dokumen output</div>
        ${m.outputs.map((o) => `<div class="off-out-row"><span class="off-tag">${esc(o.jenis)}</span><span class="grow">${esc(o.nama)}</span>${pill(o.status === 'Siap' ? 'ok' : 'warn', o.status)}</div>`).join('')}
      </div>` : ''}
    </article>`).join('')}</div>`;
}

// ---------- Pengeluaran ----------
const localExp = () => store.get(LOCAL_EXP, []);
function allExpenses(office) {
  return [...(office.expenses || []), ...localExp().map((e) => ({ ...e, _local: true }))]
    .sort((a, b) => `${b.tanggal} ${b.waktu || ''}`.localeCompare(`${a.tanggal} ${a.waktu || ''}`));
}
const total = (e) => (Number(e.nominal) || 0) + (Number(e.biaya) || 0);

export function pengeluaranHTML(office, ui) {
  const all = allExpenses(office);
  const months = [...new Set(all.map((e) => e.tanggal.slice(0, 7)))];
  const list = ui.month === 'all' ? all : all.filter((e) => e.tanggal.startsWith(ui.month));
  const sum = list.reduce((s, e) => s + total(e), 0);
  const open = list.filter((e) => !e.lunas).reduce((s, e) => s + total(e), 0);
  const paid = list.filter((e) => e.lunas).reduce((s, e) => s + total(e), 0);
  return `
    <div class="admin-stats off-stats">
      <div class="card astat"><b>${rp(open)}</b><span>Belum lunas</span></div>
      <div class="card astat"><b>${rp(paid)}</b><span>Sudah lunas</span></div>
      <div class="card astat"><b>${rp(sum)}</b><span>Total · ${list.length} transaksi</span></div>
    </div>
    <div class="admin-tools">
      <div class="chips-scroll">${[['all', 'Semua'], ...months.map((m) => [m, bulan(m + '-01')])].map(([k, l]) => `<button class="chip ${ui.month === k ? 'on' : ''}" data-m="${k}">${esc(l)}</button>`).join('')}</div>
      <div class="row">
        <button class="btn btn-gold btn-sm" id="eAdd">${icon('plus')} Catat pengeluaran</button>
        <button class="icon-btn" id="eCsv" title="Ekspor CSV">${icon('download')}</button>
      </div>
    </div>
    <div class="off-exp">${list.length ? list.map((e) => `
      <article class="card off-row ${e.lunas ? 'is-paid' : ''}">
        <div class="off-date"><b>${esc(e.tanggal.slice(8, 10))}</b><span>${esc(bulan(e.tanggal))}</span>${e.waktu ? `<small>${esc(e.waktu)}</small>` : ''}</div>
        <div class="off-main">
          <div class="nm">${esc(e.uraian)}</div>
          <div class="sub">${esc(e.penerima || '-')}${e.bankTujuan ? ` · ${esc(e.bankTujuan)}` : ''}${e.rekTujuan ? ` ${esc(e.rekTujuan)}` : ''}${e.metode ? ` · ${esc(e.metode)}` : ''}</div>
          <div class="row mt-1" style="gap:6px;flex-wrap:wrap">
            ${e.keperluan ? `<span class="off-tag">${esc(e.keperluan)}</span>` : '<span class="pill pill-warn"><span class="dot"></span>Keperluan belum dicatat</span>'}
            ${e.lunas ? `<span class="pill pill-ok"><span class="dot"></span>Lunas · ${esc(tgl(e.lunas.tanggal))}${e.lunas.oleh ? ` · ${esc(e.lunas.oleh)}` : ''}</span>` : ''}
            ${e._local ? '<span class="pill pill-warn"><span class="dot"></span>Catatan di perangkat ini</span>' : ''}
          </div>
        </div>
        <div class="off-amt"><b>${rp(total(e))}</b>${Number(e.biaya) ? `<span>${rp(e.nominal)} + biaya ${rp(e.biaya)}</span>` : ''}</div>
        <div class="acts">
          <button class="icon-btn" data-ex="${esc(e.id)}" title="Rincian & bukti">${icon('eye')}</button>
          ${e._local ? `<button class="icon-btn" data-exdel="${esc(e.id)}" title="Hapus catatan lokal">${icon('trash-2')}</button>` : ''}
        </div>
      </article>`).join('') : `<div class="card empty">${icon('file-text')}<div>Belum ada pengeluaran pada periode ini.</div></div>`}
    </div>
    <p class="small muted mt-2">Pengeluaran yang dicatat lewat tombol <b>Catat pengeluaran</b> tersimpan di perangkat ini saja. Kirim bukti transaksinya ke pengelola situs agar tercatat permanen untuk semua admin.</p>`;
}

export function wirePengeluaran(view, office, ui, rerender) {
  const all = allExpenses(office);
  $$('[data-m]', view).forEach((b) => b.addEventListener('click', () => { ui.month = b.dataset.m; rerender(); }));
  $('#eCsv', view)?.addEventListener('click', () => {
    const cols = [['tanggal', 'Tanggal'], ['waktu', 'Waktu'], ['uraian', 'Uraian'], ['keperluan', 'Keperluan'], ['penerima', 'Penerima'], ['bankTujuan', 'Bank tujuan'], ['metode', 'Metode'], ['nominal', 'Nominal'], ['biaya', 'Biaya'], ['ref', 'Referensi']];
    const q = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const csv = [['No', ...cols.map((c) => c[1]), 'Total', 'Status'].join(','), ...all.map((e, i) => [i + 1, ...cols.map(([k]) => q(e[k])), total(e), q(e.lunas ? `Lunas ${e.lunas.tanggal}` : 'Belum lunas')].join(','))].join('\n');
    download(new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' }), 'Pengeluaran Arthera.csv');
    toast('Pengeluaran diekspor ke CSV');
  });
  $$('[data-ex]', view).forEach((b) => b.addEventListener('click', () => {
    const e = all.find((x) => x.id === b.dataset.ex); if (!e) return;
    const rows = [['Tanggal', `${tgl(e.tanggal)}${e.waktu ? `, ${e.waktu} WIB` : ''}`], ['Uraian', e.uraian], ['Keperluan', e.keperluan || 'Belum dicatat'], ['Penerima', e.penerima], ['Bank tujuan', [e.bankTujuan, e.rekTujuan].filter(Boolean).join(' ')], ['Dari', e.dariBank], ['Metode', e.metode], ['Nominal', rp(e.nominal)], ['Biaya', rp(e.biaya)], ['Total', rp(total(e))], ['Referensi', e.ref], ['Dicatat', e.dicatat], ['Status', e.lunas ? `Lunas ${tgl(e.lunas.tanggal)}${e.lunas.oleh ? ` oleh ${e.lunas.oleh}` : ''}` : 'Belum lunas'], ['Cara pelunasan', e.lunas && e.lunas.cara]].filter(([, v]) => v);
    modal({
      eyebrow: 'Rincian pengeluaran', title: esc(e.uraian), width: 720,
      body: `<div class="off-detail"><dl class="off-dl">${rows.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl>
        ${e.bukti ? `<a class="off-receipt" href="${e.bukti}" target="_blank" rel="noopener"><img src="${e.bukti}" alt="Bukti transfer"></a>` : '<div class="card empty">Tidak ada foto bukti.</div>'}</div>`,
      actions: '<button class="btn btn-gold btn-sm" data-close>Tutup</button>'
    });
  }));
  $$('[data-exdel]', view).forEach((b) => b.addEventListener('click', () => { store.set(LOCAL_EXP, localExp().filter((x) => x.id !== b.dataset.exdel)); toast('Catatan lokal dihapus'); rerender(); }));
  $('#eAdd', view)?.addEventListener('click', () => {
    const today = new Date().toISOString().slice(0, 10);
    modal({
      eyebrow: 'Pengeluaran', title: 'Catat pengeluaran', width: 620,
      body: `<form id="eForm" class="stack-sm">
        <div class="field"><label>Tanggal</label><input class="input" name="tanggal" type="date" value="${today}" required></div>
        <div class="field"><label>Uraian</label><input class="input" name="uraian" required placeholder="mis. PNBP permohonan merek"></div>
        <div class="field"><label>Keperluan / perkara</label><input class="input" name="keperluan" placeholder="mis. Merek LYO MORE"></div>
        <div class="field"><label>Penerima</label><input class="input" name="penerima"></div>
        <div class="field"><label>Nominal (Rp)</label><input class="input" name="nominal" inputmode="numeric" required></div>
        <div class="field"><label>Biaya transfer (Rp)</label><input class="input" name="biaya" inputmode="numeric" value="0"></div>
      </form>`,
      actions: '<button class="btn btn-ghost btn-sm" data-close>Batal</button><button class="btn btn-gold btn-sm" data-save>Simpan</button>',
      onMount(m, close) {
        $('[data-save]', m).addEventListener('click', () => {
          const f = $('#eForm', m); if (!f.reportValidity()) return;
          const d = Object.fromEntries(new FormData(f));
          const num = (s) => Number(String(s || '').replace(/[^\d]/g, '')) || 0;
          store.set(LOCAL_EXP, [...localExp(), { id: 'loc-' + Date.now(), tanggal: d.tanggal, uraian: d.uraian.trim(), keperluan: d.keperluan.trim(), penerima: d.penerima.trim(), nominal: num(d.nominal), biaya: num(d.biaya) }]);
          close(); toast('Pengeluaran dicatat', 'Tersimpan di perangkat ini'); rerender();
        });
      }
    });
  });
}
