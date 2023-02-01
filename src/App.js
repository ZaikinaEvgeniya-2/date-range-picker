import React, { useState } from 'react';
import { Picker } from './Picker';
import './App.css';

const DEFAULT_VALUE = {
  key: '3',
  value: 72,
  label: 'Last 3 days',
};

export const App = () => {
  const [value, setValue] = useState();

  function onChange(value, option) {
    setValue(option);
    console.log('value', value);
    console.log('option', option);
  }

  return (
    <div style={{ width: '400px' }}>
      <Picker defaultValue={DEFAULT_VALUE} value={value} onChange={onChange} />
    </div>
  );
};
