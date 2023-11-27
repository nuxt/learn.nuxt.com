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
</template>
