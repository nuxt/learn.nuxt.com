<script setup lang="ts">
const msg: number = 'Hello World!'
</script>

<template>
  <div>{{ msg.toUpperCase() }}</div>
  <NuxtPage />
</template>
