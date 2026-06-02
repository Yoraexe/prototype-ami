<script lang="ts">
  import { auth } from '$lib/state/auth.svelte';
</script>

<svelte:head>
  <title>Berita Acara Audit | AMIPro</title>
</svelte:head>

<div class="space-y-6 max-w-4xl mx-auto">
  <div class="flex justify-between items-center">
    <h1 class="text-3xl font-bold text-text-main">Berita Acara Audit (BAA)</h1>
    <button class="px-4 py-2 bg-white border border-gray-300 text-text-main font-semibold rounded-lg shadow hover:bg-gray-50 transition-colors flex items-center gap-2">
      <span>📥</span> Download PDF
    </button>
  </div>

  <div class="bg-surface rounded-xl shadow-float p-8 border border-gray-200">
    <!-- Header Surat -->
    <div class="text-center border-b-4 border-primary pb-6 mb-8">
      <h2 class="text-2xl font-bold text-text-main uppercase tracking-wide">Berita Acara Audit Mutu Internal</h2>
      <p class="text-lg text-text-muted mt-2">Periode Semester Gasal 2025/2026</p>
    </div>

    <!-- Isi BAA -->
    <div class="space-y-6 text-text-main leading-relaxed">
      <p>Pada hari ini, <strong class="font-semibold">Senin, 20 November 2025</strong>, telah dilaksanakan proses Audit Mutu Internal (AMI) terhadap:</p>
      
      <table class="w-full">
        <tbody>
          <tr>
            <td class="w-1/3 py-2 text-text-muted font-medium">Program Studi (Auditee)</td>
            <td class="w-2/3 py-2 font-bold">: Sistem Informasi</td>
          </tr>
          <tr>
            <td class="w-1/3 py-2 text-text-muted font-medium">Auditor Utama</td>
            <td class="w-2/3 py-2 font-bold">: Prof. Dr. Andi Suryadi</td>
          </tr>
          <tr>
            <td class="w-1/3 py-2 text-text-muted font-medium">Skor Rata-Rata</td>
            <td class="w-2/3 py-2 font-bold">: 3.25 / 4.00</td>
          </tr>
        </tbody>
      </table>

      <h3 class="text-lg font-bold mt-8 mb-2">Ringkasan Temuan</h3>
      <table class="w-full border-collapse border border-gray-300 text-sm">
        <thead class="bg-gray-100">
          <tr>
            <th class="border border-gray-300 py-2 px-4 text-left">Jenis Temuan</th>
            <th class="border border-gray-300 py-2 px-4 text-left">Jumlah</th>
            <th class="border border-gray-300 py-2 px-4 text-left">Status Saat Ini</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-gray-300 py-2 px-4">Ketidaksesuaian (KTS)</td>
            <td class="border border-gray-300 py-2 px-4 font-bold">1</td>
            <td class="border border-gray-300 py-2 px-4 text-status-success font-bold">Closed (RTL Selesai)</td>
          </tr>
          <tr>
            <td class="border border-gray-300 py-2 px-4">Observasi (OB)</td>
            <td class="border border-gray-300 py-2 px-4 font-bold">2</td>
            <td class="border border-gray-300 py-2 px-4 text-status-success font-bold">Closed</td>
          </tr>
        </tbody>
      </table>

      <p class="mt-8 text-sm italic text-text-muted">
        Dengan ditandatanganinya Berita Acara Audit ini, maka proses Audit Mutu Internal untuk program studi tersebut pada periode ini dinyatakan <strong>Selesai dan Ditutup</strong>. Data audit telah dikunci dan tidak dapat diubah kembali.
      </p>

      <!-- Signature Area -->
      <div class="grid grid-cols-2 gap-8 mt-12 pt-8">
        <div class="text-center">
          <p class="mb-24 font-medium">Auditor,</p>
          <div class="border-t border-gray-400 pt-2 w-48 mx-auto">
            <p class="font-bold">Prof. Dr. Andi Suryadi</p>
            <p class="text-xs text-text-muted">Disetujui secara digital (20/11/2025)</p>
          </div>
        </div>
        <div class="text-center">
          <p class="mb-24 font-medium">Kepala Prodi (Auditee),</p>
          <div class="border-t border-gray-400 pt-2 w-48 mx-auto">
            <p class="font-bold">Dr. Budi Santoso</p>
            <p class="text-xs text-text-muted">Disetujui secara digital (21/11/2025)</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Action Bar -->
  <div class="bg-gray-50 border border-gray-200 rounded-xl p-4 flex justify-between items-center">
    <p class="text-sm font-medium text-text-muted">Status Dokumen: <span class="px-2 py-1 bg-green-100 text-green-800 rounded font-bold ml-2">Menunggu TTD Auditee</span></p>
    
    {#if auth.user?.role === 'Auditee'}
      <button class="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-bold rounded shadow transition-colors">
        Tanda Tangani & Setujui BAA
      </button>
    {:else if auth.user?.role === 'Auditor'}
      <button class="px-4 py-2 bg-gray-300 text-gray-500 font-bold rounded cursor-not-allowed" disabled>
        Anda Sudah Menandatangani
      </button>
    {:else}
      <button class="px-4 py-2 bg-gray-300 text-gray-500 font-bold rounded cursor-not-allowed" disabled>
        Hanya Auditor & Auditee
      </button>
    {/if}
  </div>
</div>
