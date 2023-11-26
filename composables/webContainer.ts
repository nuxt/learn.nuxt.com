/**
 * Please create an issue first before submiting PRs.
 * So that we can discuss about the directions and plans, to avoid wasted efforts. Thank you!
 */
import { createBirpc } from 'birpc'
import { WebContainer } from '@webcontainer/api'
import type { PlaygroundState } from '../stores/playground'
import { templates } from '~/templates'

if (import.meta.server)
  throw new Error('WebContainer cannot be mounted on server')

let _webContainerPromise: Promise<WebContainer>

export async function useWebContainer() {
  if (!_webContainerPromise)
    _webContainerPromise = WebContainer.boot()
  return await _webContainerPromise
}

export async function mountPlayground(play: PlaygroundState) {
  const { files, tree } = await templates.basic()

  const rpcFunctions = {
    hello(name: string) {
      console.log('hello', name)
      return `Hello, ${name}!`
    },
  }

  window.addEventListener('message', async (event) => {
    if (event.origin !== play.previewLocation.origin)
      return

    switch (event.data.type) {
      case 'port':
        {
          event.ports[0].start()
          const rpc = createBirpc<typeof rpcFunctions, typeof rpcFunctions>(rpcFunctions, {
            post: data => event.ports[0].postMessage(data),
            on: data => event.ports[0].addEventListener('message', e => data(e.data)),
          })
          await rpc.hello('Template')
        }
        break
      case 'update:path':
        play.previewLocation.fullPath = event.data.path
        break
      default:
        break
    }
  })

  const wc = await useWebContainer()

  play.webcontainer = wc
  play.files = files

  files.forEach((file) => {
    file.wc = wc
  })

  wc.on('server-ready', (port, url) => {
    // Nuxt listen to multiple ports, and 'server-ready' is emitted for each of them
    // We need the main one
    if (port === 3000) {
      play.status = 'ready'
      play.previewLocation = {
        origin: url,
        fullPath: '/',
      }
    }
  })

  wc.on('error', (err) => {
    play.status = 'error'
    play.error = err
  })

  play.status = 'mount'
  await wc.mount(tree)

  play.status = 'install'

  const installProcess = await wc.spawn('pnpm', ['install'])
  play.stream = installProcess.output
  const installExitCode = await installProcess.exit

  if (installExitCode !== 0) {
    play.status = 'error'
    play.error = {
      message: `Unable to run npm install, exit as ${installExitCode}`,
    }
    throw new Error('Unable to run npm install')
  }

  play.status = 'start'
  const devProcess = await wc.spawn('pnpm', ['run', 'dev'])
  play.stream = devProcess.output

  // In dev, when doing HMR, we kill the previous process while reusing the same WebContainer
  if (import.meta.hot) {
    import.meta.hot.accept(() => {
      devProcess.kill()
    })
  }
}
