import antfu from '@antfu/eslint-config'
import vueI18n from '@intlify/eslint-plugin-vue-i18n'
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
  .append(
    vueI18n.configs.recommended,
    {
      settings: {
        'vue-i18n': {
          localeDir: 'i18n/locales/*.yaml',
        },
      },
      rules: {
        '@intlify/vue-i18n/no-missing-keys': 'error',
        '@intlify/vue-i18n/no-raw-text': 'error',
        '@intlify/vue-i18n/no-deprecated-modulo-syntax': 'off',
      },
    },
    {
      files: ['content/**'],
      rules: {
        '@intlify/vue-i18n/no-raw-text': 'off',
      },
    },
  )
