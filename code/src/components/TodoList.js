import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { ReactComponent as Remove } from '../assets/remove.svg';
import { ReactComponent as Edit } from '../assets/edit.svg';
import AddTodo from './AddTodo';

import todos from '../reducers/todos';

const Overlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
  opacity: 0;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: ${({ showAddTask }) => (showAddTask === 'display' ? '100%' : null)};
`;

const TaskText = styled.div`
  width: 100%;
  font-family: 'Roboto', sans-serif;
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ priority }) => (priority === 0 ? 'black' : 'red')};
`;
const TaskDetail = styled.div`
  border-bottom: 2px solid #e3eef1;
  width: 100%;
  margin-bottom: 20px;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  color: grey;
  display: flex;
  align-items: center;
  gap: 10px;
`;
const Wrapper = styled.div`
  position: relative;
  width: 100%;
  &:hover ${Overlay} {
    opacity: 1;
    width: 50%;
  }
`;

const TodoList = ({ date }) => {
  const [showAddTask, setShowAddTask] = useState('hide');
  const [isOpen, setIsOpen] = useState(false);

  const items = useSelector((store) =>
    store.todos.items.filter(
      (item) => item.dueDate === date && item.isComplete === false
    )
  );

  const dispatch = useDispatch();

  const onToggleTodo = (id) => {
    dispatch(todos.actions.toggleTodo(id));
  };

  const onDeleteTodo = (id) => {
    dispatch(todos.actions.deleteTodo(id));
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <section>
      {items.map((item) => (
        <Wrapper>
          <TaskText priority={item.priority} key={item.id}>
            <input
              type="checkbox"
              checked={item.isComplete}
              onClick={() => onToggleTodo(item.id)}
            />
            <p> {item.taskText} </p>
          </TaskText>
          <TaskDetail>
            <p> {item.dueDate} </p>
            <p> {item.label} </p>
            <p> {item.project} </p>
          </TaskDetail>
          <Overlay>
            {showAddTask === 'hide' && (
              <>
                <Edit
                  showAddTask={showAddTask}
                  onClick={() => setShowAddTask('display')}
                />
                <Remove onClick={() => onDeleteTodo(item.id)} />
              </>
            )}
            {showAddTask === 'display' && (
              <AddTodo setShowAddTask={setShowAddTask} />
            )}
          </Overlay>
        </Wrapper>
      ))}
    </section>
  );
};

export default TodoList;
