import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { DieeseItem, PrecoUpload } from '../types';
import { precoService } from '../services/preco.service';

export const usePrecoStore = defineStore('preco', () => {
  const itemsDieese = ref<DieeseItem[]>([]);
  const supermercados = ref<{id: string, nome: string}[]>([]);
  const isLoading = ref(false);

  async function fetchItemsDieese() {
    if (itemsDieese.value.length > 0) return;
    isLoading.value = true;
    try {
      itemsDieese.value = await precoService.getItensDieese();
    } finally {
      isLoading.value = false;
    }
  }

  async function uploadPreco(payload: PrecoUpload) {
    isLoading.value = true;
    try {
      return await precoService.uploadPreco(payload);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    itemsDieese,
    supermercados,
    isLoading,
    fetchItemsDieese,
    uploadPreco,
  };
});
