<script setup lang="ts">
const { page } = useContent()

const sourceUrl = computed(() => `https://github.com/nuxt/learn.nuxt.com/edit/main/content/${page.value._file}`)
</script>

<template>
  <div h-full grid="~ rows-[min-content_1fr_min-content]">
    <div flex="~ gap-2 items-center" border="b base dashed" bg-faded px4 py2>
      <div i-ph-book-duotone />
      <span text-sm>Guide</span>
    </div>
    <article class="max-w-none prose" of-auto p6>
      <ContentDoc />
    </article>
    <div border="t base dashed" px6 py2>
      <NuxtLink
        :to="sourceUrl" target="_blank"
        flex="~ items-center gap-2" op50 hover="text-primary op100"
      >
        <div i-ph-note-pencil-duotone />
        Edit this page
      </NuxtLink>
    </div>
  </div>
</template>
