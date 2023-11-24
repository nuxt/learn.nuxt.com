export const useUiState = defineStore('ui', () => {
  const isPanelDragging = ref<boolean>(false)

  const persistState = reactive({
    panelDocs: 30,
    panelEditor: 30,
    panelPreview: 40,
  })

  const stateCookie = useCookie<Partial<typeof persistState>>(
    'nuxt-playground-ui-state',
    { default: () => ({}), watch: true },
  )

  function collapseTerminalPanel() {
    const panelTerminalSize = computed<number>(() => 100 - persistState.panelEditor - persistState.panelPreview)
    const minimalPanelSize = computed<number>(() => 4.5)

    if (panelTerminalSize.value !== minimalPanelSize.value)
      persistState.panelPreview = 100 - persistState.panelEditor - minimalPanelSize.value
    else
      persistState.panelPreview = 40
  }

  Object.assign(persistState, stateCookie.value)

  watch(persistState, () => {
    stateCookie.value = { ...persistState }
  })

  return {
    isPanelDragging,
    collapseTerminalPanel,
    ...toRefs(persistState),
  }
})
