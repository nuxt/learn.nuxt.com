<script setup lang="ts">
const route = useRoute()
const id = route.params.id
const { data } = useFetch(`/api/todos/${id}`)

// Challenge
</script>

<template>
  <h1 v-if="data">
    {{ data.title }}
  </h1>
</template>
