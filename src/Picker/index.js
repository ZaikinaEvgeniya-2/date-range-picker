import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { PropTypes } from 'prop-types';
import { DEFAULT_OPTIONS, EMPTY_OPTION, CUSTOM_OPTION } from './constant';
import { OptionType } from './types';
import { DropdownPicker } from './DropdownPicker';
import { DateRangePicker } from './DateRangePicker';

export const Picker = ({
  options = DEFAULT_OPTIONS,
  value,
  onChange,
  enableEmptySelection = true,
  enableCustomDate = true,
  ...props
}) => {
  const [selectedOption, setSelectedOption] = useState(value);

  useEffect(() => {
    setSelectedOption(value);
  }, [value?.value]);

  const onSelect = useCallback(
    (newSelectedOption) => {
      setSelectedOption(newSelectedOption);
      onChange && onChange(newSelectedOption?.value, newSelectedOption);
    },
    [onChange]
  );

  const onCustomDateSelect = useCallback(
    (newDateRange) => {
      onSelect({ ...CUSTOM_OPTION, value: newDateRange });
    },
    [onSelect]
  );

  const onClear = useCallback(() => {
    onSelect();
  }, [onSelect]);

  const items = useMemo(() => {
    let res = options;

    if (enableEmptySelection) {
      res = [EMPTY_OPTION, ...res];
    }

    if (enableCustomDate) {
      res = [...res, CUSTOM_OPTION];
    }

    return res;
  }, [enableCustomDate, enableEmptySelection, options]);

  if (selectedOption?.key === CUSTOM_OPTION.key) {
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
  defaultValue: OptionType,
  value: OptionType,
  onChange: PropTypes.func,
  enableEmptySelection: PropTypes.bool,
  enableCustomDate: PropTypes.bool,
};
