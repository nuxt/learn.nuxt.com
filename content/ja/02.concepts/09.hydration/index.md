---
ogImage: true
---

# ハイドレーション

Nuxtのデフォルトはユニバーサルレンダリング（SSR）です。\
これは、コンポーネントが2回実行されることを意味します。

1. **サーバーサイド**: HTMLを生成
2. **クライアントサイド**: HTMLにJavaScriptの機能を付加（ハイドレーション）

この「2回実行される」という特性を理解しておくことが、Nuxtアプリケーション開発では非常に重要です。

## ハイドレーションとは

ハイドレーションとは、サーバー側で生成された静的なHTMLに、クライアント側でVueのリアクティビティシステムやイベントリスナーを付与するプロセスです。

プロセスは以下のステップで進行します：

### ステップ1（サーバー）

- Vueコンポーネントが実行される
- HTMLが生成される: `<p>Count: 0</p><button>Increment</button>`
- このHTMLがブラウザに送信される

### ステップ2（クライアント）

- ブラウザがHTMLを表示（この時点ではただのHTML、ボタンは動かない）
- JavaScriptがロードされる
- Vueが再度実行される
- 既存のHTMLにイベントリスナーなどを「ハイドレート（付加）」する
- ボタンがクリック可能になる

## ハイドレーションエラーを体験する

右のプレビューを見てください。ブラウザの開発者ツール（F12キー）を開いて、**Console**タブを確認しましょう。

**警告が表示されているはずです**：

```
Hydration completed but contains mismatches.
```

これが「ハイドレーションミスマッチ」エラーです。なぜこのエラーが発生しているのでしょうか？

`app.vue` のコードを見てみましょう：

```vue
<script setup>
const timestamp = Date.now() // ❌ これが問題！

console.log('timestamp:', timestamp)
</script>

<template>
  <div>
    <p>Timestamp: {{ timestamp }}</p>
  </div>
</template>
```

### 何が問題なのか？

1. **サーバーサイド**（下のTerminalタブを確認）:

   - `Date.now()`が実行され、その時点のタイムスタンプが生成される
   - 例: `timestamp: 1729641234567`

2. **クライアントサイド**（ブラウザのConsoleタブ）:
   - 数ミリ秒後に`Date.now()`が再度実行される
   - 例: `timestamp: 1729641234892`

サーバーとクライアントで**実行時刻が異なる**ため、**異なる値**になり、ハイドレーションミスマッチが発生します。

### なぜ深刻なのか？

ハイドレーションエラーは単なる警告ではありません：

- ⚠️ パフォーマンス低下（コンポーネント全体を再レンダリング）
- ⚠️ ボタンなどのイベントリスナーが動作しない可能性
- ⚠️ 予期しない表示の崩れ

これを修正する方法を次のチャレンジで学びましょう。

## ハイドレーションミスマッチ

サーバーで生成したHTMLとクライアントで生成したHTMLが異なる場合、「ハイドレーションミスマッチ」エラーが発生します。

ハイドレーションミスマッチは単なる警告ではありません。以下のような深刻な問題を引き起こします：

- **パフォーマンス**: インタラクティブになるまでの時間が増加
- **ユーザー体験**: コンテンツのちらつき
- **機能**: イベントリスナーが正しく動作しない
- **SEO**: 検索エンジンとユーザーが異なるコンテンツを見る可能性

### よくあるミスマッチの原因

#### 1. ブラウザ専用APIの使用

❌ **悪い例**:

```vue
<script setup>
// サーバーにはwindowが存在しない！
const width = window.innerWidth
</script>

<template>
  <p>Width: {{ width }}</p>
</template>
```

✅ **良い例**:

```vue
<script setup>
const width = ref(0)

onMounted(() => {
  // onMountedはクライアントでのみ実行される
  width.value = window.innerWidth
})
</script>

<template>
  <p>Width: {{ width }}</p>
</template>
```

#### 2. 時刻ベースのコンテンツ

❌ **悪い例**:

```vue
<script setup>
// サーバーとクライアントで実行時刻が異なる
const now = new Date().toISOString()
</script>

<template>
  <p>{{ now }}</p>
</template>
```

✅ **良い例**:

```vue
<script setup>
// useStateでサーバーの値をクライアントに転送
const now = useState('timestamp', () => new Date().toISOString())
</script>

<template>
  <p>{{ now }}</p>
</template>
```

