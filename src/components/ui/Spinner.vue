<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'accent' | 'white';
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'primary',
});

const sizeClasses = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-2',
  lg: 'h-12 w-12 border-3',
  xl: 'h-16 w-16 border-4',
};

const colorClasses = {
  primary: 'border-primary-600 border-t-transparent',
  accent: 'border-accent-600 border-t-transparent',
  white: 'border-white border-t-transparent',
};

const classes = computed(() => {
  return [
    'animate-spin rounded-full',
    sizeClasses[props.size],
    colorClasses[props.color]
  ].join(' ');
});
</script>

<template>
  <div class="flex items-center justify-center p-2">
    <div :class="classes"></div>
  </div>
</template>
