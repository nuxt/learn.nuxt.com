import type { VirtualFile } from './VirtualFile'

export interface VirtualFileSystemTree {
  [name: string]: VirtualDirectoryNode | VirtualFileNode
}

export interface VirtualDirectoryNode {
  directory: VirtualFileSystemTree
}

export interface VirtualFileNode {
  file: VirtualFile
}
