import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Typography } from 'antd';
import { DEFAULT_OPTIONS, PLACEHOLDER } from './constant';

const { Text } = Typography;

export const Picker = ({
  options = DEFAULT_OPTIONS,
  placeholder = PLACEHOLDER,
  onChange = undefined,
}) => {
  const [selectedOption, setSelectedOption] = useState();

  const onClick = (e) => {
    const newSelectedOption = options.find((option) => option.key === e.key);
    setSelectedOption(newSelectedOption);
    onChange && onChange(newSelectedOption);
  };

  return (
    <Dropdown
      menu={{
        items: options,
        onClick,
      }}
      trigger={['click']}
    >
      <DropdownButton>
        <Text>{selectedOption?.label || placeholder}</Text>
        <DownOutlined />
      </DropdownButton>
    </Dropdown>
  );
};

Picker.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

const DropdownButton = styled.button`
  background-color: #ffffff;
  display: inline-flex;
  padding: 0 12px;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgba(2, 9, 28, 0.28);
  border-radius: 4px;
  min-width: 150px;
  min-height: 40px;

  &:focus {
    cursor: pointer;
  }
`;
