<script setup lang="ts">
const state = ref<{
  id: number
  loading: boolean
  data: { userId: number, id: number, title: string, completed: boolean } | null
}>({
  id: 1,
  loading: false,
  data: null,
})

function increment() {
  state.value.id++
}

async function fetchTodo() {
  state.value.loading = true
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${state.value.id}`)
    state.value.data = await res.json()
  }
  finally {
    state.value.loading = false
  }
}

watch(() => state.value.id, fetchTodo, { immediate: true })
</script>

<template>
  <div>
    <p>ID: {{ state.id }}</p>
    <button type="button" :disabled="state.loading" @click="increment">
      次の TODO アイテムを取得
    </button>
    <p v-if="state.loading">
      Loading...
    </p>
    <pre v-else>{{ state.data }}</pre>
  </div>
</template>
