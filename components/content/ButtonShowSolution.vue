<script setup lang="ts">
const guide = useGuideStore()
</script>

<template>
  <button
    v-if="guide.currentGuide?.solutions"
    flex="~ gap-2 items-center"
    @click="guide.toggleSolutions()"
  >
    <div v-if="!guide.showingSolution " i-ph-lightbulb-filament-duotone />
    <div v-else i-ph-arrow-counter-clockwise-duotone />
    {{ guide.showingSolution ? 'Reset challenge' : 'Show solution' }}
  </button>
</template>
