import React, { useState } from 'react';

import moment from 'moment';
import Button from './Button';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import { ReactComponent as Plus } from '../assets/plus-24.svg';



const Header = styled.header`
  width: 100%;
  height: 50px;
  background-color: #0b79a2;
  padding: 0.75em 0 0.25em 0.75em;
`;
const TaskListBanner = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  font-family: 'Roboto', sans-serif;
  gap: 10px;
  margin: 0;
  padding: 0;
`;

const MainContent = styled.section`
  max-width: 800px;
  margin: 10px auto;
  padding-left: 55px;
  padding-right: 55px;
  position: relative;
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
  color: #0b79a2;
`;
const Start = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddTask, setShowAddTask] = useState('hide');
  

  
  return (
    <>
      <Header></Header>
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
          <AddTaskButton onClick={() => setShowAddTask('display')}>
            <Plus />
            Add task
          </AddTaskButton>
        )}
        {showAddTask === 'display' && (
          <AddTodo setShowAddTask={setShowAddTask} />
        )}
      </MainContent>
    </>
  );
};

export default Start;
