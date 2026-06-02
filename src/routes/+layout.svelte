<script lang="ts">
  import '../app.css';
  import { auth, logout } from '$lib/state/auth.svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  let { children } = $props();

  // Dynamic Navigation based on Role
  let navItems = $derived.by(() => {
    const role = auth.user?.role;
    const items = [
      { label: 'Dashboard Eksekutif', href: '/', icon: '📊', roles: ['BPM'] },
      { label: 'Periode Audit', href: '/periods', icon: '📅', roles: ['BPM'] },
      { label: 'Manajemen Instrumen', href: '/instruments', icon: '📋', roles: ['BPM'] },
      { label: 'Penugasan & Audit', href: '/assignments', icon: '👥', roles: ['BPM', 'Auditor'] },
      { label: 'Persiapan Audit (Borang)', href: '/evidence', icon: '📁', roles: ['Auditee'] },
      { label: 'Pelaksanaan Audit', href: '/audit/execute', icon: '📝', roles: ['Auditor'] },
      { label: 'Pelacakan Temuan', href: '/findings', icon: '🔍', roles: ['BPM', 'Auditor', 'Auditee'] },
      { label: 'Berita Acara (BAA)', href: '/baa', icon: '📜', roles: ['BPM', 'Auditor', 'Auditee'] },
    ];
    return items.filter(item => item.roles.includes(role || ''));
  });

  // Simple client-side protection
  $effect(() => {
    if (!auth.user && $page.url.pathname !== '/login') {
      goto('/login');
    }
  });

  function handleLogout() {
    logout();
    goto('/login');
  }
</script>

{#if !auth.user || $page.url.pathname === '/login'}
  <!-- Render Login Page without Layout -->
  {@render children()}
{:else}
<div class="min-h-screen flex bg-background">
  <!-- Sidebar -->
  <aside class="w-64 bg-primary text-white flex flex-col shadow-float z-10">
    <div class="h-16 flex items-center px-6 border-b border-primary-light border-opacity-30">
      <h1 class="text-2xl font-bold tracking-tight">AMI<span class="text-secondary-light">Pro</span></h1>
    </div>
    
    <nav class="flex-1 py-6 space-y-2 px-4">
      {#each navItems as item}
        <a 
          href={item.href} 
          class="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-primary-light hover:bg-opacity-20 transition-all duration-200"
        >
          <span class="text-xl">{item.icon}</span>
          <span class="font-medium">{item.label}</span>
        </a>
      {/each}
    </nav>
    
    <div class="p-4 border-t border-primary-light border-opacity-30 text-sm">
      <p class="font-semibold">{auth.user.name}</p>
      <p class="text-primary-light text-xs mt-1 mb-3">Role: {auth.user.role}</p>
      <button onclick={handleLogout} class="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded font-semibold transition-colors text-xs">
        Logout
      </button>
    </div>
  </aside>

  <!-- Main Content -->
  <div class="flex-1 flex flex-col h-screen overflow-hidden">
    <!-- Topbar -->
    <header class="h-16 bg-surface shadow-soft flex items-center justify-end px-8 z-0">
      <div class="flex items-center space-x-4">
        <button class="text-text-muted hover:text-primary transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        <div class="h-8 w-8 rounded-full bg-secondary text-white flex items-center justify-center font-bold">
          {auth.user.name.charAt(0)}
        </div>
      </div>
    </header>

    <!-- Page Content -->
    <main class="flex-1 overflow-auto p-8">
      <div class="max-w-7xl mx-auto">
        {@render children()}
      </div>
    </main>
  </div>
</div>
{/if}
