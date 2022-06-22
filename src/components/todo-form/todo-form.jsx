import React, { useState } from 'react';

// global state
import { useTodos } from '../../providers/todo-context';

// utils
import { saveTodos } from '../../utils/storage';

// styles
import './todo-form.scss';

export const TodoForm = () => {
  // global state
  const { todos, setTodos } = useTodos();

  // local state
  const [task, setTask] = useState('');

  const handleAddTodo = () => {
    const todoId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
    const newTask = task.trim(); // trimming any spaces

    if (newTask.length < 2) {
      return;
    }

    const newTodo = {
      id: todoId,
      label: newTask,
      checked: false,
    };

    // adding new todo to the array, clearing task field
    setTodos((currentTodos) => {
      const newTodos = [...currentTodos, newTodo];

      // saving todos to localStorage
      saveTodos(newTodos);
      return newTodos;
    });
    setTask('');
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      handleAddTodo();
    }
  };

  const isAddTaskDisabled = task.length < 2;

  return (
    <div className="todo-form">
      <input
        placeholder="Enter new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyUp={handleKeyUp}
      />
      <button
        disabled={isAddTaskDisabled}
        type="button"
        onClick={handleAddTodo}
      >
        Add task
      </button>
    </div>
  );
};
