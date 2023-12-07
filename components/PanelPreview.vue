<script setup lang="ts">
const play = usePlaygroundStore()

const inputUrl = ref<string>('')
const inner = ref<{ iframe?: HTMLIFrameElement | undefined }>()

// auto update inputUrl when location value changed
syncRef(computed(() => play.previewLocation.fullPath), inputUrl, { direction: 'ltr' })

function refreshIframe() {
  play.updatePreviewUrl()
  if (play.previewUrl && inner.value?.iframe) {
    inner.value.iframe.src = play.previewUrl
    inputUrl.value = play.previewLocation.fullPath
  }
}

watch(
  () => play.status,
  (status) => {
    if (status === 'ready' || status === 'start')
      refreshIframe()
  },
  { flush: 'sync' },
)

function navigate() {
  play.previewLocation.fullPath = inputUrl.value
  play.updatePreviewUrl()
  const activeElement = document.activeElement
  if (activeElement instanceof HTMLElement)
    activeElement.blur()
}
</script>

<template>
  <div h-full :class="play.status === 'ready' ? ' grid grid-rows-[min-content_1fr]' : 'flex'">
    <div
      v-if="play.status === 'ready'"
      flex="~ items-center gap-2"
      border="b base dashed" bg-faded px4
    >
      <div flex="~ gap-2 items-center" py2>
        <div i-ph-globe-duotone />
        <span text-sm>Preview</span>
      </div>
      <div flex px-2 py1>
        <div
          flex="~ items-center justify-center"
          mx-auto min-w-100 w-full rounded bg-faded px2 text-sm
          border="base 1 hover:gray-500/30"
          :class="{
            'pointer-events-none': !play.previewUrl,
          }"
        >
          <form w-full @submit.prevent="navigate">
            <input
              v-model="inputUrl" type="text"
              w-full flex-1 bg-transparent focus:outline-none
            >
          </form>
          <div flex="~ items-center justify-end">
            <button
              v-if="play.previewUrl"
              mx1 op-75 hover:op-100
              @click="refreshIframe"
            >
              <div i-ph-arrow-clockwise-duotone text-sm />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div relative h-full w-full>
      <PanelPreviewLoading />
      <PanelPreviewClient ref="inner" />
    </div>
  </div>
</template>
