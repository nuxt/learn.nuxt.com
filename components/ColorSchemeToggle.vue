<script lang="ts" setup>
const colorMode = useColorMode()

function toggleMode(event: MouseEvent) {
  const nextColorMode = colorMode.value === 'light' ? 'dark' : 'light'

  // @ts-expect-error experimental API missing type
  const isAppearanceTransition = document.startViewTransition
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!isAppearanceTransition) {
    colorMode.value = nextColorMode
    return
  }

  const [x, y] = [event.clientX, event.clientY]
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )

  // @ts-expect-error: Transition API missing type
  const transition = document.startViewTransition(async () => {
    colorMode.value = nextColorMode
    await nextTick()
  })
  transition.ready
    .then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ]
      document.documentElement.animate(
        { clipPath },
        {
          duration: 400,
          easing: 'ease-out',
          pseudoElement: '::view-transition-new(root)',
        },
      )
    })
}
</script>

<template>
  <button
    class="p-2 rounded hover:bg-active"
    @click="toggleMode"
  >
    <div class="i-ph-sun-dim-duotone dark:i-ph-moon-stars-duotone text-2xl" />
  </button>
</template>
