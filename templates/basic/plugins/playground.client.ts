export default defineNuxtPlugin(() => {
  // Communicate with parent window for navigation
  const router = useRouter()

  router.afterEach((to) => {
    window.parent.postMessage({
      type: 'update:path',
      path: to.fullPath,
    }, '*')
  })

  window.parent.postMessage({
    type: 'ready',
  }, '*')

  window.addEventListener('message', (event) => {
    console.log('message to iframe', event.data)
    switch (event.data.type) {
      case 'color-mode':
        document.documentElement.classList.toggle(
          'dark',
          event.data.mode === 'dark',
        )
        break
      default:
        break
    }
  })
})
