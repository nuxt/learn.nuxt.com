import type { FileNode, WebContainer } from '@webcontainer/api'

export class VirtualFile {
  constructor(
    public readonly filepath: string,
    private _content: string,
    public wc?: WebContainer,
  ) {
  }

  toNode(): FileNode {
    // eslint-disable-next-line ts/no-this-alias
    const self = this
    return {
      file: {
        get contents() {
          return self._content
        },
      },
    }
  }

  read() {
    return this._content
  }

  async write(content: string) {
    this._content = content
    if (this.wc)
      await this.wc.fs.writeFile(this.filepath, content, 'utf-8')
  }
}
