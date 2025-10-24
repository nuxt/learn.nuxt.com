---
ogImage: true
---

# State Management

In Vue.js, state management refers to managing reactive state within an application.\
[Vue.js Official Documentation: State Management](https://vuejs.org/guide/scaling-up/state-management)

When sharing state across multiple components, Vue.js allows for simple state management using the reactivity API.\
[Vue.js Official Documentation: Simple State Management with Reactivity API](https://vuejs.org/guide/scaling-up/state-management#simple-state-management-with-reactivity-api)

However, as mentioned in the [SSR Considerations](https://vuejs.org/guide/scaling-up/state-management#ssr-considerations), using SSR with Nuxt may lead to [certain issues](https://vuejs.org/guide/scaling-up/ssr#cross-request-state-pollution).

Although the official Vue.js documentation introduces a state management library called [Pinia](https://pinia.vuejs.org/), the `useState()` composable provided by Nuxt is also one of the solutions.\
(Of course, [using Pinia in Nuxt](https://nuxt.com/docs/getting-started/state-management#usage-with-pinia) is also possible.)

## useState()

The [useState() composable](https://nuxt.com/docs/api/composables/use-state) provides a simple way to manage SSR-friendly state and share it across components.\
`useState()` is an SSR-friendly `ref()` used to define shared state.\
As mentioned earlier, using Vue.js’s reactivity API such as `ref()` for cross-component state management in SSR may lead to issues.\
Therefore, in Nuxt, it is considered best practice to avoid defining state with `ref()` **outside** of `<script setup>` or the `setup()` function, and instead use `useState()`.

In the example in this playground, the state is shared between the `CounterA` and `CounterB` components using `"count"` as the key.\
Note that when the button rendered by `CounterA` is clicked, the state in `CounterB` also updates.

For more details, refer to the [Nuxt Official Documentation: State Management](https://nuxt.com/docs/getting-started/state-management).

:::note
Because the data inside `useState()` will be serialized to JSON, it is important that it does not contain anything that cannot be serialized, such as classes, functions or symbols.
:::
