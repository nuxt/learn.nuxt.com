<script setup lang="ts">
const props = defineProps<{
  path: string
  isDirectory?: boolean
  isDirectoryOpen?: boolean
}>()

const FILE_ICONS = [
  {
    match: /\.vue$/,
    icon: 'i-catppuccin-vue',
  },
  {
    match: /nuxt\.config\.\w+$/,
    icon: 'i-catppuccin-nuxt',
  },
  {
    match: /package\.json$/,
    icon: 'i-catppuccin-npm',
  },
  {
    match: /\.[mc]?tsx?$/,
    icon: 'i-catppuccin-typescript',
  },
  {
    match: /\.[mc]?jsx?$/,
    icon: 'i-catppuccin-javascript',
  },
]

const icon = computed(() => {
  if (props.isDirectory) {
    return props.isDirectoryOpen
      ? 'i-catppuccin-folder-open'
      : 'i-catppuccin-folder'
  }
  for (const { match, icon } of FILE_ICONS) {
    if (match.test(props.path))
      return icon
  }
  return 'i-catppuccin-file'
})
</script>

<template>
  <div :class="icon" light="brightness-60 hue-rotate-180 invert-100 saturate-200" scale-110 />
</template>
