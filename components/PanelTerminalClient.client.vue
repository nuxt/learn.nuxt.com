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

watch(
  () => theme.value,
  (t) => {
    terminal.options.theme = t
  },
)

const fitAddon = new FitAddon()
terminal.loadAddon(fitAddon)

watch(
  () => play.outputStream,
  (s) => {
    if (!s)
      return
    try {
      const reader = s.getReader()
      function read() {
        reader.read().then(({ done, value }) => {
          terminal.write(value)
          if (!done)
            read()
        })
      }
      read()
    }
    catch (e) {
      console.error(e)
    }
  },
  { flush: 'sync', immediate: true },
)

watch(
  () => play.inputStream,
  (ips) => {
    if(!ips)
      return
    const input = ips.getWriter()
    terminal.onData((data) => {
      play.killPreviousProcess()
      input.write(data)
    })
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
