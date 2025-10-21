# 復習・まとめ

TODOリストの作成を通して学べる、基本的なVue.jsの機能の説明は以上になります。

それでは、これまで学んだ機能を利用して、TODOリストのアプリケーションを完成させましょう。
これまで学んだ知識を活かせば実装できます。ぜひ自分のやり方で挑戦してみてください。

## 現在の実装の課題

タスクの新規作成モーダルに、タイトル、メモ、期限を入力して、「登録」ボタンをクリックしても、
TODOリストにタスクを追加することがきません。

## チャレンジ

タスクの新規作成モーダルで入力されたフォーム（タイトル、メモ、期限）データを、
フォーム送信で、TODOリストへタスク追加できるようにしましょう。

**実装のヒント（例）**

1. 各フォーム入力欄に対応するリアクティブ変数（ `ref` ）を用意し、 `v-model` でフォームと同期させる
2. フォームの submitイベントに `handleSubmit` などの関数を渡す
3. `handleSubmit` 内で、以下の情報を持つ新しい `Todo` オブジェクトを作成し、 `todos.value` の先頭に追加する
   - フォームから入力された値
   - `done: false`（新規作成時は未完了）
   - `id: Date.now()`（一意なID）

参考実装：

```typescript
function handleSubmit(e: Event) {
  e.preventDefault()

  const newTodo: Todo = {
    id: Date.now(),
    done: false,
    title: inputTitile.value,
    note: inputNote.value,
    dueDate: inputDate.value
  }

  todos.value = [
    newTodo,
    ...todos.value
  ]
}
```

もし行き詰まったら、以下のボタンをクリックして解答を見ることができます。

:ButtonShowSolution

---

## これまでのまとめ

基本的なVue.jsの機能を使って、自分でTODOリストを作成できるようになりましたね🎉

今回の学習で扱った主な内容は以下の通りです：

- `ref`（リアクティブなデータの作り方）
- `v-for`（リストをループ表示する方法）
- `v-if`（条件による表示・非表示の切り替え）
- コンポーネントの Single File Component（SFC）と `<script setup>`（Composition API の基本）
- `props` と `emit`（親子コンポーネント間のデータ受け渡しとイベント通知）
- `v-model` と `defineModel`（親子での双方向データバインディング）
- `computed`（計算されたリアクティブデータ）
- `slot` と `v-slot`（親から子へのテンプレート差し込み）

---

### これから知っておくと良い機能

今回の学習には含まれていませんが、Vue.js では他にも便利な機能や大事な考え方がいろいろあります。
いくつか紹介しますので、興味があれば学習してみてください。

- [`watch`](https://ja.vuejs.org/guide/essentials/watchers.html)（リアクティブデータの変化を監視して、何か処理を実行する）
- [ライフサイクルフック](https://ja.vuejs.org/guide/essentials/lifecycle.html)（コンポーネントの状態に応じた処理のタイミング）
- [Composables](https://ja.vuejs.org/guide/reusability/composables.html)（ロジックや状態を関数として切り出し、複数コンポーネントで再利用する仕組み）
- [Vue Router](https://router.vuejs.org/)（画面遷移の管理）
- [Pinia](https://pinia.vuejs.org/) / [Vuex](https://vuex.vuejs.org/ja/)（状態管理ライブラリ）
- [カスタムディレクティブ](https://ja.vuejs.org/guide/reusability/custom-directives.html)（独自のDOM操作機能を作る）

これらの機能は、より複雑で実践的なWebアプリケーション作りに役立ちます。
Vue.jsの基礎が固まったら、少しずつ広げていくのがおすすめです。

---

引き続き楽しくVue.jsを学んでいきましょう！
