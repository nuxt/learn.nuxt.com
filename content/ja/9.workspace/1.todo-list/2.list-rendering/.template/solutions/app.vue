<script setup lang="ts">
import type { Todo } from './types'

/**
 * サンプルのToDoデータ
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
    note: "応募フォームから申し込み完了",
    dueDate: "2025-08-15",
  },
  {
    id: 3,
    done: false,
    title: "Nuxtの新機能を学習する",
    note: "公式ドキュメントを読み、サンプルアプリを作成する",
    dueDate: "2025-09-30",
  },
  {
    id: 4,
    done: true,
    title: "TypeScriptの型定義を理解する",
    note: "基本的な型から高度な型まで学習",
    dueDate: "2025-07-20",
  },
]);
</script>

<template>
  <div class="todo-container">
    <header class="header">
      <h1>📝 ToDoリスト - v-forでテーブル表示 ✅</h1>
      <p>配列データが動的にテーブルでレンダリングされています！</p>
    </header>

    <main class="main-content">
      <div class="table-container">
        <table class="todo-table">
          <thead>
            <tr>
              <th>タスク</th>
              <th>メモ</th>
              <th>期限</th>
              <th>状態</th>
            </tr>
          </thead>
          <tbody>
            <!-- v-forを使って動的にレンダリング -->
            <tr v-for="todo in todos" :key="todo.id">
              <td class="task-title">{{ todo.title }}</td>
              <td class="task-note">{{ todo.note || '-' }}</td>
              <td class="task-date">{{ todo.dueDate || '-' }}</td>
              <td class="task-status" :class="{ 'completed': todo.done }">
                {{ todo.done ? '✅ 完了' : '⏳ 未完了' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="success-box">
        <h3>🎉 素晴らしい！</h3>
        <p>v-forを使って配列データを動的にレンダリングできました。</p>
        <ul>
          <li>✅ <code>v-for="todo in todos"</code> でループ処理</li>
          <li>✅ <code>:key="todo.id"</code> で一意のキーを設定</li>
          <li>✅ 各プロパティを適切に表示</li>
          <li>✅ 条件分岐で完了状態を表示</li>
        </ul>
      </div>

      <div class="next-steps">
        <h3>🚀 次のステップ</h3>
        <p>今度は以下の機能を追加してみましょう：</p>
        <ul>
          <li>検索機能（タスク名での絞り込み）</li>
          <li>完了状態でのフィルタリング</li>
          <li>新しいタスクの追加機能</li>
          <li>タスクの編集・削除機能</li>
        </ul>
      </div>
    </main>
  </div>
</template>

<style scoped>
.todo-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  color: #27ae60;
  margin-bottom: 10px;
}

.header p {
  color: #2c3e50;
  font-size: 16px;
  font-weight: 500;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.table-container {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.todo-table {
  width: 100%;
  border-collapse: collapse;
}

.todo-table th {
  background-color: #27ae60;
  color: white;
  padding: 15px;
  text-align: left;
  font-weight: 600;
}

.todo-table td {
  padding: 15px;
  border-bottom: 1px solid #ecf0f1;
  vertical-align: top;
}

.todo-table tr:hover {
  background-color: #f8f9fa;
}

.todo-table tr:last-child td {
  border-bottom: none;
}

.task-title {
  font-weight: 600;
  color: #2c3e50;
}

.task-note {
  color: #7f8c8d;
  font-size: 14px;
  white-space: pre-line;
}

.task-date {
  color: #34495e;
  font-weight: 500;
}

.task-status {
  font-weight: 600;
}

.task-status.completed {
  color: #27ae60;
}

.success-box {
  background: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 8px;
  padding: 20px;
}

.success-box h3 {
  margin-top: 0;
  color: #155724;
}

.success-box p {
  color: #155724;
}

.success-box ul {
  margin: 15px 0 0 20px;
}

.success-box li {
  margin-bottom: 8px;
  color: #155724;
}

.success-box code {
  background: #c3e6cb;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  color: #155724;
}

.next-steps {
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 8px;
  padding: 20px;
}

.next-steps h3 {
  margin-top: 0;
  color: #856404;
}

.next-steps p {
  color: #856404;
}

.next-steps ul {
  margin: 15px 0 0 20px;
}

.next-steps li {
  margin-bottom: 8px;
  color: #856404;
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
  .todo-table {
    font-size: 14px;
  }
  
  .todo-table th,
  .todo-table td {
    padding: 10px 8px;
  }
}
</style>
