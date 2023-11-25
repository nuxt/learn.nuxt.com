export default defineNuxtPlugin(() => {
  // Communicate with parent window for navigation
  const router = useRouter()

  router.afterEach((to) => {
    window.parent.postMessage({
      type: 'update:path',
      path: to.fullPath,
    }, '*')
  })
})
