// Daftar Tarif Layanan Merek ARTHERA, Edisi November 2026 (berlaku sejak 16 November 2026).
// Sumber: assets/docs/Daftar-Tarif-Layanan-Merek-ARTHERA-November-2026.pdf
import { icon } from './icons.js';

export const TARIF_PDF = 'assets/docs/Daftar-Tarif-Layanan-Merek-ARTHERA-November-2026.pdf';

const SCOPE = [
  ['Pembuatan NIB (bagi pemohon yang belum memiliki NIB)', 'Penerbitan NIB melalui OSS, sekaligus sebagai bukti status UMK.'],
  ['Penelusuran dan analisis merek', 'Penelusuran PDKI DJKI disertai laporan tertulis analisis risiko dan rekomendasi strategi.'],
  ['Penyusunan dan pengajuan permohonan', 'Penyusunan uraian barang atau jasa serta pengajuan permohonan secara daring.'],
  ['Perbaikan kelengkapan dokumen', 'Seluruh perbaikan yang diminta DJKI pada tahap pemeriksaan formalitas.'],
  ['Satu kali tanggapan atas usulan penolakan', 'Penyusunan argumentasi hukum dan pengajuan tanggapan apabila pemeriksa mengusulkan penolakan.'],
  ['Pengawalan hingga sertifikat terbit', 'Pemantauan setiap tahap, laporan berkala, dan penyerahan sertifikat elektronik.']
];

const EXTRA = [
  ['Tanggapan atas usulan penolakan berikutnya', 'Rp2.000.000', 'per tanggapan'],
  ['Sanggahan atas keberatan pihak ketiga', 'Rp2.500.000', 'per keberatan'],
  ['Banding ke Komisi Banding Merek', 'Rp6.000.000', 'belum termasuk biaya banding DJKI'],
  ['Pengajuan ulang permohonan baru', 'Tarif paket', 'UMK Rp3.500.000 · Umum Rp5.000.000']
];

const STAGES = [
  ['Kelengkapan dokumen formalitas', '2 bulan sejak surat pemberitahuan', 'Termasuk paket'],
  ['Keberatan pihak ketiga (masa pengumuman)', 'Sanggahan setelah salinan keberatan diterima', 'Rp2.500.000'],
  ['Usulan penolakan pertama', '30 hari kerja sejak surat dikirim', 'Termasuk paket'],
  ['Usulan penolakan berikutnya', '30 hari kerja sejak surat dikirim', 'Rp2.000.000'],
  ['Banding ke Komisi Banding Merek', '90 hari kerja sejak penolakan dikirim', 'Rp6.000.000 + biaya banding DJKI']
];

const TERMS = [
  'Tarif dihitung per kelas dan dikalikan jumlah kelas. Tarif paket dengan NIB hanya berlaku untuk kelas pertama, sedangkan kelas berikutnya dikenakan tarif Rp3.500.000.',
  'Tarif paket sudah mencakup pengajuan permohonan ke DJKI. Tarif banding belum termasuk biaya permohonan banding DJKI. Apabila pemohon ternyata tidak memenuhi syarat UMK, berlaku tarif pemohon umum.',
  'Pengerjaan dimulai setelah pembayaran penuh di muka terkonfirmasi.',
  'Layanan lanjutan hanya dikerjakan dan ditagihkan setelah klien memberikan persetujuan. Biaya pihak ketiga, seperti penerjemahan dan legalisasi dokumen, ditanggung klien.',
  'Klien menyerahkan dokumen dan konfirmasi paling lambat 7 hari kerja sebelum tenggat DJKI. Keterlambatan dari pihak klien berikut akibatnya, termasuk biaya pengajuan ulang, berada di luar tanggung jawab ARTHERA.',
  'Keputusan pendaftaran sepenuhnya merupakan kewenangan Pemeriksa Merek DJKI. ARTHERA menjamin proses yang tertib dan argumentasi terbaik, bukan hasil keputusan. Tarif yang telah dibayarkan tidak dapat dikembalikan.',
  'Daftar tarif ini berlaku sejak 16 November 2026 hingga ada pemberitahuan perubahan.'
];

