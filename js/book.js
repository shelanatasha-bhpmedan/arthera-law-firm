// Flipbook Company Profile: buku sampul kulit dengan halaman yang bisa ditarik & dibalik
import { COMPRO_PAGES } from './data-extra.js';
import { icon } from './icons.js';
import { paperFlip, coverThud, sound } from './sound.js';
import { $, $$, esc, prefersReducedMotion } from './util.js';

const FIRST_SLIDE_PAGE = 2; // indeks halaman buku untuk slide pertama
const TOTAL_PAGES = COMPRO_PAGES.length + 5; // sampul, endpaper, 15 slide, kolofon, endpaper, sampul belakang

export function coverArt({ back = false } = {}) {
  const corners = ['top:calc(6% - 6px);left:calc(6% - 6px);border-right:0;border-bottom:0', 'top:calc(6% - 6px);right:calc(6% - 6px);border-left:0;border-bottom:0', 'bottom:calc(6% - 6px);left:calc(6% - 6px);border-right:0;border-top:0', 'bottom:calc(6% - 6px);right:calc(6% - 6px);border-left:0;border-top:0']
    .map((s) => `<i class="cv-corner" style="${s}"></i>`).join('');
  if (back) {
    return `<div class="cover-art cq"><div class="cv-frame"></div>${corners}
      <div class="cv-inner"><img src="assets/emblem-light.png" alt="" style="width:14%">
      <div class="cv-sub foil-text">INTEGRITY IN LAW</div><div class="cv-line"></div>
      <div class="cv-sub" style="letter-spacing:.25em;opacity:.7">EQUITY TOWER LT. 26 UNIT H · SCBD · JAKARTA</div></div></div>`;
  }
  return `<div class="cover-art cq"><div class="cv-frame"></div>${corners}
    <div class="cv-inner">
      <img src="assets/emblem-light.png" alt="">
      <div class="cv-title foil-text">ARTHERA</div>
      <div class="cv-sub foil-text">◆ LAW FIRM ◆</div>
      <div class="cv-line"></div>
      <div class="cv-sub">COMPANY PROFILE · 2026</div>
    </div></div>`;
}

function pagesHTML() {
  const slides = COMPRO_PAGES.map((p, i) => `
    <div class="fpage" data-density="soft">
      <img class="pg-img" src="${p.img}" alt="${esc(p.title)}" draggable="false" ${i > 3 ? 'loading="lazy"' : ''}>
      <div class="gutter"></div>
    </div>`).join('');
  return `
    <div class="fpage hard" data-density="hard"><div class="hard-face leather">${coverArt()}</div></div>
    <div class="fpage hard" data-density="hard"><div class="hard-face"><div class="endpaper cq"><div class="ex-libris"><div><img src="assets/emblem-dark.png" alt=""><b>EX LIBRIS</b><span>Arthera Law Firm · Est. 2022</span></div></div></div></div></div>
    ${slides}
    <div class="fpage" data-density="soft"><div class="colophon cq"><div>
      <img src="assets/emblem-dark.png" alt="" style="width:16%;margin:0 auto 4%">
      <div class="h3">Terima kasih</div>
      <p>Untuk konsultasi dan penawaran resmi:<br><b>artheralawfirm@gmail.com</b><br>+62 812 9507 6597 · 0852-8614-4102</p>
      <p style="font-style:italic">Integritas bukan sekadar nilai yang kami sebutkan,<br>melainkan standar yang kami jalankan.</p>
    </div></div><div class="gutter"></div></div>
    <div class="fpage hard" data-density="hard"><div class="hard-face"><div class="endpaper"></div></div></div>
    <div class="fpage hard back-face" data-density="hard"><div class="hard-face leather">${coverArt({ back: true })}</div></div>`;
}

