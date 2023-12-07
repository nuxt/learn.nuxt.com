import { wireTmGrammars } from 'monaco-editor-textmate'
import type { IGrammarDefinition } from 'monaco-textmate'
import { Registry } from 'monaco-textmate'

async function dispatchGrammars(scopeName: string): Promise<IGrammarDefinition> {
  switch (scopeName) {
    case 'source.vue':
      return {
        format: 'json',
        content: await import('shiki/languages/vue.tmLanguage.json'),
      }
    case 'source.ts':
      return {
        format: 'json',
        content: await import('shiki/languages/typescript.tmLanguage.json'),
      }
    case 'source.js':
      return {
        format: 'json',
        content: await import('shiki/languages/javascript.tmLanguage.json'),
      }
    case 'text.html.basic':
      return {
        format: 'json',
        content: await import('shiki/languages/html.tmLanguage.json'),
      }
    case 'source.css':
      return {
        format: 'json',
        content: await import('shiki/languages/css.tmLanguage.json'),
      }
    default:
      return {
        format: 'json',
        content: {
          scopeName: 'source',
          patterns: [],
        },
      }
  }
}

export async function loadGrammars(
  monaco: typeof import('monaco-editor'),
  editor: import('monaco-editor').editor.IStandaloneCodeEditor,
) {
  const registry = new Registry({
    getGrammarDefinition: async (scopeName) => {
      const dispatch = await dispatchGrammars(scopeName)
      return JSON.parse(JSON.stringify(dispatch))
    },
  })
  const grammars = new Map()
  grammars.set('vue', 'source.vue')
  grammars.set('javascript', 'source.js')
  grammars.set('typescript', 'source.ts')
  grammars.set('css', 'source.css')
  grammars.set('html', 'text.html.basic')

  for (const lang of grammars.keys()) {
    monaco.languages.register({
      id: lang,
    })
  }

  await wireTmGrammars(monaco as any, registry, grammars, editor as any)
}
