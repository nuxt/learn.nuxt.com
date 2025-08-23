<script setup lang="ts">
/**
 * Props
 */
defineProps<{
  todos: Todo[]
}>()

/**
 * Emit
 */
const emit = defineEmits<{
  'update-done': [number, boolean]
}>()

/**
 * Types
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
    <table class="todo-table">
        <thead>
            <tr>
            <th>完了</th>
            <th>タイトル</th>
            <th>メモ</th>
            <th>期限</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="todo in todos" :key="todo.id">
            <td class="text-center">
                <button
                    v-if="todo.done" type="button"
                    class="button-icon"
                    @click="emit('update-done', todo.id, false)"
                >
                ✅
                </button>
                <button
                    v-else
                    type="button"
                    class="button-icon"
                    @click="emit('update-done', todo.id, true)"
                >
                ⬜
                </button>
            </td>
            <td>{{ todo.title }}</td>
            <td><div class="multiline">{{ todo.note }}</div></td>
            <td>{{ todo.dueDate }}</td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
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
</style>