export function bookStageHTML() {
  return `
  <section class="book-stage" id="bookStage">
    <div class="frame-lines"></div>
    <div class="wrap book-title">
      <span class="eyebrow light">Company Profile · Edisi 2026</span>
      <h1 class="h2 mt-1">Buka <em class="it gold-text">lembar demi lembar</em> kisah kami</h1>
    </div>
    <div class="book-area closed-front" id="bookArea">
      <div class="book-shift"><div class="flipbook" id="flipbook">${pagesHTML()}</div></div>
      <div class="bk-shadow"></div>
    </div>
    <div class="wrap">
      <div class="open-cta-row"><button class="btn btn-gold btn-lg" id="bookOpenBtn">${icon('book-open')} Buka Buku</button><p class="book-hint">${icon('sparkles')} atau ketuk sampulnya</p></div>
      <div class="book-tools">
        <button class="icon-btn on-dark" id="bkPrev" aria-label="Halaman sebelumnya">${icon('chevron-left')}</button>
        <div class="page-ind" aria-live="polite"><span id="bkNo">Sampul</span><b id="bkTitle">Arthera Law Firm</b></div>
        <button class="icon-btn on-dark" id="bkNext" aria-label="Halaman berikutnya">${icon('chevron-right')}</button>
        <span style="width:10px"></span>
        <button class="icon-btn on-dark" id="bkSound" aria-pressed="${sound.on}" aria-label="Suara kertas">${icon(sound.on ? 'volume-2' : 'volume-x')}</button>
        <button class="icon-btn on-dark" id="bkPlay" aria-pressed="false" aria-label="Putar otomatis">${icon('play')}</button>
        <button class="icon-btn on-dark" id="bkThumbs" aria-pressed="false" aria-label="Daftar halaman">${icon('grid-3x3')}</button>
        <button class="icon-btn on-dark" id="bkZoom" aria-label="Perbesar halaman">${icon('zoom-in')}</button>
        <button class="icon-btn on-dark" id="bkFull" aria-pressed="false" aria-label="Layar penuh">${icon('maximize-2')}</button>
      </div>
      <div class="book-progress"><i id="bkProg" style="width:0%"></i></div>
      <div class="thumbs" id="bkThumbList" hidden>
        ${COMPRO_PAGES.map((p, i) => `<button data-slide="${i}"><img src="${p.img}" alt="" loading="lazy"><span>${p.no} · ${esc(p.title)}</span></button>`).join('')}
      </div>
      <p class="book-hint">${icon('sparkles')} Tarik sudut halaman atau gunakan tombol panah keyboard untuk membalik</p>
    </div>
  </section>`;
}

