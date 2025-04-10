# Nuxt Tutorial Playground

> [!WARNING]
> The architecture of this project is ready, while the tutorial content is still work in progress, contributions appreciated!

An interactive tutorial and playground for learning Nuxt. Powered by [Nuxt](https://nuxt.com/docs) and [WebContainers](https://webcontainers.io/).

Live at: [📖 learn.nuxt.com](https://learn.nuxt.com).

This project is heavily inspired by [learn.svelte.dev](https://learn.svelte.dev).

## Project Development Process

Anthony Fu is building this project from scratch on Live Streaming.
You can watch the recordings of the full process on [YouTube](https://www.youtube.com/playlist?list=PL4ETc_mXFfxUGiY852jH3ctljnI2e9Rax).

## Contributing

### Development

To run this project locally, you need to have [Node.js v22.0+](https://nodejs.org/en/) and [pnpm](https://pnpm.io/) installed.

After cloning the repo, run the following commands to install dependencies:

```bash
pnpm install
```

Then, run the following command to start the development server:

```bash
pnpm dev
```

The development server will be running at [http://localhost:3000](http://localhost:3000).

### Content Structure

The tutorial content is located in the `content/en/` directory. Each route contains a number prefix (`1.`) to indicate the order and will be removed in the final URL. For each route, we use a folder with an `index.md` to serve the extra files. A `.template` folder can be placed with the `index.md` file to provide the template for the playground.

- `.template/index.ts` - Indicates the metadata for that guide, like enabling/disabling features, file filters, etc.
- `.template/files/**` - The files that will be copied to the playground when the user navigates to that guide, merged with the basic template under `template/basic/`
- `.template/solutions/**` - Optional solutions for the tasks in that guide, merged with the guide files.

### Translations

We have the Japanese content under `content/ja` in collobration with the [Vue.js community](https://github.com/vuejs-jp). At this moment, we are **NOT accepting new languages**, please [learn more here](./content/FOR_TRANSLATORS.md).

## Todolist

- [ ] Content
  - [ ] Allow each guide to configure file filter
  - [ ] Persist user changes when toggling solutions
  - [ ] Verification for tutorial tasks
  - [x] Search feature
    - [x] Search in command palette
    - [x] Search button
  - [x] Navigation
    - [x] Dropdown for guide outlines
    - [x] Breadcrumbs
    - [x] Previous/Next buttons
  - [x] Embedded Nuxt Docs (update CORS headers)
  - [x] Only make necessary changes when navigating between guides
  - [x] Switch playgrounds on different guides
  - [x] Allow each guide to toggle features
  - [x] Solution for each guide
  - [x] A button of "Edit this page"
- [x] SEO
  - [x] OG Image
  - [x] Meta tags
  - [x] Sitemap
- [x] Command K System
- [ ] About Page
- [ ] Welcome Screen
- [ ] Try https://ark-ui.com/docs/components/splitter
- [x] Show release time for the playground
- [x] Show Nuxt and Vue versions from the container
- [x] Custom bundler for templates (replaces `import.meta.glob`, create static virtual modules)
- [x] Monaco editor and Volar
  - [x] Connection Volar to the WebContainer FS
- [x] File tree
- [x] [Add interactivity shell](https://webcontainers.io/tutorial/7-add-interactivity)
- [x] A basic editor
- [x] Refactor logic from Vue SFC to composables
- [x] Refactor to add Pinia
- [x] Frame-to-parent communication
- [x] Sync the basic style
- [x] Buttons to restart server
- [x] Open/close terminal panel
- [x] Extract "playground injected" utils
- [x] Download the project as zip

## License

[MIT](./LICENSE)
