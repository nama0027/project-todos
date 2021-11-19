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
      // v1 mutability approach

      //store.items.push(data);
      // v2 immutabilty approach
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
      //v1 mutability approach
      //store.items.forEach((item) => {
      //if (item.id === action.payload) {
      //item.isComplete = !item.isComplete;
      //}
      //});

      //v2 immutabilty approach
      const updatedItems = store.items.map((item) => {
        if (item.id === action.payload) {
          const updatedTodo = {
            // id: item.id,
            // text: item.text,
            // isComplete: item.isComplete,
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
      //v1 mutability approach index in action.payload
      // store.items.splice(action.payload, 1);

      //v2 immutabilty approach
      const decreaseItem = store.items.filter(
        (item) => item.id !== action.payload
      );
      store.items = decreaseItem;
    },
  },
});

export default todos;
