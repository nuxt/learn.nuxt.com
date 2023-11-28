export interface FrameFunctions {
  onColorModeChange(mode: string): void
}

export interface ParentFunctions {
  onReady(): void
  onNavigate(path: string): void
}
