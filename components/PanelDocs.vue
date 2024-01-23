<script setup lang="ts">
const { page } = useContent()
const ui = useUiState()

const sourceUrl = computed(() => page.value?._file
  ? `https://github.com/nuxt/learn.nuxt.com/edit/main/content/${page.value._file}`
  : undefined)

const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())
</script>

<template>
  <div grid="~ rows-[min-content_1fr_min-content]" relative h-full>
    <button
      flex="~ gap-2 items-center" border="b base dashed" bg-faded px4 py2
      @click="ui.isContentDropdownShown = !ui.isContentDropdownShown"
    >
      <div i-ph-book-duotone />
      <NuxtLink to="/" text-sm>
        Guide
      </NuxtLink>
      <div flex-auto />
      <div i-ph-caret-down-duotone text-sm op50 transition duration-400 :class="ui.isContentDropdownShown ? 'rotate-180' : ''" />
    </button>
    <div relative h-full of-hidden>
      <article class="max-w-none prose" h-full of-auto p6>
        <ContentDoc />
      </article>
      <!-- Navigration Dropdown -->
      <div
        v-if="ui.isContentDropdownShown"
        flex="~ col"
        border="b base"
        absolute left-0 right-0 top-0 max-h-60vh py2
        backdrop-blur-10 bg-base important-bg-opacity-80
      >
        <ContentNavItem v-for="item in navigation" :key="item.url" :item="item" />
      </div>
    </div>
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
