<script setup lang="ts">
defineProps<{
  to: string
  icon?: string
  title: string
  description: string
  wip?: boolean
}>()
</script>

<template>
  <div
    class="flex-1 px-4 py-4 pt-5"
    border="~ base rounded-lg hover:primary"
    relative block min-w-80
    :class="wip ? 'op75 pointer-events-none' : ''"
  >
    <span class="pointer-events-none mb-3 h-7 w-7 inline-flex items-center text-lg text-primary" :class="icon" />
    <div class="my-0 text-lg font-semibold">
      {{ title }}
      <sup v-if="wip" rounded bg-primary:10 px1 text-sm text-primary font-normal>
        Coming Soon
      </sup>
    </div>
    <div class="mb-0 mt-1 text-[15px] op50">
      {{ description }}
      <slot />
    </div>
    <NuxtLink :to="to" class="absolute inset-0" />
  </div>
</template>
