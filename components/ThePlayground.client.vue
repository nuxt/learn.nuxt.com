<script setup lang="ts">
// @ts-expect-error missing type
import { Pane, Splitpanes } from 'splitpanes'

const iframe = ref<HTMLIFrameElement>()

const isDragging = usePanelDragging()

const panelSizeEditor = usePanelCookie('nuxt-playground-panel-editor', 30)
const panelSizeFrame = usePanelCookie('nuxt-playground-panel-frame', 30)

const {
  webcontainerUrl,
  webcontainerStatus,
  stream,
  loadWebContainer,
} = await useWebContainer()

function startDragging() {
  isDragging.value = true
}

function endDragging(e: { size: number }[]) {
  isDragging.value = false
  panelSizeEditor.value = e[0].size
  panelSizeFrame.value = e[1].size
}

onMounted(async () => {
  await loadWebContainer()
})
</script>

<template>
  <Splitpanes
    max-h-full w-full of-hidden relative horizontal
    @resize="startDragging" @resized="endDragging"
  >
    <Pane :size="panelSizeEditor" min-size="10">
      [This is the editor]
    </Pane>
    <Pane :size="panelSizeFrame" min-size="10">
      <iframe
        v-if="!!webcontainerUrl"
        ref="iframe"
        :src="webcontainerUrl"
        :class="{ 'pointer-events-none': isDragging }"
        w-full h-full
        allow="geolocation; microphone; camera; payment; autoplay; serial; cross-origin-isolated"
      />
      <div v-if="webcontainerStatus !== 'ready'" flex="~ col items-center justify-center" h-full capitalize text-lg>
        <div i-svg-spinners-90-ring-with-bg />
        {{ webcontainerStatus }}ing...
      </div>
    </Pane>
    <Pane>
      <TerminalOutput :stream="stream" />
    </Pane>
  </Splitpanes>
</template>
