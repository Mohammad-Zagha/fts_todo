
import { saveToLocalStorage } from './storage.js';
import { renderTodos } from './ui.js';
import { addTodoToServer, updateTodoOnServer, deleteTodoFromServer } from './api.js';
import { handleBlur, handleKeyDown } from './eventHandlers.js';

let todos = [];

export function setTodos(newTodos) {
  todos = newTodos;
}


export function getTodos() {
  return todos;
}


export function addTodo() {
  const todoInput = document.querySelector('#todoInput');
  const todoText = todoInput.value.trim();
  
  if (!todoText) {
    alert('Please enter a task!');
    return;
  }
  
  const newTodo = {
    id: todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1,
    todo: todoText,
    completed: false,
    userId: 1 
  };
  
  todos.unshift(newTodo);
  
  todoInput.value = '';
  
  renderTodos(todos);
  
  saveToLocalStorage(todos);
  
  addTodoToServer(newTodo);
}


export function deleteTodo(todoId) {
  const index = todos.findIndex(todo => todo.id === todoId);
  
  if (index !== -1) {
    todos.splice(index, 1);
    
    renderTodos(todos);
    
    saveToLocalStorage(todos);
    
    deleteTodoFromServer(todoId);
  }
}


export function toggleTodoStatus(todoId) {
  const index = todos.findIndex(todo => todo.id === todoId);
  
  if (index !== -1) {
    todos[index].completed = !todos[index].completed;
    
    renderTodos(todos);
    
    saveToLocalStorage(todos);
    
    updateTodoOnServer(todos[index]);
  }
}

export function searchTodos(e) {
  const searchText = e.target.value.toLowerCase();
  
  if (searchText) {
    const filteredTodos = todos.filter(todo => 
      todo.todo.toLowerCase().includes(searchText)
    );
    renderTodos(filteredTodos);
  } else {
    renderTodos(todos);
  }
}


export function startEditing(row, todoTextElement) {
  row.dataset.originalText = todoTextElement.textContent.trim();
  
  todoTextElement.setAttribute('contenteditable', 'true');
  todoTextElement.classList.add('editing');
  todoTextElement.focus();
  
  const range = document.createRange();
  const selection = window.getSelection();
  range.selectNodeContents(todoTextElement);
  range.collapse(false);
  selection.removeAllRanges();
  selection.addRange(range);
  
  const editButton = row.querySelector('.edit-button');
  editButton.classList.add('save-mode');
  editButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
      <polyline points="17 21 17 13 7 13 7 21"></polyline>
      <polyline points="7 3 7 8 15 8"></polyline>
    </svg>
  `;
  
  todoTextElement.addEventListener('blur', handleBlur);
  
  todoTextElement.addEventListener('keydown', handleKeyDown);
}

export function finishEditing(row, todoTextElement, saveChanges) {
  todoTextElement.removeEventListener('blur', handleBlur);
  todoTextElement.removeEventListener('keydown', handleKeyDown);
  
  todoTextElement.setAttribute('contenteditable', 'false');
  todoTextElement.classList.remove('editing');
  
  const todoId = parseInt(row.dataset.id);
  const index = todos.findIndex(todo => todo.id === todoId);
  
  if (saveChanges && index !== -1) {
    const newText = todoTextElement.textContent.trim();
    if (newText) {
      todos[index].todo = newText;
      saveToLocalStorage(todos);
      updateTodoOnServer(todos[index]);
    } else {
      todoTextElement.textContent = row.dataset.originalText;
    }
  } else {
    todoTextElement.textContent = row.dataset.originalText;
  }
  
  const editButton = row.querySelector('.edit-button');
  editButton.classList.remove('save-mode');
  editButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  `;
}