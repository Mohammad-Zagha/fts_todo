
import { fetchTodosFromAPI } from './api.js';
import { loadFromLocalStorage, saveToLocalStorage } from './storage.js';
import { showShimmerLoading, renderTodos, showError } from './ui.js';
import { setupEventListeners } from './eventHandlers.js';
import { setTodos, getTodos } from './todoOperations.js';

document.addEventListener('DOMContentLoaded', () => {
  showShimmerLoading();
  
  setupEventListeners();
  
  const storedTodos = loadFromLocalStorage();
  if (storedTodos && storedTodos.length) {
    setTodos(storedTodos);
    renderTodos(getTodos());
  }
  
  fetchTodosFromAPI()
    .then((apiTodos) => {
      if (apiTodos && apiTodos.length) {
        setTodos(apiTodos);
        saveToLocalStorage(apiTodos);
        renderTodos(apiTodos);
      }
    })
    .catch((err) => {
      showError('Error loading tasks');
      console.error('Failed to fetch todos:', err);
    });
});