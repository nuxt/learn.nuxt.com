<script setup lang="ts">
const props = defineProps<{
  path: string
  isDirectory?: boolean
  isDirectoryOpen?: boolean
}>()

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

const icon = computed(() => {
  if (props.isDirectory) {
    return props.isDirectoryOpen
      ? 'i-ph:folder-open-duotone scale-120'
      : 'i-ph:folder-simple-duotone scale-120'
  }
  for (const { match, icon } of FILE_ICONS) {
    if (match.test(props.path))
      return icon
  }
  return 'i-ph:file-duotone scale-120'
})
</script>

<template>
  <div :class="icon" />
</template>
