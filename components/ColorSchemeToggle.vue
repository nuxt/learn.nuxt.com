<script lang="ts" setup>
const colorMode = useColorMode()

const toggleMode = () => colorMode.value = colorMode.value === 'light' ? 'dark' : 'light'
</script>

<template>
  <button
    p-2 rounded hover:bg-active
    @click="toggleMode"
  >
    <div i-ph-sun-dim-duotone dark:i-ph-moon-stars-duotone text-2xl />
  </button>
</template>
