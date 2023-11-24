<script setup lang="ts">
if (process.client) {
  const message = useReadPostMessage()

  watch(message, (newMessage) => {
    switch (newMessage.type) {
      case 'update:color-mode':
        toggleColorModeClass(String(newMessage.value))
        break
      default:
        break
    }
  })
}
</script>

<template>
  <div>
    hello world
  </div>
</template>
