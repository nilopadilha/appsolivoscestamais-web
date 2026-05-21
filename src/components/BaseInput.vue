<script setup lang="ts">
interface Props {
  modelValue: string | number;
  label?: string;
  type?: string;
  placeholder?: string;
  error?: string;
  mask?: (val: string) => string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
});

const emit = defineEmits(['update:modelValue', 'blur']);

const onInput = (e: Event) => {
  let val = (e.target as HTMLInputElement).value;
  if (props.mask) val = props.mask(val);
  emit('update:modelValue', val);
};
</script>

<template>
  <div class="base-input">
    <label v-if="label" class="label">{{ label }}</label>
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :class="['input', { 'has-error': error }]"
      @input="onInput"
      @blur="emit('blur')"
    />
    <span v-if="error" class="error-text">{{ error }}</span>
  </div>
</template>

<style scoped>
.base-input {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  width: 100%;
}

.label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-muted);
}

.input {
  padding: var(--space-3);
  border: 1.5px solid var(--border);
  border-radius: var(--radius-md);
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  background-color: var(--input-bg);
}

.input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.input.has-error {
  border-color: var(--danger);
}

.error-text {
  font-size: 0.75rem;
  color: var(--danger);
  margin-top: 2px;
}
</style>
