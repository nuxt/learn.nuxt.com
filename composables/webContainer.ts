/**
 * Please create an issue first before submiting PRs.
 * So that we can discuss about the directions and plans, to avoid wasted efforts. Thank you!
 */

import type { WebContainerProcess } from '@webcontainer/api'
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

export async function mountPlayground(
  play: PlaygroundState,
  colorMode: string,
) {
  const { files, tree } = await templates.basic({
    nuxtrc: [
      // Have color mode on initial load
      colorMode === 'dark'
        ? 'app.head.htmlAttrs.class=dark'
        : '',
    ],
  })

  const wc = await useWebContainer()

  play.webcontainer = wc
  play.files = files

  files.forEach((file) => {
    file.wc = wc
  })

  wc.on('server-ready', async (port, url) => {
    // Nuxt listen to multiple ports, and 'server-ready' is emitted for each of them
    // We need the main one
    if (port === 3000) {
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

  let processInstall: WebContainerProcess | undefined
  let processDev: WebContainerProcess | undefined

  // Assign actions
  play.actions.restartServer = startServer

  function killPreviousProcess() {
    processInstall?.kill()
    processDev?.kill()
  }

  async function startServer() {
    killPreviousProcess()

    play.status = 'install'

    processInstall = await wc.spawn('pnpm', ['install'])
    play.stream = processInstall.output
    const installExitCode = await processInstall.exit

    if (installExitCode !== 0) {
      play.status = 'error'
      play.error = {
        message: `Unable to run npm install, exit as ${installExitCode}`,
      }
      throw new Error('Unable to run npm install')
    }

    play.status = 'start'
    processDev = await wc.spawn('pnpm', ['run', 'dev'])
    play.stream = processDev.output
  }

  startServer()

  // In dev, when doing HMR, we kill the previous process while reusing the same WebContainer
  if (import.meta.hot) {
    import.meta.hot.accept(() => {
      killPreviousProcess()
    })
  }
}
