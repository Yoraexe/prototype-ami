<svelte:head>
  <title>Pelaksanaan Audit | AMIPro</title>
</svelte:head>

<script lang="ts">
  // Mock Data untuk keperluan UI Prototipe
  let instrumentItems = $state([
    {
      id: '1',
      code: 'IKU-3.1',
      question: 'Berapa persen dosen berkegiatan di luar kampus? (Target: 80%)',
      category: 'SISTER',
      evidenceUrl: '',
      score: 2,
      note: 'Target 80%, Aktual 55% (Berdasarkan data API SISTER).',
      showFindingForm: true,
      findingType: 'KTS',
      findingDescription: 'Persentase dosen berkegiatan di luar kampus berada di bawah target IKU.',
      findingRecommendation: '',
      autoScored: true,
      actualValue: '55%'
    },
    {
      id: '2',
      code: 'OBE-A1',
      question: 'Kurikulum program studi memuat CPL yang jelas dan terukur.',
      category: 'OBE',
      evidenceUrl: 'https://gdrive.com/link-bukti-2.pdf',
      score: null as number | null,
      note: '',
      showFindingForm: false,
      findingType: 'KTS',
      findingDescription: '',
      findingRecommendation: '',
      autoScored: false
    }
  ]);

  function handleScoreChange(index: number, newScore: number) {
    instrumentItems[index].score = newScore;
    
    // Logika Trigger Temuan Dinamis
    if (newScore === 1 || newScore === 2) {
      instrumentItems[index].showFindingForm = true;
      instrumentItems[index].findingType = 'KTS'; // Ketidaksesuaian (Wajib)
    } else if (newScore === 3) {
      // OB sifatnya opsional, kita munculkan toggle, tapi default false
      instrumentItems[index].showFindingForm = false; 
      instrumentItems[index].findingType = 'OB';
    } else {
      instrumentItems[index].showFindingForm = false;
    }
  }

  function toggleObForm(index: number) {
    instrumentItems[index].showFindingForm = !instrumentItems[index].showFindingForm;
  }
</script>

<div class="space-y-6 max-w-5xl mx-auto">
  <!-- Header Info -->
  <div class="bg-surface p-6 rounded-xl shadow-soft">
    <div class="flex justify-between items-start">
      <div>
        <h1 class="text-2xl font-bold text-text-main">Lembar Evaluasi Auditor</h1>
        <p class="text-text-muted mt-1">Mengaudit: <strong class="text-primary">Program Studi Sistem Informasi</strong></p>
      </div>
      <div class="text-right">
        <span class="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full">Status: In Progress</span>
        <p class="text-xs text-text-muted mt-2">Terakhir disimpan: 14:32</p>
      </div>
    </div>
  </div>

  <!-- Form List -->
  <div class="space-y-8">
    {#each instrumentItems as item, i}
      <div class="bg-surface rounded-xl shadow-soft border border-gray-100 overflow-hidden">
        
        <!-- Question Section -->
        <div class="p-6 border-b border-gray-100 bg-gray-50">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <span class="px-2 py-1 bg-primary-light bg-opacity-20 text-primary-dark text-xs font-bold rounded">{item.code}</span>
              <h2 class="text-lg font-semibold text-text-main mt-3">{item.question}</h2>
            </div>
            {#if item.evidenceUrl}
              <a href={item.evidenceUrl} target="_blank" class="ml-4 flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 text-sm font-medium text-text-muted transition-colors">
                <span>📄 Lihat Bukti</span>
              </a>
            {/if}
          </div>
        </div>

        <!-- Scoring Section -->
        <div class="p-6">
          <div class="flex justify-between items-center mb-3">
            <label class="block text-sm font-semibold text-text-main">Penilaian (Skor 1-4)</label>
            {#if item.autoScored}
              <span class="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">🤖 Auto-Scored via API {item.category} (Capaian: {item.actualValue})</span>
            {/if}
          </div>
          
          <div class="flex space-x-4 mb-6">
            {#each [1, 2, 3, 4] as scoreOption}
              <button 
                class="flex-1 py-3 border-2 rounded-xl font-bold text-lg transition-all
                  {item.score === scoreOption 
                    ? 'border-primary bg-primary-light text-primary-dark bg-opacity-20' 
                    : 'border-gray-200 text-gray-400 hover:border-gray-300'}
                  {item.autoScored ? 'opacity-70 cursor-not-allowed' : ''}
                "
                onclick={() => {
                  if (item.autoScored) return;
                  handleScoreChange(i, scoreOption);
                }}
                disabled={item.autoScored}
              >
                {scoreOption}
              </button>
            {/each}
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-text-muted mb-2">Catatan Auditor (Opsional)</label>
            <textarea 
              bind:value={item.note}
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
              rows="2"
              placeholder="Tambahkan catatan khusus terkait penilaian ini..."
            ></textarea>
          </div>

          <!-- Trigger Observasi Button for Score 3 -->
          {#if item.score === 3 && !item.showFindingForm}
            <button 
              onclick={() => toggleObForm(i)}
              class="text-sm font-semibold text-status-info hover:text-blue-700 flex items-center mt-2"
            >
              + Tambah Catatan Observasi (OB)
            </button>
          {/if}

          <!-- Dynamic Finding Form (KTS or OB) -->
          {#if item.showFindingForm}
            <div class="mt-4 p-5 rounded-lg border-l-4 {item.findingType === 'KTS' ? 'bg-red-50 border-status-error' : 'bg-blue-50 border-status-info'}">
              <div class="flex items-center space-x-2 mb-4">
                <span class="font-bold {item.findingType === 'KTS' ? 'text-status-error' : 'text-status-info'}">
                  Form Temuan: {item.findingType === 'KTS' ? 'Ketidaksesuaian (KTS)' : 'Observasi (OB)'}
                </span>
                {#if item.findingType === 'KTS'}
                  <span class="text-xs px-2 py-1 bg-red-100 text-red-800 rounded font-semibold border border-red-200">Wajib Diisi</span>
                {/if}
              </div>

              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Deskripsi Temuan</label>
                  <textarea 
                    bind:value={item.findingDescription}
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 outline-none {item.findingType === 'KTS' ? 'focus:ring-status-error focus:border-status-error' : 'focus:ring-status-info focus:border-status-info'}"
                    rows="2"
                  ></textarea>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Rekomendasi Tindak Lanjut</label>
                  <textarea 
                    bind:value={item.findingRecommendation}
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 outline-none {item.findingType === 'KTS' ? 'focus:ring-status-error focus:border-status-error' : 'focus:ring-status-info focus:border-status-info'}"
                    rows="2"
                  ></textarea>
                </div>
              </div>
            </div>
          {/if}
        </div>
      </div>
    {/each}
  </div>

  <!-- Bottom Action -->
  <div class="flex justify-end space-x-4 bg-surface p-6 rounded-xl shadow-soft">
    <button class="px-6 py-2 border border-gray-300 text-text-main font-semibold rounded-lg hover:bg-gray-50 transition-colors">
      Simpan Draf
    </button>
    <button class="px-6 py-2 bg-primary text-white font-semibold rounded-lg shadow hover:bg-primary-dark transition-colors">
      Submit Final & Generate HAL
    </button>
  </div>
</div>
