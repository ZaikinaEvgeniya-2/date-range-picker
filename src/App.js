import React from 'react';
import { Picker } from './components';
import { CustomDaysDropdown } from './old';
import './App.css';

export const App = () => {
  return (
    <div style={{ display: 'flex', width: '400px' }}>
      <Picker />

      <CustomDaysDropdown onChange={() => {}} enableEmptySelection={false} />
    </div>
  );
};
