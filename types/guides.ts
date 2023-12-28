export interface GuideMeta {
  features?: PlaygroundFeatures
  startingFile?: string
  startingUrl?: string
  // TODO:
  packageJsonOverrides?: any
  /**
   * When not provided, this will be loaded from './files' directory
   */
  files?: Record<string, string>
  // TODO:
  solutions?: Record<string, string>
}

export interface PlaygroundFeatures {
  terminal?: boolean
  fileTree?: boolean
  download?: boolean
}
