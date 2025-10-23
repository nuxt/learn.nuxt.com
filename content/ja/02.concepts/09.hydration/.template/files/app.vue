<script setup lang="ts">
const timestamp = Date.now()  // ❌ これが問題！サーバーとクライアントで異なる値になる

console.log('timestamp:', timestamp)
</script>

<template>
  <div class="p-4">
    <h1 class="mb-4 text-2xl font-bold">
      ハイドレーションの確認
    </h1>

    <div class="mb-4 rounded border border-red-300 bg-red-50 p-4">
      <p class="mb-2 font-bold text-red-700">
        ⚠️ ハイドレーションエラーが発生しています
      </p>
      <p class="text-sm text-red-600">
        ブラウザの開発者ツール（F12）→ Consoleタブで警告を確認してください
      </p>
    </div>

    <div class="mb-4 rounded border border-gray-300 bg-gray-50 p-4">
      <p class="mb-2 font-bold">
        現在のタイムスタンプ
      </p>
      <p class="text-sm text-gray-600">
        Timestamp: {{ timestamp }}
      </p>
    </div>

    <!-- TODO: 上記のtimestamp表示を削除して、BrowserOnlyコンポーネントを使って安全に表示してください -->
  </div>
</template>
