/**
 * Please create an issue first before submiting PRs.
 * So that we can discuss about the directions and plans, to avoid wasted efforts. Thank you!
 */

import type { PlaygroundInstance } from './playground'

export function usePanelDragging() {
  return useState('is-panel-dragging', () => false)
}

// TODO: migrate to Pinia
export function useGlobalPlayground() {
  return useState<PlaygroundInstance | undefined>(
    'playground',
    () => undefined,
  )
}

export function usePanelCookie(name: string, value: number) {
  return useCookie(
    name,
    { default: () => (value), watch: true },
  )
}
