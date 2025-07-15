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
    <UContainer class="pt-4 pb-10 flex flex-col gap-10 min-h-screen">
      <header class="flex gap-1 items-end flex-wrap">
        <div class="flex-grow">
          <h1 class="text-2xl font-bold">Vue TODO Application</h1>
        </div>
        <div class="flex items-center gap-1">
          <UIcon name="i-heroicons-user" />
          <span class="text-sm">{{ userName }}</span>
        </div>
      </header>

      <main class="flex-grow flex flex-col gap-4">
        <div class="flex gap-2 flex-wrap">
          <div class="flex-grow">
            <div class="flex gap-y-2 gap-x-4 text-sm flex-wrap">
              <!-- search -->
              <div class="relative">
                <label for="search">
                  <UIcon
                    name="i-heroicons-magnifying-glass"
                    class="absolute text-lg text-gray-400 top-1/2 -translate-y-1/2 left-2"
                  />
                </label>
                <input
                  id="search"
                  v-model="searchText"
                  type="search"
                  placeholder="検索"
                  class="border border-gray-300 rounded-sm py-1 pr-2 pl-8"
                />
              </div>
              <!-- show un done only -->
              <label class="flex gap-2 items-center"
                ><input
                  v-model="showUnDoneOnly"
                  type="checkbox"
                />未完了のみ表示</label
              >
            </div>
          </div>
          <button
            type="button"
            class="bg-primary text-white dark:text-black px-4 py-1.5 rounded-md text-sm hover:bg-primary-600"
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
              <th class="w-0 text-center">
                <input
                  v-model="allChecked"
                  type="checkbox"
                  aria-label="全てのタスクの選択"
                  @change="handleAllCheckedChange"
                />
              </th>
              <th class="w-16 text-center">完了</th>
              <th>タイトル</th>
              <th>メモ</th>
              <th>期限</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="filteredTodos.length > 0">
              <tr v-for="todo in filteredTodos" :key="todo.id">
                <td class="leading-none text-center">
                  <input
                    v-model="checkedTaskIds"
                    type="checkbox"
                    :value="todo.id"
                    :aria-label="`${todo.title}の選択`"
                  />
                </td>
                <td class="leading-none text-center">
                  <button
                    v-if="todo.done"
                    type="button"
                    class="hover:opacity-70"
                    aria-label="未完了にする"
                    @click="todo.done = false"
                  >
                    <UIcon
                      name="i-heroicons-check-circle"
                      class="text-xl align-middle text-green-500"
                      aria-hidden="true"
                    />
                  </button>
                  <button
                    v-else
                    type="button"
                    class="hover:opacity-70"
                    aria-label="完了にする"
                    @click="todo.done = true"
                  >
                    <UIcon
                      name="i-heroicons-check-circle"
                      class="text-xl align-middle opacity-30"
                      aria-hidden="true"
                    />
                  </button>
                </td>
                <td>{{ todo.title }}</td>
                <td>
                  <div class="whitespace-pre-line">{{ todo.note }}</div>
                </td>
                <td>{{ todo.dueDate }}</td>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td colspan="5" class="text-center">
                  <p class="py-10">該当のタスクがありません。</p>
                </td>
              </tr>
            </template>
          </tbody>
        </table>

        <div
          v-if="checkedTaskCount > 0"
          role="dialog"
          class="fixed bottom-0 inset-x-0 px-6 pt-6 pb-10 border-t bg-white border-t-gray-200 dark:bg-gray-800 dark:border-gray-700 shadow-[0_0_10px_rgb(0_0_0_/_0.1)]"
        >
          <div class="flex gap-y-2 gap-x-6 items-center justify-center">
            <p>選択した{{ checkedTaskCount }}件のタスクを</p>
            <ul class="flex gap-y-2 gap-x-4">
              <li>
                <button
                  type="button"
                  class="bg-primary text-white dark:text-black px-4 py-1.5 rounded-md text-sm hover:bg-primary-600"
                  @click="handleCheckedComplete"
                >
                  完了にする
                </button>
              </li>
              <li>
                <button
                  type="button"
                  class="bg-primary text-white dark:text-black px-4 py-1.5 rounded-md text-sm hover:bg-primary-600"
                  @click="handleCheckedIncomplete"
                >
                  未完了にする
                </button>
              </li>
              <li>
                <button
                  type="button"
                  class="border-error border-1 text-error px-4 py-1.5 rounded-md text-sm hover:opacity-70"
                  @click="handleCheckedRemove"
                >
                  削除する
                </button>
              </li>
            </ul>
          </div>
        </div>

        <!-- 新規作成 -->
        <dialog
          id="create-dialog"
          :open="isCreateDialogOpen"
          class="fixed inset-y-0 left-auto right-0 min-h-screen w-sm max-w-full border-l bg-white dark:bg-gray-800 border-l-gray-200 dark:border-l-gray-700 shadow-[0_0_10px_rgb(0_0_0_/_0.1)]"
        >
          <div class="flex flex-col gap-6 p-4">
            <div class="flex gap-2">
              <h2 class="flex-grow text-md font-bold">新規作成</h2>
              <button
                type="button"
                aria-label="新規作成ダイアログを閉じる"
                class="hover:opacity-70"
                @click="isCreateDialogOpen = false"
              >
                <UIcon
                  name="i-heroicons-x-mark"
                  class="text-xl"
                  aria-hidden="true"
                />
              </button>
            </div>
            <form
              id="create-form"
              class="text-sm flex flex-col gap-5 flex-grow"
              @submit.prevent="handleSubmitCreateTodo"
            >
              <div class="flex flex-col gap-1">
                <label for="title">タイトル</label>
                <input
                  id="title"
                  v-model="createTodo.title"
                  type="text"
                  class="border border-gray-300 rounded-sm py-1 px-2"
                  required
                />
              </div>
              <div class="flex flex-col gap-1">
                <label for="note">メモ</label>
                <textarea
                  id="note"
                  v-model="createTodo.note"
                  class="border border-gray-300 rounded-sm py-1 px-2"
                  rows="5"
                  resize="vertical"
                />
              </div>
              <div class="flex flex-col gap-1">
                <label for="dueDate">期限</label>
                <input
                  id="dueDate"
                  :value="createTodo.dueDate"
                  type="date"
                  class="border border-gray-300 rounded-sm py-1 px-2"
                  @change="
                    createTodo.dueDate =
                      ($event.target as HTMLInputElement).value || null
                  "
                />
              </div>
            </form>
            <div class="text-center">
              <button
                type="submit"
                form="create-form"
                class="bg-primary text-white dark:text-black px-4 py-1.5 rounded-md text-sm hover:bg-primary-600"
              >
                登録
              </button>
            </div>
          </div>
        </dialog>
      </main>

      <footer>
        <p class="text-center">Vue Fes Tokyo 2025</p>
      </footer>
    </UContainer>
  </UApp>
</template>

<style scoped>
.todo-table {
  --border-color: #ccc;

  th,
  td {
    padding: 0.5rem 1rem;
    vertical-align: middle;
  }
  thead th {
    padding-block-start: 0;
    text-align: left;
  }
  thead tr {
    border-bottom: 2px solid var(--border-color);
  }
  tbody tr {
    border-bottom: 1px solid var(--border-color);
  }
}
</style>