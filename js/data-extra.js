// Konten tambahan: kontak, company profile, daftar berkas per layanan
export const FIRM = {
  name: 'Arthera Law Firm',
  email: 'artheralawfirm@gmail.com',
  address: 'Equity Tower, Lantai 26 Unit H, Jl. Jenderal Sudirman Kav. 52-53 (SCBD), Jakarta Selatan 12190',
  addressShort: 'Equity Tower Lt. 26 Unit H · SCBD, Jakarta Selatan',
  contacts: [
    { name: 'Aris Bayu Anggono, S.H., M.H., CCD.', role: 'Managing Partner · Korporasi & Litigasi', phone: '+62 812 9507 6597', wa: '6281295076597' },
    { name: 'Lilis Suganda, S.H., M.H., CLA., C.Med.', role: 'Senior Partner · HKI & Legal Audit', phone: '0852-8614-4102', wa: '6285286144102' }
  ]
};

export const SERVICE_META = {
  merek: { icon: 'award', short: 'Merek & HKI', tag: 'Kekayaan Intelektual', blurb: 'Penelusuran PDKI, pendaftaran merek UMKM & korporasi, NIB OSS, hingga sertifikat DJKI.' },
  ldd: { icon: 'file-search-2', short: 'Legal Due Diligence', tag: 'Signature Service', blurb: 'Uji tuntas hukum 6 tahap untuk akuisisi, investasi, dan kepatuhan BUMN maupun swasta.' },
  retainer: { icon: 'shield-check', short: 'Legal Retainer', tag: 'Corporate Counsel', blurb: 'Pendampingan hukum tetap 3, 6, atau 12 bulan: konsultasi harian, kontrak, legal opinion.' },
  korporasi: { icon: 'landmark', short: 'Korporasi & OSS', tag: 'Corporate & Licensing', blurb: 'Kontrak komersial, RUPS, M&A, likuidasi, perizinan OSS/NIB, dan kepatuhan UU PDP.' },
  litigasi: { icon: 'scale', short: 'Litigasi & PKPU', tag: 'Dispute Resolution', blurb: 'Perdata & Niaga, Kepailitan/PKPU, PHI, TUN, arbitrase, mediasi, dan Pengadilan Pajak.' }
};

export const COMPRO_PAGES = [
  'Sampul Depan', 'Daftar Isi', 'Tentang Kami', 'Visi & Misi', 'Nilai Kami', 'Mengapa Arthera', 'Layanan Kami',
  'Bidang Praktik', 'Legal Due Diligence', 'Skema Kerja Sama', 'Cara Kami Bekerja', 'Partner Inti',
  'Partner & Associate', 'Pengalaman Klien', 'Hubungi Kami'
].map((title, i) => ({ no: String(i + 1).padStart(2, '0'), title, img: `assets/compro/${String(i + 1).padStart(2, '0')}.jpg` }));

export const FIRM_VALUES = [
  ['Integritas', 'Integrity', 'Temuan disampaikan apa adanya sesuai Kode Etik Advokat Indonesia.'],
  ['Independen', 'Independence', 'Pendapat hukum bebas dari pengaruh kepentingan pihak mana pun.'],
  ['Berbasis Bukti', 'Evidence-Based', 'Setiap kesimpulan dirujuk pada dokumen dan sumber resmi (PDKI, SABH, OSS, SIPP, BPN).'],
  ['Terukur', 'Measured', 'Setiap risiko diberi tingkat dan rekomendasi mitigasi yang jelas.'],
  ['Kerahasiaan', 'Confidentiality', 'Informasi klien dijaga ketat sejalan dengan UU Pelindungan Data Pribadi.']
];

export const WHY_ARTHERA = [
  ['Ditangani Partner', 'Setiap perkara diawasi langsung oleh Managing Partner atau Senior Partner.'],
  ['Berorientasi Keputusan', 'Temuan dikaitkan langsung dengan dampaknya bagi keputusan bisnis.'],
  ['Verifikasi Resmi', 'Dokumen diuji silang ke PDKI DJKI, SABH, OSS, SIPP, Putusan MA, dan BPN.'],
  ['Responsif', 'Satu narahubung khusus dengan eskalasi isu kritis maksimal 2 hari kerja.'],
  ['Ruang Lingkup Jelas', 'Ruang lingkup dan tahapan disepakati tertulis sejak awal.'],
  ['Bilingual ID & EN', 'Kontrak dan laporan tersedia dalam Bahasa Indonesia dan Inggris.']
];

