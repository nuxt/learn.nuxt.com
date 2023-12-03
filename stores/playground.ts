import type { Raw } from 'vue'
import type { WebContainer } from '@webcontainer/api'
import type { VirtualFile } from '../structures/VirtualFile'

export const PlaygroundStatusOrder = [
  'init',
  'mount',
  'install',
  'start',
  'ready',
] as const

export type PlaygroundStatus = typeof PlaygroundStatusOrder[number] | 'error'

export interface PlaygroundActions {
  restartServer(): Promise<void>
  downloadZip(): Promise<void>
}

export const usePlaygroundStore = defineStore('playground', () => {
  const status = ref<PlaygroundStatus>('init')
  const error = shallowRef<{ message: string }>()
  const stream = shallowRef<ReadableStream>()
  const files = shallowRef<Raw<VirtualFile>[]>([])
  const webcontainer = shallowRef<Raw<WebContainer>>()

  const previewLocation = ref({
    origin: '',
    fullPath: '',
  })
  const previewUrl = computed(() => previewLocation.value.origin)

  // Actions that will be replaced later on
  const actions: PlaygroundActions = {
    async restartServer() {},
    async downloadZip() {},
  }

  return {
    status,
    error,
    stream,
    files,
    webcontainer,
    previewUrl,
    previewLocation,
    actions,
  }
})

export type PlaygroundStore = ReturnType<typeof usePlaygroundStore>

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePlaygroundStore, import.meta.hot))
