---
ogImage: true
---

# Vue Basics

Nuxt integrates [Vue 3](https://vuejs.org/), a progressive framework for building user interfaces. In this section, we will cover the basics of Vue.

A typical [Vue Single-File Component](https://vuejs.org/guide/scaling-up/sfc.html) (a.k.a. `*.vue` files, abbreviated as SFC) looks like this:

```vue
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <button @click="count++">
    Count is: {{ count }}
  </button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
```

Vue SFC is a natural extension of the classic trio of HTML, CSS and JavaScript. It compose with a `<script setup>` block to define the JavaScript logic, a `<template>` block to define the HTML template and optional `<style>` blocks to define the CSS style. You can play with it using it the playground on the right, or read more about it in the [official Vue documentation](https://v3.vuejs.org/guide/single-file-component.html).

In Nuxt, we supports Vue SFC out-of-box and highly recommend you to use it to build your application. One thing that is different from Vue's default Vue SFC is that in Nuxt we [auto-imports the Vue utilities](https://nuxt.com/docs/guide/concepts/auto-imports) for you, so you can use `ref`, `computed` and other Vue APIs directly without importing them.

Going forward, we will cover the following topics:

- Reactivity
- Composition API
- Component Lifecycles
- Props
