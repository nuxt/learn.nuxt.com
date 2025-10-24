<script setup lang="ts">
const timestamp = Date.now() // ❌ これが問題！サーバーとクライアントで異なる値になる

console.log('timestamp:', timestamp)
</script>

<template>
  <div>
    <h1>
      ハイドレーションの確認
    </h1>

    <div>
      <p>
        ⚠️ ハイドレーションエラーが発生しています
      </p>
      <p>
        ブラウザの開発者ツール（F12）→ Consoleタブで警告を確認してください
      </p>
    </div>

    <div>
      <p>
        現在のタイムスタンプ
      </p>
      <p>
        Timestamp: {{ timestamp }}
      </p>
    </div>

    <!-- TODO: 上記のtimestamp表示を削除して、BrowserOnlyコンポーネントを使って安全に表示してください -->
  </div>
</template>
