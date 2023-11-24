<script setup lang="ts">
// @ts-expect-error missing type
import { Pane, Splitpanes } from 'splitpanes'

const isDragging = usePanelDragging()
const leftSize = usePlaygroundCookie('nuxt-playground-panel-left', 30)

function start() {
  isDragging.value = true
}

function end(e: { size: number }[]) {
  isDragging.value = false
  leftSize.value = e[0].size
}
</script>

<template>
  <Splitpanes class="h-full of-hidden" @resize="start" @resized="end">
    <Pane :size="leftSize" min-size="10">
      <PanelGuide />
    </Pane>
    <Pane :size="100 - leftSize">
      <ThePlayground />
    </Pane>
  </Splitpanes>
</template>
