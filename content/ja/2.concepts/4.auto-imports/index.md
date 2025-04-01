---
ogImage: true
---

# 自動インポート

自動インポートも Nuxt のコアコンセプトの 1 つです。

https://nuxt.com/docs/guide/concepts/auto-imports

自動インポートは明示的にインポートすることなく、コンポーネント、コンポーザブル、および [Vue.js の API](https://vuejs.org/api/) をアプリケーション全体で使用できるように自動的にインポートする機能です。\
従来のグローバル宣言とは異なり、Nuxt は型情報や IDE の補完、ヒントを保持し、本番コードで使用されているもののみを含めます。

Nuxt のディレクトリ構造の規約おかげで、 `components/`、`composables/`、および `utils/` を自動的にインポートすることができます。\
この例では、`components` ディレクトリに定義された Counter.vue コンポーネントと、`composables` ディレクトリに定義された `useCounter.ts` を明示的なインポートなしで使用しています。\
`app.vue` では Counter コンポーネントを使用し、`Counter.vue` では `useCounter()` を使用しています。

また、Nuxt はいくつかのコンポーネントやコンポーザブル、ユーティリティも提供しています。
[ルーティング](/concepts/routing) のセクションで登場した `NuxtLink` コンポーネントがその一例です。\
他にも、データフェッチで利用する `useFetch()` コンポーザブルやランタイムの設定にアクセスする `useRuntimeConfig()` コンポーザブル、ページナビゲーションのための `navigateTo()` ユーティリティ関数などがあります。\
たくさんあるので、そのほかのものは Nuxt 公式ドキュメントの [Components](https://nuxt.com/docs/api/components)、[Composables](https://nuxt.com/docs/api/composables)、[Utils](https://nuxt.com/docs/api/utils) のセクションを参照してください。

また、Nuxt では明示的なインポートもサポートしており、この場合は `#import` からインポートすることが可能です。

```ts
import { computed, ref } from '#imports'

const count = ref(1)
const double = computed(() => count.value * 2)
```

自動インポート機能は `nuxt.config.ts` でオプトアウトすることも可能です。\
この場合は上記の明示的なインポートが必要になります。

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  imports: {
    autoImport: false
  }
})
```

## チャレンジ

実際に utils/double.ts ファイルに対して、自動インポート可能な関数を実装してみましょう。

関数は任意のもので構いませんが、例として「与えられた数値を二倍にして返す `double()` 関数」を実装してみましょう。\
関数が実装できたら、`app.vue` 内の template で使用して、2 倍された数値を画面に表示してみましょう。

:ButtonShowSolution{.bg-faded.px4.py2.rounded.border.border-base.hover:bg-active.hover:text-primary.hover:border-primary:50}
