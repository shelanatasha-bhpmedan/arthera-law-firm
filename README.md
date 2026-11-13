# ARTHERA LAW FIRM — Situs

Situs statis (HTML, CSS, JavaScript tanpa build). Halaman utama `index.html`.

- `js/`: aplikasi (portal klien, panel admin, ruang baca draf)
- `vault.json`: data klien terenkripsi (per email klien) untuk portal
- `ttd.html` + `js/sign-page.js` + `sign-vault.json`: link tanda tangan elektronik & e-Meterai, lihat `apps-script/README.md`
- `apps-script/Code.gs`: penerima tanda tangan dan PDF bermeterai ke Google Drive
- `scripts/build-sign-vault.mjs`: pembuat link tanda tangan terenkripsi

Kode ini disalin dari situs yang sedang berjalan di https://artheralawfirm.netlify.app pada 13 November 2026.
