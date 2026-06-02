<script lang="ts">
  import { auth } from '$lib/state/auth.svelte';
</script>

<svelte:head>
  <title>Penugasan & Audit | AMIPro</title>
</svelte:head>

<div class="space-y-6">
  <div class="flex justify-between items-center">
    <div>
      <h1 class="text-3xl font-bold text-text-main">
        {auth.user?.role === 'BPM' ? 'Manajemen Penugasan Audit' : 'Daftar Tugas Audit Saya'}
      </h1>
      <p class="text-text-muted mt-1">
        {auth.user?.role === 'BPM' ? 'Pantau progres audit seluruh prodi pada periode berjalan.' : 'Daftar program studi yang harus Anda audit.'}
      </p>
    </div>
    {#if auth.user?.role === 'BPM'}
      <button class="px-4 py-2 bg-primary text-white font-semibold rounded-lg shadow hover:bg-primary-dark transition-colors">
        + Buat Penugasan Baru
      </button>
    {/if}
  </div>

  <div class="bg-surface rounded-xl shadow-soft overflow-hidden">
    <table class="w-full text-left border-collapse">
      <thead>
        <tr class="bg-background border-b border-gray-200">
          <th class="py-4 px-6 font-semibold text-text-muted">Prodi (Auditee)</th>
          {#if auth.user?.role === 'BPM'}
            <th class="py-4 px-6 font-semibold text-text-muted">Auditor</th>
          {/if}
          <th class="py-4 px-6 font-semibold text-text-muted">Status</th>
          <th class="py-4 px-6 font-semibold text-text-muted">Progres</th>
          <th class="py-4 px-6 font-semibold text-text-muted text-right">Aksi</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100">
        <tr class="hover:bg-gray-50 transition-colors">
          <td class="py-4 px-6 font-medium text-text-main">Sistem Informasi</td>
          {#if auth.user?.role === 'BPM'}
            <td class="py-4 px-6 text-text-main">Prof. Dr. Andi Suryadi</td>
          {/if}
          <td class="py-4 px-6">
            <span class="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full">In Progress</span>
          </td>
          <td class="py-4 px-6 text-text-muted text-sm">45% Selesai</td>
          <td class="py-4 px-6 text-right space-x-2">
            {#if auth.user?.role === 'Auditor'}
              <a href="/audit/execute" class="text-primary hover:text-primary-dark font-medium text-sm">Lanjutkan Audit ➔</a>
            {:else}
              <button class="text-text-muted hover:text-primary font-medium text-sm">Pantau Detail</button>
            {/if}
          </td>
        </tr>
        <tr class="hover:bg-gray-50 transition-colors">
          <td class="py-4 px-6 font-medium text-text-main">Teknik Informatika</td>
          {#if auth.user?.role === 'BPM'}
            <td class="py-4 px-6 text-text-main">Dr. Budi Santoso</td>
          {/if}
          <td class="py-4 px-6">
            <span class="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-bold rounded-full">Belum Dimulai</span>
          </td>
          <td class="py-4 px-6 text-text-muted text-sm">0% Selesai</td>
          <td class="py-4 px-6 text-right space-x-2">
            {#if auth.user?.role === 'Auditor'}
              <a href="/audit/execute" class="text-primary hover:text-primary-dark font-medium text-sm">Mulai Audit ➔</a>
            {:else}
              <button class="text-text-muted hover:text-primary font-medium text-sm">Ubah Penugasan</button>
            {/if}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
