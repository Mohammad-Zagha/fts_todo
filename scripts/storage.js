
const STORAGE_KEY = 'todos';

export function saveToLocalStorage(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}


export function loadFromLocalStorage() {
  const storedTodos = localStorage.getItem(STORAGE_KEY);
  return storedTodos ? JSON.parse(storedTodos) : [];
}