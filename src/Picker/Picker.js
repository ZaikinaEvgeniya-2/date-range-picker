import React, { useEffect, useMemo, useState } from 'react';
import { PropTypes } from 'prop-types';
import { DEFAULT_OPTIONS, EMPTY_OPTION, CUSTOM_OPTION } from './constant';
import { OptionType } from './types';
import { DropdownPicker } from './DropdownPicker';
import { DateRangePicker } from './DateRangePicker';

export const Picker = ({
  options = DEFAULT_OPTIONS,
  onChange,
  value,
  enableEmptySelection = true,
  enableCustomDate = true,
  ...props
}) => {
  const [selectedOption, setSelectedOption] = useState(value);

  useEffect(() => setSelectedOption(value), [value]);

  const onSelect = (newSelectedOption) => {
    setSelectedOption(newSelectedOption);
    onChange && onChange(newSelectedOption?.value, newSelectedOption);
  };

  const onCustomDateSelect = (dateRange) => {
    onSelect({ ...CUSTOM_OPTION, value: dateRange });
  };

  const onClear = () => {
    onSelect();
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

  const isCustomDate = useMemo(
    () => selectedOption?.key === CUSTOM_OPTION.key,
    [selectedOption]
  );

  if (isCustomDate) {
    return (
      <DateRangePicker
        value={selectedOption?.value}
        onChange={onCustomDateSelect}
        onClose={onClear}
        {...props}
      />
    );
  }

  return (
    <DropdownPicker
      options={items}
      selectedOption={selectedOption}
      placeholder={EMPTY_OPTION.label}
      onSelect={onSelect}
    />
  );
};

Picker.propTypes = {
  options: PropTypes.arrayOf(OptionType),
  value: OptionType,
  onChange: PropTypes.func,
  enableEmptySelection: PropTypes.bool,
  enableCustomDate: PropTypes.bool,
};
