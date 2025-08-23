# 独自コンポーネントでの v-slot

`v-slot` は、親コンポーネントから子コンポーネントの特定の場所にテンプレートを差し込むための仕組みです。  
コンポーネントを「箱」として使い、その中に好きなHTMLや部品を入れることができます。

---

```vue
<!-- 子コンポーネント -->
<template>
  <div class="box">
    <slot />
  </div>
</template>
```

```vue
<!-- 親コンポーネント -->
<template>
  <MyBox>
    <p>ここが中身になります</p>
  </MyBox>
</template>
```

---


## チャレンジ１

CreateModal.vue に <slot /> を追加し、
app.vue 側でそのスロットに表示させたいテキストを入れてみましょう。

## 名前付きスロット

スロットに名前を付けると、1つのコンポーネントに複数の差し込み場所を作れます。

```vue
<!-- 子コンポーネント -->
<template>
  <header>
    <slot name="header" />
  </header>
  <main>
    <slot />
  </main>
  <footer>
    <slot name="footer" />
  </footer>
</template>
```

```vue
<!-- 親コンポーネント -->
<template>
  <MyLayout>
    <template #header>
      <h1>タイトル</h1>
    </template>

    <p>メインコンテンツ部分</p>

    <template #footer>
      <small>フッターの文章</small>
    </template>
  </MyLayout>
</template>
```

**ポイント**
- `<slot name="xxx" />` に対して `<template #xxx>` で中身を渡す
- 名前なしスロット（デフォルト）と混ぜて使える

---

## 子から親にデータを渡す（スコープ付きスロット）

スロット経由で、子から親にデータを渡すこともできます。  

```vue
<!-- 子コンポーネント -->
<template>
  <slot :message="greeting" />
</template>

<script setup>
  const greeting = 'こんにちは！'
</script>
```

```vue
<!-- 親コンポーネント -->
<template>
  <GreetingBox>
    <template #default="{ message }">
      <p>{{ message }}</p>
    </template>
  </GreetingBox>
</template>
```

**ポイント**
- 子は `<slot :名前="値" />` で変数を渡せる
- 親は `<template #default="{ 名前 }">` で受け取る

---


## まとめ

- `v-slot` はコンポーネントの中の特定位置にテンプレートを差し込む機能
- 子から親にデータを渡すときはスコープ付きスロット
- 名前付きスロットを使えば差し込み場所を増やせる

---

## チャレンジ２

先ほど用意した`CreateModal.vue`の`<slot>`に、新規todo入力フォームを差し込んでみましょう。

1. `app.vue`側で`CreateModal.vue`に表示する新規todo入力フォームを作成する

参考実装：
```html
  <form>
    <div>
      <label for="title">タイトル</label>
      <input id="title" type="text" required />
    </div>

    <div>
      <label for="note">メモ</label>
      <textarea id="note" rows="2" />
    </div>

    <div>
      <label for="dueDate">期限</label>
      <input id="dueDate" type="date" />
    </div>

    <div>
      <button type="button">登録</button>
    </div>
  </form>
```

## チャレンジ３

フォームが表示されたら、いよいよ実際にデータを登録できるようにして、TODOリストを完成させましょう！  
これまで学んだ知識を活かせば実装できます。ぜひ自分のやり方で挑戦してみてください。

**実装のヒント（例）**  
1. 各フォーム入力欄に対応するリアクティブ変数（`ref`）を用意し、`v-model`でフォームと同期させる  
2. 「登録」ボタンクリックイベントに`handleSubmit`などの関数を渡します
3. `handleSubmit`内で、以下の情報を持つ新しい`Todo`オブジェクトを作成し、`todos.value`の先頭に追加します。
    - フォームから入力された値  
    - `done: false`（新規作成時は未完了）  
    - `id: Date.now()`（一意なID）

参考実装：
```typescript
const handleSubmit = () => {
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

ここまでお疲れ様でした！  
基本的なVue.jsの機能を使って、自分でTODOリストを作成できるようになりましたね。

今回の学習で扱った主な内容は以下の通りです：

- `ref`（リアクティブなデータの作り方）  
- `v-for`（リストをループ表示する方法）  
- `v-if`（条件による表示・非表示の切り替え）  
- コンポーネントの Single File Component（SFC）と `<script setup>`（Composition API の基本）
- `props` と `emit`（親子コンポーネント間のデータ受け渡しとイベント通知）  
- `v-model` と `defineModel`（親子での双方向データバインディング）  
- `computed`（計算されたリアクティブデータ）  
- `v-slot`（親から子へのテンプレート差し込み）

---

### これから知っておくと良い機能

今回の学習には含まれていませんが、Vue.js では他にも便利な機能や大事な考え方がいろいろあります。  
いくつか紹介しますので、興味があれば学習してみてください。

- `watch`（リアクティブデータの変化を監視して、何か処理を実行する）  
- ライフサイクルフック（コンポーネントの状態に応じた処理のタイミング）  
- Composables（ロジックや状態を関数として切り出し、複数コンポーネントで再利用する仕組み）
- Vue Router（画面遷移の管理）  
- Vuex / Pinia（状態管理ライブラリ）  
- カスタムディレクティブ（独自のDOM操作機能を作る）  

これらの機能は、より複雑で実践的なWebアプリケーション作りに役立ちます。  
Vue.jsの基礎が固まったら、少しずつ広げていくのがおすすめです。

---

引き続き楽しくVue.jsを学んでいきましょう！