<script setup lang="ts">
const colorMode = useColorMode()

if (process.client) {
  const message = useReadPostMessage()

  watch(message, (value) => {
    if ('colorMode' in value)
      colorMode.preference = String(value.colorMode)
  })
}
</script>

<template>
  <div h-full grid="~ rows-[min-content_1fr]">
    <div p4>
      Hello World
    </div>
  </div>
</template>
