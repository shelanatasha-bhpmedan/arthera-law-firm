// Konten inti Arthera Law Firm (diambil dari versi sebelumnya)
export const SERVICES = {
  merek: {
    key: 'merek',
    roman: 'LAYANAN I',
    category: 'Arthera Intellectual Property Services',
    title: 'Konsultan Merek & Kekayaan Intelektual (HKI)',
    subtitle: 'Pendampingan Pendaftaran Merek UMKM & Korporasi, Penelusuran PDKI, Pembuatan NIB OSS & Sertifikasi DJKI',
    flowIntro: 'Berdasarkan Undang-Undang Nomor 20 Tahun 2016 tentang Merek dan Indikasi Geografis sebagaimana telah diubah dengan Undang-Undang Nomor 6 Tahun 2023 (UU Merek), hak atas merek diperoleh melalui pendaftaran dengan asas pendaftar pertama (first to file). Berikut adalah 5 tahapan pendampingan resmi di Arthera:',
    flowSteps: [
      { no: '01', title: 'Konsultasi & Penelusuran Merek (PDKI)', time: 'Tahap Awal', desc: 'Pemeriksaan ketersediaan dan kemiripan fonetik maupun visual merek pada Pangkalan Data Kekayaan Intelektual (PDKI) DJKI, disertai laporan analisis risiko dan rekomendasi strategi.' },
      { no: '02', title: 'Penerbitan Invoice & Draf PKS', time: 'Administrasi', desc: 'Penyampaian Laporan Penelusuran, Invoice resmi sesuai Daftar Tarif Layanan Merek Arthera, serta aktivasi email Anda oleh Admin sebagai kunci akses Portal Klien dan draf perjanjian.' },
      { no: '03', title: 'Upload Dokumen, NIB & Finalisasi Logo', time: 'H+7 Hari Kerja*', desc: 'Klien masuk ke Portal Klien cukup dengan email terdaftar untuk melengkapi berkas Bagian A-E. Tim kami memproses pembuatan NIB melalui OSS (bagi UMKM), penelusuran ulang, dan finalisasi etiket/logo.' },
      { no: '04', title: 'Pengajuan Permohonan ke DJKI', time: 'H+14 Hari Kerja*', desc: 'Penyusunan uraian barang/jasa, Draf Surat Pernyataan Kepemilikan Merek, dan Surat Kuasa, dilanjutkan pengajuan daring ke DJKI, pembayaran PNBP, serta penyerahan Bukti Pengajuan & Nomor Agenda.' },
      { no: '05', title: 'Pemeriksaan Formalitas s.d. Sertifikat', time: 'Sesuai UU Merek', desc: 'Perbaikan kelengkapan formalitas, penyusunan 1 (satu) kali tanggapan atas usulan penolakan pertama (termasuk dalam paket), serta pengawalan berkala hingga Sertifikat Merek Elektronik diterbitkan DJKI.' }
    ],
    flowFootnote: '* Dihitung sejak pembayaran terkonfirmasi dan seluruh dokumen persyaratan diterima lengkap oleh Arthera.',
    formTitle: 'Formulir Registrasi & Konsultasi Awal Pendaftaran Merek',
    formSubtitle: 'Isi data permohonan awal Anda di bawah ini. Data otomatis tercatat di sistem registrasi Arthera dan dikirimkan ke artheralawfirm@gmail.com. Setelah diverifikasi Admin, email Anda langsung menjadi kunci untuk membuka Draf PKS & Ruang Upload pada Langkah 3.',
    fields: [
      { id: 'tm_nama', label: 'Nama Lengkap Pemohon / Nama Perusahaan', type: 'text', placeholder: 'Masukkan nama lengkap sesuai KTP atau nama badan usaha...' },
      { id: 'tm_email', label: 'Alamat Email Aktif Pemohon', type: 'email', placeholder: 'nama@email.com' },
      { id: 'tm_wa', label: 'Nomor Telepon / WhatsApp Aktif', type: 'tel', placeholder: '08xx-xxxx-xxxx' },
      { id: 'tm_merek', label: 'Nama Merek yang Ingin Didaftarkan', type: 'text', placeholder: 'Ketik nama merek / brand yang diajukan...' },
      { id: 'tm_skala', label: 'Kategori Pemohon & Status NIB', type: 'select', options: [
        'Pelaku UMKM (Sekaligus Pembuatan NIB melalui OSS oleh Arthera)',
        'Pelaku UMKM (Sudah Memiliki NIB Aktif)',
        'Pemohon Perorangan / Umum Non-UMKM',
        'Badan Hukum (Perseroan Terbatas / CV / Koperasi)'
      ]},
      { id: 'tm_kelas', label: 'Pilihan Kelas Barang / Jasa (Klasifikasi Nice DJKI)', type: 'select', options: [
        'Kelas 3: Parfum, Wewangian, Kosmetik & Perawatan Tubuh',
        'Kelas 25: Pakaian, Alas Kaki & Produk Fashion',
        'Kelas 30 / Kelas 43: Produk Makanan, Minuman, Kopi & Jasa Kuliner',
        'Kelas 35: Jasa Perdagangan Ritel, Toko Daring & Manajemen Bisnis',
        'Kelas 41: Jasa Pendidikan, Kursus, Pelatihan & Akademi',
        'Kelas 5: Produk Farmasi, Suplemen & Kesehatan',
        'Kelas Lainnya: Mohon Rekomendasi Kelas dari Konsultan Arthera'
      ]},
      { id: 'tm_produk', label: 'Uraian Barang / Jasa & Saluran Pemasaran Saat Ini', type: 'textarea', placeholder: 'Jelaskan jenis produk/jasa yang menggunakan merek tersebut serta saluran pemasarannya (Instagram, Shopee, Tokopedia, atau toko fisik)...' }
    ]
  },
  ldd: {
    key: 'ldd',
    roman: 'LAYANAN II',
    category: 'Signature Service · Corporate & Transaction Advisory',
    title: 'Legal Due Diligence (LDD) & Legal Audit',
    subtitle: 'Pemeriksaan Uji Tuntas Hukum Menyeluruh untuk Akuisisi, Investasi, Kemitraan Strategis & Kepatuhan BUMN/Swasta',
    flowIntro: 'Legal Due Diligence (LDD) Arthera dirancang untuk menjawab satu pertanyaan utama bagi Direksi dan Investor: apakah transaksi atau aksi korporasi ini aman untuk dijalankan? Berikut adalah 6 tahapan pelaksanaan LDD kami:',
    flowSteps: [
      { no: '01', title: 'Kick-Off & Rencana Kerja', time: 'Tahap 1', desc: 'Penetapan tujuan transaksi, tanggal pisah batas pemeriksaan (cut-off date), serta penyerahan daftar permintaan dokumen (Document Request List).' },
      { no: '02', title: 'Penelaahan Dokumen Hukum', time: 'Tahap 2', desc: 'Pemeriksaan menyeluruh atas anggaran dasar korporasi, perizinan berusaha, sertifikat aset, kontrak material, kepatuhan ketenagakerjaan, dan riwayat perkara.' },
      { no: '03', title: 'Verifikasi Silang Instansi Resmi', time: 'Tahap 3', desc: 'Pengujian keabsahan dokumen secara langsung pada sistem SABH Kementerian Hukum, sistem OSS, SIPP Pengadilan, Direktori Putusan MA, dan Kantor Pertanahan (BPN).' },
      { no: '04', title: 'Wawancara Manajemen & Cek Lokasi', time: 'Tahap 4', desc: 'Klarifikasi langsung bersama jajaran manajemen perusahaan target serta peninjauan fisik lokasi aset apabila diperlukan.' },
      { no: '05', title: 'Analisis & Matriks Tingkat Risiko', time: 'Tahap 5', desc: 'Pemetaan setiap temuan ke dalam Risiko Tinggi (wajib diselesaikan sebelum transaksi), Risiko Sedang (dilindungi klausul jaminan/ganti rugi), dan Risiko Rendah (perbaikan rutin).' },
      { no: '06', title: 'Laporan Akhir & Pemaparan Eksekutif', time: 'Tahap 6', desc: 'Penyerahan Laporan Legal Due Diligence komprehensif beserta matriks rekomendasi mitigasi dan presentasi di hadapan Direksi/Komisaris.' }
    ],
    flowFootnote: 'Seluruh pemeriksaan dipimpin langsung oleh Senior Partner bersertifikasi Certified Legal Auditor (CLA).',
    formTitle: 'Formulir Registrasi Layanan Legal Due Diligence & Legal Audit',
    formSubtitle: 'Lengkapi parameter awal pemeriksaan hukum di bawah ini untuk dikirimkan ke artheralawfirm@gmail.com guna penyusunan Proposal Teknis & Draf Perjanjian LDD.',
    fields: [
      { id: 'ldd_perusahaan', label: 'Nama Perusahaan / Institusi Pemohon', type: 'text', placeholder: 'Masukkan nama resmi PT / BUMN / Institusi...' },
      { id: 'ldd_pic', label: 'Nama Lengkap & Jabatan Pejabat Penanggung Jawab', type: 'text', placeholder: 'Contoh: Direktur Hukum / Corporate Secretary...' },
      { id: 'ldd_email', label: 'Alamat Email Korporasi', type: 'email', placeholder: 'legal@perusahaan.co.id' },
      { id: 'ldd_wa', label: 'Nomor Telepon / WhatsApp Narahubung', type: 'tel', placeholder: '08xx-xxxx-xxxx' },
      { id: 'ldd_tujuan', label: 'Tujuan Pelaksanaan Legal Due Diligence / Audit', type: 'select', options: [
        'Rencana Akuisisi Saham / Merger & Akuisisi (M&A)',
        'Penyertaan Modal Investasi / Pembentukan Joint Venture',
        'Audit Kepatuhan Hukum Tahunan (Legal Audit Internal BUMN/Swasta)',
        'Restrukturisasi Grup Usaha, Roll-Up, atau Divestasi Entitas',
        'Persiapan Likuidasi / Pembubaran Entitas Anak Perusahaan'
      ]},
      { id: 'ldd_cakupan', label: 'Jumlah Entitas Objek Pemeriksaan & Sektor Industri', type: 'text', placeholder: 'Sebutkan jumlah entitas yang akan diperiksa dan bidang usahanya...' },
      { id: 'ldd_catatan', label: 'Target Jadwal Pemeriksaan & Fokus Aspek Hukum', type: 'textarea', placeholder: 'Jelaskan target waktu penyelesaian (cut-off date) dan fokus aspek yang ingin diuji...' }
    ]
  },
  retainer: {
    key: 'retainer',
    roman: 'LAYANAN III',
    category: 'Skema A · Ongoing Corporate Counsel',
    title: 'Legal Retainer Korporasi Bulanan',
    subtitle: 'Pendampingan Hukum Tetap bagi Perusahaan untuk Konsultasi Harian, Kontrak Bisnis & Kepatuhan Regulasi',
    flowIntro: 'Skema Legal Retainer Bulanan memberikan kepastian pendampingan hukum berkelanjutan bagi aktivitas operasional perusahaan Anda tanpa harus menghitung biaya per jam. Berikut adalah alur kerja sama Legal Retainer kami:',
    flowSteps: [
      { no: '01', title: 'Pemetaan Kebutuhan & Pemeriksaan Konflik', time: 'Langkah 1', desc: 'Identifikasi profil bisnis perusahaan, volume kontrak bulanan, serta pemeriksaan bebas benturan kepentingan (conflict of interest check).' },
      { no: '02', title: 'Penyampaian Draf Offering Letter Retainer', time: 'Langkah 2', desc: 'Pengiriman Draf Surat Penawaran (Nomor ALF/OL-LR) dalam dua bahasa (Indonesia & Inggris) yang merinci ruang lingkup, sistem kerja, dan jangka waktu (3, 6, atau 12 bulan).' },
      { no: '03', title: 'Penandatanganan Perjanjian Retainer', time: 'Langkah 3', desc: 'Penandatanganan Perjanjian Jasa Hukum Legal Retainer (Nomor ALF/PJH-LR) serta penunjukan satu Advokat Penanggung Jawab dan satu Narahubung Internal perusahaan.' },
      { no: '04', title: 'Pendampingan Hukum Harian Responsif', time: 'Langkah 4', desc: 'Pelaksanaan konsultasi lisan/tertulis (waktu tanggap maks. 1 hari kerja), review & drafting perjanjian standar (maks. 3 hari kerja), penyusunan Legal Opinion, serta pendampingan rapat dan somasi.' },
      { no: '05', title: 'Laporan Kegiatan Bulanan Terstruktur', time: 'Langkah 5', desc: 'Penyerahan laporan bulanan kepada Direksi yang merinci seluruh pekerjaan yang telah diselesaikan, status kontrak, dan rekomendasi pencegahan risiko.' }
    ],
    flowFootnote: 'Draf Offering Letter dan Perjanjian Retainer dapat diakses pada Langkah 3 cukup dengan email terdaftar setelah registrasi diverifikasi.',
    formTitle: 'Formulir Registrasi Penawaran Legal Retainer Bulanan',
    formSubtitle: 'Isi profil singkat perusahaan Anda untuk mendapatkan Draf Offering Letter Legal Retainer melalui email artheralawfirm@gmail.com.',
    fields: [
      { id: 'ret_perusahaan', label: 'Nama Resmi Perusahaan (Perseroan Terbatas)', type: 'text', placeholder: 'Masukkan nama lengkap PT sesuai Anggaran Dasar...' },
      { id: 'ret_pejabat', label: 'Nama Lengkap & Jabatan Pejabat Penandatangan (Direksi)', type: 'text', placeholder: 'Masukkan nama lengkap dan jabatan Direksi...' },
      { id: 'ret_email', label: 'Alamat Email Resmi Perusahaan / Narahubung', type: 'email', placeholder: 'corporate@perusahaan.com' },
      { id: 'ret_wa', label: 'Nomor Telepon / WhatsApp Narahubung Internal', type: 'tel', placeholder: '08xx-xxxx-xxxx' },
      { id: 'ret_alamat', label: 'Kedudukan Kota & Alamat Lengkap Perusahaan', type: 'text', placeholder: 'Masukkan alamat lengkap perusahaan, kota, provinsi, dan kode pos...' },
      { id: 'ret_akta', label: 'Dasar Kewenangan (Anggaran Dasar / Akta Terakhir)', type: 'text', placeholder: 'Masukkan rujukan Akta Pendirian / Akta Perubahan Terakhir...' },
      { id: 'ret_durasi', label: 'Jangka Waktu Legal Retainer (Pasal 2 / Bagian III)', type: 'select', options: [
        '12 (dua belas) / 12 (twelve) Bulan',
        '6 (enam) / 6 (six) Bulan',
        '3 (tiga) / 3 (three) Bulan'
      ]},
      { id: 'ret_skema_bayar', label: 'Skema Pembayaran Biaya Retainer (Pasal 3 ayat 2)', type: 'select', options: [
        'Di muka setiap bulan / Monthly in advance (maks. 7 hari kalender sejak invoice)',
        'Sekaligus saat penandatanganan / In full upon signing (maks. 7 hari kalender sejak invoice)'
      ]},
      { id: 'ret_catatan', label: 'Kegiatan Usaha / Proyek Tertentu & Ruang Lingkup Prioritas', type: 'textarea', placeholder: 'Jelaskan kegiatan usaha atau proyek tertentu perusahaan (konsultasi harian, review & drafting kontrak, legal opinion, pendampingan rapat/somasi, pemetaan risiko)...' }
    ]
  },
  korporasi: {
    key: 'korporasi',
    roman: 'LAYANAN IV',
    category: 'Corporate, Commercial, Licensing & Data Protection',
    title: 'Korporasi, Kontrak Komersial, M&A & Perizinan (OSS/NIB)',
    subtitle: 'Pendampingan Aksi Korporasi, RUPS, Perancangan Kontrak Strategis, Likuidasi Perseroan & Perizinan Berusaha',
    flowIntro: 'Setiap aksi korporasi dan transaksi komersial memerlukan landasan hukum yang sah serta perizinan yang lengkap agar dapat dieksekusi tanpa hambatan regulasi. Berikut adalah alur pendampingan kami:',
    flowSteps: [
      { no: '01', title: 'Analisis Struktur & Kepatuhan Regulasi', time: 'Tahap 1', desc: 'Telaah atas struktur anggaran dasar, KBLI pada sistem OSS, serta ketentuan hukum sektoral yang berlaku terhadap rencana transaksi atau perizinan Anda.' },
      { no: '02', title: 'Penyusunan Draf Kontrak / Dokumen Korporasi', time: 'Tahap 2', desc: 'Perancangan draf kontrak komersial, dokumen pemanggilan dan risalah RUPS, akta aksi korporasi, atau dokumen kepatuhan Pelindungan Data Pribadi (UU PDP).' },
      { no: '03', title: 'Pendampingan Negosiasi & Koordinasi Notaris/Instansi', time: 'Tahap 3', desc: 'Pendampingan perundingan klausul kontrak bersama mitra bisnis serta koordinasi pengesahan pada SABH Kementerian Hukum, sistem OSS, atau instansi terkait.' },
      { no: '04', title: 'Penyelesaian Perizinan & Serah Terima Berkas', time: 'Tahap 4', desc: 'Verifikasi akhir atas terbitnya perizinan berusaha (NIB/Izin Komersial), persetujuan perubahan anggaran dasar, atau penutupan transaksi (closing).' }
    ],
    flowFootnote: 'Seluruh draf kontrak dan dokumen korporasi hanya dapat diakses melalui Portal Klien dengan email terdaftar.',
    formTitle: 'Formulir Registrasi Layanan Korporasi, Kontrak & Perizinan',
    formSubtitle: 'Sampaikan rincian penugasan korporasi atau perizinan usaha yang Anda butuhkan untuk ditindaklanjuti oleh Tim Korporasi Arthera.',
    fields: [
      { id: 'corp_nama', label: 'Nama Perusahaan / Pelaku Usaha', type: 'text', placeholder: 'Masukkan nama perusahaan atau pemohon...' },
      { id: 'corp_pic', label: 'Nama & Jabatan Narahubung', type: 'text', placeholder: 'Masukkan nama lengkap dan jabatan...' },
      { id: 'corp_email', label: 'Alamat Email Aktif', type: 'email', placeholder: 'nama@perusahaan.com' },
      { id: 'corp_wa', label: 'Nomor Telepon / WhatsApp', type: 'tel', placeholder: '08xx-xxxx-xxxx' },
      { id: 'corp_jenis', label: 'Jenis Layanan Korporasi / Perizinan yang Dibutuhkan', type: 'select', options: [
        'Penyusunan & Negosiasi Kontrak Komersial (Kerja Sama, Distribusi, Vendor, Sewa)',
        'Pengurusan Perizinan Berusaha Berbasis Risiko (OSS / NIB) & Izin Sektoral',
        'Penyelenggaraan RUPS & Perubahan Anggaran Dasar Perseroan',
        'Pendampingan Merger, Akuisisi, Divestasi & Restrukturisasi',
        'Likuidasi & Pembubaran Perseroan Terbatas',
        'Penyusunan Kebijakan & Kepatuhan Pelindungan Data Pribadi (UU PDP)'
      ]},
      { id: 'corp_domisili', label: 'Domisili Perusahaan / Lokasi Operasional', type: 'text', placeholder: 'Contoh: Jakarta / Medan / Surabaya...' },
      { id: 'corp_catatan', label: 'Uraian Kebutuhan Transaksi atau Perizinan', type: 'textarea', placeholder: 'Jelaskan secara singkat latar belakang transaksi, kontrak, atau perizinan yang diperlukan...' }
    ]
  },
  litigasi: {
    key: 'litigasi',
    roman: 'LAYANAN V',
    category: 'Litigation, Dispute Resolution, Insolvency & Tax Court',
    title: 'Litigasi, Penyelesaian Sengketa, PKPU & Mediasi',
    subtitle: 'Pembelaan Kepentingan Klien di Pengadilan Negeri, Niaga, TUN, Hubungan Industrial, Arbitrase & Pengadilan Pajak',
    flowIntro: 'Kami membela kepentingan hukum klien secara gigih, terukur, dan beretika, mengutamakan penyelesaian yang paling efektif bagi kelangsungan bisnis Anda, baik melalui jalur perdamaian di luar pengadilan maupun litigasi penuh:',
    flowSteps: [
      { no: '01', title: 'Pemeriksaan Benturan Kepentingan & Bedah Perkara', time: 'Tahap 1', desc: 'Pemeriksaan bebas konflik kepentingan (conflict check) terhadap pihak lawan, dilanjutkan penelaahan alat bukti tertulis dan pemetaan kekuatan posisi hukum klien.' },
      { no: '02', title: 'Penyusunan Pendapat Hukum & Strategi Penyelesaian', time: 'Tahap 2', desc: 'Penyampaian opsi strategi hukum yang terukur: korespondensi somasi, negosiasi dan mediasi bersertifikat, atau pengajuan gugatan/permohonan di pengadilan.' },
      { no: '03', title: 'Upaya Non-Litigasi, Somasi & Mediasi Bersertifikat', time: 'Tahap 3', desc: 'Pendampingan perundingan perdamaian yang dipimpin oleh Certified Mediator (C.Med) terakreditasi Mahkamah Agung untuk mencapai kesepakatan perdamaian yang mengikat.' },
      { no: '04', title: 'Pembelaan Berjenjang di Pengadilan / Arbitrase / PKPU', time: 'Tahap 4', desc: 'Mewakili klien sebagai Kuasa Hukum pada Pengadilan Negeri, Pengadilan Niaga (Kepailitan/PKPU & HKI), PTUN, PHI, Pengadilan Pajak, hingga Mahkamah Agung.' },
      { no: '05', title: 'Eksekusi Putusan & Pemulihan Aset (Asset Recovery)', time: 'Tahap 5', desc: 'Pengawalan pelaksanaan putusan yang telah berkekuatan hukum tetap (inkracht) serta penertiban dan pemulihan aset strategis klien.' }
    ],
    flowFootnote: 'Seluruh informasi dan draf dokumen perkara dilindungi rahasia jabatan advokat sesuai Pasal 19 UU No. 18 Tahun 2003.',
    formTitle: 'Formulir Registrasi Konsultasi Perkara & Pemeriksaan Konflik',
    formSubtitle: 'Isi data awal di bawah ini secara rahasia. Pencantuman nama pihak lawan diperlukan semata-mata untuk memastikan tidak adanya benturan kepentingan (Conflict Check).',
    fields: [
      { id: 'lit_nama', label: 'Nama Klien (Perorangan / Badan Hukum)', type: 'text', placeholder: 'Masukkan nama lengkap atau nama perusahaan Anda...' },
      { id: 'lit_email', label: 'Alamat Email Rahasia Klien', type: 'email', placeholder: 'nama@email.com' },
      { id: 'lit_wa', label: 'Nomor Telepon / WhatsApp Klien', type: 'tel', placeholder: '08xx-xxxx-xxxx' },
      { id: 'lit_posisi', label: 'Kedudukan Klien dalam Permasalahan Hukum Ini', type: 'select', options: [
        'Pihak yang Ingin Mengajukan Somasi / Gugatan / Permohonan PKPU (Penggugat/Pemohon)',
        'Pihak yang Menerima Somasi / Gugatan / Panggilan Sidang (Tergugat/Termohon)',
        'Pihak yang Menginginkan Mediasi Bersertifikat / Perundingan Perdamaian',
        'Wajib Pajak dalam Sengketa Perpajakan / Pengadilan Pajak'
      ]},
      { id: 'lit_forum', label: 'Kategori Sengketa / Forum Penyelesaian', type: 'select', options: [
        'Perkara Perdata & Niaga (Wanprestasi / Perbuatan Melawan Hukum)',
        'Kepailitan & Penundaan Kewajiban Pembayaran Utang (PKPU)',
        'Eksekusi Putusan & Penertiban / Pemulihan Aset (Asset Recovery)',
        'Sengketa Tata Usaha Negara (PTUN)',
        'Perselisihan Hubungan Industrial (PHI / Ketenagakerjaan)',
        'Arbitrase & Mediasi Bersertifikat',
        'Sengketa Pajak & Kuasa Hukum Pengadilan Pajak'
      ]},
      { id: 'lit_lawan', label: 'Nama Pihak Lawan (Untuk Pemeriksaan Benturan Kepentingan)', type: 'text', placeholder: 'Sebutkan nama pihak lawan dalam sengketa ini...' },
      { id: 'lit_kronologi', label: 'Ringkasan Pokok Permasalahan & Tenggat Waktu Terdekat', type: 'textarea', placeholder: 'Uraikan secara singkat pokok permasalahan serta tanggal batas waktu somasi atau sidang terdekat (apabila ada)...' }
    ]
  }
};

