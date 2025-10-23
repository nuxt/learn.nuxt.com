---
ogImage: true
---

# リアクティビティー パート１

Vue はデータの変更を監視して、変更された時に更新を自動的にトリガーする [優れたリアクティビティシステム](https://ja.vuejs.org/guide/essentials/reactivity-fundamentals) を提供していて、常に最新のデータを UI に反映させることができます。Vue のリアクティビティは、`ref`、`computed`、`watch` があります。

- [`ref()`](https://ja.vuejs.org/api/reactivity-core#ref) は単一の値を保持するためのコンテナを作成し、値が変更された時に自動的に追跡できるようにします。値は `.value` を通してアクセスすることができます。

- [`computed()`](https://ja.vuejs.org/api/reactivity-core#computed) は getter 関数を受け取り、getter からの返り値を反映した `ref` オブジェクトを返します。

ここのプレイグラウンドでは、数字を保持するための `count` という名前の ref オブジェクトと、`count` の倍の値を計算する `doubled` という名前の computed オブジェクトを作成します。Vue は `doubled` が `count` に依存していることを知っているため、`count` が変更された際に `doubled` は自動で再計算されます。

ボタンをクリックして `count` の値が増やしてみてください。`doubled` の値も変更が反映されることを確認することができます。

::note
**注意**: `<template>` 内で参照された場合、refs は Vue によって自動的にアンラップされます。`.value` は、`<script>` 内や Vue コンポーネント外の JavaScript でアクセスする時にのみ必要になります。
::

## チャレンジ

では、実際にやってみましょう！
現在 `2` 倍にハードコードされている乗数をリアクティブに更新可能にするコードに変更してみましょう。

そのためには:

1. `ref()` を使って `multiplier` という名前の変数を作成し、`2` をセットします
2. `<script>` と `<template>` の両方で、`doubled` を `result` にリネームします
3. `result` の実装を `count.value * multiplier.value`{lang=js} を返すように変更します
4. `multiplier` の値を増加させるための別のボタンを追加します

以上です！
multiplier ボタンを押下すると、新しい乗数による変更結果を確認することができます。

もし行き詰まったら、以下のボタンかエディタの右上にあるボタンをクリックして回答を見ることができます。

:ButtonShowSolution{.bg-faded.px4.py2.rounded.border.border-base.hover:bg-active.hover:text-primary.hover:border-primary:50}

アイデアを自由に試してみてください。終わったら、次のセクションに進んで、リアクティビティシステムについてさらに学びましょう。
