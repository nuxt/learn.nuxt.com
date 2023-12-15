/* eslint-disable no-restricted-globals */
/* eslint-disable new-cap */
import * as monaco from 'monaco-editor-core'
import editorWorker from 'monaco-editor-core/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'

import vueWorker from './vue.worker?worker'
import { reloadLanguageTools } from './env'

export function initMonaco(ctx: PlaygroundStore) {
  // @ts-expect-error MonacoEnvironment is a global variable injected for monaco
  self.MonacoEnvironment = {
    async getWorker(_: any, label: string) {
      switch (label) {
        case 'typescript':
        case 'javascript':
        case 'vue':
          return new vueWorker()

        case 'json':
          return new jsonWorker()

        case 'css':
        case 'scss':
        case 'less':
          return new cssWorker()

        case 'html':
        case 'handlebars':
        case 'razor':
          return new htmlWorker()

        default:
          return new editorWorker()
      }
    },
  }

  monaco.languages.register({ id: 'vue', extensions: ['.vue'] })
  monaco.languages.register({ id: 'javascript', extensions: ['.js'] })
  monaco.languages.register({ id: 'typescript', extensions: ['.ts'] })
  monaco.languages.register({ id: 'json', extensions: ['.json'] })
  monaco.languages.register({ id: 'html', extensions: ['.html'] })

  monaco.languages.onLanguage('vue', () => reloadLanguageTools(ctx))
}
