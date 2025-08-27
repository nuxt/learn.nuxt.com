<script setup lang="ts">
import { ref } from 'vue';
import TodoList from './components/TodoList.vue'

/**
 * Data
 */
const todos = ref<Todo[]>([
  {
    id: 1,
    done: false,
    title: "Vue Fes Japan 2025のチケット販売開始の宣伝をする",
    note: "XとBlueskyで宣伝する。\n会社のslackでも宣伝する。",
    dueDate: "2025-10-24",
  },
  {
    id: 2,
    done: true,
    title: "Vue Fes Japan ボランティアスタッフに応募する",
    note: "",
    dueDate: "",
  },
]);

/**
 * Methods
 */
const updateDone = (id: number, done: boolean) => {
  const targetTodo = todos.value.find(todo => todo.id === id)

  if (targetTodo) {
    targetTodo.done = done
  }
}

/**
 * Type
 */
type Todo = {
  id: number;
  done: boolean;
  title: string;
  note: string;
  dueDate: string;
};
</script>

<template>
  <div class="container">
    <header class="header">
      <div class="header-left">
        <h1>Vue TODO Application</h1>
      </div>
      <div class="header-right">
        👤
        <span>Vue Fes Japan</span>
      </div>
    </header>

    <main>
        <TodoList :todos="todos" @update-done="updateDone"/>
    </main>

    <footer class="footer">
      <p>Vue Fes Tokyo 2025</p>
    </footer>
  </div>
</template>

<style scoped>
.container {
  padding: 1rem 0 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  min-height: 100vh;
}

/* ------- header start ------- */
.header {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.25rem;
  align-items: flex-end;
}

.header-right {
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  gap: 0.25rem;
}

.header h1 {
  font-size: 1.5rem;
  font-weight: bold;
}

.header img {
  width: 1.5rem;
  height: 1.5rem;
}

.header span {
  font-size: 0.875rem;
}
/* ------- header last ------- */

/* footer */
.footer {
  text-align: center;
  color: #666;
}
</style>
