import { type FileSystemTree, WebContainer } from '@webcontainer/api'

let _webContainerPromise: Promise<WebContainer>
type Status = 'init' | 'mount' | 'install' | 'start' | 'ready' | 'error'

export async function useWebContainer() {
  if (!_webContainerPromise)
    _webContainerPromise = WebContainer.boot()

  const webcontainerStatus = ref<Status>('init')
  const webcontainerUrl = ref<string>()
  const stream = ref<ReadableStream>()

  const webcontainerInstance = await _webContainerPromise

  const tree = globFilesToWebContainerFs(
    '../templates/basic/',
    import.meta.glob([
      '../templates/basic/**/*.*',
      '!**/node_modules/**',
    ], {
      as: 'raw',
      eager: true,
    }),
  )

  function setWebContainerStatus(value: Status): void {
    webcontainerStatus.value = value
  }

  async function installDependencies() {
    const installProcess = await webcontainerInstance.spawn('pnpm', ['install'])
    return installProcess.exit
  }

  async function startDevServer() {
    setWebContainerStatus('start')
    const devProcess = await webcontainerInstance.spawn('pnpm', ['run', 'dev'])

    stream.value = devProcess.output

    webcontainerInstance.on('server-ready', (_, url) => {
      if (url)
        webcontainerUrl.value = url

      setWebContainerStatus('ready')
    })

    webcontainerInstance.on('error', () => {
      setWebContainerStatus('error')
    })

    if (import.meta.hot) {
      import.meta.hot.accept(() => {
        devProcess.kill()
      })
    }
  }

  async function loadWebContainer() {
    setWebContainerStatus('mount')
    await webcontainerInstance.mount(tree)

    setWebContainerStatus('install')
    const exitCode = await installDependencies()
    if (exitCode !== 0)
      throw new Error('Installation failed')

    await startDevServer()
  }
  return {
    stream,
    webcontainerUrl,
    webcontainerStatus,
    loadWebContainer,
  }
}

export function globFilesToWebContainerFs(
  prefix: string,
  rawFiles: Record<string, string>,
) {
  const files = Object.fromEntries(
    Object.entries(rawFiles).map(([path, content]) => {
      return [path.replace(prefix, ''), {
        file: {
          contents: content,
        },
      }]
    }),
  )

  const tree: FileSystemTree = {}

  for (const [path, file] of Object.entries(files)) {
    if (!path.includes('/')) { tree[path] = file }
    else {
      const parts = path.split('/')
      const filename = parts.pop()!
      let current = tree
      for (const dir of parts) {
        if (!current[dir]) {
          current[dir] = {
            directory: {},
          }
        }
        const node = current[dir]
        if (!('directory' in node))
          throw new Error('Unexpected directory but found file')
        current = node.directory
      }
      current[filename] = file
    }
  }
  return tree
}
