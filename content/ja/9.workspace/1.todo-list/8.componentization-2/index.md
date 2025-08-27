# 独自コンポーネントでの v-model

[コンポーネント化 パート１](componentization-1)で紹介したように、`v-model`はフォーム入力欄とVueのデータを自動で同期してくれる仕組みです。  
この`v-model`は、独自のコンポーネントでも同じように使うことができます。

```vue
<!-- 親コンポーネント -->
<script setup>
  const count = ref(10)
</script>

<template>
  <ClearButton v-model="count" />
</template>
```

### どうやってつながっているの？

`v-model`は、親と子の間で「親から子へ値を渡し、子で変更があれば親に返す」というやり取りをできるようにしてくれる仕組みです。  
具体的には次の動きができるようになります。

- 親から子へ、変更可能な値を`props`で渡します（`props`名は自動的に`modelValue`になります）
- 子で値を変更するために、emit を使って親に通知します（イベント名は自動で`update:modelValue`になります）

こうすることで、親と子のデータが常に同期されるようになります。

---

この仕組みを子コンポーネントで使うときは、`props`と`emits`を明示的に定義します。

```vue
<script setup>
const props = defineProps(['modelValue']) // 親から値を受け取る
const emit = defineEmits(['update:modelValue']) // 変更を親に通知する
</script>

<template>
  <button @click="emit('update:modelValue', 0)">カウントリセット</button>
</template>
```

---

## Vue 3.4以降の新しい書き方：`defineModel()`

上の方法では、親子間で値を自動的に同期できますが、子コンポーネントの記述が少し複雑です。

Vue 3.4以降では、defineModel()マクロを使うことで、子コンポーネント側でmodelValueを変更するだけで済みます（内部的には従来と同じprops/emitが自動的に使われています）
なお、内部的には`modelValue`という名前が使われていますが、変数名は子側で自由に変更できます。

```vue
<!-- 親コンポーネント -->
<script setup>
  const count = ref(0)
</script>

<template>
  <ClearButton v-model="count" />
</template>
```

```vue
<!-- 子コンポーネント -->
<script setup>
  const count = defineModel()
</script>

<template>
  <button @click="count = 0">カウントリセット</button>
</template>
```

**ポイント**
- `props`や`emit`を書かなくてもOK
- 親と子の値がリアルタイムでつながる

---


## 複数の v-model（名前付き v-model）

`v-model`は、ひとつの値だけでなく、**名前を付けて複数の値を同時に**親子でやりとりすることもできます。
複雑なフォームの時にとても便利です。

```vue
<!-- 親コンポーネント -->
<template>
    <BookEditor
    v-model:title="bookTitle"
    v-model:author="bookAuthor"
    />
</template>
```

```vue
<!-- 子コンポーネント（difneModel使用） -->
<script setup>
  const title = defineModel('title')
  const author = defineModel('author')
</script>

<template>
  <input v-model="title" placeholder="タイトル" />
  <input v-model="author" placeholder="著者" />
</template>
```

```vue
<!-- 子コンポーネント（props, emitをを明示的に定義） -->
<script setup>
const props = defineProps([
    'title',
    'author'
])
const emit = defineEmits([
    'update:title',
    'update:author'
])
</script>

<template>
  <input
    :value="props.title"
    @input="emit('update:title', $event.target.value)"
  />
  <input
    :value="props.author"
    @input="emit('update:author', $event.target.value)"
  />
</template>
```

**ポイント**
- 親は `v-model:名前` でいくつでも決められる
- 子は `defineModel('名前')` で対応できる
- Vue 3.4未満なら、props/emitsを一つずつ定義する必要あり

---

## まとめ

- `v-model`は **propsで値を渡し、emitで変更を返す** 仕組みをまとめた構文  
- Vue 3.4以降は `defineModel()`で記述がさらに簡単
- 複数の値や名前付きも、同じ構文でシンプルに扱える
- 従来のフォーム要素と同じ感覚で、独自コンポーネントでも使える


## チャレンジ

新規 TODO を追加するモーダルコンポーネント（CreateModal.vue）を作成しましょう。
app.vue では isCreateModalOpen という状態を用意していて、「新規作成」ボタンを押すとモーダルが開くようになっています。
ここでは、モーダルの「閉じる」ボタンでモーダルを閉じられるようにするのが目標です。

1. 子コンポーネントで `defineModel()` を使って、`modelValue`（または任意の名前）を定義する
2. `v-if` を使って、その値が `true` のときだけモーダルを表示するようにする
3. モーダルの「閉じる」ボタンをクリックすると、この値が `false` になるようにする  
4. 親コンポーネントから `v-model` で `isCreateModalOpen` を子に渡して動作を確認する


もし行き詰まったら、以下のボタンをクリックして解答を見ることができます。

:ButtonShowSolution

親・子コンポーネント間で isCreateModalOpen を双方向に同期できるようになりました！