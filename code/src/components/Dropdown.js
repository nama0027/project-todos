import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import todos from '../reducers/todos';
import { ReactComponent as Plus } from '../assets/plus-24.svg';

const DropDownContainer = styled.div`
  position: absolute;
  top: 2em;
  width: 12em;
  margin: 0 auto;
  margin-left: ${({ type }) => (type === 'label' ? '-175px' : '-180px')};
`;

const TextContainer = styled.span`
  display: flex;
`;

const DropDownList = styled.ul`
  padding: 0;
  margin: 0;
  padding-left: 0.5em;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 300;
  &:first-child {
    padding-top: 0.8em;
  }
`;

const ListItem = styled.li`
  list-style: none;
  margin-bottom: 0.8em;
  cursor: pointer;
`;
const StyledPlus = styled(Plus)`
  cursor: pointer;
`;

const Dropdown = ({ input, setInput }) => {
  const [labelInput, setLabelInput] = useState('');
  const [projectInput, setProjectInput] = useState('');
  const label = useSelector((store) => store.todos.label);
  const projects = useSelector((store) => store.todos.projects);
  const dispatch = useDispatch();

  const onAddLabel = () => {
    dispatch(todos.actions.addLabel(labelInput));
    setLabelInput('');
  };

  const onAddProject = () => {
    dispatch(todos.actions.addProject(projectInput));
    setProjectInput('');
  };

  if (input === 'label') {
    return (
      <DropDownContainer type={input}>
        <DropDownList>
          <ListItem>
            <TextContainer>
              <input
                type="text"
                autoFocus
                value={labelInput}
                onChange={(event) => setLabelInput(event.target.value)}
              />
              <StyledPlus onClick={onAddLabel} />
            </TextContainer>
          </ListItem>
          {label.map((item, index) => (
            <ListItem key={item} value={item} onClick={() => setInput(index)}>
              {item}
            </ListItem>
          ))}
        </DropDownList>
      </DropDownContainer>
    );
  } else {
    return (
      <DropDownContainer type={input}>
        <DropDownList>
          <ListItem>
            <TextContainer>
              <input
                type="text"
                autoFocus
                value={projectInput}
                onChange={(event) => setProjectInput(event.target.value)}
              />
              <StyledPlus onClick={onAddProject} />
            </TextContainer>
          </ListItem>
          {projects.map((item, index) => (
            <ListItem key={item} value={item} onClick={() => setInput(index)}>
              {item}
            </ListItem>
          ))}
        </DropDownList>
      </DropDownContainer>
    );
  }
};

export default Dropdown;
