import type { HighlighterCore } from 'shiki/core'
import { getHighlighterCore } from 'shiki/core'
import getWasmInlined from 'shiki/wasm'

import langVue from 'shiki/langs/vue.mjs'
import themeBlack from 'shiki/themes/vitesse-black.mjs'
import themeLight from 'shiki/themes/vitesse-light.mjs'

let highlighter: Promise<HighlighterCore> | undefined

export async function getShiki() {
  if (highlighter)
    return highlighter

  const darkColors = (themeBlack as any).colors as Record<string, string>
  darkColors['editor.background'] = '#00000000'
  darkColors['editor.lineHighlightBackground'] = '#00000000'

  highlighter = getHighlighterCore({
    langs: [
      langVue as any,
    ],
    themes: [
      themeLight as any,
      themeBlack as any,
    ],
    loadWasm: getWasmInlined,
  })

  return highlighter
}
