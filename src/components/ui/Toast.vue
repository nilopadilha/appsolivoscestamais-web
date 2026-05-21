<script setup lang="ts">
import { useToastStore } from '../../stores/toast';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-vue-next';

const toastStore = useToastStore();
</script>

<template>
  <div class="fixed top-4 right-4 z-[100] flex flex-col gap-3 w-full max-w-sm pointer-events-none">
    <TransitionGroup
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-for="toast in toastStore.toasts" 
        :key="toast.id"
        class="pointer-events-auto w-full bg-white shadow-2xl rounded-2xl border border-slate-100 overflow-hidden"
      >
        <div class="p-4 flex items-start gap-3">
          <div class="flex-shrink-0">
            <CheckCircle2 v-if="toast.type === 'success'" class="h-6 w-6 text-green-500" />
            <AlertCircle v-else-if="toast.type === 'error'" class="h-6 w-6 text-red-500" />
            <Info v-else class="h-6 w-6 text-blue-500" />
          </div>
          <div class="flex-1 pt-0.5">
            <p class="text-sm font-bold text-slate-900 leading-tight">
              {{ toast.message }}
            </p>
          </div>
          <button @click="toastStore.remove(toast.id)" class="text-slate-400 hover:text-slate-600 transition-colors">
            <X :size="16" />
          </button>
        </div>
        <!-- Progress bar for auto-hide -->
        <div class="h-1 bg-slate-50 w-full">
          <div 
            class="h-full transition-all duration-[3000ms] linear"
            :class="{
              'bg-green-500': toast.type === 'success',
              'bg-red-500': toast.type === 'error',
              'bg-blue-500': toast.type === 'info'
            }"
            :style="{ width: '100%' }"
          ></div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>
