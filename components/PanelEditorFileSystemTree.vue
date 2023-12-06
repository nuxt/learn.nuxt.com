<script setup lang="ts">
import type { VirtualFile } from '~/structures/VirtualFile'
import type { VirtualFileSystemTree } from '~/structures/VirtualFileSystemTree'

const props = defineProps<{
  name?: string
  directory?: VirtualFileSystemTree
  file?: VirtualFile
  depth: number
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

// put folders first and sort alphabetically
const sortedDirectory = computed(() => props.directory && Object.fromEntries(
  Object.entries(props.directory).sort(([aName, a], [bName, b]) => {
    if ('directory' in a && !('directory' in b))
      return -1
    if (!('directory' in a) && 'directory' in b)
      return 1
    return aName.localeCompare(bName)
  }),
))
</script>

<template>
  <div>
    <div
      v-if="name"
      hover="bg-active"
      :style="{
        paddingLeft: `${0.5 * (props.depth)}rem`,
      }"
      @click="handleClick"
    >
      <button
        flex items-center gap-2 px2 py1 text-left :class="{
          'text-primary': isFileSelected,
        }"
      >
        <div v-if="directory && !isDirectoryOpen" i-ph:folder-duotone />
        <div v-if="directory && isDirectoryOpen" i-ph:folder-open-duotone />
        <div v-if="!directory" i-ph:file-duotone />
        {{ name }}
      </button>
    </div>
    <div v-if="directory" v-show="isDirectoryOpen">
      <PanelEditorFileSystemTree
        v-for="(child, chileName) in sortedDirectory"
        :key="chileName"
        v-model="selectedFile"
        :name="chileName.toString()"
        v-bind="child"
        :depth="depth + 1"
      />
    </div>
  </div>
</template>
