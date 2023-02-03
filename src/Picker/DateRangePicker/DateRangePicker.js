import React, { useCallback, useEffect, useRef, useState } from 'react';
import { PropTypes } from 'prop-types';
import {
  DateRangeContainer,
  StartDatePicker,
  EndDatePicker,
  DateRangeControls,
  SeparateIcon,
} from './components';
import { useDateRangeOutsideClick, useDateRangePickerControl } from './hook';
import { convertStrToDate, convertDateToStr } from './utils';
import { MAX_HOURS_DIFF } from '../constant';
import { DateRangeType } from '../types';

export const DateRangePicker = ({
  value,
  maxHoursDiff = MAX_HOURS_DIFF, // does not change the current date if dynamic change
  onChange,
  onClose,
}) => {
  const dateRangePickerRef = useRef(null);
  const startDatePickerRef = useRef(null);
  const endDatePickerRef = useRef(null);

  const initialStartDate = value?.[0];
  const initialEndDate = value?.[1];

  const [startDate, setStartDate] = useState(
    convertStrToDate(initialStartDate)
  );
  const [endDate, setEndDate] = useState(convertStrToDate(initialEndDate));

  useEffect(() => {
    setStartDate(convertStrToDate(initialStartDate));
    setEndDate(convertStrToDate(initialEndDate));
  }, [initialStartDate, initialEndDate]);

  const onSave = useCallback(
    (newStartDate, newEndDate) => {
      if (!onChange || !newStartDate || !newEndDate) return;

      onChange([convertDateToStr(newStartDate), convertDateToStr(newEndDate)]);
    },
    [onChange]
  );

  const onStartDateChange = useCallback(
    (newStartDate) => {
      setStartDate(newStartDate);
      onSave(newStartDate, endDate);
    },
    [endDate, onSave]
  );

  const onEndDateChange = useCallback(
    (newEndDate) => {
      setEndDate(newEndDate);
      onSave(startDate, newEndDate);
    },
    [onSave, startDate]
  );

  const onClear = () => {
    setStartDate();
    setEndDate();
    onSave([]);
  };

  const {
    isStartDatePickerOpen,
    isEndDatePickerOpen,
    onStartDatePickerOpenChange,
    onEndDatePickerOpenChange,
  } = useDateRangePickerControl({
    startDatePickerRef,
    endDatePickerRef,
    startDate,
    endDate,
  });

  const setPrevSavedValues = useCallback(() => {
    if (!startDate && initialStartDate) {
      setStartDate(convertStrToDate(initialStartDate));
    }
    if (!endDate && initialEndDate) {
      setEndDate(convertStrToDate(initialEndDate));
    }
  }, [startDate, endDate, initialStartDate, initialEndDate]);

  useDateRangeOutsideClick(dateRangePickerRef, setPrevSavedValues);

  return (
    <DateRangeContainer ref={dateRangePickerRef}>
      <StartDatePicker
        ref={startDatePickerRef}
        value={startDate}
        onChange={onStartDateChange}
        endDate={endDate}
        maxHoursDiff={maxHoursDiff}
        open={isStartDatePickerOpen}
        onOpenChange={onStartDatePickerOpenChange}
      />

      <SeparateIcon />

      <EndDatePicker
        ref={endDatePickerRef}
        value={endDate}
        onChange={onEndDateChange}
        startDate={startDate}
        maxHoursDiff={maxHoursDiff}
        open={isEndDatePickerOpen}
        onOpenChange={onEndDatePickerOpenChange}
      />

      <DateRangeControls
        clearDisabled={!startDate || !endDate}
        onClear={onClear}
        onClose={onClose}
      />
    </DateRangeContainer>
  );
};

DateRangePicker.propTypes = {
  value: DateRangeType,
  maxHoursDiff: PropTypes.number,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
};
