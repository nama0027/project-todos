import { createSlice } from '@reduxjs/toolkit';
import uniqid from 'uniqid';

const todos = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    label: ['test1', 'test2'],
    projects: [],
  },
  reducers: {
    addLabel: (store, action) => {
      const data = action.payload;
      store.label = [...store.label, data];
      //store.label.push(data);
    },

    addProject: (store, action) => {
      const data = action.payload;

      store.projects.push(data);
    },
    addTodo: (store, action) => {
      const { taskText, dueDate, priority, labelIndex, projectIndex } =
        action.payload;

      const newTodo = {
        id: uniqid(),
        taskText,
        dueDate,
        priority,
        label: store.label[labelIndex],
        project: store.projects[projectIndex],
        isComplete: false,
      };

      store.items = [...store.items, newTodo];
    },

    toggleTodo: (store, action) => {
      const updatedItems = store.items.map((item) => {
        if (item.id === action.payload) {
          const updatedTodo = {
            ...item,
            isComplete: !item.isComplete,
          };
          return updatedTodo;
        } else {
          return item;
        }
      });

      store.items = updatedItems;
    },

    deleteTodo: (store, action) => {
      const decreaseItem = store.items.filter(
        (item) => item.id !== action.payload
      );
      store.items = decreaseItem;
    },

    updateTodo: (store, action) => {
      console.log('i am in reducer');
      const { id, taskText, dueDate, priority, labelIndex, projectIndex } =
        action.payload;
      console.log('i am in reducer', id);
      const updatedItems = store.items.map((item) => {
        if (item.id === id) {
          const updatedTodo = {
            ...item,
            taskText,
            dueDate,
            priority,
            label: store.label[labelIndex],
            project: store.projects[projectIndex],
          };
          return updatedTodo;
        } else {
          return item;
        }
      });

      store.items = updatedItems;
    },
  },
});

export default todos;
