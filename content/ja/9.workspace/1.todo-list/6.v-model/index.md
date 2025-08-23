# 双方向データバインディング

Vueでは v-model ディレクティブを使うことで、フォーム要素やカスタムコンポーネントと「双方向データバインディング」を簡潔に実現できます。ユーザーの入力とVueのデータが常に同期され、フォーム制御が直感的になります。

## `v-model` の基本

`v-model` ディレクティブは、Vueインスタンスのデータとフォーム要素の値を自動的に同期します。テキスト欄・チェックボックス・ラジオボタン・セレクトボックスはもちろん、独自コンポーネントにも対応しています。

```vue
<input v-model="text" type="text" />
<p>{{ text }}</p>
```

この例では、入力欄（input）に文字を入力すると `text` データが即時に変更され、下の `<p>` に反映されます。`text` の値をJavaScriptから変更すると、input欄の表示も自動的に変わります。

## 仕組み

`v-model` は実際には「バインド」と「イベント監視」を合わせた“糖衣構文”です：

```vue
<input v-model="message" />
<!-- と同じ -->
<input :value="message" @input="message = $event.target.value" />
```

フォームタイプごとにバインドされる属性やイベントが異なります：

- テキスト・テキストエリア：`value` 属性と `input` イベント  
- チェックボックス・ラジオ：`checked` 属性と `change` イベント  
- セレクトボックス：`value` 属性と `change` イベント  


たとえばテキスト入力フォームにはこう使います：

```vue
<input v-model="newTodoText" type="text" placeholder="新しいタスクを入力" />
<button @click="addTodo">追加</button>
```

`v-model="newTodoText"` で、入力内容が常に `newTodoText` 変数に格納されます。

## コンポーネントとの連携

独自コンポーネントでも `v-model` は使えます。Vue 3.4以降なら `defineModel()` マクロにより、親子間の値・イベント同期が一層シンプルに書けます。（こちらは、[コンポーネント化 パート２](componentization-2)でで学習します。）

```vue
<!-- 親コンポーネント -->
<MyInput v-model="searchTerm" />

<!-- MyInput.vue（子コンポーネント） -->
<script setup>
    const modelValue = defineModel()
</script>

<template>
    <input v-model="modelValue" />
</template>
```

## 注意点とコツ

- `v-model`とHTMLの `value` を併用すると`value`は無効になります 
- `v-model` とイベントハンドラ（例：`@change`）を併用すると動作に注意が必要
- データの加工やカスタム検証が必要な場合は、「`v-bind`」と「`v-on`」で個別制御が便利

## チャレンジ

今のプレイグラウンドでは、「未完了のみ」チェックボックスを実装しようとしています。
```vue
<input :value="showUnDoneOnly" type="checkbox" />
未完了のみ表示
```

ただし、この状態ではチェックボックスの「チェックが入っているかどうか（checked）」は Vueのデータ`showUnDoneOnly`と連動しません。
以下手順に沿って、まずは :value バインディングで値が同期される仕組みを体験し、次に v-model で双方向に値が同期される使い方を学びましょう。

1. `<input>`の`@change`イベントを使い、ユーザーがチェックボックスをクリックしたタイミングで`showUnDoneOnly`の値を切り替えましょう。これにより、`showUnDoneOnly`が操作に連動して変更されるようになります。

```vue
<input
    :value="showUnDoneOnly" 
    type="checkbox" 
    @change="showUnDoneOnly = !showUnDoneOnly"
/>

```

2. 次に、`:valueをv-model`に切り替えて、`@change`イベントでの値の変更は削除しましょう。そうすることで、Vueの双方向バインディングによって値が自動的に同期されるようになります。

## 実装後の効果

- 入力欄やチェックボックスとデータがリアルタイムに連動  
- フォームの状態管理がシンプルかつ直感的に  
- バリデーションやカスタムイベントも組み合わせて応用可能  

 
`v-model`を使って直感的にフォーム機能を使えるようになりました！
