---
ogImage: true
---

# コンポーネントの v-model

[フォーム入力バインディング](v-model)で紹介したように、 `v-model` はフォーム入力欄とVueのデータを自動で同期してくれる仕組みです。
この `v-model` は、コンポーネントでも同じように使うことができます。

```vue
<script setup lang="ts">
const showUnDoneOnly = ref(true)
</script>

<template>
  <IncompleteOnlyToggle v-model="showUnDoneOnly" />
</template>
```

### どうやってつながっているの？

値が同期する仕組みは、[フォーム入力バインディング](v-model)で説明したとおり、
「バインド」と「イベント監視」を組み合わせた“糖衣構文”になっています。

上記のコードの例で `v-model` を利用せずに、親子で値を同期するには、以下のコードとなります。

```vue
<!-- 親コンポーネント -->
<script setup lang="ts">
const showUnDoneOnly = ref(true)
</script>

<template>
  <IncompleteOnlyToggle
    :model-value="showUnDoneOnly"
    @update:model-value="showUnDoneOnly = $event"
  />
</template>
```

::note
[`$event`](https://ja.vuejs.org/guide/essentials/event-handling.html#accessing-event-argument-in-inline-handlers) は、「その場で起きたイベントそのもの」を受け取るためのプレースホルダーです。
上記コードの `v-on` は、 `@update:model-value="(event) => showUnDoneOnly = event"` と置き換えることができます。
::

```vue
<!-- IncompleteOnlyToggle: 子コンポーネント -->
<script setup lang="ts">
// Props
defineProps<{
  modelValue: boolean
}>()
// Emit
const emit = defineEmits<{
  'update:modelValue': [boolean]
}>()
</script>

<template>
  <label>
    <input
      :checked="modelValue"
      type="checkbox"
      @change="(event) => emit('update:modelValue', event.target.checked)"
    >
    未完了のみ表示
  </label>
</template>
```

- 親から `props` `modelValue` で、値を受け取り、
- 子は `emit` で `update:modelValue` で、更新後の値を送信し、
- 親が、 `v-on` `update:modelValue` で、子が送信した値を受け取り、状態を更新

をすることで、親子の値の同期ができますが、これらをシンプルにしたのが `v-model` です。

コンポーネントで `v-model` を利用する場合、子コンポーネントでは、

- `props` に `modelValue` を定義
- `emit` に `update:modelValue` を定義

する必要があります。

## `defineModel()`

Vue 3.4以降では [`defineModel()`](https://ja.vuejs.org/api/sfc-script-setup.html#definemodel) マクロにより、親子間の値同期がさらにシンプルに書けます。

子コンポーネント側で `modelValue` を変更するだけで値の更新ができます（内部的には従来と同じprops/emitが自動的に使われています）。
なお、内部的には `modelValue` という名前が使われていますが、変数名は子側で自由に変更できます。

```vue
<!-- IncompleteOnlyToggle: 子コンポーネント -->
<script setup lang="ts">
const checked = defineModel()
</script>

<template>
  <label>
    <input
      v-model="checked"
      type="checkbox"
    >
    <!--
    上記の input は、以下の置き換えです
    <input
      :checked="checked"
      type="checkbox"
      @change="(event) => checked = event.target.checked"
    >
    -->
    未完了のみ表示
  </label>
</template>
```

上記コードは、 `v-model` の `defineModel()` 値を、変数 `checked` に代入しています。
変数 `checked` は、任意の変数名に変更できます。

**ポイント**

- `props`や`emit`を書かなくてもOK
- 親と子の値がリアルタイムでつながる

---

## 複数の v-model / 名前付き v-model

`v-model` は、ひとつの値だけでなく、**名前を付けて複数の値を同時に**親子でやりとりすることもできます。
複雑なフォームの時にとても便利です。

```vue
<!-- 親コンポーネント -->
<script setup lang="ts">
const showUnDone = ref(true)
const isExpired = ref(true)
</script>

<template>
  <TaskFilter
    v-model:is-show-un-done="showUnDone"
    v-model:is-show-expired="isExpired"
  />
</template>
```

```vue
<!-- TaskFilter: 子コンポーネント -->
<script setup>
const unDone = defineModel('isShowUnDone')
const expired = defineModel('isShowExpired')
</script>

<template>
  <label>
    <input v-model="unDone" type="checkbox">
    未完了を表示
  </label>
  <label>
    <input v-model="expired" type="checkbox">
    期限切れを表示
  </label>
</template>
```

Vue3.4未満の場合、props/emitで置き換える必要がありますが、
その場合は、以下のようなコードになります。

```vue
<!-- TaskFilter: 子コンポーネント -->
<script setup>
// Props
defineProps<{
  isShowUnDone: boolean
  isShowExpired: boolean
}>()
// Emit
const emit = defineEmits<{
  'update:isShowUnDone': [boolean]
  'update:isShowExpired': [boolean]
}>()
</script>

<template>
  <label>
    <input
      :checked="isShowUnDone"
      type="checkbox"
      @change="(event) => emit('update:isShowUnDone', event.target.checked)"
    >
    未完了を表示
  </label>
  <label>
    <input
      :checked="isShowExpired"
      type="checkbox"
      @change="(event) => emit('update:isShowExpired', event.target.checked)"
    >
    期限切れを表示
  </label>
</template>
```

**ポイント**

- 親は `v-model:子のprops名` で、いくつでも値の同期対象を指定できる
- 子は `defineModel('props名')` で対応できる

---

## まとめ

- `v-model` は、コンポーネントでも利用できる
- `v-model` は **propsで値を渡し、emitで変更を返す** 仕組みをまとめた構文
- Vue 3.4以降は `defineModel()`で記述がさらに簡単
- 複数の値や名前付きも、同じ構文でシンプルに扱える

## 現在の実装の課題

TODOリストに、新規タスクを追加するために、

- モーダルコンポーネント（AppModal.vue）
- 新規作成ボタン

の2つを用意しました。

新規作成ボタンをクリックで、モーダルを開くことができますが、
モーダル内の「閉じる」ボタンをクリックしても、モーダルを閉じることができません。

## チャレンジ

モーダル内の「閉じる」ボタンをクリックしたら、モーダルを閉じるように修正しましょう。

`app.vue` の `isCreateModalOpen` の状態が、モーダルの表示を制御していますので、
`isCreateModalOpen` を `v-model` で同期させることがゴールです。

1. `AppModal.vue`（子コンポーネント）に `defineModel()` で `modelValue` を定義しましょう。
   `defineModel()` 返り値は、変数 `isOpen` に格納します。
2. `AppModal.vue` の「閉じる」ボタンをクリックしたら、`isOpen` （`modelValue`）の値を `false` にしましょう。
3. `app.vue`（親コンポーネント）で `AppModal` コンポーネントへ `v-model` で `isCreateModalOpen` を渡しましょう。

もし行き詰まったら、以下のボタンをクリックして解答を見ることができます。

:ButtonShowSolution{.bg-faded.px4.py2.mb3.rounded.border.border-base.hover:bg-active.hover:text-primary.hover:border-primary:50}

親・子コンポーネント間で `isCreateModalOpen` を双方向に同期できるようになりました！
