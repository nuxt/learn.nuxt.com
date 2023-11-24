export function usePlayground() {
  const iframeLocation = ref({
    origin: '',
    fullPath: '',
  })

  const wcUrl = computed(() => iframeLocation.value.origin + iframeLocation.value.fullPath)

  window.addEventListener('message', (event) => {
    if (event.origin !== iframeLocation.value.origin)
      return

    console.log('event', event)

    switch (event.data.type) {
      case 'update:path':
        iframeLocation.value.fullPath = event.data.path
        break
      default:
        break
    }
  })

  return { wcUrl, iframeLocation }
}
