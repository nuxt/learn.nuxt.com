import { basename, dirname } from 'pathe'
import * as volar from '@volar/monaco'
import { Uri, editor, languages } from 'monaco-editor-core'
import * as onigasm from 'onigasm'
import onigasmWasm from 'onigasm/lib/onigasm.wasm?url'
import { getOrCreateModel } from './utils'
import type { CreateData } from './vue.worker'
import type { FileType } from './types'

export type PlaygroundMonacoContext = Pick<PlaygroundStore, 'webcontainer' | 'files'>

export function loadWasm() {
  return onigasm.loadWASM(onigasmWasm)
}

export class WorkerHost {
  constructor(private ctx: PlaygroundMonacoContext) {}

  async fsReadFile(uriString: string, encoding = 'utf-8') {
    const uri = Uri.parse(uriString)
    try {
      const filepath = withoutLeadingSlash(uri.fsPath)
      const content = await this.ctx.webcontainer!.fs.readFile(filepath, encoding as 'utf-8')
      if (content != null)
        getOrCreateModel(uri, undefined, content)
      return content
    }
    catch (err) {
      console.error(err)
      return undefined
    }
  }

  // Because WebContainer doesn't support fs.stat,
  // we have to use readdir to check if the file is a directory
  async fsStat(uriString: string) {
    const uri = Uri.parse(uriString)
    const dir = withoutLeadingSlash(dirname(uri.fsPath))
    const base = basename(uri.fsPath)

    try {
      // TODO: should we cache it?
      const files = await this.ctx.webcontainer!.fs.readdir(dir, { withFileTypes: true })
      const file = files.find(item => item.name === base)
      if (!file)
        return undefined
      if (file.isFile()) {
        return {
          type: 1 satisfies FileType.File,
          size: 100,
          ctime: Date.now(),
          mtime: Date.now(),
        }
      }
      else {
        return {
          type: 2 satisfies FileType.Directory,
          size: -1,
          ctime: -1,
          mtime: -1,
        }
      }
    }
    catch (err) {
      return undefined
    }
  }

  async fsReadDirectory(uriString: string) {
    const uri = Uri.parse(uriString)
    try {
      const filepath = withoutLeadingSlash(uri.fsPath)
      const result = await this.ctx.webcontainer!.fs.readdir(filepath, { withFileTypes: true })
      return result.map(item => [item.name, item.isDirectory() ? 2 : 1]) as [string, 1 | 2][]
    }
    catch (err) {
      console.error(err)
      return []
    }
  }
}

let disposeVue: undefined | (() => void)
export async function reloadLanguageTools(ctx: PlaygroundMonacoContext) {
  disposeVue?.()

  const worker = editor.createWebWorker<any>({
    moduleId: 'vs/language/vue/vueWorker',
    label: 'vue',
    host: new WorkerHost(ctx),
    createData: {
      tsconfig: {},
    } satisfies CreateData,
  })

  const languageId = ['vue', 'javascript', 'typescript']
  const getSyncUris = () => ctx.files.map(file => Uri.parse(`file:///${file.filepath}`))
  const { dispose: disposeMarkers } = volar.editor.activateMarkers(
    worker,
    languageId,
    'vue',
    getSyncUris,
    editor,
  )
  const { dispose: disposeAutoInsertion } = volar.editor.activateAutoInsertion(
    worker,
    languageId,
    getSyncUris,
    editor,
  )
  const { dispose: disposeProvides } = await volar.languages.registerProvides(
    worker,
    languageId,
    getSyncUris,
    languages,
  )

  disposeVue = () => {
    worker?.dispose()
    disposeMarkers()
    disposeAutoInsertion()
    disposeProvides()
  }
}

function withoutLeadingSlash(path: string) {
  return path.replace(/^\/+/, '')
}
