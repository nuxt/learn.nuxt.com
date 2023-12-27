<script setup lang="ts">
import 'xterm/css/xterm.css'
import type { ITheme } from 'xterm'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import themeLight from 'theme-vitesse/extra/xterm-vitesse-light.json'
import themeDark from 'theme-vitesse/extra/xterm-vitesse-dark.json'

const play = usePlaygroundStore()

const colorMode = useColorMode()
const theme = computed<ITheme>(() => {
  return colorMode.value === 'dark'
    ? {
        ...themeDark,
        background: '#00000000',
      }
    : {
        ...themeLight,
        background: '#00000000',
      }
})

const root = ref<HTMLDivElement>()
const terminal = new Terminal({
  customGlyphs: true,
  allowTransparency: true,
  theme: theme.value,
  fontFamily: 'DM Mono, monospace',
})

// persist the scroll position of terminal
const ui = useUiState()
watch(() => ui.showTerminal, (v) => {
  if (!root.value)
    return
  if (!v) {
    const { height } = root.value.getBoundingClientRect()
    root.value.style.height = `${height}px`
  }
  else {
    root.value.style.height = 'initial'
  }
}, { flush: 'sync' })

watch(
  () => theme.value,
  (t) => {
    terminal.options.theme = t
  },
)

const fitAddon = new FitAddon()
terminal.loadAddon(fitAddon)

let init = false

watch(
  () => play.currentProcess,
  (p) => {
    if (!p)
      return
    // Output
    try {
      const reader = p.output.getReader()
      function read() {
        reader.read().then(({ done, value }) => {
          if (value)
            terminal.write(value)
          if (!done)
            read()
        })
      }
      if (!init) {
        init = true
      }
      else {
        terminal.writeln('')
        terminal.writeln(`-------------`)
        terminal.writeln('')
      }

      read()
    }
    catch (e) {
      console.error(e)
    }

    try {
      const writer = p.input.getWriter()
      terminal.onData((data) => {
        try {
          writer.write(data)
        }
        catch (e) {
          console.error(e)
        }
      })
    }
    catch (e) {
      console.error(e)
    }
  },
  { flush: 'sync', immediate: true },
)

useResizeObserver(root, useDebounceFn(() => fitAddon.fit(), 200))

const stop = watch(
  () => root.value,
  (el) => {
    if (!el)
      return
    terminal.open(el)
    terminal.write('\n')
    fitAddon.fit()
    stop()
  },
)
</script>

<template>
  <div ref="root" h-full w-full of-hidden />
</template>
