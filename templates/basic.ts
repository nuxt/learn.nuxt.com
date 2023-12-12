import { VirtualFile } from '../structures/VirtualFile'
import type { TemplateOptions } from './types'
import { filesToWebContainerFs } from './utils'
import template from '#build/templates/basic'

export default function load(options: TemplateOptions = {}) {
  if (import.meta.server)
    throw new Error('This template can only be used on the client')

  const rawFiles: Record<string, string> = {
    ...template,
    ...options.files,
  }

  // Merge .nuxtrc
  if (options.nuxtrc) {
    rawFiles['.nuxtrc'] = [
      ...(rawFiles['.nuxtrc'] || '').split(/\n/g),
      ...options.nuxtrc,
    ].filter(Boolean).join('\n')
  }

  const files = Object.entries(rawFiles)
    .map(([path, content]) => {
      return new VirtualFile(path, content)
    })

  const tree = filesToWebContainerFs(
    files,
  )

  return {
    files,
    tree,
  }
}
