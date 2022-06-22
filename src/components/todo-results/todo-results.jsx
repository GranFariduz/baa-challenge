import React, { useMemo } from 'react';

// global state
import { useTodos } from '../../providers/todo-context';

// styles
import './todo-results.scss';

export const TodoResults = () => {
  // global state
  const { todos } = useTodos();

  const checkedTodos = useMemo(() => {
    const completedTodos = todos.filter((todoItem) => todoItem.checked);
    return completedTodos.length;
  }, [todos]);

  return (
    <div className="todo-results">
      Done:
      {checkedTodos}
    </div>
  );
};
