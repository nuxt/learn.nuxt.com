---
ogImage: true
---

# 状態管理

Vue.js での状態管理 (State Management) とは、アプリケーションでリアクティブな状態 (ステート) を管理することを言います。\
[Vue.js 公式ドキュメント 状態管理](https://ja.vuejs.org/guide/scaling-up/state-management)

複数のコンポーネント間で状態を共有する際、Vue.js ではリアクティビティー API を用いたシンプルな状態管理を行うことができます。\
[Vue.js 公式ドキュメント リアクティビティー API によるシンプルな状態の管理](https://ja.vuejs.org/guide/scaling-up/state-management#simple-state-management-with-reactivity-api)

しかし、[SSR の考慮](https://ja.vuejs.org/guide/scaling-up/state-management#ssr-considerations) にも書かれているように、Nuxt で SSR を行っている場合には [いくつかの問題](https://ja.vuejs.org/guide/scaling-up/ssr#cross-request-state-pollution) が起こる可能性があります。

Vue.js の公式ドキュメントでは [Pinia](https://pinia.vuejs.org/) と言う状態管理ライブラリを使う方法が紹介されていますが、Nuxt が提供する `useState()` コンポーザブルもその解決策の 1 つです。\
(もちろん、[Nuxt で Pinia を使用する](https://nuxt.com/docs/getting-started/state-management#usage-with-pinia) ことも可能です)

## useState()

[useState() コンポーザブル](https://nuxt.com/docs/api/composables/use-state) は SSR フレンドリーな状態管理と、コンポーネント間で状態を共有するためのシンプルな方法を提供します。\
`useState()` は共有状態を定義するための SSR フレンドリーな `ref()` です。\
前述の通り、Vue.js のリアクティビティー API (e.g. `ref()`) を用いてコンポーネントを跨いだ状態管理を SSR で行う場合、いくつかの問題が発生する可能性があります。\
そのため、Nuxt では `<script setup>` や `setup()` 関数の **外** では、`ref()` での状態を定義せず、代わりに `useState()` を使用することがベストプラクティスとされています。

このプレイグラウンドの例では、`"count"` をキーに `CounterA` コンポーネントと `CounterB` コンポーネントで状態を共有しています。\
`CounterA` によってレンダリングされたボタンをクリックしたときに、`CounterB` のステートも更新されることに注目してみてください。

より詳細な説明は、[Nuxt 公式ドキュメント 状態管理](https://nuxt.com/docs/getting-started/state-management) を参照してください。

:::note
`useState()` のデータは JSON にシリアライズされるため、クラス、関数、シンボルなど、シリアライズできないものを含まないことに注意が必要です。
:::
