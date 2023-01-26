import React, { useEffect, useMemo, useState } from 'react';
import { PropTypes } from 'prop-types';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Typography } from 'antd';
import { DropdownButton } from './DropdownButton';
import { Option, OptionType } from './Option';
import { DEFAULT_OPTIONS, EMPTY_OPTION, CUSTOM_OPTION } from './constant';

export const Picker = ({
  options = DEFAULT_OPTIONS,
  onChange,
  value,
  enableEmptySelection = true,
  enableCustomDate = true,
}) => {
  const [selectedOption, setSelectedOption] = useState(value);

  useEffect(() => setSelectedOption(value), [value]);

  const onClick = (newSelectedOption) => {
    setSelectedOption(newSelectedOption);
    onChange && onChange(newSelectedOption);
  };

  const items = useMemo(() => {
    let res = options;

    if (enableEmptySelection) {
      res = [EMPTY_OPTION, ...res];
    }

    if (enableCustomDate) {
      res = [...res, CUSTOM_OPTION];
    }

    return res.map((option) => {
      return {
        ...option,
        label: <Option key={option.key} option={option} onClick={onClick} />,
      };
    });
  }, [options, enableEmptySelection, enableCustomDate]);

  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <DropdownButton>
        <Typography.Text>
          {selectedOption?.label || EMPTY_OPTION.label}
        </Typography.Text>
        <DownOutlined />
      </DropdownButton>
    </Dropdown>
  );
};

Picker.propTypes = {
  options: PropTypes.arrayOf(OptionType),
  onChange: PropTypes.func,
  value: OptionType,
  enableEmptySelection: PropTypes.bool,
  enableCustomDate: PropTypes.bool,
};
