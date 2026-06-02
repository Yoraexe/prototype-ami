# Design System & UI Specs
**Project Name:** Prototype AMI
**Version:** 1.0

## 1. Global Tokens
### Colors (CSS / Tailwind Mapping)
Tema yang dipilih adalah **Modern Academic / Enterprise**, yang menonjolkan kepercayaan, kebersihan, dan kemudahan membaca data yang padat.

* **Primary (Brand):** `#1E3A8A` (Navy Blue) — Digunakan untuk Header, Tombol Utama, dan status "Telah Disetujui". Melambangkan institusi akademik.
* **Secondary (Accent):** `#3B82F6` (Blue 500) — Digunakan untuk *hover state* dan elemen interaktif.
* **Warning / Alert:** `#F59E0B` (Amber/Gold) — Sangat penting untuk menyorot Temuan (KTS/OB) yang membutuhkan perhatian (RTL).
* **Success:** `#10B981` (Emerald) — Untuk skor tinggi (Sesuai) atau penyelesaian audit.
* **Surface/Background:** `#F9FAFB` (Gray 50) — Warna latar belakang dashboard yang sangat terang agar tidak melelahkan mata auditor.
* **Surface (Card):** `#FFFFFF` (White) — Latar belakang formulir instrumen audit.
* **Text (Main):** `#1F2937` (Gray 800) — Kontras tinggi untuk teks pertanyaan instrumen (WCAG AA Compliant).
* **Text (Muted):** `#6B7280` (Gray 500) — Untuk instruksi tambahan.

### Typography (Google Fonts)
* **Heading Font:** `Inter` (Memberikan kesan modern, tebal, dan sangat jelas untuk judul laporan/dashboard).
* **Body Font:** `Inter` (Sangat optimal untuk membaca teks paragraf panjang pada bukti kinerja/RTL).

## 2. Components Library
### 2.1 Formulir Audit (Dynamic Input Card)
* **Style:** Memiliki *border* tipis `#E5E7EB`, *rounded corners* (rounded-lg), dan bayangan tipis (shadow-sm).
* **States:** 
  * *Hover:* Menampilkan indikator visual (border berubah menjadi `#3B82F6`) untuk menandakan baris pertanyaan yang sedang diisi auditor.
  * *Error:* Border merah `#EF4444` jika auditor lupa mengisi skor namun menekan "Submit".

### 2.2 Tombol (Buttons)
* **Variants:** 
  * **Primary:** Background `#1E3A8A`, Teks Putih. (Contoh: "Simpan Hasil Audit")
  * **Outline:** Border `#1E3A8A`, Teks `#1E3A8A`, Background Transparan. (Contoh: "Kembali")
  * **Danger:** Background `#EF4444`. (Contoh: "Tolak RTL")
* **States:** Default, Hover (Darken 10%), Active (Scale down 0.95), Disabled (Opacity 50%, unclickable).

### 2.3 Status Badge (Pills)
* Digunakan di Dashboard Kepala BPM untuk menandai status Prodi.
* **"Selesai (BAA)":** Background Hijau terang, Teks Hijau Tua.
* **"Menunggu RTL":** Background Kuning Terang, Teks Kuning Tua.
* **"Sedang Berjalan":** Background Biru Terang, Teks Biru Tua.

## 3. Screen Breakpoints
* **Mobile (sm):** 320px - 640px (Formulir instrumen akan di- *stack* vertikal, navigasi menjadi hamburger menu).
* **Tablet (md):** 641px - 1024px.
* **Desktop (lg):** 1025px+ (Layout *Sidebar* navigasi di kiri, Konten di kanan).
