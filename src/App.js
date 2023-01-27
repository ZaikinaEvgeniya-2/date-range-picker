import React, { useState } from 'react';
import { Picker } from './Picker';
import { CustomDaysDropdown } from './old';
import './App.css';

export const App = () => {
  const [value, setValue] = useState();

  console.log('CURRENT VALUE', value);

  return (
    <div style={{ width: '400px' }}>
      <Picker value={value} onChange={setValue} />
      <CustomDaysDropdown />
    </div>
  );
};
