import { icon } from './icons.js';

export const $ = (s, r = document) => r.querySelector(s);
export const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
export const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export const store = {
  get(k, d = null) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  del(k) { try { localStorage.removeItem(k); } catch {} }
};
export const session = {
  get(k, d = null) { try { const v = sessionStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { sessionStorage.setItem(k, JSON.stringify(v)); } catch {} },
  del(k) { try { sessionStorage.removeItem(k); } catch {} }
};

export function toast(title, sub = '', type = 'ok') {
  const root = document.getElementById('toasts');
  const el = document.createElement('div');
  el.className = 'toast' + (type === 'err' ? ' err' : '');
  el.setAttribute('role', 'status');
  el.innerHTML = `${icon(type === 'err' ? 'alert' : 'check-circle')}<div><b>${esc(title)}</b>${sub ? `<span>${esc(sub)}</span>` : ''}</div>`;
  root.appendChild(el);
  setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 400); }, 3800);
}

export async function copyText(text, label = 'Tersalin') {
  try {
    await navigator.clipboard.writeText(text);
    toast(label, text.length > 60 ? '' : text);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text; document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); toast(label); } catch { toast('Gagal menyalin', '', 'err'); }
    ta.remove();
  }
}

export function modal({ title = '', eyebrow = '', body = '', actions = '', width = 620, onMount, onClose } = {}) {
  const back = document.createElement('div');
  back.className = 'modal-back';
  back.innerHTML = `
    <div class="modal card" role="dialog" aria-modal="true" style="--mw:${width}px">
      <div class="modal-head">
        <div>${eyebrow ? `<span class="eyebrow">${esc(eyebrow)}</span>` : ''}${title ? `<h3 class="h3 mt-1">${title}</h3>` : ''}</div>
        <button class="icon-btn" data-close aria-label="Tutup">${icon('x')}</button>
      </div>
      <div class="modal-body">${body}</div>
      ${actions ? `<div class="modal-actions">${actions}</div>` : ''}
    </div>`;
  document.body.appendChild(back);
  document.body.classList.add('lock');
  requestAnimationFrame(() => back.classList.add('show'));
  const close = () => {
    back.classList.remove('show');
    document.removeEventListener('keydown', onKey);
    setTimeout(() => { back.remove(); if (!document.querySelector('.modal-back, .overlay, .palette-back')) document.body.classList.remove('lock'); }, 300);
    onClose && onClose();
  };
  const onKey = (e) => { if (e.key === 'Escape') close(); };
  document.addEventListener('keydown', onKey);
  back.addEventListener('click', (e) => { if (e.target === back || e.target.closest('[data-close]')) close(); });
  onMount && onMount(back.querySelector('.modal'), close);
  return close;
}

export const waLink = (num, text) => `https://wa.me/${num}?text=${encodeURIComponent(text)}`;
export const mailLink = (to, subject, body) => `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export function fmtBytes(n) {
  if (!n) return '0 B';
  const u = ['B', 'KB', 'MB', 'GB']; let i = 0;
  while (n >= 1024 && i < u.length - 1) { n /= 1024; i++; }
  return `${n.toFixed(n < 10 && i ? 1 : 0)} ${u[i]}`;
}

export function fmtDate(d = new Date()) {
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}
export function fmtDateTime(d = new Date()) {
  return `${fmtDate(d)}, ${d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}`;
}

export function download(blob, name) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

// ---- IndexedDB (berkas unggahan disimpan di perangkat klien) ----
let dbp;
function db() {
  if (!dbp) {
    dbp = new Promise((res, rej) => {
      const r = indexedDB.open('arthera-portal', 1);
      r.onupgradeneeded = () => r.result.createObjectStore('files');
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    });
  }
  return dbp;
}
export const idb = {
  async get(key) { try { const d = await db(); return await new Promise((res, rej) => { const q = d.transaction('files').objectStore('files').get(key); q.onsuccess = () => res(q.result); q.onerror = () => rej(q.error); }); } catch { return null; } },
  async set(key, val) { const d = await db(); return new Promise((res, rej) => { const t = d.transaction('files', 'readwrite'); t.objectStore('files').put(val, key); t.oncomplete = res; t.onerror = () => rej(t.error); }); },
  async del(key) { try { const d = await db(); return await new Promise((res) => { const t = d.transaction('files', 'readwrite'); t.objectStore('files').delete(key); t.oncomplete = res; }); } catch {} }
};

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function observeReveal(root = document) {
  const els = $$('.reveal:not(.in)', root);
  if (!('IntersectionObserver' in window) || prefersReducedMotion()) { els.forEach((e) => e.classList.add('in')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  els.forEach((e, i) => { e.style.transitionDelay = `${Math.min(i % 6, 5) * 70}ms`; io.observe(e); });
}

export function printHTML(html, title = 'Arthera Law Firm') {
  const root = document.getElementById('print-root');
  root.innerHTML = html;
  const old = document.title;
  document.title = title;
  document.body.classList.add('printing');
  const imgs = Array.from(root.querySelectorAll('img'));
  Promise.all(imgs.map((im) => (im.complete ? 1 : new Promise((r) => { im.onload = im.onerror = r; })))).then(() => {
    setTimeout(() => {
      window.print();
      setTimeout(() => { document.body.classList.remove('printing'); root.innerHTML = ''; document.title = old; }, 400);
    }, 60);
  });
}
