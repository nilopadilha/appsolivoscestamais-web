<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter, useRoute } from 'vue-router';
import { 
  LayoutDashboard, 
  Camera, 
  LogOut, 
  Menu, 
  X, 
  User as UserIcon,
  ChevronRight
} from 'lucide-vue-next';

const auth = useAuthStore();
const router = useRouter();
const route = useRoute();

const isMobileMenuOpen = ref(false);

const menuItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Registrar Preço', path: '/upload', icon: Camera },
];

const handleLogout = () => {
  auth.logout();
  router.push('/login');
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex flex-col md:flex-row">
    <!-- Mobile Header -->
    <header class="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
          <span class="text-white font-bold text-lg">C</span>
        </div>
        <h1 class="font-extrabold text-xl tracking-tight">Cesta<span class="text-primary-600">Mais</span></h1>
      </div>
      <button @click="toggleMobileMenu" class="p-2 text-slate-600">
        <Menu v-if="!isMobileMenuOpen" :size="24" />
        <X v-else :size="24" />
      </button>
    </header>

    <!-- Sidebar (Desktop) / Mobile Drawer -->
    <aside 
      class="fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0"
      :class="isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="flex flex-col h-full">
        <!-- Brand -->
        <div class="hidden md:flex items-center gap-3 px-6 py-8 border-b border-slate-50">
          <div class="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-200">
            <span class="text-white font-bold text-xl">C+</span>
          </div>
          <h1 class="font-extrabold text-2xl tracking-tight">Cesta<span class="text-primary-600">Mais</span></h1>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 px-4 py-6 space-y-2">
          <router-link
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            @click="closeMobileMenu"
            class="flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 group"
            :class="route.path === item.path 
              ? 'bg-primary-50 text-primary-700' 
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'"
          >
            <div class="flex items-center gap-3">
              <component :is="item.icon" :size="20" :stroke-width="route.path === item.path ? 2.5 : 2" />
              <span class="font-semibold">{{ item.name }}</span>
            </div>
            <ChevronRight v-if="route.path === item.path" :size="16" class="opacity-50" />
          </router-link>
        </nav>

        <!-- User Profile & Footer -->
        <div class="p-4 border-t border-slate-100 bg-slate-50/50">
          <div class="flex items-center gap-3 px-2 py-3 mb-4">
            <div class="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center text-accent-700">
              <UserIcon :size="20" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-bold text-slate-900 truncate">{{ auth.user?.nome || 'Usuário' }}</p>
              <p class="text-xs font-medium text-slate-500 uppercase tracking-wider">{{ auth.role || 'Supermercado' }}</p>
            </div>
          </div>
          <button 
            @click="handleLogout"
            class="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-600 font-bold bg-white border border-red-100 rounded-xl hover:bg-red-50 transition-colors"
          >
            <LogOut :size="18" />
            Sair da Conta
          </button>
        </div>
      </div>
    </aside>

    <!-- Mobile Menu Overlay -->
    <div 
      v-if="isMobileMenuOpen" 
      @click="closeMobileMenu"
      class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden"
    ></div>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <!-- Top Bar (Desktop) -->
      <header class="hidden md:flex h-20 items-center justify-between px-8 bg-white border-b border-slate-200">
        <h2 class="text-xl font-bold text-slate-900 capitalize">
          {{ route.meta.title || 'Início' }}
        </h2>
        
        <div class="flex items-center gap-4">
          <div class="px-4 py-1.5 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase tracking-widest">
            Sincronizado
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <div class="flex-1 overflow-y-auto p-4 md:p-8">
        <div class="max-w-6xl mx-auto">
          <slot />
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.router-link-active {
  @apply shadow-sm shadow-primary-100;
}
</style>
