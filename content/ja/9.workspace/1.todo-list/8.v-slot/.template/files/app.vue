<script setup lang="ts">
import { ref, computed } from 'vue';
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
const showUnDoneOnly = ref(false);
const isCreateModalOpen = ref(false);
// TODO: 各フォーム入力欄に対応するリアクティブ変数（`ref`）を用意する

/**
 * Computed
 */
const filteredTodos = computed(() => {
  if (!showUnDoneOnly.value) {
      return todos.value;
  }

  return todos.value.filter(todo => !todo.done);
});

/**
 * Methods
 */
const updateDone = (id: number, done: boolean) => {
  const targetTodo = todos.value.find(todo => todo.id === id)

  if (targetTodo) {
    targetTodo.done = done
  }
}

// TODO: 「登録」ボタンクリックイベントに渡す関数を用意し、新規Todoオブジェクトを追加する

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
      <div class="actions">
        <div>
          <div class="search-controls">
            <label>
              <input
                v-model="showUnDoneOnly"
                type="checkbox"
              />
              未完了のみ表示
            </label>
          </div>
        </div>
        <button type="button" @click="isCreateModalOpen = true">新規作成</button>
      </div>

      <TodoList :todos="filteredTodos" @update-done="updateDone"/>


      <!-- 新規作成モーダル -->
       <!-- TODO: `CreateModal.vue`の`<slot>`に、新規todo入力フォームを差し込む -->
      <CreateModal
        v-if="isCreateModalOpen"
        v-model="isCreateModalOpen"
      />
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

/* ------- actions start ------- */
.actions {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.5rem;
  align-items: flex-end;
}

.search-controls {
  display: inline-grid;
  grid-auto-flow: column;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  justify-content: start;
}

.search-controls label {
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  gap: 0.5rem;
}

button {
  padding: 0.375rem 1rem;
  border-radius: 0.375rem;
  border: none;
  font-size: 0.875rem;
  background-color: #02C169;
  color: #fff;
  cursor: pointer;
}

button:hover {
  background-color: #029E58;
}
/* ------- actions last ------- */

/* ------- form start ------- */
form {
  display: grid;
  grid-auto-rows: min-content;
  gap: 1rem;
  font-size: 0.875rem;
  height: 100%;
}

form > div {
  display: grid;
  gap: 0.25rem;
}

input,
textarea {
  padding: 0.375rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}

/* ------- form last ------- */

/* footer */
.footer {
  text-align: center;
  color: #666;
}
</style>
