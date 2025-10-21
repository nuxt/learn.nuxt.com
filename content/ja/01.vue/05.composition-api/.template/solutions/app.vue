<script setup lang="ts">
const { count, doubled, increment } = useCounter()
</script>

<template>
  <div>
    <p>count is {{ count }}</p>
    <p>doubled is {{ doubled }}</p>
    <button type="button" @click="increment">
      +1
    </button>
  </div>
</template>
