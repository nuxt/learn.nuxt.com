<script setup lang="ts">
import { NuxtLink } from '#components'
import type { Command } from '~/stores/commands'

const commands = useCommandsStore()
const router = useRouter()

const selected = ref(0)

function move(delta: number) {
  selected.value += delta
  if (selected.value < 0)
    selected.value = commands.commandsResult.length - 1
  if (selected.value >= commands.commandsResult.length)
    selected.value = 0
}

function runCommand(command: Command) {
  if (command.handler)
    command.handler()
  else if (command.to)
    router.push(command.to)
  commands.isShown = false
}

useEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    commands.isShown = !commands.isShown
    e.preventDefault()
  }

  if (commands.isShown) {
    switch (e.key) {
      case 'Escape':
        commands.isShown = false
        e.preventDefault()
        return
      case 'ArrowUp':
        move(-1)
        e.preventDefault()
        return
      case 'ArrowDown':
        move(1)
        e.preventDefault()
        return
      case 'Enter': {
        runCommand(commands.commandsResult[selected.value])
        e.preventDefault()
        break
      }
    }
  }
})
</script>

<template>
  <div
    v-if="commands.isShown"
    fixed inset-0 z-index-command-palette flex="~ items-center justify-center"
  >
    <div absolute inset-0 z--1 bg-black:75 />
    <div border="~ base rounded" h-100 w-200 bg-base>
      <div flex="~ items-center">
        <div class="i-ph-magnifying-glass-duotone" m4 text-xl />
        <input
          v-model="commands.search"
          h-full w-full rounded border-none p4 pl0 outline-none bg-base
          placeholder="Search..."
        >
      </div>

      <div border="t base" flex="~ col">
        <component
          :is="c.to ? NuxtLink : 'button'"
          v-for="c, idx in commands.commandsResult"
          :key="c.id || c.title"
          :to="c.to"
          flex="~ gap-2 items-center" mx1 rounded p2 px3
          :class="selected === idx ? 'bg-active' : ''"
          @click="runCommand(c)"
        >
          <div :class="c.icon || 'i-ph-dot-duotone'" />
          {{ c.title }}
        </component>
      </div>
    </div>
  </div>
</template>
