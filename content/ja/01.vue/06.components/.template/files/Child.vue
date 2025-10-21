<script setup lang="ts">
defineProps<{
  message: string
  name: string
}>()

const emit = defineEmits<{
  'update:name': [string]
}>()
</script>

<template>
  <div class="child-component">
    <h2>Child Component</h2>
    <p>{{ message }}</p>
    <input
      type="text"
      :value="name"
      @input="emit('update:name', $event.target.value)"
    >
  </div>
</template>

<style scoped>
.child-component {
  border: solid red;
  padding: 1rem;
}
</style>
