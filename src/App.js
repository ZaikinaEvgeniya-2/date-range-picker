import React, { useState } from 'react';
import { Picker } from './Picker';
import { CustomDaysDropdown } from './old';
import './App.css';

export const App = () => {
  const [value, setValue] = useState();

  const onChange = (value, option) => {
    setValue(option);
    console.log('value', value);
    console.log('option', option);
  };

  return (
    <div style={{ width: '400px' }}>
      <Picker value={value} onChange={onChange} />
      <CustomDaysDropdown />
    </div>
  );
};
