<script setup lang="ts">

const play = usePlaygroundStore()

function getStatusIcon(status: PlaygroundStage) {
  switch (play.stageStatusMap[status]) {
    case 'rejected':
      return 'i-ph-x-circle-duotone text-error text-xl'
    case 'pending':
      return 'i-svg-spinners-90-ring-with-bg scale-95 text-xl'
    case 'fulfilled':
      return 'i-ph-check-circle-duotone text-primary text-xl'
    case 'waiting':
      return 'i-ph-dot-duotone text-xl'
  }
}

function getTextClass(status: PlaygroundStage) {
  switch (play.stageStatusMap[status]) {
    case 'rejected':
      return 'text-red'
    case 'pending':
      return 'animate-pulse'
    case 'fulfilled':
      return 'text-primary'
    case 'waiting':
      return 'op50'
  }
}
</script>

<template>
  <div
    v-if="play.stageStatusMap.ready !== 'fulfilled'"
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
      <div :class="getStatusIcon('ready')" />
      <span :class="getTextClass('ready')">Boot Nuxt Server</span>
    </div>
  </div>
</template>
