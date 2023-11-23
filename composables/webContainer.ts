import { type FileSystemTree, WebContainer } from '@webcontainer/api'

let _webContainerPromise: Promise<WebContainer>

export async function useWebContainer() {
  if (!_webContainerPromise)
    _webContainerPromise = WebContainer.boot()
  return await _webContainerPromise
}

export function globFilesToWebContainerFs(
  prefix: string,
  rawFiles: Record<string, string>,
) {
  const files = Object.fromEntries(
    Object.entries(rawFiles).map(([path, content]) => {
      return [path.replace(prefix, ''), {
        file: {
          contents: content,
        },
      }]
    }),
  )

  const tree: FileSystemTree = {}

  for (const [path, file] of Object.entries(files)) {
    if (!path.includes('/')) { tree[path] = file }
    else {
      const parts = path.split('/')
      const filename = parts.pop()!
      let current = tree
      for (const dir of parts) {
        if (!current[dir]) {
          current[dir] = {
            directory: {},
          }
        }
        const node = current[dir]
        if (!('directory' in node))
          throw new Error('Unexpected directory but found file')
        current = node.directory
      }
      current[filename] = file
    }
  }
  return tree
}
