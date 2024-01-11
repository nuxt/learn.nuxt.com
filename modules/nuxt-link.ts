import { fileURLToPath } from 'node:url'
import { defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'custom-nuxt-link',
  },
  setup(_, nuxt) {
    // We replace the NuxtLink component with our own
    nuxt.hook('components:extend', (components) => {
      const NuxtLink = components.find(c => c.pascalName === 'NuxtLink')!
      const path = fileURLToPath(new URL('../components/CustomNuxtLink.ts', import.meta.url))
      NuxtLink.shortPath = path
      NuxtLink.filePath = path
    })
  },
})
