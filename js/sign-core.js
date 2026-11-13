// Alat bersama untuk link tanda tangan (browser & Node)
const enc = new TextEncoder();
export async function signLookup(token) {
  const h = await globalThis.crypto.subtle.digest('SHA-256', enc.encode('arthera-sign|' + token));
  return Array.from(new Uint8Array(h)).map((b) => b.toString(16).padStart(2, '0')).join('');
}
export const ROLE_LABEL = { klien: 'Klien', arthera: 'Arthera Law Firm' };
