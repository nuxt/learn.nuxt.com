export function usePanelDragging() {
  return useState('is-panel-dragging', () => false)
}

export function usePlaygroundCookie(name: string, value: number | string | boolean) {
  return useCookie(
    name,
    { default: () => value, watch: true },
  )
}

export function usePostMessage(value: unknown) {
  const iframe = document.querySelector('iframe')

  if (iframe && iframe.contentWindow)
    iframe.contentWindow.postMessage(value, '*')
}
