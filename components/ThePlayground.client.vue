<script setup lang="ts">
import type { FileSystemTree } from '@webcontainer/api'

const iframe = ref<HTMLIFrameElement>()
const wcUrl = ref<string>()

type Status = 'init' | 'mount' | 'install' | 'start' | 'ready' | 'error'

const status = ref<Status>('init')
const error = shallowRef<{ message: string }>()

const stream = ref<ReadableStream>()

async function startDevServer() {
  const tree = globFilesToWebContainerFs(
    '../templates/nitro/',
    import.meta.glob([
      '../templates/nitro/**/*.*',
      '!**/node_modules/**',
    ], {
      as: 'raw',
      eager: true,
    }),
  )

  const wc = await useWebContainer()

  wc.on('server-ready', (port, url) => {
    status.value = 'ready'
    wcUrl.value = url
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

function sendMessage() {
  if (!iframe.value)
    return
  iframe.value.contentWindow!.postMessage('hello', '*')
}

watchEffect(() => {
  if (iframe.value && wcUrl.value)
    iframe.value.src = wcUrl.value
})

onMounted(startDevServer)
</script>

<template>
  <div max-h-full w-full grid="~ rows-[2fr_1fr]" of-hidden relative>
    <iframe v-show="status === 'ready'" ref="iframe" w-full h-full />
    <div v-if="status !== 'ready'" flex="~ col items-center justify-center" capitalize text-lg>
      <div i-svg-spinners-90-ring-with-bg />
      {{ status }}ing...
    </div>
    <TerminalOutput :stream="stream" class="min-h-0" />
    <button @click="sendMessage">
      send
    </button>
  </div>
</template>
