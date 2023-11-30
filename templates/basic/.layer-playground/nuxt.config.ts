import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,
  vite: {
    warmupEntry: false,
    optimizeDeps: {
      include: [
        'birpc',
        'ufo',
        'ofetch',
        'defu',
      ],
    },
  },
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
