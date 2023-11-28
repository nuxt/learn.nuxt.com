export const useUiState = defineStore('ui', () => {
  const isPanelDragging = ref(false)

  const persistState = reactive({
    panelDocs: 30,
    panelEditor: 30,
    panelPreview: 40,
  })

  const stateCookie = useCookie<Partial<typeof persistState>>(
    'nuxt-playground-ui-state',
    { default: () => ({}), watch: true },
  )

  Object.assign(persistState, stateCookie.value)
  watch(persistState, () => {
    stateCookie.value = { ...persistState }
  })

  return {
    isPanelDragging,
    ...toRefs(persistState),
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUiState, import.meta.hot))
