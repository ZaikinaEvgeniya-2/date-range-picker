import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { PropTypes } from 'prop-types';
import { DEFAULT_OPTIONS, CUSTOM_OPTION } from './constant';
import { OptionType } from './types';
import { DropdownPicker } from './DropdownPicker';
import { DateRangePicker } from './DateRangePicker';

export const Picker = ({
  options = DEFAULT_OPTIONS,
  defaultValue,
  value,
  onChange,
  enableCustomDate = true,
  ...props
}) => {
  const initialOption = value || defaultValue;

  const [selectedOption, setSelectedOption] = useState(initialOption);

  useEffect(() => {
    setSelectedOption(initialOption);
  }, [initialOption]); // triggers an extra renders

  const onSave = useCallback(
    (option) => {
      if (!onChange || isEmptyOptionValue(option)) return;

      onChange(option.value, option);
    },
    [onChange]
  );

  const onSelect = useCallback(
    (option) => {
      setSelectedOption(option);
      onSave(option);
    },
    [onSave]
  );

  const onCustomDateSelect = useCallback(
    (dateRange) => {
      onSelect({ ...CUSTOM_OPTION, value: dateRange });
    },
    [onSelect]
  );

  const onClear = useCallback(() => {
    onSelect(defaultValue);
  }, [onSelect, defaultValue]);

  const items = useMemo(() => {
    let res = options;

    if (enableCustomDate) {
      res = [...res, CUSTOM_OPTION];
    }

    return res;
  }, [enableCustomDate, options]);

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

function isEmptyOptionValue(option) {
  if (option?.key === CUSTOM_OPTION.key) {
    return option?.value?.length !== 2;
  }

  return !option?.value;
}
