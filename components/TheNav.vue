<script setup lang="ts">
const ui = useUiState()
const play = usePlaygroundStore()
const guide = useGuideStore()
const runtime = useRuntimeConfig()

const repo = 'https://github.com/nuxt/learn.nuxt.com'
const buildTime = new Date(runtime.public.buildTime)
const timeAgo = useTimeAgo(buildTime)
</script>

<template>
  <nav
    px4 py3 text-lg border="b base" flex="~ gap-1 items-center"
  >
    <NuxtLink to="/" title="Nuxt Tutorial">
      <NuxtTutorialLogo h-2em />
    </NuxtLink>

    <div flex-auto />
    <div
      flex="~ gap-1 items-center"
      :class="guide.embeddedDocs ? 'z-embedded-docs-raised' : ''"
    >
      <button
        v-if="play.status === 'ready' && guide.features.download !== false"
        rounded p2
        hover="bg-active"
        title="Download as ZIP"
        @click="downloadZip(play.webcontainer!)"
      >
        <div i-ph-download-duotone text-2xl />
      </button>
      <VDropdown :distance="6">
        <button
          rounded p2
          hover="bg-active"
          title="Playground Information"
        >
          <div i-ph-info-duotone text-2xl />
        </button>
        <template #popper>
          <div px5 py4 grid="~ gap-y-3 gap-x-2 cols-[max-content_1fr] items-center">
            <div i-ph-package-duotone text-xl />
            <NuxtLink :to="`${repo}/commit/${runtime.public.gitSha}`" target="_blank" title="View on GitHub">
              <time :datetime="buildTime.toISOString()" :title="buildTime.toLocaleString()">
                Built {{ timeAgo }} (<code>{{ runtime.public.gitSha.slice(0, 5) }}</code>)
              </time>
            </NuxtLink>
          </div>
        </template>
      </VDropdown>
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
    </div>
  </nav>
</template>