export const PILLARS = [
  ['Pilar I · Non-Litigasi', 'Korporasi, HKI & Komersial', 'Legal Due Diligence & Legal Audit, Pendaftaran Merek & HKI, Legal Opinion, Kontrak Komersial, Aksi Korporasi & RUPS, M&A, Likuidasi Perseroan, Perizinan OSS/NIB, dan Legal Retainer.'],
  ['Pilar II · Litigasi & Sengketa', 'Pembelaan Pengadilan & Mediasi', 'Perdata & Niaga, Kepailitan & PKPU, Hubungan Industrial, Tata Usaha Negara, Pidana Korporasi, Arbitrase & Mediasi Bersertifikat, Somasi & Negosiasi, Pengadilan Pajak, serta Eksekusi Putusan.'],
  ['Skema Kerja Sama A, B & C', 'Fleksibel Sesuai Kebutuhan', 'Skema A: Legal Retainer Bulanan. Skema B: Penugasan Khusus (Merek/HKI, LDD, M&A, Likuidasi). Skema C: Penanganan Perkara Litigasi, Arbitrase & Mediasi.']
];

export const CLIENT_GROUPS = [
  ['BUMN & Grup Usaha Negara', ['PT Kereta Api Indonesia (Persero)', 'PT Kereta Commuter Indonesia', 'PT Pelabuhan Indonesia (Persero)', 'Grup PTPN (5 Entitas)']],
  ['Kesehatan & Perusahaan Terbuka', ['Siloam Hospitals Group', 'Rumah Sakit Sumber Waras', 'PT Samudera Indonesia Tbk', 'PT Tata Mandiri Daerah Karawaci Tbk']],
  ['Otomotif & Logistik', ['PT Chery Motor Indonesia', 'PT Chery Sales Indonesia', 'PT CJ Logistics Nusantara', 'PT Pelabuhan Samudera Palaran']],
  ['Swasta Nasional', ['PT Agungbeton Persada Utama', 'PT Gudang Ada Globalindo', 'PT Genecraft Labs · PT Dynatech Int.', 'PT Nusantara Agro Energi']]
];

const up = (id, section, sectionTitle, no, label, hint, extra = {}) => ({ id, section, sectionTitle, no, label, type: 'upload', hint, ...extra });
const tx = (id, section, sectionTitle, no, label, placeholder, type = 'text') => ({ id, section, sectionTitle, no, label, type, placeholder });

