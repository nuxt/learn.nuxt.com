# リアクティビティー パート２

[リアクティビティー パート１](reactivity-1)で、データの変更を監視して、変更時に更新を自動的にトリガーする [優れたリアクティビティシステム](https://ja.vuejs.org/guide/essentials/reactivity-fundamentals) の`ref`について学習しました。
ここでは、`computed`について学習しましょう。

## `computed` の基本

Vue には **算出プロパティ** ([`computed`](https://ja.vuejs.org/api/reactivity-core.html#computed)) という仕組みがあります。
`computed` は、依存するデータの値から自動的に導出されるリアクティブなプロパティです。
依存するリアクティブデータの値が変わらない限り結果がキャッシュされ、無駄な再計算を防ぐのでパフォーマンス良く利用することができます。

```vue
<script setup>
import { computed, ref } from 'vue'

const score = ref(65)
const grade = computed(() => score.value >= 80 ? 'A' : 'B')
const color = computed(() => grade.value === 'A' ? '#ff0000' : 'inherit')
</script>

<template>
  <p :style="{ color }">
    成績：{{ grade }}
  </p>
</template>
```

`score` が変わると自動で `grade` が再計算されます。
逆に `score` が変わらない限り、何度使っても前回の計算結果を使います。

変数 `color` に注目してください。依存データに `computed` を利用することもできます。
`grade` が変わると、 `<p>` 要素のstyle属性 `color` プロパティ値がリアクティブに変更されます。

::note
値は `ref` と同じく `.value` を通してアクセスすることができます。
ただし `<template>` 内では自動的に `.value` がアンラップされるため、 `{{ grade }}` と書くだけでOKです。
::

## `computed` の仕組み

`computed` の本質は **getter 関数** です。
依存するリアクティブデータを監視し、変更があったときだけ処理を実行します。
以下のような流れです：

1. 初回アクセス時に計算
2. 依存している値が変わるまで結果をキャッシュ
3. 依存値が変わると再計算

これは、 **通常の関数呼び出し（methods）** とは大きく異なります。 `methods` は呼ばれるたびに処理されますが、 `computed` はキャッシュされます。

## よくある使い方

- フォーマット変換（例：日付や通貨の整形）
- 条件によるラベル表示（合格/不合格 など）
- 配列やリストのフィルタリング・ソート
- 数値や文字列の結合・集計

## 書き込み可能な算出関数

`computed` は、デフォルトでは getter 関数のみです。
getterのみの `computed` に新しい値を代入しようとすると、ランタイム警告が表示されます。

```vue
<script setup>
import { computed, ref } from 'vue'

const count = ref(2)
const doubled = computed(() => count.value * 2)
</script>

<template>
  <!-- ランタイムエラーとなってしまう -->
  <input v-model="doubled" type="number">
  <p>count: {{ count }}</p>
</template>
```

`computed` は **getter** だけでなく **setter** も定義できます。
これにより、算出値を書き換えたときに元のデータに反映できます。

```vue
<script setup>
import { computed, ref } from 'vue'

const count = ref(2)
const doubled = computed({
  get: () => count.value * 2,
  set: (val) => {
    count.value = val / 2
  }
})
</script>

<template>
  <input v-model="doubled" type="number">
  <p>count: {{ count }}</p>
</template>
```

この場合、`doubled` を変更すると自動的に `count` も変わります。

## 現在の実装の課題

前回の学習では、「未完了のみ表示」チェックボックスを実装し、`showUnDoneOnly` と値が同期されるようにしました。
ですが、「未完了のみ表示」チェックボックスにチェックを入れても、未完了タスクで絞り込みがされていません。

## チャレンジ

`computed` を使って、以下のリアクティブな値を、 `filteredTodos` という命名で実装してみましょう。

- 「未完了のみ表示」がチェック状態の時は、 **`done` が `false`** の Todo のみを表示
- 「未完了のみ表示」のチェックが外れている時は、 **すべての Todo** を表示

次の手順に沿って実装してみましょう。

1. `<script setup>` の中で、 `filteredTodos` という算出プロパティ（ `computed` ）を定義しましょう。

2. `filteredTodos` の実装をしましょう。`showUnDoneOnly` の値によって、 `todos` の絞り込みをします。

- `showUnDoneOnly` が `true` の場合は、 `done: false` のTodoのみを返します
- `showUnDoneOnly` が `false` の場合は、すべてのTodoを返します

3. `TodoList` コンポーネントに `:todos="todos"` で、全てのリストを渡していましたが、
   1,2 で実装した `filteredTodos` を `TodoList` コンポーネントの `todos` propsに渡してみましょう。

もし行き詰まったら、以下のボタンをクリックして解答を見ることができます。
:ButtonShowSolution

## 実装後の効果

- 依存するリアクティブデータが変わった時だけ自動で再計算される
- 計算結果がキャッシュされ、無駄な処理を減らせる
- 加工や条件分岐のロジックをまとめられ、テンプレートがすっきりする

チェックボックスを切り替えた時に、表示されるTodoが正しく絞り込まれるようになりました！
