import * as React from 'react';
import { TodoForm } from './components/todo-form';
import { TodoList } from './components/todo-list';
import { TodoResults } from './components/todo-results';
import { TodosContext } from './todo-context';
import './index.scss';

const todosTemplate = [
  {
    id: 0,
    label: 'Fix the app to display list of all tasks',
    checked: false,
  },
  {
    id: 1,
    label: 'Fix the layout such that the checkboxes should be listed in a column',
    checked: false,
  },
  {
    id: 2,
    label: 'Fix the app to add a new task',
    checked: false,
  },
  {
    id: 3,
    label: 'Fix the app to mark a task as completed',
    checked: false,
  },
  {
    id: 4,
    label: 'Fix the app to delete a task',
    checked: false,
  },
  {
    id: 5,
    label: 'Fix the app to count the completed tasks',
    checked: false,
  },
];

export const App = () => {
  const [todos, setTodos] = React.useState([]);

  return (
    <div className="root">
      <TodosContext.Provider value={{ todos }}>
        <TodoList />
        <TodoResults />
        <TodoForm />
      </TodosContext.Provider>
    </div>
  );
};
