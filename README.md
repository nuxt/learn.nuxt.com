# learn.nuxt.com

> [!WARNING]
> This project is unfinished and heavily work in progress.

An interactive Nuxt playground for learning Nuxt. Powered by [Nuxt](https://nuxt.com) and [WebContainers](https://webcontainers.io/).

Inspired by [learn.svelte.dev](https://learn.svelte.dev).

## Live Streaming

Anthony Fu is doing regular live streaming on building this project from scratch. You can watch the recordings or join the live stream on [YouTube](https://www.youtube.com/playlist?list=PL4ETc_mXFfxUGiY852jH3ctljnI2e9Rax).

## Contributing

> [!IMPORTANT]
>
> **Please create an issue first before submiting PRs.**
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

- [x] A basic editor
- [x] Refactor logic from Vue SFC to composables
- [x] Refactor to add Pinia
- [x] Frame-to-parent communication
- [x] Sync the basic style
- [ ] Buttons to restart server
- [ ] Open/close terminal panel
- [ ] Extract "playground injected" utils
- [ ] Switch playgrounds on different guides
- [ ] Monaco editor
- [ ] File tree
- [ ] Verification for tutorial tasks

## License

[MIT](./LICENSE)
