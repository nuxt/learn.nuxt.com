---
ogImage: true
---

# Auto Imports

Auto import is also one of Nuxt's core concepts.

https://nuxt.com/docs/guide/concepts/auto-imports

Auto import is a feature that allows components, composables, and [Vue.js API](https://vuejs.org/api/) to be automatically imported and used throughout the application without explicit imports.\
Unlike traditional global declarations, Nuxt retains type information, IDE autocompletion, and hints while including only what is actually used in the production code.

Thanks to Nuxt's directory structure conventions, `components/`, `composables/`, and `utils/` can be automatically imported.\
In this example, the `Counter.vue` component defined in the `components` directory and `useCounter.ts` defined in the `composables` directory are used without explicit imports.\
In `app.vue`, the Counter component is used, and in `Counter.vue`, `useCounter()` is utilized.

Additionally, Nuxt provides several components, composables, and utility functions.\
An example is the `NuxtLink` component introduced in the [Routing](/concepts/routing) section.\
Other examples include the `useFetch()` composable for data fetching, `useRuntimeConfig()` for accessing runtime configuration, and the `navigateTo()` utility function for page navigation.\
Since there are many more, refer to the official Nuxt documentation for the full list in the sections on [Components](https://nuxt.com/docs/api/components), [Composables](https://nuxt.com/docs/api/composables), and [Utils](https://nuxt.com/docs/api/utils).

Nuxt also supports explicit imports, which can be done using `#imports`.

```ts
import { computed, ref } from '#imports'

const count = ref(1)
const double = computed(() => count.value * 2)
```

The auto import feature can be opted out in `nuxt.config.ts`.\
In this case, explicit imports like the one above will be required.

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  imports: {
    autoImport: false
  }
})
```

## Challenge

Try implementing an auto-importable function in the `utils/double.ts` file.

You can create any function, but as an example, let's implement a `double()` function that returns twice the given number.\
Once you've implemented the function, use it in the template section of `app.vue` to display the doubled value on the screen.

:ButtonShowSolution{.bg-faded.px4.py2.rounded.border.border-base.hover:bg-active.hover:text-primary.hover:border-primary:50}
