# Nuxt Tutorial Playground

> [!WARNING]
> This project is unfinished and heavily work in progress.

An interactive interactive tutorial and playground for learning Nuxt. Powered by [Nuxt](https://nuxt.com) and [WebContainers](https://webcontainers.io/).

Inspired by [learn.svelte.dev](https://learn.svelte.dev).

## Live Streaming

Anthony Fu is doing regular live streaming on building this project from scratch. You can watch the recordings or join the live stream on [YouTube](https://www.youtube.com/playlist?list=PL4ETc_mXFfxUGiY852jH3ctljnI2e9Rax).

## Contributing

> [!IMPORTANT]
>
> **Please create an issue first before submitting PRs.**
> So that we can discuss about the directions and plans, to avoid wasted efforts. Thank you!
>
> This project is progressed mainly on Live Stream. In general, we want to present the main progress on the stream so people can follow along the whole process. Contributions are still greatly welcome! For PR that makes refactors or big changes, we could review them on the stream as well.

## Development

To run this project locally, you need to have [Node.js v20.0+](https://nodejs.org/en/) and [pnpm](https://pnpm.io/) installed.

After cloning the repo, run the following commands to install dependencies:

```bash
pnpm install
```

Then, run the following command to start the development server:

```bash
pnpm dev
```

The development server will be running at [http://localhost:3000](http://localhost:3000).

## Todolist

- [ ] Content
  - [ ] Allow each guide to configure file filter
  - [ ] Persist user changes when toggling solutions
  - [ ] Verification for tutorial tasks
  - [ ] Search feature
  - [ ] Embedded Nuxt Docs (update CORS headers)
  - [x] Only make necessary changes when navigating between guides
  - [x] Switch playgrounds on different guides
  - [x] Allow each guide to toggle features
  - [x] Solution for each guide
  - [x] A button of "Edit this page"
- [ ] SEO
  - [ ] OG Image
  - [ ] Meta tags
  - [ ] Sitemap
  - [ ] RSS
- [ ] Command K System
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
