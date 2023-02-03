import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { CalendarIcon, ClearIcon, CloseIcon } from './DateRangeIcons';
import { theme } from '../../theme';

export const DateRangeControls = ({ clearDisabled, onClear, onClose }) => {
  return (
    <Container>
      <RelativeContainer>
        <CalendarIcon />

        {clearDisabled ? null : <ClearButton onClick={onClear} />}
      </RelativeContainer>

      {onClose ? <CloseIcon onClick={onClose} /> : null}
    </Container>
  );
};

DateRangeControls.propTypes = {
  clearDisabled: PropTypes.bool,
  onClear: PropTypes.func,
  onClose: PropTypes.func,
};

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0 ${theme.padding};
`;

const RelativeContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin: 0 5px;
`;

const ClearButton = styled(ClearIcon)`
  background-color: #ffffff;
  position: absolute;
  opacity: 0;
  transition: opacity 0.3s, color 0.3s;

  &:hover {
    opacity: 1;
    color: black;
  }
`;
