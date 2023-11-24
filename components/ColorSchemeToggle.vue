<script lang="ts" setup>
const colorMode = useColorMode()

function toggleMode() {
  colorMode.preference = colorMode.preference === 'light' ? 'dark' : 'light'
  usePostMessage('update:color-mode', colorMode.preference)
}
</script>

<template>
  <button
    class="p-2 rounded hover:bg-active"
    @click="toggleMode"
  >
    <div class="i-ph-sun-dim-duotone dark:i-ph-moon-stars-duotone text-2xl" />
  </button>
</template>
