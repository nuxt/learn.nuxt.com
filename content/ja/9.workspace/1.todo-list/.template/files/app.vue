<script setup lang="ts">
import Modal from './components/Modal.vue';
import type { Todo } from './types'

/**
 * Data
 */
const userName = ref("Vue Fes Japan");
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
const checkedTaskIds = ref<number[]>([]);
const searchText = ref("");
const showUnDoneOnly = ref(false);
const isCreateDialogOpen = ref(false);


/**
 * Computed
 */
const filteredTodos = computed(() => {
  return todos.value.filter(({ done, title, note }) => {
    const text = searchText.value;
    const matchesText = title.includes(text) || note?.includes(text);

    return showUnDoneOnly.value ? !done && matchesText : matchesText;
  })
});

const checkedTaskCount = computed(() => {
  return checkedTaskIds.value.length;
});

const allChecked = computed(() => {
  return checkedTaskCount.value === filteredTodos.value.length;
});


/**
 * Methods
 */
const resetCheckedTaskIds = () => {
  checkedTaskIds.value = [];
}

const handleAllCheckedChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.checked) {
    checkedTaskIds.value = filteredTodos.value.map((todo) => todo.id);
  } else {
    resetCheckedTaskIds();
  }
}

const bulkUpdateIsDone = (taskIds: number[], isDone: boolean) => {
  return todos.value.map((todo) => {
    return {
      ...todo,
      done: taskIds.includes(todo.id) ? isDone : todo.done,
    };
  });
}

const handleCheckedComplete = () => {
  todos.value = bulkUpdateIsDone(checkedTaskIds.value, true);

  resetCheckedTaskIds();
}

const handleCheckedIncomplete = () => {
  todos.value = bulkUpdateIsDone(checkedTaskIds.value, false);

  resetCheckedTaskIds();
}

const handleCheckedRemove = () => {
  todos.value = todos.value.filter(
    (todo) => !checkedTaskIds.value.includes(todo.id)
  );

  resetCheckedTaskIds();
}

const handleSubmitCreateTodo = (newTodo: Todo) => {
  todos.value.unshift({ ...newTodo });
}

/**
 * Watch
 */
watch(showUnDoneOnly, (visibleOnly) => {
  if (visibleOnly) {
    checkedTaskIds.value = checkedTaskIds.value.filter((id) => {
      const todo = todos.value.find((todo) => todo.id === id);

      return todo?.done === false;
    });
  }
});
</script>

<template>
  <div class="container">
    <header class="header">
      <div class="header-left">
        <h1>Vue TODO Application</h1>
      </div>
      <div class="header-right">
        <img src="@/assets/person-gray.svg" alt="ユーザー" />
        <span>{{ userName }}</span>
      </div>
    </header>

    <main>
      <div class="actions">
        <div class="search-area">
          <div class="search-controls">
            <div>
              <input
                id="search"
                v-model="searchText"
                type="search"
                placeholder="検索"
              />
            </div>
            <label>
              <input v-model="showUnDoneOnly" type="checkbox" />
              未完了のみ表示
            </label>
          </div>
        </div>
        <button type="button" @click="isCreateDialogOpen = true">新規作成</button>
      </div>

      <table class="todo-table">
        <thead>
          <tr>
            <th class="w-checkbox">
              <input
                v-model="allChecked"
                type="checkbox"
                aria-label="全てのタスクの選択"
                @change="handleAllCheckedChange"
              />
            </th>
            <th class="w-status">完了</th>
            <th>タイトル</th>
            <th>メモ</th>
            <th>期限</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="filteredTodos.length > 0">
            <tr v-for="todo in filteredTodos" :key="todo.id">
              <td>
                <input
                  v-model="checkedTaskIds"
                  type="checkbox"
                  :value="todo.id"
                  :aria-label="`${todo.title}の選択`"
                />
              </td>
              <td class="text-center">
                <button
                  v-if="todo.done"
                  type="button"
                  class="button-icon"
                  aria-label="未完了にする"
                  @click="todo.done = false"
                >
                  <img src="@/assets/check-circle-green.svg" alt="完了" />
                </button>
                <button
                  v-else
                  type="button"
                  class="button-icon"
                  aria-label="完了にする"
                  @click="todo.done = true"
                >
                  <img src="@/assets/check-circle-gray.svg" alt="未完了" />
                </button>
              </td>
              <td>{{ todo.title }}</td>
              <td><div class="multiline">{{ todo.note }}</div></td>
              <td>{{ todo.dueDate }}</td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="5">
                <p class="no-tasks">該当のタスクがありません。</p>
              </td>
            </tr>
          </template>
        </tbody>
      </table>

      <div v-if="checkedTaskCount > 0" class="bulk-bar" role="dialog">
        <div class="bulk-controls">
          <p>選択した{{ checkedTaskCount }}件のタスクを</p>
          <ul>
            <li><button type="button" @click="handleCheckedComplete">完了にする</button></li>
            <li><button type="button" @click="handleCheckedIncomplete">未完了にする</button></li>
            <li><button type="button" class="danger" @click="handleCheckedRemove">削除する</button></li>
          </ul>
        </div>
      </div>

      <!-- 新規作成モーダル -->
      <Modal
        :isOpen="isCreateDialogOpen"
        @close="isCreateDialogOpen = false"
        @submit="handleSubmitCreateTodo"
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
  display: flex;
  gap: 0.25rem;
  align-items: flex-end;
  flex-wrap: wrap;
}

.header-left {
  flex-grow: 1;
}
.header-right {
  display: flex;
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


/* ------- main start ------- */
main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: flex-end;
}

.search-area {
  flex-grow: 1;
}

.search-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  font-size: 0.875rem;
  align-items: center;
}

.search-area input[type="search"] {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  width: 12rem;
}

.search-controls label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.actions button {
  padding: 0.375rem 1rem;
  border-radius: 0.375rem;
  border: none;
  font-size: 0.875rem;
  background-color: #02C169;
  color: #fff;
  cursor: pointer;
}

.actions button:hover {
  background-color: #029e58;
}
/* ------- main last ------- */

/* ------- table start ------- */
.todo-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.todo-table th,
.todo-table td {
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #ccc;
  vertical-align: middle;
  text-align: left;
}

.w-checkbox {
  width: 16px;
  text-align: center;
}

.w-status {
  width: 4rem;
  text-align: center;
}

.todo-table button {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.todo-table button:hover {
  opacity: 0.7;
}

.todo-table img {
  width: 1.25rem;
  height: 1.25rem;
}

.todo-table .multiline {
  white-space: pre-line;
}

.no-tasks {
  padding: 2rem;
  color: #666;
  text-align: center;
}
/* ------- table last ------- */

/* ------- bulk bar start ------- */
.bulk-bar {
  position: fixed;
  bottom: 0;
  inset-inline: 0;
  padding: 1rem;
  background: #fff;
  border-top: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.bulk-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}

.bulk-controls ul {
  display: flex;
  gap: 1rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.bulk-controls button {
  padding: 0.375rem 1rem;
  border-radius: 0.375rem;
  border: none;
  font-size: 0.875rem;
  background-color: #02C169;
  color: #fff;
  cursor: pointer;
}

.bulk-controls button:hover {
  background-color: #029e58;
}
.bulk-controls .danger {
  border: 1px solid #e3342f;
  color: #e3342f;
  background: none;
}

.bulk-controls .danger:hover {
  background-color: #fdd;
}
/* ------- bulk bar last ------- */

/* footer */
.footer {
  text-align: center;
  color: #666;
}
</style>