export const MEREK_UPLOAD_ITEMS = [
  { id: 'doc_1', section: 'A', sectionTitle: 'Bagian A: Identitas Pemohon', no: '1', label: 'Foto KTP Pemohon (jelas, tidak terpotong)', type: 'upload', hint: 'Unggah file JPG/PNG/PDF KTP yang terbaca jelas.', fileName: '', fileSize: '', value: '', completed: false },
  { id: 'doc_2', section: 'A', sectionTitle: 'Bagian A: Identitas Pemohon', no: '2', label: 'Foto NPWP (kalau ada)', type: 'upload', hint: 'Unggah foto atau pindaian kartu NPWP pemohon.', fileName: '', fileSize: '', value: '', completed: false },
  { id: 'doc_3', section: 'A', sectionTitle: 'Bagian A: Identitas Pemohon', no: '3', label: '✏️ Alamat domisili (kalau beda dengan KTP)', type: 'text', placeholder: 'Ketik alamat domisili saat ini, atau tulis "Sama dengan KTP"...', value: '', completed: false },
  { id: 'doc_nib_file', section: 'B', sectionTitle: 'Bagian B: Data Usaha (Untuk Pembuatan NIB melalui OSS)', no: '•', label: 'File NIB (kalau sudah punya). Jika sudah upload, no. 4-8 tidak perlu diisi.', type: 'upload', hint: 'Unggah file PDF NIB apabila usaha Anda sudah memiliki NIB.', fileName: '', fileSize: '', value: '', completed: false },
  { id: 'doc_4', section: 'B', sectionTitle: 'Bagian B: Data Usaha (Untuk Pembuatan NIB melalui OSS)', no: '4', label: '✏️ Nama usaha', type: 'text', placeholder: 'Ketik nama usaha Anda...', value: '', completed: false },
  { id: 'doc_5', section: 'B', sectionTitle: 'Bagian B: Data Usaha (Untuk Pembuatan NIB melalui OSS)', no: '5', label: '✏️ Alamat tempat usaha (atau alamat rumah kalau usaha dari rumah)', type: 'text', placeholder: 'Ketik alamat lengkap tempat usaha dijalankan...', value: '', completed: false },
  { id: 'doc_6', section: 'B', sectionTitle: 'Bagian B: Data Usaha (Untuk Pembuatan NIB melalui OSS)', no: '6', label: '✏️ Perkiraan modal usaha', type: 'text', placeholder: 'Ketik perkiraan modal usaha untuk pendaftaran OSS...', value: '', completed: false },
  { id: 'doc_7', section: 'B', sectionTitle: 'Bagian B: Data Usaha (Untuk Pembuatan NIB melalui OSS)', no: '7', label: '✏️ Jumlah karyawan (laki-laki & perempuan), atau tulis "sendiri"', type: 'text', placeholder: 'Ketik jumlah karyawan laki-laki & perempuan, atau tulis "sendiri"...', value: '', completed: false },
  { id: 'doc_8', section: 'B', sectionTitle: 'Bagian B: Data Usaha (Untuk Pembuatan NIB melalui OSS)', no: '8', label: '✏️ Cara jualan: online, toko fisik, atau keduanya', type: 'text', placeholder: 'Ketik cara penjualan (online, toko fisik, atau keduanya)...', value: '', completed: false },
  { id: 'doc_9', section: 'C', sectionTitle: 'Bagian C: Spesifikasi & Etiket Merek', no: '9', label: 'Logo/etiket final, format JPG resolusi tinggi', type: 'upload', hint: 'Wajib format JPG resolusi tinggi sesuai ketentuan permohonan DJKI.', fileName: '', fileSize: '', value: '', completed: false },
  { id: 'doc_10', section: 'C', sectionTitle: 'Bagian C: Spesifikasi & Etiket Merek', no: '10', label: '✏️ Logo didaftarkan berwarna atau hitam putih? Jika berwarna, sebutkan warnanya', type: 'text', placeholder: 'Sebutkan apakah berwarna atau hitam putih beserta rincian warnanya...', value: '', completed: false },
  { id: 'doc_11', section: 'C', sectionTitle: 'Bagian C: Spesifikasi & Etiket Merek', no: '11', label: '✏️ Arti kata merek, atau keterangan jika itu nama rekaan', type: 'text', placeholder: 'Jelaskan arti kata merek atau sebutkan jika merupakan nama rekaan...', value: '', completed: false },
  { id: 'doc_12', section: 'C', sectionTitle: 'Bagian C: Spesifikasi & Etiket Merek', no: '12', label: 'Foto produk/kemasan yang sudah memakai merek tersebut', type: 'upload', hint: 'Unggah foto produk atau kemasan yang menampilkan merek Anda.', fileName: '', fileSize: '', value: '', completed: false },
  { id: 'doc_13', section: 'C', sectionTitle: 'Bagian C: Spesifikasi & Etiket Merek', no: '13', label: '✏️ Link toko online (Instagram, Shopee, Tokopedia)', type: 'text', placeholder: 'Masukkan tautan akun Instagram, Shopee, atau Tokopedia usaha Anda...', value: '', completed: false },
  { id: 'doc_14', section: 'D', sectionTitle: 'Bagian D: Daftar Produk Kelas 3', no: '14', label: '✏️ Daftar semua produk yang dijual/akan dijual dengan merek tersebut (contoh: eau de parfum, body mist, minyak wangi/bibit parfum, parfum mobil, pengharum ruangan, lotion wangi, sabun)', type: 'textarea', placeholder: 'Ketik daftar lengkap produk Kelas 3 yang dijual atau akan dijual...', value: '', completed: false },
  { id: 'doc_katalog', section: 'D', sectionTitle: 'Bagian D: Daftar Produk Kelas 3', no: '•', label: 'Katalog/daftar produk (opsional, kalau ada file-nya)', type: 'upload', hint: 'Opsional: Unggah file katalog produk apabila tersedia.', fileName: '', fileSize: '', value: '', completed: false },
  { id: 'doc_15', section: 'E', sectionTitle: 'Bagian E: Tanda Tangan & Bukti Pembayaran', no: '15', label: 'Surat pernyataan kepemilikan merek & surat kuasa yang sudah ditandatangani (Draf disiapkan oleh Arthera setelah data A-D lengkap)', type: 'upload', hint: 'Unggah pindaian Surat Pernyataan Kepemilikan Merek & Surat Kuasa yang telah ditandatangani.', fileName: '', fileSize: '', value: '', completed: false },
  { id: 'doc_bukti_bayar', section: 'E', sectionTitle: 'Bagian E: Tanda Tangan & Bukti Pembayaran', no: '16', label: 'Bukti transfer pembayaran ke rekening BCA 5265 0620 48 a.n. Lilis Suganda dengan mencantumkan nomor Invoice pada berita transfer', type: 'upload', hint: 'Unggah bukti transfer pembayaran sesuai Invoice resmi Anda.', fileName: '', fileSize: '', value: '', completed: false }
];

