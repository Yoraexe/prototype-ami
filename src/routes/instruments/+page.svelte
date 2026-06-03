<svelte:head>
  <title>Instrumen Dinamis | AMIPro</title>
</svelte:head>

<div class="space-y-6">
  <div class="flex justify-between items-center">
    <div>
      <h1 class="text-3xl font-bold text-text-main">Instrumen Dinamis</h1>
      <p class="text-text-muted mt-1">Konfigurasi daftar tilik dan parameter OBE/IKU/SISTER.</p>
    </div>
    <div class="flex space-x-3">
      <button class="px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors flex items-center">
        <span class="mr-2">🔄</span> Tarik Data API (SISTER/OBE)
      </button>
      <button class="px-4 py-2 bg-primary text-white font-semibold rounded-lg shadow hover:bg-primary-dark transition-colors">
        + Poin Baru
      </button>
    </div>
  </div>

  <div class="bg-yellow-50 border-l-4 border-status-warning p-4 rounded-r-lg">
    <div class="flex">
      <div class="flex-shrink-0">
        <span class="text-status-warning text-xl">⚠️</span>
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-yellow-800">Perhatian</h3>
        <div class="mt-2 text-sm text-yellow-700">
          <p>Anda sedang mengedit instrumen untuk <strong>Periode Draft (AMI Semester Gasal 2026/2027)</strong>. Instrumen yang terkunci tidak dapat diedit.</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Table -->
  <div class="bg-surface rounded-xl shadow-soft overflow-hidden">
    <table class="w-full text-left border-collapse">
      <thead>
        <tr class="bg-background border-b border-gray-200">
          <th class="py-4 px-6 font-semibold text-text-muted w-24">Kode</th>
          <th class="py-4 px-6 font-semibold text-text-muted">Kriteria / Pertanyaan</th>
          <th class="py-4 px-6 font-semibold text-text-muted w-24">Kategori</th>
          <th class="py-4 px-6 font-semibold text-text-muted w-24 text-center">Bobot</th>
          <th class="py-4 px-6 font-semibold text-text-muted text-right w-32">Aksi</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100">
        <tr class="hover:bg-gray-50 transition-colors">
          <td class="py-4 px-6 font-bold text-text-main">IKU-3.1</td>
          <td class="py-4 px-6 text-text-main">Dosen berkegiatan di luar kampus mencari pengalaman industri.</td>
          <td class="py-4 px-6">
            <span class="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-bold rounded">IKU</span>
          </td>
          <td class="py-4 px-6 text-center font-medium">0.15</td>
          <td class="py-4 px-6 text-right space-x-2">
            <button class="text-text-muted hover:text-primary font-medium text-sm">Edit</button>
            <button class="text-status-error hover:text-red-700 font-medium text-sm">Hapus</button>
          </td>
        </tr>
        <tr class="hover:bg-gray-50 transition-colors">
          <td class="py-4 px-6 font-bold text-text-main">OBE-A1</td>
          <td class="py-4 px-6 text-text-main">Kurikulum program studi memuat CPL (Capaian Pembelajaran Lulusan) yang jelas dan terukur.</td>
          <td class="py-4 px-6">
            <span class="px-2 py-1 bg-green-100 text-green-800 text-xs font-bold rounded">OBE</span>
          </td>
          <td class="py-4 px-6 text-center font-medium">0.20</td>
          <td class="py-4 px-6 text-right space-x-2">
            <button class="text-text-muted hover:text-primary font-medium text-sm">Edit</button>
            <button class="text-status-error hover:text-red-700 font-medium text-sm">Hapus</button>
          </td>
        </tr>
        <tr class="hover:bg-gray-50 transition-colors">
          <td class="py-4 px-6 font-bold text-text-main">STD-UM-1</td>
          <td class="py-4 px-6 text-text-main">Ketersediaan dokumen pedoman akademik yang disahkan pimpinan.</td>
          <td class="py-4 px-6">
            <span class="px-2 py-1 bg-gray-200 text-gray-800 text-xs font-bold rounded">Umum</span>
          </td>
          <td class="py-4 px-6 text-center font-medium">0.10</td>
          <td class="py-4 px-6 text-right space-x-2">
            <button class="text-text-muted hover:text-primary font-medium text-sm">Edit</button>
            <button class="text-status-error hover:text-red-700 font-medium text-sm">Hapus</button>
          </td>
        </tr>
      </tbody>
      <tfoot class="bg-gray-50 border-t border-gray-200">
        <tr>
          <td colspan="3" class="py-4 px-6 font-bold text-right text-text-main">Total Bobot:</td>
          <td class="py-4 px-6 text-center font-bold text-text-main">0.45</td>
          <td class="py-4 px-6">
            <span class="text-xs text-status-warning font-medium">Belum 1.0</span>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</div>
