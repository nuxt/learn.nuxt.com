import { defineCollection, defineContentConfig } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    tutorials: defineCollection({
      type: 'page',
      source: {
        include: '**',
        exclude: ['**/.template/**'],
      },
    }),
  },
})
