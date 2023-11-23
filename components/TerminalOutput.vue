<script setup lang="ts">
import 'xterm/css/xterm.css'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'


const props = defineProps<{
  stream?: ReadableStream
}>()

const root = ref<HTMLDivElement>()
const terminal = new Terminal()
const fitAddon = new FitAddon()
terminal.loadAddon(fitAddon)

watch(
  () => props.stream,
  (s) => {
    if (!s)
      return
    const reader = s.getReader()
    function read() {
      reader.read().then(({ done, value }) => {
        terminal.write(value)
        if (!done)
          read()
      })
    }
    read()
  },
  { flush: 'sync', immediate: true },
)

onMounted(() => {
  terminal.open(root.value!)
  fitAddon.fit()
})
</script>

<template>
  <div ref="root" />
</template>
