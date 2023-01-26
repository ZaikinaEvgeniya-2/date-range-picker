import React, { useEffect, useMemo, useState } from 'react';
import { PropTypes } from 'prop-types';
import { DEFAULT_OPTIONS, EMPTY_OPTION, CUSTOM_OPTION } from './constant';
import { OptionType } from './types';
import { DropdownPicker } from './DropdownPicker';

export const Picker = ({
  options = DEFAULT_OPTIONS,
  onChange,
  value,
  enableEmptySelection = true,
  enableCustomDate = true,
}) => {
  const [selectedOption, setSelectedOption] = useState(value);

  useEffect(() => setSelectedOption(value), [value]);

  const onSelect = (newSelectedOption) => {
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

    return res;
  }, [options, enableEmptySelection, enableCustomDate]);

  return (
    <DropdownPicker
      options={items}
      selectedOption={selectedOption}
      placeholder={EMPTY_OPTION.label}
      onClick={onSelect}
    />
  );
};

Picker.propTypes = {
  options: PropTypes.arrayOf(OptionType),
  onChange: PropTypes.func,
  value: OptionType,
  enableEmptySelection: PropTypes.bool,
  enableCustomDate: PropTypes.bool,
};
