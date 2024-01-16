<script lang="ts">
import type { VirtualFile } from '~/structures/VirtualFile'
import type { VirtualFileSystemTree } from '~/structures/VirtualFileSystemTree'
</script>

<script setup lang="ts">
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

const folderCaret = computed(() => {
  const icon = 'i-ph-caret-right transition-transform duration-300 op50'
  if (props.directory) {
    return isDirectoryOpen.value
      ? `${icon} rotate-90`
      : icon
  }
  else {
    return 'opacity-0'
  }
})
</script>

<template>
  <div>
    <button
      v-if="name"
      hover="bg-active"
      :style="{
        paddingLeft: `${0.2 + 0.8 * (props.depth)}rem`,
      }"
      :class="isFileSelected ? 'bg-active' : 'saturate-0 text-faded'"
      w-full flex items-center gap-1 px2 py1 text-left text-sm
      @click="handleClick"
    >
      <div :class="folderCaret" h-4 w-4 flex-none />
      <FileIcon
        h-4 w-4 flex-none
        :path="name"
        :is-directory="!!props.directory"
        :is-directory-open="isDirectoryOpen"
      />
      <span ml1>{{ name }}</span>
    </button>
    <div v-if="directory" v-show="isDirectoryOpen">
      <PanelEditorFileSystemTree
        v-for="(child, chileName) in sortedDirectory"
        :key="chileName"
        v-model="selectedFile"
        :name="chileName.toString()"
        :depth="depth + 1"
        v-bind="child"
      />
    </div>
  </div>
</template>
