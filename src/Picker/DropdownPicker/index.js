import React, { useMemo } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Typography } from 'antd';
import { OptionType } from '../types';

export const DropdownPicker = ({
  options,
  selectedOption,
  placeholder,
  onClick,
}) => {
  const getClickableItem = (option) => {
    return {
      ...option,
      label: (
        <div onClick={() => onClick(option)}>
          <Typography.Text>{option.label}</Typography.Text>
        </div>
      ),
    };
  };

  const items = useMemo(() => options.map(getClickableItem), [options]);

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
  onClick: PropTypes.func.isRequired,
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
