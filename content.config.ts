import { defineCollection, defineContentConfig } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    en: defineCollection({
      type: 'page',
      source: {
        include: 'en/**',
        exclude: ['**/.template/**'],
      },
    }),
    ja: defineCollection({
      type: 'page',
      source: {
        include: 'ja/**',
        exclude: ['**/.template/**'],
      },
    }),
  },
})
