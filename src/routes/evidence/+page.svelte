<script lang="ts">
  import { auth } from '$lib/state/auth.svelte';

  let items = $state([
    {
      id: '1',
      code: 'IKU-3.1',
      question: 'Dosen berkegiatan di luar kampus mencari pengalaman industri.',
      category: 'IKU',
      evidenceUrl: 'https://gdrive.com/link-bukti-1.pdf',
      status: 'Terisi'
    },
    {
      id: '2',
      code: 'OBE-A1',
      question: 'Kurikulum program studi memuat CPL yang jelas dan terukur.',
      category: 'OBE',
      evidenceUrl: '',
      status: 'Kosong'
    }
  ]);
</script>

<svelte:head>
  <title>Unggah Bukti Kinerja | AMIPro</title>
</svelte:head>

<div class="space-y-6 max-w-5xl mx-auto">
  <div class="bg-surface p-6 rounded-xl shadow-soft">
    <div class="flex justify-between items-start">
      <div>
        <h1 class="text-2xl font-bold text-text-main">Unggah Bukti Kinerja (Borang)</h1>
        <p class="text-text-muted mt-1">Periode: <strong class="text-primary">AMI Semester Gasal 2025/2026</strong></p>
      </div>
      <div class="text-right">
        <span class="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full">Batas Waktu: 30 Okt 2025</span>
        <p class="text-xs text-text-muted mt-2">Progres: 1 dari 2 terisi</p>
      </div>
    </div>
  </div>

  <div class="bg-blue-50 border-l-4 border-status-info p-4 rounded-r-lg">
    <div class="flex">
      <span class="text-status-info text-xl mr-3">ℹ️</span>
      <p class="text-sm text-blue-800">Harap lampirkan tautan (Google Drive / OneDrive) yang dapat diakses oleh Auditor untuk masing-masing poin di bawah ini sebelum batas waktu berakhir.</p>
    </div>
  </div>

  <div class="space-y-6">
    {#each items as item}
      <div class="bg-surface rounded-xl shadow-soft border border-gray-100 overflow-hidden">
        <div class="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
          <div>
            <span class="px-2 py-1 bg-primary-light bg-opacity-20 text-primary-dark text-xs font-bold rounded mr-2">{item.code}</span>
            <span class="px-2 py-1 bg-gray-200 text-gray-700 text-xs font-bold rounded">{item.category}</span>
          </div>
          {#if item.evidenceUrl}
            <span class="text-xs font-bold text-status-success flex items-center">✅ Dokumen Terlampir</span>
          {:else}
            <span class="text-xs font-bold text-status-warning flex items-center">⚠️ Belum Ada Bukti</span>
          {/if}
        </div>
        
        <div class="p-5">
          <p class="text-lg font-medium text-text-main mb-4">{item.question}</p>
          
          <label class="block text-sm font-semibold text-gray-700 mb-2">Tautan Dokumen Bukti (URL)</label>
          <div class="flex space-x-3">
            <input 
              type="url" 
              bind:value={item.evidenceUrl}
              placeholder="Masukkan link Google Drive / folder bukti..."
              class="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
            />
            <button class="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors">
              Simpan Link
            </button>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <div class="flex justify-end pt-4 border-t border-gray-200">
    <button class="px-6 py-3 bg-status-success text-white font-bold rounded-xl shadow hover:bg-green-600 transition-colors">
      Kirim Borang ke Auditor
    </button>
  </div>
</div>
