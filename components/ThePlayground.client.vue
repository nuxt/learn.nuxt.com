<!--
Please create an issue first before submiting PRs.
So that we can discuss about the directions and plans, to avoid wasted efforts. Thank you!
-->

<script setup lang="ts">
// @ts-expect-error missing type
import { Pane, Splitpanes } from 'splitpanes'

const iframe = ref<HTMLIFrameElement>()

type Status = 'init' | 'mount' | 'install' | 'start' | 'ready' | 'error'

const status = ref<Status>('init')
const error = shallowRef<{ message: string }>()

const isDragging = usePanelDragging()
const panelSizeEditor = usePanelCookie('nuxt-playground-panel-editor', 30)
const panelSizeFrame = usePanelCookie('nuxt-playground-panel-frame', 30)

const { iframeLocation, wcUrl } = usePlayground()

// auto update inputUrl when location value changed
const inputUrl = ref<string>('')
syncRef(computed(() => iframeLocation.value.fullPath), inputUrl, { direction: 'ltr' })

const stream = ref<ReadableStream>()

async function startDevServer() {
  const tree = globFilesToWebContainerFs(
    '../templates/basic/',
    import.meta.glob([
      '../templates/basic/**/*.*',
      '../templates/basic/**/.npmrc',
    ], {
      as: 'raw',
      eager: true,
    }),
  )

  console.log({ tree })

  const wc = await useWebContainer()

  wc.on('server-ready', (port, url) => {
    // Nuxt listen to multiple ports, and 'server-ready' is emitted for each of them
    // We need the main one
    if (port === 3000) {
      status.value = 'ready'
      iframeLocation.value = {
        origin: url,
        fullPath: '/',
      }
    }
  })

  wc.on('error', (err) => {
    status.value = 'error'
    error.value = err
  })

  status.value = 'mount'
  await wc.mount(tree)

  status.value = 'install'

  const installProcess = await wc.spawn('pnpm', ['install'])
  stream.value = installProcess.output
  const installExitCode = await installProcess.exit

  if (installExitCode !== 0) {
    status.value = 'error'
    error.value = {
      message: `Unable to run npm install, exit as ${installExitCode}`,
    }
    throw new Error('Unable to run npm install')
  }

  status.value = 'start'
  const devProcess = await wc.spawn('pnpm', ['run', 'dev'])
  stream.value = devProcess.output

  // In dev, when doing HMR, we kill the previous process while reusing the same WebContainer
  if (import.meta.hot) {
    import.meta.hot.accept(() => {
      devProcess.kill()
    })
  }
}

function startDragging() {
  isDragging.value = true
}
function endDragging(e: { size: number }[]) {
  isDragging.value = false
  panelSizeEditor.value = e[0].size
  panelSizeFrame.value = e[1].size
}

function refreshIframe() {
  if (wcUrl.value && iframe.value) {
    iframe.value.src = wcUrl.value
    inputUrl.value = iframeLocation.value.fullPath
  }
}

function navigate() {
  iframeLocation.value.fullPath = inputUrl.value

  const activeElement = document.activeElement
  if (activeElement instanceof HTMLElement)
    activeElement.blur()
}

onMounted(startDevServer)
</script>

<template>
  <Splitpanes
    max-h-full w-full of-hidden relative horizontal
    @resize="startDragging" @resized="endDragging"
  >
    <Pane :size="panelSizeEditor" min-size="10">
      <PanelEditor />
    </Pane>
    <Pane :size="panelSizeFrame" min-size="10">
      <div grid="~ cols-[80px_1fr_80px]" px4 border="b base dashed" bg-faded>
        <div flex="~ gap-2 items-center" py2>
          <div i-ph-globe-duotone />
          <span text-sm>Preview</span>
        </div>
        <div flex px-2 py1.5>
          <div
            flex="~ items-center justify-center" mx-auto w-full px2 max-w-100 bg-faded rounded text-sm border="base 1 hover:gray-500/30"
            :class="{
              'pointer-events-none': !wcUrl,
            }"
          >
            <form w-full @submit.prevent="navigate">
              <input v-model="inputUrl" w-full type="text" bg-transparent flex-1 focus:outline-none>
            </form>
            <div flex="~ items-center justify-end">
              <button v-if="wcUrl" mx1 op-75 hover:op-100 @click="refreshIframe">
                <div i-ph-arrow-clockwise-duotone text-sm />
              </button>
            </div>
          </div>
        </div>
      </div>
      <iframe
        v-if="wcUrl"
        ref="iframe"
        :src="wcUrl"
        :class="{ 'pointer-events-none': isDragging }"
        w-full h-full bg-transparent
        allow="geolocation; microphone; camera; payment; autoplay; serial; cross-origin-isolated"
      />
      <div v-if="status !== 'ready'" flex="~ col items-center justify-center" h-full capitalize text-lg>
        <div i-svg-spinners-90-ring-with-bg />
        {{ status }}ing...
      </div>
    </Pane>
    <Pane>
      <PanelTerminal :stream="stream" />
    </Pane>
  </Splitpanes>
</template>
