// @ts-expect-error missing types
import * as worker from 'monaco-editor-core/esm/vs/editor/editor.worker'
import type * as monaco from 'monaco-editor-core'
import * as ts from 'typescript/lib/tsserverlibrary'
import type { VueCompilerOptions } from '@vue/language-service'
import { resolveConfig } from '@vue/language-service'
import {
  createLanguageHost,
  createLanguageService,
  createServiceEnvironment,
} from '@volar/monaco/worker'
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
    const { options: compilerOptions } = ts.convertCompilerOptionsFromJson(
      tsconfig.compilerOptions || {},
      '',
    )

    // eslint-disable-next-line no-console
    console.log('Vue Language Services: compilerOptions', compilerOptions)

    const env = createServiceEnvironment()
    const host = createLanguageHost(
      ctx.getMirrorModels,
      env,
      '/',
      compilerOptions,
    )

    env.fs = {
      async readFile(uri) {
        if (isInvalidPath(uri))
          return undefined
        const file = await ctx.host.fsReadFile(uri)
        return file
      },
      async stat(uri) {
        if (isInvalidPath(uri))
          return undefined
        const result = await ctx.host.fsStat(uri)
        return result
      },
      async readDirectory(uri) {
        const dirs = await ctx.host.fsReadDirectory(uri)
        return dirs
      },
    }

    return createLanguageService(
      { typescript: ts },
      env,
      resolveConfig(
        ts,
        {},
        compilerOptions,
        tsconfig?.vueCompilerOptions || {},
      ),
      host,
    )
  })
}
