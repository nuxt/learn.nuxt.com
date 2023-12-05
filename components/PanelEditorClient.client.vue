<script setup lang="ts">
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import '../monaco/worker'

const props = defineProps<{
  modelValue: string
  filepath: string
}>()

const el = ref<HTMLDivElement>()

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
    case 'html':
      return 'html'
    default:
      return 'plaintext'
  }
})

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
  (value) => {
    if (!value)
      return

    const editor = monaco.editor.create(
      value,
      {
        model: getModel(props.filepath),
        theme: 'vs-dark',
        automaticLayout: true,
        minimap: {
          enabled: false,
        },
      },
    )
    watch(
      () => props.filepath,
      () => {
        editor.setModel(getModel(props.filepath))
      },
    )
  },
)
</script>

<template>
  <div ref="el" />
</template>
