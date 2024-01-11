<script setup lang="ts">
import '@unocss/reset/tailwind.css'
import 'splitpanes/dist/splitpanes.css'
import './styles/base.css'
import './styles/prose.css'
import './styles/overrides.css'

addCommands(
  {
    title: 'Home',
    to: '/',
    icon: 'i-ph-house-duotone',
  },
  {
    title: 'Vue Basic',
    to: '/vue/intro',
    icon: 'i-ph-file-duotone',
  },
)
</script>

<template>
  <NuxtPage page-key="playground" />
</template>
