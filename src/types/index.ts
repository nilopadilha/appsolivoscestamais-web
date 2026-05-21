export interface User {
  id: string;
  cnpj: string;
  nome: string;
  role: 'ADMIN' | 'SUPERMERCADO';
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface DieeseItem {
  id: string;
  nome: string;
  categoria: string;
}

export interface PrecoUpload {
  itemId: string;
  preco: number;
  quantidade: string;
  imagem: File | null;
}

export interface DashboardStats {
  aprovados: number;
  pendentes: number;
  rejeitados: number;
  ultimoEnvio: string | null;
}
