export interface GuideMeta {
  features?: PlaygroundFeatures
  startingFile?: string
  startingUrl?: string
  packageJsonOverrides?: any // TODO:
  /**
   * When not provided, this will be loaded from './files' directory
   */
  files?: Record<string, string>
}

export interface PlaygroundFeatures {
  terminal?: boolean
  showNodeJsFiles?: boolean
  filesSideBar?: boolean
}
