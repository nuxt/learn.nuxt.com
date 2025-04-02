<script setup lang="ts">
const count = ref(1)
const multiplier = ref(2)
const result = computed(() => count.value * multiplier.value)

function increment() {
  count.value++
}

function multiply() {
  multiplier.value++
}
</script>

<template>
  <div>
    <p>count is {{ count }}</p>
    <p>result is {{ result }}</p>
    <button type="button" @click="increment">
      +1
    </button>
    <button type="button" @click="multiply">
      x{{ multiplier }}
    </button>
  </div>
</template>
