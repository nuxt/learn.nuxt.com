import { loadTemplate } from '../templates/basic'

if (import.meta.server)
  throw new Error('This file should not be imported on the server')

export type PlaygroundInstance = ReturnType<typeof createPlayground>

export function createPlayground() {
  type Status = 'init' | 'mount' | 'install' | 'start' | 'ready' | 'error'

  const status = ref<Status>('init')
  const error = shallowRef<{ message: string }>()
  const stream = ref<ReadableStream | undefined>()

  const previewLocation = ref({
    origin: '',
    fullPath: '',
  })

  const previewUrl = computed(() => previewLocation.value.origin + previewLocation.value.fullPath)

  window.addEventListener('message', (event) => {
    if (event.origin !== previewLocation.value.origin)
      return

    console.log('event', event)

    switch (event.data.type) {
      case 'update:path':
        previewLocation.value.fullPath = event.data.path
        break
      default:
        break
    }
  })

  const {
    files,
    tree,
  } = loadTemplate()

  async function mount() {
    const wc = await useWebContainer()

    files.forEach((file) => {
      file.wc = wc
    })

    wc.on('server-ready', (port, url) => {
      // Nuxt listen to multiple ports, and 'server-ready' is emitted for each of them
      // We need the main one
      if (port === 3000) {
        status.value = 'ready'
        previewLocation.value = {
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

  return markRaw({
    files,
    status,
    error,
    stream,
    mount,
    previewUrl,
    previewLocation,
  })
}
