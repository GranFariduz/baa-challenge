import React from 'react';

// components
import { TodoForm, TodoList, TodoResults } from '../../components';

const Home = () => (
  <div>
    <TodoResults />
    <TodoForm />
    <TodoList />
  </div>
);

export default Home;
