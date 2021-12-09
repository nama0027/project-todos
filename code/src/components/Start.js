import React, { useState } from 'react';

import moment from 'moment';
import Button from './Button';
import styled from 'styled-components/macro';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TodoList from './TodoList';
import { AddTodo } from './AddTodo';
import { ReactComponent as Plus } from '../assets/plus-24.svg';

const Header = styled.header`
  width: 100%;
  height: 50px;
  background-color: #29b07e;
  padding: 0.75em 0 0.25em 0.75em;
`;
const TaskListBanner = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  font-family: 'Roboto', sans-serif;
  gap: 10px;
  margin: 0;
  padding: 0.5rem;
  background: #eaf8f2;
`;

const MainContent = styled.section`
  max-width: 375px;
  margin: 10px auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  position: relative;

  @media (min-width: 768px) {
    max-width: 800px;
    padding-left: 3rem;
    padding-right: 3rem;
  }
`;
const AddTaskButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  font-family: 'Roboto', sans-serif;
  gap: 10px;
  margin-top: 1rem;
  padding: 0;
  border: none;
  background: transparent;
  color: #58c39d;
`;

const Title = styled.h2`
  color: #333;
`;

const Start = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddTask, setShowAddTask] = useState('hide');

  const onShowTask = () => {
    setShowAddTask('display');
  };

  return (
    <>
      <Header>
        <Title>My Tasks Diary</Title>
      </Header>
      <MainContent>
        <TaskListBanner>
          <DatePicker
            selected={selectedDate}
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            customInput={<Button />}
          />
        </TaskListBanner>
        <TodoList date={moment(selectedDate).format('MM/DD/YYYY')} />
        {showAddTask === 'hide' && (
          <AddTaskButton onClick={onShowTask}>
            <Plus />
            Add task
          </AddTaskButton>
        )}
        {showAddTask === 'display' && (
          <AddTodo
            handelTaskInput={setShowAddTask}
            taskInputType={showAddTask}
          />
        )}
      </MainContent>
    </>
  );
};

export default Start;
