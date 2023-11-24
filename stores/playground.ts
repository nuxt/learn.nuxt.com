import { defineStore } from 'pinia'
import type { ShallowRef, UnwrapNestedRefs } from 'vue'
import type { WebContainer } from '@webcontainer/api'
import type { VirtualFile } from '../structures/VirtualFile'

export type PlaygroundStatus = 'init' | 'mount' | 'install' | 'start' | 'ready' | 'error'

export interface PlaygroundStateRaw {
  files: ShallowRef<VirtualFile[]>
  status: PlaygroundStatus
  error: { message: string } | undefined
  stream: ReadableStream | undefined
  webcontainer: ShallowRef<WebContainer | undefined>
  previewUrl: ComputedRef<string>
  previewLocation: {
    origin: string
    fullPath: string
  }
}

export type PlaygroundState = UnwrapNestedRefs<PlaygroundStateRaw>

export const usePlaygroundStore = defineStore('playground', (): PlaygroundStateRaw => {
  const previewLocation = reactive({
    origin: '',
    fullPath: '',
  })
  const previewUrl = computed(() => previewLocation.origin + previewLocation.fullPath)

  return {
    status: 'init',
    error: undefined,
    stream: undefined,
    files: shallowRef([]),
    webcontainer: shallowRef(undefined),
    previewUrl,
    previewLocation,
  }
})
