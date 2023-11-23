<script setup lang="ts">
import 'xterm/css/xterm.css'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'

const props = defineProps<{
  stream?: ReadableStream
}>()

const root = ref<HTMLDivElement>()
const terminal = new Terminal({
  customGlyphs: true,
  lineHeight: 0.9,
})
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

useResizeObserver(root, useDebounceFn(() => fitAddon.fit(), 200))

onMounted(() => {
  terminal.open(root.value!)
  terminal.write('\n')
  fitAddon.fit()
})
</script>

<template>
  <div h-full grid="~ rows-[min-content_1fr]">
    <div flex="~ gap-2 items-center" px4 py2 border="b base dashed" bg-faded>
      <div i-ph-terminal-window-duotone />
      <span text-sm>Terminal</span>
    </div>
    <div ref="root" w-full h-full of-hidden />
  </div>
</template>
