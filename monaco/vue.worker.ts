// @ts-expect-error missing types
import * as worker from 'monaco-editor-core/esm/vs/editor/editor.worker'
import type * as monaco from 'monaco-editor-core'
import * as ts from 'typescript/lib/tsserverlibrary'
import type { LanguageServiceEnvironment, VueCompilerOptions } from '@vue/language-service'
import { createVueLanguagePlugin, getFullLanguageServicePlugins, resolveVueCompilerOptions } from '@vue/language-service'
import { createTypeScriptWorkerLanguageService } from '@volar/monaco/worker'
import { URI } from 'vscode-uri'
import type { WorkerHost } from './env'

export interface CreateData {
  tsconfig: {
    compilerOptions?: import('typescript').CompilerOptions
    vueCompilerOptions?: Partial<VueCompilerOptions>
  }
}

/**
 * Pathes that we know won't exists, we can skip them to improve performance
 */
const invalidPathes = [
  /\/@types\/(vue|typescript)/,
  /\/@typescript\//,
]

function isInvalidPath(filepath: string) {
  return invalidPathes.some(re => re.test(filepath))
}

// eslint-disable-next-line no-restricted-globals
self.onmessage = () => {
  worker.initialize((
    ctx: monaco.worker.IWorkerContext<WorkerHost>,
    { tsconfig }: CreateData,
  ) => {
    const asFileName = (uri: URI) => uri.path
    const asUri = (fileName: string): URI => URI.file(fileName)
    const env: LanguageServiceEnvironment = {
      workspaceFolders: [URI.file('/')],
    }
    const { options: compilerOptions } = ts.convertCompilerOptionsFromJson(
      tsconfig.compilerOptions || {},
      '',
    )
    const vueCompilerOptions = resolveVueCompilerOptions(
      tsconfig.vueCompilerOptions || {},
    )

    // eslint-disable-next-line no-console
    console.log('Vue Language Services: compilerOptions', compilerOptions)

    env.fs = {
      async readFile(uri) {
        if (isInvalidPath(uri.path))
          return undefined
        const file = await ctx.host.fsReadFile(uri.toString())
        return file
      },
      async stat(uri) {
        if (isInvalidPath(uri.path))
          return undefined
        const result = await ctx.host.fsStat(uri.toString())
        return result
      },
      async readDirectory(uri) {
        const dirs = await ctx.host.fsReadDirectory(uri.toString())
        return dirs
      },
    }

    return createTypeScriptWorkerLanguageService({
      typescript: ts,
      env,
      compilerOptions,
      uriConverter: {
        asFileName,
        asUri,
      },
      workerContext: ctx,
      languagePlugins: [createVueLanguagePlugin(
        ts,
        asFileName,
        () => '', // TODO getProjectVersion
        (fileName) => {
          const uri = asUri(fileName)
          for (const model of ctx.getMirrorModels()) {
            if (model.uri.toString() === uri.toString()) {
              return true
            }
          }
          return false
        },
        compilerOptions,
        vueCompilerOptions,
      )],
      languageServicePlugins: getFullLanguageServicePlugins(ts),
      setup({ project }) {
        project.vue = { compilerOptions: vueCompilerOptions }
      },
    })
  })
}
