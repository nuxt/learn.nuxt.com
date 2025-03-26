<template>
  <div class="view">
    <header>
      header
    </header>
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

header {
  background-color: #333;
  color: white;
  padding: 1rem;
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
