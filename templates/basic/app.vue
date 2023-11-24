<script setup lang="ts">
if (process.client) {
  console.log('Client Init')
  window.addEventListener('message', (e) => {
    console.log('got message', e)
  })

  const message = useReadPostMessage()
  const route = useRoute()

  watch(message, (newMessage) => {
    switch (newMessage.type) {
      case 'update:color-mode':
        toggleColorModeClass(String(newMessage.value))
        break
      default:
        break
    }
  })

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
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.dark {
    color-scheme: dark;
    color: white;
}

.light {
    color-scheme: light;
    color: black;
}
</style>
