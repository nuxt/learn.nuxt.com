interface PostMessageResponse {
  message: string | boolean | number | Record<string, unknown>
}

export function useReadPostMessage(): PostMessageResponse {
  const message = ref()

  window.addEventListener('message', (event) => {
    message.value = event.data
  })

  return message
}
