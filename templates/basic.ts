import { VirtualFile } from '../structures/VirtualFile'
import { filesToWebContainerFs } from './utils'

export default function load() {
  const rawInput = import.meta.glob([
    './basic/**/*.*',
    './basic/**/.npmrc',
  ], {
    as: 'raw',
    eager: true,
  })

  const files = Object.entries(rawInput)
    .map(([path, content]) => {
      return new VirtualFile(path.replace('./basic/', ''), content)
    })

  const tree = filesToWebContainerFs(
    files,
  )

  return {
    files,
    tree,
  }
}
