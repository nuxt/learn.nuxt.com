<script setup lang="ts">
const play = usePlaygroundStore()

function getStep(status: PlaygroundStatus) {
  if (status === 'error' || play.status === 'error')
    return 'error'
  const indexCurrent = PlaygroundStatusOrder.indexOf(play.status)
  const index = PlaygroundStatusOrder.indexOf(status)
  if (indexCurrent === index)
    return 'current'
  if (indexCurrent > index)
    return 'done'
  return 'todo'
}

function getStatusIcon(status: PlaygroundStatus) {
  const step = getStep(status)
  switch (step) {
    case 'error':
      return 'i-ph-x-circle-duotone text-error text-xl'
    case 'current':
      return 'i-svg-spinners-90-ring-with-bg scale-95 text-xl'
    case 'done':
      return 'i-ph-check-circle-duotone text-primary text-xl'
    case 'todo':
      return 'i-ph-dot-duotone text-xl'
  }
}

function getTextClass(status: PlaygroundStatus) {
  const step = getStep(status)
  switch (step) {
    case 'error':
      return 'text-red'
    case 'current':
      return 'animate-pulse'
    case 'done':
      return 'text-primary'
    case 'todo':
      return 'op50'
  }
}
</script>

<template>
  <div
    v-if="play.status !== 'ready'"
    flex="~ col items-center gap-2 justify-center"
    h-full
  >
    <template v-if="play.status === 'interactive'">
      <div flex="~ gap-2 items-center" text-lg>
        <div i-ph-terminal-window-duotone text-2xl />
        Interactive terminal mode
      </div>
      <button
        title="Restart terminal"
        flex="~ gap-1 items-center"
        hover="bg-active text-blue op100"
        mx--1 rounded px1 op50
        @click="play.restartServer()"
      >
        <div i-ph-arrow-clockwise-duotone text-lg />
        Restart the server
      </button>
    </template>
    <div v-else grid="~ cols-[max-content_1fr] gap-2 items-center justify-center">
      <div :class="getStatusIcon('init')" />
      <span :class="getTextClass('init')">Initializing WebContainer</span>
      <div :class="getStatusIcon('mount')" />
      <span :class="getTextClass('mount')">Mounting files</span>
      <div :class="getStatusIcon('install')" />
      <span :class="getTextClass('install')">Installing dependencies</span>
      <div :class="getStatusIcon('start')" />
      <span :class="getTextClass('start')">Starting Nuxt server</span>
      <div :class="getStatusIcon('polling')" />
      <span :class="getTextClass('polling')">Waiting for Nuxt to ready</span>
    </div>
  </div>
</template>
