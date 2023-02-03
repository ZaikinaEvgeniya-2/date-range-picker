import React, { useCallback, useMemo } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Typography } from 'antd';
import { OptionType } from '../types';
import { theme } from '../theme';

const { Text } = Typography;

export const DropdownPicker = ({
  options,
  selectedOption,
  placeholder = '',
  onSelect,
}) => {
  const getSelectableItem = useCallback(
    (option) => {
      return {
        ...option,
        label: (
          <div onClick={() => onSelect(option)}>
            <Text>{option.label}</Text>
          </div>
        ),
      };
    },
    [onSelect]
  );

  const items = useMemo(
    () => options.map(getSelectableItem),
    [getSelectableItem, options]
  );

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
  onSelect: PropTypes.func.isRequired,
};

const DropdownButton = styled.button`
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: ${theme.border};
  border-radius: ${theme.borderRadius};
  min-width: 150px;
  min-height: 40px;

  &:focus {
    cursor: pointer;
  }
`;
