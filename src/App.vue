<template>
  <router-view />
</template>

<style>
/* Global transitions or overrides if needed */
.route-enter-active,
.route-leave-active {
  transition: opacity 0.2s ease;
}

.route-enter-from,
.route-leave-to {
  opacity: 0;
}
</style>
