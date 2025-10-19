<script setup lang="ts">
const count = ref(0)
</script>

<template>
  <button type="button" @click="count++">
    count is: {{ count }}
  </button>

  <p>double is: {{ double(count) }}</p>

  <Counter />
</template>
