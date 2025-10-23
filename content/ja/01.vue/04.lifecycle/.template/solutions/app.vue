<script setup lang="ts">
import Child from './Child.vue'

const isVisible = ref(true)
const mountCount = ref(0)
const unmountCount = ref(0)

const toggleVisibility = () => {
  isVisible.value = !isVisible.value
}

const onMounted = () => {
  mountCount.value++
}

const onBeforeUnmount = () => {
  unmountCount.value++
}
</script>

<template>
  <div>
    <button @click="toggleVisibility">子コンポーネントを切り替え</button>
    <p>マウント回数: {{ mountCount }}</p>
    <p>アンマウント回数: {{ unmountCount }}</p>
    <Child v-if="isVisible" @mounted="onMounted" @before-unmount="onBeforeUnmount" />
  </div>
</template>
