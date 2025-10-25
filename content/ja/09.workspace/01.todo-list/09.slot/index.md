---
ogImage: true
---

# スロット

[スロット](https://ja.vuejs.org/guide/components/slots.html#slot-content-and-outlet) は、親コンポーネントから子コンポーネントの特定の場所にテンプレートを差し込むための仕組みです。
コンポーネントを「箱」として使い、その中に好きなHTMLや部品を入れることができます。

```vue
<!-- AppButton: 子コンポーネント -->
<template>
  <button type="button" class="app-button">
    <slot /> <!-- スロットアウトレット -->
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
    <!-- ↓ スロットコンテンツ -->
    <span>✅</span>
    <span class="padding-start-1">すべて完了にする</span>
    <!-- ↑ スロットコンテンツ -->
  </AppButton>
</template>
```

`<slot>` 要素は、親が提供した スロットコンテンツ をレンダリングすべき場所を示す スロットアウトレット です。

<svg width="960" height="360" viewBox="0 0 960 360" xmlns="http://www.w3.org/2000/svg" font-family="monospace" style="width: 100%; height: auto">
  <!-- Parent Template Box -->
  <rect x="60" y="60" width="300" height="180" rx="8" ry="8" fill="none" stroke="#9c89ff" stroke-dasharray="4 4" />
  <text x="70" y="50" font-size="16" fill="#9c89ff" font-weight="bold">parent template</text>

<text x="90" y="110" font-size="18" fill="#42b883">&lt;AppButton&gt;</text>
<rect x="120" y="125" width="200" height="40" rx="6" ry="6" fill="#ff6b6b" />
<text x="140" y="150" font-size="18" fill="#fff">✅ すべて完了にする</text>
<text x="90" y="190" font-size="18" fill="#42b883">&lt;/AppButton&gt;</text>

  <!-- Slot content label -->
  <circle cx="160" cy="225" r="8" fill="#ff6b6b" />
  <text x="175" y="230" font-size="16" fill="#ff6b6b">slot content</text>

  <!-- Fancy arrow -->
  <line x1="360" y1="150" x2="580" y2="150" stroke="#ff6b6b" stroke-width="2" marker-end="url(#arrowhead)" />
  <text x="450" y="140" font-size="16" fill="#ff6b6b">replace</text>

  <!-- Arrowhead definition -->
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7"
            refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#ff6b6b" />
    </marker>
  </defs>

  <!-- Child Template Box -->
  <rect x="600" y="60" width="300" height="180" rx="8" ry="8" fill="none" stroke="#9c89ff" stroke-dasharray="4 4" />
  <text x="610" y="50" font-size="16" fill="#9c89ff" font-weight="bold">&lt;AppButton&gt; template</text>

<text x="630" y="110" font-size="18" fill="#42b883">&lt;button&gt;</text>
<rect x="660" y="125" width="120" height="40" rx="6" ry="6" fill="#4c6fff" />
<text x="680" y="150" font-size="18" fill="#fff">&lt;slot/&gt;</text>
<text x="630" y="190" font-size="18" fill="#42b883">&lt;/button&gt;</text>

  <!-- Slot outlet label -->
  <circle cx="710" cy="225" r="8" fill="#4c6fff" />
  <text x="725" y="230" font-size="16" fill="#4c6fff">slot outlet</text>
</svg>

## フォールバックコンテンツ（デフォルト）

親からスロットコンテンツが渡されなかった場合に、フォールバック（つまりデフォルト）を設定することもできます。
やり方は `<slot>` 要素の間に、フォールバックコンテンツを設定します。

```vue
<!-- AppButton: 子コンポーネント -->
<template>
  <button type="button" class="app-button">
    <slot>
      ボタン <!-- フォールバックコンテンツ -->
    </slot>
  </button>
</template>

<style scoped>
/* 省略 */
</style>
```

```vue
<!-- 親コンポーネント -->
<template>
  <AppButton />
</template>
```

この例では、親コンポーネントから、 `slot` を渡していませんが、
フォールバックコンテンツを設定しているので、「ボタン」と表示されます。

---

## 名前付きスロット

`<slot>` に名前を付けると、1つのコンポーネントに複数の差し込み場所（スロットアウトレット）が作れます。

名前付きのスロットコンテンツを渡すためには、 `v-slot` を利用します。（例: `<template v-slot:title>`）

`v-slot` は `#` で省略表記ができます。（例: `<template #title>`）

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
      <slot name="title" /> <!-- titleという名前の スロットアウトレット -->
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
      <!-- v-slot. 上のように # で省略表記ができます -->
      <!-- ↓ titleという名前の スロットコンテンツ -->
      <span>✏️</span>
      <span class="padding-start-1">タスクの編集</span>
      <!-- ↑ titleという名前の スロットコンテンツ -->
    </template>

    <form>
      <div>
        <label for="title">タイトル</label>
        <input id="title" v-model="inputTitle" type="text" required>
      </div>
    </form>
  </AppModal>
</template>
```

名前なし（`name` を持たない）スロットは、暗黙的に `default` という `name` を持つものとされますので、
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
          <input id="title" v-model="inputTitle" type="text" required>
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

- スロットは、コンポーネントの中の特定位置にテンプレートを差し込む機能
- `slot` は、フォールバック（デフォルト）を設定することもできる
- 名前付きスロットを使えば、差し込み場所を増やせる

---

## 現在の実装の課題

- タスクを新規作成するためのフォームが表示されていません。
- `AppModal` コンポーネントのタイトルが「新規作成モーダル」という、固定の名前になっていて、汎用性がない状態になっています。

## チャレンジ

### 1. `AppModal.vue` に `<slot>` を追加

`AppModal.vue` に、

- モーダルのタイトル
- モーダルのコンテンツ

が差し込みできるよう、 `<slot>` を追加してみましょう。

1. `AppModal.vue` の `<h2>新規作成モーダル</h2>` を削除して `<slot name="title" />` を追加しましょう。
2. `AppModal.vue` に、モーダルコンテンツを追加するための `<slot />` を追加しましょう。

### 2. `AppModal` コンポーネントに、モーダルタイトルと新規作成フォームの `v-slot` を追加

1. `app.vue` で `AppModal` コンポーネントに、モーダルタイトルの `v-slot` `<template #title><h2>タスクの新規作成</h2></template>` を追加しましょう。
1. `app.vue` で `AppModal` コンポーネントに、 `v-slot` （名前なし）に、以下のHTMLを追加しましょう。

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

::ButtonShowSolution{.bg-faded.px4.py2.mb3.rounded.border.border-base.hover:bg-active.hover:text-primary.hover:border-primary:50}

これで、コンポーネントの任意の箇所に、HTMLやコンポーネント等を差し込むことができました！
