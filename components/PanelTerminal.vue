<template>
  <div h-full grid="~ rows-[min-content_1fr]">
    <div
      flex="~ gap-2 items-center"
      border="b base dashed"
      bg-faded px4 py2
    >
      <div i-ph-terminal-window-duotone />
      <span text-sm>Terminal</span>
    </div>
    <PanelTerminalClient />
  </div>
</template>
