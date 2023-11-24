export const useUiState = defineStore('ui', () => {
  const isPanelDragging = ref(false)

  const persistState = useCookie(
    'nuxt-playground-ui-state',
    { default: () => ({
      panelDocs: 30,
      panelEditor: 30,
      panelPreview: 40,
    }), watch: true },
  )

  return {
    isPanelDragging,
    ...toRefs(persistState.value),
  }
})
