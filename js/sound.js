// Efek suara disintesis (Web Audio): tanpa file audio
import { store } from './util.js';

let ctx = null;
let enabled = store.get('arthera_sound', true);
export const sound = {
  get on() { return enabled; },
  set on(v) { enabled = !!v; store.set('arthera_sound', enabled); }
};

function ac() {
  if (!ctx) {
    const C = window.AudioContext || window.webkitAudioContext;
    if (!C) return null;
    ctx = new C();
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function noise(c, dur, brown = 0.5) {
  const len = Math.floor(c.sampleRate * dur);
  const b = c.createBuffer(1, len, c.sampleRate);
  const d = b.getChannelData(0);
  let last = 0;
  for (let i = 0; i < len; i++) {
    const w = Math.random() * 2 - 1;
    last = (last + 0.02 * w) / 1.02;
    d[i] = w * (1 - brown) + last * 3.5 * brown;
  }
  return b;
}

function slap(c, t, gain = 0.22, freq = 1100) {
  const s = c.createBufferSource();
  s.buffer = noise(c, 0.12, 0.2);
  const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = freq;
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gain, t + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.11);
  s.connect(lp).connect(g).connect(c.destination);
  s.start(t); s.stop(t + 0.12);
}

// Suara kertas dibalik: desis menyapu + getaran halus + tepukan lembut di akhir
export function paperFlip(intensity = 1) {
  if (!enabled) return;
  const c = ac(); if (!c) return;
  const t = c.currentTime + 0.01;
  const dur = 0.5;
  const src = c.createBufferSource();
  src.buffer = noise(c, dur, 0.35);
  const hp = c.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 380;
  const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = 0.8;
  bp.frequency.setValueAtTime(900, t);
  bp.frequency.exponentialRampToValueAtTime(3600, t + 0.16);
  bp.frequency.exponentialRampToValueAtTime(800, t + dur);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.42 * intensity, t + 0.06);
  g.gain.exponentialRampToValueAtTime(0.16 * intensity, t + 0.26);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  const lfo = c.createOscillator(); lfo.frequency.value = 17 + Math.random() * 8;
  const lg = c.createGain(); lg.gain.value = 0.12 * intensity;
  lfo.connect(lg).connect(g.gain);
  src.connect(hp).connect(bp).connect(g).connect(c.destination);
  src.start(t); lfo.start(t); src.stop(t + dur); lfo.stop(t + dur);
  slap(c, t + 0.36, 0.2 * intensity, 1400);
}

// Sampul keras: hembusan + dentuman kayu/kulit
export function coverThud() {
  if (!enabled) return;
  const c = ac(); if (!c) return;
  const t = c.currentTime + 0.01;
  const s = c.createBufferSource(); s.buffer = noise(c, 0.7, 0.8);
  const lp = c.createBiquadFilter(); lp.type = 'lowpass';
  lp.frequency.setValueAtTime(500, t); lp.frequency.exponentialRampToValueAtTime(1800, t + 0.3); lp.frequency.exponentialRampToValueAtTime(300, t + 0.7);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.35, t + 0.15); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.7);
  s.connect(lp).connect(g).connect(c.destination); s.start(t); s.stop(t + 0.7);
  const o = c.createOscillator(); o.type = 'sine';
  const og = c.createGain();
  const tt = t + 0.62;
  o.frequency.setValueAtTime(120, tt); o.frequency.exponentialRampToValueAtTime(48, tt + 0.25);
  og.gain.setValueAtTime(0.0001, tt); og.gain.exponentialRampToValueAtTime(0.5, tt + 0.01); og.gain.exponentialRampToValueAtTime(0.0001, tt + 0.3);
  o.connect(og).connect(c.destination); o.start(tt); o.stop(tt + 0.32);
  slap(c, tt, 0.3, 700);
}

// Denting emas lembut (portal terbuka / tanda tangan tersimpan)
export function chime() {
  if (!enabled) return;
  const c = ac(); if (!c) return;
  const t = c.currentTime + 0.01;
  [[880, 0], [1318.5, 0.09], [1760, 0.18]].forEach(([f, d]) => {
    const o = c.createOscillator(); o.type = 'sine'; o.frequency.value = f;
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t + d); g.gain.exponentialRampToValueAtTime(0.09, t + d + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + d + 1.2);
    o.connect(g).connect(c.destination); o.start(t + d); o.stop(t + d + 1.25);
  });
}
