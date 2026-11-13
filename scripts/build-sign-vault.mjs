// Membuat sign-vault.json (link tanda tangan terenkripsi) dan menambahkan link klien ke vault.json.
// Pemakaian: node scripts/build-sign-vault.mjs <sign-source.json>
// sign-source.json berisi data pribadi dan token rahasia: simpan di luar repo, jangan di-commit.
import fs from 'fs';
import { webcrypto } from 'crypto';
if (!globalThis.crypto) globalThis.crypto = webcrypto;
if (!globalThis.btoa) { globalThis.btoa = (s) => Buffer.from(s, 'binary').toString('base64'); globalThis.atob = (s) => Buffer.from(s, 'base64').toString('binary'); }
const { encryptJSON, decryptJSON, lookupKey } = await import(new URL('../js/vault.js', import.meta.url));
const { signLookup } = await import(new URL('../js/sign-core.js', import.meta.url));

const src = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const out = { v: 1, generated: new Date().toISOString(), links: {} };
for (const l of src.links) {
  const payload = { role: l.role, signer: l.signer, client: l.client, docs: l.docs.map((k) => ({ key: k, ...src.docs[k] })) };
  out.links[await signLookup(l.token)] = await encryptJSON(payload, l.token);
}
fs.writeFileSync(new URL('../sign-vault.json', import.meta.url), JSON.stringify(out));

// Tambahkan link tanda tangan ke data portal klien (terenkripsi dengan email klien)
const vaultPath = new URL('../vault.json', import.meta.url);
const vault = JSON.parse(fs.readFileSync(vaultPath, 'utf8'));
for (const l of src.links.filter((x) => x.role === 'klien')) {
  const lk = await lookupKey(l.client.email);
  if (!vault.clients[lk]) { console.warn('Klien tidak ada di vault.json:', l.client.email); continue; }
  const rec = await decryptJSON(vault.clients[lk], l.client.email.trim().toLowerCase());
  rec.signLink = `ttd.html#${l.token}`;
  rec.signDocs = l.docs.map((k) => src.docs[k].title);
  vault.clients[lk] = await encryptJSON(rec, l.client.email.trim().toLowerCase());
}
fs.writeFileSync(vaultPath, JSON.stringify(vault));
console.log(`sign-vault.json: ${src.links.length} link · vault.json diperbarui`);
