import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
} from 'unocss'

export default defineConfig({
  shortcuts: {
    'border-base': 'border-gray-200 dark:border-gray-800',
    'bg-active': 'bg-gray:10',
    'bg-faded': 'bg-gray:5',
    'bg-base': 'bg-white dark:bg-[#020420]',
  },
  theme: {
    colors: {
      primary: {
        DEFAULT: '#00DC82',
      },
    },
  },
  presets: [
    presetUno(),
    presetIcons(),
    presetAttributify(),
    presetWebFonts({
      provider: 'bunny',
      fonts: {
        sans: 'DM Sans',
        mono: 'DM Mono',
      },
    }),
    presetTypography(),
  ],
  transformers: [
    transformerDirectives(),
  ],
})
