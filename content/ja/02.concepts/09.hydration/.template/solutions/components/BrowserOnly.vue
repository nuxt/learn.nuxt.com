<script setup lang="ts">
// 初期値は0（サーバーサイドでは値を持たないため）
const timestamp = ref(0)

// クライアントサイドでのみ実行される
onMounted(() => {
  timestamp.value = Date.now()
})
</script>

<template>
  <div class="border border-green-300 rounded bg-green-50 p-4">
    <p class="mb-2 text-green-700 font-bold">
      ✅ ハイドレーションエラーが修正されました！
    </p>
    <p class="text-sm text-green-600">
      Timestamp: {{ timestamp }}
    </p>
  </div>
</template>
