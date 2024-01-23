<script setup lang="ts">
import type { NavItem, ParsedContent } from '@nuxt/content/dist/runtime/types'

const {
  navigation,
  page,
  next,
  prev,
} = useContent() as {
  navigation: Ref<NavItem[]>
  page: Ref<ParsedContent>
  next: Ref<ParsedContent | undefined>
  prev: Ref<ParsedContent | undefined>
}

interface BreadcrumbItem {
  title: string
  path?: string
}

function findNavItemFromPath(path: string, items = navigation.value): NavItem | undefined {
  const item = items.find(i => i._path === path)
  if (item)
    return item

  const parts = path.split('/').filter(Boolean)
  for (let i = parts.length - 1; i > 0; i--) {
    const parentPath = `/${parts.slice(0, i).join('/')}`
    const parent = items.find(i => i._path === parentPath)
    if (parent)
      return findNavItemFromPath(path, parent.children || [])
  }
}

const contentPath = computed(() => page.value?._path as string | undefined)
const breadcrumbs = computed(() => {
  const parts = contentPath.value?.split('/').filter(Boolean) || []
  const breadcrumbs = parts
    .map((part, idx): BreadcrumbItem => {
      const path = `/${parts.slice(0, idx + 1).join('/')}`
      const item = findNavItemFromPath(path)
      return {
        title: item?.title || 'Not found',
        path: item ? path : undefined,
      }
    })

  if (!breadcrumbs.find(i => i.path === '/')) {
    breadcrumbs.unshift({
      title: 'Guide',
      path: '/',
    })
  }
  return breadcrumbs
})

const ui = useUiState()

const sourceUrl = computed(() => page.value?._file
  ? `https://github.com/nuxt/learn.nuxt.com/edit/main/content/${page.value._file}`
  : undefined)
</script>

<template>
  <div grid="~ rows-[min-content_1fr_min-content]" relative h-full>
    <div flex="~ gap-2 items-center" border="b base dashed" bg-faded px4 py2>
      <div i-ph-book-duotone />
      <template v-for="bc, idx of breadcrumbs" :key="bc.path">
        <div v-if="idx !== 0" i-ph-caret-right mx--1 text-sm op50 />
        <NuxtLink :to="bc.path" text-sm hover="underline underline-dashed text-primary">
          {{ bc.title }}
        </NuxtLink>
      </template>
      <button
        h-full flex-auto
        @click="ui.isContentDropdownShown = !ui.isContentDropdownShown"
      />
      <button
        i-ph-caret-down-duotone text-sm op50 transition duration-400
        :class="ui.isContentDropdownShown ? 'rotate-180' : ''"
        @click="ui.isContentDropdownShown = !ui.isContentDropdownShown"
      />
    </div>
    <div relative h-full of-hidden>
      <article class="max-w-none prose" h-full of-auto p6>
        <ContentDoc />
        <div mt8 py2 grid="~ cols-[1fr_1fr] gap-4">
          <div>
            <ContentNavCard
              v-if="prev"
              :to="prev._path"
              :title="prev.title"
              :description="prev.description"
              subheader="Previous section"
              icon="i-ph-arrow-left"
            />
          </div>
          <div>
            <ContentNavCard
              v-if="next"
              :to="next._path"
              :title="next.title"
              :description="next.description"
              subheader="Next section"
              icon="i-ph-arrow-right"
              items-end text-right
            />
          </div>
        </div>
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
