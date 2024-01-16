---
ogImage: true
---

# Nuxt Concepts

In this chapter, we will cover the core concepts of Nuxt.

Nuxt is a free and open-source framework with an intuitive and extendable way to create type-safe, performant and production-grade full-stack web applications and websites with Vue.js. If you are not familiar with Vue.js, we recommend you to start with the [Vue Basics](/vue/intro) section and read the [official Vue documentation](https://vuejs.org/) first.

## Automation and Conventions

Nuxt uses conventions and an opinionated directory structure to automate repetitive tasks and allow developers to focus on pushing features. The configuration file can still customize and override its default behaviors.

- [**File-based routing**](/concepts/routing): define routes based on the structure of your [`pages/` directory](/docs/guide/directory-structure/pages). This can make it easier to organize your application and avoid the need for manual route configuration.
- [**Auto-imports**](/concepts/auto-imports): write Vue composables and components in their respective directories and use them without having to import them with the benefits of tree-shaking and optimized JS bundles.
- **Code splitting:** Nuxt automatically splits your code into smaller chunks, which can help reduce the initial load time of your application.
- **Server-side rendering out of the box:** Nuxt comes with built-in SSR capabilities, so you don't have to set up a separate server yourself.
- **Data-fetching utilities:** Nuxt provides composables to handle SSR-compatible data fetching as well as different strategies.
- **Zero-config TypeScript support:** write type-safe code without having to learn TypeScript with our auto-generated types and `tsconfig.json`
- **Configured build tools:** we use [Vite](https://vitejs.dev) by default to support hot module replacement (HMR) in development and bundling your code for production with best-practices baked-in.

Nuxt takes care of these and provides both frontend and backend functionality so you can focus on what matters: **creating your web application**.

## Getting Started

This playground has Nuxt installed and configured for you, so we could directly start with the creation of our application. If you want to install Nuxt locally on yourself, please follow the [installation guide](https://nuxt.com/docs/getting-started/installation).

To get started, let's learn about how your [Nuxt application entry is defined](/concepts/app-vue).
