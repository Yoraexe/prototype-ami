<script lang="ts">
  import { login } from '$lib/state/auth.svelte';
  import { goto } from '$app/navigation';

  function handleLogin(role: 'BPM' | 'Auditor' | 'Auditee') {
    login(role);
    goto('/'); // Kembali ke dashboard setelah login
  }
</script>

<svelte:head>
  <title>Login Simulasi | AMIPro</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-background p-4">
  <div class="bg-surface p-8 rounded-2xl shadow-float max-w-md w-full border border-gray-100">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold tracking-tight text-text-main">AMI<span class="text-secondary">Pro</span></h1>
      <p class="text-text-muted mt-2">Pilih peran Anda untuk masuk ke sistem (Mode Simulasi)</p>
    </div>

    <div class="space-y-4">
      <button 
        onclick={() => handleLogin('BPM')}
        class="w-full flex items-center justify-between p-4 rounded-xl border-2 border-primary-light border-opacity-30 hover:border-primary bg-blue-50 hover:bg-blue-100 transition-all text-left group"
      >
        <div>
          <h2 class="font-bold text-primary-dark">Kepala BPM</h2>
          <p class="text-xs text-text-muted mt-1">Akses penuh: Manajemen Periode & Instrumen</p>
        </div>
        <span class="text-2xl group-hover:scale-110 transition-transform">👑</span>
      </button>

      <button 
        onclick={() => handleLogin('Auditor')}
        class="w-full flex items-center justify-between p-4 rounded-xl border-2 border-green-200 hover:border-green-500 bg-green-50 hover:bg-green-100 transition-all text-left group"
      >
        <div>
          <h2 class="font-bold text-green-800">Auditor Utama</h2>
          <p class="text-xs text-text-muted mt-1">Akses: Pelaksanaan Audit & Verifikasi BAA</p>
        </div>
        <span class="text-2xl group-hover:scale-110 transition-transform">📋</span>
      </button>

      <button 
        onclick={() => handleLogin('Auditee')}
        class="w-full flex items-center justify-between p-4 rounded-xl border-2 border-orange-200 hover:border-orange-500 bg-orange-50 hover:bg-orange-100 transition-all text-left group"
      >
        <div>
          <h2 class="font-bold text-orange-800">Kaprodi (Auditee)</h2>
          <p class="text-xs text-text-muted mt-1">Akses: Kirim RTL Temuan & Persetujuan BAA</p>
        </div>
        <span class="text-2xl group-hover:scale-110 transition-transform">🏢</span>
      </button>
    </div>
  </div>
</div>
