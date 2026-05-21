import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<Toast[]>([]);
  let nextId = 1;

  function show(message: string, type: Toast['type'] = 'success', duration = 3000) {
    const id = nextId++;
    toasts.value.push({ id, message, type, duration });

    setTimeout(() => {
      remove(id);
    }, duration);
  }

  function remove(id: number) {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  }

  return {
    toasts,
    show,
    remove,
  };
});
