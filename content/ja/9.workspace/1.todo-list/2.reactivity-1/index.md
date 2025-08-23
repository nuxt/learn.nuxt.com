---
ogImage: true
---

# リアクティビティー パート１

Vue はデータの変更を監視して、変更された時に更新を自動的にトリガーする [優れたリアクティビティシステム](https://ja.vuejs.org/guide/essentials/reactivity-fundamentals) を提供していて、常に最新のデータを UI に反映させることができます。Vue のリアクティビティは、`ref`、`computed`、`watch` があります。
ここでは、`ref`について学習します。

## `ref` の基本

[`ref()`](https://ja.vuejs.org/api/reactivity-core#ref) は単一の値を保持するためのコンテナを作成し、値が変更された時に自動的に追跡できるようにします。値は `.value` を通してアクセスすることができます。

```vue
<script setup>
import { ref } from 'vue'

const userName = ref('')

const setNameUser1 = () => {
  userName.value = 'ユーザー１'
}

const setNameUser2 = () => {
  userName.value = 'ユーザー２'
}
</script>

<template>
  <div>
    <p>ユーザー名： {{ userName }}</p>

    <button @click="setNameUser1">ユーザー１をセット</button>
    <button @click="setNameUser2">ユーザー２をセット</button>
  </div>
</template>
```

## 現在の実装の課題

プレイグラウンドで`let userName`を用意し、「ユーザー名をセット」ボタンを押したら`userName`に任意のユーザー名が入るようにしています。

```vue
  <script setup lang='ts'>
    let userName = "No Name";

    const setUserName = () => {
      userName = "Vue Fes Japan"
    }
  </script>

  <template>
    <div class="header-right">
      <button @click="setUserName">ユーザー名をセット</button>
      👤
      <span>{{ userName }}</span>
    </div>
  </template>
```

この方法では：
- userNameがリアクティブではないため、値の変化をVueのリアクティブシステムが検知できない。
- userName = 'Vue Fes Japan'のように値を変えても、画面への自動更新が起きない。

## チャレンジ

userNameを`ref`を使ってリアクティブな値にし、値の変化を検知できるようにしてください。

1. `let userName`を `ref()`を使ってリアクティブな値にしてください
2. `userName = "Vue Fes Japan"`を`.value` を通してアクセスするよう変更してください

::note
`<template>`内では自動的に`.value`がアンラップされるため、`{{ userName }}`と書くだけでOKです。
また、`ref`はリアクティブなコンテナなので、`const`で宣言しても問題ありません。
::

## 実装後の効果

`ref` を使用すると：
- データの変更をVueが自動で検知し、UIがリアルタイムに更新されるようになった
- 変更を反映するための手動操作が不要になり、開発効率が向上した

もし行き詰まったら、以下のボタンをクリックして解答を見ることができます。

:ButtonShowSolution

ref を使い、データの変更が自動的に画面に反映されるようになりました！