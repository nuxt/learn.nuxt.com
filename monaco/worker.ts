/* eslint-disable no-restricted-globals */
/* eslint-disable new-cap */
import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

self.MonacoEnvironment = {
  getWorker(_: any, label: string) {
    if (label === 'json')
      return new jsonWorker()

    if (label === 'css' || label === 'scss' || label === 'less')
      return new cssWorker()

    if (label === 'html' || label === 'handlebars' || label === 'razor')
      return new htmlWorker()

    if (label === 'typescript' || label === 'javascript')
      return new tsWorker()

    return new editorWorker()
  },
}

monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
  ...monaco.languages.typescript.typescriptDefaults.getCompilerOptions(),
  noUnusedLocals: false,
  noUnusedParameters: false,
  allowUnreachableCode: true,
  allowUnusedLabels: true,
  strict: true,
})

monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true)
