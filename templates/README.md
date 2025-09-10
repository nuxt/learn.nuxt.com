Notes for developers:

1. In the template, I have to use `pnpm@8.15.6` because WebContainers' pnpm version is locked. We can upgrade when WebContainers' pnpm version is upgraded.
2. We have to use Nuxt 3.15.4 because [since v3.16 Nuxt introduced `oxc-parser`](https://github.com/nuxt/nuxt/pull/30066) which is very unstable on WebContainers yet.
