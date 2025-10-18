# 独自コンポーネントでの v-slot

[`v-slot`](https://ja.vuejs.org/guide/components/slots.html#slot-content-and-outlet) は、親コンポーネントから子コンポーネントの特定の場所にテンプレートを差し込むための仕組みです。
コンポーネントを「箱」として使い、その中に好きなHTMLや部品を入れることができます。

```vue
<!-- AppButton: 子コンポーネント -->
<template>
  <button type="button" class="app-button">
    <slot />
  </button>
</template>

<style scoped>
.app-button {
  padding: 0.375rem 1rem;
  border-radius: 0.375rem;
  border: none;
  font-size: 0.875rem;
  background-color: #02c169;
  color: #fff;
}
</style>
```

```vue
<!-- 親コンポーネント -->
<template>
  <AppButton>
    <span>✅</span>
    <span class="padding-start-1">すべて完了にする</span>
  </AppButton>
</template>
```

親から `slot` コンテンツが渡されなかった場合に利用する、フォールバック（つまりデフォルト）を設定することもできます。  
やり方は、 `slot` タグの間にフォールバックコンテンツを設定します。

```vue
<!-- AppButton: 子コンポーネント -->
<template>
  <button type="button" class="app-button">
    <slot>
      ボタン <!-- フォールバックコンテンツ -->
    </slot>
  </button>
</template>

<style scoped>/* 省略 */</style>
```

```vue
<!-- 親コンポーネント -->
<template>
  <AppButton />
</template>
```

この例では、親コンポーネントから、 `slot` コンテンツを渡していませんが、
フォールバックコンテンツを設定しているので、「ボタン」と表示されます。

---

## 名前付きスロット

スロットに名前を付けると、1つのコンポーネントに複数の差し込み場所が作れます。

```vue
<!-- AppModal: 子コンポーネント -->
<template>
  <div
    role="dialog"
    aria-labelledby="dialogTitle"
    aria-describedby="dialogDesc"
    class="modal"
  >
    <h2 id="dialogTitle">
      <slot name="title" />
    </h2>
    <div id="dialogDesc">
      <slot />
    </div>
  </div>
</template>
```

```vue
<!-- 親コンポーネント -->
<template>
  <AppModal>
    <template #title>
      <span>✏️</span>
      <span class="padding-start-1">タスクの編集</span>
    </template>

    <form>
      <div>
        <label for="title">タイトル</label>
        <input id="title" v-model="inputTitile" type="text" required>
      </div>
    </form>
  </AppModal>
</template>
```

名前なし（ `name` を持たない）スロットは、暗黙的に `default` という `name` を持つものとされますので、
以下のようにも記述できます。


```vue
<!-- 親コンポーネント -->
<template>
  <AppModal>
    <template #title>
      <span>✏️</span>
      <span class="padding-start-1">タスクの編集</span>
    </template>

    <template #default>
      <form>
        <div>
          <label for="title">タイトル</label>
          <input id="title" v-model="inputTitile" type="text" required>
        </div>
      </form>
    </template>
  </AppModal>
</template>
```

**ポイント**

- `<slot name="xxx" />` に対して `<template #xxx>` で中身を渡す
- 名前なしスロット（デフォルト）と混ぜて使える

---

## まとめ

- `v-slot` は、コンポーネントの中の特定位置にテンプレートを差し込む機能
- `slot` は、フォールバック（デフォルト）を設定することもできる
- 名前付きスロットを使えば、差し込み場所を増やせる

---

## 現在の実装の課題

- 汎用的なモーダルであるにも関わらず、タイトルが「新規作成モーダル」という、固定の名前になっています。
- タスクを新規作成するためのフォームが表示されていません。


## チャレンジ

### 1. AppModal.vue に slot を追加

`AppModal.vue` に、
- モーダルのタイトル
- モーダルのコンテンツ

が差し込みできるよう、 `slot` を追加してみましょう。

1. `AppModal.vue` の `<h2>新規作成モーダル</h2>` を削除して `<slot name="title" />` を追加
2. `AppModal.vue` に、モーダルコンテンツを追加するための `<slot />` を追加

### 1. モーダルに、モーダルタイトルと新規作成フォームを表示

1. `app.vue` 側で `AppModal.vue` に表示する、モーダルタイトル `<h2>タスクの新規作成</h2>`を追加
1. `app.vue` 側で `AppModal.vue` に表示する、以下のHTMLを追加

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
    <button type="submit">登録</button>
  </div>
</form>
```

もし行き詰まったら、以下のボタンをクリックして解答を見ることができます。

:ButtonShowSolution

これで、コンポーネントの任意の箇所に、HTMLやコンポーネント等を差し込むことができました！
