import { fileURLToPath } from 'node:url'
import fs from 'node:fs/promises'
import { addTemplate, addVitePlugin, defineNuxtModule } from '@nuxt/kit'
import fg from 'fast-glob'
import { relative, resolve } from 'pathe'

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

    addVitePlugin({
      name: 'nuxt-playground:template-loader',
      enforce: 'pre',
      async transform(code, id) {
        if (!id.match(/\/\.template\/index\.ts/))
          return

        async function getFileMap(dir: string) {
          const files = await fg('**/*.*', {
            ignore: [
              '**/node_modules/**',
              '**/.git/**',
              '**/.nuxt/**',
            ],
            dot: true,
            cwd: dir,
            onlyFiles: true,
            absolute: false,
          })

          if (!files.length)
            return undefined

          const filesMap: Record<string, string> = {}

          await Promise.all(
            files.sort().map(async (filename) => {
              const content = await fs.readFile(resolve(dir, filename), 'utf-8')
              filesMap[filename] = content
            }),
          )

          return filesMap
        }

        const [
          files,
          solutions,
        ] = await Promise.all([
          getFileMap(resolve(id, '../files')),
          getFileMap(resolve(id, '../solutions')),
        ])

        return [
          code,
          `meta.files = ${JSON.stringify(files)}`,
          `meta.solutions = ${JSON.stringify(solutions)}`,
          '',
        ].join('\n')
      },
    })
  },
})
