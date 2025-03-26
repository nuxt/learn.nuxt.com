---
ogImage: true
---

# Rendering Modes

Nuxt supports various rendering modes.\
Specifically, these include Universal Rendering, Client-Side Rendering, and Hybrid Rendering.

By default, Universal Rendering is selected.\
These modes can easily be switched via `nuxt.config`.

## Universal Rendering

In Universal Rendering, the server returns fully rendered HTML.\
This allows the user to access the application's content immediately.

After loading the HTML, the browser also loads JavaScript code to build dynamic UI that requires interaction.\
This process is called "hydration".

In this example, we log a `count` state to the console in `app.vue`.\
When accessing the page, you can see the output both in the terminal (server) and in the browser console.

This means that Nuxt executes Vue.js code on the server to generate HTML, and then runs the same code again in the browser.\
This is why it is called "Universal Rendering".

The main advantages and disadvantages of Universal Rendering are as follows:

### Advantages

- Performance\
  Since HTML is generated on the server and read by the browser, it is faster than generating content using JavaScript in the browser.
- Search Engine Optimization (SEO)\
  Web crawlers can directly index the page content, which is beneficial for SEO.

### Disadvantages

- Development constraints\
  Writing code that runs seamlessly on both server and client sides imposes some limitations.
- Cost\
  Requires a server, which incurs operational costs.

For more details, see the [official documentation](https://nuxt.com/docs/guide/concepts/rendering#universal-rendering).

## Client-Side Rendering

You can enable Client-Side Rendering by setting `ssr: false` in `nuxt.config`.

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  ssr: false
})
```

With Client-Side Rendering, the application is rendered in the browser.\
The browser downloads and parses all JavaScript code, which contains the instructions to construct the UI, then generates HTML elements.

The main advantages and disadvantages of Client-Side Rendering are as follows:

### Advantages

- Development speed\
  You only need to consider how the application works in the browser, without worrying about server integration.
- Cost-efficient\
  No server is needed, so infrastructure costs are lower.
- Offline capability\
  Since all code runs in the browser, the app can continue working even without an internet connection.

### Disadvantages

- Performance\
  Users have to wait for the browser to download, parse, and execute JavaScript, which may affect user experience.
- Search Engine Optimization (SEO)\
  Indexing and updating content rendered on the client side takes time, which is less SEO-friendly compared to server-rendered HTML.

## Hybrid Rendering

Nuxt allows you to specify different cache rules and rendering modes for each route using route rules.

This is configured via the `routeRules` option in `nuxt.config`.

For more details, refer to the [official documentation](https://nuxt.com/docs/guide/concepts/rendering#hybrid-rendering).

```ts
export default defineNuxtConfig({
  routeRules: {
    // Homepage pre-rendered at build time
    '/': { prerender: true },
    // Blog list page generated on demand, revalidates in background, cached on CDN for 1 hour (3600 seconds)
    '/blog': { isr: 3600 },
    // Blog post pages generated on demand once until next deployment, cached on CDN
    '/blog/**': { isr: true },
    // Admin dashboard rendered only on the client-side
    '/admin/**': { ssr: false },
  }
})
```

## Challenge

Set up Client-Side Rendering and verify that Vue.js code runs only in the browser.

To do this:

1. Set `ssr: false` in `nuxt.config`.
2. Log a `count` state to the console in `app.vue`.
3. Confirm that there is no output in the terminal.
4. Open the browser devtools and verify that the console shows the output.

Next, set up Hybrid Rendering and confirm that you can assign different cache rules and rendering modes per route.

To do this:

1. Use the `NuxtPage` component in `app.vue` to render pages.
2. Add console output in the `script setup` of `/pages/index.vue` and `/pages/foo.vue` (any message is fine).
3. Set `routeRules` in `nuxt.config`, applying different cache and rendering settings to `/` and `/foo`.\
   This time, set `ssr: false` for `/foo`.
4. Visit `/` and confirm that the console output appears both on the server and in the browser.
5. Visit `/foo` and confirm that the console output appears only in the browser.

:ButtonShowSolution{.bg-faded.px4.py2.mb3.rounded.border.border-base.hover:bg-active.hover:text-primary.hover:border-primary:50}

:::note
To verify rendering behavior, it's important to check not just console output, but also the request behavior using the browser's "Network" tab.

With Universal Rendering, since HTML is generated on the server, you'll see a fully populated `<div id="__nuxt">` in the network response.\
With Client-Side Rendering, the HTML will initially be empty and populated by JavaScript.\
(The JavaScript will be visible as separate download requests)
:::
