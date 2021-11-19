import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from './Button';
import todos from '../reducers/todos';
import { ReactComponent as Flag } from '../assets/flag.svg';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import moment from 'moment';
import Dropdown from './Dropdown';

const Container = styled.div`
  border: 1px solid #afd0dc;
  margin: 0.5em 0;
  padding: 0.75em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
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
`;
const ProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 11.5rem;
`;
const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 6rem;
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

const AddTodo = ({ setShowAddTask }) => {
  const [input, setInput] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [priority, setPriority] = useState(0);
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [isLabelOpen, setIsLabelOpen] = useState(false);
  const [labelIndex, setLabelIndex] = useState(-1);
  const [projectIndex, setProjectIndex] = useState(-1);
  const dispatch = useDispatch();

  const toggleProject = () => setIsProjectOpen(!isProjectOpen);
  const toggleLabel = () => setIsLabelOpen(!isLabelOpen);

  const onSetPriority = () => {
    {
      priority === 0 ? setPriority(1) : setPriority(0);
    }
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

    setShowAddTask('hide');
  };

  const onCancel = () => {
    setShowAddTask('hide');
  };

  const onSetLabel = (index) => {
    setLabelIndex(index);
    setIsLabelOpen(!isLabelOpen);
  };
  const onSetProject = (index) => {
    setProjectIndex(index);
    setIsProjectOpen(!isProjectOpen);
  };

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
            <Button onClick={toggleProject} value="Project" />
            {isProjectOpen && (
              <Dropdown input="project" setInput={onSetProject} />
            )}
          </ProjectContainer>
          <LabelContainer>
            <Button onClick={toggleLabel} value="Label" />
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
};

export default AddTodo;
