<script lang="ts" setup>
import type { NuxtDevtoolsHostClient } from '@nuxt/devtools-kit/types'

function reloadDevtools() {
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-nocheck will error when devtool disabled
  const devtools = window.__NUXT_DEVTOOLS_HOST__ as NuxtDevtoolsHostClient | undefined
  if (!devtools)
    return
  const devtoolsIframeEl = devtools.getIframe()
  if (devtoolsIframeEl) {
    devtoolsIframeEl.allow = 'cross-origin-isolated'
    devtoolsIframeEl.setAttribute('credentialless', 'true')
    // eslint-disable-next-line no-self-assign
    devtoolsIframeEl.src = devtoolsIframeEl.src
  }
}
onMounted(reloadDevtools)
</script>

<template>
  <main
    h-100dvh h-screen w-screen of-hidden
    grid="~ rows-[max-content_1fr]"
  >
    <TheNav />
    <slot />
  </main>
</template>
