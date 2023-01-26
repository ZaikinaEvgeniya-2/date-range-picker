import React from 'react';
import { PropTypes } from 'prop-types';
import { Typography } from 'antd';
import { OptionType } from '../types';

export const Option = ({ option, onClick }) => {
  return (
    <div onClick={() => onClick(option)}>
      <Typography.Text>{option.label}</Typography.Text>
    </div>
  );
};

Option.propTypes = {
  option: OptionType,
  onClick: PropTypes.func.isRequired,
};
