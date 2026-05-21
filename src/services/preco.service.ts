import api from './api';
import type { PrecoUpload, DieeseItem } from '../types';

export const precoService = {
  async uploadPreco(payload: PrecoUpload) {
    const formData = new FormData();
    formData.append('supermercadoId', payload.supermercadoId);
    formData.append('itemId', payload.itemId);
    formData.append('preco', payload.preco.toString());
    formData.append('quantidade', payload.quantidade.toString());
    
    if (payload.imagem) {
      formData.append('imagem', payload.imagem);
    }

    const { data } = await api.post('/precos/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },

  async getItensDieese(): Promise<DieeseItem[]> {
    try {
      // In a real scenario, this would be:
      // const { data } = await api.get<DieeseItem[]>('/itens-dieese');
      // return data;
      
      // Returning more complete mock data for the prototype
      return [
        { id: '1', nome: 'Arroz Agulhinha (5kg)', categoria: 'Grãos' },
        { id: '2', nome: 'Feijão Preto (1kg)', categoria: 'Grãos' },
        { id: '3', nome: 'Leite Integral (1L)', categoria: 'Laticínios' },
        { id: '4', nome: 'Café em Pó (500g)', categoria: 'Mercearia' },
        { id: '5', nome: 'Açúcar Refinado (1kg)', categoria: 'Mercearia' },
        { id: '6', nome: 'Óleo de Soja (900ml)', categoria: 'Mercearia' },
        { id: '7', nome: 'Pão Francês (kg)', categoria: 'Padaria' },
        { id: '8', nome: 'Carne - Patinho (kg)', categoria: 'Açougue' },
        { id: '9', nome: 'Manteiga (200g)', categoria: 'Laticínios' },
      ];
    } catch (error) {
      console.error('Error fetching items', error);
      throw error;
    }
  },

  async getSupermercados() {
    try {
      // const { data } = await api.get('/supermercados');
      // return data;
      return [
        { id: '101', nome: 'Supermercado Alvorada' },
        { id: '102', nome: 'Hiper TodoDia' },
        { id: '103', nome: 'Atacadão Econômico' },
      ];
    } catch (error) {
      console.error('Error fetching supermarkets', error);
      throw error;
    }
  }
};
