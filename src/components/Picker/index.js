import React, { useEffect, useMemo, useState } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Typography } from 'antd';
import { DEFAULT_OPTIONS, EMPTY_OPTION } from './constant';

const { Text } = Typography;

export const Picker = ({
  options = DEFAULT_OPTIONS,
  onChange,
  value,
  enableEmptySelection = true,
}) => {
  const [selectedOption, setSelectedOption] = useState(value);

  const items = useMemo(() => {
    let res = options;

    if (enableEmptySelection) {
      res = [EMPTY_OPTION, ...res];
    }

    return res;
  }, [options, enableEmptySelection]);

  useEffect(() => setSelectedOption(value), [value]);

  const onClick = (e) => {
    const newSelectedOption = options.find((option) => option.key === e.key);
    setSelectedOption(newSelectedOption);
    onChange && onChange(newSelectedOption);
  };

  return (
    <Dropdown
      menu={{
        items,
        onClick,
      }}
      trigger={['click']}
    >
      <DropdownButton>
        <Text>{selectedOption?.label || EMPTY_OPTION.label}</Text>
        <DownOutlined />
      </DropdownButton>
    </Dropdown>
  );
};

const optionType = PropTypes.shape({
  key: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
});

Picker.propTypes = {
  options: PropTypes.arrayOf(optionType),
  onChange: PropTypes.func,
  value: optionType,
  enableEmptySelection: PropTypes.bool,
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
