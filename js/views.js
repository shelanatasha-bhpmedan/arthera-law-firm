// Halaman publik: Beranda, Layanan, Company Profile, Tim
import { SERVICES, PRACTICE_AREAS, TEAM } from './data-core.js';
import { tarifMerekHTML, TARIF_PDF } from './tarif-merek.js';
import { FIRM, SERVICE_META, FIRM_VALUES, WHY_ARTHERA, PILLARS, CLIENT_GROUPS } from './data-extra.js';
import { icon } from './icons.js';
import { bookStageHTML, mountBook, coverArt } from './book.js';
import { gateHTML, wireGate, portalState, setSession } from './portal.js';
import { normalizeEmail, lookupKey } from './vault.js';
import { $, $$, esc, store, toast, modal, waLink, mailLink, copyText, observeReveal, printHTML, fmtDate } from './util.js';

const ROMAN = ['I', 'II', 'III', 'IV', 'V'];
const KEYS = Object.keys(SERVICES);
const SHORT_ROLE = { aris: 'Managing Partner', lilis: 'Senior Partner', meizaroh: 'Partner · Pajak & Keuangan', fauzi: 'Associate' };

// ================= BERANDA =================
export function renderHome(view, nav) {
  const team = Object.values(TEAM);
  const clients = CLIENT_GROUPS.flatMap(([, l]) => l);
  const chapters = ['Tentang Kami', 'Visi & Misi', 'Nilai Kami', 'Mengapa Arthera', 'Layanan Kami', 'Bidang Praktik', 'Legal Due Diligence', 'Skema Kerja Sama', 'Cara Kami Bekerja', 'Tim Kami', 'Pengalaman', 'Kontak'];
  view.innerHTML = `
  <section class="hero dark">
    <canvas class="gold-dust" aria-hidden="true"></canvas>
    <div class="frame-lines"></div>
    <span class="hero-side l">EST. 2022</span><span class="hero-side r">EQUITY TOWER · SCBD</span>
    <div class="wrap hero-center">
      <img class="hero-emblem reveal" src="assets/emblem-light.png" alt="">
      <h1 class="hero-word foil-text reveal">ARTHERA</h1>
      <div class="hero-firm reveal"><i></i>LAW FIRM<i></i></div>
      <p class="hero-motto reveal">Integritas bukan sekadar nilai, melainkan standar yang kami jalankan.</p>
      <p class="hero-roles reveal">Advokat · Konsultan Hukum · Mediator · Kekayaan Intelektual</p>
      <div class="cta-row reveal">
        <a class="btn btn-gold btn-lg" href="#/layanan">${icon('layers')} Pilih Layanan</a>
        <a class="btn btn-ghost btn-lg" href="#/profil?buka=1">${icon('book-open')} Company Profile</a>
      </div>
      <p class="portal-hint reveal">${icon('key-round')} Sudah menjadi klien? <a href="#/portal">Masuk Portal Klien cukup dengan email</a></p>
    </div>
    <div class="wrap"><div class="stats">
      <div class="stat"><b>20+</b><span>Klien Korporasi & BUMN</span></div>
      <div class="stat"><b>18</b><span>Bidang Praktik</span></div>
      <div class="stat"><b>4</b><span>Partner & Advokat</span></div>
      <div class="stat"><b>ID · EN</b><span>Dokumen Bilingual</span></div>
    </div></div>
  </section>

  <section class="section">
    <div class="wrap about">
      <div class="reveal">
        <span class="eyebrow">Tentang Kami</span>
        <p class="quote it">Integritas bukan sekadar nilai yang kami sebutkan, melainkan standar yang kami jalankan.</p>
        <div class="sign">Arthera Law Firm · Est. 2022</div>
      </div>
      <div class="reveal">
        <p class="lead" style="color:var(--text);max-width:none">Didirikan pada tahun 2022, Arthera Law Firm adalah kantor advokat dan konsultan hukum di kawasan bisnis Sudirman, Jakarta. Kami mendampingi perusahaan swasta, multinasional, BUMN, BUMD, hingga pelaku UMKM dalam perkara litigasi maupun kebutuhan hukum korporasi dan kekayaan intelektual sehari-hari.</p>
        <p class="muted">Satu prinsip kami pegang: setiap temuan berbasis bukti, setiap risiko terukur, dan setiap rekomendasi siap dijalankan. Setiap penugasan diawasi langsung oleh Managing Partner atau Senior Partner.</p>
        <div class="num-grid"><div><b>2022</b><span>Tahun Berdiri</span></div><div><b>18</b><span>Bidang Praktik</span></div><div><b>20+</b><span>Klien Korporasi</span></div></div>
      </div>
    </div>
  </section>

  <section class="section" id="layanan" style="padding-top:0">
    <div class="wrap">
      <hr class="rule" style="margin-bottom:clamp(60px,7vw,100px)">
      <div class="section-head">
        <div><span class="eyebrow reveal">Layanan Kami</span><h2 class="h2 reveal">Lima pilar layanan,<br><em class="it">satu standar ketelitian.</em></h2></div>
        <p class="lead reveal">Setiap layanan memiliki alur yang jelas: pelajari tahapannya, isi registrasi singkat, lalu kelola berkas dan draf dokumen di Portal Klien.</p>
      </div>
      <div class="svc-grid">
        ${KEYS.map((k, i) => `
          <a class="card svc-card reveal ${k === 'merek' ? 'emerald' : ''}" href="#/layanan/${k}">
            <div class="svc-top"><span class="roman">${ROMAN[i]}</span><span class="svc-ic">${icon(SERVICE_META[k].icon)}</span></div>
            <span class="pill pill-gold" style="width:max-content">${esc(SERVICE_META[k].tag)}</span>
            <h3 class="h3">${esc(SERVICES[k].title.replace(' (HKI)', ''))}</h3>
            <p>${esc(SERVICE_META[k].blurb)}</p>
            <span class="btn-link">Lihat alur & registrasi ${icon('arrow-right')}</span>
          </a>`).join('')}
        <a class="card svc-card portal-card reveal" href="#/portal">
          <div class="svc-top"><span class="roman" style="-webkit-text-stroke-color:rgba(215,180,114,.45)">✦</span><span class="svc-ic">${icon('folder-lock')}</span></div>
          <span class="pill pill-dark" style="width:max-content">Portal Klien</span>
          <h3 class="h3">Berkas & Draf Dokumen Anda</h3>
          <p>Unggah dokumen pendukung, pantau status, dan setujui draf perjanjian secara elektronik. Masuk cukup dengan email terdaftar.</p>
          <span class="btn-link">Masuk dengan email ${icon('arrow-right')}</span>
        </a>
      </div>
    </div>
  </section>

  <section class="section dark" style="overflow:hidden">
    <div class="frame-lines"></div>
    <div class="wrap showcase">
      <div class="hero-book-wrap reveal">
        <div>
          <a class="hero-book" href="#/profil?buka=1" aria-label="Buka Company Profile" id="heroBook">
            <div class="hb-back"></div><div class="hb-pages"></div>
            <div class="hb-cover leather">${coverArt()}<div class="hb-glare"></div></div>
          </a>
          <p class="hero-book-caption">${icon('sparkles')} Ketuk buku untuk membukanya</p>
        </div>
      </div>
      <div class="reveal">
        <span class="eyebrow">Company Profile · Edisi 2026</span>
        <h2 class="h2 mt-1">Dibuka seperti <em class="it gold-text">buku sungguhan.</em></h2>
        <p class="lead mt-2">Lima belas halaman yang merangkum siapa kami, cara kami bekerja, dan para Partner yang menangani perkara Anda. Tarik sudut halamannya dan dengarkan kertasnya berbalik.</p>
        <div class="chapters">${chapters.map((c, i) => `<span><em>${String(i + 1).padStart(2, '0')}</em>${c}</span>`).join('')}</div>
        <div class="row mt-4"><a class="btn btn-gold" href="#/profil?buka=1">${icon('book-open')} Buka Company Profile</a></div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="center" style="margin-bottom:56px"><span class="eyebrow reveal">Cara Kerja</span><h2 class="h2 reveal mt-1">Sederhana dari awal hingga akhir</h2></div>
      <div class="how">
        <div class="how-step reveal"><div class="medal">01</div><h3 class="h4">Pelajari alur</h3><p>Setiap layanan menjelaskan tahapan, jangka waktu, dan dasar hukumnya secara terbuka.</p></div>
        <div class="how-step reveal"><div class="medal">02</div><h3 class="h4">Registrasi singkat</h3><p>Isi formulir dalam dua menit. Data langsung diteruskan ke Partner yang menangani.</p></div>
        <div class="how-step reveal"><div class="medal">03</div><h3 class="h4">Portal Klien</h3><p>Masuk dengan email Anda untuk mengunggah berkas dan menyetujui draf dokumen.</p></div>
      </div>
    </div>
  </section>

  <section class="section dark" style="overflow:hidden">
    <div class="frame-lines"></div>
    <div class="wrap">
      <div class="section-head">
        <div><span class="eyebrow reveal">Partner & Advokat</span><h2 class="h2 reveal">Ditangani langsung<br><em class="it gold-text">oleh para Partner.</em></h2></div>
        <a class="btn btn-ghost reveal" href="#/tim">Lihat seluruh CV ${icon('arrow-right')}</a>
      </div>
      <div class="team-row">
        ${team.map((p) => `<a class="member reveal" href="#/tim/${p.id}"><div class="arch"><img src="${p.portrait}" alt="${esc(p.name)}" loading="lazy"></div><div class="m-role">${SHORT_ROLE[p.id]}</div><div class="m-name">${esc(titleCase(p.name))}</div><div class="m-deg">${esc(p.degrees)}</div></a>`).join('')}
      </div>
    </div>
  </section>

  <section class="section" style="padding:76px 0">
    <div class="wrap center"><span class="eyebrow reveal">Pengalaman Para Advokat Kami</span></div>
    <div class="marquee mt-3"><div class="marquee-track">${[...clients, ...clients].map((c) => `<span>${esc(c)}</span>`).join('')}</div></div>
  </section>

  <section class="section dark" id="kontak">
    <div class="frame-lines"></div>
    <div class="wrap contact-band">
      <div>
        <span class="eyebrow reveal">Konsultasi</span>
        <h2 class="h2 reveal mt-1">Bicarakan kebutuhan hukum Anda<br><em class="it gold-text">langsung dengan Partner.</em></h2>
        <p class="lead reveal mt-2">Daftar Tarif Layanan Merek dapat dilihat dan diunduh di <a class="btn-link" href="#/layanan/merek/1">halaman layanan Merek</a>. Untuk layanan lain, penawaran biaya kami sampaikan langsung melalui email atau WhatsApp sesuai ruang lingkup yang Anda butuhkan.</p>
        <div class="row mt-3 reveal"><button class="btn btn-gold" data-contact>${icon('message-circle')} Tulis pesan</button><a class="btn btn-ghost" href="mailto:${FIRM.email}">${icon('mail')} Email</a></div>
      </div>
      <div class="contact-cards">
        ${FIRM.contacts.map((c) => `<a class="contact-card reveal" href="${waLink(c.wa, 'Halo Arthera Law Firm, saya ingin berkonsultasi.')}" target="_blank" rel="noopener"><div><b>${esc(c.name)}</b><span>${esc(c.role)} · ${esc(c.phone)}</span></div><span class="icon-btn on-dark">${icon('message-circle')}</span></a>`).join('')}
        <div class="contact-card reveal"><div><b>Equity Tower, Lantai 26 Unit H</b><span>Jl. Jenderal Sudirman Kav. 52-53 (SCBD), Jakarta Selatan 12190</span></div><span class="icon-btn on-dark">${icon('map-pin')}</span></div>
      </div>
    </div>
  </section>`;

  goldDust($('.gold-dust', view));
  const book = $('#heroBook', view);
  const wrapB = book?.parentElement;
  if (book && matchMedia('(hover:hover)').matches) {
    wrapB.addEventListener('pointermove', (e) => {
      const r = wrapB.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      book.style.transform = `rotateX(${10 - y * 14}deg) rotateY(${-18 + x * 22}deg) rotateZ(1deg)`;
    });
    wrapB.addEventListener('pointerleave', () => { book.style.transform = ''; });
  }
  $$('[data-contact]', view).forEach((b) => b.addEventListener('click', () => contactModal()));
}

