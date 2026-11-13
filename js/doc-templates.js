// Template draf Legal Retainer (Offering Letter & Perjanjian Jasa Hukum): bilingual ID/EN
    export function buildRetainerOfferingLetterSheets(clientRec, ctx = {}) {
      const numPart = (ctx.pksNo || '108').split('/')[0] || '108';
      const olNo = `${numPart}/ALF/OL-LR/XI/2026`;
      const compName = (clientRec && clientRec.name && clientRec.serviceKey === 'retainer') ? clientRec.name : (ctx.clientName || '[NAMA PERUSAHAAN / COMPANY NAME]');
      const compAddr = (clientRec && clientRec.companyAddress) ? clientRec.companyAddress : '[Alamat lengkap perusahaan / Full company address]';
      const compCity = (clientRec && clientRec.companyCity) ? clientRec.companyCity : 'Jakarta';
      const repName = (clientRec && clientRec.repName) ? clientRec.repName : '[Nama Pejabat / Authorized Officer]';
      const repTitle = (clientRec && clientRec.repTitle) ? clientRec.repTitle : 'Direksi / Board of Directors';
      const durText = (clientRec && clientRec.retainerMonths) ? clientRec.retainerMonths : '[3 (tiga) / 6 (enam) / 12 (dua belas)]';

      return [
        {
          sheetNo: 1,
          tabLabel: 'Hal. 1 · Pembuka & Bagian I-III (DRAF)',
          title: 'Draf Offering Letter Legal Retainer: Ruang Lingkup, Sistem Kerja & Jangka Waktu',
          html: `
            <div class="space-y-4 text-xs sm:text-sm leading-relaxed text-arthera-900 relative z-20">
              <div class="bg-arthera-800 text-cream-50 p-5 sm:p-6 rounded-2xl border-b-4 border-gold-500 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div class="flex items-center gap-3.5">
                  <img src="assets/emblem-light.png" alt="Arthera" class="w-11 h-11 object-contain" />
                  <div>
                    <div class="text-[11px] font-mono uppercase tracking-[0.2em] text-gold-300">ARTHERA LAW FIRM · BILINGUAL DRAFT PROPOSAL</div>
                    <h3 class="serif-heading text-2xl sm:text-3xl font-bold text-cream-50">Penawaran Jasa Hukum Legal Retainer / Legal Retainer Proposal</h3>
                    <div class="text-xs text-cream-200 font-mono mt-0.5">Nomor / Number: ${olNo} · Lampiran: 1 (satu) berkas Company Profile</div>
                  </div>
                </div>
                <span class="px-3 py-1.5 rounded-xl bg-gold-500 text-cream-50 font-mono text-xs font-bold uppercase tracking-widest self-start">STATUS: DRAF KLIEN</span>
              </div>

              <div class="p-4 rounded-xl bg-cream-100 border border-cream-300 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div>
                  <span class="font-bold text-gold-700 uppercase block">Kepada Yth. / To: Direksi / Board of Directors</span>
                  <div class="font-bold text-arthera-900 text-sm mt-0.5">${compName}</div>
                  <div class="text-arthera-700">${compAddr} (${compCity})</div>
                </div>
                <div>
                  <span class="font-bold text-gold-700 uppercase block">U.p. / Attn. &amp; Tanggal Surat</span>
                  <div class="font-semibold text-arthera-900 mt-0.5">${repName}, ${repTitle}</div>
                  <div class="text-arthera-700">Jakarta, 9 November 2026</div>
                </div>
              </div>

              <div class="overflow-x-auto rounded-xl border border-cream-300">
                <table class="w-full text-left border-collapse text-xs sm:text-[13px]">
                  <thead>
                    <tr class="bg-arthera-800 text-gold-300 uppercase font-mono text-[11px] tracking-wider">
                      <th class="py-2.5 px-4 w-1/2 border-r border-arthera-700">BAHASA INDONESIA</th>
                      <th class="py-2.5 px-4 w-1/2">ENGLISH</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-cream-300 bg-white">
                    <tr>
                      <td class="p-3.5 align-top border-r border-cream-300">
                        <strong>Dengan hormat,</strong><br/>
                        Perkenankan kami, <strong>Aris Bayu Anggono, S.H., M.H., CCD.</strong>, dan rekan, para advokat dan konsultan hukum pada <strong>ARTHERA LAW FIRM</strong> yang beralamat di Equity Tower, Lantai 26 Unit H, Jl. Jenderal Sudirman Kav. 52-53 (SCBD), Senayan, Kebayoran Baru, Jakarta Selatan 12190, dengan memperhatikan kebutuhan jasa hukum <strong>${compName}</strong> (selanjutnya disebut "Perusahaan"), dengan ini menyampaikan penawaran jasa hukum sebagai konsultan hukum Perusahaan dalam bentuk <em>Legal Retainer</em>, sebagai berikut:
                      </td>
                      <td class="p-3.5 align-top italic text-arthera-800">
                        <strong>Dear Sir or Madam,</strong><br/>
                        We, <strong>Aris Bayu Anggono, S.H., M.H., CCD.</strong>, and colleagues, advocates and legal consultants at <strong>ARTHERA LAW FIRM</strong>, of Equity Tower, 26th Floor, Unit H, Jl. Jenderal Sudirman Kav. 52-53 (SCBD), Senayan, Kebayoran Baru, South Jakarta 12190, having considered the legal needs of <strong>${compName}</strong> (the "Company"), hereby submit our proposal to act as the Company's legal counsel on a <em>Legal Retainer</em> basis, as follows:
                      </td>
                    </tr>
                    <tr class="bg-cream-100/80 font-bold text-arthera-900">
                      <td class="py-2 px-3.5 border-r border-cream-300">I. RUANG LINGKUP PEKERJAAN (Non-Litigasi)</td>
                      <td class="py-2 px-3.5">I. SCOPE OF WORK (Non-Contentious)</td>
                    </tr>
                    <tr>
                      <td class="p-3.5 align-top border-r border-cream-300 space-y-1">
                        <div>1. Konsultasi dan <em>legal advice</em>, lisan maupun tertulis, atas permasalahan hukum dalam kegiatan usaha Perusahaan sehari-hari;</div>
                        <div>2. <em>Review</em> dan <em>drafting</em> perjanjian, serta pandangan hukum atas rancangan kontrak dengan mitra usaha, pemasok, pelanggan, karyawan, dan pihak terafiliasi;</div>
                        <div>3. Penyusunan pendapat hukum (<em>legal opinion</em>) tertulis atas permintaan Perusahaan;</div>
                        <div>4. Pendampingan dalam rapat, negosiasi, dan korespondensi hukum dengan pihak ketiga, termasuk penyusunan dan penanganan somasi;</div>
                        <div>5. Pemetaan risiko hukum dan rekomendasi pencegahan sengketa;</div>
                        <div>6. Informasi perkembangan peraturan perundang-undangan yang relevan dengan kegiatan usaha Perusahaan.</div>
                        <div class="pt-1 text-arthera-600 text-[11px]"><em>Catatan: Penanganan perkara litigasi dan arbitrase, serta penugasan khusus seperti legal due diligence, aksi korporasi, atau likuidasi, tidak termasuk dalam biaya retainer dan ditawarkan secara tersendiri.</em></div>
                      </td>
                      <td class="p-3.5 align-top italic text-arthera-800 space-y-1">
                        <div>1. Oral and written legal advice on legal issues arising in the Company's day-to-day business;</div>
                        <div>2. Review and drafting of agreements, and legal views on draft contracts with business partners, suppliers, customers, employees, and affiliates;</div>
                        <div>3. Preparation of written legal opinions at the Company's request;</div>
                        <div>4. Attendance at meetings, negotiations, and legal correspondence with third parties, including drafting and handling demand letters;</div>
                        <div>5. Legal risk mapping and dispute prevention recommendations;</div>
                        <div>6. Updates on legislative developments relevant to the Company's business.</div>
                        <div class="pt-1 text-arthera-600 text-[11px]"><em>Note: Litigation and arbitration, as well as special assignments such as legal due diligence, corporate actions, or liquidation, are not covered by the retainer fee and will be proposed separately.</em></div>
                      </td>
                    </tr>
                    <tr class="bg-cream-100/80 font-bold text-arthera-900">
                      <td class="py-2 px-3.5 border-r border-cream-300">II. SISTEM KERJA &amp; III. JANGKA WAKTU</td>
                      <td class="py-2 px-3.5">II. WORKING METHOD &amp; III. TERM AND FEES</td>
                    </tr>
                    <tr>
                      <td class="p-3.5 align-top border-r border-cream-300 space-y-1">
                        <div>• <strong>Narahubung &amp; Waktu Tanggap:</strong> Satu advokat penanggung jawab &amp; satu narahubung internal; konsultasi ditanggapi maks. <strong>1 (satu) hari kerja</strong>; review perjanjian standar diselesaikan maks. <strong>3 (tiga) hari kerja</strong> sejak dokumen lengkap diterima; laporan kegiatan bulanan rutin.</div>
                        <div>• <strong>Jangka Waktu:</strong> <strong>${durText} bulan</strong> sejak penandatanganan Perjanjian Jasa Hukum, dapat diperpanjang atas kesepakatan Para Pihak.</div>
                        <div>• <strong>Biaya Jasa Hukum &amp; Pembayaran:</strong> Sesuai nilai kesepakatan tertulis pada surat penawaran resmi (konfirmasi via <span class="font-mono">artheralawfirm@gmail.com</span> / <span class="font-mono">+62 812 9507 6597</span>), dibayarkan paling lambat 7 (tujuh) hari kalender sejak invoice diterima (belum termasuk PPN; PPh diperhitungkan dengan bukti potong).</div>
                      </td>
                      <td class="p-3.5 align-top italic text-arthera-800 space-y-1">
                        <div>• <strong>Point of Contact &amp; Response Time:</strong> One responsible advocate &amp; one internal contact person; queries answered within <strong>1 (one) working day</strong>; standard contract reviews completed within <strong>3 (three) working days</strong> of complete documents; monthly activity report.</div>
                        <div>• <strong>Term:</strong> <strong>${durText} months</strong> from the signing of the Engagement Agreement, renewable by mutual agreement.</div>
                        <div>• <strong>Retainer Fee &amp; Payment:</strong> As set out in the official fee schedule confirmed with the Company (<span class="font-mono">artheralawfirm@gmail.com</span> / <span class="font-mono">+62 812 9507 6597</span>), payable within 7 (seven) calendar days of receipt of invoice (exclusive of VAT; income tax withheld credited upon withholding slip).</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          `
        },
        {
          sheetNo: 2,
          tabLabel: 'Hal. 2 · Bagian IV-V, Pengesahan & Persetujuan (DRAF)',
          title: 'Draf Offering Letter Legal Retainer: Kerahasiaan, Masa Berlaku & Pernyataan Persetujuan',
          html: `
            <div class="space-y-4 text-xs sm:text-sm leading-relaxed text-arthera-900 relative z-20">
              <div class="overflow-x-auto rounded-xl border border-cream-300">
                <table class="w-full text-left border-collapse text-xs sm:text-[13px]">
                  <thead>
                    <tr class="bg-arthera-800 text-gold-300 uppercase font-mono text-[11px] tracking-wider">
                      <th class="py-2.5 px-4 w-1/2 border-r border-arthera-700">BAHASA INDONESIA</th>
                      <th class="py-2.5 px-4 w-1/2">ENGLISH</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-cream-300 bg-white">
                    <tr class="bg-cream-100/80 font-bold text-arthera-900">
                      <td class="py-2 px-3.5 border-r border-cream-300">IV. KERAHASIAAN DAN BENTURAN KEPENTINGAN</td>
                      <td class="py-2 px-3.5">IV. CONFIDENTIALITY AND CONFLICTS</td>
                    </tr>
                    <tr>
                      <td class="p-3.5 align-top border-r border-cream-300">
                        Kami wajib merahasiakan seluruh dokumen dan informasi Perusahaan sesuai <strong>Pasal 19 UU No. 18 Tahun 2003 tentang Advokat</strong> dan <strong>Kode Etik Advokat Indonesia</strong>, serta memproses data pribadi sesuai <strong>UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi</strong>. Kami telah memastikan tidak terdapat benturan kepentingan dalam penawaran ini.
                      </td>
                      <td class="p-3.5 align-top italic text-arthera-800">
                        We are bound to keep all of the Company's documents and information confidential under <strong>Article 19 of Law No. 18 of 2003 on Advocates</strong> and the <strong>Indonesian Advocates' Code of Ethics</strong>, and to process personal data in accordance with <strong>Law No. 27 of 2022 on Personal Data Protection</strong>. We have confirmed that no conflict of interest arises from this proposal.
                      </td>
                    </tr>
                    <tr class="bg-cream-100/80 font-bold text-arthera-900">
                      <td class="py-2 px-3.5 border-r border-cream-300">V. MASA BERLAKU DAN BAHASA</td>
                      <td class="py-2 px-3.5">V. VALIDITY AND LANGUAGE</td>
                    </tr>
                    <tr>
                      <td class="p-3.5 align-top border-r border-cream-300">
                        Penawaran ini berlaku <strong>30 (tiga puluh) hari kalender</strong> sejak tanggal surat. Apabila disetujui, kerja sama dituangkan dalam <strong>Perjanjian Jasa Hukum Legal Retainer</strong>. Penawaran ini dibuat dalam bahasa Indonesia dan bahasa Inggris; apabila terdapat perbedaan penafsiran, yang berlaku adalah bahasa Indonesia.<br/><br/>
                        Untuk koordinasi, Perusahaan dapat menghubungi <strong>Aris Bayu Anggono, S.H., M.H., CCD.</strong> di <span class="font-mono font-semibold">+62 812 9507 6597</span> atau <span class="font-mono font-semibold">artheralawfirm@gmail.com</span>.
                      </td>
                      <td class="p-3.5 align-top italic text-arthera-800">
                        This proposal is valid for <strong>30 (thirty) calendar days</strong> from its date. Upon acceptance, the engagement will be set out in a <strong>Legal Retainer Engagement Agreement</strong>. This proposal is made in Indonesian and English; in the event of any inconsistency, the Indonesian text shall prevail.<br/><br/>
                        For coordination, please contact <strong>Aris Bayu Anggono, S.H., M.H., CCD.</strong> on <span class="font-mono font-semibold">+62 812 9507 6597</span> or at <span class="font-mono font-semibold">artheralawfirm@gmail.com</span>.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Signatories of Arthera Law Firm -->
              <div class="p-4 rounded-xl bg-cream-50 border border-gold-300 space-y-3">
                <div class="text-xs font-bold uppercase tracking-wider text-arthera-800">Hormat kami, / Yours faithfully, ARTHERA LAW FIRM</div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div class="p-3.5 rounded-xl bg-white border border-cream-300 text-center">
                    <div class="font-bold text-arthera-900">ARIS BAYU ANGGONO, S.H., M.H., CCD.</div>
                    <div class="text-xs text-gold-700 font-semibold">Managing Partner</div>
                  </div>
                  <div class="p-3.5 rounded-xl bg-white border border-cream-300 text-center">
                    <div class="font-bold text-arthera-900">LILIS SUGANDA, S.H., M.H., CLA., C.Med.</div>
                    <div class="text-xs text-gold-700 font-semibold">Senior Partner</div>
                  </div>
                </div>
              </div>

              <!-- PERNYATAAN PERSETUJUAN / ACCEPTANCE OF PROPOSAL -->
              <div class="p-4 rounded-xl bg-cream-100 border border-gold-400 space-y-3">
                <div class="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div class="font-bold text-arthera-900 text-sm">PERNYATAAN PERSETUJUAN / Acceptance of Proposal</div>
                    <div class="text-xs text-arthera-700">Nomor / Number: <span class="font-mono font-semibold">${olNo}</span></div>
                  </div>
                  
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-white p-3.5 rounded-lg border border-cream-300">
                  <div>
                    Yang bertanda tangan di bawah ini, untuk dan atas nama <strong>${compName}</strong>, menyatakan menyetujui Penawaran Jasa Hukum Legal Retainer dari Arthera Law Firm Nomor <span class="font-mono">${olNo}</span>, dan akan menandatangani Perjanjian Jasa Hukum Legal Retainer.
                  </div>
                  <div class="italic text-arthera-700">
                    The undersigned, for and on behalf of <strong>${compName}</strong>, hereby accepts the Legal Retainer Proposal of Arthera Law Firm No. <span class="font-mono">${olNo}</span>, and will enter into a Legal Retainer Engagement Agreement.
                  </div>
                </div>
                <div class="sign-slot" data-sign-slot></div>
              </div>
            </div>
          `
        }
      ];
    }

    export function buildRetainerAgreementSheets(clientRec, ctx = {}) {
      const numPart = (ctx.pksNo || '108').split('/')[0] || '108';
      const pjhNo = `${numPart}/ALF/PJH-LR/XI/2026`;
      const olNo = `${numPart}/ALF/OL-LR/XI/2026`;
      const compName = (clientRec && clientRec.name && clientRec.serviceKey === 'retainer') ? clientRec.name : (ctx.clientName || '[NAMA PERUSAHAAN / COMPANY NAME]');
      const compCity = (clientRec && clientRec.companyCity) ? clientRec.companyCity : 'Jakarta';
      const compAddr = (clientRec && clientRec.companyAddress) ? clientRec.companyAddress : '[Alamat lengkap perusahaan / Full address]';
      const repName = (clientRec && clientRec.repName) ? clientRec.repName : '[Nama Pejabat / Authorized Representative]';
      const repTitle = (clientRec && clientRec.repTitle) ? clientRec.repTitle : 'Direktur Utama / Director';
      const deedRef = (clientRec && clientRec.deedRef) ? clientRec.deedRef : 'Anggaran Dasar / Akta Terakhir Perseroan';
      const durText = (clientRec && clientRec.retainerMonths) ? clientRec.retainerMonths : '12 (dua belas) / 12 (twelve)';
      const paySched = (clientRec && clientRec.paymentSchedule) ? clientRec.paymentSchedule : 'di muka setiap bulan / monthly in advance';

      return [
        {
          sheetNo: 1,
          tabLabel: 'Hal. 1 · Komparisi & Pasal 1-3 (DRAF)',
          title: 'Draf Perjanjian Jasa Hukum Legal Retainer: Komparisi, Ruang Lingkup, Jangka Waktu & Biaya',
          html: `
            <div class="space-y-4 text-xs sm:text-sm leading-relaxed text-arthera-900 relative z-20">
              <div class="bg-arthera-800 text-cream-50 p-5 sm:p-6 rounded-2xl border-b-4 border-gold-500 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div class="flex items-center gap-3.5">
                  <img src="assets/emblem-light.png" alt="Arthera" class="w-11 h-11 object-contain" />
                  <div>
                    <div class="text-[11px] font-mono uppercase tracking-[0.2em] text-gold-300">PERJANJIAN JASA HUKUM LEGAL RETAINER · BILINGUAL DRAFT</div>
                    <h3 class="serif-heading text-2xl sm:text-3xl font-bold text-cream-50">LEGAL RETAINER ENGAGEMENT AGREEMENT</h3>
                    <div class="text-xs text-cream-200 font-mono mt-0.5">Nomor / Number: ${pjhNo} · Ref. Proposal: ${olNo}</div>
                  </div>
                </div>
                <span class="px-3 py-1.5 rounded-xl bg-gold-500 text-cream-50 font-mono text-xs font-bold uppercase tracking-widest self-start">STATUS: DRAF KLIEN</span>
              </div>

              <div class="overflow-x-auto rounded-xl border border-cream-300">
                <table class="w-full text-left border-collapse text-xs sm:text-[13px]">
                  <thead>
                    <tr class="bg-arthera-800 text-gold-300 uppercase font-mono text-[11px] tracking-wider">
                      <th class="py-2.5 px-4 w-1/2 border-r border-arthera-700">BAHASA INDONESIA</th>
                      <th class="py-2.5 px-4 w-1/2">ENGLISH</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-cream-300 bg-white">
                    <tr>
                      <td class="p-3.5 align-top border-r border-cream-300 space-y-2">
                        <p>Perjanjian Jasa Hukum Legal Retainer ini (<strong>"Perjanjian"</strong>) dibuat dan ditandatangani di Jakarta pada tanggal <strong>9 November 2026</strong>, oleh dan antara:</p>
                        <p><strong>1. ${compName}</strong>, perseroan terbatas yang didirikan berdasarkan hukum Negara Republik Indonesia, berkedudukan di ${compCity}, beralamat di ${compAddr}, diwakili oleh <strong>${repName}</strong> selaku <strong>${repTitle}</strong>, berdasarkan ${deedRef} (<strong>"PIHAK PERTAMA"</strong>);</p>
                        <p><strong>2. ARTHERA LAW FIRM</strong>, kantor advokat dan konsultan hukum, beralamat di Equity Tower, Lantai 26 Unit H, Jl. Jenderal Sudirman Kav. 52-53 (SCBD), Senayan, Kebayoran Baru, Jakarta Selatan 12190, diwakili oleh <strong>Aris Bayu Anggono, S.H., M.H., CCD.</strong> selaku Managing Partner (<strong>"PIHAK KEDUA"</strong>).</p>
                        <p class="text-[11px] text-arthera-700">Para Pihak menerangkan: (a) PIHAK PERTAMA membutuhkan pendampingan hukum berkelanjutan; (b) PIHAK KEDUA adalah kantor advokat berizin praktik sesuai UU No. 18 Tahun 2003 tentang Advokat; (c) PIHAK KEDUA telah menyampaikan Penawaran Jasa Hukum Nomor <span class="font-mono">${olNo}</span> yang telah disetujui PIHAK PERTAMA.</p>
                      </td>
                      <td class="p-3.5 align-top italic text-arthera-800 space-y-2">
                        <p>This Legal Retainer Engagement Agreement (the <strong>"Agreement"</strong>) is made and signed in Jakarta on <strong>9 November 2026</strong>, by and between:</p>
                        <p><strong>1. ${compName}</strong>, a limited liability company established under the laws of the Republic of Indonesia, domiciled in ${compCity}, having its address at ${compAddr}, represented by <strong>${repName}</strong> as <strong>${repTitle}</strong>, pursuant to ${deedRef} (the <strong>"FIRST PARTY"</strong>);</p>
                        <p><strong>2. ARTHERA LAW FIRM</strong>, a firm of advocates and legal consultants, having its address at Equity Tower, 26th Floor, Unit H, Jl. Jenderal Sudirman Kav. 52-53 (SCBD), Senayan, Kebayoran Baru, South Jakarta 12190, represented by <strong>Aris Bayu Anggono, S.H., M.H., CCD.</strong> as Managing Partner (the <strong>"SECOND PARTY"</strong>).</p>
                        <p class="text-[11px] text-arthera-700">The Parties state that: (a) the FIRST PARTY requires ongoing legal support; (b) the SECOND PARTY is a law firm licensed under Law No. 18 of 2003 on Advocates; (c) the SECOND PARTY has submitted Legal Services Proposal No. <span class="font-mono">${olNo}</span>, which the FIRST PARTY has accepted.</p>
                      </td>
                    </tr>
                    <tr class="bg-cream-100/80 font-bold text-arthera-900">
                      <td class="py-2 px-3.5 border-r border-cream-300">PASAL 1: PENUNJUKAN DAN RUANG LINGKUP</td>
                      <td class="py-2 px-3.5">ARTICLE 1: APPOINTMENT AND SCOPE</td>
                    </tr>
                    <tr>
                      <td class="p-3.5 align-top border-r border-cream-300 space-y-1">
                        <div>(1) PIHAK PERTAMA menunjuk PIHAK KEDUA sebagai konsultan hukum dalam bentuk Legal Retainer, dan PIHAK KEDUA menerima penunjukan tersebut.</div>
                        <div>(2) Ruang lingkup jasa hukum meliputi: (a) konsultasi dan <em>legal advice</em> lisan maupun tertulis; (b) <em>review</em> dan <em>drafting</em> perjanjian; (c) penyusunan pendapat hukum; (d) pendampingan rapat, negosiasi, dan korespondensi hukum; (e) pemetaan risiko hukum dan informasi perkembangan peraturan.</div>
                        <div>(3) Litigasi, arbitrase, kepailitan dan PKPU, serta penugasan khusus di luar ayat (2) dilaksanakan berdasarkan perjanjian dan surat kuasa tersendiri dengan biaya terpisah.</div>
                      </td>
                      <td class="p-3.5 align-top italic text-arthera-800 space-y-1">
                        <div>(1) The FIRST PARTY appoints the SECOND PARTY as its legal counsel on a Legal Retainer basis, and the SECOND PARTY accepts the appointment.</div>
                        <div>(2) The scope of legal services covers: (a) oral and written legal advice; (b) review and drafting of agreements; (c) legal opinions; (d) attendance at meetings, negotiations, and legal correspondence; (e) legal risk mapping and regulatory updates.</div>
                        <div>(3) Litigation, arbitration, bankruptcy and suspension of payments, and special assignments outside paragraph (2) are subject to a separate agreement, power of attorney, and fee.</div>
                      </td>
                    </tr>
                    <tr class="bg-cream-100/80 font-bold text-arthera-900">
                      <td class="py-2 px-3.5 border-r border-cream-300">PASAL 2: JANGKA WAKTU &amp; PASAL 3: BIAYA JASA HUKUM</td>
                      <td class="py-2 px-3.5">ARTICLE 2: TERM &amp; ARTICLE 3: PROFESSIONAL FEES</td>
                    </tr>
                    <tr>
                      <td class="p-3.5 align-top border-r border-cream-300 space-y-1">
                        <div>• <strong>Pasal 2:</strong> Berlaku selama <strong>${durText} bulan</strong> dan dapat diperpanjang dengan kesepakatan tertulis paling lambat 14 (empat belas) hari kalender sebelum berakhir.</div>
                        <div>• <strong>Pasal 3:</strong> Pembayaran dilakukan <strong>${paySched}</strong> paling lambat 7 (tujuh) hari kalender sejak invoice diterima sesuai jadwal biaya dalam Penawaran Jasa Hukum Nomor <span class="font-mono">${olNo}</span>. Biaya belum termasuk PPN; pemotongan PPh diperhitungkan dengan bukti potong. Biaya operasional di luar Jabodetabek, biaya resmi instansi, notaris, dan penerjemah tersumpah ditanggung PIHAK PERTAMA sesuai biaya riil dengan persetujuan tertulis.</div>
                      </td>
                      <td class="p-3.5 align-top italic text-arthera-800 space-y-1">
                        <div>• <strong>Article 2:</strong> Valid for <strong>${durText} months</strong> and may be extended by written agreement no later than 14 (fourteen) calendar days before it expires.</div>
                        <div>• <strong>Article 3:</strong> Payment shall be made <strong>${paySched}</strong> within 7 (seven) calendar days of receipt of invoice in accordance with Proposal No. <span class="font-mono">${olNo}</span>. Fees are exclusive of VAT; income tax withheld is credited upon delivery of the withholding slip. Disbursements outside Greater Jakarta, official fees, notary, and sworn translation are borne by the FIRST PARTY at cost with prior written approval.</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          `
        },
        {
          sheetNo: 2,
          tabLabel: 'Hal. 2 · Pasal 4 s.d. Pasal 8 (DRAF)',
          title: 'Draf Perjanjian Jasa Hukum Legal Retainer: Hak & Kewajiban, Kerahasiaan, Konflik & Pengakhiran',
          html: `
            <div class="space-y-4 text-xs sm:text-sm leading-relaxed text-arthera-900 relative z-20">
              <div class="overflow-x-auto rounded-xl border border-cream-300">
                <table class="w-full text-left border-collapse text-xs sm:text-[13px]">
                  <thead>
                    <tr class="bg-arthera-800 text-gold-300 uppercase font-mono text-[11px] tracking-wider">
                      <th class="py-2.5 px-4 w-1/2 border-r border-arthera-700">BAHASA INDONESIA</th>
                      <th class="py-2.5 px-4 w-1/2">ENGLISH</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-cream-300 bg-white">
                    <tr class="bg-cream-100/80 font-bold text-arthera-900">
                      <td class="py-2 px-3.5 border-r border-cream-300">PASAL 4 &amp; PASAL 5: HAK DAN KEWAJIBAN PARA PIHAK</td>
                      <td class="py-2 px-3.5">ARTICLE 4 &amp; ARTICLE 5: RIGHTS AND OBLIGATIONS</td>
                    </tr>
                    <tr>
                      <td class="p-3.5 align-top border-r border-cream-300 space-y-1.5">
                        <div><strong>Pasal 4 (PIHAK PERTAMA):</strong> (1) Berhak memperoleh jasa hukum sesuai Pasal 1 dan laporan kegiatan bulanan. (2) Wajib memberikan dokumen dan keterangan yang benar dan lengkap, menunjuk satu narahubung, serta membayar biaya jasa hukum sesuai Pasal 3.</div>
                        <div><strong>Pasal 5 (PIHAK KEDUA):</strong> (1) Berhak menerima biaya jasa hukum dan memperoleh dokumen yang diperlukan. (2) Wajib melaksanakan jasa hukum secara profesional dan bertanggung jawab sesuai UU Advokat dan Kode Etik Advokat Indonesia, dengan waktu tanggap paling lambat <strong>1 (satu) hari kerja</strong>. (3) Nasihat hukum diberikan berdasarkan dokumen dari PIHAK PERTAMA dan peraturan yang berlaku saat itu. Keputusan bisnis tetap menjadi tanggung jawab PIHAK PERTAMA.</div>
                      </td>
                      <td class="p-3.5 align-top italic text-arthera-800 space-y-1.5">
                        <div><strong>Article 4 (FIRST PARTY):</strong> (1) Entitled to the legal services under Article 1 and a monthly activity report. (2) Shall provide true and complete documents and information, appoint one contact person, and pay the fees under Article 3.</div>
                        <div><strong>Article 5 (SECOND PARTY):</strong> (1) Entitled to receive the fees and required documents. (2) Shall perform its services professionally and responsibly in accordance with the Advocates Law and the Indonesian Advocates' Code of Ethics, responding within <strong>1 (one) working day</strong>. (3) Advice is given on the basis of the FIRST PARTY's documents and the law in force at the time. Business decisions remain the FIRST PARTY's responsibility.</div>
                      </td>
                    </tr>
                    <tr class="bg-cream-100/80 font-bold text-arthera-900">
                      <td class="py-2 px-3.5 border-r border-cream-300">PASAL 6: KERAHASIAAN &amp; PASAL 7: BENTURAN KEPENTINGAN</td>
                      <td class="py-2 px-3.5">ARTICLE 6: CONFIDENTIALITY &amp; ARTICLE 7: CONFLICT OF INTEREST</td>
                    </tr>
                    <tr>
                      <td class="p-3.5 align-top border-r border-cream-300 space-y-1.5">
                        <div><strong>Pasal 6:</strong> (1) PIHAK KEDUA wajib merahasiakan seluruh dokumen dan informasi PIHAK PERTAMA sesuai <strong>Pasal 19 UU No. 18 Tahun 2003</strong>, kecuali diwajibkan oleh hukum atau putusan pengadilan. (2) Para Pihak memproses data pribadi sesuai <strong>UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi</strong>. (3) Kewajiban kerahasiaan tetap berlaku setelah Perjanjian berakhir.</div>
                        <div><strong>Pasal 7:</strong> PIHAK KEDUA menyatakan tidak memiliki benturan kepentingan dengan PIHAK PERTAMA, dan wajib segera memberitahukan secara tertulis apabila potensi benturan kepentingan timbul di kemudian hari.</div>
                      </td>
                      <td class="p-3.5 align-top italic text-arthera-800 space-y-1.5">
                        <div><strong>Article 6:</strong> (1) The SECOND PARTY shall keep all of the FIRST PARTY's documents and information confidential under <strong>Article 19 of Law No. 18 of 2003</strong>, unless required by law or court order. (2) The Parties shall process personal data in accordance with <strong>Law No. 27 of 2022 on Personal Data Protection</strong>. (3) Confidentiality obligations survive the termination of this Agreement.</div>
                        <div><strong>Article 7:</strong> The SECOND PARTY declares that it has no conflict of interest with the FIRST PARTY and shall promptly notify the FIRST PARTY in writing should a potential conflict arise.</div>
                      </td>
                    </tr>
                    <tr class="bg-cream-100/80 font-bold text-arthera-900">
                      <td class="py-2 px-3.5 border-r border-cream-300">PASAL 8: PENGAKHIRAN</td>
                      <td class="py-2 px-3.5">ARTICLE 8: TERMINATION</td>
                    </tr>
                    <tr>
                      <td class="p-3.5 align-top border-r border-cream-300 space-y-1">
                        <div>(1) Masing-masing Pihak dapat mengakhiri Perjanjian dengan pemberitahuan tertulis paling lambat <strong>30 (tiga puluh) hari kalender</strong> sebelumnya.</div>
                        <div>(2) PIHAK PERTAMA tetap membayar biaya sampai tanggal efektif pengakhiran, dan PIHAK KEDUA menyerahkan seluruh dokumen milik PIHAK PERTAMA.</div>
                        <div>(3) Para Pihak mengesampingkan <strong>Pasal 1266 dan 1267 KUH Perdata</strong> sepanjang mensyaratkan putusan pengadilan untuk pengakhiran.</div>
                      </td>
                      <td class="p-3.5 align-top italic text-arthera-800 space-y-1">
                        <div>(1) Either Party may terminate this Agreement by giving at least <strong>30 (thirty) calendar days'</strong> prior written notice.</div>
                        <div>(2) The FIRST PARTY shall pay fees up to the effective date of termination, and the SECOND PARTY shall return all of the FIRST PARTY's documents.</div>
                        <div>(3) The Parties waive <strong>Articles 1266 and 1267 of the Indonesian Civil Code</strong> to the extent a court order is required for termination.</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          `
        },
        {
          sheetNo: 3,
          tabLabel: 'Hal. 3 · Pasal 9 s.d. Pasal 12 & Tanda Tangan (DRAF)',
          title: 'Draf Perjanjian Jasa Hukum Legal Retainer: Force Majeure, Domisili Hukum & Penutup',
          html: `
            <div class="space-y-4 text-xs sm:text-sm leading-relaxed text-arthera-900 relative z-20">
              <div class="overflow-x-auto rounded-xl border border-cream-300">
                <table class="w-full text-left border-collapse text-xs sm:text-[13px]">
                  <thead>
                    <tr class="bg-arthera-800 text-gold-300 uppercase font-mono text-[11px] tracking-wider">
                      <th class="py-2.5 px-4 w-1/2 border-r border-arthera-700">BAHASA INDONESIA</th>
                      <th class="py-2.5 px-4 w-1/2">ENGLISH</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-cream-300 bg-white">
                    <tr class="bg-cream-100/80 font-bold text-arthera-900">
                      <td class="py-2 px-3.5 border-r border-cream-300">PASAL 9: KEADAAN MEMAKSA &amp; PASAL 10: PENYELESAIAN PERSELISIHAN</td>
                      <td class="py-2 px-3.5">ARTICLE 9: FORCE MAJEURE &amp; ARTICLE 10: DISPUTE RESOLUTION</td>
                    </tr>
                    <tr>
                      <td class="p-3.5 align-top border-r border-cream-300 space-y-1.5">
                        <div><strong>Pasal 9:</strong> Para Pihak dibebaskan dari tanggung jawab atas keterlambatan atau kegagalan akibat keadaan memaksa (bencana alam, wabah, kerusuhan, perang, atau kebijakan pemerintah) dengan pemberitahuan tertulis paling lambat 7 (tujuh) hari kalender sejak kejadian.</div>
                        <div><strong>Pasal 10:</strong> (1) Perselisihan diselesaikan terlebih dahulu secara musyawarah dalam waktu 30 (tiga puluh) hari kalender. (2) Apabila tidak tercapai, Para Pihak memilih domisili hukum di <strong>Kepaniteraan Pengadilan Negeri Jakarta Selatan</strong>.</div>
                      </td>
                      <td class="p-3.5 align-top italic text-arthera-800 space-y-1.5">
                        <div><strong>Article 9:</strong> Neither Party is liable for delay or failure caused by force majeure (natural disaster, epidemic, civil unrest, war, or government action), provided written notice is given within 7 (seven) calendar days of the event.</div>
                        <div><strong>Article 10:</strong> (1) Disputes shall first be settled amicably within 30 (thirty) calendar days. (2) Failing settlement, the Parties choose the <strong>Registry of the South Jakarta District Court</strong> as their legal domicile.</div>
                      </td>
                    </tr>
                    <tr class="bg-cream-100/80 font-bold text-arthera-900">
                      <td class="py-2 px-3.5 border-r border-cream-300">PASAL 11: KETENTUAN LAIN &amp; PASAL 12: PENUTUP</td>
                      <td class="py-2 px-3.5">ARTICLE 11: MISCELLANEOUS &amp; ARTICLE 12: CLOSING</td>
                    </tr>
                    <tr>
                      <td class="p-3.5 align-top border-r border-cream-300 space-y-1">
                        <div><strong>Pasal 11:</strong> (1) Perubahan Perjanjian hanya sah dalam bentuk adendum tertulis yang ditandatangani Para Pihak. (2) Penawaran Jasa Hukum merupakan bagian tidak terpisahkan dari Perjanjian ini; apabila berbeda, yang berlaku adalah Perjanjian ini. (3) Dibuat dalam bahasa Indonesia dan bahasa Inggris; apabila terdapat perbedaan penafsiran, yang berlaku adalah bahasa Indonesia.</div>
                        <div><strong>Pasal 12:</strong> Perjanjian ini dibuat dalam rangkap 2 (dua), masing-masing bermeterai cukup dan berkekuatan hukum sama, serta ditandatangani Para Pihak tanpa paksaan.</div>
                      </td>
                      <td class="p-3.5 align-top italic text-arthera-800 space-y-1">
                        <div><strong>Article 11:</strong> (1) Amendments are valid only by a written addendum signed by the Parties. (2) The Legal Services Proposal forms an integral part of this Agreement; in case of conflict, this Agreement prevails. (3) Made in Indonesian and English; in the event of any inconsistency, the Indonesian text shall prevail.</div>
                        <div><strong>Article 12:</strong> This Agreement is made in 2 (two) counterparts, each duly stamped and of equal legal force, and is signed by the Parties free of any duress.</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Signature Table matching Perjanjian Jasa Hukum Legal Retainer Arthera.docx -->
              <div class="p-5 rounded-2xl bg-cream-50 border border-gold-300 space-y-4">
                <div class="flex flex-wrap items-center justify-between gap-2 border-b border-cream-300 pb-2">
                  <div class="font-bold text-arthera-900">Kolom Pengesahan Bermeterai Para Pihak / Execution Block</div>
                  
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="p-4 rounded-xl bg-white border border-gold-300 text-center flex flex-col items-center justify-between space-y-3">
                    <div>
                      <div class="text-xs font-bold uppercase tracking-widest text-arthera-800">PIHAK PERTAMA / FIRST PARTY</div>
                      <div class="text-sm font-bold text-arthera-900 mt-0.5">${compName}</div>
                    </div>
                    <div class="flex flex-col items-center">
                      <div class="sign-slot" data-sign-slot></div>
                      
                    </div>
                    <div class="w-56 border-t border-arthera-800 pt-1.5">
                      <div class="font-bold text-arthera-900">${repName}</div>
                      <div class="text-xs text-arthera-600">${repTitle}</div>
                    </div>
                  </div>
                  <div class="p-4 rounded-xl bg-white border border-cream-300 text-center flex flex-col items-center justify-between space-y-3">
                    <div>
                      <div class="text-xs font-bold uppercase tracking-widest text-arthera-800">PIHAK KEDUA / SECOND PARTY</div>
                      <div class="text-sm font-bold text-arthera-900 mt-0.5">ARTHERA LAW FIRM</div>
                    </div>
                    <div class="my-1">
                      <img src="assets/stamp-signature.png" alt="Stempel Arthera" class="h-16 object-contain mx-auto" />
                      <div class="text-[10px] font-mono text-arthera-600">Meterai Rp10.000</div>
                    </div>
                    <div class="w-60 border-t border-arthera-800 pt-1.5">
                      <div class="font-bold text-arthera-900">ARIS BAYU ANGGONO, S.H., M.H., CCD.</div>
                      <div class="text-xs text-gold-700 font-semibold">Managing Partner</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `
        }
      ];
    }

