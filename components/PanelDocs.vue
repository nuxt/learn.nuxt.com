<script setup lang="ts">
const guide = useGuideStore()
const { page } = useContent()

const sourceUrl = computed(() => page.value?._file
  ? `https://github.com/nuxt/learn.nuxt.com/edit/main/content/${page.value._file}`
  : undefined)
</script>

<template>
  <div h-full grid="~ rows-[min-content_1fr_min-content]">
    <div flex="~ gap-2 items-center" border="b base dashed" bg-faded px4 py2>
      <div i-ph-book-duotone />
      <span text-sm>Guide</span>
      <div flex-auto />
      <button
        v-if="guide.currentGuide?.solutions"
        my--1 mr--2 rounded px2 py1 text-sm op50
        hover="bg-active op100"
        flex="~ gap-2 items-center"
        @click="guide.toggleSolutions()"
      >
        <div v-if="!guide.showingSolution " i-ph-lightbulb-filament-duotone />
        <div v-else i-ph-arrow-counter-clockwise-duotone />
        {{ guide.showingSolution ? 'Reset challenge' : 'Show solution' }}
      </button>
    </div>
    <article class="max-w-none prose" of-auto p6>
      <ContentDoc />
    </article>
    <div border="t base dashed" px6 py2>
      <NuxtLink
        v-if="sourceUrl"
        :to="sourceUrl" target="_blank"
        flex="~ items-center gap-2" op50 hover="text-primary op100"
      >
        <div i-ph-note-pencil-duotone />
        Edit this page
      </NuxtLink>
    </div>
  </div>
</template>
