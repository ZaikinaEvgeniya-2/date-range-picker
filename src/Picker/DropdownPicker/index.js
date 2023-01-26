import React, { useMemo } from 'react';
import { PropTypes } from 'prop-types';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Typography } from 'antd';
import { DropdownButton } from './DropdownButton';
import { Option } from './Option';
import { OptionType } from '../types';

export const DropdownPicker = ({
  options,
  selectedOption,
  placeholder,
  onClick,
}) => {
  const items = useMemo(() => {
    return options.map((option) => {
      return {
        ...option,
        label: <Option key={Option.key} option={option} onClick={onClick} />,
      };
    });
  }, [options]);

  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <DropdownButton>
        <Typography.Text>
          {selectedOption?.label || placeholder}
        </Typography.Text>
        <DownOutlined />
      </DropdownButton>
    </Dropdown>
  );
};

DropdownPicker.propTypes = {
  options: PropTypes.arrayOf(OptionType),
  selectedOption: OptionType,
  placeholder: PropTypes.string,
  onClick: PropTypes.func,
};
