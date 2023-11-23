<template>
  <nav px4 py3 text-lg border="b base" flex="~ gap-1 items-center">
    <NuxtLink to="/" title="Nuxt Playground">
      <NuxtLogo class="h-2em" />
    </NuxtLink>
    <div flex-auto />
    <ColorSchemeToggle />
    <NuxtLink
      p2 rounded
      hover="bg-active"
      href="https://github.com/nuxt/learn.nuxt.com"
      target="_blank"
    >
      <div i-carbon-logo-github text-2xl />
    </NuxtLink>
  </nav>
</template>
