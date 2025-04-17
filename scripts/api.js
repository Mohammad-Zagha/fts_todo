
const API_URL = 'https://dummyjson.com/todos';


export async function fetchTodosFromAPI() {
  try {
        const res = await fetch(API_URL);
        const data = await res.json();
        return data.todos;
    } catch (err) {
        console.error('Failed to fetch todos:', err);
        throw err;
    }
}


export async function addTodoToServer(todo) {
  try {
        const response = await fetch(API_URL + '/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        });
        const data = await response.json();
        console.log('Todo added to server:', data);
        return data;
    } catch (error) {
        console.error('Error adding todo to server:', error);
        throw error;
    }
}

export async function updateTodoOnServer(todo) {
  try {
        const response = await fetch(`${API_URL}/${todo.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        });
        const data = await response.json();
        console.log('Todo updated on server:', data);
        return data;
    } catch (error) {
        console.error('Error updating todo on server:', error);
        throw error;
    }
}


export async function deleteTodoFromServer(todoId) {
  try {
        const response = await fetch(`${API_URL}/${todoId}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        console.log('Todo deleted from server:', data);
        return data;
    } catch (error) {
        console.error('Error deleting todo from server:', error);
        throw error;
    }
}