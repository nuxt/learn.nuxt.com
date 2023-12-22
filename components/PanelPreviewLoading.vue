<script setup lang="ts">
import { playgroundStatus } from '~/stores/playground'

const play = usePlaygroundStore()

function getStep(status: playgroundStatus) {
  if (status === playgroundStatus.error || play.status === playgroundStatus.error)
    return 'error'
  if (play.status === status)
    return 'current'
  if (play.status > status)
    return 'done'
  return 'todo'
}

function getStatusIcon(status: playgroundStatus) {
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

function getTextClass(status: playgroundStatus) {
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
    v-if="play.status !== playgroundStatus.ready"
    flex="~ col items-center justify-center"
    h-full capitalize
  >
    <div grid="~ cols-[max-content_1fr] gap-2 items-center justify-center">
      <div :class="getStatusIcon(playgroundStatus.init)" />
      <span :class="getTextClass(playgroundStatus.init)">Initialize WebContainer</span>
      <div :class="getStatusIcon(playgroundStatus.mount)" />
      <span :class="getTextClass(playgroundStatus.mount)">Mount files</span>
      <div :class="getStatusIcon(playgroundStatus.install)" />
      <span :class="getTextClass(playgroundStatus.install)">Install Dependencies</span>
      <div :class="getStatusIcon(playgroundStatus.start)" />
      <span :class="getTextClass(playgroundStatus.start)">Boot Nuxt Server</span>
    </div>
  </div>
</template>
