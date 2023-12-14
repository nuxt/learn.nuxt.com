export interface FileStat {
  type: FileType
  ctime: number
  mtime: number
  size: number
}

export declare enum FileType {
  Unknown = 0,
  File = 1,
  Directory = 2,
  SymbolicLink = 64,
}
