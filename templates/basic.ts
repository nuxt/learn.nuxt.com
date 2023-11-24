import { File } from '../structures/File'
import { filesToWebContainerFs } from './utils'

export function loadTemplate() {
  const rawInput = import.meta.glob([
    './basic/**/*.*',
    './basic/**/.npmrc',
  ], {
    as: 'raw',
    eager: true,
  })

  const files = Object.entries(rawInput)
    .map(([path, content]) => {
      return new File(path.replace('./basic/', ''), content)
    })

  const tree = filesToWebContainerFs(
    files,
  )

  return {
    files,
    tree,
  }
}
