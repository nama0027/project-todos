import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import todos from './reducers/todos';
import AddTodo from './components/AddTodo';
import TodoList from 'components/TodoList';
import Start from 'components/Start';

const reducer = combineReducers({
  todos: todos.reducer,
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <Start />
    </Provider>
  );
};
