# リアクティビティー パート２

[リアクティビティー パート１](reactivity-1)で、データの変更を監視して、変更された時に更新を自動的にトリガーする [優れたリアクティビティシステム](https://ja.vuejs.org/guide/essentials/reactivity-fundamentals) の`ref`について学習しました。
ここでは、`computed`について学習しましょう。


## `computed` の基本

Vue には **computed プロパティ** という仕組みがあり、  
既存のデータをもとに新しい値を“自動で計算”し、かつ**キャッシュ**してくれるため、パフォーマンス良く使えます。 
`computed` は「依存している値」が変化した時だけ再計算されます。

```vue
<script setup>
import { ref, computed } from 'vue'

const score = ref(65)
const grade = computed(() => score.value >= 80 ? 'A' : 'B')
</script>

<template>
  <p>成績：{{ grade }}</p>
</template>
```

`score` が変わると自動で `grade` が自動で再計算されます。
逆に `score` が変わらない限り、何度使っても前回の計算結果を使います。

::note
値は`ref`と同じく `.value` を通してアクセスすることができます。
ただし`<template>`内では自動的に`.value`がアンラップされるため、`{{ grade }}`と書くだけでOKです。
::

## 仕組み

`computed` の本質は **getter 関数** です。  
依存するリアクティブデータを監視し、変更があったときだけ処理を実行します。  
以下のような流れです：

1. 初回アクセス時に計算
2. 依存している値が変わるまで結果をキャッシュ
3. 依存値が変わると再計算

これは、**通常の関数呼び出し（methods）**とは大きく異なります。methodsは呼ばれるたびに処理されますが、computedはキャッシュされます。

## よくある使い方

- フォーマット変換（例：日付や通貨の整形）
- 条件によるラベル表示（合格/不合格 など）
- 配列やリストのフィルタリング・ソート
- 数値や文字列の結合・集計


## 双方向（writable computed）

`computed` は **getter だけ**でなく **setter** も定義できます。  
これにより、算出値を書き換えたときに元のデータに反映できます。

```vue
<script setup>
import { ref, computed } from 'vue'

const count = ref(2)
const doubled = computed({
  get: () => count.value * 2,
  set: (val) => {
    count.value = val / 2
  }
})
</script>

<template>
  <input v-model="doubled" type="number" />
  <p>count: {{ count }}</p>
</template>
```

この場合、`doubled` を変更すると自動的に `count` も変わります。


## チャレンジ

前回の学習では、「未完了のみ」チェックボックスを実装し、`showUnDoneOnly` と値が同期されるようにしました。  
今回は、チェックが入っているときは **`done` が `true` の Todo のみ**、  
チェックが外れているときは **すべての Todo** を表示するよう、`filteredTodos` を実装してみましょう。

1. `<script setup>`の中で、新しく `filteredTodos` という算出プロパティ（computed）を定義しましょう。この中で、`showUnDoneOnly` の値によって表示するTodoリストを切り替えるロジックを書きます。

2. `showUnDoneOnly`が`true`の場合は「`done: true` のTodoのみ」を返し、`showUnDoneOnly`が`false`の場合は「すべてのTodo」を返すようにコードを組みましょう。

3. 今までは `:todos="todos"` で直接全てのリストを渡していましたが、  
   実装した `filteredTodos` を `TodoList` コンポーネントに渡してみましょう。


### 実装例

```vue
<script setup>
import { ref, computed } from 'vue';

const filteredTodos = computed(() => {
  // チェックが外れている場合は全て表示
  if (!showUnDoneOnly.value) {
      return todos.value;
  }

  // チェックが入っている場合は「未完了だけ」
  return todos.value.filter(todo => !todo.done);
});
</script>
```


## 実装後の効果

- 依存している値が変わった時だけ自動で再計算される
- 計算結果がキャッシュされ、無駄な処理を減らせる
- 加工や条件分岐のロジックをまとめられ、テンプレートがすっきりする

もし行き詰まったら、以下のボタンをクリックして解答を見ることができます。

:ButtonShowSolution

チェックボックスを切り替えた時に、表示されるTodoが正しく絞り込まれるようになりました！