import React from 'react';

// styles
import './todo-pagination.scss';

export const TodoPagination = ({
  changePageBy,
  page,
  lastPage,
  setPage,
  pageButtonClass,
}) => {
  return (
    <div className="todos-pagination">
      <button
        disabled={page <= 1}
        onClick={() => changePageBy(-1)}
        className="todos-pagination__back"
        type="button"
      >
        Back
      </button>
      {Array.from({ length: lastPage }, (_, i) => {
        return (
          <button
            onClick={() => setPage(i + 1)}
            key={i + 1}
            className={pageButtonClass(i)}
            type="button"
          >
            {i + 1}
          </button>
        );
      })}
      <button
        disabled={page >= lastPage}
        className="todos-pagination__next"
        onClick={() => changePageBy(1)}
        type="button"
      >
        Next
      </button>
    </div>
  );
};
