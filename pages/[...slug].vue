<script setup lang="ts">
const router = useRouter()
const play = usePlaygroundStore()

const templatesMap = Object.fromEntries(
  Object.entries(import.meta.glob('~/content/**/.template/index.ts'))
    .map(([key, loader]) => [
      key
        .replace(/^\/content/, '')
        .replace(/\/\.template\/index\.ts$/, '')
        .replace(/\/\d+\./g, '/') || '',
      loader,
    ]),
)

if (process.dev)
  // eslint-disable-next-line no-console
  console.log('templates', Object.keys(templatesMap))

async function mount(path: string) {
  path = path.replace(/\/$/, '')
  if (templatesMap[path])
    play.mountGuide(await templatesMap[path]().then((m: any) => m.meta))
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
