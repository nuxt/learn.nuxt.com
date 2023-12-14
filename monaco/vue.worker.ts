// @ts-expect-error missing types
import * as worker from 'monaco-editor/esm/vs/editor/editor.worker'
import type * as monaco from 'monaco-editor'
import {
  createJsDelivrFs,
  createJsDelivrUriResolver,
  decorateServiceEnvironment,
} from '@volar/cdn'
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

const DEBUG_USE_JSDELIVR = false

worker.initialize((
  ctx: monaco.worker.IWorkerContext<WorkerHost>,
  // TODO: it seems that the create data is not pass in, investigate later
  { tsconfig }: CreateData,
) => {
  // TODO: link the tsconfig from `.nuxt/tsconfig.json`
  const { options: compilerOptions } = ts.convertCompilerOptionsFromJson(
    tsconfig?.compilerOptions || {},
    '',
  )

  const env = createServiceEnvironment()
  const host = createLanguageHost(
    ctx.getMirrorModels,
    env,
    '/',
    compilerOptions,
  )

  if (DEBUG_USE_JSDELIVR) {
    const jsDelivrFs = createJsDelivrFs(ctx.host.onFetchCdnFile)
    const jsDelivrUriResolver = createJsDelivrUriResolver(
      '/node_modules',
      {},
    )

    decorateServiceEnvironment(
      env,
      {
        fileNameToUri(fileName) {
          const uri = jsDelivrUriResolver.fileNameToUri(fileName)
          return uri
        },
        uriToFileName(uri) {
          const filename = jsDelivrUriResolver.uriToFileName(uri)
          return filename
        },
      },
      {
        async stat(uri) {
          const result = await jsDelivrFs.stat(uri)
          return result
        },
        async readFile(uri) {
          const file = await jsDelivrFs.readFile(uri)
          return file
        },
        async readDirectory(uri) {
          const dirs = await jsDelivrFs.readDirectory(uri)
          return dirs
        },
      },
    )
  }
  else {
    const base = '/node_modules'
    decorateServiceEnvironment(
      env,
      {
        fileNameToUri(fileName) {
          if (fileName.startsWith(base)) {
            const uri = new URL(fileName, 'file://').href
            return uri
          }
        },
        uriToFileName(uri) {
          if (uri.startsWith('file://')) {
            const filename = new URL(uri).pathname
            return filename
          }
        },
      },
      {
        async readFile(uri) {
          if (uri.startsWith('file:///node_modules')) {
            const file = await ctx.host.fsReadFile?.(uri)
            return file
          }
        },
        async stat(uri) {
          const result = await ctx.host.fsStat?.(uri)
          return result
        },
        async readDirectory(uri) {
          if (!ctx.host)
            return []
          const dirs = await ctx.host.fsReadDirectory?.(uri)
          // console.log('readDirectory', uri, dirs)
          return dirs
        },
      },
    )
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
