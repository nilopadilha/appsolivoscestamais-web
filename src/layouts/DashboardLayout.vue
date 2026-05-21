<script setup lang="ts">
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();

const menuItems = [
  { name: 'Dashboard', path: '/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { name: 'Enviar Preços', path: '/upload', icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12' },
];

const handleLogout = () => {
  auth.logout();
  router.push('/login');
};
</script>

<template>
  <div class="layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="brand">
        <h1>Cesta<span>Mais</span></h1>
      </div>

      <nav class="nav">
        <router-link
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="nav-item"
          active-class="active"
        >
          <svg class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon" />
          </svg>
          {{ item.name }}
        </router-link>
      </nav>

      <div class="sidebar-footer">
        <div class="user-info">
          <p class="user-name">{{ auth.user?.nome }}</p>
          <p class="user-role">{{ auth.user?.role }}</p>
        </div>
        <button @click="handleLogout" class="logout-btn">Sair</button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <header class="top-bar">
        <h2 class="page-title">{{ $route.name === 'dashboard' ? 'Dashboard' : 'Upload de Preços' }}</h2>
      </header>
      
      <div class="content-wrapper">
        <slot />
        <router-view v-if="!$slots.default" />
      </div>
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 260px;
  background: var(--surface);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
}

.brand {
  padding: var(--space-6);
  border-bottom: 1px solid var(--border);
}

.brand h1 {
  font-size: 1.25rem;
  font-weight: 800;
}

.brand h1 span {
  color: var(--primary);
}

.nav {
  flex: 1;
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.nav-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3);
  text-decoration: none;
  color: var(--text-muted);
  border-radius: var(--radius-md);
  font-weight: 500;
  transition: all 0.2s;
}

.nav-item:hover {
  background-color: var(--bg);
  color: var(--text-main);
}

.nav-item.active {
  background-color: #eff6ff;
  color: var(--primary);
}

.icon {
  width: 20px;
  height: 20px;
}

.sidebar-footer {
  padding: var(--space-6);
  border-top: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.user-name {
  font-weight: 600;
  font-size: 0.875rem;
}

.user-role {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.logout-btn {
  background: none;
  border: none;
  color: var(--danger);
  font-weight: 600;
  font-size: 0.875rem;
  text-align: left;
  padding: 0;
}

.main-content {
  flex: 1;
  margin-left: 260px;
  background-color: var(--bg);
}

.top-bar {
  height: 64px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  padding: 0 var(--space-8);
  position: sticky;
  top: 0;
  z-index: 10;
}

.page-title {
  font-size: 1.125rem;
  font-weight: 600;
}

.content-wrapper {
  padding: var(--space-8);
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .sidebar {
    display: none; /* Simplificação para o exemplo: Mobile Menu viria aqui */
  }
  .main-content {
    margin-left: 0;
  }
}
</style>
