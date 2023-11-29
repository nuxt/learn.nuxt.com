import { createBirpc } from 'birpc'
import type { FrameFunctions, ParentFunctions } from '../../../../types/rpc'

export default defineNuxtPlugin(() => {
  // Communicate with parent window for navigation
  const router = useRouter()

  const functions: FrameFunctions = {
    onColorModeChange(mode) {
      document.documentElement.classList.toggle(
        'dark',
        mode === 'dark',
      )
    },
  }

  const rpc = createRpc(functions)

  router.afterEach((to) => {
    rpc.onNavigate(to.fullPath)
  })

  rpc.onReady()
})

function createRpc(functions: FrameFunctions) {
  return createBirpc<ParentFunctions, FrameFunctions>(functions, {
    post(payload) {
      window.parent.postMessage({
        source: 'nuxt-playground-frame',
        payload,
      }, '*')
    },
    on(fn) {
      window.addEventListener('message', (event) => {
        if (typeof event.data !== 'object')
          return
        if (event.data.source !== 'nuxt-playground-parent')
          return
        fn(event.data.payload)
      })
    },
  })
}
