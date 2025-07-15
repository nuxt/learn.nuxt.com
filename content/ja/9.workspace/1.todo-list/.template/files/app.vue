<script setup lang="ts">
type Todo = {
  id: number;
  done: boolean;
  title: string;
  note: string;
  dueDate: string | null;
};

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
    dueDate: null,
  },
]);

// 一括操作
const checkedTaskIds = ref<number[]>([]);

const searchText = ref("");

const showUnDoneOnly = ref(false);

const filteredTodos = computed(() => {
  return todos.value.filter((todo) => {
    const isDone = todo.done;
    const isTitleMatch = todo.title.includes(searchText.value);
    const isNoteMatch = todo.note?.includes(searchText.value) ?? false;

    // 未完了のみ表示
    if (showUnDoneOnly.value) {
      return !isDone && (isTitleMatch || isNoteMatch);
    } else {
      return isTitleMatch || isNoteMatch;
    }
  });
});

const checkedTaskCount = computed(() => {
  return checkedTaskIds.value.length;
});

const allChecked = computed(() => {
  return checkedTaskCount.value === filteredTodos.value.length;
});

const isCreateDialogOpen = ref(false);

const createTodo = ref<Todo>(createEmtpyTodo());

function createEmtpyTodo() {
  return {
    id: createRandomNumber(),
    done: false,
    title: "",
    note: "",
    dueDate: null,
  };
}

function createRandomNumber() {
  return Math.floor(Math.random() * 1_000_000);
}

function resetCreateTodo() {
  createTodo.value = createEmtpyTodo();
}

function resetCheckedTaskIds() {
  checkedTaskIds.value = [];
}

function handleAllCheckedChange(e: Event) {
  const target = e.target as HTMLInputElement;
  if (target.checked) {
    checkedTaskIds.value = filteredTodos.value.map((todo) => todo.id);
  } else {
    resetCheckedTaskIds();
  }
}

function bulkUpdateIsDone(taskIds: number[], isDone: boolean) {
  return todos.value.map((todo) => {
    return {
      ...todo,
      done: taskIds.includes(todo.id) ? isDone : todo.done,
    };
  });
}

function handleCheckedComplete() {
  todos.value = bulkUpdateIsDone(checkedTaskIds.value, true);
  resetCheckedTaskIds();
}

function handleCheckedIncomplete() {
  todos.value = bulkUpdateIsDone(checkedTaskIds.value, false);
  resetCheckedTaskIds();
}

function handleCheckedRemove() {
  todos.value = todos.value.filter(
    (todo) => !checkedTaskIds.value.includes(todo.id)
  );
  resetCheckedTaskIds();
}

function handleSubmitCreateTodo() {
  todos.value.unshift({ ...createTodo.value });
  resetCreateTodo();
}

watch(showUnDoneOnly, () => {
  checkedTaskIds.value = checkedTaskIds.value.filter((id) => {
    const todo = todos.value.find((todo) => todo.id === id);
    return showUnDoneOnly.value ? !todo?.done : true;
  });
});
</script>

