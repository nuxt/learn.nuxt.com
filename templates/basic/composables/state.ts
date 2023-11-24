export function useReadPostMessage() {
  const message = reactive<{ type: string, value: undefined }>({
    type: '',
    value: undefined,
  })

  window.addEventListener('message', (event) => {
    message.type = event.data.type
    message.value = event.data.value
  })

  return message
}

export function toggleColorModeClass(value: string) {
  document.getElementsByTagName('html')[0].setAttribute('class', value)
}
