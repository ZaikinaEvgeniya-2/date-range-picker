import React from 'react';
import { PropTypes } from 'prop-types';
import { Typography } from 'antd';

export const Option = ({ option, onClick }) => {
  return (
    <div onClick={() => onClick(option)}>
      <Typography.Text>{option.label}</Typography.Text>
    </div>
  );
};

export const OptionType = PropTypes.shape({
  key: PropTypes.string.isRequired,
  value: PropTypes.number,
  label: PropTypes.string.isRequired,
});

Option.propTypes = {
  option: OptionType,
  onClick: PropTypes.func.isRequired,
};
