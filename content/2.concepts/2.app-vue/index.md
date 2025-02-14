---
ogImage: true
---

# Application Entry

In Nuxt, `app.vue` serves as the entry point of your application.

You can define a minimal `app.vue` to manage your application and begin implementing your own logic (optional).

In this example, **`app.vue`** simply renders a message on the screen.

The `pages/` directory, which will be introduced in the next chapter, is optional. If it does not exist, Nuxt will not include `vue-router` as a dependency.

This is useful for landing pages or applications that do not require routing.

Additionally, you can configure your application using `nuxt.config.ts` (it also supports `nuxt.config.js` and `nuxt.config.mjs`).

By default, Nuxt is configured to cover most use cases, but you can override settings as needed.

For more detailed configuration options, refer to the [Nuxt documentation](https://nuxt.com/docs/getting-started/configuration).

To get more capabilities of your Nuxt app, let's continue with the [Routing](/concepts/routing) section to learn how we can make our app multi-page.