export function mountBook(root, { startSlide = null, autoOpen = false } = {}) {
  const el = $('#flipbook', root);
  const area = $('#bookArea', root);
  const stage = $('#bookStage', root);
  if (!el || !window.St) return { destroy() {} };

  const fitWidth = () => {
    const vh = window.innerHeight;
    const reserve = stage.classList.contains('full') ? 200 : 330;
    const maxByHeight = Math.max(300, (vh - reserve)) * (32 / 9);
    $('.book-shift', root).style.width = Math.floor(Math.min(area.clientWidth, maxByHeight, 1320)) + 'px';
  };
  fitWidth();

  const pf = new window.St.PageFlip(el, {
    width: 640, height: 360, size: 'stretch',
    minWidth: 260, maxWidth: 760, minHeight: 146, maxHeight: 428,
    showCover: true, usePortrait: true, autoSize: true,
    maxShadowOpacity: 0.55, mobileScrollSupport: true, flippingTime: prefersReducedMotion() ? 300 : 1000,
    swipeDistance: 24, showPageCorners: true, startZIndex: 2
  });
  pf.loadFromHTML($$('.fpage', el));

  let flipping = false;
  let autoTimer = null;
  let pending = null;
  const next = () => { if (pf.getState && pf.getState() !== 'read') pending = 'next'; else pf.flipNext(); };
  const prev = () => { if (pf.getState && pf.getState() !== 'read') pending = 'prev'; else pf.flipPrev(); };

  const slideOfPage = (p) => (p >= FIRST_SLIDE_PAGE && p < FIRST_SLIDE_PAGE + COMPRO_PAGES.length ? p - FIRST_SLIDE_PAGE : null);
  const pageOfSlide = (s) => s + FIRST_SLIDE_PAGE;

  const update = (idx) => {
    const last = pf.getPageCount() - 1;
    const portrait = pf.getOrientation() === 'portrait';
    area.classList.toggle('portrait', portrait);
    area.classList.toggle('closed-front', idx === 0);
    stage.classList.toggle('is-closed', idx === 0);
    area.classList.toggle('closed-back', !portrait && idx >= last);
    const visible = portrait ? [idx] : (idx === 0 ? [0] : [idx, idx + 1]);
    const slides = visible.map(slideOfPage).filter((s) => s !== null);
    let no = 'Sampul';
    let title = 'Arthera Law Firm';
    if (slides.length) {
      no = slides.length > 1 ? `Hal. ${COMPRO_PAGES[slides[0]].no}-${COMPRO_PAGES[slides[1]].no} / 15` : `Hal. ${COMPRO_PAGES[slides[0]].no} / 15`;
      title = slides.map((s) => COMPRO_PAGES[s].title).join(' · ');
    } else if (idx >= last - 1 && idx > 0) { no = 'Penutup'; title = 'Terima kasih'; }
    else if (idx === 1) { no = 'Halaman Pembuka'; title = 'Ex Libris'; }
    $('#bkNo', root).textContent = no;
    $('#bkTitle', root).textContent = title;
    $('#bkProg', root).style.width = `${Math.round((idx / last) * 100)}%`;
    $$('#bkThumbList button', root).forEach((b) => b.classList.toggle('on', slides.includes(Number(b.dataset.slide))));
    const on = $('#bkThumbList button.on', root);
    if (on && !$('#bkThumbList', root).hidden) on.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
    $('#bkPrev', root).disabled = idx === 0;
    $('#bkNext', root).disabled = idx >= last;
    if (slides.length) history.replaceState(null, '', `#/profil/${slides[slides.length - 1] + 1}`);
    else if (idx === 0) history.replaceState(null, '', '#/profil');
  };

  pf.on('flip', (e) => update(e.data));
  pf.on('changeOrientation', () => update(pf.getCurrentPageIndex()));
  pf.on('changeState', (e) => {
    if (e.data === 'flipping' && !flipping) {
      flipping = true;
      const idx = pf.getCurrentPageIndex();
      const last = pf.getPageCount() - 1;
      if (idx <= 1 || idx >= last - 2) coverThud(); else paperFlip(0.9 + Math.random() * 0.2);
    }
    if (e.data === 'read') {
      flipping = false;
      if (pending) { const d = pending; pending = null; setTimeout(() => (d === 'next' ? pf.flipNext() : pf.flipPrev()), 30); }
    }
  });
  pf.on('init', () => {
    update(pf.getCurrentPageIndex());
    if (startSlide != null) setTimeout(() => pf.turnToPage(pageOfSlide(startSlide)), 50);
    else if (autoOpen) setTimeout(() => pf.flipNext(), 650);
  });

  const stopAuto = () => { clearInterval(autoTimer); autoTimer = null; const b = $('#bkPlay', root); if (b) { b.setAttribute('aria-pressed', 'false'); b.innerHTML = icon('play'); } };
  const startAuto = () => {
    autoTimer = setInterval(() => {
      if (pf.getCurrentPageIndex() >= pf.getPageCount() - 1) return stopAuto();
      pf.flipNext();
    }, 3600);
    const b = $('#bkPlay', root); b.setAttribute('aria-pressed', 'true'); b.innerHTML = icon('pause');
    pf.flipNext();
  };

  $('#bookOpenBtn', root).addEventListener('click', () => next());
  $('#bkPrev', root).addEventListener('click', () => { stopAuto(); prev(); });
  $('#bkNext', root).addEventListener('click', () => { stopAuto(); next(); });
  $('#bkSound', root).addEventListener('click', (e) => {
    sound.on = !sound.on;
    e.currentTarget.setAttribute('aria-pressed', String(sound.on));
    e.currentTarget.innerHTML = icon(sound.on ? 'volume-2' : 'volume-x');
    if (sound.on) paperFlip(0.6);
  });
  $('#bkPlay', root).addEventListener('click', () => (autoTimer ? stopAuto() : startAuto()));
  $('#bkThumbs', root).addEventListener('click', (e) => {
    const list = $('#bkThumbList', root);
    list.hidden = !list.hidden;
    e.currentTarget.setAttribute('aria-pressed', String(!list.hidden));
    update(pf.getCurrentPageIndex());
  });
  $$('#bkThumbList button', root).forEach((b) => b.addEventListener('click', () => {
    stopAuto();
    const target = pageOfSlide(Number(b.dataset.slide));
    const cur = pf.getCurrentPageIndex();
    if (Math.abs(target - cur) <= 2) pf.flip(target); else { paperFlip(1); pf.turnToPage(target); update(pf.getCurrentPageIndex()); }
  }));
  $('#bkZoom', root).addEventListener('click', () => {
    const idx = pf.getCurrentPageIndex();
    const cand = [idx, idx + 1].map(slideOfPage).filter((s) => s !== null);
    openZoom(cand.length ? cand[0] : 0, (s) => { pf.turnToPage(pageOfSlide(s)); update(pf.getCurrentPageIndex()); });
  });
  const toggleFull = () => {
    const full = !stage.classList.contains('full');
    stage.classList.toggle('full', full);
    document.body.classList.toggle('lock', full);
    $('#bkFull', root).setAttribute('aria-pressed', String(full));
    $('#bkFull', root).innerHTML = icon(full ? 'minimize-2' : 'maximize-2');
    try { if (full && stage.requestFullscreen) stage.requestFullscreen().catch(() => {}); else if (!full && document.fullscreenElement) document.exitFullscreen(); } catch {}
    setTimeout(() => { fitWidth(); pf.update(); }, 80);
  };
  $('#bkFull', root).addEventListener('click', toggleFull);
  const onFsChange = () => { if (!document.fullscreenElement && stage.classList.contains('full')) toggleFull(); };
  document.addEventListener('fullscreenchange', onFsChange);

  const onKey = (e) => {
    if (document.querySelector('.modal-back, .palette-back, .overlay')) return;
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
    if (e.key === 'ArrowRight') { stopAuto(); next(); }
    if (e.key === 'ArrowLeft') { stopAuto(); prev(); }
    if (e.key === 'Escape' && stage.classList.contains('full')) toggleFull();
  };
  document.addEventListener('keydown', onKey);
  let rT;
  const onResize = () => { clearTimeout(rT); rT = setTimeout(() => { fitWidth(); pf.update(); update(pf.getCurrentPageIndex()); }, 120); };
  window.addEventListener('resize', onResize);

  return {
    pf,
    destroy() {
      stopAuto();
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('fullscreenchange', onFsChange);
      window.removeEventListener('resize', onResize);
      if (stage.classList.contains('full')) document.body.classList.remove('lock');
      try { pf.destroy(); } catch {}
    }
  };
}

