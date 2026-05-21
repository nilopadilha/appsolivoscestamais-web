<template>
  <div class="bg-white border border-slate-100 rounded-[2rem] shadow-xl shadow-slate-200/50 overflow-hidden">
    <div v-if="$slots.header" class="px-8 py-6 border-b border-slate-50 bg-slate-50/30">
      <slot name="header" />
    </div>
    <div class="p-8">
      <slot />
    </div>
    <div v-if="$slots.footer" class="px-8 py-6 border-t border-slate-50 bg-slate-50/30">
      <slot name="footer" />
    </div>
  </div>
</template>
