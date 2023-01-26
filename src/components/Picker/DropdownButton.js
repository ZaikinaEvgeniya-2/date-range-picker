import styled from 'styled-components';

export const DropdownButton = styled.button`
  background-color: #ffffff;
  display: inline-flex;
  padding: 0 12px;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgba(2, 9, 28, 0.28);
  border-radius: 4px;
  min-width: 150px;
  min-height: 40px;

  &:focus {
    cursor: pointer;
  }
`;
