import React, { createContext, useContext, useEffect, useState } from 'react';

// utils
import { getTodos, saveTodos } from '../utils/storage';

const TodoContext = createContext({});

const TodoContextProvider = ({ children }) => {
  // state
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const todosFromStorage = getTodos();

    if (todosFromStorage.length > 0) {
      setTodos(todosFromStorage);
    }
  }, []);

  const handleDelete = (id) => {
    const todosAfterDeletion = todos.filter((todoItem) => todoItem.id !== id);
    setTodos(todosAfterDeletion);

    // saving todos to localStorage
    saveTodos(todosAfterDeletion);
  };

  const toggleCheck = (id) => {
    const todoItemIndex = todos.findIndex((todoItem) => todoItem.id === id);

    if (todoItemIndex !== -1) {
      const todosCopy = [...todos];
      todosCopy[todoItemIndex].checked = !todos[todoItemIndex].checked;

      setTodos(todosCopy);

      // saving todos to localStorage
      saveTodos(todosCopy);
    }
  };

  const handleKeyUp = (e, id) => {
    if (e.keyCode === 13) {
      toggleCheck(id);
    }
  };

  return (
    <TodoContext.Provider
      value={{ todos, setTodos, handleDelete, toggleCheck, handleKeyUp }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;

export const useTodos = () => useContext(TodoContext);
