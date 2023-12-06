<script setup lang="ts">
import type { VirtualFile } from '~/structures/VirtualFile'
import { filesToVirtualFsTree } from '~/templates/utils'

// TODO: replace with Monaco with a real file tree.

const props = withDefaults(
  defineProps<{
    files: VirtualFile[]
  }>(),
  {
    files: () => [],
  },
)

const files = computed(() => props.files.filter(file => !isFileIgnored(file.filepath)))
const directory = computed(() => filesToVirtualFsTree(files.value))

const selectedFile = ref<VirtualFile>()
const input = ref<string>('')

// Select the first file by default.
watchEffect(() => {
  if (selectedFile.value == null && files.value.length > 0)
    selectFile(files.value[0])
})

function selectFile(file: VirtualFile) {
  selectedFile.value = file
}

watch(selectedFile, (file) => {
  input.value = file?.read()
})

function onTextInput() {
  // TODO: add throttle
  if (input.value != null)
    selectedFile?.value?.write(input.value)
}
</script>

<template>
  <div h-full grid="~ rows-[min-content_1fr]">
    <div
      flex="~ gap-2 items-center"
      border="b base dashed"
      bg-faded px4 py2
    >
      <div i-ph-text-t-duotone />
      <span text-sm>Editor</span>
    </div>
    <div grid="~ cols-[1fr_2fr]">
      <div flex="~ col" h-full of-auto>
        <PanelEditorFileSystemTree v-model="selectedFile" :directory="directory" :depth="-1" />
      </div>
      <PanelEditorClient
        v-if="selectedFile"
        v-model="input"
        :filepath="selectedFile.filepath"
        h-full w-full
        @change="onTextInput"
      />

      <!-- <textarea
        v-model="input"
        border="l base"

        h-full w-full resize-none bg-transparent p4 font-mono
        @input="onTextInput"
      /> -->
    </div>
  </div>
</template>
