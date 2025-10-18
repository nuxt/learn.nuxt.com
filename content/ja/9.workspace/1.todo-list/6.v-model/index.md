# フォーム入力バインディング

Vueでは [`v-model`](https://ja.vuejs.org/api/built-in-directives.html#v-model) ディレクティブを使うことで、フォーム要素やカスタムコンポーネントと「双方向データバインディング」を簡潔に実現できます。ユーザーの入力とVueのデータが常に同期され、フォーム制御が直感的になります。  
ここでは、フォーム要素の `v-model` の利用方法について学習します。  
※カスタムコンポーネントの `v-model` は、[コンポーネントでの v-model](componentization-3)で学習します。

## `v-model` の基本

`v-model` ディレクティブは、Vueインスタンスのデータとフォーム要素の値を自動的に同期します。テキスト欄・チェックボックス・ラジオボタン・セレクトボックスはもちろん、コンポーネントにも対応しています。

```vue
<!-- template -->
<input v-model="text" type="text" />
<p>{{ text }}</p>
```

この例では、入力欄（input）に文字を入力すると `text` データが即時に変更され、下の `<p>` に反映されます。`text` の値をJavaScriptから変更すると、input欄の表示も自動的に変わります。

## `v-model` の仕組み

`v-model` は実際には「バインド」と「イベント監視」を合わせた“糖衣構文”です：

```vue
<!-- template -->
<!-- :value がバインド、 @input がイベント監視 -->
<input :value="message" @input="message = $event.target.value" type="text" />

<!-- 上と同じ -->
<input v-model="message" type="text" />
```

フォームタイプごとにバインドされる属性やイベントが異なります：

- テキスト・テキストエリア：`value` 属性と `input` イベント
- チェックボックス・ラジオ：`checked` 属性と `change` イベント
- セレクトボックス：`value` 属性と `change` イベント

例えば、テキストエリア、ラジオボックス、セレクトボックスでは、このように使います：

```vue
<script setup lang="ts">
const memo = ref('')
const isDone = ref(true)
const showUnDoneOnly = ref(false)
</script>

<template>
  <textarea v-model="memo" placeholder="メモを入力"></textarea>

  <input v-model="isDone" :value="true" type="radio" />完了
  <input v-model="isDone" :value="false" type="radio" />未完了

  <select v-model="showUnDoneOnly">
    <option :value="false">すべてのタスクを表示</option>
    <option :value="true">未完了のみ表示</option>
  </select>
</template>
```

それぞれの入力内容が常に `v-model` の値の変数に格納されます。

## 💡Tips

- `v-model`とHTMLの `value` を併用すると`value`は無効になります
- `v-model` とイベントハンドラ（例：`@change`）を併用すると動作に注意が必要
- データの加工やカスタム検証が必要な場合は、「`v-bind`」と「`v-on`」で個別制御が便利

## 現在の実装の課題

プレイグラウンドで、「未完了のみ表示」チェックボックスを実装しようとしています。

```vue
<!-- template -->
<input
  :value="showUnDoneOnly"
  type="checkbox"
>
未完了のみ表示
```

この方法では：

- チェックボックスの「チェックが入っているかどうか（checked）」が、Vueのデータ `showUnDoneOnly` と連動しない。

## チャレンジ

次の手順に沿って、まずは `:value` バインディングと `@change` イベント監視で、値が同期されるよう修正し、
次に `v-model` で、値が同期されるよう修正して、 `v-model` の使い方を学びましょう。

### 1. `:value` と `@change` による値の同期

`<input>`の`@change`イベントを使い、ユーザーがチェックボックスを変更したタイミングで`showUnDoneOnly`の値を切り替えましょう。これにより、`showUnDoneOnly`がユーザー操作に連動して変更されるようになります。

```vue
<input
  :value="showUnDoneOnly"
  type="checkbox"
  @change="showUnDoneOnly = $event.target.checked"
>
未完了のみ表示
```

### 2. `v-model` による値の同期

次に、`:value` を `v-model`に切り替えて、 `@change` の値変更のコードを削除しましょう。
そうすることで、 `v-model` の双方向データバインディングによって、バインドとイベント監視の指定がなくても、値が自動的に同期されるようになります。

もし行き詰まったら、以下のボタンをクリックして解答を見ることができます。
:ButtonShowSolution

## 実装後の効果

- 入力欄やチェックボックスとデータがリアルタイムに連動
- フォームの状態管理がシンプルかつ直感的に

`v-model` を使って直感的にフォーム機能を使えるようになりました！