export const UPLOAD_PRESETS = {
  ldd: [
    up('ldd_1', 'A', 'Bagian A: Korporasi', '1', 'Akta pendirian & seluruh akta perubahan anggaran dasar', 'PDF pindaian akta beserta SK pengesahan / persetujuan Menteri.'),
    up('ldd_2', 'A', 'Bagian A: Korporasi', '2', 'Profil perusahaan terkini dari AHU (SABH)', 'Unduhan profil perseroan terbaru.'),
    tx('ldd_3', 'A', 'Bagian A: Korporasi', '3', 'Susunan Direksi, Dewan Komisaris & pemegang saham saat ini', 'Tuliskan nama, jabatan, dan persentase kepemilikan...', 'textarea'),
    up('ldd_4', 'B', 'Bagian B: Perizinan', '4', 'NIB, izin usaha & izin sektoral', 'NIB berbasis risiko, sertifikat standar, dan izin sektoral terkait.'),
    up('ldd_5', 'B', 'Bagian B: Perizinan', '5', 'Dokumen lingkungan (AMDAL / UKL-UPL / SPPL)', 'Opsional sesuai kegiatan usaha.'),
    up('ldd_6', 'C', 'Bagian C: Aset', '6', 'Sertifikat tanah & daftar aset tetap', 'SHM/HGB/HGU beserta daftar nominatif aset.'),
    up('ldd_7', 'C', 'Bagian C: Aset', '7', 'PBG/IMB & SPPT PBB tiga tahun terakhir', 'Dokumen bangunan dan bukti PBB.'),
    up('ldd_8', 'D', 'Bagian D: Kontrak & Ketenagakerjaan', '8', 'Daftar & salinan kontrak material', 'Perjanjian dengan nilai atau dampak signifikan.'),
    up('ldd_9', 'D', 'Bagian D: Kontrak & Ketenagakerjaan', '9', 'PP/PKB, daftar karyawan & bukti BPJS', 'Dokumen ketenagakerjaan terkini.'),
    up('ldd_10', 'E', 'Bagian E: Perkara & Keuangan', '10', 'Laporan keuangan audit tiga tahun terakhir', 'PDF laporan keuangan yang telah diaudit.'),
    tx('ldd_11', 'E', 'Bagian E: Perkara & Keuangan', '11', 'Daftar perkara berjalan / potensi sengketa', 'Sebutkan nomor perkara, forum, dan status...', 'textarea')
  ],
  retainer: [
    up('ret_1', 'A', 'Bagian A: Identitas Perusahaan', '1', 'Akta pendirian & akta perubahan terakhir beserta SK', 'Dasar kewenangan penandatangan perjanjian.'),
    up('ret_2', 'A', 'Bagian A: Identitas Perusahaan', '2', 'NIB & NPWP perusahaan', 'Pindaian NIB dan kartu NPWP badan.'),
    up('ret_3', 'B', 'Bagian B: Pejabat & Narahubung', '3', 'KTP Direksi penandatangan', 'Identitas pejabat yang berwenang.'),
    tx('ret_4', 'B', 'Bagian B: Pejabat & Narahubung', '4', 'Narahubung internal (nama, jabatan, email, WhatsApp)', 'Contoh: Rina, Legal Officer, rina@perusahaan.co.id, 08xx...'),
    tx('ret_5', 'C', 'Bagian C: Prioritas', '5', 'Daftar kontrak berjalan & isu hukum prioritas', 'Uraikan kontrak atau isu yang perlu segera ditangani...', 'textarea'),
    up('ret_6', 'C', 'Bagian C: Prioritas', '6', 'Draf kontrak yang perlu direview (opsional)', 'Unggah draf kontrak pertama yang akan direview.'),
    up('ret_7', 'D', 'Bagian D: Pembayaran', '7', 'Bukti transfer biaya retainer', 'Cantumkan nomor Offering Letter pada berita transfer.')
  ],
  korporasi: [
    up('cor_1', 'A', 'Bagian A: Identitas', '1', 'KTP pemohon / akta & SK perusahaan', 'Identitas perorangan atau dokumen badan usaha.'),
    up('cor_2', 'A', 'Bagian A: Identitas', '2', 'NIB & KBLI yang terdaftar di OSS', 'Unduhan NIB beserta lampiran KBLI.'),
    up('cor_3', 'B', 'Bagian B: Dokumen Transaksi', '3', 'Draf kontrak / term sheet / dokumen RUPS', 'Dokumen yang menjadi dasar penugasan.'),
    tx('cor_4', 'B', 'Bagian B: Dokumen Transaksi', '4', 'Pihak-pihak terkait & target waktu penyelesaian', 'Sebutkan mitra transaksi dan tenggat yang diharapkan...', 'textarea'),
    up('cor_5', 'C', 'Bagian C: Pembayaran', '5', 'Bukti transfer biaya jasa', 'Sesuai invoice / offering letter resmi.')
  ],
  litigasi: [
    up('lit_1', 'A', 'Bagian A: Identitas & Kuasa', '1', 'KTP klien / akta & SK perusahaan', 'Identitas pemberi kuasa.'),
    up('lit_2', 'A', 'Bagian A: Identitas & Kuasa', '2', 'Surat kuasa khusus yang telah ditandatangani', 'Draf surat kuasa disiapkan Arthera.'),
    up('lit_3', 'B', 'Bagian B: Alat Bukti', '3', 'Kontrak, korespondensi & bukti pendukung', 'Unggah bukti tertulis utama.'),
    up('lit_4', 'B', 'Bagian B: Alat Bukti', '4', 'Somasi / gugatan / panggilan sidang yang diterima', 'Apabila ada.'),
    tx('lit_5', 'C', 'Bagian C: Kronologi', '5', 'Kronologi singkat perkara', 'Uraikan kronologi secara berurutan...', 'textarea'),
    tx('lit_6', 'C', 'Bagian C: Kronologi', '6', 'Tenggat terdekat (tanggal sidang / batas somasi)', 'Contoh: Sidang pertama 20 November 2026'),
    up('lit_7', 'D', 'Bagian D: Pembayaran', '7', 'Bukti transfer biaya jasa', 'Sesuai offering letter resmi.')
  ]
};
