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
  const [selectedOption, setSelectedOption] = useState(value || defaultValue);

  useEffect(() => {
    setSelectedOption(value || defaultValue);
  }, [value, defaultValue]);

  const onSave = useCallback(
    (newSelectedOption) => {
      if (
        !onChange ||
        !newSelectedOption?.value ||
        isCustomRangeEmptyValue(newSelectedOption)
      ) {
        return;
      }

      onChange(newSelectedOption.value, newSelectedOption);
    },
    [onChange]
  );

  const onSelect = useCallback(
    (newSelectedOption) => {
      setSelectedOption(newSelectedOption);
      onSave(newSelectedOption);
    },
    [onSave]
  );

  const onCustomDateSelect = useCallback(
    (newDateRange) => {
      onSelect({ ...CUSTOM_OPTION, value: newDateRange });
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

const isCustomRangeEmptyValue = (newSelectedOption) => {
  return (
    newSelectedOption?.key === CUSTOM_OPTION.key &&
    newSelectedOption?.value?.length !== 2
  );
};
