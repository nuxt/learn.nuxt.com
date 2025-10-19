<script setup lang="ts">
const { data: todos } = useFetch('/api/todos')
</script>

<template>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      <NuxtLink :to="`/todo/${todo.id}`">
        {{ todo.title }}
      </NuxtLink>
    </li>
  </ul>
</template>
