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
    flex="~ col items-center justify-center"
    h-full capitalize
  >
    <div grid="~ cols-[max-content_1fr] gap-2 items-center justify-center">
      <div :class="getStatusIcon('init')" />
      <span :class="getTextClass('init')">Initialize WebContainer</span>
      <div :class="getStatusIcon('mount')" />
      <span :class="getTextClass('mount')">Mount files</span>
      <div :class="getStatusIcon('install')" />
      <span :class="getTextClass('install')">Install Dependencies</span>
      <div :class="getStatusIcon('start')" />
      <span :class="getTextClass('start')">Boot Nuxt Server</span>
    </div>
  </div>
</template>
