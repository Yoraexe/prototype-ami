<script lang="ts">
  import { auth } from '$lib/state/auth.svelte';
  import { goto } from '$app/navigation';

  $effect(() => {
    if (auth.user?.role === 'Auditor') {
      goto('/assignments');
    } else if (auth.user?.role === 'Auditee') {
      goto('/evidence');
    }
  });
</script>

<svelte:head>
  <title>Dashboard Eksekutif | AMIPro</title>
</svelte:head>

<div class="space-y-6">
  <div>
    <h1 class="text-3xl font-bold text-text-main">Dashboard Eksekutif</h1>
    <p class="text-text-muted mt-1">Ringkasan kepatuhan dan performa mutu institusi.</p>
  </div>

  <!-- Key Metrics Cards -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <div class="bg-surface rounded-xl p-6 shadow-soft border-l-4 border-status-success">
      <p class="text-sm font-semibold text-text-muted uppercase tracking-wider">Prodi Patuh</p>
      <div class="mt-2 flex items-baseline gap-2">
        <span class="text-4xl font-bold text-text-main">85%</span>
        <span class="text-sm text-status-success">▲ +5%</span>
      </div>
    </div>
    
    <div class="bg-surface rounded-xl p-6 shadow-soft border-l-4 border-primary">
      <p class="text-sm font-semibold text-text-muted uppercase tracking-wider">Total Penugasan Aktif</p>
      <div class="mt-2 flex items-baseline gap-2">
        <span class="text-4xl font-bold text-text-main">24</span>
      </div>
    </div>

    <div class="bg-surface rounded-xl p-6 shadow-soft border-l-4 border-status-warning">
      <p class="text-sm font-semibold text-text-muted uppercase tracking-wider">Temuan KTS (Open)</p>
      <div class="mt-2 flex items-baseline gap-2">
        <span class="text-4xl font-bold text-text-main">12</span>
        <span class="text-sm font-medium text-text-muted">menunggu RTL</span>
      </div>
    </div>

    <div class="bg-surface rounded-xl p-6 shadow-soft border-l-4 border-status-error">
      <p class="text-sm font-semibold text-text-muted uppercase tracking-wider">Temuan Overdue</p>
      <div class="mt-2 flex items-baseline gap-2">
        <span class="text-4xl font-bold text-text-main">3</span>
        <span class="text-sm text-status-error">Perlu Eskalasi</span>
      </div>
    </div>
  </div>

  <!-- Content Section -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Chart Placeholder -->
    <div class="lg:col-span-2 bg-surface rounded-xl p-6 shadow-soft">
      <h2 class="text-lg font-bold text-text-main mb-4">Tren Skor Audit Lintas Periode</h2>
      <div class="h-64 flex items-center justify-center bg-background rounded-lg border border-dashed border-gray-300">
        <p class="text-text-muted">Grafik Chart.js / ApexCharts akan dimuat di sini</p>
      </div>
    </div>

    <!-- Need Action List -->
    <div class="bg-surface rounded-xl p-6 shadow-soft">
      <h2 class="text-lg font-bold text-text-main mb-4">Perlu Perhatian (Overdue)</h2>
      <div class="space-y-4">
        {#each [1, 2, 3] as item}
          <div class="p-4 rounded-lg bg-red-50 border border-red-100">
            <div class="flex justify-between items-start">
              <div>
                <p class="font-semibold text-text-main">Prodi Sistem Informasi</p>
                <p class="text-xs text-text-muted mt-1">Temuan KTS: IKU-3 (Skor 2)</p>
              </div>
              <span class="px-2 py-1 bg-status-error text-white text-xs font-bold rounded">Overdue</span>
            </div>
            <button class="mt-3 text-sm text-primary hover:text-primary-dark font-medium">Tinjau & Ekstensi ➔</button>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
