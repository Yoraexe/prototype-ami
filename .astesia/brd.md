# Business Requirement Document (BRD)
**Nama Proyek:** Prototype AMI (Audit Mutu Internal)  
**Versi:** 2.0  
**Tanggal Revisi:** 2 Juni 2026  
**Status:** Draft — Siap Review Tim Pengembang

---

## Daftar Isi

1. [Executive Summary & Objective](#1-executive-summary--objective)
2. [Target Users & Stakeholders](#2-target-users--stakeholders)
3. [Data Model](#3-data-model)
4. [Core Features & Business Rules](#4-core-features--business-rules)
   - 4.0 [Manajemen Periode & Penugasan](#40-manajemen-periode--penugasan)
   - 4.1 [Manajemen Instrumen Dinamis & Integrasi](#41-manajemen-instrumen-dinamis--integrasi)
   - 4.2 [Pelaksanaan Audit & Scoring](#42-pelaksanaan-audit--scoring)
   - 4.3 [Pelacakan Temuan & RTL](#43-pelacakan-temuan-rencana-tindak-lanjut)
   - 4.4 [Berita Acara Audit & Dashboard Eksekutif](#44-berita-acara-audit--dashboard-eksekutif)
5. [Critical User Journeys (CUJ)](#5-critical-user-journeys-cuj)
6. [Non-Functional Requirements (NFR)](#6-non-functional-requirements-nfr)
7. [RBAC — Matriks Hak Akses](#7-rbac--matriks-hak-akses)
8. [Out of Scope](#8-out-of-scope)
9. [Glossary / Istilah](#9-glossary--istilah)
10. [Asumsi Teknis](#10-asumsi-teknis)

---

## 1. Executive Summary & Objective

**Problem Statement:**
Proses AMI (Audit Mutu Internal) seringkali bersifat manual dan terpisah-pisah, sehingga menyulitkan pelacakan temuan, serta tidak sinkron dengan indikator mutu utama institusi (OBE, IKU, SISTER).

**Primary Objective:**
Membangun prototipe sistem AMI yang mengintegrasikan instrumen audit dengan data OBE, IKU, dan SISTER secara terpusat, memfasilitasi pelaksanaan audit (scoring), serta menyediakan pelacakan temuan (Rencana Tindak Lanjut / RTL) *end-to-end* secara digital.

**Definisi "Patuh" (untuk keperluan dashboard):**
Sebuah Prodi dinyatakan **Patuh** apabila seluruh kondisi berikut terpenuhi:
- Semua poin instrumen telah diberi skor oleh Auditor.
- Tidak ada Temuan dengan status selain `Closed`.
- Berita Acara Audit (BAA) telah disetujui oleh kedua pihak (Auditor dan Auditee).

---

## 2. Target Users & Stakeholders

| User Role | Tanggung Jawab / Tujuan | Permission Level |
| :--- | :--- | :--- |
| **Kepala BPM** | Mengelola data master (Instrumen, User, Periode Audit), memantau dashboard hasil audit secara keseluruhan, serta memonitor progres temuan dan kepatuhan seluruh Prodi. | Admin / Superuser |
| **Auditor** | Melakukan evaluasi terhadap dokumen Auditee, mengisi skor instrumen audit, mencatatkan temuan audit (KTS/OB) beserta rekomendasinya, dan mereviu RTL dari Auditee. | Auditor |
| **Auditee (Prodi)** | Mengunggah dokumen bukti/kinerja, melihat hasil audit, menanggapi temuan dengan memberikan Rencana Tindak Lanjut (RTL), dan menandatangani BAA secara digital. Dalam MVP, satu Prodi = satu akun Auditee. |  Auditee |

> **Catatan MVP:** Dalam versi prototipe ini, satu akun Auditee mewakili satu Prodi secara keseluruhan. Sub-role (Kepala Prodi vs Staf Prodi) tidak diimplementasikan di MVP.

> **Aturan Konflik Kepentingan:** Auditor tidak dapat ditugaskan untuk mengaudit unit/Prodi di mana ia juga terdaftar sebagai Auditee.

---

## 3. Data Model

Bagian ini mendefinisikan entitas data utama beserta atribut wajib dan relasi antar entitas.

### 3.1 Entitas Utama

#### `Periode`
Merepresentasikan satu siklus audit (misal: Semester Gasal 2025/2026).

| Atribut | Tipe | Keterangan |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `nama` | String | Contoh: "AMI Semester Gasal 2025/2026" |
| `tanggal_mulai` | Date | Tanggal periode audit dibuka |
| `tanggal_selesai` | Date | Batas akhir pengisian audit oleh Auditor |
| `status` | Enum | `Draft` → `Aktif` → `Selesai` → `Dikunci` |
| `dibuat_oleh` | FK → User | Kepala BPM yang membuat periode |

---

#### `Instrumen`
Template checklist audit yang digunakan dalam satu periode.

| Atribut | Tipe | Keterangan |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `periode_id` | FK → Periode | Instrumen terikat ke satu periode |
| `nama` | String | Nama instrumen |
| `versi` | Integer | Auto-increment saat instrumen diedit |
| `dikunci` | Boolean | `true` saat periode berstatus `Aktif` |

---

#### `PoinInstrumen`
Satu butir pertanyaan/indikator dalam sebuah instrumen.

| Atribut | Tipe | Keterangan |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `instrumen_id` | FK → Instrumen | Poin terikat ke instrumen |
| `kode` | String | Contoh: "STD-1.1", "IKU-3.2" |
| `pertanyaan` | Text | Teks pertanyaan/indikator |
| `bobot` | Decimal | Bobot relatif poin ini |
| `kategori` | String | Contoh: "OBE", "IKU", "SISTER", "Umum" |
| `urutan` | Integer | Urutan tampil dalam form |

---

#### `Penugasan`
Pemetaan Auditor ke Prodi dalam satu periode.

| Atribut | Tipe | Keterangan |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `periode_id` | FK → Periode | |
| `auditor_id` | FK → User | User dengan role Auditor |
| `auditee_id` | FK → User | User dengan role Auditee (Prodi) |
| `status` | Enum | `Belum Dimulai` → `In Progress` → `Audit Completed` → `BAA Approved` |

> **Constraint:** `auditor_id` ≠ `auditee_id` dan auditor tidak boleh berasal dari Prodi yang sama dengan auditee.

---

#### `HasilAudit`
Rekap skor satu Auditor terhadap satu Prodi untuk satu periode.

| Atribut | Tipe | Keterangan |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `penugasan_id` | FK → Penugasan | |
| `status` | Enum | `Draft` → `Final` |
| `submit_at` | Timestamp | Waktu Auditor melakukan submit final |
| `total_skor` | Decimal | Kalkulasi otomatis dari seluruh SkorPoin |
| `auditor_terakhir` | FK → User | Auditor yang melakukan finalisasi (untuk BAA) |

---

#### `SkorPoin`
Nilai yang diberikan Auditor untuk satu poin instrumen.

| Atribut | Tipe | Keterangan |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `hasil_audit_id` | FK → HasilAudit | |
| `poin_instrumen_id` | FK → PoinInstrumen | |
| `skor` | Integer | Nilai 1–4 (lihat definisi di §4.2) |
| `catatan_auditor` | Text | Opsional, narasi Auditor |
| `bukti_url` | String | URL dokumen bukti dari Auditee |
| `auto_saved_at` | Timestamp | Waktu auto-save terakhir |

---

#### `Temuan`
Catatan ketidaksesuaian atau observasi yang harus ditindaklanjuti.

| Atribut | Tipe | Keterangan |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `skor_poin_id` | FK → SkorPoin | Temuan berasal dari poin tertentu |
| `jenis` | Enum | `KTS` (Ketidaksesuaian) \| `OB` (Observasi) |
| `deskripsi` | Text | Penjelasan temuan oleh Auditor |
| `rekomendasi` | Text | Saran Auditor |
| `status` | Enum | `Open` → `Waiting Auditor Review` → `Closed` \| `Overdue` |
| `batas_waktu` | Date | Deadline RTL dari Auditee |
| `catatan_penolakan` | Text | Diisi jika Auditor menolak RTL |

---

#### `RTL` (Rencana Tindak Lanjut)
Respons Auditee terhadap sebuah temuan.

| Atribut | Tipe | Keterangan |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `temuan_id` | FK → Temuan | |
| `deskripsi_tindakan` | Text | Rencana aksi dari Auditee |
| `target_selesai` | Date | Estimasi penyelesaian |
| `bukti_url` | String | URL dokumen bukti tindak lanjut |
| `submitted_at` | Timestamp | |
| `revisi_ke` | Integer | Nomor iterasi RTL (mulai dari 1) |

---

#### `BAA` (Berita Acara Audit)

| Atribut | Tipe | Keterangan |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `penugasan_id` | FK → Penugasan | 1:1 per penugasan |
| `generated_at` | Timestamp | Waktu generate otomatis sistem |
| `disetujui_auditor_at` | Timestamp | Nullable |
| `disetujui_auditee_at` | Timestamp | Nullable |
| `ditolak_oleh` | Enum | Nullable: `Auditor` \| `Auditee` |
| `catatan_penolakan_baa` | Text | Nullable |
| `status` | Enum | `Draft` → `Menunggu Persetujuan` → `Disetujui` \| `Ditolak` |

---

### 3.2 Relasi Ringkas

```
Periode ──< Instrumen ──< PoinInstrumen
Periode ──< Penugasan (User Auditor >── Penugasan ──< User Auditee)
Penugasan ──── HasilAudit ──< SkorPoin ──< Temuan ──< RTL
Penugasan ──── BAA
```

---

## 4. Core Features & Business Rules

### 4.0 Manajemen Periode & Penugasan

**Deskripsi:**
Kepala BPM mengelola siklus hidup penuh sebuah periode audit: pembuatan, penugasan Auditor ke Prodi, pengaktifan, dan penutupan.

**Siklus Status Periode:**

```
Draft → Aktif → Selesai → Dikunci
```

- **Draft:** Instrumen dan penugasan masih bisa diedit. Audit belum bisa dimulai.
- **Aktif:** Instrumen terkunci. Auditor dapat mulai mengisi skor. Penugasan baru masih bisa ditambah.
- **Selesai:** Seluruh Penugasan berstatus `BAA Approved`. Dashboard final tersedia.
- **Dikunci:** Tidak ada perubahan data apapun yang diizinkan. Status permanen.

**Business Rules:**
- Satu Periode dapat memiliki banyak Penugasan (banyak pasangan Auditor–Prodi).
- Satu Auditor dapat ditugaskan ke lebih dari satu Prodi dalam periode yang sama.
- Satu Prodi hanya boleh memiliki satu Penugasan aktif per periode.
- Kepala BPM dapat mengganti Auditor di tengah periode selama status Penugasan belum `BAA Approved`. Nama yang tercantum di BAA adalah `auditor_terakhir` (Auditor yang melakukan submit final).

**Acceptance Criteria:**
1. *Given* Kepala BPM membuat Periode baru, *Then* status awal adalah `Draft` dan belum ada instrumen terkait.
2. *Given* Kepala BPM mengaktifkan Periode, *Then* semua instrumen terkunci dan Auditor dapat mulai mengisi form.
3. *Given* Kepala BPM menambah Penugasan dengan `auditor_id` yang sama dengan `auditee_id`, *Then* sistem menolak dengan pesan "Auditor tidak dapat mengaudit unitnya sendiri."
4. *Given* Kepala BPM mencoba mengubah penugasan pada Periode berstatus `Dikunci`, *Then* sistem menolak permintaan.

**Edge Cases:**
- Jika semua Penugasan dalam satu Periode berstatus `BAA Approved`, sistem secara otomatis mengubah status Periode menjadi `Selesai`.

---

### 4.1 Manajemen Instrumen Dinamis & Integrasi

**Deskripsi:**
Sistem menyediakan instrumen audit berupa daftar tilik (*checklist*) yang **dinamis**. Poin-poin pertanyaan, bobot, dan indikator tidak di-*hardcode* sehingga tahan terhadap perubahan kebijakan. Instrumen ini juga dapat diselaraskan dengan parameter OBE, IKU, dan SISTER melalui mekanisme import file.

**7 Dokumen Auto-Generated:**
Berdasarkan hasil pengisian skor dari satu instrumen dinamis, sistem menghasilkan 7 dokumen secara otomatis:

| No | Dokumen | Kondisi Generate |
| :--- | :--- | :--- |
| 1 | **Daftar Tilik** | Selalu tersedia; ditampilkan dinamis dari konfigurasi Admin |
| 2 | **HAL** (Hasil Audit Lengkap) | Di-generate setelah semua poin diberi skor |
| 3 | **HAL-KS** (Kesesuaian) | Dihasilkan otomatis untuk PoinInstrumen dengan skor **≥ 3** |
| 4 | **HAL-KTS** (Ketidaksesuaian) | Ditarik otomatis dari PoinInstrumen dengan skor **< 3** (skor 1 atau 2) |
| 5 | **PTK** (Form RTL untuk KTS) | Terbuka otomatis jika ada HAL-KTS |
| 6 | **PTP** (Form untuk Observasi) | Terbuka jika ada Temuan berjenis `OB` |
| 7 | **Berita Acara Audit (BAA)** | Di-generate setelah semua PTK/PTP selesai dan tidak ada Temuan berstatus `Open` |

**Skema File Import SISTER/OBE/IKU:**
Sistem menerima file **CSV (UTF-8)** dengan spesifikasi kolom berikut:

| Kolom | Tipe | Wajib | Keterangan |
| :--- | :--- | :--- | :--- |
| `kode` | String | ✅ | Kode unik indikator. Contoh: `IKU-3`, `OBE-C5` |
| `pertanyaan` | String | ✅ | Teks pertanyaan/indikator |
| `kategori` | String | ✅ | Nilai: `OBE`, `IKU`, atau `SISTER` |
| `bobot` | Decimal | ✅ | Nilai 0.0 – 1.0, total bobot per instrumen = 1.0 |
| `urutan` | Integer | ❌ | Opsional; jika kosong, diurutkan berdasarkan baris |

> Contoh baris CSV: `IKU-3,"Persentase lulusan yang bekerja dalam 6 bulan",IKU,0.15,3`

**Business Rules:**
- Admin (Kepala BPM) dapat mengonfigurasi (menambah/mengubah) PoinInstrumen selama status Periode masih `Draft`.
- Begitu Periode berubah menjadi `Aktif`, seluruh instrumen terkunci (`dikunci = true`) dan tidak dapat dimodifikasi.
- Admin dapat mengimpor file CSV SISTER/OBE/IKU untuk membuat template PoinInstrumen secara massal.

**Acceptance Criteria:**
1. *Given* Kepala BPM menambah PoinInstrumen baru, *Then* pertanyaan tersebut otomatis muncul pada form Auditor tanpa perlu mengubah kode sumber aplikasi.
2. *Given* Kepala BPM mengunggah file CSV dengan format yang benar, *Then* sistem berhasil membuat PoinInstrumen berdasarkan data tersebut dan menampilkan ringkasan: "X poin berhasil diimpor, Y poin duplikat dilewati."
3. *Given* status Periode adalah `Aktif`, *Then* tombol edit instrumen non-aktif dan sistem menampilkan label "Instrumen Terkunci."
4. *Given* Kepala BPM mencoba menghapus PoinInstrumen yang sudah memiliki SkorPoin terkait, *Then* sistem menolak dengan pesan "Poin ini sudah memiliki data penilaian dan tidak dapat dihapus."

**Edge Cases:**
- Jika format file CSV tidak sesuai skema (kolom wajib hilang atau tipe data salah), sistem menampilkan pesan error: "Format file tidak valid. Pastikan kolom `kode`, `pertanyaan`, `kategori`, dan `bobot` tersedia."
- Jika total bobot seluruh PoinInstrumen dalam satu instrumen tidak sama dengan 1.0, sistem menampilkan peringatan (bukan error): "Total bobot saat ini: 0.85. Harap sesuaikan sebelum mengaktifkan periode."

---

### 4.2 Pelaksanaan Audit & Scoring

**Deskripsi:**
Auditor mengisi form penilaian berdasarkan instrumen yang telah dialokasikan kepadanya untuk Prodi tertentu.

**Definisi Skala Skor (Baku — tidak dapat diubah):**

| Skor | Label | Keterangan |
| :--- | :--- | :--- |
| **1** | Tidak Ada | Tidak ada bukti sama sekali |
| **2** | Sebagian | Ada bukti namun belum memenuhi standar |
| **3** | Sesuai | Bukti ada dan memenuhi standar |
| **4** | Melampaui | Melampaui standar yang ditetapkan |

**Aturan Trigger Jenis Temuan:**

| Kondisi Skor | Aksi Wajib | Jenis Temuan |
| :--- | :--- | :--- |
| Skor = 1 atau 2 | Auditor **wajib** membuat Temuan | `KTS` (Ketidaksesuaian) |
| Skor = 3 dengan catatan khusus | Auditor **boleh** membuat Temuan | `OB` (Observasi) |
| Skor = 4 | Tidak ada temuan | — |

**Business Rules:**
- Auditor hanya dapat melihat dan mengisi Penugasan yang dialokasikan kepadanya.
- Auditee dapat mengunggah bukti (`bukti_url`) untuk setiap PoinInstrumen sebelum Auditor memberi nilai.
- Skor yang sudah di-submit final tidak dapat diubah.
- Sistem melakukan **auto-save** setiap **30 detik** ke server (bukan localStorage). Indikator status tampil di UI: *"Tersimpan otomatis pukul 14:32"* atau *"Menyimpan..."*.

**Acceptance Criteria:**
1. *Given* Auditor login, *Then* mereka hanya melihat daftar Prodi yang tertera dalam Penugasan miliknya di periode yang aktif.
2. *Given* Auditor menyimpan draf penilaian, *Then* status `HasilAudit` menjadi `Draft` dan skor masih bisa diubah.
3. *Given* Auditor mengisi skor 1 atau 2 pada sebuah poin, *Then* field "Temuan" menjadi wajib diisi sebelum bisa submit.
4. *Given* Auditor melakukan submit final, *Then* status `HasilAudit` berubah menjadi `Final`, skor tidak bisa diubah lagi, dan status `Penugasan` menjadi `Audit Completed`.
5. *Given* auto-save gagal (misal koneksi terputus), *Then* sistem menampilkan notifikasi kuning: "Gagal menyimpan otomatis. Coba simpan manual." tanpa menghapus data yang sudah diisi.

**Edge Cases:**
- Jika koneksi terputus saat Auditor mengisi form, data yang sudah diisi tetap ada di halaman. Saat koneksi kembali, auto-save dilanjutkan secara otomatis.
- Jika Auditor mencoba submit sementara masih ada PoinInstrumen yang belum diberi skor, sistem menampilkan pesan: "X poin belum dinilai. Selesaikan terlebih dahulu."

---

### 4.3 Pelacakan Temuan (Rencana Tindak Lanjut)

**Deskripsi:**
Pemantauan temuan Ketidaksesuaian (KTS) atau Observasi (OB) dari hasil audit hingga ditutup (*closed*).

**Siklus Status Temuan:**

```
Open → Waiting Auditor Review → Closed
  ↑____________Revisi______________|
                                    ↓ (jika melewati batas waktu)
                                  Overdue
```

**Business Rules:**
- Temuan berstatus `Open` saat pertama kali dibuat oleh Auditor.
- Auditee wajib mengisi RTL untuk setiap temuan berstatus `Open`.
- Setelah Auditee submit RTL, status Temuan otomatis berubah menjadi `Waiting Auditor Review`.
- Auditor mereviu RTL dan dapat: (a) **Menyetujui** → status `Closed`, atau (b) **Menolak** → status kembali `Open` disertai `catatan_penolakan`.
- Jika Auditee tidak merespons RTL hingga melewati `batas_waktu`, sistem secara otomatis mengubah label menjadi `Overdue` dan menampilkan notifikasi di dashboard Kepala BPM.
- Label `Overdue` adalah label visual tambahan; status tetap `Open`. Kepala BPM dapat mengekstensi `batas_waktu` jika diperlukan.

**Acceptance Criteria:**
1. *Given* skor poin = 1 atau 2, *Then* Auditor diwajibkan untuk membuat satu catatan Temuan sebelum bisa melanjutkan.
2. *Given* Auditee submit RTL, *Then* status Temuan berubah menjadi `Waiting Auditor Review` dan notifikasi muncul di dashboard Auditor.
3. *Given* Auditor menolak RTL, *Then* status Temuan kembali menjadi `Open`, `revisi_ke` bertambah 1, dan Auditee menerima notifikasi beserta `catatan_penolakan`.
4. *Given* `batas_waktu` Temuan telah terlewati dan status masih `Open`, *Then* Temuan ditandai `Overdue` di dashboard Kepala BPM.

**Edge Cases:**
- Jika Auditee mengajukan RTL ke-2 atau lebih (setelah ditolak), `revisi_ke` di-increment dan riwayat seluruh versi RTL tetap tersimpan.

---

### 4.4 Berita Acara Audit & Dashboard Eksekutif

**Deskripsi:**
Setelah seluruh temuan diselesaikan, sistem menghasilkan Berita Acara Audit (BAA) yang disetujui secara digital oleh Auditor dan Auditee. Sistem juga menyediakan Dashboard bagi Kepala BPM untuk melihat agregasi data mutu institusi.

#### Alur Persetujuan BAA

```
[Semua temuan Closed]
        ↓
[Sistem generate BAA — status: Draft]
        ↓
[Auditor mereview & klik "Setuju"]
        ↓
[Auditee mereview & klik "Setuju"]
        ↓
[Status BAA: Disetujui — Periode Prodi Dikunci]
```

**Urutan Approval:** Auditor menyetujui lebih dahulu, kemudian Auditee.

**Alur jika BAA Ditolak:**
- Jika **Auditor menolak** BAA: BAA kembali ke status `Draft`. Auditor dapat membuka kembali temuan yang relevan untuk direvisi, lalu generate ulang BAA.
- Jika **Auditee menolak** BAA setelah Auditor setuju: BAA kembali ke status `Draft`. Auditee wajib mencantumkan alasan penolakan di `catatan_penolakan_baa`. Notifikasi dikirim ke Auditor dan Kepala BPM.
- **Batas waktu persetujuan BAA:** 7 hari kalender setelah BAA di-generate. Jika melewati batas, Kepala BPM mendapat notifikasi untuk melakukan eskalasi manual.

**Business Rules:**
- Tombol "Generate BAA" hanya aktif jika: semua PoinInstrumen telah diberi skor **dan** tidak ada Temuan berstatus `Open` atau `Waiting Auditor Review`.
- BAA yang sudah berstatus `Disetujui` tidak dapat diubah. Periode audit untuk Prodi tersebut dikunci secara permanen.
- Nama Auditor yang tercetak di BAA adalah `auditor_terakhir` — Auditor yang melakukan submit final `HasilAudit`.

**Konten BAA (auto-generated):**
BAA berisi ringkasan: nama Prodi, nama Auditor, periode audit, total skor, daftar temuan KTS dan OB beserta RTL-nya, dan kolom tanda tangan digital.

**Dashboard Eksekutif — Metrik:**

| Widget | Formula / Keterangan |
| :--- | :--- |
| % Prodi Patuh | `(Jumlah Penugasan berstatus BAA Approved / Total Penugasan aktif) × 100%` |
| Prodi dengan temuan terbanyak | Ranking Prodi berdasarkan jumlah Temuan KTS + OB |
| Tren skor per periode | Grafik garis rata-rata skor per Prodi lintas periode |
| Status temuan real-time | Pie chart: Open / Waiting / Closed / Overdue |
| Daftar Overdue | Tabel Prodi + Temuan yang melewati batas waktu RTL |

**Acceptance Criteria:**
1. *Given* semua skor terisi dan tidak ada Temuan berstatus `Open` atau `Waiting Auditor Review`, *Then* tombol "Generate Berita Acara" aktif.
2. *Given* Auditor menyetujui BAA dan Auditee belum merespons setelah 7 hari, *Then* Kepala BPM menerima notifikasi di dashboard: "BAA [Prodi X] menunggu persetujuan Auditee — [N] hari."
3. *Given* Kepala BPM membuka Dashboard, *Then* mereka melihat persentase Prodi yang patuh, ranking Prodi dengan temuan terbanyak, dan daftar Temuan yang berstatus Overdue.
4. *Given* BAA berstatus `Disetujui`, *Then* status Penugasan berubah menjadi `BAA Approved` dan seluruh data untuk Penugasan tersebut tidak dapat diubah.

**Edge Cases:**
- Jika ada Auditor pengganti di tengah jalan, nama yang tercetak di BAA adalah Auditor yang melakukan finalisasi (`auditor_terakhir`), bukan Auditor yang ditugaskan pertama kali.

---

## 5. Critical User Journeys (CUJ)

### Journey 1: Setup Periode Audit (Kepala BPM)

1. Kepala BPM login → membuka menu "Periode Audit" → klik "Buat Periode Baru."
2. Mengisi nama periode, tanggal mulai, tanggal selesai → simpan (status: `Draft`).
3. Membuka menu "Instrumen" → menambah PoinInstrumen secara manual atau mengimpor file CSV SISTER/OBE/IKU.
4. Membuka menu "Penugasan" → menetapkan Auditor X ke Auditee/Prodi Y (sistem memvalidasi tidak ada konflik kepentingan).
5. Mengaktifkan periode (status: `Aktif`) → instrumen terkunci, audit dapat dimulai.

---

### Journey 2: Siklus Audit Penuh

1. **Auditee Y** login → melihat daftar PoinInstrumen yang harus disiapkan → mengunggah dokumen bukti untuk tiap poin (`bukti_url`).
2. **Auditor X** login → melihat Prodi Y dalam daftar tugasnya → membuka form penilaian.
3. Auditor X mereviu bukti yang diunggah Auditee → mengisi skor untuk setiap poin:
   - Poin dengan skor 1 atau 2: wajib mengisi form Temuan (jenis: `KTS`).
   - Poin dengan skor 3 yang perlu catatan: opsional mengisi Temuan (jenis: `OB`).
4. Auditor X melakukan submit final → status `HasilAudit` menjadi `Final`, status `Penugasan` menjadi `Audit Completed`.
5. **Auditee Y** melihat hasil audit dan daftar Temuan → mengisi RTL untuk setiap Temuan berstatus `Open` → submit.
6. **Auditor X** mereviu RTL:
   - Jika setuju: mengubah status Temuan menjadi `Closed`.
   - Jika menolak: menambah catatan dan mengembalikan status ke `Open`.
7. Setelah semua Temuan `Closed`: sistem mengaktifkan tombol "Generate BAA."
8. **Auditor X** mereview BAA → klik "Setuju."
9. **Auditee Y** mereview BAA → klik "Setuju."
10. Status `Penugasan` berubah menjadi `BAA Approved`. Data terkunci permanen.
11. **Kepala BPM** melihat dashboard: Prodi Y ditandai "Patuh," grafik performa diperbarui otomatis.

---

### Journey 3: Kepala BPM Memantau Dashboard

1. Kepala BPM login → membuka Dashboard Eksekutif.
2. Melihat widget persentase Prodi Patuh dan daftar Temuan Overdue.
3. Mengklik Prodi tertentu untuk melihat detail: skor per poin, daftar temuan, dan status RTL.
4. Jika ada Temuan Overdue: dapat mengekstensi `batas_waktu` RTL langsung dari dashboard.

---

## 6. Non-Functional Requirements (NFR)

| Kategori | Requirement |
| :--- | :--- |
| **Performance** | Halaman instrumen audit (yang mungkin berisi >100 poin) harus memuat dalam waktu kurang dari 2 detik pada koneksi 4G rata-rata. |
| **Auto-Save** | Sistem menyimpan draf SkorPoin ke server setiap **30 detik**. Penyimpanan bersifat server-side (bukan localStorage). Jika save gagal, UI menampilkan notifikasi non-blocking. |
| **Security** | Sistem mengimplementasikan Role-Based Access Control (RBAC) ketat sesuai matriks di §7. API divalidasi dengan **JWT** (autentikasi) dan **Zod** (validasi skema request body). |
| **Data Integrity** | Setiap aksi destructive (submit final, approve BAA) menggunakan mekanisme *optimistic locking* untuk mencegah race condition jika dua user mengakses data yang sama secara bersamaan. |
| **Audit Trail** | Seluruh perubahan status pada entitas `HasilAudit`, `Temuan`, dan `BAA` dicatat dalam log dengan timestamp dan `user_id` yang melakukan aksi. |

---

## 7. RBAC — Matriks Hak Akses

| Aksi | Kepala BPM | Auditor | Auditee |
| :--- | :---: | :---: | :---: |
| Buat/edit Periode | ✅ | ❌ | ❌ |
| Buat/edit Instrumen & PoinInstrumen | ✅ | ❌ | ❌ |
| Import file SISTER/OBE/IKU | ✅ | ❌ | ❌ |
| Buat/edit Penugasan | ✅ | ❌ | ❌ |
| Lihat semua data semua Prodi | ✅ | ❌ | ❌ |
| Lihat data Prodi yang ditugaskan | ✅ | ✅ | ❌ |
| Isi skor & buat Temuan | ❌ | ✅ | ❌ |
| Unggah bukti dokumen | ❌ | ❌ | ✅ |
| Lihat hasil audit Prodi sendiri | ✅ | ✅ | ✅ |
| Lihat hasil audit Prodi lain | ✅ | ❌ | ❌ |
| Submit RTL | ❌ | ❌ | ✅ |
| Reviu & tutup RTL | ❌ | ✅ | ❌ |
| Generate & approve BAA | ❌ | ✅ | ✅ (approve saja) |
| Akses Dashboard Eksekutif | ✅ | ❌ | ❌ |
| Ekstensi batas waktu RTL | ✅ | ❌ | ❌ |
| Export PDF (BAA, HAL) | ✅ | ✅ | ✅ |

> **Catatan:** Auditor hanya dapat melihat nama dan data Auditee/Prodi yang ditugaskan padanya. Identitas Auditor tidak ditampilkan kepada Auditee hingga Auditor melakukan submit final.

---

## 8. Out of Scope

Berikut ini **tidak termasuk** dalam MVP prototipe ini:

| Item | Keterangan |
| :--- | :--- |
| Real-time API Integration | SISTER API langsung, SSO Universitas, dll. Digantikan dengan data simulasi (import CSV). |
| Notifikasi Email / WhatsApp | Semua notifikasi hanya bersifat in-app (di dalam sistem). |
| Sub-role Auditee | Kepala Prodi vs Staf Prodi. Satu Prodi = satu akun dalam MVP. |
| Laporan Word (.docx) | Hanya export PDF sederhana yang disediakan untuk BAA dan HAL. |
| Multi-bahasa (i18n) | Sistem hanya tersedia dalam Bahasa Indonesia. |

**Dokumen yang dapat di-export ke PDF:**
- BAA (Berita Acara Audit)
- HAL (Hasil Audit Lengkap)
- HAL-KTS (Daftar Ketidaksesuaian)

---

## 9. Glossary / Istilah

| Istilah | Kepanjangan | Definisi |
| :--- | :--- | :--- |
| **AMI** | Audit Mutu Internal | Proses audit yang dilakukan secara internal untuk mengevaluasi pemenuhan standar mutu. |
| **BPM** | Badan Penjamin Mutu | Unit institusi yang bertanggung jawab atas pengelolaan dan pengawasan mutu. |
| **OBE** | Outcome-Based Education | Pendekatan pendidikan berbasis capaian pembelajaran; digunakan sebagai salah satu parameter instrumen audit. |
| **IKU** | Indikator Kinerja Utama | Indikator kinerja strategis perguruan tinggi yang ditetapkan oleh Kemendikbudristek. |
| **SISTER** | Sistem Informasi Sumber Daya Terintegrasi | Platform data dosen nasional dari Kemendikbudristek. |
| **KTS** | Ketidaksesuaian | Temuan audit di mana kondisi aktual tidak memenuhi standar yang ditetapkan (skor 1–2). |
| **OB** | Observasi | Temuan audit berupa catatan untuk perbaikan atau peningkatan (skor 3 dengan catatan). |
| **RTL** | Rencana Tindak Lanjut | Dokumen respons Auditee berisi rencana aksi untuk menutup temuan. |
| **HAL** | Hasil Audit Lengkap | Rekapitulasi total skor seluruh poin dalam satu sesi audit. |
| **HAL-KS** | HAL — Kesesuaian | Bagian HAL yang merangkum poin-poin dengan skor ≥ 3. |
| **HAL-KTS** | HAL — Ketidaksesuaian | Bagian HAL yang merangkum poin-poin dengan skor < 3. |
| **PTK** | Form Tindak Koreksi | Form RTL yang terbuka otomatis jika ada HAL-KTS. |
| **PTP** | Form Tindak Peningkatan | Form yang terbuka jika ada temuan berupa Observasi (OB). |
| **BAA** | Berita Acara Audit | Dokumen resmi penutup satu sesi audit yang ditandatangani digital oleh Auditor dan Auditee. |
| **Prodi** | Program Studi | Unit akademik yang menjadi subjek audit (Auditee). |
| **RBAC** | Role-Based Access Control | Sistem pembatasan akses berdasarkan peran pengguna. |
| **JWT** | JSON Web Token | Standar autentikasi berbasis token untuk API. |

---

## 10. Asumsi Teknis

Bagian ini mencatat asumsi arsitektur dasar untuk keperluan estimasi dan perencanaan sprint.

| Komponen | Asumsi |
| :--- | :--- |
| **Frontend** | React.js (SPA). State management dengan Zustand atau React Query. |
| **Backend** | Node.js + Express atau NestJS. RESTful API. |
| **Database** | PostgreSQL (relasional, mendukung UUID dan JSONB). |
| **Autentikasi** | JWT (access token + refresh token). Role disematkan dalam JWT payload. |
| **Validasi API** | Zod untuk validasi skema request body di setiap endpoint. |
| **Auto-Save** | Endpoint `PATCH /hasil-audit/:id/draft` dipanggil secara periodik dari frontend (interval 30 detik). Menggunakan debounce agar tidak membanjiri server. |
| **File Upload** | Bukti dokumen Auditee disimpan sebagai URL (link eksternal atau cloud storage). Upload file biner tidak termasuk scope MVP. |
| **Export PDF** | Menggunakan library server-side (misal: Puppeteer atau PDFKit) untuk generate PDF dari template HTML. |
| **Deployment** | Single-server (monolith) untuk MVP. Docker-compose untuk environment development. |

---

*Dokumen ini merupakan versi 2.0 hasil revisi dari BRD v1.0. Perubahan utama mencakup: penambahan Data Model (§3), penambahan fitur Manajemen Periode (§4.0), definisi baku skala skor, spesifikasi alur BAA lengkap, matriks RBAC, Glossary, dan Asumsi Teknis.*
