import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User, AuthResponse } from '../types';
import api from '../api/client';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(JSON.parse(localStorage.getItem('user') || 'null'));
  const token = ref<string | null>(localStorage.getItem('token'));

  const isAuthenticated = computed(() => !!token.value);

  async function login(cnpj: string, senha: string) {
    try {
      const { data } = await api.post<AuthResponse>('/auth/login', { cnpj, senha });
      
      token.value = data.token;
      user.value = data.user;

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      return true;
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  }

  function logout() {
    token.value = null;
    user.value = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout,
  };
});
