import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { PrecoUpload, DieeseItem } from '../types';
import api from '../api/client';

export const usePrecoStore = defineStore('preco', () => {
  const itemsDieese = ref<DieeseItem[]>([
    { id: '1', nome: 'Arroz Agulhinha (5kg)', categoria: 'Grãos' },
    { id: '2', nome: 'Feijão Preto (1kg)', categoria: 'Grãos' },
    { id: '3', nome: 'Leite Integral (1L)', categoria: 'Laticínios' },
    { id: '4', nome: 'Café em Pó (500g)', categoria: 'Mercearia' },
  ]);

  async function uploadPreco(payload: PrecoUpload) {
    const formData = new FormData();
    formData.append('itemId', payload.itemId);
    formData.append('preco', payload.preco.toString());
    formData.append('quantidade', payload.quantidade);
    if (payload.imagem) {
      formData.append('imagem', payload.imagem);
    }

    try {
      const { data } = await api.post('/precos/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    } catch (error) {
      console.error('Upload failed', error);
      throw error;
    }
  }

  return {
    itemsDieese,
    uploadPreco,
  };
});
