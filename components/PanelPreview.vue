<script setup lang="ts">
const play = usePlaygroundStore()

const inputUrl = ref<string>('')
const inner = ref<{ iframe?: Ref<HTMLIFrameElement | undefined> }>()

// auto update inputUrl when location value changed
syncRef(computed(() => play.previewLocation.fullPath), inputUrl, { direction: 'ltr' })

function refreshIframe() {
  if (play.previewUrl && inner.value?.iframe?.value) {
    inner.value.iframe.value.src = play.previewUrl
    inputUrl.value = play.previewLocation.fullPath
  }
}

function navigate() {
  play.previewLocation.fullPath = inputUrl.value

  const activeElement = document.activeElement
  if (activeElement instanceof HTMLElement)
    activeElement.blur()
}
</script>

<template>
  <div h-full grid="~ rows-[min-content_1fr]">
    <div
      grid="~ cols-[80px_1fr_80px]"
      border="b base dashed" bg-faded px4
    >
      <div flex="~ gap-2 items-center" py2>
        <div i-ph-globe-duotone />
        <span text-sm>Preview</span>
      </div>
      <div flex px-2 py1.5>
        <div
          flex="~ items-center justify-center"
          mx-auto max-w-100 w-full rounded bg-faded px2 text-sm
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
