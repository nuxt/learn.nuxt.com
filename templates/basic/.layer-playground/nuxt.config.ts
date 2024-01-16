import { defineNuxtConfig } from 'nuxt/config'
import { version as versionVue } from 'vue'
import { version as versionNuxt } from 'nuxt/package.json'

export default defineNuxtConfig({
  devtools: { enabled: false },
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
  runtimeConfig: {
    public: {
      clientInfo: {
        versionVue,
        versionNuxt,
      },
    },
  },
  typescript: {
    includeWorkspace: true,
    tsConfig: {
      include: [
        '../.layer-playground/**/*',
      ],
    },
  },
  css: [
    '~/.layer-playground/styles/base.css',
  ],
})
