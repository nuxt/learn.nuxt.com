<script setup lang="ts">
// ref is auto imported by Nuxt
const count = ref(0)
</script>

<template>
  <button type="button" @click="count++">
    Count is: {{ count }}
  </button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
