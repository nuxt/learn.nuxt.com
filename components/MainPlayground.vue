<!--
Please create an issue first before submiting PRs.
So that we can discuss about the directions and plans, to avoid wasted efforts. Thank you!
-->

<script setup lang="ts">
// @ts-expect-error missing type
import { Pane, Splitpanes } from 'splitpanes'

const ui = useUiState()
const play = usePlaygroundStore()

function startDragging() {
  ui.isPanelDragging = true
}

function endDraggingVertical(e: { size: number }[]) {
  ui.isPanelDragging = false
  ui.panelDocs = e[0].size
}

function endDraggingHorizontal(e: { size: number }[]) {
  ui.isPanelDragging = false
  ui.panelEditor = e[0].size
  ui.panelPreview = e[1].size
}
</script>

<template>
  <Splitpanes
    class="h-full of-hidden"
    @resize="startDragging"
    @resized="endDraggingVertical"
  >
    <Pane :size="ui.panelDocs" min-size="10">
      <PanelGuide />
    </Pane>
    <Pane :size="100 - ui.panelDocs">
      <Splitpanes
        max-h-full w-full of-hidden relative horizontal
        @resize="startDragging"
        @resized="endDraggingHorizontal"
      >
        <Pane :size="ui.panelEditor" min-size="4.5">
          <PanelEditor :files="play?.files" />
        </Pane>
        <Pane :size="ui.panelPreview" min-size="4.5">
          <PanelPreview />
        </Pane>
        <Pane :size="100 - ui.panelPreview - ui.panelEditor" min-size="4.5" class="hover:cursor-pointer" @click="ui.collapseTerminalPanel()">
          <PanelTerminal :stream="play?.stream" />
        </Pane>
      </Splitpanes>
    </Pane>
  </Splitpanes>
</template>