import antfu from '@antfu/eslint-config'
import nuxt from './.nuxt/eslint.config.mjs'

export default antfu(
  {
    unocss: true,
    formatters: true,
    pnpm: true,
  },
  nuxt(),
  {
    files: ['**/template/**', '**/.template/**'],
    rules: {
      'no-console': 'off',
    },
  },
)
  .override('antfu/yaml/pnpm-workspace', {
    ignores: ['**/templates/**'],
  })
  .override('antfu/pnpm/package-json', {
    ignores: ['**/templates/**'],
  })
