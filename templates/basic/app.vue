<script setup lang="ts">
import { ref } from 'vue';
const msg = ref('Hello World! This is the basic template.');
const changeMessage = () => {
  msg.value = 'This is Basic Nuxt Template';
};
</script>

<template>
  <div>{{ msg }}</div>
  <button @click="changeMessage">Click Me</button>
</template>
