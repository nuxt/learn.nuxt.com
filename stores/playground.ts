import type { Raw } from 'vue'
import type { WebContainer, WebContainerProcess } from '@webcontainer/api'
import { dirname } from 'pathe'
import { VirtualFile } from '../structures/VirtualFile'
import type { ClientInfo } from '~/types/rpc'
import type { GuideMeta, PlaygroundFeatures } from '~/types/guides'

export const PlaygroundStatusOrder = [
  'init',
  'mount',
  'install',
  'start',
  'polling',
  'ready',
  'interactive',
] as const

export type PlaygroundStatus = typeof PlaygroundStatusOrder[number] | 'error'

const NUXT_PORT = 4000

export const usePlaygroundStore = defineStore('playground', () => {
  const ui = useUiState()

  const status = ref<PlaygroundStatus>('init')
  const error = shallowRef<{ message: string }>()
  const currentProcess = shallowRef<Raw<WebContainerProcess | undefined>>()
  const files = shallowReactive<Raw<Map<string, VirtualFile>>>(new Map())
  const webcontainer = shallowRef<Raw<WebContainer>>()
  const clientInfo = ref<ClientInfo>()
  const fileSelected = shallowRef<Raw<VirtualFile>>()
  const mountedGuide = shallowRef<Raw<GuideMeta>>()
  const features = ref<PlaygroundFeatures>({})

  const previewLocation = ref({
    origin: '',
    fullPath: '',
  })
  const previewUrl = ref('')

  function updatePreviewUrl() {
    previewUrl.value = previewLocation.value.origin + previewLocation.value.fullPath
  }

  const colorMode = useColorMode()
  let mountPromise: Promise<void> | undefined
  let hasInstalled = false

  // Mount the playground on client side
  if (import.meta.client) {
    async function mount() {
      const { templates } = await import('../templates')
      const { files: _files, tree } = await templates.basic({
        nuxtrc: [
          // Have color mode on initial load
          colorMode.value === 'dark'
            ? 'app.head.htmlAttrs.class=dark'
            : '',
        ],
      })

      const wc = await import('@webcontainer/api')
        .then(({ WebContainer }) => WebContainer.boot())

      webcontainer.value = wc
      _files.forEach((file) => {
        files.set(file.filepath, file)
        file.wc = wc
      })

      wc.on('server-ready', async (port, url) => {
        // Nuxt listen to multiple ports, and 'server-ready' is emitted for each of them
        // We need the main one
        if (port === NUXT_PORT) {
          previewLocation.value = {
            origin: url,
            fullPath: '/',
          }
          status.value = 'polling'
        }
      })

      wc.on('error', (err) => {
        error.value = err
        status.value = 'error'
      })

      status.value = 'mount'
      await wc.mount(tree)

      startServer()

      // In dev, when doing HMR, we kill the previous process while reusing the same WebContainer
      if (import.meta.hot) {
        import.meta.hot.accept(() => {
          killPreviousProcess()
        })
      }
    }

    mountPromise = mount()
  }

  watch(features, () => {
    if (features.value.fileTree === true) {
      if (ui.panelFileTree <= 0)
        ui.panelFileTree = 20
    }
    else if (features.value.fileTree === false) {
      ui.panelFileTree = 0
    }

    if (features.value.terminal === true)
      ui.showTerminal = true
    else if (features.value.terminal === false)
      ui.showTerminal = false
  })

  let abortController: AbortController | undefined

  function killPreviousProcess() {
    abortController?.abort()
    abortController = undefined
    currentProcess.value?.kill()
    currentProcess.value = undefined
  }

  async function startServer(reinstall = false) {
    if (!import.meta.client)
      return

    killPreviousProcess()

    const wc = webcontainer.value!
    abortController = new AbortController()
    const signal = abortController.signal

    if (reinstall)
      hasInstalled = false

    if (!hasInstalled)
      await launchInstallProcess(wc, signal)

    if (hasInstalled)
      await launchNuxtProcess(wc, signal)

    await launchInteractiveProcess(wc, signal)
  }

  async function spawn(wc: WebContainer, command: string, args: string[] = []) {
    if (currentProcess.value)
      throw new Error('A process is already running')
    const process = await wc.spawn(command, args, {
      env: {
        NUXT_PORT: NUXT_PORT.toString(),
      },
    })
    currentProcess.value = process
    return process.exit.then((r) => {
      if (currentProcess.value === process)
        currentProcess.value = undefined
      return r
    })
  }

  async function launchInstallProcess(wc: WebContainer, signal: AbortSignal) {
    if (signal.aborted)
      return

    status.value = 'install'

    const installExitCode = await spawn(wc, 'pnpm', ['install'])
    if (signal.aborted)
      return

    if (installExitCode !== 0) {
      status.value = 'error'
      error.value = {
        message: `Unable to run npm install, exit as ${installExitCode}`,
      }
      console.error('Unable to run npm install')
      return false
    }

    hasInstalled = true
  }

  async function launchNuxtProcess(wc: WebContainer, signal: AbortSignal) {
    if (signal.aborted)
      return
    status.value = 'start'
    await spawn(wc, 'pnpm', ['run', 'dev', '--no-qr'])
  }

  async function launchInteractiveProcess(wc: WebContainer, signal: AbortSignal) {
    if (signal.aborted)
      return
    status.value = 'interactive'
    await spawn(wc, 'jsh')
  }

  async function downloadZip() {
    if (!import.meta.client)
      return

    const wc = webcontainer.value!

    const { default: JSZip } = await import('jszip')
    const zip = new JSZip()

    type Zip = typeof zip

    const crawlFiles = async (dir: string, zip: Zip) => {
      const files = await wc.fs.readdir(dir, { withFileTypes: true })

      await Promise.all(
        files.map(async (file) => {
          if (isFileIgnored(file.name))
            return

          if (file.isFile()) {
            // TODO: If it's package.json, we modify to remove some fields
            const content = await wc.fs.readFile(`${dir}/${file.name}`, 'utf8')
            zip.file(file.name, content)
          }
          else if (file.isDirectory()) {
            const folder = zip.folder(file.name)!
            return crawlFiles(`${dir}/${file.name}`, folder)
          }
        }),
      )
    }

    await crawlFiles('.', zip)

    const blob = await zip.generateAsync({ type: 'blob' })
    const url = URL.createObjectURL(blob)
    const date = new Date()
    const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`
    const link = document.createElement('a')
    link.href = url
    // TODO: have a better name with the current tutorial name
    link.download = `nuxt-playground-${dateString}.zip`
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
  }

  const guideDispose: (() => void | Promise<void>)[] = []

  async function mountGuide(guide?: GuideMeta) {
    await mountPromise

    // Unmount the previous guide
    await Promise.all(guideDispose.map(dispose => dispose()))
    guideDispose.length = 0

    if (guide) {
      // eslint-disable-next-line no-console
      console.log('mounting guide', guide)

      await Promise.all(
        Object.entries(guide?.files || {})
          .map(async ([filepath, content]) => {
            await webcontainer.value?.fs.mkdir(dirname(filepath), { recursive: true })
            await updateOrCreateFile(filepath, content)
          }),
      )

      features.value = guide?.features || {}
    }
    else {
      features.value = {}
    }

    previewLocation.value.fullPath = guide?.startingUrl || '/'
    fileSelected.value = files.get(guide?.startingFile || 'app.vue')
    updatePreviewUrl()

    mountedGuide.value = guide

    return undefined

    async function updateOrCreateFile(filepath: string, content: string) {
      const file = files.get(filepath)
      if (file) {
        const oldContent = file.read()
        await file.write(content)
        guideDispose.push(async () => {
          await file.write(oldContent)
        })
        return file
      }
      else {
        const newFile = new VirtualFile(filepath, content)
        newFile.wc = webcontainer.value
        await newFile.write(content)
        files.set(filepath, newFile)
        guideDispose.push(async () => {
          files.delete(filepath)
          await webcontainer.value!.fs.rm(filepath)
        })
        return newFile
      }
    }
  }

  return {
    clientInfo,
    currentProcess,
    downloadZip,
    error,
    files,
    fileSelected,
    mountedGuide,
    mountGuide,
    previewLocation,
    previewUrl,
    features,
    restartServer: startServer,
    status,
    updatePreviewUrl,
    webcontainer,
  }
})

export type PlaygroundStore = ReturnType<typeof usePlaygroundStore>
