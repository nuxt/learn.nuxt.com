<script setup lang="ts">
const { x, y } = useMouse()
</script>

<template>
  <div class="grid grid-cols-[1fr_2fr] h-full of-hidden max-h-full">
    <div class="border-r border-base p4">
      Content
      <div class="text-red">
        Hello World {{ x }}, {{ y }}<br>
      </div>
    </div>
    <ThePlayground />
  </div>
</template>
