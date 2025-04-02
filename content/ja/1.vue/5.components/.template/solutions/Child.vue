<script setup lang="ts">
defineProps<{
  message: string
  name: string
}>()

const emit = defineEmits<{
  'update:name': [name: string]
}>()

defineSlots<{
  paragraph: () => any
}>()
</script>

<template>
  <div class="child-component">
    <h2>Child Component</h2>
    <p><slot name="paragraph" /></p>
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
