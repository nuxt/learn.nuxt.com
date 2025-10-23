---
ogImage: true
---

# コンポーネント化 パート１

Vue.js のコンポーネントは、UI を小さな再利用可能な部分に分割するための基本的な単位です。\
特に Single File Components (SFC) を使うことで、HTML、CSS、および JavaScript を 1 つの `.vue` ファイルにまとめることができます。

## 基本的な SFC の構造

SFC は基本的に `<script setup>`, `<template>`, `<style>` の 3 つのセクションで構成されます。

- `<script setup>`: コンポーネントのロジック部分を定義します。`<script setup>` を使用することで、Composition API を簡潔に書くことができます。
- `<template>`: コンポーネントのビュー部分を定義します。
- `<style scoped>`: コンポーネント固有のスタイルを定義します。`scoped` 属性を追加することで、このコンポーネントのスタイルが他のコンポーネントに影響を与えないようにします。

## コンポーネントの再利用

`.vue` ファイルで定義した SFC は、以下のように `<script setup>` でインポートすることでテンプレート内で再利用することができます。

```vue
<script setup lang="ts">
import Child from './Child.vue'
</script>

<template>
  <Child />
</template>
```

## 現在の実装の課題

現在、プレイグラウンドのapp.vueに全てのコードがまとまっています。
このままでも問題ありませんが、コンポーネント化することでコードの役割分担が明確になり、保守性や再利用性が向上します。

## チャレンジ1

`app.vue`にある`<table></table>`を`components/TodoList.vue`に切り出してみましょう

1. `app.vue`の`<table></table>`を`TodoList.vue`の`<template>`内に移動しましょう
2. `app.vue`の`/* --- table start --- */`から`/* --- table last --- */`までを`TodoList.vue`の`<style scoped>`内に移動しましょう
3. `app.vue`で`import`構文を使って`components/TodoList.vue`を読み込み、`<template>`内で`<TodoList />`として使用しましょう。

もし行き詰まったら、以下のボタンをクリックして解答を見ることができます。

:ButtonShowSolution

app.vueがすっきりとしました。

ただこのままでは、TodoList.vue側でapp.vueに定義された値にアクセスすることができません。
次の章で、コンポーネント間のデータの受け渡し方を実装します。
