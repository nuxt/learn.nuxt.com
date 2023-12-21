<script setup lang="ts">
const router = useRouter()
const play = usePlaygroundStore()

async function mount(path: string) {
  if (path === '/views/app-vue')
    play.mountGuide(await import('~/content/views/1.app-vue/index').then(m => m.meta))
  else if (path === '/views/routing')
    play.mountGuide(await import('~/content/views/3.routing/index').then(m => m.meta))
  else
    play.mountGuide() // unmount previous guide
}

router.afterEach(async (to) => {
  mount(to.path)
})

onMounted(() => {
  mount(router.currentRoute.value.path)
})
</script>

<template>
  <main
    h-100dvh h-screen w-screen of-hidden
    grid="~ rows-[max-content_1fr]"
  >
    <TheNav />
    <MainPlayground />
  </main>
</template>
