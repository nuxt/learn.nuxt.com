<script setup lang="ts">
import type { Todo } from './types'

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
</script>

<template>
  <div class="container">
    <header class="header">
      <div class="header-left">
        <h1>📝 ToDoリスト - v-forでテーブル表示</h1>
        <p>v-forを使って配列データを動的にレンダリングしてみましょう</p>
      </div>
    </header>

    <main>
      <table class="todo-table">
        <thead>
          <tr>
            <th class="w-status">完了</th>
            <th>タイトル</th>
            <th>メモ</th>
            <th>期限</th>
          </tr>
        </thead>
        <tbody>
          <!-- 
            チャレンジ: ここに v-for を使ってToDoアイテムを表示してください！
            
            ヒント:
            1. v-for="todo in todos" を使用
            2. :key="todo.id" を必ず追加
            3. 完了状態は todo.done ? '✅ 完了' : '⏳ 未完了' で表示
            4. メモや期限が空の場合は '' か '-' を表示
          -->
          
          <!-- 現在は固定のサンプル表示 - これを v-for に置き換えてください -->
          <tr>
            <td class="text-center">⏳ 未完了</td>
            <td>サンプルタスク1</td>
            <td><div class="multiline">これは固定のサンプルです</div></td>
            <td>2025-08-01</td>
          </tr>
          <tr>
            <td class="text-center">✅ 完了</td>
            <td>サンプルタスク2</td>
            <td><div class="multiline">v-forに置き換えてください</div></td>
            <td>2025-08-15</td>
          </tr>
        </tbody>
      </table>

      <div class="hint-box">
        <h3>💡 実装のヒント</h3>
        <ul>
          <li><code>v-for="todo in todos"</code> でループ処理</li>
          <li><code>:key="todo.id"</code> で一意のキーを設定</li>
          <li><code>{{ "{{ todo.title }}" }}</code> でタスク名を表示</li>
          <li><code>{{ "{{ todo.done ? '✅ 完了' : '⏳ 未完了' }}" }}</code> で状態を表示</li>
          <li>メモは <code>&lt;div class="multiline"&gt;{{ "{{ todo.note }}" }}&lt;/div&gt;</code> で表示</li>
        </ul>
      </div>
    </main>
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

.header h1 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
}

.header p {
  font-size: 1rem;
  color: #7f8c8d;
  margin-top: 0.5rem;
}
/* ------- header last ------- */

/* ------- main start ------- */
main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

.w-status {
  width: 4rem;
  text-align: center;
}

.text-center {
  text-align: center;
}

.todo-table .multiline {
  white-space: pre-line;
}
/* ------- table last ------- */

/* hint box */
.hint-box {
  background: #e8f4fd;
  border: 1px solid #bee5eb;
  border-radius: 8px;
  padding: 20px;
  margin-top: 2rem;
}

.hint-box h3 {
  margin-top: 0;
  color: #0c5460;
}

.hint-box ul {
  margin: 15px 0 0 20px;
}

.hint-box li {
  margin-bottom: 8px;
  color: #0c5460;
}

.hint-box code {
  background: #d1ecf1;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  color: #0c5460;
}
</style>
