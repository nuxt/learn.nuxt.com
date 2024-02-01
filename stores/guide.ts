import type { Raw } from 'vue'
import type { GuideMeta, PlaygroundFeatures } from '~/types/guides'

const defaultFeatures = Object.freeze(<PlaygroundFeatures>{
  fileTree: false,
  terminal: false,
  navigation: true,
  download: true,
})

export const useGuideStore = defineStore('guide', () => {
  const play = usePlaygroundStore()
  const ui = useUiState()
  const preview = usePreviewStore()

  const features = ref<PlaygroundFeatures>(defaultFeatures)
  const currentGuide = shallowRef<Raw<GuideMeta>>()
  const showingSolution = ref(false)
  const embeddedDocs = ref('')

  const ignoredFiles = computed(() => transformGuideIgnoredFiles(currentGuide.value?.ignoredFiles))

  watch(features, () => {
    if (features.value.fileTree === true) {
      if (ui.panelFileTree <= 0)
        ui.panelFileTree = 20
    }
    else if (features.value.fileTree === false) {
      ui.panelFileTree = 0
    }

    if (features.value.terminal === true)
      ui.showTerminal = true
    else if (features.value.terminal === false)
      ui.showTerminal = false
  })

  async function mount(guide?: GuideMeta, withSolution = false) {
    await play.init

    // eslint-disable-next-line no-console
    console.log('mounting guide', guide)

    await play.mount({
      ...guide?.files,
      ...withSolution ? guide?.solutions : {},
    })

    play.fileSelected = play.files.get(guide?.startingFile || 'app.vue')
    preview.location.fullPath = guide?.startingUrl || '/'
    preview.updateUrl()

    features.value = {
      ...defaultFeatures,
      ...guide?.features,
    }
    currentGuide.value = guide
    showingSolution.value = withSolution

    return undefined
  }

  async function toggleSolutions() {
    await mount(currentGuide.value, !showingSolution.value)
  }

  function openEmbeddedDocs(url: string) {
    embeddedDocs.value = url
  }

  return {
    mount,
    toggleSolutions,
    features,
    currentGuide,
    showingSolution,
    embeddedDocs,
    openEmbeddedDocs,
    ignoredFiles,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useGuideStore, import.meta.hot))