export const PRACTICE_AREAS = [
  { no: '01', id: 'Legal Due Diligence & Legal Audit', en: 'Signature Service · Uji Tuntas Hukum' },
  { no: '02', id: 'Litigasi & Penyelesaian Sengketa', en: 'Litigation & Dispute Resolution' },
  { no: '03', id: 'Arbitrase & Mediasi Bersertifikat', en: 'Arbitration & Certified Mediation' },
  { no: '04', id: 'Korporasi Umum & Tata Kelola', en: 'General Corporate & Governance' },
  { no: '05', id: 'Merger, Akuisisi & Restrukturisasi', en: 'M&A and Restructuring' },
  { no: '06', id: 'Perbankan & Jasa Keuangan', en: 'Banking & Financial Services' },
  { no: '07', id: 'Likuidasi & Pembubaran Perseroan', en: 'Liquidation & Dissolution' },
  { no: '08', id: 'Kontrak & Transaksi Komersial', en: 'Contracts & Commercial Transactions' },
  { no: '09', id: 'Ketenagakerjaan & Hubungan Industrial', en: 'Employment & Industrial Relations' },
  { no: '10', id: 'Kepailitan & PKPU', en: 'Insolvency & Debt Restructuring' },
  { no: '11', id: 'Pertanahan & Properti (BPN)', en: 'Land & Property Law' },
  { no: '12', id: 'Perizinan Berusaha (OSS/NIB) & Lingkungan', en: 'Business Licensing & Environment' },
  { no: '13', id: 'Perkebunan & Agribisnis', en: 'Plantations & Agribusiness' },
  { no: '14', id: 'Pertambangan & Energi', en: 'Mining & Energy' },
  { no: '15', id: 'Infrastruktur & Pengadaan Publik', en: 'Infrastructure & Public Procurement' },
  { no: '16', id: 'Kekayaan Intelektual (Merek, Paten, Hak Cipta)', en: 'Intellectual Property Services (DJKI)' },
  { no: '17', id: 'Pelindungan Data Pribadi (UU PDP)', en: 'Personal Data Protection Compliance' },
  { no: '18', id: 'Perpajakan & Sengketa Pajak', en: 'Tax & Tax Court Disputes' }
];

