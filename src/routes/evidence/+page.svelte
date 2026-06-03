  let items = $state([
    {
      id: '1',
      code: 'IKU-3.1',
      question: 'Berapa persen dosen berkegiatan di luar kampus?',
      category: 'SISTER',
      status: 'Terhubung',
      apiData: 'Target: 80% | Aktual: 55% | Dosen Publikasi: 11/20',
      isCompliant: false
    },
    {
      id: '2',
      code: 'OBE-A1',
      question: 'Kurikulum program studi memuat CPL yang jelas dan terukur.',
      category: 'OBE',
      status: 'Terhubung',
      apiData: 'Total MK: 45 | MK dgn CPL: 45',
      isCompliant: true
    }
  ]);
</script>

<svelte:head>
  <title>Tinjau Bukti Digital | AMIPro</title>
</svelte:head>

<div class="space-y-6 max-w-5xl mx-auto">
  <div class="bg-surface p-6 rounded-xl shadow-soft">
    <div class="flex justify-between items-start">
      <div>
        <h1 class="text-2xl font-bold text-text-main">Tinjauan Bukti Digital (API)</h1>
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
      <p class="text-sm text-blue-800">Bukti-bukti di bawah ini <strong>ditarik secara otomatis secara Real-Time</strong> dari API SISTER dan OBE. Anda (Auditee) hanya perlu memverifikasi apakah data yang ditarik sudah sesuai dengan data pusat sebelum diserahkan ke Auditor.</p>
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
          <span class="text-xs font-bold text-status-success flex items-center">✅ Data API Terhubung</span>
        </div>
        
        <div class="p-5">
          <p class="text-lg font-medium text-text-main mb-4">{item.question}</p>
          
          <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-sm">
            <p class="text-gray-500 mb-1">Response API ({item.category}):</p>
            <p class="text-gray-800 font-bold">{item.apiData}</p>
            
            <div class="mt-3 flex items-center">
              <span class="text-xs text-gray-500 mr-2">Estimasi Capaian:</span>
              {#if item.isCompliant}
                <span class="px-2 py-1 bg-green-100 text-green-800 text-xs font-bold rounded">Memenuhi Target</span>
              {:else}
                <span class="px-2 py-1 bg-red-100 text-red-800 text-xs font-bold rounded">Di Bawah Target (Berpotensi KTS)</span>
              {/if}
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <div class="flex justify-end pt-4 border-t border-gray-200">
    <button class="px-6 py-3 bg-status-success text-white font-bold rounded-xl shadow hover:bg-green-600 transition-colors">
      Setujui & Teruskan ke Auditor
    </button>
  </div>
</div>
