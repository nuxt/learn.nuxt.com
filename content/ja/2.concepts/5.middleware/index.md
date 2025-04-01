---
ogImage: true
---

# ミドルウェア

Nuxt では、特定のルートにナビゲートする前にコードを実行する為のミドルウェアを提供しています。\
この機能は例えば、認証状態によってページへのアクセスを制限する場合などに便利です。

ミドルウェアにはグローバルミドルウェアとページ単位のミドルウェアの 2 つの種類があります。
どちらも、`middleware` ディレクトリに実装します。

## グローバルミドルウェア

グローバルミドルウェアは以下のように定義することができます。

```
-| middleware/
  ---| hello.global.ts
```

```ts
// middleware/hello.global.ts
export default defineNuxtRouteMiddleware(() => {
  console.log('hello')
})
```

## ページ単位のミドルウェア

ページ単位のミドルウェアは以下のように定義することができます。

```
-| middleware/
  ---| helloA.ts
```

```ts
// middleware/hello.ts
export default defineNuxtRouteMiddleware(() => {
  console.log('helloA')
})
```

```vue
<!-- pages/a.vue -->
<script setup lang="ts">
definePageMeta({
  middleware: ['hello'],
})
</script>

<template>
  <h1>Hello A</h1>
</template>
```

## ミドルウェアの実行タイミング

これらのミドルウェアは、クライアント上でのナビゲーション時はもちろん、SSR または SSG でのページ生成時にもサーバーサイドで実行されます。\
ミドルウェアでローカルストレージなどのクライアントサイドの API を使用する場合は、クライアントサイドのみで実行されるようにする必要があります。\
`import.meta` を使うことで実行している環境を判定することができます。
サーバーサイドでの実行スキップする場合は `import.meta.server` を利用します。

```ts
export default defineNuxtRouteMiddleware((to) => {
  // skip middleware on server (if (import.meta.client) { ... } でも同様)
  if (import.meta.server)
    return

  // some processing
  window.localStorage.setItem('key', 'value')
})
```

## チャレンジ

localStorage の情報を読み取って、特定の値がある場合のみ `/foo` にアクセス可能にするミドルウェアを作成してみましょう。\
今回は例として、`isSignedIn` というキーに `true` が設定されている場合のみ `/foo` にアクセス可能にするミドルウェアを作成します。\
値のセットは `index.vue` から行えるようにボタンを設置してみましょう。

:ButtonShowSolution{.bg-faded.px4.py2.rounded.border.border-base.hover:bg-active.hover:text-primary.hover:border-primary:50}
