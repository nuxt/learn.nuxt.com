import type { GuideIgnoredFiles, GuideMeta, StringOrRegExp } from '~/types/guides'

const DEFAULT_IGNORED_FILES: StringOrRegExp[] = [
  'pnpm-lock.yaml',
  'pnpm-workspace.yaml',
  'node_modules',
  /tsconfig\.json$/,
  /^\./,
]

function normalizeGuideIgnoredFiles(input: GuideMeta['ignoredFiles']): GuideIgnoredFiles {
  if (!input)
    return { overwrite: false, patterns: [] }

  if (Array.isArray(input))
    return { overwrite: false, patterns: input }

  if (typeof input === 'object') {
    return {
      overwrite: input.overwrite || false,
      patterns: input.patterns || [],
    }
  }

  throw new Error('Invalid ignoredFiles', input)
}

export function transformGuideIgnoredFiles(input: GuideMeta['ignoredFiles']): StringOrRegExp[] {
  const { overwrite, patterns } = normalizeGuideIgnoredFiles(input)

  return overwrite
    ? patterns
    : DEFAULT_IGNORED_FILES.concat(patterns)
}

export function isFileIgnored(filepath: string, ignoredFiles?: GuideMeta['ignoredFiles']) {
  const patterns = transformGuideIgnoredFiles(ignoredFiles)
  return patterns.some(pattern => typeof pattern === 'string'
    ? filepath === pattern
    : pattern.test(filepath),
  )
}
