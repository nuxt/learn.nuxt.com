<script setup lang="ts">
const { data: todos, refresh } = useFetch('/api/todos')
</script>

<template>
  <button type="button" @click="refresh()">
    Refresh
  </button>

  <ul>
    <li v-for="todo in todos" :key="todo.id">
      {{ todo.title }}
    </li>
  </ul>
</template>
