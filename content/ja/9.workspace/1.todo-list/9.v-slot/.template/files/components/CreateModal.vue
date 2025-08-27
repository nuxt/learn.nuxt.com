<script setup lang="ts">

/**
 * DefineModel
 */
const isCreateModalOpen = defineModel()
</script>

<template>
  <div class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2>新規作成モーダル</h2>

        <button aria-label="ダイアログを閉じる" @click="isCreateModalOpen = false">
          閉じる
        </button>
      </div>

      <!-- TODO: <slot>で受け取れるようにする -->
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
</style>