export function tarifMerekHTML() {
  return `
  <section class="tarif" id="tarif" aria-labelledby="tarifTitle">
    <div class="tarif-head reveal">
      <div>
        <span class="eyebrow">Daftar Tarif Layanan Merek · Edisi November 2026</span>
        <h2 class="h3 mt-1" id="tarifTitle">Tarif tetap per kelas</h2>
        <p class="muted">Berlaku sejak <b>16 November 2026</b> · Satuan per kelas · Rupiah (IDR)</p>
      </div>
      <a class="btn btn-ghost" href="${TARIF_PDF}" target="_blank" rel="noopener" download>${icon('download')} Unduh PDF</a>
    </div>

    <div class="tarif-pack reveal">
      <div class="tarif-pack-intro">
        <span class="pill pill-gold">Paket Utama · Khusus Usaha Mikro dan Kecil</span>
        <h3 class="h4 mt-1">Paket Lengkap Pendaftaran Merek UMKM</h3>
        <p>Satu harga, dari penelusuran hingga sertifikat terbit. Tidak ada biaya tersembunyi: seluruh pengurusan sejak penelusuran merek sampai sertifikat elektronik terbit sudah tercakup dalam tarif paket, di luar layanan lanjutan.</p>
      </div>
      <div class="tarif-prices">
        <div class="card tarif-price">
          <span class="tp-k">Sudah memiliki NIB</span>
          <b>Rp3.500.000</b>
          <span class="tp-s">per kelas, termasuk pengajuan</span>
          <span class="tp-n">Berlaku untuk setiap kelas</span>
        </div>
        <div class="card tarif-price">
          <span class="tp-k">Belum memiliki NIB</span>
          <b>Rp4.000.000</b>
          <span class="tp-s">untuk satu kelas, termasuk pembuatan NIB dan pengajuan</span>
          <span class="tp-n">Kelas berikutnya Rp3.500.000 per kelas</span>
        </div>
        <div class="card tarif-price dark">
          <span class="tp-k">Usaha menengah & besar</span>
          <b>Rp5.000.000</b>
          <span class="tp-s">per kelas, sudah termasuk pengajuan</span>
          <span class="tp-n">Termasuk perseroan & badan hukum non-UMK</span>
        </div>
      </div>
      <p class="small muted mt-2">Tarif usaha menengah dan besar lebih tinggi karena biaya resmi DJKI untuk pemohon umum jauh lebih besar dibanding UMK. Cakupan paketnya sama.</p>
    </div>

    <div class="tarif-block reveal">
      <h3 class="tarif-h"><span>01</span> Cakupan paket</h3>
      <ol class="tarif-scope">${SCOPE.map(([t, d], i) => `<li><span class="n">1.${i + 1}</span><div><b>${t}</b><p>${d}</p></div></li>`).join('')}</ol>
    </div>

    <div class="tarif-block reveal">
      <h3 class="tarif-h"><span>02</span> Layanan lanjutan</h3>
      <p class="tarif-p">Layanan berikut hanya dikerjakan dan ditagihkan apabila dibutuhkan, setelah mendapat persetujuan klien.</p>
      <div class="tarif-table">${EXTRA.map(([t, fee, note]) => `<div class="tr"><span class="t">${t}</span><span class="f"><b>${fee}</b><small>${note}</small></span></div>`).join('')}</div>
      <p class="small muted mt-2">Seluruh tarif berlaku per kelas. Gugatan ke Pengadilan Niaga berada di luar daftar ini dan ditangani bersama advokat mitra dengan penawaran tersendiri.</p>
    </div>

    <div class="tarif-block reveal">
      <h3 class="tarif-h"><span>03</span> Alur dan tenggat waktu</h3>
      <div class="tarif-table three">
        <div class="tr th"><span>Tahap</span><span>Tenggat bagi pemohon</span><span>Tarif ARTHERA</span></div>
        ${STAGES.map(([t, d, f]) => `<div class="tr"><span class="t">${t}</span><span class="d">${d}</span><span class="f"><b>${f}</b></span></div>`).join('')}
      </div>
      <p class="small muted mt-2">Tenggat mengacu pada Undang-Undang Nomor 20 Tahun 2016 tentang Merek dan Indikasi Geografis.</p>
    </div>

    <div class="tarif-block reveal">
      <h3 class="tarif-h"><span>04</span> Ketentuan layanan</h3>
      <ol class="tarif-terms">${TERMS.map((t) => `<li>${t}</li>`).join('')}</ol>
    </div>
  </section>`;
}
