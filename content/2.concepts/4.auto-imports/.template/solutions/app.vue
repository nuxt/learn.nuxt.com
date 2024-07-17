<script setup>
const count = ref(1)
const doubled = computed(() => count.value * 2)

function increment() {
  count.value++
}
</script>

<template>
  <div>
    <p>count is {{ count }}</p>
    <p>doubled is {{ doubled }}</p>
    <button @click="increment">
      +1
    </button>
  </div>
</template>
