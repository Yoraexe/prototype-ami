<script lang="ts">
  import { auth } from '$lib/state/auth.svelte';
</script>

<svelte:head>
  <title>Pelacakan Temuan | AMIPro</title>
</svelte:head>

<div class="space-y-6">
  <div class="flex justify-between items-center">
    <div>
      <h1 class="text-3xl font-bold text-text-main">Pelacakan Temuan & RTL</h1>
      <p class="text-text-muted mt-1">Kelola Rencana Tindak Lanjut dari Prodi.</p>
    </div>
  </div>

  <!-- Status Tabs -->
  <div class="flex space-x-4 border-b border-gray-200">
    <button class="px-4 py-2 border-b-2 border-primary text-primary font-semibold">Semua Temuan</button>
    <button class="px-4 py-2 border-b-2 border-transparent text-text-muted hover:text-text-main">Menunggu RTL (Open)</button>
    <button class="px-4 py-2 border-b-2 border-transparent text-text-muted hover:text-text-main">Perlu Reviu Auditor</button>
    <button class="px-4 py-2 border-b-2 border-transparent text-status-error font-semibold hover:text-red-800">Overdue</button>
  </div>

  <div class="space-y-4">
    <!-- Item 1 (KTS - Menunggu Review) -->
    <div class="bg-surface rounded-xl shadow-soft p-6 border-l-4 border-status-error">
      <div class="flex justify-between items-start">
        <div class="flex-1">
          <div class="flex items-center space-x-3 mb-2">
            <span class="px-2 py-1 bg-red-100 text-red-800 text-xs font-bold rounded">KTS</span>
            <span class="text-sm font-semibold text-text-muted">Prodi Sistem Informasi</span>
            <span class="text-sm text-gray-400">•</span>
            <span class="text-sm font-semibold text-text-muted">IKU-3.1</span>
          </div>
          <h2 class="text-lg font-bold text-text-main">Dosen berkegiatan di luar kampus mencari pengalaman industri.</h2>
          <p class="text-text-muted mt-2"><strong>Deskripsi Auditor:</strong> Bukti yang dilampirkan hanya mencakup 1 dosen, tidak memenuhi target minimal 3 dosen.</p>
          
          <div class="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div class="flex items-center space-x-2 mb-2">
              <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded">Waiting Auditor Review</span>
              <span class="text-xs text-text-muted">Dikirim oleh Auditee pada 15 Nov 2025</span>
            </div>
            <p class="text-sm text-text-main"><strong>Rencana Tindak Lanjut:</strong> Kami akan segera mengirimkan SK penugasan 2 dosen tambahan yang saat ini sedang diproses di rektorat.</p>
            <a href="#" class="text-sm text-primary hover:underline mt-2 inline-block">Lihat Lampiran Bukti Baru ➔</a>
            {#if auth.user?.role === 'Auditee'}
              <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Update RTL & Lampiran Baru</label>
                <textarea class="w-full p-2 border border-gray-300 rounded" rows="2" placeholder="Tulis progress terbaru..."></textarea>
                <button class="mt-2 px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary-dark">Kirim Update RTL</button>
              </div>
            {/if}
          </div>
        </div>
        
        {#if auth.user?.role === 'Auditor'}
        <div class="ml-6 flex flex-col space-y-2 w-32">
          <button class="px-4 py-2 bg-status-success text-white text-sm font-bold rounded-lg hover:bg-green-600 transition-colors">Setujui & Tutup</button>
          <button class="px-4 py-2 bg-white border border-status-error text-status-error text-sm font-bold rounded-lg hover:bg-red-50 transition-colors">Tolak RTL</button>
        </div>
        {/if}
      </div>
    </div>

    <!-- Item 2 (OB - Closed) -->
    <div class="bg-surface rounded-xl shadow-soft p-6 border-l-4 border-status-info opacity-75">
      <div class="flex justify-between items-start">
        <div class="flex-1">
          <div class="flex items-center space-x-3 mb-2">
            <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded">OB</span>
            <span class="text-sm font-semibold text-text-muted">Prodi Sistem Informasi</span>
            <span class="text-sm text-gray-400">•</span>
            <span class="text-sm font-semibold text-text-muted">OBE-A1</span>
          </div>
          <h2 class="text-lg font-bold text-text-main">Kurikulum program studi memuat CPL yang jelas dan terukur.</h2>
          
          <div class="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <span class="px-2 py-1 bg-green-100 text-green-800 text-xs font-bold rounded mb-2 inline-block">Closed</span>
            <p class="text-sm text-text-main">Temuan telah diselesaikan pada 10 Nov 2025.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
