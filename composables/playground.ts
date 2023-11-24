export function usePlayground() {
  const location = ref({
    origin: '',
    fullPath: '',
  })

  window.addEventListener('message', (event) => {
    if (event.origin !== location.value.origin)
      return

    console.log('event', event)

    switch (event.data.type) {
      case 'update:path':
        location.value.fullPath = event.data.path
        break
      default:
        break
    }
  })

  return { location }
}
