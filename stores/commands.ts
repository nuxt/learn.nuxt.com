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

  const fuse = computed(() => new Fuse(Array.from(commandsAll), {
    keys: ['title', 'description'],
    threshold: 0.3,
  }))

  const commandsResult = computed(() => {
    if (!search.value)
      return Array.from(commandsAll)
    return fuse.value.search(search.value).map(i => i.item)
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
