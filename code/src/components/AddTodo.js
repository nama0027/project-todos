import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import moment from 'moment';
//*----------Date Picker -------------*//
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
//*----------reducer -------------*//
import todos from '../reducers/todos';
//*---------------*custom components*---------------*//
import Button from './Button';
import Dropdown from './Dropdown';
//*------------------*svg*---------------------------*//
import { ReactComponent as Flag } from '../assets/flag.svg';
import { ReactComponent as Project } from '../assets/project.svg';
import { ReactComponent as Label } from '../assets/label.svg';

export const AddTodo = ({ handelTaskInput, taskInputType, selectedTaskID }) => {
  const dispatch = useDispatch();
  const selectedTask = useSelector((store) =>
    store.todos.items.find((item) => item.id === selectedTaskID)
  );
  console.log(selectedTaskID);
  console.log(selectedTask);

  const [input, setInput] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [priority, setPriority] = useState(0);
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [isLabelOpen, setIsLabelOpen] = useState(false);
  const [labelIndex, setLabelIndex] = useState(-1);
  const [projectIndex, setProjectIndex] = useState(-1);

  const [updatedInput, setUpdatedInput] = useState('');
  const [updatedDate, setUpdatedDate] = useState('');

  const onToggleProject = () => {
    isLabelOpen && setIsLabelOpen(!isLabelOpen);
    setIsProjectOpen(!isProjectOpen);
  };

  const onToggleLabel = () => {
    isProjectOpen && setIsProjectOpen(!isProjectOpen);
    setIsLabelOpen(!isLabelOpen);
  };

  const onSetPriority = () => {
    priority === 0 ? setPriority(1) : setPriority(0);
  };

  const onAddTodo = () => {
    dispatch(
      todos.actions.addTodo({
        taskText: input,
        dueDate: moment(selectedDate).format('MM/DD/YYYY'),
        priority,
        labelIndex,
        projectIndex,
      })
    );

    handelTaskInput('hide');
  };

  const onUpdateTodo = () => {
    console.log('i am in update');
    dispatch(
      todos.actions.updateTodo({
        id: selectedTask.id,
        taskText: !updatedInput ? selectedTask.taskText : updatedInput,
        dueDate: !updatedDate
          ? selectedTask.dueDate
          : moment(updatedDate).format('MM/DD/YYYY'),
        priority,
        labelIndex,
        projectIndex,
      })
    );

    handelTaskInput('hide');
  };

  const onCancel = () => {
    handelTaskInput('hide');
  };

  const onSetLabel = (index) => {
    setLabelIndex(index);
    setIsLabelOpen(!isLabelOpen);
  };
  const onSetProject = (index) => {
    setProjectIndex(index);
    setIsProjectOpen(!isProjectOpen);
  };

  if (taskInputType === 'display') {
    return (
      <>
        <Container>
          <InputText
            type="text"
            autoFocus
            placeholder="e.g., Meeting at 13pm"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <PropertiesContainer>
            <DatePicker
              selected={selectedDate}
              value={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              customInput={<Button />}
            />
            <ProjectContainer>
              <StyledProject onClick={onToggleProject} />
              {isProjectOpen && (
                <Dropdown input="project" setInput={onSetProject} />
              )}
            </ProjectContainer>
            <LabelContainer>
              <StyledLabel onClick={onToggleLabel} />
              {isLabelOpen && <Dropdown input="label" setInput={onSetLabel} />}
            </LabelContainer>
            <StyledFlag priority={priority} onClick={onSetPriority} />
          </PropertiesContainer>
        </Container>
        <ButtonContainer>
          <Button onClick={onAddTodo} value="Add task" />
          <Button onClick={onCancel} value="Cancel" />
        </ButtonContainer>
      </>
    );
  } else {
    return (
      <UpdateWrapper>
        <UpdateContainer>
          <Container>
            <InputText
              type="text"
              autoFocus
              defaultValue={selectedTask.taskText}
              onChange={(event) => setUpdatedInput(event.target.value)}
            />
            <PropertiesContainer>
              <DatePicker
                selected={selectedDate}
                value={selectedTask.dueDate}
                onChange={(date) => setUpdatedDate(date)}
                customInput={<Button />}
              />
              <StyledFlag
                priority={selectedTask.priority}
                onClick={onSetPriority}
              />
              <ProjectContainer>
                <StyledProject onClick={onToggleProject} />
                {isProjectOpen && (
                  <Dropdown input="project" setInput={onSetProject} />
                )}
              </ProjectContainer>
              <LabelContainer>
                <StyledLabel onClick={onToggleLabel} />
                {isLabelOpen && (
                  <Dropdown input="label" setInput={onSetLabel} />
                )}
              </LabelContainer>
            </PropertiesContainer>
          </Container>
          <ButtonContainer>
            <Button onClick={onUpdateTodo} value="Update" />
            <Button onClick={onCancel} value="Cancel" />
          </ButtonContainer>
        </UpdateContainer>
      </UpdateWrapper>
    );
  }
};

//* ----------------styled component ------------*//
const UpdateWrapper = styled.div`
  width: 100wh;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  opacity: 0.8;
  z-index: 1;
`;

const UpdateContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 77%;
  max-width: 400px;
  z-index: 2;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid #fff;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 20%) 0px 10px 15px;
  background: #fff;
  color: #fff;
  padding: 0.5em;
`;

const Container = styled.div`
  border: 1px solid #afd0dc;
  margin: 0.5em 0;
  padding: 0.75em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 90%;
`;

const ButtonContainer = styled.div`
  margin-top: 0.25em;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const PropertiesContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;
const ProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 7rem;
  margin: 0;
  padding: 0;
  @media (min-width: 768px) {
    right: 11rem;
  }
  @media (min-width: 1024px) {
    right: 11rem;
  }
`;
const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 5rem;
  margin: 0;
  @media (min-width: 768px) {
    right: 8.5rem;
  }
  @media (min-width: 1024px) {
    right: 9.25rem;
  }
`;
const InputText = styled.input`
  margin-top: 2em;
  width: 100%;
  height: 2em;
  font-family: 'Roboto', sans-serif;
  border: none;
  &:focus {
    outline: none;
  }
`;

const StyledFlag = styled(Flag)`
  fill: ${({ priority }) => (priority === 0 ? 'black' : 'red')};
  cursor: pointer;
`;

const StyledProject = styled(Project)`
  cursor: pointer;
  width: 28px;
  height: 28px;
`;
const StyledLabel = styled(Label)`
  cursor: pointer;
  width: 28px;
  height: 28px;
`;
