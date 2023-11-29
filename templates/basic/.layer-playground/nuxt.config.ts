import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: false },
  typescript: {
    includeWorkspace: true,
    tsConfig: {
      include: [
        './.layer-playground/**',
      ],
    },
  },
  css: [
    '~/.layer-playground/styles/base.css',
  ],
})
