<script setup>
import '@unocss/reset/tailwind.css'
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.dark {
  color-scheme: dark;
}

html, body {
  height: 100vh;
  overflow: hidden;
}
</style>
