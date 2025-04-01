<script setup lang="ts">
const id = ref(1)

const loading = ref(false)

const data = ref<{
  userId: number
  id: number
  title: string
  completed: boolean
} | null>(null)

function increment() {
  id.value++
}

async function fetchTodo() {
  loading.value = true
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id.value}`)
    data.value = await res.json()
  }
  finally {
    loading.value = false
  }
}

watch(id, fetchTodo, { immediate: true })
</script>

<template>
  <div>
    <p>ID: {{ id }}</p>
    <button type="button" :disabled="loading" @click="increment">
      次の TODO アイテムを取得
    </button>
    <p v-if="loading">
      Loading...
    </p>
    <pre v-else>{{ data }}</pre>
  </div>
</template>
