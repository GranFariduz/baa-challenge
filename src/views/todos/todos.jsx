import React, { useCallback, useEffect, useMemo, useState } from 'react';

// components
import { Checkbox, TodoPagination } from '../../components';

// global state
import { useTodos } from '../../providers/todo-context';

// utils
import { TODO_STATES } from '../../utils/constants';

// styles
import './todos.scss';

const Todos = () => {
  // constants
  const TODO_LIMIT = 5;

  // global state
  const { todos, handleDelete, toggleCheck, handleKeyUp } = useTodos();

  // local state
  const [todoStateFilter, setTodoStateFilter] = useState(TODO_STATES.ALL);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTodos, setFilteredTodos] = useState([...todos]);
  const [page, setPage] = useState(1);
  const [lengthBeforePagination, setLengthBeforePagination] = useState(0);

  const lastPage = useMemo(() => {
    return Math.ceil(lengthBeforePagination / TODO_LIMIT);
  }, [lengthBeforePagination]);

  const filterTodos = useCallback(() => {
    let todosCopy = [...todos];

    if (todoStateFilter === TODO_STATES.COMPLETE) {
      todosCopy = todosCopy.filter((todoItem) => todoItem.checked);
    } else if (todoStateFilter === TODO_STATES.INCOMPLETE) {
      todosCopy = todosCopy.filter((todoItem) => !todoItem.checked);
    }

    if (searchQuery.length > 0) {
      todosCopy = todosCopy.filter((todoItem) => {
        return todoItem.label.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }

    setLengthBeforePagination(todosCopy.length);

    todosCopy = todosCopy.filter(
      (_, todoItemIndex) =>
        todoItemIndex + 1 > (page - 1) * TODO_LIMIT &&
        todoItemIndex + 1 <= page * TODO_LIMIT,
    );

    setFilteredTodos(todosCopy);
  }, [todoStateFilter, todos, page, searchQuery]);

  useEffect(() => {
    filterTodos();
  }, [filterTodos]);

  const changePageBy = (changeBy) => {
    if (typeof changeBy !== 'number') {
      return;
    }

    if (page + changeBy < 1 || page + changeBy > lastPage) {
      return;
    }

    setPage((currentPage) => currentPage + changeBy);
  };

  const pageButtonClass = useCallback(
    (id) => {
      return `todos-pagination__page ${
        page === id + 1 ? 'todos-pagination__page--active' : ''
      }`;
    },
    [page],
  );

  return (
    <div className="todos">
      <div className="todos-actions">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search todos..."
          className="todos-actions__search"
        />
        <select
          value={todoStateFilter}
          onChange={(e) => setTodoStateFilter(e.target.value)}
          className="todos-actions__filter"
        >
          <option value={TODO_STATES.ALL}>All</option>
          <option value={TODO_STATES.COMPLETE}>Complete</option>
          <option value={TODO_STATES.INCOMPLETE}>Incomplete</option>
        </select>
      </div>

      {filteredTodos && filteredTodos.length ? (
        <>
          <div className="todos-content">
            {filteredTodos.map((todoItem) => (
              <Checkbox
                key={todoItem.id}
                label={todoItem.label}
                checked={todoItem.checked}
                onClick={() => toggleCheck(todoItem.id)}
                onKeyUp={(e) => handleKeyUp(e, todoItem.id)}
                onDelete={() => handleDelete(todoItem.id)}
              />
            ))}
          </div>

          <TodoPagination
            changePageBy={changePageBy}
            lastPage={lastPage}
            page={page}
            pageButtonClass={pageButtonClass}
            setPage={setPage}
          />
        </>
      ) : (
        <div className="no-todos">No todos found ☹️</div>
      )}
    </div>
  );
};

export default Todos;
