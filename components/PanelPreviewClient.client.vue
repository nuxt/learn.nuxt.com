<script setup lang="ts">
const ui = useUiState()
const play = usePlaygroundStore()

const iframe = ref<HTMLIFrameElement>()

onMounted(() => {
  mountPlayground(play)
})
</script>

<template>
  <iframe
    v-if="play.previewUrl"
    ref="iframe"
    :src="play.previewUrl"
    :class="{ 'pointer-events-none': ui.isPanelDragging }"
    h-full w-full bg-transparent
    allow="geolocation; microphone; camera; payment; autoplay; serial; cross-origin-isolated"
  />
  <div
    v-if="play.status !== 'ready'"
    flex="~ col items-center justify-center"
    h-full text-lg capitalize
  >
    <div i-svg-spinners-90-ring-with-bg />
    {{ play.status }}ing...
  </div>
</template>
