<script setup lang="ts">

/**
 * Data
 */
// TODO: リアクティブな値に変更
let userName = "No Name";

/**
 * Methods
 */
// TODO: リアクティブな値にアクセスできるよう変更
const setUserName = () => {
  userName = 'Vue Fes Japan'
}
</script>

<template>
  <div class="container">
    <header class="header">
      <div class="header-left">
        <h1>Vue TODO Application</h1>
      </div>
      <div class="header-right">
        <button @click="setUserName">ユーザー名をセット</button>
        👤
        <span>{{ userName }}</span>
      </div>
    </header>

    <main>
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
        </tbody>
      </table>
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


/* ------- main start ------- */
main {
  flex-grow: 1;
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 1rem;
}

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

.search-area input[type="search"] {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  width: 12rem;
}

.search-controls label {
  display: grid;
  grid-auto-flow: column;
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
  display: grid;
  grid-auto-flow: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}

.bulk-controls ul {
  display: grid;
  grid-auto-flow: column;
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
