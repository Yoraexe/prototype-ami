<svelte:head>
  <title>Periode Audit | AMIPro</title>
</svelte:head>

<div class="space-y-6">
  <div class="flex justify-between items-center">
    <div>
      <h1 class="text-3xl font-bold text-text-main">Manajemen Periode</h1>
      <p class="text-text-muted mt-1">Kelola siklus audit, dari Draft hingga Selesai.</p>
    </div>
    <button class="px-4 py-2 bg-primary text-white font-semibold rounded-lg shadow hover:bg-primary-dark transition-colors">
      + Buat Periode Baru
    </button>
  </div>

  <!-- Table -->
  <div class="bg-surface rounded-xl shadow-soft overflow-hidden">
    <table class="w-full text-left border-collapse">
      <thead>
        <tr class="bg-background border-b border-gray-200">
          <th class="py-4 px-6 font-semibold text-text-muted">Nama Periode</th>
          <th class="py-4 px-6 font-semibold text-text-muted">Tanggal Mulai</th>
          <th class="py-4 px-6 font-semibold text-text-muted">Tanggal Selesai</th>
          <th class="py-4 px-6 font-semibold text-text-muted">Status</th>
          <th class="py-4 px-6 font-semibold text-text-muted text-right">Aksi</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100">
        <tr class="hover:bg-gray-50 transition-colors">
          <td class="py-4 px-6 font-medium text-text-main">AMI Semester Gasal 2025/2026</td>
          <td class="py-4 px-6 text-text-muted">01 Sep 2025</td>
          <td class="py-4 px-6 text-text-muted">30 Nov 2025</td>
          <td class="py-4 px-6">
            <span class="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">Aktif</span>
          </td>
          <td class="py-4 px-6 text-right space-x-2">
            <button class="text-text-muted hover:text-primary font-medium text-sm">Lihat Penugasan</button>
            <button class="text-text-muted hover:text-primary font-medium text-sm">Edit</button>
          </td>
        </tr>
        <tr class="hover:bg-gray-50 transition-colors">
          <td class="py-4 px-6 font-medium text-text-main">AMI Semester Genap 2024/2025</td>
          <td class="py-4 px-6 text-text-muted">01 Mar 2025</td>
          <td class="py-4 px-6 text-text-muted">31 Mei 2025</td>
          <td class="py-4 px-6">
            <span class="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-bold rounded-full">Dikunci</span>
          </td>
          <td class="py-4 px-6 text-right space-x-2">
            <button class="text-text-muted hover:text-primary font-medium text-sm">Lihat Laporan</button>
          </td>
        </tr>
        <tr class="hover:bg-gray-50 transition-colors">
          <td class="py-4 px-6 font-medium text-text-main">AMI Semester Gasal 2026/2027</td>
          <td class="py-4 px-6 text-text-muted">Belum diset</td>
          <td class="py-4 px-6 text-text-muted">Belum diset</td>
          <td class="py-4 px-6">
            <span class="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full">Draft</span>
          </td>
          <td class="py-4 px-6 text-right space-x-2">
            <button class="text-primary hover:text-primary-dark font-medium text-sm">Aktifkan</button>
            <button class="text-text-muted hover:text-primary font-medium text-sm">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
