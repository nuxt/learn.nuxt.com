<script setup lang="ts">
import type { VirtualFile } from '~/structures/VirtualFile'
import type { VirtualFileSystemTree } from '~/structures/VirtualFileSystemTree'

const props = defineProps<{
  name?: string
  directory?: VirtualFileSystemTree
  file?: VirtualFile
}>()

const selectedFile = defineModel<VirtualFile>()

const isFileSelected = computed(() => props.file?.filepath === selectedFile.value?.filepath)

// TODO: config default open from templates
const isDirectoryOpen = ref(true)

function handleClick() {
  if (props.directory)
    isDirectoryOpen.value = !isDirectoryOpen.value
  else if (props.file)
    selectedFile.value = props.file
}
</script>

<template>
  <div>
    <button
      v-if="name"
      hover="bg-active" flex items-center gap-2 px2 py1 text-left :class="{
        'text-primary': isFileSelected,
      }" @click="handleClick"
    >
      <div v-if="directory && !isDirectoryOpen" i-ph:folder-duotone />
      <div v-if="directory && isDirectoryOpen" i-ph:folder-open-duotone />
      <div v-if="!directory" i-ph:file-duotone />
      {{ name }}
    </button>
    <div v-if="directory" v-show="isDirectoryOpen" ml-2>
      <PanelEditorFileSystemTree
        v-for="(child, chileName) in directory"
        :key="chileName"
        v-model="selectedFile"
        :name="chileName.toString()"
        v-bind="child"
      />
    </div>
  </div>
</template>
