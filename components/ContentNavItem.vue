<script setup lang="ts">
import type { NavItem } from '@nuxt/content/dist/runtime/types'

const props = withDefaults(
  defineProps<{
    item: NavItem
    level: number
  }>(),
  {
    level: 0,
  },
)

const ui = useUiState()

const resolved = computed(() => {
  if (props.item.children?.length === 1)
    return props.item.children[0]
  return props.item
})

const paddingLeft = computed(() => `${0.5 + props.level * 0.8}rem`)
</script>

<template>
  <div class="content-nav-item">
    <template v-if="resolved.children?.length">
      <details>
        <summary>
          <div
            flex="~ gap-1 items-center" cursor-pointer select-none px1 py0.5
            hover="text-primary bg-active"
            :style="{ paddingLeft }"
          >
            <div class="caret" i-ph-caret-right-duotone text-sm op50 transition duration-400 />
            <div i-ph-folder-simple-duotone />
            <div ml1>
              {{ resolved.title }}
            </div>
          </div>
        </summary>
        <div v-if="resolved.children?.length">
          <ContentNavItem
            v-for="child in resolved.children"
            :key="child.url" :item="child" :level="props.level + 1"
          />
        </div>
      </details>
    </template>
    <NuxtLink
      v-else
      :to="resolved._path"
      px1 py0.5
      :style="{ paddingLeft }"
      flex="~ gap-1 items-center"
      hover="text-primary bg-active "
      @click="ui.isContentDropdownShown = false"
    >
      <div i-ph-caret-right-duotone class="caret" text-sm op0 />
      <div i-ph-file-duotone />
      <div ml1>
        {{ resolved.title }}
      </div>
    </NuxtLink>
  </div>
</template>

<style>
.content-nav-item details summary {
  list-style-type: none;
}

.content-nav-item details[open] .caret {
  transform: rotate(90deg);
}
</style>