// Serbuk emas melayang pelan di latar hero
function goldDust(cv) {
  if (!cv || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = cv.getContext('2d');
  let w, h, dpr, parts;
  const size = () => {
    dpr = Math.min(2, window.devicePixelRatio || 1);
    w = cv.clientWidth; h = cv.clientHeight; cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.min(42, (w * h) / 30000));
    parts = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.1 + 0.25, v: Math.random() * 0.14 + 0.04, d: Math.random() * 0.4 - 0.2, t: Math.random() * 6.28, s: Math.random() * 0.008 + 0.003 }));
  };
  size();
  window.addEventListener('resize', size);
  const tick = () => {
    if (!cv.isConnected) { window.removeEventListener('resize', size); return; }
    ctx.clearRect(0, 0, w, h);
    for (const p of parts) {
      p.y -= p.v; p.x += p.d * 0.3; p.t += p.s;
      if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w; }
      const a = 0.22 + Math.sin(p.t) * 0.12;
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
      g.addColorStop(0, `rgba(243,226,182,${a})`); g.addColorStop(1, 'rgba(194,150,72,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 4, 0, 6.283); ctx.fill();
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

export const titleCase = (s) => s.toLowerCase().replace(/\b([a-z])/g, (m) => m.toUpperCase());

// ================= DAFTAR LAYANAN =================
export function renderServiceIndex(view) {
  view.innerHTML = `
  <section class="page-head dark"><div class="frame-lines"></div><div class="wrap">
    <div class="crumbs"><a href="#/">Beranda</a> / <span>Layanan</span></div>
    <span class="eyebrow">Menu Layanan Hukum</span><h1 class="display">Pilih layanan<br><em class="it gold-text">yang Anda butuhkan.</em></h1>
    <p class="lead">Lima layanan dengan alur kerja yang terukur, ditambah Portal Klien untuk mengelola berkas dan draf dokumen.</p>
  </div></section>
  <section class="section" style="padding-top:56px"><div class="wrap"><div class="svc-grid">
    ${KEYS.map((k, i) => `<a class="card svc-card reveal ${k === 'merek' ? 'emerald' : ''}" href="#/layanan/${k}"><div class="svc-top"><span class="roman">${ROMAN[i]}</span><span class="svc-ic">${icon(SERVICE_META[k].icon)}</span></div><span class="pill pill-gold" style="width:max-content">${esc(SERVICE_META[k].tag)}</span><h3 class="h3">${esc(SERVICES[k].title.replace(' (HKI)', ''))}</h3><p>${esc(SERVICES[k].subtitle)}</p><span class="btn-link">Buka alur layanan ${icon('arrow-right')}</span></a>`).join('')}
    <a class="card svc-card portal-card reveal" href="#/portal"><div class="svc-top"><span class="roman">✦</span><span class="svc-ic">${icon('folder-lock')}</span></div><span class="pill pill-dark" style="width:max-content">Portal Klien</span><h3 class="h3">Berkas & Draf Dokumen</h3><p>Masuk cukup dengan email terdaftar.</p><span class="btn-link">Masuk ${icon('arrow-right')}</span></a>
  </div></div></section>`;
}

// ================= HALAMAN LAYANAN =================
export function renderService(view, key, step, nav) {
  const srv = SERVICES[key];
  const idx = KEYS.indexOf(key);
  step = [1, 2, 3].includes(step) ? step : 1;
  view.innerHTML = `
  <section class="page-head dark"><div class="frame-lines"></div><div class="wrap">
    <div class="crumbs"><a href="#/">Beranda</a> / <a href="#/layanan">Layanan</a> / <span>${esc(SERVICE_META[key].short)}</span></div>
    <div class="head-row">
      <div><span class="eyebrow">Layanan ${ROMAN[idx]} · ${esc(srv.category)}</span><h1 class="h2">${esc(srv.title)}</h1><p class="lead">${esc(srv.subtitle)}</p></div>
      <div class="head-actions">${key === 'merek' ? `<a class="btn btn-gold" href="#tarif" data-tarif>${icon('file-text')} Daftar Tarif</a>` : ''}<button class="btn btn-ghost" data-contact>${icon('message-circle')} Tanya Penawaran Biaya</button></div>
    </div>
  </div></section>
  <div class="stepper-wrap"><div class="wrap"><div class="stepper" role="tablist">
    ${[['Langkah 1', 'Alur Layanan'], ['Langkah 2', 'Registrasi'], ['Langkah 3', 'Portal Klien']].map(([s, t], i) => `<a class="step-tab ${step === i + 1 ? 'active' : ''} ${step > i + 1 ? 'done' : ''}" href="#/layanan/${key}/${i + 1}" role="tab" aria-selected="${step === i + 1}"><span class="num">${step > i + 1 ? '✓' : i + 1}</span><span><small>${s}</small><b>${t}</b></span></a>`).join('')}
  </div></div></div>
  <section class="section" style="padding-top:48px"><div class="wrap-narrow" id="stepBody"></div></section>`;

  const body = $('#stepBody', view);
  if (step === 1) {
    body.innerHTML = `
      <p class="lead reveal" style="max-width:none;color:var(--text)">${esc(srv.flowIntro)}</p>
      <div class="timeline">
        ${srv.flowSteps.map((s) => `<div class="tl-item reveal"><div class="tl-medal">${s.no}</div><div class="card tl-body"><div class="tl-top"><h3 class="h4">${esc(s.title)}</h3><span class="pill pill-gold">${icon('clock')} ${esc(s.time)}</span></div><p>${esc(s.desc)}</p></div></div>`).join('')}
      </div>
      <p class="small muted mt-3 reveal it">${esc(srv.flowFootnote)}</p>
      ${key === 'merek' ? tarifMerekHTML() : ''}
      <div class="form-foot reveal"><a class="btn btn-ghost" href="#/layanan/${key}/3">${icon('key-round')} Sudah terdaftar? Masuk Portal</a><a class="btn btn-gold btn-lg" href="#/layanan/${key}/2">Lanjut ke Registrasi ${icon('arrow-right')}</a></div>`;
  } else if (step === 2) {
    renderForm(body, key, nav);
  } else {
    const st = portalState();
    if (st) {
      body.innerHTML = `<div class="card pad center reveal"><div class="success-seal">${icon('unlock')}</div><span class="eyebrow">Sesi Aktif</span><h2 class="h3 mt-1">Anda masuk sebagai ${esc(st.rec.name)}</h2><p class="muted mt-1">${esc(st.rec.email)}</p><div class="row mt-3" style="justify-content:center"><a class="btn btn-gold btn-lg" href="#/portal">${icon('folder-lock')} Buka Portal Saya</a></div></div>`;
    } else {
      body.innerHTML = `<div style="display:grid;place-items:center">${gateHTML({ compact: true })}</div>
        <p class="small muted center mt-3 reveal">Belum terdaftar? <a class="btn-link" href="#/layanan/${key}/2">Isi registrasi layanan</a></p>`;
      wireGate(body, () => nav('#/portal'));
    }
  }
  $$('[data-contact]', view).forEach((b) => b.addEventListener('click', () => contactModal(key)));
  $$('[data-tarif]', view).forEach((b) => b.addEventListener('click', (e) => {
    e.preventDefault();
    if (step !== 1) { nav(`#/layanan/${key}/1`); setTimeout(() => document.getElementById('tarif')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 350); }
    else document.getElementById('tarif')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));
}

function renderForm(body, key, nav) {
  const srv = SERVICES[key];
  const draftKey = `arthera_form_${key}`;
  const draft = store.get(draftKey, {});
  const isReq = (f) => f.type === 'email' || f.type === 'tel' || f === srv.fields[0];
  body.innerHTML = `
    <div class="card pad reveal">
      <span class="eyebrow">Registrasi Layanan</span>
      <h2 class="h3 mt-1">${esc(srv.formTitle)}</h2>
      <p class="muted mt-1">${esc(srv.formSubtitle)}</p>
      <hr class="rule mt-3" style="margin-bottom:26px">
      <form id="regForm" novalidate><div class="form-grid">
        ${srv.fields.map((f) => `<div class="field ${f.type === 'textarea' || f.type === 'select' ? 'full' : ''}" data-f="${f.id}">
          <label for="${f.id}">${esc(f.label)} ${isReq(f) ? '<span class="req">*</span>' : ''}</label>
          ${f.type === 'select' ? `<select class="select" id="${f.id}">${f.options.map((o) => `<option ${draft[f.id] === o ? 'selected' : ''}>${esc(o)}</option>`).join('')}</select>`
            : f.type === 'textarea' ? `<textarea class="textarea" id="${f.id}" placeholder="${esc(f.placeholder)}">${esc(draft[f.id] || '')}</textarea>`
            : `<input class="input" id="${f.id}" type="${f.type}" placeholder="${esc(f.placeholder)}" value="${esc(draft[f.id] || '')}" ${f.type === 'email' ? 'autocomplete="email" inputmode="email"' : f.type === 'tel' ? 'autocomplete="tel" inputmode="tel"' : ''}>`}
          <span class="err">${f.type === 'email' ? 'Masukkan email yang valid.' : 'Wajib diisi.'}</span>
        </div>`).join('')}
      </div>
      <div class="form-foot"><span class="autosave" id="autosave">${icon('check')} Draf formulir tersimpan otomatis</span><button class="btn btn-gold btn-lg" type="submit">${icon('send')} Kirim Registrasi</button></div>
      </form>
    </div>`;
  const form = $('#regForm', body);
  form.addEventListener('input', () => {
    const d = {}; srv.fields.forEach((f) => { d[f.id] = $('#' + f.id, form).value; }); store.set(draftKey, d);
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;
    srv.fields.forEach((f) => {
      const el = $('#' + f.id, form); const v = el.value.trim(); const wrap = el.closest('.field');
      const bad = isReq(f) && (!v || (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)));
      wrap.classList.toggle('invalid', bad); if (bad) ok = false;
    });
    if (!ok) { toast('Lengkapi kolom bertanda *', '', 'err'); $('.field.invalid .input, .field.invalid .textarea', form)?.focus(); return; }
    const vals = {}; srv.fields.forEach((f) => { vals[f.id] = $('#' + f.id, form).value.trim(); });
    const emailF = srv.fields.find((f) => f.type === 'email'); const telF = srv.fields.find((f) => f.type === 'tel');
    const name = vals[srv.fields[0].id];
    const scope = srv.fields.filter((f) => !['email', 'tel'].includes(f.type) && f !== srv.fields[0] && vals[f.id]).map((f) => vals[f.id]).slice(0, 3).join(' · ');
    const d = new Date();
    const ref = `REG-${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    const rec = { email: normalizeEmail(vals[emailF.id]), name, whatsapp: vals[telF.id], serviceKey: key, serviceTitle: srv.title, scopeSummary: scope, status: 'Registrasi diterima · Menunggu verifikasi Admin', stage: 0, date: fmtDate(d), regRef: ref };
    const regs = store.get('arthera_regs', []).filter((r) => normalizeEmail(r.email) !== rec.email);
    regs.unshift(rec); store.set('arthera_regs', regs); store.del(draftKey);
    const code = btoa(unescape(encodeURIComponent(JSON.stringify(rec)))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    const lines = srv.fields.map((f) => `${f.label}: ${vals[f.id] || '-'}`);
    const msg = ['Kepada Yth. Tim ARTHERA LAW FIRM,', '', `Registrasi layanan: ${srv.title}`, `Nomor referensi: ${ref}`, '----------------------------------------', ...lines, '----------------------------------------', 'Mohon verifikasi dan aktivasi akses Portal Klien dengan email di atas. Terima kasih.', '', `ARTHERA-REG:${code}`].join('\n');
    const pic = ['merek', 'ldd'].includes(key) ? FIRM.contacts[1] : FIRM.contacts[0];
    body.innerHTML = `
      <div class="card pad center reveal in">
        <div class="success-seal">${icon('check')}</div>
        <span class="eyebrow">Registrasi Tercatat</span>
        <h2 class="h3 mt-1">Terima kasih, ${esc(name)}.</h2>
        <div class="ref-box"><span class="small muted">Nomor referensi</span><b class="mono">${ref}</b><button class="icon-btn" data-copy="${ref}" aria-label="Salin">${icon('copy')}</button></div>
        <p class="muted mt-2" style="max-width:52ch;margin-inline:auto">Kirim registrasi ini ke Arthera melalui email atau WhatsApp. Setelah diverifikasi Admin, email <b>${esc(rec.email)}</b> menjadi kunci Portal Klien Anda di perangkat mana pun.</p>
        <div class="row mt-3" style="justify-content:center">
          <a class="btn btn-gold" href="${mailLink(FIRM.email, `Registrasi Layanan ${srv.title} - ${name}`, msg)}">${icon('mail')} Kirim via Email</a>
          <a class="btn btn-dark" href="${waLink(pic.wa, msg)}" target="_blank" rel="noopener">${icon('message-circle')} Kirim via WhatsApp</a>
        </div>
        <hr class="rule mt-4" style="margin-bottom:22px">
        <button class="btn btn-ghost" id="goPortal">${icon('folder-lock')} Buka Portal Klien sekarang</button>
        <p class="tiny muted mt-1">Anda sudah dapat mulai mengunggah berkas dari perangkat ini.</p>
      </div>`;
    $('[data-copy]', body).addEventListener('click', (ev) => copyText(ev.currentTarget.dataset.copy, 'Nomor referensi tersalin'));
    $('#goPortal', body).addEventListener('click', async () => { setSession({ rec, lk: await lookupKey(rec.email), source: 'local' }); nav('#/portal'); });
    window.scrollTo({ top: body.getBoundingClientRect().top + scrollY - 160, behavior: 'smooth' });
    toast('Registrasi tercatat', ref);
  });
}

// ================= COMPANY PROFILE =================
let bookCtl = null;
export function destroyBook() { if (bookCtl) { bookCtl.destroy(); bookCtl = null; } }

export function renderProfile(view, { slide = null, open = false } = {}) {
  const tabs = [['tentang', 'Tentang & Visi-Misi'], ['nilai', 'Nilai & Keunggulan'], ['pilar', 'Dua Pilar & Skema'], ['praktik', '18 Bidang Praktik'], ['klien', 'Pengalaman Klien']];
  view.innerHTML = `${bookStageHTML()}
  <section class="section"><div class="wrap">
    <div class="section-head"><div><span class="eyebrow">Ringkasan Company Profile</span><h2 class="h2">Arthera dalam <em class="it">sekilas pandang</em></h2></div>
      <div class="tabs" id="profTabs">${tabs.map(([k, l], i) => `<button class="tab ${i ? '' : 'active'}" data-pt="${k}">${l}</button>`).join('')}</div></div>
    <div id="profBody"></div>
  </div></section>`;
  const body = $('#profBody', view);
  const show = (k) => {
    body.innerHTML = profileTab(k);
    observeReveal(body);
  };
  show('tentang');
  $$('[data-pt]', view).forEach((b) => b.addEventListener('click', () => { $$('[data-pt]', view).forEach((x) => x.classList.toggle('active', x === b)); show(b.dataset.pt); }));
  destroyBook();
  const start = () => { bookCtl = mountBook(view, { startSlide: slide, autoOpen: open && slide == null }); };
  if (window.St) start(); else window.addEventListener('pageflip-ready', start, { once: true });
}

function profileTab(k) {
  if (k === 'tentang') return `<div class="prof-grid">
    <div class="card-dark pad reveal" style="padding:40px;position:relative"><div class="frame-lines"></div><span class="eyebrow light">01 · Tentang Kami</span><p class="quote mt-2">“Integritas bukan sekadar nilai yang kami sebutkan, melainkan standar yang kami jalankan.”</p><p class="mt-3" style="opacity:.78">Didirikan pada tahun 2022, Arthera Law Firm adalah kantor advokat dan konsultan hukum di kawasan bisnis Sudirman (Equity Tower Lantai 26 Unit H, SCBD), Jakarta Selatan. Kami mendampingi perusahaan swasta, multinasional, BUMN, BUMD, dan pelaku usaha dalam perkara litigasi maupun kebutuhan hukum korporasi dan kekayaan intelektual sehari-hari, dengan satu prinsip: setiap temuan berbasis bukti, setiap risiko terukur, dan setiap rekomendasi siap dijalankan.</p>
      <div class="num-grid" style="border-color:rgba(215,180,114,.2)"><div><b style="color:var(--gold-2)">20+</b><span style="color:rgba(246,240,226,.55)">Klien Korporasi & BUMN</span></div><div><b style="color:var(--gold-2)">18</b><span style="color:rgba(246,240,226,.55)">Bidang Praktik</span></div><div><b style="color:var(--gold-2)">2022</b><span style="color:rgba(246,240,226,.55)">Tahun Berdiri</span></div></div></div>
    <div class="card pad reveal"><span class="eyebrow">02 · Visi & Misi</span><h3 class="h3 mt-2">Visi</h3><p class="mt-1">Menjadi kantor hukum pilihan utama bagi dunia usaha dan institusi negara di Indonesia, yang dikenal karena integritas, ketelitian, dan nasihat hukum yang dapat langsung dijalankan.</p><h3 class="h3 mt-3">Misi</h3>
      <div class="val-list mt-1">${['Memberikan nasihat hukum yang jujur, independen, dan berorientasi pada keputusan bisnis klien.', 'Mencegah sengketa melalui kepatuhan, kontrak yang kuat, dan pemetaan risiko sejak awal.', 'Membela kepentingan klien secara gigih dan beretika di setiap forum penyelesaian sengketa.'].map((m, i) => `<div class="val"><span class="rn">${['I', 'II', 'III'][i]}</span><p style="margin:0;color:var(--text)">${m}</p></div>`).join('')}</div></div></div>`;
  if (k === 'nilai') return `<div class="prof-grid">
    <div class="card pad reveal"><span class="eyebrow">03 · Nilai Kami</span><div class="val-list mt-2">${FIRM_VALUES.map(([id, en, d], i) => `<div class="val"><span class="rn">${ROMAN[i]}</span><div><b>${id} <i>· ${en}</i></b><p>${d}</p></div></div>`).join('')}</div></div>
    <div class="card pad reveal"><span class="eyebrow">04 · Mengapa Arthera</span><div class="val-list mt-2">${WHY_ARTHERA.map(([t, d], i) => `<div class="val"><span class="rn">0${i + 1}</span><div><b>${t}</b><p>${d}</p></div></div>`).join('')}</div></div></div>`;
  if (k === 'pilar') return `<div class="pillars">${PILLARS.map(([e, t, d], i) => `<div class="${i === 1 ? 'card-dark' : 'card'} pad reveal" style="position:relative">${i === 1 ? '<div class="frame-lines"></div>' : ''}<span class="eyebrow ${i === 1 ? 'light' : ''}">${e}</span><h3 class="h3 mt-2">${t}</h3><p class="mt-1" style="opacity:.8">${d}</p></div>`).join('')}</div>`;
  if (k === 'praktik') return `<div class="practice-grid reveal">${PRACTICE_AREAS.map((p, i) => `<div class="${i === 0 ? 'sig' : ''}"><em>${p.no}</em><div><b>${esc(p.id)}</b><span>${esc(p.en)}</span></div></div>`).join('')}</div>`;
  return `<div class="clients-grid">${CLIENT_GROUPS.map(([g, l]) => `<div class="card pad reveal"><span class="eyebrow">${esc(g)}</span><ul class="mt-2">${l.map((c) => `<li>${esc(c)}</li>`).join('')}</ul></div>`).join('')}</div>`;
}

// ================= TIM & CV =================
export function renderTeam(view, id) {
  const people = Object.values(TEAM);
  const p = TEAM[id] || people[0];
  let lang = store.get('arthera_cv_lang', 'id');
  view.innerHTML = `
  <section class="page-head dark"><div class="frame-lines"></div><div class="wrap">
    <div class="crumbs"><a href="#/">Beranda</a> / <span>Partner & Advokat</span></div>
    <div class="head-row"><div><span class="eyebrow">Executive Curriculum Vitae</span><h1 class="h2">Partner & Advokat</h1><p class="lead">Profil, pendidikan, sertifikasi, dan rekam jejak profesional tim Arthera.</p></div>
    <div class="head-actions"><div class="seg" id="cvLang" style="background:rgba(255,255,255,.04);border-color:rgba(215,180,114,.3)"><button data-l="id">INDONESIA</button><button data-l="en">ENGLISH</button></div><button class="btn btn-ghost" id="cvPrint">${icon('printer')} Cetak CV</button></div></div>
  </div></section>
  <section class="section" style="padding-top:40px"><div class="wrap cv-layout">
    <nav class="cv-side">${people.map((x) => `<a class="cv-pick ${x.id === p.id ? 'on' : ''}" href="#/tim/${x.id}"><img src="${x.portrait}" alt=""><div><b>${esc(titleCase(x.name))}</b><span>${SHORT_ROLE[x.id]}</span></div></a>`).join('')}</nav>
    <article class="card folio reveal" id="folio"></article>
  </div></section>`;
  const folio = $('#folio', view);
  const draw = () => {
    $$('#cvLang button', view).forEach((b) => b.classList.toggle('on', b.dataset.l === lang));
    folio.innerHTML = cvHTML(p, lang);
  };
  draw();
  $$('#cvLang button', view).forEach((b) => b.addEventListener('click', () => { lang = b.dataset.l; store.set('arthera_cv_lang', lang); draw(); }));
  $('#cvPrint', view).addEventListener('click', () => printHTML(`<div class="card folio" style="box-shadow:none;border:0">${cvHTML(p, lang)}</div>`, `CV ${titleCase(p.name)} - Arthera Law Firm`));
}

function cvHTML(p, l) {
  const L = l === 'en' ? { prof: 'Professional Profile', edu: 'Education', cert: 'Licences & Certifications', exp: 'Professional Experience', comp: 'Core Competencies', att: 'Attachments' } : { prof: 'Profil Profesional', edu: 'Pendidikan', cert: 'Lisensi & Sertifikasi', exp: 'Pengalaman Profesional', comp: 'Kompetensi Utama', att: 'Lampiran' };
  return `
    <div class="folio-head">
      <div class="arch"><img src="${p.portrait}" alt="${esc(p.name)}"></div>
      <div><img src="assets/logo-line.png" alt="Arthera Law Firm" style="height:22px;margin-bottom:18px;opacity:.9">
        <h2 class="folio-name">${esc(titleCase(p.name))}</h2><div class="folio-deg">${esc(p.degrees)}</div>
        <div class="folio-role">${esc(p['role_' + l])}</div>
        <div class="folio-contact"><span>${icon('map-pin')} ${esc(p['location_' + l])}</span><span>${icon('phone')} ${esc(p.phone)}</span><span>${icon('mail')} ${esc(p.email1)}</span>${p.email2 && p.email2 !== p.email1 ? `<span>${icon('mail')} ${esc(p.email2)}</span>` : ''}</div>
      </div>
    </div>
    <div class="folio-sec"><h4>${L.prof}</h4><p style="text-align:justify">${esc(p['profile_' + l])}</p></div>
    <div class="folio-2">
      <div class="folio-sec"><h4>${L.edu}</h4>${p['edu_' + l].map(([a, b]) => `<div class="cred"><b>${esc(a)}</b><span>${esc(b)}</span></div>`).join('')}</div>
      <div class="folio-sec"><h4>${L.cert}</h4>${p['certs_' + l].map(([a, b]) => `<div class="cred"><b>${esc(a)}</b><span>${esc(b)}</span></div>`).join('')}</div>
    </div>
    <div class="folio-sec"><h4>${L.exp}</h4>${p['exp_' + l].map((x) => `<div class="exp"><div class="per">${esc(x.period)}</div><div><div class="firm">${esc(x.firm)}</div><div class="ttl">${esc(x.title)}</div><ul>${x.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul></div></div>`).join('')}</div>
    <div class="folio-sec"><h4>${L.comp}</h4><div class="comp">${p.competencies.map((c) => `<span>${esc(c)}</span>`).join('')}</div></div>
    ${p.attachments ? `<div class="folio-sec"><h4>${L.att}</h4><div class="val-list">${p.attachments.map((a) => `<div class="cred"><span style="color:var(--text)">${esc(a)}</span></div>`).join('')}</div></div>` : ''}`;
}

// ================= MODAL KONTAK / PENAWARAN =================
export function contactModal(serviceKey = null) {
  modal({
    eyebrow: 'Komunikasi Resmi Firma',
    title: 'Hubungi Partner kami',
    width: 680,
    body: `
      <p class="muted">Daftar Tarif Layanan Merek tersedia di <a class="btn-link" href="${TARIF_PDF}" target="_blank" rel="noopener">PDF ini</a>. Untuk layanan lain, penawaran biaya disampaikan langsung oleh Partner sesuai ruang lingkup kebutuhan Anda.</p>
      <div class="form-grid mt-3">
        <div class="field"><label>Nama Anda</label><input class="input" id="cName" placeholder="Nama lengkap / perusahaan"></div>
        <div class="field"><label>Layanan</label><select class="select" id="cSrv">${KEYS.map((k) => `<option value="${k}" ${k === serviceKey ? 'selected' : ''}>${esc(SERVICES[k].title)}</option>`).join('')}<option value="">Lainnya / belum yakin</option></select></div>
        <div class="field full"><label>Pesan</label><textarea class="textarea" id="cMsg" placeholder="Ceritakan singkat kebutuhan hukum Anda…"></textarea></div>
      </div>
      <div class="stack-sm mt-3">${FIRM.contacts.map((c, i) => `<button class="contact-card" style="width:100%;color:var(--text);border-color:var(--line);background:var(--paper)" data-wa="${i}"><div style="text-align:left"><b>${esc(c.name)}</b><span style="color:var(--muted)">${esc(c.role)} · ${esc(c.phone)}</span></div><span class="btn btn-gold btn-sm">${icon('message-circle')} WhatsApp</span></button>`).join('')}</div>`,
    actions: `<button class="btn btn-ghost btn-sm" id="cMail">${icon('mail')} Kirim via Email</button><button class="btn btn-ghost btn-sm" id="cCopy">${icon('copy')} Salin pesan</button>`,
    onMount(m) {
      const compose = () => {
        const k = $('#cSrv', m).value;
        return `Halo Arthera Law Firm,\n\nSaya ${$('#cName', m).value || '(nama)'} ingin meminta informasi penawaran biaya untuk layanan: ${k ? SERVICES[k].title : 'Konsultasi hukum'}.\n\n${$('#cMsg', m).value || ''}\n\nTerima kasih.`;
      };
      $$('[data-wa]', m).forEach((b) => b.addEventListener('click', () => window.open(waLink(FIRM.contacts[Number(b.dataset.wa)].wa, compose()), '_blank', 'noopener')));
      $('#cMail', m).addEventListener('click', () => { location.href = mailLink(FIRM.email, 'Permintaan Penawaran Biaya Layanan Hukum', compose()); });
      $('#cCopy', m).addEventListener('click', () => copyText(compose(), 'Pesan tersalin'));
    }
  });
}
