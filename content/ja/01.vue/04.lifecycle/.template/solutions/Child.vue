<script setup lang="ts">
const emit = defineEmits<{
  mounted: []
  beforeUnmount: []
}>()

onMounted(() => {
  emit('mounted')
})

onUnmounted(() => {
  emit('beforeUnmount')
})
</script>

<template>
  <div>
    <h2>子コンポーネント</h2>
  </div>
</template>
