/**
 * ARTHERA LAW FIRM — Penerima tanda tangan elektronik & e-Meterai dari situs (ttd.html).
 *
 * - kind 'sign'    : simpan gambar tanda tangan (PNG) + catatan waktu ke folder klien
 * - kind 'meterai' : simpan PDF yang sudah dibubuhi e-Meterai ke folder klien
 * - kind 'status'  : kembalikan status tanda tangan & e-Meterai untuk link tersebut
 *
 * Link tanda tangan dikenali dari hash token-nya (token aslinya hanya ada di link yang dikirim).
 * Versi lama tidak dihapus: dipindah ke subfolder "_Arsip" dengan cap waktu.
 * Cara pasang: lihat apps-script/README.md
 */

// Folder Drive per klien (Nomor PKS)
var CLIENTS = {
  '288/PKS-ART-TM/X/2026': {
    nama: 'Arin Wijaya Hutapea',
    signFolder: '10Bxphp6_xL25p1OTZB9iqE9dDODjrDWg' // E. Tanda Tangan (Merek LYO MORE)
  }
};

// Dokumen yang boleh ditandatangani: kunci di situs -> nama berkas di Drive
var DOCS = {
  surat_b1: 'B1 Surat Kuasa Pengurusan NIB',
  surat_b2: 'B2 Surat Pernyataan Data Usaha',
  surat_15a: '15a Surat Pernyataan Kepemilikan Merek',
  surat_15b: '15b Surat Kuasa Pendaftaran Merek',
  surat_15c: '15c Surat Pernyataan UMK'
};

// Link tanda tangan: SHA-256('arthera-sign|' + token) -> pemilik link
var SIGN_LINKS = {
  '6848bc2446c4113e292b1710cad11f7ae77f61406d85fed45010a328b5e40032': { client: '288/PKS-ART-TM/X/2026', role: 'klien', name: 'Arin Wijaya Hutapea',
    docs: ['surat_b1', 'surat_b2', 'surat_15a', 'surat_15b', 'surat_15c'] },
  '8a77eb51f14aef6362d87b97dcc2de281d2d2cacf2e7bb2dfef32b87c26180e8': { client: '288/PKS-ART-TM/X/2026', role: 'arthera', name: 'Lilis Suganda, S.H., M.H.',
    docs: ['surat_b1', 'surat_15b'] }
};

var SIGN_SUBFOLDER = 'Tanda Tangan Elektronik';
var STATUS_FILE = 'status-tte.json';
var ARCHIVE_FOLDER = '_Arsip';
var MAX_BYTES = 15 * 1024 * 1024;
var ROLE_FILE = { klien: 'Klien', arthera: 'Arthera' };

function doGet() {
  return json_({ ok: true, service: 'Arthera tanda tangan elektronik' });
}

