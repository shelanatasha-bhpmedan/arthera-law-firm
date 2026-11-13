// Brankas terenkripsi untuk data klien.
// Setiap klien dienkripsi AES-256-GCM dengan kunci turunan PBKDF2 (SHA-256) dari email klien itu sendiri.
// Data admin dienkripsi dengan kata sandi admin. Berjalan di browser maupun Node (WebCrypto).

const subtle = globalThis.crypto.subtle;
const enc = new TextEncoder();
const dec = new TextDecoder();
export const KDF_ITER = 210000;

const b64 = (buf) => {
  const bytes = new Uint8Array(buf);
  let s = '';
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  return btoa(s);
};
const unb64 = (str) => Uint8Array.from(atob(str), (c) => c.charCodeAt(0));

export function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

export async function lookupKey(email) {
  const h = await subtle.digest('SHA-256', enc.encode('arthera-vault|' + normalizeEmail(email)));
  return Array.from(new Uint8Array(h)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function deriveKey(secret, salt, iter = KDF_ITER) {
  const base = await subtle.importKey('raw', enc.encode(secret), 'PBKDF2', false, ['deriveKey']);
  return subtle.deriveKey(
    { name: 'PBKDF2', hash: 'SHA-256', salt, iterations: iter },
    base,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

export async function encryptJSON(obj, secret) {
  const salt = globalThis.crypto.getRandomValues(new Uint8Array(16));
  const iv = globalThis.crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(secret, salt);
  const ct = await subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(JSON.stringify(obj)));
  return { salt: b64(salt), iv: b64(iv), ct: b64(ct), it: KDF_ITER };
}

export async function decryptJSON(box, secret) {
  const key = await deriveKey(secret, unb64(box.salt), box.it || KDF_ITER);
  const pt = await subtle.decrypt({ name: 'AES-GCM', iv: unb64(box.iv) }, key, unb64(box.ct));
  return JSON.parse(dec.decode(pt));
}

// Membuat isi vault.json lengkap dari daftar klien (dipakai skrip build & panel admin)
export async function buildVault(clients, adminPassword) {
  const out = { v: 1, generated: new Date().toISOString(), clients: {}, admin: null };
  for (const c of clients) {
    if (!c.email) continue;
    out.clients[await lookupKey(c.email)] = await encryptJSON(c, normalizeEmail(c.email));
  }
  const summary = clients.map(({ docs, ...rest }) => ({ ...rest, hasDocs: !!(docs && Object.keys(docs).length) }));
  out.admin = await encryptJSON({ clients: summary, full: clients }, adminPassword);
  return out;
}
