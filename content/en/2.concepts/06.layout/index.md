---
ogImage: true
---

# Layout

Nuxt provides features that enable the reuse of UI patterns.\
Layouts are implemented in the `~/layouts` directory and applied using `NuxtLayout` in `app.vue`.\
Each page can specify a layout by using `definePageMeta`.

```
├── layouts/
│   ├── default.ts
│   └── custom.ts
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
