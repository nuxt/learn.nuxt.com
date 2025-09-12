import type { languages } from 'monaco-editor-core'

export const vue: languages.LanguageConfiguration = {
  comments: {
    blockComment: ['<!--', '-->'],
  },
  brackets: [
    ['<!--', '-->'],
    ['<', '>'],
    ['{', '}'],
    ['(', ')'],
  ],
  autoClosingPairs: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '\'', close: '\'' },
    { open: '"', close: '"' },
    { open: '<!--', close: '-->', notIn: ['comment', 'string'] },
    { open: '`', close: '`', notIn: ['string', 'comment'] },
    { open: '/**', close: ' */', notIn: ['string'] },
  ],
  autoCloseBefore: ';:.,=}])><`\'" \n\t',
  surroundingPairs: [
    { open: '\'', close: '\'' },
    { open: '"', close: '"' },
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '<', close: '>' },
    { open: '`', close: '`' },
  ],
}

export const ts: languages.LanguageConfiguration = {
  comments: {
    lineComment: '//',
    blockComment: ['/*', '*/'],
  },
  brackets: [
    ['${', '}'],
    ['{', '}'],
    ['[', ']'],
    ['(', ')'],
  ],
  autoClosingPairs: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '\'', close: '\'', notIn: ['string', 'comment'] },
    { open: '"', close: '"', notIn: ['string'] },
    { open: '`', close: '`', notIn: ['string', 'comment'] },
    { open: '/**', close: ' */', notIn: ['string'] },
  ],
  autoCloseBefore: ';:.,=}])>` \n\t',
  surroundingPairs: [
    { open: '\'', close: '\'' },
    { open: '"', close: '"' },
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '<', close: '>' },
    { open: '`', close: '`' },
  ],
}
