export function usePanelDragging() {
  return useState('is-panel-dragging', () => false)
}

export function usePlaygroundCookie(name: string, value: number | string | boolean) {
  return useCookie(
    name,
    { default: () => value, watch: true },
  )
}

export function usePostMessage(type: string, value: string | number | boolean) {
  const iframe = document.querySelector('iframe')

  if (iframe && iframe.contentWindow)
    iframe.contentWindow.postMessage({ type, value }, '*')
}
