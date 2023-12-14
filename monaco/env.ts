import * as volar from '@volar/monaco'
import { Uri, editor, languages } from 'monaco-editor'
import * as onigasm from 'onigasm'
import onigasmWasm from 'onigasm/lib/onigasm.wasm?url'
import type { WebContainer } from '@webcontainer/api'
import { getOrCreateModel } from './utils'
import type { CreateData } from './vue.worker'
import type { FileType } from './types'

// TODO: refactor this out
export class Store {
  constructor(
    public ws: WebContainer,
  ) {}

  state = {
    typescriptVersion: '5.3.3',
    files: [] as string[],
  }

  vueVersion = '3.3.10'
}

export function loadWasm() {
  return onigasm.loadWASM(onigasmWasm)
}

export class WorkerHost {
  constructor(private store: Store) {}

  onFetchCdnFile(uri: string, content: string) {
    return getOrCreateModel(Uri.parse(uri), undefined, content)
  }

  async fsReadFile(uri: string, encoding = 'utf-8') {
    try {
      const filepath = new URL(uri).pathname.replace(/^\/+/, '')
      const content = await this.store.ws.fs.readFile(filepath, encoding as 'utf-8')
      if (content != null)
        getOrCreateModel(Uri.parse(uri), undefined, content)
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
    const filepath = new URL(uriString).pathname.replace(/^\/+/, '')
    const dirpath = new URL('.', uriString).pathname.replace(/^\/+/, '')
    const basename = filepath.slice(dirpath.length)

    const files = await this.store.ws.fs.readdir(dirpath, { withFileTypes: true })
    const file = files.find(item => item.name === basename)
    if (!file)
      return undefined
    if (file.isDirectory()) {
      return {
        type: 2 satisfies FileType.Directory,
        size: -1,
        ctime: -1,
        mtime: -1,
      }
    }
    else if (file.isFile()) {
      const content = await this.store.ws.fs.readFile(filepath, 'utf-8')
      return {
        type: 1 satisfies FileType.File,
        size: content.length,
        ctime: Date.now(),
        mtime: Date.now(),
      }
    }
  }

  async fsReadDirectory(uri: string) {
    const filepath = new URL(uri).pathname.replace(/^\/+/, '')
    const result = await this.store.ws.fs.readdir(filepath, { withFileTypes: true })
    return result.map(item => [item.name, item.isDirectory() ? 2 : 1]) as [string, 1 | 2][]
  }
}

let disposeVue: undefined | (() => void)
export async function reloadLanguageTools(store: Store) {
  disposeVue?.()

  const worker = editor.createWebWorker<any>({
    moduleId: 'vs/language/vue/vueWorker',
    label: 'vue',
    host: new WorkerHost(store),
    createData: {
      tsconfig: {},
    } satisfies CreateData,
  })
  const languageId = ['vue', 'javascript', 'typescript']
  const getSyncUris = () => {
    const files = store.state.files.map(filename =>
      Uri.parse(`file:///${filename}`),
    )
    return files
  }
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
    disposeMarkers()
    disposeAutoInsertion()
    disposeProvides()
  }
}

export interface WorkerMessage {
  event: 'init'
  tsVersion: string
  tsLocale?: string
}
