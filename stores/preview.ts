import type { ClientInfo } from '~/types/rpc'

export const usePreviewStore = defineStore('preview', () => {
  const location = ref({
    origin: '',
    fullPath: '',
  })
  const url = ref('')
  const clientInfo = ref<ClientInfo>()

  function updateUrl() {
    url.value = location.value.origin + location.value.fullPath
  }

  return {
    clientInfo,
    location,
    url,
    updateUrl,
  }
})
