---
ogImage: true
---

# ルーティング

## ファイルシステムルーター

ファイルシステムルーターは Nuxt の主要機能の 1 つです。\
`pages/` ディレクトリ内の各 Vue ファイルが、それに対応する URL（ルート）を作成し、そのファイルの内容を表示します。\
この例では、`pages/index.vue` が `/` に、`pages/foo.vue` が `/foo` に対応しています。\
このルーティングは [vue-router](https://router.vuejs.org/) をベースに実装されています。

また、Nuxt は各ページに対してコード分割等の最適化により、リクエストされたルートに対して最小限の JavaScript を配信します。

## ナビゲーション

`pages/` にルートを作成したら、`<NuxtLink>` コンポーネントを使うことでナビゲーションを行うことができます。

`<NuxtLink>` コンポーネントでは `to` という props にルートを指定することでリンクを作成することができます。\
`<NuxtLink>` コンポーネントは自動的に最適化されるため、通常の `<a>` 要素と、`href` 属性を利用したリンクの作成と比べ、高速にナビゲーションを行うことができます。

## ルートパラメータ

`/pages` ディレクトリでは、ファイル名の一部を `[]` で囲うことで動的なルーティングを定義することができます。(例: `pages/posts/[id].vue`)

この `[]` で囲われたルートパラメータは `useRoute()` を通じてアクセスすることができます。

```vue
<!-- pages/posts/[id].vue -->
<script setup lang="ts">
const route = useRoute()

// /posts/1 にアクセスした際、route.params.id は 1 になる
console.log(route.params.id)
</script>
```

## チャレンジ

`/posts/[id]` というルートに対して、 `/`, `/foo` からナビゲーション出来るように実装してみましょう。
`/posts/[id]` では、ルートパラメータから `id` を読み取り、その値を画面に表示してみましょう。

そのためには:

1. `pages/posts/[id].vue` ファイル内で `useRoute()` を使って params から `id` を取得し、画面に表示します。
2. `pages/index.vue` と `pages/foo.vue` に `<NuxtLink>` コンポーネントを使って `/posts/[id]` にナビゲーションするリンクを作成します。\
   ここでは例として、`/posts/1` にナビゲーションするリンクを作成してみましょう。\
   (実際には値は任意のもので構いません)

もし行き詰まったら、以下のボタンかエディタの右上にあるボタンをクリックして回答を見ることができます。

:ButtonShowSolution{.bg-faded.px4.py2.rounded.border.border-base.hover:bg-active.hover:text-primary.hover:border-primary:50}

---

ここで登場した、`useRoute` 関数や `<NuxtLink>` コンポーネント、Nuxt のコアコンセプトの 1 つとなっている Auto Imports によって自動的に import されるため、import 文を記載することなく利用することができます。\
[Auto Imports](/concepts/auto-imports) について次のセクションでより詳しく学びましょう。
