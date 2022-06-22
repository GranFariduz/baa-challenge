export const saveTodos = async (todos) => {
  if (typeof todos !== 'object') {
    return;
  }

  localStorage.setItem('todos', JSON.stringify(todos));
};

export const getTodos = () => JSON.parse(localStorage.getItem('todos') || '{}');
