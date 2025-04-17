
import { deleteTodo, toggleTodoStatus, addTodo, searchTodos, startEditing, finishEditing } from './todoOperations.js';


export function addEditEventListeners() {
  document.querySelectorAll('.delete-button').forEach(btn => {
    btn.addEventListener('click', function() {
      const row = this.closest('tr');
      const todoId = parseInt(row.dataset.id);
      
      showDeleteConfirmation(todoId);
    });
  });
  
  document.querySelectorAll('.done-button').forEach(btn => {
    btn.addEventListener('click', function() {
      const row = this.closest('tr');
      const todoId = parseInt(row.dataset.id);
      
      toggleTodoStatus(todoId);
    });
  });
  
  document.querySelectorAll('.edit-button').forEach(btn => {
    btn.addEventListener('click', function() {
      const row = this.closest('tr');
      const todoTextElement = row.querySelector('.todo-text');
      
      if (todoTextElement.classList.contains('editing')) {
        finishEditing(row, todoTextElement, true);
      } else {
        startEditing(row, todoTextElement);
      }
    });
  });
}


export function setupEventListeners() {
  document.querySelector('#addButton').addEventListener('click', addTodo);
  document.querySelector('#todoInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
  });
  
  document.querySelector('.search-input').addEventListener('input', searchTodos);
}

function showDeleteConfirmation(todoId) {
  if (confirm('Are you sure you want to delete this task?')) {
    deleteTodo(todoId);
  }
}


export function handleBlur(event) {
  const todoTextElement = event.target;
  const row = todoTextElement.closest('tr');
  
  setTimeout(() => {
    if (document.body.contains(todoTextElement) && todoTextElement.classList.contains('editing')) {
      finishEditing(row, todoTextElement, false);
    }
  }, 100);
}


export function handleKeyDown(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    const todoTextElement = event.target;
    const row = todoTextElement.closest('tr');
    finishEditing(row, todoTextElement, true);
  } else if (event.key === 'Escape') {
    event.preventDefault();
    const todoTextElement = event.target;
    const row = todoTextElement.closest('tr');
    finishEditing(row, todoTextElement, false);
  }
}