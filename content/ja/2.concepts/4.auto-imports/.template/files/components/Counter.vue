<script setup lang="ts">
const { count, increment } = useCounter()
</script>

<template>
  <button type="button" @click="increment">
    count is: {{ count }}
  </button>
</template>
