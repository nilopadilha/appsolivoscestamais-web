import api from './api';
import type { AuthResponse, User } from '../types';

// Mock Users for testing
const MOCK_USERS: Record<string, { user: User, token: string }> = {
  '00000000000000': {
    token: 'mock-jwt-admin-token',
    user: {
      id: 'admin-uuid',
      cnpj: '00000000000000',
      nome: 'Administrador Central',
      role: 'ADMIN',
    }
  },
  '11111111111111': {
    token: 'mock-jwt-loja-active-token',
    user: {
      id: 'loja-active-uuid',
      cnpj: '11111111111111',
      nome: 'Supermercado Alvorada - Loja 01',
      role: 'SUPERMERCADO',
      supermercadoId: '101'
    } as any
  },
  '22222222222222': {
    token: 'mock-jwt-loja-new-token',
    user: {
      id: 'loja-new-uuid',
      cnpj: '22222222222222',
      nome: 'Mercadinho Novo Horizonte',
      role: 'SUPERMERCADO',
      supermercadoId: '102'
    } as any
  }
};

export const authService = {
  async login(cnpj: string, senha: string): Promise<AuthResponse> {
    // Check for mock users first (for development/demo)
    if (MOCK_USERS[cnpj] && senha === 'senha123') {
      return new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_USERS[cnpj]), 800);
      });
    }

    // Real API call
    try {
      const { data } = await api.post<AuthResponse>('/auth/login', { cnpj, senha });
      return data;
    } catch (error) {
      throw error;
    }
  },
  
  logout() {
    // Local cleanup is handled by store
  }
};
