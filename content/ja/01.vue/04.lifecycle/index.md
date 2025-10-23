# ライフサイクルフック

ライフサイクルフックについて学びましょう。

これは、コンポーネントの生成から破棄までの各段階で処理を実行するための、Vueの重要な機能です。

**React経験者の方へ**

ReactのuseEffectに相当する機能ですが、より明確に分かれています：

| React | Vue |
|-------|-----|
| `useEffect(() => {}, [])` | `onMounted(() => {})` |
| `useEffect(() => { return cleanup }, [])` | `onUnmounted(() => {})` |

Vueでは「何をするか」で関数が分かれているため、意図が明確になります。

---

## 主なライフサイクルフック

### 1. onBeforeMount
コンポーネントがDOMにマウントされる**直前**に実行されます。

### 2. onMounted
コンポーネントがDOMにマウントされた**後**に実行されます。

**例：DOM要素へのアクセス**

```vue
<script setup lang="ts">
  const el = ref(null)

  onMounted(() => {
    console.log('マウントされました！')
    console.log(el.value)
  })
</script>

<template>
  <div ref="el">Hello</div>
</template>
```

### 3. onBeforeUnmount
コンポーネントが破棄される**直前**に実行されます。

### 4. onUnmounted
コンポーネントが破棄された**後**に実行されます。

**例：タイマーのクリーンアップ**

```vue
<script setup lang="ts">
  onMounted(() => {
    const timer = setInterval(() => {
      console.log('tick')
    }, 1000)
  })

  onUnmounted(() => {
    clearInterval(timer)
  })
</script>
```

これが、Vueのライフサイクルフックの基本です。

---

## Nuxt (SSR) での注意点

Nuxtでは、コードが**サーバー**と**ブラウザ**の両方で実行されます。
これを「SSR（サーバーサイドレンダリング）」と呼びます。

SSRについては、後ほど「ハイドレーション」のセクションで詳しく説明します。

### 重要なポイント

- `onMounted`と`onUnmounted`は**ブラウザでのみ**実行される
- サーバーでは実行されない

#### 悪い例

```vue
<script setup>
  const width = window.innerWidth
</script>
```

#### 良い例

```vue
<script setup>
  const width = ref(0)

  onMounted(() => {
    width.value = window.innerWidth
  })
</script>
```

---

## チャレンジ

プレイグラウンドには、親コンポーネント（`app.vue`）と子コンポーネント（`Child.vue`）が用意されています。子コンポーネントのライフサイクルフックを実装して、マウント/アンマウントの回数をカウントしてみましょう。

### 親コンポーネント（app.vue）での作業

1. `isVisible` という ref を作成し、初期値を `true` にしましょう。
2. `mountCount` と `unmountCount` という ref を作成し、それぞれ初期値を `0` にしましょう。
3. ボタンをクリックすると `isVisible` の値を反転させる `toggleVisibility` 関数を作りましょう。
4. 子コンポーネントから `mounted` イベントを受け取ったら `mountCount` を1増やす関数を作りましょう。
5. 子コンポーネントから `beforeUnmount` イベントを受け取ったら `unmountCount` を1増やす関数を作りましょう。
6. `v-if="isVisible"` を使って、子コンポーネントの表示/非表示を切り替えられるようにしましょう。
7. template で `mountCount` と `unmountCount` を表示しましょう。

### 子コンポーネント（Child.vue）での作業

1. `emit` を定義しましょう（`mounted` と `beforeUnmount` の2つのイベント）。
2. `onMounted` を追加して、親に `mounted` イベントを送りましょう。
3. `onBeforeUnmount` を追加して、親に `beforeUnmount` イベントを送りましょう。

ボタンをクリックして、子コンポーネントの表示/非表示を切り替えてみてください。マウント回数とアンマウント回数がカウントされることで、ライフサイクルフックの動作を確認できます！

もし手詰まりになったら、解決策を確認するためのボタンをクリックして、ヒントを得ることができます。
:ButtonShowSolution{.bg-faded.px4.py2.rounded.border.border-base.hover:bg-active.hover:text-primary.hover:border-primary:50}