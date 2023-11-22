<script setup lang="ts">
const { x, y } = useMouse()

const color = useColorMode()
const colorSchemes = ['light', 'dark', 'system']
</script>

<template>
  <div class="grid grid-cols-[1fr_2fr] h-full of-hidden max-h-full">
    <div class="border-r border-base p4">
      Content
      <div class="text-red">
        Hello World {{ x }}, {{ y }}<br>

        <select v-model="color.preference">
          <option v-for="scheme in colorSchemes" :key="scheme" :value="scheme">
            {{ scheme }}
          </option>
        </select>
      </div>
    </div>
    <ThePlayground />
  </div>
</template>
