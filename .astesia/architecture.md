# System Architecture
**Project Name:** Prototype AMI
**Version:** 1.0

## 1. Overview & Pattern
* **Core Pattern:** Fullstack Server-Side Rendered (SSR) Layered Architecture. Controller logic ditangani oleh SvelteKit Route Loaders/Actions, memanggil layer Service, yang memanggil layer Repository.
* **Monolith vs Microservices:** Monolith Terpadu. *Trade-off:* Ini adalah *prototype* awal, memisahkan API backend dan Frontend SPA hanya akan melipatgandakan *development time* dan *DevOps overhead*. SvelteKit mampu menjadi API *gateway* dan penyaji UI dalam satu *runtime* dengan tingkat keamanan tinggi (secret tidak bocor ke client).
* **Scaling Strategy:** Karena berbasis stateless, aplikasi ini 100% siap di- *deploy* secara *serverless* (misalnya di Vercel) dan mudah diskalakan tanpa masalah persistensi data lokal.

## 2. Tech Stack
| Layer | Tech |
| :--- | :--- |
| **Frontend** | SvelteKit, TailwindCSS (menggunakan Design Tokens `design-system.md`), Zod (Validasi Form) |
| **Backend** | SvelteKit (Server Routes `+page.server.ts`), Node.js (Serverless) |
| **Database** | Supabase (PostgreSQL), Drizzle ORM |
| **Infra/Cloud** | Vercel (Serverless Edge/Node) |

## 3. Data Flow
1. **Client:** Mengakses UI (Form Instrumen).
2. **SvelteKit Server Action:** Menerima *POST request* submit skor. Zod melakukan validasi *payload*.
3. **Service Layer (`src/lib/server/services/audit.ts`):** Menghitung skor total. Jika rata-rata indikator < 3, Service akan me- *trigger* pembuatan status Temuan (KTS/OB) secara otomatis, memenuhi aturan "Dynamic Form Engine".
4. **Repository Layer (`src/lib/server/db/repos/`):** Mengeksekusi *query* insert ke tabel `audit_scores` dan `audit_findings` menggunakan Drizzle.
5. **Database:** Supabase PostgreSQL menyimpannya secara transaksional (Rollback jika gagal).

## 4. Struktur Database Inti
Skema database (*tables* dan *relations*) akan mengikuti secara presisi **Data Model** yang telah didefinisikan pada **Bagian 3 di dokumen `brd_ami_v2.md`**. Drizzle ORM akan memetakan tabel bahasa Inggris (contoh: `audit_periods` untuk `Periode`, `audit_assignments` untuk `Penugasan`, `audit_scores` untuk `SkorPoin`) secara 1:1 tanpa menyimpang dari *Business Rules*.

## 5. Security Architecture
* **Authentication:** Session-based (Cookies httpOnly), disimulasikan dengan *mock login* (karena SISTER SSO out of scope).
* **Authorization:** Pengecekan *Role* (BPM, Auditor, Auditee) di setiap *Server Load Function*.

## 6. Architecture Decision Records (ADR)
* **ADR 001: Penggunaan Supabase (PostgreSQL) untuk Prototype**
  * **Context:** Mengingat deployment akan menggunakan Vercel (Serverless), database lokal seperti SQLite tidak dapat mempertahankan data secara persisten antar *request*.
  * **Decision:** Menggunakan Supabase (PostgreSQL) sebagai *remote serverless database* yang kompatibel sepenuhnya dengan lingkungan Vercel.
  * **Consequences:** Kita dapat mempertahankan stabilitas data, menggunakan kemampuan relasional PostgreSQL yang *powerful*, dan sangat mudah untuk beralih atau meningkatkan *tier* di masa depan. Kita akan menggunakan Drizzle ORM dengan *driver* Postgres (`postgres.js`).
