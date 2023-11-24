import { defineStore } from 'pinia'
import type { File } from '../structures/File'

export type PlaygroundStatus = 'init' | 'mount' | 'install' | 'start' | 'ready' | 'error'
export const usePlaygroundStore = defineStore('playground', () => {
  const status = ref<PlaygroundStatus>('init')
  const error = shallowRef<{ message: string }>()
  const stream = ref<ReadableStream | undefined>()

  const previewLocation = ref({
    origin: '',
    fullPath: '',
  })
  const previewUrl = computed(() => previewLocation.value.origin + previewLocation.value.fullPath)

  return reactive({
    files: shallowRef<File[]>([]),
    status,
    error,
    stream,
    previewUrl,
    previewLocation,
  })
})

type UseNullStore = ReturnType<typeof defineStore>
type NullStore = ReturnType<UseNullStore>
type UsePlaygroundStore = ReturnType<typeof usePlaygroundStore>
export type PlaygroundState = Omit<UsePlaygroundStore, keyof NullStore>
