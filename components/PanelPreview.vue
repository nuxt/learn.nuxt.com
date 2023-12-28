<script setup lang="ts">
const play = usePlaygroundStore()
const preview = usePreviewStore()

const inputUrl = ref<string>('')
const inner = ref<{ iframe?: HTMLIFrameElement | undefined }>()

// auto update inputUrl when location value changed
syncRef(
  computed(() => preview.location.fullPath),
  inputUrl,
  { direction: 'ltr' },
)

function refreshIframe() {
  preview.updateUrl()
  if (preview.url && inner.value?.iframe) {
    inner.value.iframe.src = preview.url
    inputUrl.value = preview.location.fullPath
  }
}

watch(
  () => play.status,
  (status) => {
    if (status === 'ready' || status === 'polling')
      refreshIframe()
  },
  { flush: 'sync' },
)

function navigate() {
  preview.location.fullPath = inputUrl.value
  preview.updateUrl()
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
      border="b base dashed" bg-faded pl4 pr2
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
            'pointer-events-none': !preview.url,
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
              v-if="preview.url"
              mx1 op-75 hover:op-100
              @click="refreshIframe"
            >
              <div i-ph-arrow-clockwise-duotone text-sm />
            </button>
          </div>
        </div>
      </div>
      <div flex-auto />
      <VDropdown :distance="6">
        <button
          rounded p1
          hover="bg-active"
          title="Playground Information"
        >
          <div i-ph-info-duotone text-lg />
        </button>
        <template #popper>
          <div px5 py4 grid="~ gap-y-3 gap-x-2 cols-[max-content_1fr] items-center">
            <div i-uim-vuejs text-xl />
            <div flex="~ gap-2 items-center">
              Vue version:
              <div
                v-if="!preview.clientInfo?.versionVue"
                i-svg-spinners-90-ring-with-bg
              />
              <code v-else>
                v{{ preview.clientInfo.versionVue }}
              </code>
            </div>
            <div i-simple-icons-nuxtdotjs text-xl />
            <div flex="~ gap-2 items-center">
              Nuxt version:
              <div
                v-if="!preview.clientInfo?.versionNuxt"
                i-svg-spinners-90-ring-with-bg
              />
              <code v-else>
                v{{ preview.clientInfo.versionNuxt }}
              </code>
            </div>
          </div>
        </template>
      </VDropdown>
    </div>
    <div relative h-full w-full>
      <PanelPreviewLoading />
      <PanelPreviewClient ref="inner" />
    </div>
  </div>
</template>
