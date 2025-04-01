<script setup lang="ts">
const count = ref(0)
function increment() {
  count.value++
}

console.log('count.value:', count.value)
</script>

<template>
  <button type="button" @click="increment">
    count is: {{ count }}
  </button>
</template>
