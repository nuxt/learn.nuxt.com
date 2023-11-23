<script lang="ts" setup>
const colorMode = useColorMode()

const toggleMode = () => colorMode.value = colorMode.value === 'light' ? 'dark' : 'light'
</script>

<template>
  <button
    class="p-2 rounded hover:bg-active"
    @click="toggleMode"
  >
    <div class="i-carbon-sun dark:i-carbon-moon" />
  </button>
</template>
