import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User } from '../types';
import { authService } from '../services/auth.service';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(null);
  const role = ref<string | null>(null);
  const supermercadoId = ref<string | null>(null);

  const isAuthenticated = computed(() => !!token.value);

  async function login(cnpj: string, senha: string) {
    try {
      const data = await authService.login(cnpj, senha);
      
      token.value = data.token;
      user.value = data.user;
      role.value = data.user.role;
      // In a real scenario, the backend might return the supermercadoId 
      // directly or it might be a property of the user
      supermercadoId.value = (data.user as any).supermercadoId || null;
      
      return true;
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  }

  function logout() {
    token.value = null;
    user.value = null;
    role.value = null;
    supermercadoId.value = null;
    localStorage.removeItem('auth');
  }

  return {
    user,
    token,
    role,
    supermercadoId,
    isAuthenticated,
    login,
    logout,
  };
}, {
  persist: true
});
