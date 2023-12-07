/* eslint-disable no-restricted-globals */
/* eslint-disable new-cap */
import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'

// TODO: material-theme-palenight's format it not compatible with monaco
import themeDark from 'theme-vitesse/themes/vitesse-black.json'
import themeLight from 'theme-vitesse/themes/vitesse-light.json'
import vueWorker from './vue.worker?worker'
import { loadWasm, reloadLanguageTools } from './env'
import type { Store } from './env'

export function initMonaco(store: Store) {
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

  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    ...monaco.languages.typescript.typescriptDefaults.getCompilerOptions(),
    noUnusedLocals: false,
    noUnusedParameters: false,
    allowUnreachableCode: true,
    allowUnusedLabels: true,
    strict: true,
  })

  monaco.languages.register({ id: 'vue', extensions: ['.vue'] })
  monaco.languages.register({ id: 'javascript', extensions: ['.js'] })
  monaco.languages.register({ id: 'typescript', extensions: ['.ts'] })
  monaco.languages.register({ id: 'json', extensions: ['.json'] })
  monaco.languages.register({ id: 'html', extensions: ['.html'] })

  const darkColors = (themeDark as any).colors as Record<string, string>
  darkColors['editor.background'] = '#00000000'
  darkColors['editor.lineHighlightBackground'] = '#00000000'

  monaco.editor.defineTheme('theme-light', themeLight as any)
  monaco.editor.defineTheme('theme-dark', themeDark as any)

  monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true)
  monaco.languages.onLanguage('vue', () => reloadLanguageTools(store))

  loadWasm()
}
