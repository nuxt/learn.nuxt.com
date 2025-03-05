---
ogImage: true
---

# Auto Imports

Nuxt auto-imports components, composables and [Vue.js APIs](https://vuejs.org/api/) to use across your application without explicitly importing them.
Because of its opinionated directory structure, Nuxt imports your `components/`, `/compostables` and `/utils`.

In the `server` directory, Nuxt auto-imports exported functions and variables from `server/utils/`.

You are also able to auto-import functions exported deom custom folders or third-party packages by configuring the `imports` section of your `nuxt.config` file.

## Built-in Auto-imports

Nuxt auto-imports functions and compostables to:
* perform [data fetching](https://nuxt.com/docs/getting-started/data-fetching)
* get access to the [app context](https://nuxt.com/docs/api/composables/use-nuxt-app) and [running config](https://nuxt.com/docs/guide/going-further/runtime-config)
* manage [state](https://nuxt.com/docs/getting-started/state-management)
* or define components and plugins

```vue
<script setup lang="ts">
/* useFetch() is auto-imported */
const { data, refresh, status } = await useFetch('/api/hello')
</script>
```
Vue 3 exposes Reactivity APIs like `ref` or `computed`, as well as lifecycle hooks and helpers that are auto-imported by Nuxt.

## Vue and Nuxt composables

When you are using the built-in Composition API composables provided by Vue and Nuxt, be aware that many of them rely on being called in the right <em>context</em>.

The global variable tracking mechanism in Vue and Nuxt imposes strict usage constraints on composables and context-specific functions. These restrictions mean that developers can typically only access these instances within specific, controlled environments:

1. Permitted Contexts:
* Nuxt plugins
* Nuxt route middleware
* Vue setup functions
2. Synchronous Execution Requirement:
* Composables must be called synchronously
* Using await before calling a composable is generally prohibited
3. Exceptions to the Rule:
Some specialized contexts allow for asynchronous usage while maintaining the synchronous context:
* `<script setup>` blocks
* Components defined with `defineNuxtComponent`
* Functions created with `defineNuxtPlugin`
* Route middleware defined with `defineNuxtRouteMiddleware`

These limitations are designed to prevent state management issues and ensure clean, predictable component and application behavior during server-side rendering.

If you get an error message like `Nuxt instance is unavailable` then it probably means you are calling a Nuxt composable in the wrong place in the Vue or Nuxt lifecycle.

## Directory-based Auto-imports

Nuxt directly auto-imports files created in defined directories:
* `components/` for [Vue components](https://nuxt.com/docs/guide/directory-structure/components).
* `composables/` for [Vue composables](https://nuxt.com/docs/guide/directory-structure/composables).
* `utils/` for helper functions and other utilities.

### Explicit imports

Nuxt exposes every auto-import with the `#imports` alias that can be used to make the import explicit if needed.

```vue
<script setup lang="ts">
import { ref, computed } from '#imports'

const count = ref(1)
const double = computed(() => count.value * 2)
</script>
```

### Disabling Auto-imports

If you want to disable auto-importing composables and utlities, you can set `imports.autoImport` to `false` in the `nuxt.config` file.

```ts filename="nuxt.config.ts"
export default defineNuxtConfig({
  imports: {
    autoImport: false
  }
})
```

This will disable auto-imports completely but it's still possible to use explicit imports from `#imports`.

### Partially Disabling Auto-imports

If you want framework-specific functions like `ref` to remain auto-imported but wish to disable auto-imports for your own code (e.g., custom composables), you can set the `imports.scan` option to `false` in your `nuxt.config.ts` file:
```ts filename="nuxt.config.ts"
export default defineNuxtConfig({
  imports: {
    scan: false
  }
})
```

With this configuration framework functions like `ref`, `computed` or `watch` will still work without needing manual imports. Custom code, such as composables, will need to be manually imported in your files.

CAUTION: This setup has certain [limitations](https://nuxt.com/docs/guide/concepts/auto-imports#partially-disabling-auto-imports).

### Auto-imported components

Nuxt automatically imports components from your `~/components` directory. To disable auto-importing components from your own `~/components` directory, you can set `components.dirs` to an empty array

### Auto-import from Third-party packages

Nuxt also allows auto-importing from third-party packages.
For example, you could enable the auto-import of the useI18n composable from the `vue-i18n` package like this:

```ts filename="nuxt.config.ts"
export default defineNuxtConfig({
  imports: {
    presets: [
      {
        from: 'vue-i18n',
        imports: ['useI18n']
      }
    ]
  }
})
```
