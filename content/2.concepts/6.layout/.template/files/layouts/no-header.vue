<template>
  <div class="view">
    <main>
      <slot />
    </main>
    <footer>
      footer
    </footer>
  </div>
</template>

<style scoped>
.view {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
}

main {
  flex: 1;
  padding: 1rem;
}

footer {
  background-color: #333;
  color: white;
  padding: 1rem;
}
</style>
