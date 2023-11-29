import { defineStore } from 'pinia'
import type { Raw, ShallowRef, UnwrapNestedRefs } from 'vue'
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

export interface PlaygroundStateRaw {
  files: ShallowRef<Raw<VirtualFile[]>>
  status: PlaygroundStatus
  error: { message: string } | undefined
  stream: ReadableStream | undefined
  webcontainer: ShallowRef<Raw<WebContainer> | undefined>
  previewUrl: ComputedRef<string>
  previewLocation: Ref<{
    origin: string
    fullPath: string
  }>
  actions: PlaygroundActions
}

export interface PlaygroundActions {
  restartServer(): Promise<void>
  downloadZip(): Promise<void>
}

export type PlaygroundState = UnwrapNestedRefs<PlaygroundStateRaw>

export const usePlaygroundStore = defineStore('playground', (): PlaygroundStateRaw => {
  const previewLocation = ref({
    origin: '',
    fullPath: '',
  })
  const previewUrl = computed(() => previewLocation.value.origin + previewLocation.value.fullPath)

  // Actions that will be replaced later on
  const actions: PlaygroundActions = {
    async restartServer() {},
    async downloadZip() {},
  }

  return {
    status: 'init',
    error: undefined,
    stream: undefined,
    files: shallowRef([]),
    webcontainer: shallowRef(undefined),
    previewUrl,
    previewLocation,
    actions,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePlaygroundStore, import.meta.hot))
