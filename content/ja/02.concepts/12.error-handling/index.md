---
ogImage: true
---

# エラーハンドリング

Nuxt はフルスタックフレームワークのため、クライアントサイドとサーバーサイドの両方で様々なエラーが発生することが予想されます。

適切なエラーハンドリングを実装することで、ユーザーエクスペリエンスを向上させることができます。

## よくあるエラーのパターン

### 1. 404 Not Found エラー

- 存在しないページにアクセスした場合
- 動的ルートで無効なパラメータが渡された場合

### 2. データフェッチエラー

- APIから想定外のレスポンスが返された場合
- ネットワークエラーが発生した場合
- 認証エラーが発生した場合

### 3. サーバーエラー

- サーバー内部でエラーが発生した場合
- データベース接続エラーなど

## エラーハンドリングの方法

### createError 関数の使用

Nuxtでは `createError` 関数を使用してエラーを処理することができます。

```vue
<script setup lang="ts">
const { data } = await $fetch('/api/user/123')

if (!data) {
  throw createError({
    statusCode: 404,
    statusMessage: 'ページが見つかりません'
  })
}
</script>
```

### showError 関数の使用

`showError` 関数を使用してエラーを表示することもできます。

```vue
<script setup lang="ts">
try {
  const data = await $fetch('/api/data')
}
catch (error) {
  showError({
    statusCode: 500,
    statusMessage: 'データの取得に失敗しました'
  })
}
</script>
```

::note
**createError と showError の違い**

- **`createError`**: エラーオブジェクトを作成し、`throw` と組み合わせて使用します。ページの読み込みを完全に停止し、エラーページに遷移します。サーバーサイドとクライアントサイドの両方で動作します。
- **`showError`**: 現在のページの表示を停止してエラーページを表示しますが、`throw` は必要ありません。主にクライアントサイドでの非同期処理中のエラーハンドリングに適しています。

::

### clearError 関数

エラーページから通常のページに戻るには `clearError` 関数を使用します。

```vue
<script setup lang="ts">
const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <button type="button" @click="handleError">
    Clear errors
  </button>
</template>
```

## カスタムエラーページの作成

プロジェクトのルートディレクトリに `error.vue` ファイルを作成することで、カスタムエラーページを実装できます。

```vue
<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError,
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div>
    <h1>{{ error.statusCode }}</h1>
    <p>{{ error.message }}</p>
    <button type="button" @click="handleError">
      Clear errors
    </button>
  </div>
</template>
```

## チャレンジ

1. エラーをthrowする\
   `pages/todo/[id].vue` の script 内に `createError` を使用し、表示するデータが存在しない場合に 404 エラーを `throw` するコードを追加してみましょう。
2. エラーページの動作確認\
   存在しない id を渡した場合、カスタムエラーページに 404 エラーが表示されることを確認してみましょう。

:ButtonShowSolution{.bg-faded.px4.py2.rounded.border.border-base.hover:bg-active.hover:text-primary.hover:border-primary:50}