function doPost(e) {
  try {
    var req = JSON.parse(e.postData.contents);
    var link = SIGN_LINKS[hash_(String(req.token || ''))];
    if (!link) return json_({ ok: false, error: 'Link tanda tangan tidak berlaku.' });
    var client = CLIENTS[link.client];
    if (!client) return json_({ ok: false, error: 'Folder klien belum disiapkan Admin Arthera.' });
    var folder = DriveApp.getFolderById(client.signFolder);

    if (req.kind === 'status') return json_({ ok: true, status: readStatus_(folder, link) });

    if (link.docs.indexOf(req.docKey) === -1 || !DOCS[req.docKey]) return json_({ ok: false, error: 'Dokumen ini tidak termasuk dalam link Anda.' });
    var lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      var st = loadStatus_(folder);
      st[req.docKey] = st[req.docKey] || {};
      var stamp = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'dd/MM/yyyy HH.mm') + ' WIB';

      if (req.kind === 'sign') {
        var m = /^data:image\/png;base64,(.+)$/.exec(String(req.img || ''));
        if (!m) return json_({ ok: false, error: 'Gambar tanda tangan tidak valid.' });
        var bytes = Utilities.base64Decode(m[1]);
        if (bytes.length > 2 * 1024 * 1024) return json_({ ok: false, error: 'Gambar tanda tangan terlalu besar.' });
        var sub = subfolder_(folder, SIGN_SUBFOLDER);
        var base = 'TTE ' + DOCS[req.docKey] + ' - ' + ROLE_FILE[link.role];
        archiveOld_(sub, base);
        var f = sub.createFile(Utilities.newBlob(bytes, 'image/png', base + '.png'));
        f.setDescription('Ditandatangani elektronik oleh ' + String(req.name || link.name).slice(0, 120) +
          ' pada ' + stamp + ' (waktu perangkat: ' + String(req.at || '').slice(0, 60) + ')');
        st[req.docKey][link.role] = { name: String(req.name || link.name).slice(0, 120), at: stamp, fileId: f.getId() };
        saveStatus_(folder, st);
        return json_({ ok: true, at: stamp });
      }

      if (req.kind === 'meterai') {
        if (link.role !== 'klien') return json_({ ok: false, error: 'e-Meterai hanya dikirim oleh klien.' });
        if (!/\.pdf$/i.test(String(req.fileName || '')) || !req.dataBase64) return json_({ ok: false, error: 'Berkas harus PDF.' });
        var pdf = Utilities.base64Decode(req.dataBase64);
        if (pdf.length > MAX_BYTES) return json_({ ok: false, error: 'Ukuran berkas melebihi 15 MB.' });
        var name = DOCS[req.docKey] + ' (TTE + e-Meterai)';
        archiveOld_(folder, name);
        var p = folder.createFile(Utilities.newBlob(pdf, 'application/pdf', name + '.pdf'));
        p.setDescription('Dikirim klien lewat link tanda tangan pada ' + stamp + ' · Nama asli: ' + String(req.fileName).slice(0, 200));
        st[req.docKey].meterai = { fileName: name + '.pdf', at: stamp, fileId: p.getId() };
        saveStatus_(folder, st);
        return json_({ ok: true, fileName: name + '.pdf', at: stamp });
      }
      return json_({ ok: false, error: 'Permintaan tidak dikenal.' });
    } finally {
      lock.releaseLock();
    }
  } catch (err) {
    return json_({ ok: false, error: 'Gagal memproses: ' + err.message });
  }
}

/** Status untuk dokumen dalam link ini, beserta gambar tanda tangan agar tampil di dokumen. */
function readStatus_(folder, link) {
  var st = loadStatus_(folder), out = {};
  link.docs.forEach(function (k) {
    if (!st[k]) return;
    out[k] = {};
    ['klien', 'arthera'].forEach(function (r) {
      var s = st[k][r];
      if (!s) return;
      var img = null;
      try { img = 'data:image/png;base64,' + Utilities.base64Encode(DriveApp.getFileById(s.fileId).getBlob().getBytes()); } catch (e) {}
      out[k][r] = { name: s.name, at: s.at, img: img };
    });
    if (st[k].meterai) out[k].meterai = { fileName: st[k].meterai.fileName, at: st[k].meterai.at };
  });
  return out;
}

function loadStatus_(folder) {
  var it = folder.getFilesByName(STATUS_FILE);
  return it.hasNext() ? JSON.parse(it.next().getBlob().getDataAsString()) : {};
}

function saveStatus_(folder, st) {
  var it = folder.getFilesByName(STATUS_FILE);
  var body = JSON.stringify(st, null, 1);
  if (it.hasNext()) it.next().setContent(body);
  else folder.createFile(STATUS_FILE, body, 'application/json');
}

function subfolder_(folder, name) {
  var it = folder.getFoldersByName(name);
  return it.hasNext() ? it.next() : folder.createFolder(name);
}

/** Memindahkan versi lama berkas yang sama ke subfolder "_Arsip" dengan cap waktu. */
function archiveOld_(folder, baseName) {
  var files = folder.getFiles(), old = [];
  while (files.hasNext()) {
    var f = files.next();
    if (f.getName().replace(/\.[A-Za-z0-9]+$/, '') === baseName) old.push(f);
  }
  if (!old.length) return;
  var archive = subfolder_(folder, ARCHIVE_FOLDER);
  var stamp = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd HH.mm.ss');
  old.forEach(function (f) {
    var n = f.getName(), dot = n.lastIndexOf('.');
    f.setName(n.slice(0, dot) + ' (diganti ' + stamp + ')' + n.slice(dot));
    f.moveTo(archive);
  });
}

function hash_(s) {
  var d = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, 'arthera-sign|' + s, Utilities.Charset.UTF_8);
  return d.map(function (b) { return ('0' + (b & 0xff).toString(16)).slice(-2); }).join('');
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
