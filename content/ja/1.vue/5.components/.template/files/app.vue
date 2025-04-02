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
      message="Hello from Parent!"
      :name
      @update:name="updateName"
    />
  </div>
</template>
