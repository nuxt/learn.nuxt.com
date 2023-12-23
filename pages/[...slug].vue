<script setup lang="ts">
const router = useRouter()
const play = usePlaygroundStore()

const metaMap = import.meta.glob('~/content/views/*/.patch/index.ts')

async function mount(path: string) {
  if (path.startsWith('/views/')) {
    for (const [key, loader] of Object.entries(metaMap)) {
      if (key.includes(path.replace(/^\/views\//, '')))
        play.mountGuide(await loader().then((m: any) => m.meta))
    }
  }
  else {
    play.mountGuide() // unmount previous guide
  }
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
