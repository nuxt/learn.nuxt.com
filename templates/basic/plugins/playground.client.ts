export default defineNuxtPlugin(() => {
  // Communicate with parent window for navigation
  const router = useRouter()
  const channel = new MessageChannel()
  const rpcFunctions = {
    hello(name: string) {
      console.log('hello', name)
      return `Hello, ${name}!`
    },
  }
  const rpc = createBirpc<typeof rpcFunctions, typeof rpcFunctions>(rpcFunctions, {
    post: data => channel.port1.postMessage(data),
    on: data => channel.port1.addEventListener('message', e => data(e.data)),
  })

  router.afterEach((to) => {
    channel.port1.start()
    window.parent.postMessage({
      type: 'port',
    }, '*', [channel.port2])
    rpc.hello('Playgroup')
    window.parent.postMessage({
      type: 'update:path',
      path: to.fullPath,
    }, '*')
  })
})
