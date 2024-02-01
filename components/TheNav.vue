<script setup lang="ts">
const ui = useUiState()
const play = usePlaygroundStore()
const guide = useGuideStore()
const runtime = useRuntimeConfig()
const commands = useCommandsStore()

const repo = 'https://github.com/nuxt/learn.nuxt.com'
const buildTime = new Date(runtime.public.buildTime)
const timeAgo = useTimeAgo(buildTime)

function downloadCurrentGuide() {
  if (!play.webcontainer)
    throw new Error('No webcontainer found')

  if (play.status !== 'ready')
    throw new Error('Playground is not ready')

  if (!guide.features.download)
    throw new Error(`Download feature is disabled for guide ${guide.currentGuide}`)

  downloadZip(play.webcontainer, guide.ignoredFiles)
}

addCommands(
  {
    id: 'download-zip',
    title: 'Download playground as ZIP',
    visible: () => {
      return play.status === 'ready' && guide.features.download !== false
    },
    handler: () => {
      downloadCurrentGuide()
    },
    icon: 'i-ph-download-duotone',
  },
  {
    id: 'toggle-terminal',
    title: 'Toggle terminal',
    handler: () => {
      ui.toggleTerminal()
    },
    icon: 'i-ph-terminal-window-duotone',
  },
)
</script>

<template>
  <nav
    px4 py3 text-lg border="b base" flex="~ gap-1 items-center"
  >
    <NuxtLink to="/" title="Nuxt Tutorial">
      <NuxtTutorialLogo h-2em />
    </NuxtLink>
    <NuxtLink
      href="https://github.com/nuxt/learn.nuxt.com"
      target="_blank"
    >
      <div block translate-y--2 rounded bg-orange:10 px2 py1 text-xs text-orange>
        Working in Progress
      </div>
    </NuxtLink>

    <div flex-auto />
    <div
      flex="~ gap-1 items-center"
      :class="guide.embeddedDocs ? 'z-embedded-docs-raised' : ''"
    >
      <button
        rounded p2
        hover="bg-active"
        title="Search"
        @click="commands.isShown = true"
      >
        <div i-ph-magnifying-glass-duotone text-2xl />
      </button>
      <button
        v-if="play.status === 'ready' && !!guide.features.download"
        rounded p2
        hover="bg-active"
        title="Download as ZIP"
        @click="downloadCurrentGuide()"
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
