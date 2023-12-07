<script lang="ts">
import type { VirtualFile } from '~/structures/VirtualFile'
import type { VirtualFileSystemTree } from '~/structures/VirtualFileSystemTree'

const FILE_ICONS = [
  {
    match: /\.vue$/,
    icon: 'i-logos-vue',
  },
  {
    match: /nuxt\.config\.\w+$/,
    icon: 'i-logos-nuxt-icon scale-110',
  },
  {
    match: /package\.json$/,
    icon: 'i-file-icons-npm text-red scale-110',
  },
  {
    match: /\.[mc]?tsx?$/,
    icon: 'i-file-icons-typescript-alt text-blue3',
  },
  {
    match: /\.[mc]?jsx?$/,
    icon: 'i-devicon-javascript',
  },
]

function getFileIcon(filepath: string): string {
  for (const { match, icon } of FILE_ICONS) {
    if (match.test(filepath))
      return icon
  }
  return 'i-ph:file-duotone scale-120'
}
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

const icon = computed(() => {
  if (props.directory) {
    return isDirectoryOpen.value
      ? 'i-ph:folder-open-duotone scale-120'
      : 'i-ph:folder-simple-duotone scale-120'
  }
  else {
    return getFileIcon(props.name!)
  }
})

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
      <div :class="icon" h-4 w-4 flex-none />
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