// Tampilan perbesar satu halaman dengan pinch / scroll zoom
export function openZoom(slide, onLeave) {
  let cur = slide;
  let scale = 1, tx = 0, ty = 0;
  const ov = document.createElement('div');
  ov.className = 'overlay';
  ov.innerHTML = `
    <div class="reader-bar">
      <div class="rt"><b id="zTitle"></b><span>Cubit atau gulir untuk memperbesar · ketuk dua kali untuk reset</span></div>
      <div class="reader-tools">
        <button class="icon-btn on-dark" data-z="prev" aria-label="Sebelumnya">${icon('chevron-left')}</button>
        <button class="icon-btn on-dark" data-z="next" aria-label="Berikutnya">${icon('chevron-right')}</button>
        <button class="icon-btn on-dark" data-z="close" aria-label="Tutup">${icon('x')}</button>
      </div>
    </div>
    <div class="zoom-view"><img alt="" draggable="false"></div>`;
  document.body.appendChild(ov);
  document.body.classList.add('lock');
  requestAnimationFrame(() => ov.classList.add('show'));
  const img = $('img', ov);
  const apply = () => { img.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`; };
  const show = () => {
    const p = COMPRO_PAGES[cur];
    img.src = p.img; $('#zTitle', ov).textContent = `${p.no} · ${p.title}`;
    scale = 1; tx = 0; ty = 0; apply();
  };
  show();
  const close = () => {
    ov.classList.remove('show');
    document.removeEventListener('keydown', onKey);
    setTimeout(() => { ov.remove(); if (!document.querySelector('.modal-back, .overlay, .book-stage.full')) document.body.classList.remove('lock'); }, 300);
    onLeave && onLeave(cur);
  };
  const step = (d) => { cur = Math.max(0, Math.min(COMPRO_PAGES.length - 1, cur + d)); paperFlip(0.7); show(); };
  ov.addEventListener('click', (e) => {
    const b = e.target.closest('[data-z]'); if (!b) return;
    if (b.dataset.z === 'close') close(); else step(b.dataset.z === 'next' ? 1 : -1);
  });
  const onKey = (e) => { if (e.key === 'Escape') close(); if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); };
  document.addEventListener('keydown', onKey);
  const view = $('.zoom-view', ov);
  view.addEventListener('wheel', (e) => { e.preventDefault(); scale = Math.max(1, Math.min(5, scale * (e.deltaY < 0 ? 1.12 : 0.89))); if (scale === 1) { tx = 0; ty = 0; } apply(); }, { passive: false });
  view.addEventListener('dblclick', () => { scale = scale > 1 ? 1 : 2.2; tx = 0; ty = 0; apply(); });
  const pts = new Map(); let startDist = 0, startScale = 1, last = null;
  view.addEventListener('pointerdown', (e) => { view.setPointerCapture(e.pointerId); pts.set(e.pointerId, e); last = { x: e.clientX, y: e.clientY }; if (pts.size === 2) { const [a, b] = [...pts.values()]; startDist = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY); startScale = scale; } });
  view.addEventListener('pointermove', (e) => {
    if (!pts.has(e.pointerId)) return;
    pts.set(e.pointerId, e);
    if (pts.size === 2) { const [a, b] = [...pts.values()]; const d = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY); scale = Math.max(1, Math.min(5, startScale * d / (startDist || d))); apply(); }
    else if (scale > 1 && last) { tx += e.clientX - last.x; ty += e.clientY - last.y; last = { x: e.clientX, y: e.clientY }; apply(); }
  });
  const up = (e) => { pts.delete(e.pointerId); last = null; };
  view.addEventListener('pointerup', up); view.addEventListener('pointercancel', up);
}
