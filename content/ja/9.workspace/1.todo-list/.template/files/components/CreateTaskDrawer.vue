<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Todo } from '../types';

/**
 * Types
 */
type Props = {
  isOpen: boolean;
};

type Emits = {
  (event: 'close'): void;
  (event: 'submit', value: Todo): void;
};

/**
 * Props
 */
const props = defineProps<Props>();

/**
 * Emits
 */
const emit = defineEmits<Emits>();

/**
 * Data
 */
const newTodo = ref<Todo>({
  id: Date.now(),
  done: false,
  title: '',
  note: '',
  dueDate: '',
});

/**
 * Methods
 */
const resetCreateTodo = () => {
  newTodo.value = {
    id: Date.now(),
    done: false,
    title: '',
    note: '',
    dueDate: '',
  };
}

const handleSubmit = () => {
  emit('submit', newTodo.value);

  resetCreateTodo();
}

/**
 * Watch
 */
watch(
  () => props.isOpen,
  (open) => {
    if (open) {
      resetCreateTodo();
    }
  }
);
</script>

<template>
  <div v-if="isOpen" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2>新規作成</h2>

        <button aria-label="ダイアログを閉じる" @click="emit('close')">
          ✕ 
        </button>
      </div>

      <form @submit.prevent="handleSubmit">
        <div>
          <label for="title">タイトル</label>
          <input id="title" v-model="newTodo.title" type="text" required />
        </div>

        <div>
          <label for="note">メモ</label>
          <textarea id="note" v-model="newTodo.note" rows="5" />
        </div>

        <div>
          <label for="dueDate">期限</label>
          <input id="dueDate" v-model="newTodo.dueDate" type="date" />
        </div>

        <div class="form-actions">
          <button type="submit">登録</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  height: 100vh;
  width: 24rem;
  max-width: 100%;
  border: none;
  background: #fff;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  overflow-y: auto;
  display: grid;
  grid-template-rows: auto 1fr;
}

.dark .modal {
  background: #020420;
}

.modal-content {
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 1.5rem;
  padding: 1rem;
}

.modal-header {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
}

.modal-header h2 {
  font-size: 1.125rem;
  font-weight: bold;
}

.modal-header button {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  display: inline-grid;
  place-items: center;
}

.modal-header img {
  font-size: 1.25rem;
}

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

.form-actions {
  text-align: center;
  margin-top: auto;
}

.form-actions button {
  padding: 0.375rem 1rem;
  border-radius: 0.375rem;
  border: none;
  font-size: 0.875rem;
  background-color: #02C169;
  color: #fff;
  cursor: pointer;
}

.form-actions button:hover {
  background-color: #029E58;
}
</style>
