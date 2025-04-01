---
ogImage: true
---

# Routing

## File-based routing

The file-based routing is one of Nuxt’s core features.\
Each Vue file inside the `pages/` directory corresponds to a URL (route) and renders its content.\
For example, `pages/index.vue` corresponds to `/`, and `pages/foo.vue` corresponds to `/foo`.\
This routing system is built on [vue-router](https://router.vuejs.org/).

Additionally, Nuxt optimizes each page through code splitting and other techniques, ensuring that only the minimal JavaScript required for the requested route is delivered.

## Navigation

Once you've created routes inside the `pages/` directory, you can use the `<NuxtLink>` component for navigation.

The `<NuxtLink>` component allows you to specify the route using the `to` prop to create links.\
Compared to using an `<a>` tag with an `href` attribute, `<NuxtLink>` automatically optimizes navigation, resulting in faster page transitions.

## Route Parameters

Inside the `/pages` directory, you can define dynamic routes by wrapping part of the filename in `[]`.\
For example: `pages/posts/[id].vue`.

The route parameter inside `[]` can be accessed via `useRoute()`.

```vue
<!-- pages/posts/[id].vue -->
<script setup lang="ts">
const route = useRoute()

// When accessing /posts/1, route.params.id will be 1
console.log(route.params.id)
</script>
```

## Challenge

Try implementing the `/posts/[id]` route and enabling navigation from `/` and `/foo` to `/posts/[id]`.\
Additionally, in `/posts/[id]`, read the `id` from the route parameter and display it on the screen.

### Steps to complete:

1. In `pages/posts/[id].vue`, use `useRoute()` to get `id` from `params` and display it on the screen.
2. In `pages/index.vue` and `pages/foo.vue`, use `<NuxtLink>` to create links that navigate to `/posts/[id]`.\
   For example, create a link that navigates to `/posts/1` (you can use any value).

If you get stuck, click the button below or the one in the top-right corner of the editor to view the solution.

:ButtonShowSolution{.bg-faded.px4.py2.rounded.border.border-base.hover:bg-active.hover:text-primary.hover:border-primary:50}

---

The `useRoute` function and `<NuxtLink>` component introduced in this section are automatically imported by Nuxt’s Auto Imports feature, so you don’t need to manually import them.\
In the next section, we will explore [Auto Imports](/concepts/auto-imports) in more detail.