export const TEAM = {
  aris: {
    id: 'aris',
    portrait: 'assets/team/aris.jpg',
    name: 'ARIS BAYU ANGGONO',
    degrees: 'S.H., M.H., CCD.',
    role_id: 'MANAGING PARTNER · ADVOKAT · KURATOR & PENGURUS · CONTRACT DRAFTER',
    role_en: 'MANAGING PARTNER · ADVOCATE · CURATOR & ADMINISTRATOR · CONTRACT DRAFTER',
    location_id: 'Jakarta Utara',
    location_en: 'North Jakarta',
    phone: '+62 812 9507 6597',
    email1: 'arisanggono@gmail.com',
    email2: 'artheralawfirm@gmail.com',
    profile_id: 'Managing Partner Arthera Law Firm. Advokat PERADI serta Kurator dan Pengurus AKPI dengan rekam jejak praktik hukum sejak 2016. Berpengalaman menangani perkara strategis bagi Badan Usaha Milik Negara dan korporasi swasta, mulai dari gugatan perdata di seluruh tingkat peradilan, sengketa tata usaha negara, hingga eksekusi dan penertiban aset. Memadukan kecakapan litigasi dengan keahlian non-litigasi: opini hukum, audit hukum, serta penyusunan dan negosiasi perjanjian.',
    profile_en: 'Managing Partner of Arthera Law Firm. PERADI Advocate and AKPI-certified Curator and Administrator with a legal practice track record since 2016. Experienced in strategic matters for State-Owned Enterprises and private corporations, from civil litigation at every level of the courts and state administrative disputes to asset execution and recovery. Combines litigation skills with non-litigation expertise in legal opinions, legal audits, and contract drafting and negotiation.',
    edu_id: [
      ['Magister Hukum (M.H.)', 'Universitas Indonesia, 2024 · Hukum Ekonomi · IPK 3,84'],
      ['Sarjana Hukum (S.H.)', 'Universitas Bhayangkara Jakarta Raya, 2016 · IPK 3,63']
    ],
    edu_en: [
      ['Master of Laws (M.H.)', 'Universitas Indonesia, 2024 · Economic Law · GPA 3.84'],
      ['Bachelor of Laws (S.H.)', 'Universitas Bhayangkara Jakarta Raya, 2016 · GPA 3.63']
    ],
    certs_id: [
      ['Advokat PERADI', 'Perhimpunan Advokat Indonesia, berlisensi sejak 2019'],
      ['Kurator dan Pengurus', 'AKPI, 2026; terdaftar di Kementerian Hukum RI'],
      ['Certified Contract Drafter (CCD)', 'Justitia Training Center, 2025']
    ],
    certs_en: [
      ['PERADI Advocate', 'Indonesian Advocates Association, licensed since 2019'],
      ['Curator and Administrator', 'AKPI, 2026; registered with the Ministry of Law'],
      ['Certified Contract Drafter (CCD)', 'Justitia Training Center, 2025']
    ],
    exp_id: [
      { firm: 'ARTHERA LAW FIRM', period: 'SEKARANG', title: 'Managing Partner · Jakarta', bullets: ['Memimpin arah pekerjaan, kendali mutu, dan hubungan dengan klien.', 'Memimpin penugasan legal due diligence atas sejumlah entitas usaha dalam rangka likuidasi, restrukturisasi, dan divestasi.'] },
      { firm: 'PRESTISE LAW FIRM', period: '2020 S.D. 2026', title: 'Advokat dan Legal Counsel · Jakarta', bullets: ['Mewakili klien BUMN dalam sengketa perdata strategis di seluruh jenjang peradilan, dari tingkat pertama hingga Peninjauan Kembali.', 'Menangani litigasi Tata Usaha Negara serta asset recovery: eksekusi dan penertiban aset strategis milik BUMN.', 'Menyusun legal opinion, legal audit, dan kontrak komersial, serta memimpin negosiasi antarpihak.'] },
      { firm: 'NERACA LAW FIRM DAN KANTOR HUKUM PRIORITAS', period: '2016 S.D. 2020', title: 'Advokat dan Legal Counsel · Jakarta', bullets: ['Praktik litigasi dan non-litigasi, legal review dokumen, serta penasihat hukum bagi klien korporasi dan perorangan.'] }
    ],
    exp_en: [
      { firm: 'ARTHERA LAW FIRM', period: 'PRESENT', title: 'Managing Partner · Jakarta', bullets: ["Leads the firm's work, quality control, and client relationships.", 'Leads legal due diligence engagements on multiple business entities for liquidation, restructuring, and divestment.'] },
      { firm: 'PRESTISE LAW FIRM', period: '2020 TO 2026', title: 'Advocate and Legal Counsel · Jakarta', bullets: ['Represented SOE clients in strategic civil disputes at every level of the courts, through to Case Review (PK) at the Supreme Court.', 'Handled administrative litigation and asset recovery, including the execution and reclamation of strategic SOE assets.', 'Prepared legal opinions, legal audits, and commercial contracts, and led negotiations between parties.'] },
      { firm: 'NERACA LAW FIRM AND PRIORITAS LAW OFFICE', period: '2016 TO 2020', title: 'Advocate and Legal Counsel · Jakarta', bullets: ['Litigation and non-litigation practice, legal document review, and counsel to corporate and individual clients.'] }
    ],
    competencies: ['COMMERCIAL LITIGATION', 'ADMINISTRATIVE LITIGATION', 'ASSET RECOVERY & ENFORCEMENT', 'INSOLVENCY & RESTRUCTURING', 'CONTRACT DRAFTING & NEGOTIATION', 'LEGAL OPINION & LEGAL AUDIT', 'LEGAL DUE DILIGENCE', 'DISPUTE RESOLUTION']
  },
  lilis: {
    id: 'lilis',
    portrait: 'assets/team/lilis.jpg',
    name: 'LILIS SUGANDA',
    degrees: 'S.H., M.H., CLA., C.Med.',
    role_id: 'SENIOR PARTNER · ADVOKAT · LEGAL AUDITOR · MEDIATOR',
    role_en: 'SENIOR PARTNER · ADVOCATE · LEGAL AUDITOR · MEDIATOR',
    location_id: 'Jakarta, Indonesia',
    location_en: 'Jakarta, Indonesia',
    phone: '+62 852 8614 4102',
    email1: 'artheralawfirm@gmail.com',
    email2: '',
    profile_id: 'Senior Partner Arthera Law Firm. Advokat PERADI, Legal Auditor, dan Mediator bersertifikat yang memadukan ketelitian audit hukum dengan kecakapan negosiasi dan penyelesaian sengketa. Memegang sertifikasi Certified Legal Auditor (CLA) sejak 2020 dan berpraktik sebagai Certified Mediator (C.Med) sejak 2023, dengan fokus pada pengujian keabsahan dan kepatuhan dokumen korporasi serta perolehan persetujuan para pihak dalam transaksi.',
    profile_en: 'Senior Partner of Arthera Law Firm. PERADI Advocate, Certified Legal Auditor, and Certified Mediator who combines the rigour of legal audit with negotiation and dispute resolution skills. Holds the Certified Legal Auditor (CLA) designation since 2020 and has practised as a Certified Mediator (C.Med) since 2023, focusing on testing the validity and compliance of corporate documents and on securing the consents of parties to a transaction.',
    edu_id: [
      ['Magister Hukum (M.H.)', 'Universitas Trisakti, 2025'],
      ['Sarjana Hukum (S.H.)', 'Universitas Muhammadiyah Sumatera Utara, 2017']
    ],
    edu_en: [
      ['Master of Laws (M.H.)', 'Universitas Trisakti, 2025'],
      ['Bachelor of Laws (S.H.)', 'Universitas Muhammadiyah Sumatera Utara, 2017']
    ],
    certs_id: [
      ['Advokat PERADI', 'NIA 21.03876 · DPC Jakarta Pusat · disumpah di Pengadilan Tinggi DKI Jakarta, 2022'],
      ['Certified Legal Auditor (CLA)', 'ASAHI dan Jimly School of Law and Government, 2020'],
      ['Certified Mediator (C.Med)', 'FHP Mediasi Indonesia, terakreditasi Mahkamah Agung, 2023']
    ],
    certs_en: [
      ['PERADI Advocate', 'NIA 21.03876 · Central Jakarta Chapter · sworn in at the Jakarta High Court, 2022'],
      ['Certified Legal Auditor (CLA)', 'ASAHI and Jimly School of Law and Government, 2020'],
      ['Certified Mediator (C.Med)', 'FHP Mediasi Indonesia, accredited by the Supreme Court, 2023']
    ],
    exp_id: [
      { firm: 'ARTHERA LAW FIRM', period: 'SEKARANG', title: 'Senior Partner · Jakarta', bullets: ['Menangani legal audit dan legal due diligence atas entitas usaha dalam rangka likuidasi, restrukturisasi, dan divestasi.', 'Penyusunan dan review kontrak, mediasi, pendaftaran kekayaan intelektual, serta pendampingan kepatuhan korporasi.'] }
    ],
    exp_en: [
      { firm: 'ARTHERA LAW FIRM', period: 'PRESENT', title: 'Senior Partner · Jakarta', bullets: ['Handles legal audits and legal due diligence on business entities for liquidation, restructuring, and divestment.', 'Contract drafting and review, mediation, intellectual property registration, and corporate compliance support.'] }
    ],
    attachments: [
      '01 · Ijazah Sarjana Hukum, Universitas Muhammadiyah Sumatera Utara (2017)',
      '02 · Berita Acara Sumpah Advokat, Pengadilan Tinggi DKI Jakarta (Nomor: W10-U/240/HK.00/ADV/3/2022)',
      '03 · Kartu Tanda Pengenal Advokat (KTPA) PERADI (NIA: 21.03876)',
      '04 · Sertifikat Pendidikan Auditor Hukum (CLA), ASAHI & Jimly School of Law and Government (2020)',
      '05 · Sertifikat Mediator Terakreditasi Mahkamah Agung RI, FHP Mediasi Indonesia (2023)',
      '06 · Kurikulum 40 Jam Pelatihan Sertifikasi Mediator berdasarkan SK KMA No. 108/KMA/SK/VI/2016'
    ],
    competencies: ['LEGAL AUDIT', 'LEGAL DUE DILIGENCE', 'MEDIASI & RESOLUSI SENGKETA', 'REGULATORY COMPLIANCE', 'TRANSACTION CONSENTS', 'KEPATUHAN KORPORASI']
  },
  meizaroh: {
    id: 'meizaroh',
    portrait: 'assets/team/meizaroh.jpg',
    name: 'MEIZAROH',
    degrees: 'S.E., Ak., S.H., M.Sc., M.H., CA, CPA, ASEAN CPA, BKP',
    role_id: 'PARTNER · PAJAK & KEUANGAN · AKUNTAN PUBLIK · KUASA HUKUM PENGADILAN PAJAK',
    role_en: 'PARTNER · TAX & FINANCE · PUBLIC ACCOUNTANT · TAX COURT ATTORNEY',
    location_id: 'Jakarta, Indonesia',
    location_en: 'Jakarta, Indonesia',
    phone: '+62 811 867 1990',
    email1: 'meizaroh.mei@gmail.com',
    email2: 'artheralawfirm@gmail.com',
    profile_id: 'Akuntan dan konsultan keuangan dan pajak dengan pengalaman lebih dari 14 tahun di PwC, CGLytics (Amsterdam), dan Chatura Advisory Group, unit keuangan dan pajak DeHeng ARKO Law Offices. Memegang kualifikasi CA, CPA, dan ASEAN CPA serta izin kuasa hukum Pengadilan Pajak, dengan latar belakang pendidikan ganda di bidang akuntansi dan hukum. Berfokus pada perpajakan, restrukturisasi keuangan, valuasi, dan uji tuntas transaksi lintas negara.',
    profile_en: 'Accountant and finance and tax consultant with more than 14 years of experience at PwC, CGLytics (Amsterdam), and Chatura Advisory Group, the finance and tax arm of DeHeng ARKO Law Offices. Holds the CA, CPA, and ASEAN CPA qualifications and a Tax Court attorney licence, with a dual background in accounting and law. Focuses on taxation, financial restructuring, valuation, and due diligence on cross-border transactions.',
    edu_id: [
      ['Magister Hukum (LLM)', 'Universitas Pelita Harapan, 2026'],
      ['M.Sc. Business Administration', 'Vrije Universiteit Amsterdam, 2016'],
      ['Sarjana Hukum (LLB)', 'Universitas Terbuka, 2025'],
      ['Pendidikan Profesi Akuntansi (PPAk)', 'Universitas Trisakti, 2013'],
      ['Sarjana Ekonomi, Akuntansi', 'Universitas Bakrie, 2011']
    ],
    edu_en: [
      ['Master of Laws (LLM)', 'Universitas Pelita Harapan, 2026'],
      ['M.Sc. Business Administration', 'Vrije Universiteit Amsterdam, 2016'],
      ['Bachelor of Laws (LLB)', 'Universitas Terbuka, 2025'],
      ['Professional Accountancy Program (PPAk)', 'Universitas Trisakti, 2013'],
      ['Bachelor of Economics, Accounting', 'Universitas Bakrie, 2011']
    ],
    certs_id: [
      ['Izin Kuasa Hukum Pengadilan Pajak', 'Direktorat Jenderal Pajak'],
      ['Ujian Profesi Advokat', 'PERADI'],
      ['ASEAN CPA · CPA (IAPI) · CA (IAI)', 'Akuntan Publik & Chartered Accountant Bersertifikat'],
      ['Perpajakan Internasional Level 1 & Brevet A, B, C', 'Tax Academy Singapore · Valuasi Bisnis ACCA · CFA Level 1']
    ],
    certs_en: [
      ['Tax Court Attorney Licence', 'Directorate General of Taxes'],
      ['Advocate Professional Examination', 'PERADI'],
      ['ASEAN CPA · CPA (IAPI) · CA (IAI)', 'Certified Public & Chartered Accountant'],
      ['International Taxation Level 1 & Tax Brevet A, B, C', 'Tax Academy Singapore · ACCA Business Valuation · CFA Level 1']
    ],
    exp_id: [
      { firm: 'ARTHERA LAW FIRM', period: 'SEKARANG', title: 'Partner, Pajak & Keuangan · Jakarta', bullets: ['Memimpin layanan pajak, sengketa pajak, dan aspek keuangan korporasi.'] },
      { firm: 'CHATURA ADVISORY GROUP (DEHENG ARKO LAW OFFICES)', period: 'NOV 2018 S.D. DES 2022', title: 'Direktur Keuangan & Pajak · Jakarta', bullets: ['Memimpin proyek konsultasi pajak, restrukturisasi keuangan, valuasi, dan due diligence lintas negara.'] },
      { firm: 'CGLYTICS (AMSTERDAM) & PWC JAKARTA', period: '2012 S.D. 2018', title: 'Research Analyst (Amsterdam) & Audit Associate (PwC)', bullets: ['Mengelola analisis tata kelola 350 perusahaan tercatat di pasar Eropa serta audit laporan keuangan di berbagai industri.'] }
    ],
    exp_en: [
      { firm: 'ARTHERA LAW FIRM', period: 'PRESENT', title: 'Partner, Tax & Finance · Jakarta', bullets: ['Leads tax, tax dispute, and corporate finance matters.'] },
      { firm: 'CHATURA ADVISORY GROUP (DEHENG ARKO LAW OFFICES)', period: 'NOV 2018 TO DEC 2022', title: 'Director, Finance & Tax · Jakarta', bullets: ['Led tax advisory, financial restructuring, valuation, and cross-border due diligence projects.'] },
      { firm: 'CGLYTICS (AMSTERDAM) & PWC JAKARTA', period: '2012 TO 2018', title: 'Research Analyst (Amsterdam) & Audit Associate (PwC)', bullets: ['Managed governance analysis of 350 European listed companies and performed financial statement audits across industries.'] }
    ],
    competencies: ['PERPAJAKAN & SENGKETA PAJAK', 'RESTRUKTURISASI KEUANGAN', 'VALUASI & PEMODELAN KEUANGAN', 'DUE DILIGENCE', 'TATA KELOLA PERUSAHAAN', 'AUDIT & PELAPORAN KEUANGAN', 'KEPATUHAN REGULASI']
  },
  fauzi: {
    id: 'fauzi',
    portrait: 'assets/team/fauzi.jpg',
    name: 'AHMAD FAUZI HARAHAP',
    degrees: 'S.H., M.H.',
    role_id: 'ASSOCIATE · LEGAL COUNSEL · LITIGASI · PENGAJAR HUKUM TATA NEGARA',
    role_en: 'ASSOCIATE · LEGAL COUNSEL · LITIGATION · CONSTITUTIONAL LAW LECTURER',
    location_id: 'Jakarta / Padangsidimpuan',
    location_en: 'Jakarta / Padangsidimpuan',
    phone: '+62 823 3532 1216',
    email1: 'fauziharahap2207@gmail.com',
    email2: 'artheralawfirm@gmail.com',
    profile_id: 'Praktisi hukum yang teliti, efisien, dan terorganisasi dengan pengalaman di bidang layanan hukum korporasi dan pengajaran. Memiliki kemampuan analisis dan pemecahan masalah yang kuat, komunikasi lisan dan tulisan yang baik, serta menjunjung kepercayaan, kerahasiaan, dan etika profesi. Berpengalaman menyusun kontrak, menangani litigasi, perizinan, hubungan industrial, dan kekayaan intelektual.',
    profile_en: 'Detail-oriented, efficient, and organised legal professional with experience in corporate legal services and teaching. Strong analytical and problem-solving skills, excellent written and verbal communication, and a high regard for trust, discretion, and professional ethics. Experienced in contract drafting, litigation, licensing, industrial relations, and intellectual property.',
    edu_id: [
      ['Magister Hukum (M.H.)', 'Universitas Indonesia, 2021 · Hukum Tata Negara · IPK 3,68'],
      ['Sarjana Hukum (S.H.)', 'Universitas Muhammadiyah Sumatera Utara, 2019 · IPK 3,59']
    ],
    edu_en: [
      ['Master of Laws (M.H.)', 'Universitas Indonesia, 2021 · Constitutional Law · GPA 3.68'],
      ['Bachelor of Laws (S.H.)', 'Universitas Muhammadiyah Sumatera Utara, 2019 · GPA 3.59']
    ],
    certs_id: [
      ['Organisasi Profesi', 'Asosiasi Pengajar Hukum Tata Negara dan Hukum Administrasi Negara'],
      ['Prestasi Nasional', 'Delegasi Peradilan Semu Konstitusi V Mahkamah Konstitusi (2018) & Piala A.G. Pringgodigdo VI Unair (2017)']
    ],
    certs_en: [
      ['Professional Organisation', 'Association of Teachers of Constitutional and Administrative Law'],
      ['National Awards', 'Constitutional Moot Court V Delegate (2018) & A.G. Pringgodigdo Cup VI Delegate (2017)']
    ],
    exp_id: [
      { firm: 'ARTHERA LAW FIRM', period: 'SEKARANG', title: 'Associate · Jakarta', bullets: ['Menangani penyusunan kontrak, perizinan OSS, pendaftaran HKI, dan pendampingan litigasi.'] },
      { firm: 'PT SAHID SAHIRMAN MEMORIAL HOSPITAL & ACEMARK IP', period: '2023 S.D. 2024', title: 'Corporate Legal & Junior Lawyer HKI · Jakarta', bullets: ['Menyusun rancangan perjanjian perusahaan, mengelola perizinan berusaha OSS, serta mendaftarkan hak kekayaan intelektual pada DJKI dan mendampingi litigasi sengketa HKI.'] },
      { firm: 'UNIVERSITAS TERBUKA & PT WINN APPLIANCE', period: '2021 S.D. SEKARANG', title: 'Tutor Hukum & Legal Staff · Jakarta', bullets: ['Menyusun perjanjian distributor/agen/investor, mewakili perusahaan di persidangan, serta mengelola wajib lapor ketenagakerjaan dan hubungan industrial.'] }
    ],
    exp_en: [
      { firm: 'ARTHERA LAW FIRM', period: 'PRESENT', title: 'Associate · Jakarta', bullets: ['Handles contract drafting, OSS licensing, IP registration, and litigation support.'] },
      { firm: 'PT SAHID SAHIRMAN MEMORIAL HOSPITAL & ACEMARK IP', period: '2023 TO 2024', title: 'Corporate Legal & Junior IP Lawyer · Jakarta', bullets: ['Drafted company agreements, managed OSS business licensing, and registered intellectual property rights with the Ministry of Law and assisted in IP dispute litigation.'] },
      { firm: 'UNIVERSITAS TERBUKA & PT WINN APPLIANCE', period: '2021 TO PRESENT', title: 'Law Tutor & Legal Staff · Jakarta', bullets: ['Drafted commercial agreements, represented the company in court, and managed employment reporting and industrial relations.'] }
    ],
    competencies: ['CONTRACT DRAFTING', 'LITIGASI', 'PENDAPAT HUKUM', 'PERIZINAN & OSS', 'HUBUNGAN INDUSTRIAL', 'KEKAYAAN INTELEKTUAL', 'HUKUM TATA NEGARA']
  }
};
