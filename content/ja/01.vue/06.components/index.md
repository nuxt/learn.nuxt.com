---
ogImage: true
---

# コンポーネント

Vue.js のコンポーネントは、UI を小さな再利用可能な部分に分割するための基本的な単位です。\
特に Single File Components (SFC) を使うことで、HTML、CSS、および JavaScript を 1 つの `.vue` ファイルにまとめることができます。

## 基本的な SFC の構造

SFC は基本的に以下のような `<script setup>`, `<template>`, `<style>` の 3 つのセクションで構成されます。

```vue
<script setup lang="ts">
import { ref } from 'vue'

const message = ref('Hello, Vue!')

function sendMessage() {
  console.log(message.value)
}
</script>

<template>
  <p>{{ message }}</p>
  <button type="button" @click="sendMessage">
    Click me
  </button>
</template>

<style scoped>
p {
  color: red;
}
</style>
```

この例では、`<script setup>`, `<template>`, `<style>` の 3 つのセクションが使われています。

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

## コンポーネント間のデータの受け渡し

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
  console.log(message)
}
</script>

<template>
  <Child @send-message="handleSendMessage" />
</template>
```

それぞれの詳しい [API ドキュメント](https://ja.vuejs.org/api/sfc-script-setup.html#defineprops-defineemits)から確認することができます。

## チャレンジ

右のプレイグラウンドでは、props と emit を使ってコンポーネント間のデータの受け渡しを行っています。\
Vue.js では [スロット](https://ja.vuejs.org/guide/components/slots.html) という機能を利用することで、親コンポーネントからコンポーネントにテンプレートを挿入することができます。\
右のプレイグラウンドを編集して、スロットを使ったテンプレートの挿入を行ってみましょう。

1. 子コンポーネント (`Child.vue`) でスロットの定義を行う\
    [defineSlot マクロ](https://ja.vuejs.org/api/sfc-script-setup.html#defineslots) を使うことにより、型安全なスロットを定義することができます。\
   定義ができたら、template 内で `slot` タグを配置することで渡されたテンプレートの挿入を行うことができます。

   ```vue
   <script setup lang="ts">
   defineSlots<{ paragraph: () => any }>()
   </script>

   <template>
     <h2>Child Component</h2>
     <p><slot name="paragraph" /></p>
   </template>
   ```

2. 親コンポーネント (`app.vue`) で slot にテンプレートを挿入する\
    親コンポーネント側で、子コンポーネントにテンプレートを挿入するために `v-slot` ディレクティブを使用します。\
    (ここでは `v-slot` の省略記法の `#` を使用しています)

   ```vue
   <template>
     <Child>
       <template #paragraph>
         Hello from <span class="red--text">Parent!</span>
       </template>
     </Child>
   </template>
   ```

   :ButtonShowSolution{.bg-faded.px4.py2.rounded.border.border-base.hover:bg-active.hover:text-primary.hover:border-primary:50}
