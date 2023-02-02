import React, { useState } from 'react';
import styled from 'styled-components';
import { Picker } from './Picker';
import './App.css';

const DEFAULT_RANGE = {
  key: '3',
  value: 72,
  label: 'Last 3 days',
};

export const App = () => {
  const [range, setRange] = useState();

  function onRangeChange(value, option) {
    setRange(option);
    console.log('value', value);
    console.log('option', option);
  }

  return (
    <Container>
      <Picker
        defaultValue={DEFAULT_RANGE}
        value={range}
        onChange={onRangeChange}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 400px;
`;
