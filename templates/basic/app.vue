<script setup lang="ts">
// Communicate with parent window for navigation
if (process.client) {
  const route = useRoute()
  watch(
    () => route.fullPath,
    (newFullPath) => {
      window.parent.postMessage({
        type: 'update:path',
        path: newFullPath,
      }, '*')
    },
    { immediate: true },
  )
}
</script>

<template>
  <NuxtPage />
</template>
