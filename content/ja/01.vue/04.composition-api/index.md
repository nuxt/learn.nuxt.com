# コンポーザブルとは何か ?

[コンポーザブル](https://ja.vuejs.org/guide/reusability/composables.html) とは、Vue の Composition API を活用して再利用可能な状態やロジックを定義するための機能です。Options API で主流な [mixins](https://ja.vuejs.org/api/options-composition.html#mixins) と類似したコンセプトですが、より柔軟で再利用性の高い機能を提供します。Composition API の詳しい説明は [こちら](https://ja.vuejs.org/guide/extras/composition-api-faq.html) をご参照ください。

コンポーザブルの主な特徴は以下の通りです。

- **再利用可能なロジック**: コンポーザブルを使用すると、コンポーネント間で共有したいロジックや状態をモジュールとして定義し、それを簡単にインポートして使用できます。
- **関数として定義**: コンポーザブルは通常、関数として定義され、必要な状態やメソッドを返します。この関数は Vue の Composition API を使用して内部で状態管理や副作用を処理します。
- **明示的な依存関係**: コンポーザブルを使うことで、依存関係が明示的になり、どのロジックや状態がどのコンポーネントで使用されているかが明確になります。

Nuxt では、`composables/` ディレクトリにコンポーザブルなロジックを格納することが多く、[自動インポート](https://nuxt.com/docs/examples/features/auto-imports) の対象になります。

## チャレンジ

それでは、これらの特徴を踏まえて以下のステップでロジックをコンポーザブルとして切り出し、再利用してみましょう。

1. 既存の vue ファイル（`app.vue`）の確認してください。
2. カウンターロジックを `composables/useCounter.ts` に切り出してください。
3. `app.vue` に 2 で切り出したロジックを適用してください。

## ヒント

- Composable は関数として定義され、必要な状態やメソッドを返します。
- `composables/` ディレクトリに作成したロジックは自動インポートが適用されます。

:ButtonShowSolution{.bg-faded.px4.py2.rounded.border.border-base.hover:bg-active.hover:text-primary.hover:border-primary:50}
