---
ogImage: true
---

# レイアウト

Nuxt は UI パターンを再利用可能にするための機能を提供しています。\
layout は `~/layouts` デイレクトリに実装され、`app.vue` で `NuxtLayout` を使用することで適応されます。\
layout は各ページごとに `definePageMeta` を通して選択することができます。

```
-| layouts/
  ---| default.vue
  ---| custom.vue
```

```vue
<!-- layouts/custom.vue -->
<template>
  <div>
    <p>Some default layout content shared across all pages</p>
    <slot />
  </div>
</template>
```

```vue
<!-- app.vue -->
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

```vue
<!-- pages/about.vue -->
<script setup lang="ts">
definePageMeta({
  layout: 'custom'
})
</script>
```
