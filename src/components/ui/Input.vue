<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  modelValue: string | number;
  label?: string;
  type?: string;
  placeholder?: string;
  error?: string;
  helper?: string;
  mask?: (val: string) => string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
});

const emit = defineEmits(['update:modelValue', 'blur', 'focus']);

const onInput = (e: Event) => {
  let val = (e.target as HTMLInputElement).value;
  if (props.mask) val = props.mask(val);
  emit('update:modelValue', val);
};
</script>

<template>
  <div class="flex flex-col gap-1.5 w-full">
    <label v-if="label" class="text-sm font-semibold text-slate-700 ml-1">
      {{ label }}
    </label>
    <div class="relative">
      <input
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        @input="onInput"
        @blur="emit('blur')"
        @focus="emit('focus')"
        :class="[
          'w-full px-4 py-2.5 border rounded-xl outline-none transition-all duration-200 bg-white',
          error 
            ? 'border-red-500 focus:ring-4 focus:ring-red-100' 
            : 'border-slate-300 focus:border-primary-500 focus:ring-4 focus:ring-primary-100'
        ]"
      />
    </div>
    <span v-if="error" class="text-xs font-medium text-red-500 ml-1">
      {{ error }}
    </span>
    <span v-else-if="helper" class="text-xs text-slate-500 ml-1">
      {{ helper }}
    </span>
  </div>
</template>
