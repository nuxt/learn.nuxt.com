<script setup lang="ts">
const count = useState('count', () => 0)
</script>

<template>
  <div>
    <h2>Counter A</h2>
    <p>Count: {{ count }}</p>
    <button type="button" @click="count++">
      Increment
    </button>
  </div>
</template>
