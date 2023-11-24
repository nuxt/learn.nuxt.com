<script setup lang="ts">
const ui = useUiState()
const play = usePlaygroundStore()

const iframe = ref<HTMLIFrameElement>()
const inputUrl = ref<string>('')

// auto update inputUrl when location value changed
syncRef(computed(() => play.previewLocation.fullPath), inputUrl, { direction: 'ltr' })

function refreshIframe() {
  if (play.previewUrl && iframe.value) {
    iframe.value.src = play.previewUrl
    inputUrl.value = play.previewLocation.fullPath
  }
}

function navigate() {
  play.previewLocation.fullPath = inputUrl.value

  const activeElement = document.activeElement
  if (activeElement instanceof HTMLElement)
    activeElement.blur()
}

onMounted(() => {
  mountPlayground(play)
})
</script>

<template>
  <div grid="~ cols-[80px_1fr_80px]" px4 border="b base dashed" bg-faded>
    <div flex="~ gap-2 items-center" py2>
      <div i-ph-globe-duotone />
      <span text-sm>Preview</span>
    </div>
    <div flex px-2 py1.5>
      <div
        flex="~ items-center justify-center"
        mx-auto w-full px2 max-w-100 bg-faded rounded text-sm border="base 1 hover:gray-500/30"
        :class="{
          'pointer-events-none': !play.previewUrl,
        }"
      >
        <form w-full @submit.prevent="navigate">
          <input v-model="inputUrl" w-full type="text" bg-transparent flex-1 focus:outline-none>
        </form>
        <div flex="~ items-center justify-end">
          <button
            v-if="play.previewUrl" mx1 op-75 hover:op-100
            @click="refreshIframe"
          >
            <div i-ph-arrow-clockwise-duotone text-sm />
          </button>
        </div>
      </div>
    </div>
  </div>
  <iframe
    v-if="play.previewUrl"
    ref="iframe"
    :src="play.previewUrl"
    :class="{ 'pointer-events-none': ui.isPanelDragging }"
    w-full h-full bg-transparent
    allow="geolocation; microphone; camera; payment; autoplay; serial; cross-origin-isolated"
  />
  <div v-if="play.status !== 'ready'" flex="~ col items-center justify-center" h-full capitalize text-lg>
    <div i-svg-spinners-90-ring-with-bg />
    {{ play.status }}ing...
  </div>
</template>
