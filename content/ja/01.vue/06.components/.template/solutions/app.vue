<script setup lang="ts">
import Child from './Child.vue'

const name = ref('John Doe')

function updateName(value: string) {
  name.value = value
}
</script>

<template>
  <div>
    <h1>Parent Component</h1>
    <p>Hi, {{ name }} 👋</p>
    <Child
      :name
      @update:name="updateName"
    >
      <template #paragraph>
        Hello from <span class="red--text">Parent!</span>
      </template>
    </Child>
  </div>
</template>

<style scoped>
.red--text {
  color: red;
}
</style>
