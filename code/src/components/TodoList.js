import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { ReactComponent as Remove } from '../assets/remove.svg';
import { ReactComponent as Edit } from '../assets/edit.svg';
import { AddTodo } from './AddTodo';

import todos from '../reducers/todos';

//* ----------------styled component ------------*//
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
`;

const TaskText = styled.div`
  width: 100%;
  font-family: 'Roboto', sans-serif;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 1rem;
  color: ${({ priority }) => (priority === 0 ? 'black' : 'red')};
`;
const TaskDetail = styled.div`
  border-bottom: 2px solid #e3eef1;
  width: 100%;

  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  color: grey;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 1.2rem 0;
`;

const Text = styled.p`
  margin: 0;
`;
const Wrapper = styled.div`
  position: relative;
  width: 100%;
  &:hover ${Overlay} {
    opacity: 1;
    width: 50%;
  }
`;

//*----------TodoList component definition ----------------------*//

const TodoList = ({ date }) => {
  //*.............dispatch variable declaration .................*//
  const dispatch = useDispatch();

  //*.............redux store based variables declaration .................*//
  const items = useSelector((store) =>
    store.todos.items.filter((item) => item.dueDate === date)
  );

  //*---------Locally defined States-------------------*//
  const [showUpdateTask, setShowUpdateTask] = useState('hide');
  const [selectedTaskID, setSelectedTaskID] = useState('');
  //*-------------handlers--------------------------*//

  const onToggleTodo = (id) => {
    dispatch(todos.actions.toggleTodo(id));
  };

  const onDeleteTodo = (id) => {
    dispatch(todos.actions.deleteTodo(id));
  };

  const onUpdateTask = (id) => {
    setShowUpdateTask('update');
    setSelectedTaskID(id);
  };

  return (
    <section>
      {items.map((item) => (
        <Wrapper key={item.id}>
          <TaskText priority={item.priority}>
            <input
              type="checkbox"
              checked={item.isComplete}
              onChange={() => onToggleTodo(item.id)}
            />
            {item.isComplete === false ? (
              <Text> {item.taskText} </Text>
            ) : (
              <s> {item.taskText} </s>
            )}
          </TaskText>
          <TaskDetail>
            <Text> {item.dueDate} </Text>
            <Text> {item.label} </Text>
            <Text> {item.project} </Text>
          </TaskDetail>
          <Overlay>
            <Edit onClick={() => onUpdateTask(item.id)} />
            <Remove onClick={() => onDeleteTodo(item.id)} />
          </Overlay>
          {showUpdateTask === 'update' && (
            <AddTodo
              handelTaskInput={setShowUpdateTask}
              taskInputType={showUpdateTask}
              selectedTaskID={selectedTaskID}
            />
          )}
        </Wrapper>
      ))}
    </section>
  );
};

export default TodoList;
