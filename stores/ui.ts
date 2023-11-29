export const useUiState = defineStore('ui', () => {
  const isPanelDragging = ref(false)

  const persistState = reactive({
    panelDocs: 30,
    panelEditor: 30,
    panelPreview: 40,
    showTerminal: false,
  })

  const stateCookie = useCookie<Partial<typeof persistState>>(
    'nuxt-playground-ui-state',
    { default: () => ({}), watch: true },
  )

  Object.assign(persistState, stateCookie.value)
  watch(persistState, () => {
    stateCookie.value = { ...persistState }
  })

  function toggleTerminal() {
    const TERMINAL_HEIGHT = 30
    persistState.showTerminal = !persistState.showTerminal
    if (persistState.showTerminal) {
      persistState.panelEditor = persistState.panelEditor / 100 * (100 - TERMINAL_HEIGHT)
      persistState.panelPreview = persistState.panelPreview / 100 * (100 - TERMINAL_HEIGHT)
    }
    else {
      const remaining = persistState.panelEditor + persistState.panelPreview
      persistState.panelEditor = persistState.panelEditor / remaining * 100
      persistState.panelPreview = persistState.panelPreview / remaining * 100
    }
  }

  return {
    isPanelDragging,
    toggleTerminal,
    ...toRefs(persistState),
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUiState, import.meta.hot))
