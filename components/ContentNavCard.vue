<script setup lang="ts">
defineProps<{
  to?: string
  icon?: string
  title?: string
  subheader: string
  description: string
}>()
</script>

<template>
  <div
    flex="~ col"
    class="flex-1 p4"
    border="~ base rounded-lg hover:primary"
    relative block h-full
  >
    <span class="pointer-events-none mb4 h-7 w-7 inline-flex flex-none items-center text-lg text-primary" :class="icon" />
    <div class="my-0 text-lg font-semibold">
      {{ title }}
    </div>
    <div class="line-clamp line-clamp-2 mb-0 mt-1 text-[14px] op50">
      {{ description }}
      <slot />
    </div>
    <NuxtLink :to="to" class="absolute inset-0" />
  </div>
</template>
