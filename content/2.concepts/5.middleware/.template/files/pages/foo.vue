<script setup lang="ts">
definePageMeta({
  middleware: ['hello-foo'],
})
</script>

<template>
  <h1>Foo</h1>
  <NuxtLink to="/">
    /Index
  </NuxtLink>
</template>
