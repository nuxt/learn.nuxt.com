<script setup lang="ts">
const route = useRoute()
const id = computed(() => route.params.id)
</script>

<template>
  <div>
    <div>
      Posts/{{ id }}
    </div>
    <NuxtLink to="/foo">
      Foo
    </NuxtLink>
    <div>
      <NuxtLink to="/">
        Index
      </NuxtLink>
    </div>
    <div />
  </div>
</template>
