import { defineStore } from 'pinia'
import type { VirtualFile } from '../structures/VirtualFile'

export type PlaygroundStatus = 'init' | 'mount' | 'install' | 'start' | 'ready' | 'error'

export interface PlaygroundState {
  files: VirtualFile[]
  status: PlaygroundStatus
  error: { message: string } | undefined
  stream: ReadableStream | undefined
  previewUrl: string
  previewLocation: {
    origin: string
    fullPath: string
  }
}

export const usePlaygroundStore = defineStore<'playground', PlaygroundState>('playground', () => {
  const status = ref<PlaygroundStatus>('init')
  const error = shallowRef<{ message: string }>()
  const stream = ref<ReadableStream | undefined>()

  const previewLocation = ref({
    origin: '',
    fullPath: '',
  })
  const previewUrl = computed(() => previewLocation.value.origin + previewLocation.value.fullPath)

  return reactive({
    files: shallowRef<VirtualFile[]>([]),
    status,
    error,
    stream,
    previewUrl,
    previewLocation,
  })
  // TODO: find a way to type this
}) as unknown as () => PlaygroundState
