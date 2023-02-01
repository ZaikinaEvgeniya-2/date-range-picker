import React, { useState } from 'react';
import { Picker } from './Picker';
import { CustomDaysDropdown as OldPicker } from './old';
import './App.css';

const DEFAULT_VALUE = {
  key: '1',
  value: 24,
  label: 'Last 24 hrs',
};

// const VALUE = {
//   key: '7',
//   value: 168,
//   label: 'Last 7 days',
// };

// const CUSTOM_VALUE = {
//   key: 'custom',
//   value: ['1675933083', '1676537883'],
//   label: 'Custom',
// };

export const App = () => {
  const onChange1 = (value, option) => {
    console.log('value1', value);
    console.log('option1', option);
  };

  // const [value2, setValue2] = useState();
  // const onChange2 = (value, option) => {
  //   setValue2(option);
  //   console.log('value2', value);
  //   console.log('option2', option);
  // };

  // const [value3, setValue3] = useState();
  // const onChange3 = (value, option) => {
  //   setValue3(option);
  //   console.log('value3', value);
  //   console.log('option3', option);
  // };

  const [value4, setValue4] = useState(DEFAULT_VALUE);
  const onChange4 = (value, option) => {
    setValue4(option);
    console.log('value4', value);
    console.log('option4', option);
  };

  // const [value5, setValue5] = useState(DEFAULT_VALUE);
  // const onChange5 = (value, option) => {
  //   setValue5(option);
  //   console.log('value5', value);
  //   console.log('option5', option);
  // };

  // useEffect(() => {
  //   setTimeout(() => {
  //     console.log('SET');
  //     setValue2(CUSTOM_VALUE);
  //     setValue3(CUSTOM_VALUE);
  //     setValue4(CUSTOM_VALUE);
  //     setValue5(CUSTOM_VALUE);
  //   }, 10000);
  // }, []);

  return (
    <div style={{ width: '400px' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
        }}
      >
        {/* <Picker /> */}
        <Picker defaultValue={DEFAULT_VALUE} onChange={onChange1} />
        {/* <Picker
          defaultValue={DEFAULT_VALUE}
          value={value2}
          onChange={onChange2}
        />

        <Picker value={value3} onChange={onChange3} />

        <p>with default </p> */}
        <Picker
          defaultValue={DEFAULT_VALUE}
          value={value4}
          onChange={onChange4}
        />
        {/* <Picker value={value5} onChange={onChange5} /> */}
      </div>

      <p>old</p>
      <OldPicker />
    </div>
  );
};
