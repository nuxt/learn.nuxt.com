<script setup lang="ts">
const ui = useUiState()
const play = usePlaygroundStore()
</script>

<template>
  <nav px4 py3 text-lg border="b base" flex="~ gap-1 items-center">
    <NuxtLink to="/" title="Nuxt Playground">
      <NuxtPlaygroundLogo h-2em />
    </NuxtLink>
    <div flex-auto />
    <button
      v-if="play.status === 'ready'"
      rounded p2
      hover="bg-active"
      title="Download as ZIP"
      @click="play.downloadZip()"
    >
      <div i-ph-download-duotone text-2xl />
    </button>
    <button
      rounded p2
      title="Toggle terminal"
      hover="bg-active"
      :class="ui.showTerminal ? '' : 'op50'"
      @click="ui.toggleTerminal()"
    >
      <div i-ph-terminal-window-duotone text-2xl />
    </button>
    <ColorSchemeToggle />
    <NuxtLink
      rounded p2
      title="GitHub"
      hover="bg-active"
      href="https://github.com/nuxt/learn.nuxt.com"
      target="_blank"
    >
      <div i-carbon-logo-github text-2xl />
    </NuxtLink>
  </nav>
</template>
