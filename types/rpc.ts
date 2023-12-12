export interface FrameFunctions {
  onColorModeChange(mode: string): void
}

export interface ParentFunctions {
  onReady(info: ClientInfo): void
  onNavigate(path: string): void
}

// === Types ===

export interface ClientInfo {
  versionVue: string
  versionNuxt: string
}