#### 3. ランダム値の使用

❌ **悪い例**:

```vue
<script setup>
// サーバーとクライアントで異なる値になる
const id = Math.random()
</script>
```

✅ **良い例**:

```vue
<script setup>
// useStateで一貫性を保つ
const id = useState('random-id', () => Math.random())
</script>
```

## SSR時のライフサイクル

`<script setup>` 内のコードは**サーバーでもクライアントでも実行**されますが、\
その中の**ライフサイクルフックによって実行タイミングが異なります**。

### SSR（サーバーサイド）で実行されるもの

- `<script setup>` のトップレベルコード（`ref()` や `reactive()` など）
- `useAsyncData()` / `useFetch()`
- `onServerPrefetch()` などのサーバー専用フック

### CSR（クライアントサイド）でのみ実行されるもの

- `onBeforeMount()` / `onMounted()`
- `onBeforeUpdate()` / `onUpdated()`
- `onBeforeUnmount()` / `onUnmounted()`

```typescript
// ⭕ サーバーでもクライアントでも実行される
const count = ref(0)

// ⭕ サーバーでのみ実行される
onServerPrefetch(async () => {
  // サーバーサイドでのデータ取得
})

// ❌ サーバーでは実行されない（クライアントのみ）
onMounted(() => {
  console.log('mounted')
})
```

つまり、**ブラウザ専用のAPI（window, document, localStorageなど）は、クライアントサイドでのみ実行されることを保証する必要があります**。

代表的な方法：

- `onMounted()` 内で使用する
- `<ClientOnly>` コンポーネントで囲む
- `import.meta.client` でガードする
- `.client.vue` ファイルを使用する

## ClientOnlyコンポーネント

クライアントサイドでのみレンダリングしたいコンポーネントには、`<ClientOnly>` コンポーネントを使用できます。

```vue
<template>
  <div>
    <p>これはサーバーでもクライアントでも表示される</p>

    <ClientOnly>
      <p>これはクライアントでのみ表示される</p>
      <!-- ここではwindowやdocumentを安全に使える -->
    </ClientOnly>
  </div>
</template>
```

`<ClientOnly>` 内のコンテンツは：

- サーバーサイドレンダリングではスキップされる
- クライアントサイドでのみハイドレートされる
- ハイドレーションミスマッチを防げる

## チャレンジ：ハイドレーションエラーを修正しよう

現在、`app.vue`でハイドレーションエラーが発生しています。\
これを修正するために、**`timestamp`を安全に表示する方法**を実装しましょう！

### 課題

以下の2つのファイルを編集して、ハイドレーションエラーを解決してください：

**1. `components/BrowserOnly.vue`を完成させる**

- TODOコメントを埋めて、`timestamp`を`onMounted`を使って安全に取得・表示
- タイムスタンプを保持する`ref`を用意（初期値は`0`）
- `onMounted`内で`Date.now()`を設定

**2. `app.vue`を修正する**

- 問題のある`timestamp`関連のコード（script部分とtemplate部分）を削除
- TODOコメント部分に`<BrowserOnly />`コンポーネントを追加

### ヒント

- `onMounted`はクライアントサイドでのみ実行される
- 初期値を`0`にすることで、サーバーとクライアントの初期状態を一致させる
- `Date.now()`を`onMounted`内で実行すれば、サーバーでは実行されない

### 完成すると...

✅ ブラウザの開発者ツールのConsoleでハイドレーション警告が消えます\
✅ 緑色の成功メッセージと共に、タイムスタンプが安全に表示されます

もし行き詰まったら、以下のボタンかエディタの右上にあるボタンをクリックして回答を見ることができます。

:ButtonShowSolution{.bg-faded.px4.py2.mb3.rounded.border.border-base.hover:bg-active.hover:text-primary.hover:border-primary:50}

## まとめ

ハイドレーションで重要なポイント：

1. **コンポーネントは2回実行される**（サーバー + クライアント）
2. **ライフサイクルフックはクライアントのみ**（`onMounted` など）
3. **ブラウザAPIは `onMounted` 内で使用**
4. **サーバーとクライアントで同じ値を保つ**（useState使用）
5. **`<ClientOnly>` でクライアント専用コンテンツを分離**
