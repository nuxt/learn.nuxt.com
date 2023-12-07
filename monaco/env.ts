import * as volar from '@volar/monaco'
import { Uri, editor, languages } from 'monaco-editor'
import * as onigasm from 'onigasm'
import onigasmWasm from 'onigasm/lib/onigasm.wasm?url'
import { getOrCreateModel } from './utils'
import type { CreateData } from './vue.worker'

// TODO: refactor this out
export class Store {
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
  onFetchCdnFile(uri: string, text: string) {
    getOrCreateModel(Uri.parse(uri), undefined, text)
  }
}

let disposeVue: undefined | (() => void)
export async function reloadLanguageTools(store: Store) {
  disposeVue?.()

  // let dependencies: Record<string, string> = {
  //   // ...store.state.dependencyVersion,
  // }

  // if (store.vueVersion) {
  //   dependencies = {
  //     ...dependencies,
  //     'vue': store.vueVersion,
  //     '@vue/compiler-core': store.vueVersion,
  //     '@vue/compiler-dom': store.vueVersion,
  //     '@vue/compiler-sfc': store.vueVersion,
  //     '@vue/compiler-ssr': store.vueVersion,
  //     '@vue/reactivity': store.vueVersion,
  //     '@vue/runtime-core': store.vueVersion,
  //     '@vue/runtime-dom': store.vueVersion,
  //     '@vue/shared': store.vueVersion,
  //   }
  // }

  // if (store.state.typescriptVersion) {
  //   dependencies = {
  //     ...dependencies,
  //     typescript: store.state.typescriptVersion,
  //   }
  // }

  const worker = editor.createWebWorker<any>({
    moduleId: 'vs/language/vue/vueWorker',
    label: 'vue',
    host: new WorkerHost(),
    createData: {
      tsconfig: {},
      dependencies: {},
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

  // console.log('volor registered', languages, languageId)

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
