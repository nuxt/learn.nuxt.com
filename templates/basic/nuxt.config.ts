export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/color-mode',
    '@unocss/nuxt',
  ],
  colorMode: {
    classSuffix: '',
  },
})
