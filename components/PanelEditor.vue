<script setup lang="ts">
import { Pane, Splitpanes } from 'splitpanes'
import { filesToVirtualFsTree } from '~/templates/utils'

const play = usePlaygroundStore()
const ui = useUiState()
const guide = useGuideStore()

const files = computed(() => Array.from(play.files.values()).filter(file => !isFileIgnored(file.filepath)))
const directory = computed(() => filesToVirtualFsTree(files.value))

const input = ref<string>('')

watch(
  () => [play.fileSelected, guide.currentGuide, guide.showingSolution],
  () => {
    input.value = play.fileSelected?.read() || ''
  },
)

const onTextInput = useDebounceFn(_onTextInput, 500)
function _onTextInput() {
  if (input.value != null)
    play?.fileSelected?.write(input.value)
}

function startDragging() {
  ui.isPanelDragging = true
}

function endDragging(e: { size: number }[]) {
  ui.isPanelDragging = false
  ui.panelFileTree = e[0].size
}

// For panes size initialization on SSR
const isMounted = useMounted()
const panelInitFileTree = computed(() => isMounted.value || {
  width: `${ui.panelFileTree}%`,
})
const panelInitEditor = computed(() => isMounted.value || {
  width: `${100 - ui.panelFileTree}%`,
})
</script>

<template>
  <div
    h-full
    grid="~ rows-[min-content_1fr]"
  >
    <div
      flex="~ gap-2 items-center"
      border="b base dashed"
      bg-faded px4 py2
    >
      <div i-ph-text-t-duotone />
      <span text-sm>Editor</span>
    </div>
    <Splitpanes
      of-hidden
      @resize="startDragging"
      @resized="endDragging"
    >
      <Pane
        flex="~ col" h-full of-auto py1
        :size="ui.panelFileTree"
        :style="panelInitFileTree"
      >
        <PanelEditorFileSystemTree
          v-model="play.fileSelected"
          :directory="directory"
          :depth="-1"
        />
      </Pane>
      <PaneSplitter />
      <Pane
        :size="100 - ui.panelFileTree"
        :style="panelInitEditor"
      >
        <LazyPanelEditorMonaco
          v-if="play.fileSelected"
          v-model="input"
          :filepath="play.fileSelected.filepath"
          h-full w-full
          @change="onTextInput"
        />
      </Pane>
    </Splitpanes>
  </div>
</template>
