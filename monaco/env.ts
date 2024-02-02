import { basename, dirname } from 'pathe'
import * as volar from '@volar/monaco'
import { Uri, editor, languages } from 'monaco-editor-core'
import stripJsonComments from 'strip-json-comments'
import { getOrCreateModel } from './utils'
import type { CreateData } from './vue.worker'
import type { FileType } from './types'

export type PlaygroundMonacoContext = Pick<PlaygroundStore, 'webcontainer' | 'files'>

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

  // eslint-disable-next-line no-console
  console.info('Initializing Vue Language Service...')

  // Try load tsconfig.json from .nuxt
  const tsconfigRaw = await ctx.webcontainer?.fs
    .readFile('.nuxt/tsconfig.json', 'utf-8')
    .catch(() => undefined)

  if (!tsconfigRaw)
    return

  const tsconfig = tsconfigRaw
    ? JSON.parse(stripJsonComments(tsconfigRaw, { trailingCommas: true }))
    : {}

  // Resolve .nuxt/tsconfig.json paths from `./.nuxt` to `./`
  function resolvePath(path: string) {
    if (path.startsWith('./'))
      return `./.nuxt/${path.slice(2)}`
    if (path.startsWith('..'))
      return `.${path.slice(2)}`
    return path
  }
  tsconfig.compilerOptions ||= {}
  tsconfig.compilerOptions.paths ||= {}
  Object.values(tsconfig.compilerOptions.paths as Record<string, string[]>)
    .forEach((paths) => {
      paths.forEach((path, i) => {
        paths[i] = resolvePath(path)
      })
    })

  // Load files into Model so that the language service is aware of it
  // In VS Code this is done by `include` in tsconfig.json, while here in Monaco
  // `include` and `exclude` are not supported.
  const extraFiles = await loadFiles(ctx, ['.nuxt/nuxt.d.ts'])

  const worker = editor.createWebWorker<any>({
    moduleId: 'vs/language/vue/vueWorker',
    label: 'vue',
    host: new WorkerHost(ctx),
    createData: {
      tsconfig,
    } satisfies CreateData,
  })

  const languageId = ['vue', 'javascript', 'typescript']
  const getSyncUris = () => [
    ...Array.from(ctx.files.values())
      .map(file => Uri.parse(`file:///${file.filepath}`)),
    ...extraFiles,
  ]
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

function loadFiles(ctx: PlaygroundMonacoContext, files: string[]) {
  return Promise.all(files.map(async (file) => {
    const filepath = withoutLeadingSlash(file)
    const content = await ctx.webcontainer!.fs
      .readFile(filepath, 'utf-8')
      .catch(() => undefined)
    const uri = Uri.parse(`file:///${filepath}`)
    if (content != null) {
      getOrCreateModel(uri, undefined, content)
      return uri
    }
    return undefined!
  }))
    .then(uris => uris.filter(Boolean))
}

function withoutLeadingSlash(path: string) {
  return path.replace(/^\/+/, '')
}
