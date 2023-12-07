<script setup lang="ts">
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import { loadGrammars } from '~/monaco/grammars'
import { initMonaco } from '~/monaco/setup'
import { Store } from '~/monaco/env'

const props = defineProps<{
  modelValue: string
  filepath: string
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
  (event: 'change', value: string): void
}>()

const play = usePlaygroundStore()
const store = new Store()

// TODO: refactor this out
watchEffect(() => {
  store.state.files = play.files.map(i => i.filepath)
})

initMonaco(store)

const el = ref<HTMLDivElement>()

const colorMode = useColorMode()
const models = new Map<string, monaco.editor.ITextModel>()

const language = computed(() => {
  const ext = props.filepath.split('.').pop()
  switch (ext) {
    case 'js':
      return 'javascript'
    case 'ts':
      return 'typescript'
    case 'css':
      return 'css'
    case 'json':
      return 'json'
    case 'vue':
      return 'vue'
    case 'html':
      return 'html'
    default:
      return 'plaintext'
  }
})
const theme = computed(() => colorMode.value === 'dark'
  ? 'theme-dark'
  : 'theme-light',
)

function getModel(filepath: string) {
  let model: monaco.editor.ITextModel
  if (!models.has(filepath)) {
    model = monaco.editor.createModel(
      props.modelValue,
      language.value,
      monaco.Uri.file(props.filepath),
    )
    models.set(filepath, model)
  }
  else {
    model = models.get(filepath)!
  }
  model.setValue(props.modelValue)
  return model
}

watch(
  () => el.value,
  async (value) => {
    if (!value)
      return

    const editor = monaco.editor.create(
      value,
      {
        'model': getModel(props.filepath),
        'theme': theme.value,
        'fontSize': 14,
        'bracketPairColorization': {
          enabled: false,
        },
        'glyphMargin': false,
        'automaticLayout': true,
        'folding': false,
        'lineDecorationsWidth': 10,
        'lineNumbersMinChars': 3,
        'fontFamily': 'DM Mono, monospace',
        'minimap': {
          enabled: false,
        },
        'padding': {
          top: 8,
        },
        'semanticHighlighting.enabled': true,
        'overviewRulerLanes': 0,
      },
    )

    editor.onDidChangeModelContent(() => {
      const value = editor.getValue()
      emit('update:modelValue', value)
      emit('change', value)
    })

    watch(
      () => props.filepath,
      () => {
        editor.setModel(getModel(props.filepath))
      },
    )

    watch(theme, () => monaco.editor.setTheme(theme.value))

    await loadGrammars(monaco, editor)
  },
)
</script>

<template>
  <div ref="el" />
</template>
