import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
import Fuse from 'fuse.js'

export interface Command {
  id?: string
  title: string
  to?: string
  description?: string
  visible?: () => boolean
  handler?: () => void
  icon?: string
}

export const useCommandsStore = defineStore('commands', () => {
  const search = ref('')
  const isShown = ref(false)
  const commandsAll = reactive<Set<Command>>(new Set())
  const guidesResult = ref<Command[]>([])

  const fuse = computed(() => new Fuse(Array.from(commandsAll), {
    keys: ['title', 'description'],
    threshold: 0.3,
  }))

  const debouncedSearch = refDebounced(search, 100)

  watch(debouncedSearch, async (v) => {
    if (v) {
      // TODO: send a PR to nuxt/content to default generic type
      // TODO: move it out if it's reactive
      const result = await searchContent(v, {}) as ComputedRef<ParsedContent[]>
      guidesResult.value = result.value.map((i): Command => ({
        id: i.id,
        title: i.title || 'Untitled',
        to: i.id,
        icon: 'i-ph-file-duotone',
      }))
    }
    else {
      guidesResult.value = []
    }
  })

  const commandsResult = computed(() => {
    let result = !search.value
      ? Array.from(commandsAll)
      : [
          ...fuse.value.search(search.value).map(i => i.item),
          ...guidesResult.value,
        ]

    result = result
      .filter(i => i.visible ? i.visible() : true)

    return result
  })

  return {
    search,
    isShown,
    commandsAll,
    commandsResult,
  }
})

export function addCommands(...inputs: Command[]) {
  const commands = useCommandsStore()

  onMounted(() => {
    for (const command of inputs)
      commands.commandsAll.add(command)
  })

  onUnmounted(() => {
    for (const command of inputs)
      commands.commandsAll.delete(command)
  })
}

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCommandsStore, import.meta.hot))
