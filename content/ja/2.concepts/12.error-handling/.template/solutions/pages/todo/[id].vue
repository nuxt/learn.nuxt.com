<script setup lang="ts">
const route = useRoute()
const id = route.params.id
const { data } = useFetch(`/api/todos/${id}`)

if (!data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found',
  })
}
</script>

<template>
  <h1 v-if="data">
    {{ data.title }}
  </h1>
</template>
