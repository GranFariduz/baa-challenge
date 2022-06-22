import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

// components
import { Checkbox } from '../checkbox';

// global state
import { useTodos } from '../../providers/todo-context';

// styles
import './todo-list.scss';

export const TodoList = () => {
  // constants
  const TODO_LIMIT = 5;

  // global state
  const { todos, handleDelete, toggleCheck, handleKeyUp } = useTodos();

  const limitedTodos = useMemo(() => {
    if (todos.length > TODO_LIMIT) {
      return todos.slice(0, 5);
    }

    return todos;
  }, [todos]);

  return (
    <div className="todo-list">
      <div className="todo-list-head">
        <span className="todo-list-head__title">Things to do</span>
        <Link className="todo-list-head__link" to="/todos">
          View all
        </Link>
      </div>

      {todos && todos.length ? (
        <div className="todo-list-content">
          {limitedTodos.map((todoItem) => (
            <Checkbox
              key={todoItem.id}
              label={todoItem.label}
              checked={todoItem.checked}
              onClick={() => toggleCheck(todoItem.id)}
              onKeyUp={(e) => handleKeyUp(e, todoItem.id)}
              onDelete={() => handleDelete(todoItem.id)}
            />
          ))}

          {todos.length > 5 && (
            <Link className="todo-list-content__link" to="/todos">
              View all
            </Link>
          )}
        </div>
      ) : (
        <div className="no-todos">
          Looks like you&apos;re up for a challenge!
        </div>
      )}
    </div>
  );
};
