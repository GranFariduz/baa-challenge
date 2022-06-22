import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// views
import { Home, Todos } from './views';

// providers
import TodoContextProvider from './providers/todo-context';

// styles
import './index.scss';

export const App = () => (
  <BrowserRouter>
    <TodoContextProvider>
      <div className="root">
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route index path="/todos" element={<Todos />} />
        </Routes>
      </div>
    </TodoContextProvider>
  </BrowserRouter>
);
