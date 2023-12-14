import { fileURLToPath } from 'node:url'
import fs from 'node:fs/promises'
import { addTemplate, defineNuxtModule } from '@nuxt/kit'
import fg from 'fast-glob'
import { relative } from 'pathe'

export default defineNuxtModule({
  meta: {
    name: 'template-loader',
  },
  setup(_) {
    addTemplate({
      filename: 'templates/basic.ts',
      getContents: async () => {
        const dir = fileURLToPath(new URL('../templates/basic', import.meta.url))
        const files = await fg('**/*.*', {
          ignore: [
            '**/node_modules/**',
            '**/.git/**',
            '**/.nuxt/**',
          ],
          dot: true,
          cwd: dir,
          onlyFiles: true,
          absolute: true,
        })

        const filesMap: Record<string, string> = {}

        await Promise.all(
          files.sort().map(async (filename) => {
            const content = await fs.readFile(filename, 'utf-8')
            filesMap[relative(dir, filename)] = content
          }),
        )

        return `export default ${JSON.stringify(filesMap)}`
      },
    })
  },
})