<template>
  <UApp>
    <UContainer class="container">
      <header class="header">
        <div class="header-left">
          <h1 class="title">Vue TODO Application</h1>
        </div>
        <div class="header-right">
          <UIcon name="i-heroicons-user" />
          <span class="username">{{ userName }}</span>
        </div>
      </header>

      <main class="main">
        <div class="actions">
          <div class="search-area">
            <div class="search-controls">
              <!-- search -->
              <div class="search-input-wrapper">
                <label for="search">
                  <UIcon name="i-heroicons-magnifying-glass" class="search-icon" />
                </label>
                <input
                  id="search"
                  v-model="searchText"
                  type="search"
                  placeholder="検索"
                  class="search-input"
                />
              </div>
              <!-- show un done only -->
              <label class="checkbox-label"
                ><input
                  v-model="showUnDoneOnly"
                  type="checkbox"
                />未完了のみ表示</label
              >
            </div>
          </div>
          <button
            type="button"
            class="button primary"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="create-dialog"
            @click="isCreateDialogOpen = true"
          >
            新規作成
          </button>
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
                <td class="text-center">
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
                    <UIcon name="i-heroicons-check-circle" class="icon check" aria-hidden="true" />
                  </button>
                  <button
                    v-else
                    type="button"
                    class="button-icon"
                    aria-label="完了にする"
                    @click="todo.done = true"
                  >
                    <UIcon name="i-heroicons-check-circle" class="icon uncheck" aria-hidden="true" />
                  </button>
                </td>
                <td>{{ todo.title }}</td>
                <td><div class="multiline">{{ todo.note }}</div></td>
                <td>{{ todo.dueDate }}</td>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td colspan="5" class="text-center">
                  <p class="no-tasks">該当のタスクがありません。</p>
                </td>
              </tr>
            </template>
          </tbody>
        </table>

        <div
          v-if="checkedTaskCount > 0"
          role="dialog"
          class="bulk-bar"
        >
          <div class="bulk-controls">
            <p>選択した{{ checkedTaskCount }}件のタスクを</p>
            <ul class="bulk-buttons">
              <li>
                <button type="button" class="button primary" @click="handleCheckedComplete">完了にする</button>
              </li>
              <li>
                <button type="button" class="button primary" @click="handleCheckedIncomplete">未完了にする</button>
              </li>
              <li>
                <button type="button" class="button danger" @click="handleCheckedRemove">削除する</button>
              </li>
            </ul>
          </div>
        </div>

        <!-- 新規作成 -->
        <dialog
          id="create-dialog"
          :open="isCreateDialogOpen"
          class="dialog"
        >
          <div class="dialog-content">
            <div class="dialog-header">
              <h2 class="dialog-title">新規作成</h2>
              <button
                type="button"
                aria-label="新規作成ダイアログを閉じる"
                class="button-icon"
                @click="isCreateDialogOpen = false"
              >
                <UIcon name="i-heroicons-x-mark" class="icon close" aria-hidden="true" />
              </button>
            </div>
            <form
              id="create-form"
              class="form"
              @submit.prevent="handleSubmitCreateTodo"
            >
              <div class="form-group">
                <label for="title">タイトル</label>
                <input id="title" v-model="createTodo.title" type="text" required />
              </div>
              <div class="form-group">
                <label for="note">メモ</label>
                <textarea id="note" v-model="createTodo.note" rows="5" />
              </div>
              <div class="form-group">
                <label for="dueDate">期限</label>
                <input
                  id="dueDate"
                  :value="createTodo.dueDate"
                  type="date"
                  @change="createTodo.dueDate = ($event.target as HTMLInputElement).value || null"
                />
              </div>
            </form>
            <div class="form-actions">
              <button type="submit" form="create-form" class="button primary">登録</button>
            </div>
          </div>
        </dialog>
      </main>

      <footer class="footer">
        <p class="copyright">Vue Fes Tokyo 2025</p>
      </footer>
    </UContainer>
  </UApp>
</template>

<style scoped>
.container {
  padding-top: 1rem;
  padding-bottom: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  min-height: 100vh;
}

.header {
  display: flex;
  gap: 0.25rem;
  align-items: flex-end;
  flex-wrap: wrap;
}

.header-left {
  flex-grow: 1;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.username {
  font-size: 0.875rem;
}

.main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.search-area {
  flex-grow: 1;
}

.search-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  font-size: 0.875rem;
}

.search-input-wrapper {
  position: relative;
}

.search-icon {
  position: absolute;
  font-size: 1.25rem;
  color: #aaa;
  top: 50%;
  left: 0.5rem;
  transform: translateY(-50%);
}

.search-input {
  padding: 0.25rem 0.5rem 0.25rem 2rem;
  border: 1px solid #ccc;
  border-radius: 0.125rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.button {
  padding: 0.375rem 1rem;
  border-radius: 0.375rem;
  border: none;
  font-size: 0.875rem;
  cursor: pointer;
}

.primary {
  background-color: #007bff;
  color: #fff;
}

.primary:hover {
  background-color: #0056b3;
}

.danger {
  border: 1px solid #e3342f;
  color: #e3342f;
  background: none;
}

.danger:hover {
  background-color: #fdd;
}

.todo-table {
  width: 100%;
  border-collapse: collapse;
}

.todo-table th,
.todo-table td {
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #ccc;
  vertical-align: middle;
  text-align: left;
}

.w-checkbox {
  width: 1%;
  text-align: center;
}

.w-status {
  width: 4rem;
  text-align: center;
}

.multiline {
  white-space: pre-line;
}

.text-center {
  text-align: center;
}

.no-tasks {
  padding: 2rem;
  color: #666;
}

.icon {
  font-size: 1.25rem;
}

.check {
  color: #28a745;
}

.uncheck {
  opacity: 0.3;
}

.button-icon:hover {
  opacity: 0.7;
  background: none;
  border: none;
  cursor: pointer;
}

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

.bulk-buttons {
  display: flex;
  gap: 1rem;
  list-style: none;
  padding-left: 0;
}

.dialog {
  position: fixed;
  inset-block: 0;
  right: 0;
  width: 24rem;
  max-width: 100%;
  border: none;
  background: #fff;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
}

.dialog-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
  height: 100%;
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dialog-title {
  font-size: 1.125rem;
  font-weight: bold;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-grow: 1;
  font-size: 0.875rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.form-group input,
.form-group textarea {
  padding: 0.375rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}

.form-actions {
  text-align: center;
  margin-top: auto;
}

.footer {
  text-align: center;
}

.copyright {
  color: #666;
}
</style>
