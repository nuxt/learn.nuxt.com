// @ts-expect-error missing types
import * as worker from 'monaco-editor/esm/vs/editor/editor.worker'
import type * as monaco from 'monaco-editor'
import {
  createJsDelivrFs,
  createJsDelivrUriResolver,
  decorateServiceEnvironment,
} from '@volar/cdn'
import * as ts from 'typescript'
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

let locale: string

globalThis.onmessage = async () => {
  worker.initialize(
    (
      ctx: monaco.worker.IWorkerContext<WorkerHost>,
      { tsconfig }: CreateData,
    ) => {
      const { options: compilerOptions } = ts.convertCompilerOptionsFromJson(
        tsconfig?.compilerOptions || {},
        '',
      )

      const env = createServiceEnvironment()
      const host = createLanguageHost(
        ctx.getMirrorModels,
        env,
        '/src',
        compilerOptions,
      )
      const jsDelivrFs = createJsDelivrFs(ctx.host.onFetchCdnFile)
      const jsDelivrUriResolver = createJsDelivrUriResolver(
        '/node_modules',
        {},
      )

      if (locale)
        env.locale = locale

      decorateServiceEnvironment(env, jsDelivrUriResolver, jsDelivrFs)

      return createLanguageService(
        { typescript: ts },
        env,
        resolveConfig(
          ts,
          {},
          compilerOptions,
          tsconfig.vueCompilerOptions || {},
        ),
        host,
      )
    },
  )
}
