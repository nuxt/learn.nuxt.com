<script setup lang="ts">
const props = defineProps<{
  title: string
  iconClass: string
}>()
</script>

<template>
  <div flex="~ gap-2 items-center" px4 py2 border="b base dashed" bg-faded>
    <div :class="props.iconClass" />
    <span text-sm>{{ props.title }}</span>
  </div>
</template>
