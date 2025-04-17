
import { addEditEventListeners } from './eventHandlers.js';


export function showShimmerLoading() {
  const tbody = document.querySelector('#todoTableBody');
  tbody.innerHTML = ''; 
  
  for (let i = 0; i < 5; i++) {
    const tr = document.createElement('tr');
    tr.className = 'shimmer-row';
    
    tr.innerHTML = `
      <td><div class="shimmer-cell" style="width: 30px;"></div></td>
      <td><div class="shimmer-cell" style="width: 80%;"></div></td>
      <td><div class="shimmer-cell" style="width: 30px;"></div></td>
      <td><div class="shimmer-cell" style="width: 60px;"></div></td>
      <td>
        <div class="shimmer-cell" style="width: 100px;"></div>
      </td>
    `;
    
    tbody.appendChild(tr);
  }
  
  document.querySelector('.footer-info').textContent = 'Loading tasks...';
}


export function renderTodos(todosToRender) {
  const tbody = document.querySelector('#todoTableBody');
  tbody.innerHTML = ''; 

  todosToRender.forEach((todo) => {
    const tr = document.createElement('tr');
    tr.dataset.id = todo.id;
    tr.dataset.originalText = todo.todo; 

    if (todo.completed) {
      tr.classList.add('completed-task');
    }

    tr.innerHTML = `
      <td>${todo.id}</td>
      <td class="todo-text-container">
        <button class="edit-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        </button>
        <span class="todo-text">${todo.todo}</span>
      </td>
      <td>${todo.userId}</td>
      <td>${todo.completed ? 'Completed' : 'Pending'}</td>
      <td>
        <div class="action-buttons">
          <button class="delete-button">Delete</button>
          <button class="done-button">${todo.completed ? 'Undo' : 'Done'}</button>
        </div>
      </td>
    `;

    tbody.appendChild(tr);
  });

  addEditEventListeners();

  addEditStyles();

  updateTodoCount(todosToRender);
}


export function updateTodoCount(todos) {
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  
  document.querySelector('.footer-info').textContent = 
    `Total tasks: ${totalTodos} (${completedTodos} completed, ${totalTodos - completedTodos} pending)`;
}


export function showError(message) {
  document.querySelector('.footer-info').textContent = message;
}

function addEditStyles() {
  if (!document.getElementById('todo-edit-styles')) {
    const styleElement = document.createElement('style');
    styleElement.id = 'todo-edit-styles';
    styleElement.textContent = `
      .todo-text-container {
        display: flex;
        width: 100% !important;
        align-items: center;
      }
      .todo-text {
        padding: 4px 8px;
        border-radius: 4px;
        flex-grow: 1;
      }
      .todo-text.editing {
        background-color: #f3f4f6;
        border: 1px solid #d1d5db;
        padding: 6px 8px;
        outline: 2px solid #3b82f6;
      }
      .edit-button {
        background-color: #3b82f6;
        color: white;
        border: none;
        min-width: 32px;
        min-height: 32px;
        margin-right: 8px;
        border-radius: 6px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.3s;
      }
      .edit-button:hover {
        background-color: #2563eb;
      }
      .edit-button.save-mode {
        background-color: #10b981;
      }
      .edit-button.save-mode:hover {
        background-color: #059669;
      }
    `;
    document.head.appendChild(styleElement);
  }
}