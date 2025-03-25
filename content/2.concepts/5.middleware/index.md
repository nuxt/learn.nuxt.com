---
ogImage: true
---

# Middleware

Nuxt provides middleware that allows you to execute code before navigating to a specific route.\
This feature is useful for cases such as restricting access to pages based on authentication status.

There are two types of middleware: global middleware and named route middleware.\
Both are implemented in the `middleware` directory.

## Global Middleware

Global middleware can be defined as follows:

```
├── middleware/
│   └── hello.global.ts
```

```ts
// middleware/hello.global.ts
export default defineNuxtRouteMiddleware(() => {
  console.log('hello')
})
```

## Named route middleware

Named route middleware can be defined as follows:

```
├── middleware/
│   └── helloA.ts
```

```ts
// middleware/hello.ts
export default defineNuxtRouteMiddleware(() => {
  console.log('helloA')
})
```

```vue
<!-- pages/a.vue -->
<script setup lang="ts">
definePageMeta({
  middleware: ['hello'],
})
</script>

<template>
  <h1>Hello A</h1>
</template>
```

## Middleware Execution Timing

These middleware functions are executed not only during client-side navigation but also on the server side when rendering pages with SSR or SSG.\
If you are using client-side APIs such as local storage within middleware, you need to ensure that the middleware runs only on the client side.\
You can determine the execution environment using `import.meta`.\
To skip execution on the server side, use `import.meta.server`.

```ts
export default defineNuxtRouteMiddleware((to) => {
  // Skip middleware on the server (equivalent to if (import.meta.client) { ... })
  if (import.meta.server)
    return

  // Some processing
  window.localStorage.setItem('key', 'value')
})
```

## Challenge

Create middleware that reads information from `localStorage` and allows access to `/foo` only if a specific value is present.\
In this example, we will create middleware that grants access to `/foo` only if the key `isSignedIn` is set to `true`.\
Additionally, add a button in `index.vue` to allow users to set this value.

:ButtonShowSolution{.bg-faded.px4.py2.rounded.border.border-base.hover:bg-active.hover:text-primary.hover:border-primary:50}
