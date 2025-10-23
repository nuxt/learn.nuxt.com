---
ogImage: true
---

# リアクティビティー パート２

前章で `ref` と `computed` を使った基本的なデータバインディングを学びました。本章では、`watch` について学びましょう。この章で基本的なリアクティビティシステムをマスターできます！

[`watch()`](https://ja.vuejs.org/api/reactivity-core#watch) はリアクティブなデータの変化を監視し、変化があったときに特定の処理を実行することができます。\
`watch` は `computed` と同様にリアクティブ値の変化に応じて作用しますが、主に `console.log` や `fetch` のような副作用をリアクティブに実行するときに使います。

```ts
const count = ref(0)

watch(count, (newValue, oldValue) => {
  console.log(`count changed from ${oldValue} to ${newValue}`)
})
```

プレイグラウンドでは、サーバーで管理している TODO アイテムを表示していますが、表示する ID が変化したときに新しいアイテムを取得するために `watch` による監視をしています。

`watch` に関する詳しい説明は [ウォッチャーガイド](https://ja.vuejs.org/guide/essentials/watchers) を参照してください。

## チャレンジ

今のプレイグラウンドは、TODO アイテムに関するデータを `id` と `data` の 2 つのリアクティブ値として管理しています。これらを 1 つの `state` という ref オブジェクトにまとめてみましょう。

1. `state` という変数を作成し、`id` と `data` と `loading` を `state` にまとめましょう。
2. エラー箇所にしたがって、`id`, `loading`, `data` と書いてある箇所はそれぞれ `state.value.id`, `state.value.loading`, `state.value.data` に書き換えましょう。
   - template 内では `.value` を書く必要はありません
3. `watch` の第一引数をゲッター関数に変えましょう。
   - `state.value.id` のままだと数値を渡していることになるため、`watch` が変化を補足できません。

もし手詰まりになったら、解決策を確認するためのボタンをクリックして、ヒントを得ることができます。
:ButtonShowSolution{.bg-faded.px4.py2.rounded.border.border-base.hover:bg-active.hover:text-primary.hover:border-primary:50}

ここまでで Vue のリアクティビティシステムの基礎について学びました。次のステップで、Vue の強力な機能の 1 つとなっている「Composition API」について学びましょう！
