<script setup lang="ts">
if (process.client) {
  console.log('Client Init')
  window.addEventListener('message', (e) => {
    console.log('got message', e)
  })
}
</script>

<template>
  <div>
    <NuxtWelcome />
  </div>
</template>
