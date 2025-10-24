<script setup lang="ts">
// 初期値は0（サーバーサイドでは値を持たないため）
const timestamp = ref(0)

// クライアントサイドでのみ実行される
onMounted(() => {
  timestamp.value = Date.now()
})
</script>

<template>
  <div>
    <p>
      ✅ ハイドレーションエラーが修正されました！
    </p>
    <p>
      Timestamp: {{ timestamp }}
    </p>
  </div>
</template>
