# Tanda tangan elektronik & e-Meterai

Halaman `ttd.html#<token>` adalah link tanda tangan khusus untuk setiap penandatangan (klien dan Arthera).
Isi surat disimpan terenkripsi di `sign-vault.json`, dan hanya bisa dibuka dengan token di link tersebut.

`Code.gs` adalah web app Google Apps Script yang menerima tanda tangan dan PDF bermeterai dari halaman itu,
lalu menyimpannya ke folder Drive klien.

## Hasil di Drive (folder E. Tanda Tangan)

- `Tanda Tangan Elektronik/TTE <surat> - Klien.png` dan `- Arthera.png`: gambar tanda tangan, dengan nama dan waktu di keterangan berkas
- `<surat> (TTE + e-Meterai).pdf`: PDF yang sudah ditandatangani dan dibubuhi e-Meterai oleh klien
- `status-tte.json`: catatan siapa sudah menandatangani apa dan kapan

Versi lama tidak dihapus: dipindah ke subfolder `_Arsip` dengan cap waktu.

## Cara pasang

1. Masuk ke https://script.google.com dengan akun pemilik folder Drive klien (`artheralawfirm@gmail.com`).
2. Buat proyek baru, lalu tempel isi `Code.gs`.
3. Klik **Deploy → New deployment → Web app**. Pilih *Execute as: Me* dan *Who has access: Anyone*.
4. Setujui izin Drive, lalu salin URL yang berakhiran `/exec`.
5. Isi URL itu ke `ARTHERA_ENDPOINT` di `js/config.js`, lalu commit. Situs ter-deploy ulang otomatis.

Selama `ARTHERA_ENDPOINT` kosong, halaman tanda tangan tetap bisa dibuka dan dibaca, tetapi tombol tanda tangan dan kirim e-Meterai menampilkan pemberitahuan bahwa penyimpanan belum aktif.

## Menambah klien atau surat

1. Siapkan berkas sumber (di luar repo, karena berisi data pribadi dan token rahasia), lalu jalankan:

   ```bash
   node scripts/build-sign-vault.mjs /path/ke/sign-source.json
   ```

   Perintah ini menulis ulang `sign-vault.json` dan menambahkan link tanda tangan ke data portal klien di `vault.json`.
2. Tambahkan folder klien di `CLIENTS`, nama surat di `DOCS`, dan hash token di `SIGN_LINKS` pada `Code.gs`, lalu buat deployment versi baru.

## Batasan

- Tanda tangan di sini adalah tanda tangan elektronik **tidak tersertifikasi** (gambar tanda tangan + catatan waktu). Untuk dokumen yang mensyaratkan tanda tangan elektronik tersertifikasi, gunakan penyelenggara sertifikasi elektronik resmi.
- e-Meterai dibeli dan dibubuhkan sendiri oleh klien di distributor resmi Peruri; situs ini hanya menerima PDF hasilnya.
- Panel Admin membuat ulang `vault.json` dari data admin. Kalau Admin menekan **Publikasikan**, link tanda tangan di portal klien hilang dan perlu dijalankan ulang `scripts/build-sign-vault.mjs`.
