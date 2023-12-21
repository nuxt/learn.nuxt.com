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

    const MAGIC_COMMENT = '// #generate-files-for-meta'

    addVitePlugin({
      name: 'nuxt-playground:template-loader',
      enforce: 'pre',
      async transform(code, id) {
        if (!code.includes(MAGIC_COMMENT))
          return

        const filesDirs = resolve(id, '../files')
        const files = await fg('**/*.*', {
          ignore: [
            '**/node_modules/**',
            '**/.git/**',
            '**/.nuxt/**',
          ],
          dot: true,
          cwd: filesDirs,
          onlyFiles: true,
          absolute: false,
        })

        const filesMap: Record<string, string> = {}

        await Promise.all(
          files.sort().map(async (filename) => {
            const content = await fs.readFile(resolve(filesDirs, filename), 'utf-8')
            filesMap[filename] = content
          }),
        )

        return code.replace(MAGIC_COMMENT, `meta.files = ${JSON.stringify(filesMap)}`)
      },
    })
  },
})
