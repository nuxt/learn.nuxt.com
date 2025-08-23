---
ogImage: true
---

# コンポーネント化 パート１


Vue.js のコンポーネントは、UI を小さな再利用可能な部分に分割するための基本的な単位です。\
特に Single File Components (SFC) を使うことで、HTML、CSS、および JavaScript を 1 つの `.vue` ファイルにまとめることができます。


## 基本的な SFC の構造

SFC は基本的に `<script setup>`, `<template>`, `<style>` の 3 つのセクションで構成されます。

- `<script setup>`: コンポーネントのロジック部分を定義します。`<script setup>` を使用することで、Composition API を簡潔に書くことができます。
- `<template>`: コンポーネントのビュー部分を定義します。
- `<style scoped>`: コンポーネント固有のスタイルを定義します。`scoped` 属性を追加することで、このコンポーネントのスタイルが他のコンポーネントに影響を与えないようにします。

## コンポーネントの再利用

`.vue` ファイルで定義した SFC は、以下のように `<script setup>` でインポートすることでテンプレート内で再利用することができます。

```vue
<script setup lang="ts">
import Child from './Child.vue'
</script>

<template>
  <Child />
</template>
```


## 現在の実装の課題

現在、プレイグラウンドのapp.vueに全てのコードがまとまっています。
このままでも問題ありませんが、コンポーネント化することでコードの役割分担が明確になり、保守性や再利用性がに向上します。

## チャレンジ1

`app.vue`にある`<table></tabue>`を`components/TodoList.vue`に切り出してみましょう

1. `app.vue`の`<table></tabue>`を`TodoList.vue`の`<template>`内に移動しましょう
2. `app.vue`の`/* --- table start --- */`から`/* --- table last --- */`までを`TodoList.vue`の`<style scoped>`内に移動しましょう

## コンポーネント間のデータの受け渡し
app.vueがすっきりとしました。

ただこのままでは、TodoList.vue側でapp.vueに定義された値にアクセスすることができません。

Vue コンポーネント間でデータをやり取りする基本的な方法として、`props` と `emit` を使用します。

### Props

親コンポーネントから子コンポーネントにデータを渡すための方法です。

まずは子コンポーネント側で `defineProps` マクロを使用し、受け取りたいデータを定義します。

```vue
<!-- Child.vue -->
<script setup lang="ts">
defineProps<{ message: string }>()
</script>
```

次に親コンポーネント側で、子コンポーネントにデータを渡すために `v-bind` ディレクティブを使用します。\
`:props名="データ"` という形式で、子コンポーネントにデータを渡すことができます。

```vue
<!-- Parent.vue -->
<template>
  <Child :message="message" />
</template>
```

また、props 名とデータの変数名が同名の場合は省略記法を使うことができます。

```vue
<!-- Parent.vue -->
<template>
  <Child :message />
</template>
```

### Emit

子コンポーネントから親コンポーネントにイベントを発火するための方法です。

まずは子コンポーネント側で `defineEmits` マクロを使用し、発火したいイベントを定義します。
emit 関数を用いて、イベントを発火することができます。

```vue
<!-- Child.vue -->
<script setup lang="ts">
const emit = defineEmits<{ sendMessage: [] }>()
</script>

<template>
  <button type="button" @click="emit('sendMessage')">
    Click me
  </button>
</template>
```

発火されたイベントは親コンポーネント側で `v-on` ディレクティブを使用して受け取ることができます。

```vue
<!-- Parent.vue -->
<script setup lang="ts">
function handleSendMessage() {
  console.log('Message sent!')
}
</script>

<template>
  <Child @send-message="handleSendMessage" />
</template>
```

以下のように、イベント発火時に子コンポーネントからデータを受け渡すこともできます。

```vue
<!-- Child.vue -->
<script setup lang="ts">
const emit = defineEmits<{ sendMessage: [string] }>()
</script>

<template>
  <button type="button" @click="emit('sendMessage', 'Hello, Vue!')">
    Click me
  </button>
</template>
```

```vue
<!-- Parent.vue -->
<script setup lang="ts">
function handleSendMessage(message: string) {
  console.log(message) // Hello, Vue!
}
</script>

<template>
  <Child @send-message="handleSendMessage" />
</template>
```

それぞれの詳しい [API ドキュメント](https://ja.vuejs.org/api/sfc-script-setup.html#defineprops-defineemits)から確認することができます。

## 現在の実装の課題

app.vueに定義されたtodosにTodoList.vueからアクセスすることができていません。
`props` と `emit` を使用して、コンポーネント間でデータをやり取りできるようにしましょう。

## チャレンジ2

`props` と `emit` を使用して親子間でデータのやり取りをできるようにしましょう：

2. `TodoList.vue`で`defineProps`を使用して親から`todos`を受け取れるようにしましょう
3. `app.vue`に`<TodoList />`を配置して、todosを渡してみましょう。
4. `TodoList.vue`で`defineEmits`を使用してアイコンのクリックイベントを親に伝えられるようにしましょう
5. `app.vue`で`TodoList.vue`から受け取ったイベントを利用して`updateDone`を実行しましょう

参考実装：
```vue
<script setup lang="ts">
/**
 * Props
 */
defineProps<{
  todos: Todo[]
}>()

/*
 * Emit
 */
const emit = defineEmits<{
  'update-done': [number, boolean]
}>()
</script>
```


## 実装後の効果

コンポーネント化すると：
- 関心ごと（表示とロジック）が分割され、コードの見通しが良くなる
- 複数のコンポーネントで同じUIパーツを再利用できるようになる
- 親子間のデータ受け渡し（props・emit）を通じて状態管理が整理され、チーム開発や拡張がしやすくなる

もし行き詰まったら、以下のボタンをクリックして解答を見ることができます。

:ButtonShowSolution

コンポーネント化され、メンテナンスしやすいスッキリした構造になりました！
