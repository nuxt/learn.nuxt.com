<script setup lang="ts">
defineProps<{
  collapsed: boolean
}>()
</script>

<template>
  <div h-full grid="~ rows-[min-content_1fr]">
    <div
      flex="~ gap-2 items-center"
      border="b base dashed"
      bg-faded px4 py2
    >
      <div i-ph-terminal-window-duotone />
      <span text-sm>Terminal</span>
      <div flex-1 />
      <div i-ph-caret-right transition-transform :class="collapsed ? '' : 'rotate-90'" />
    </div>
    <PanelTerminalClient />
  </div>
</template>
