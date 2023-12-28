<script setup lang="ts">
import { createBirpc } from 'birpc'
import type { FrameFunctions, ParentFunctions } from '~/types/rpc'

const ui = useUiState()
const play = usePlaygroundStore()
const colorMode = useColorMode()
const preview = usePreviewStore()

const iframe = ref<HTMLIFrameElement>()

const rpc = createBirpc<FrameFunctions, ParentFunctions>({
  onNavigate(path) {
    preview.location.fullPath = path
  },
  async onReady(info) {
    play.status = 'ready'
    preview.clientInfo = info
    syncColorMode()
  },
}, {
  post(payload) {
    iframe?.value?.contentWindow?.postMessage({
      source: 'nuxt-playground-parent',
      payload,
    }, '*')
  },
  on(fn) {
    window.addEventListener('message', (event) => {
      if (typeof event.data !== 'object')
        return
      if (event.data.source !== 'nuxt-playground-frame')
        return
      fn(event.data.payload)
    })
  },
})

function syncColorMode() {
  rpc.onColorModeChange.asEvent(colorMode.value)
}

watch(
  colorMode,
  syncColorMode,
  { flush: 'sync' },
)

defineExpose({
  iframe,
})
</script>

<template>
  <iframe
    v-if="preview.url"
    ref="iframe"
    :src="preview.url"
    :style="play.status === 'ready' ? '' : 'opacity: 0.001; pointer-events: none;'"
    :class="{ 'pointer-events-none': ui.isPanelDragging }"
    absolute inset-0 h-full w-full bg-transparent allow="geolocation; microphone; camera; payment; autoplay; serial; cross-origin-isolated"
  />
</template>
