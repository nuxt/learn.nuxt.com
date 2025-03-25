---
ogImage: true
---

# Data Fetching

When building practical applications, data fetching is an essential feature.\
Data fetching refers to retrieving data from APIs or databases.

Nuxt provides useful functions like `useFetch`, `useAsyncData`, and `$fetch` to handle data fetching conveniently.

In short:

- `useFetch` is the simplest way to handle data fetching in a component's setup function.
- `$fetch` is ideal for making network requests based on user interactions.
- `useAsyncData` works with `$fetch` to provide more granular control.

https://nuxt.com/docs/getting-started/data-fetching

Among these, `useFetch` is the easiest to use. In fact, it is a convenient wrapper around `useAsyncData` and `$fetch`.

Here’s how to use it:

```vue
<script setup lang="ts">
const { data, pending, error, refresh, clear } = await useFetch('/api/modules')
</script>
```

Specifically, it offers the following features:

- Runs on both server and client\
  Since `useFetch` works on both the server and client sides, it allows easy data fetching even during universal rendering.
- Data caching\
  When the API is called on the server, the data is transferred to the client, preventing redundant fetching on the client side.
- Typed request URLs and responses\
  By implementing the API inside the `server` directory, request URLs and response types are automatically inferred.

For more details, refer to the [official documentation](https://nuxt.com/docs/api/composables/use-fetch).

If you need finer control, you can use `useAsyncData` or `$fetch` for more advanced data fetching.

https://nuxt.com/docs/api/composables/use-async-data

https://nuxt.com/docs/api/utils/dollarfetch

## Challenge

1. Check that the API works
   Add a fourth Todo item to `server/api/todos/index.ts`, then click the refresh button to verify that the data updates.

2. Check type inference
   Add a `completed` property to the Todo in `server/api/todos/index.ts`, and confirm that the `useFetch` type updates accordingly.

:ButtonShowSolution{.bg-faded.px4.py2.mb3.rounded.border.border-base.hover:bg-active.hover:text-primary.hover:border-primary:50}
