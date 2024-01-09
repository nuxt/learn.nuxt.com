const NuxtLink = defineNuxtLink({})

// Wrapping NuxtLink with custom handling for nuxt.com links
export default defineComponent({
  name: 'NuxtLink',
  props: NuxtLink.props,
  setup(props, { slots }) {
    const url = props.to || props.href
    // Get CORS and add url?.startsWith('https://vuejs.org')
    if (url?.startsWith('https://nuxt.com')) {
      // TODO: add setting to toggle this behavior
      const guide = useGuideStore()

      function onClick(e: MouseEvent) {
        if (e.ctrlKey || e.shiftKey || e.metaKey || e.altKey)
          return
        e.preventDefault()
        guide.openEmbeddedDocs(url)
      }

      return () => {
        return h('a', { ...props, href: url, onClick }, slots)
      }
    }
    else {
      return () => h(NuxtLink, props, slots)
    }
  },
})
