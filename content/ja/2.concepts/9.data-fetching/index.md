---
ogImage: true
---

# データフェッチ

実用的なアプリケーションを作る上で、データフェッチは欠かせない機能です。
データフェッチとは API やデータベースからデータを取得してくることを指します。

Nuxt では、このデータフェッチを便利に扱うために `useFetch`、 `useAsyncData`、`$fetch` といった関数を提供しています。

一言で言えば、

- `useFetch` は、コンポーネントのセットアップ関数でデータのフェッチを処理する最も簡単な方法です。
- `$fetch` は、ユーザーのインタラクションに基づいてネットワークリクエストを行うのに最適です。
- `useAsyncData` は、`$fetch` と組み合わせることで、よりきめ細かい制御を提供します。

https://nuxt.com/docs/getting-started/data-fetching

中でも、useFetch は最も簡単な方法で、実際には `useAsyncData` と `$fetch` の便利なラッパーです。

使い方は以下の通りで、

```vue
<script setup lang="ts">
const { data, pending, error, refresh, clear } = await useFetch('/api/modules')
</script>
```

具体的には以下のような機能があります。

- サーバーとクライアントの両方で動作する\
  useFetch はサーバーとクライアントの両方で動作することができるので、ユニバーサルレンダリング時でも簡単にデータフェッチを行うことができます。
- データキャッシュ\
  サーバー上で API が呼ばれた時、そのデータをクライアントに転送することで、クライアント側で再度データフェッチが行われることを防ぎます。
- リクエスト URL とレスポンスの型付け\
  server ディレクトリに API を実装することで、リクエスト URL とレスポンスの型付けが自動的に行われます。

より詳細な使い方については、[公式ドキュメント](https://nuxt.com/docs/api/composables/use-fetch) を参照してください。

また、より細かい制御を行いたい場合は `useAsyncData` や `$fetch` を利用することで、より高度なデータフェッチを行うことができます。

https://nuxt.com/docs/api/composables/use-async-data

https://nuxt.com/docs/api/utils/dollarfetch

## チャレンジ

1. API の動作を確かめてみる\
   server/api/todos/index.ts に 4 つめの Todo を追加した後、リフレッシュボタンを押してデータが更新されることを確認してみましょう。
2. 型付の自動化を確認してみる\
   server/api/todos/index.ts の Todo に `completed` プロパティを追加し、useFetch の型が更新されていることを確認してみましょう。

:ButtonShowSolution{.bg-faded.px4.py2.mb3.rounded.border.border-base.hover:bg-active.hover:text-primary.hover:border-primary:50}
