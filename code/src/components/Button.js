import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const StyledButton = styled.button`
  background: #0b79a2;
  border-radius: 3px;
  border: 2px solid #afd0dc;
  padding: 0.4em;
  color: #fff;
  width: fit-content;
  height: 32px;
  font-family: 'Roboto', sans-serif;
  font-size: 1em;
  font-weight: 700;
  text-align: center;
  letter-spacing: 0.1em;
  margin-right: 0.2em;
`;
const Button = ({ value, onClick }) => {
  const today = moment().format('MM/DD/YYYY'); // 11/19/2021

  if (value === '' || value === today) {
    return (
      <StyledButton onClick={onClick} value={value}>
        Today
      </StyledButton>
    );
  } else {
    return (
      <StyledButton onClick={onClick} value={value}>
        {value}
      </StyledButton>
    );
  }
};

export default Button;
