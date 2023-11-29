import type { TemplateOptions } from './types'

export const templates = {
  basic: (options?: TemplateOptions) => import('./basic').then(m => m.default(options)),
}
