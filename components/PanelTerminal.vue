<script setup lang="ts">
const ui = useUiState()
const play = usePlaygroundStore()
</script>

<template>
  <div h-full grid="~ rows-[min-content_1fr]">
    <div
      flex="~ gap-2 items-center"
      border="b base dashed"
      bg-faded p2 pl4
    >
      <div i-ph-terminal-window-duotone />
      <span text-sm>{{ $t('terminal.name') }}</span>
      <div flex-auto />
      <button
        v-if="play.status !== 'init' && play.status !== 'mount'"
        hover="bg-active" rounded p1
        :title="$t('terminal.restart')"
        @click="play.restartServer()"
      >
        <div i-ph-arrow-clockwise-duotone />
      </button>
      <button
        hover="bg-active" rounded p1
        :title="$t('terminal.hide')"
        @click="ui.toggleTerminal()"
      >
        <div i-ph-x-bold />
      </button>
    </div>
    <PanelTerminalClient />
  </div>
</template>
