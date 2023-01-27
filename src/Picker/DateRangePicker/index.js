import React, { useCallback, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { DatePicker } from 'antd';
import { MAX_HOURS_DIFF } from '../constant';
import { DateRangeType } from '../types';
import {
  parseStrToDate,
  parseDateToStr,
  checkStartDate,
  checkEndDate,
} from './utils';

export const DateRangePicker = ({
  value,
  maxHoursDiff = MAX_HOURS_DIFF, // does not change the existing date if dynamic change
  onChange,
  showTime = true,
}) => {
  const [startDate, setStartDate] = useState(parseStrToDate(value[0]));
  const [endDate, setEndDate] = useState(parseStrToDate(value[1]));

  useEffect(() => {
    setStartDate(parseStrToDate(value[0]));
    setEndDate(parseStrToDate(value[1]));
  }, [value]);

  const disabledStartDate = useCallback(
    (current) => checkStartDate({ current, endDate, maxHoursDiff }),
    [endDate]
  );

  const disabledEndDate = useCallback(
    (current) => checkEndDate({ current, startDate, maxHoursDiff }),
    [startDate]
  );

  const onStartDateChange = (newStartDate) => {
    setStartDate(newStartDate);
    onDateChange(newStartDate, endDate);
  };

  const onEndDateChange = (newEndDate) => {
    setEndDate(newEndDate);
    onDateChange(startDate, newEndDate);
  };

  const onDateChange = (startDate, endDate) => {
    if (!onChange || !startDate || !endDate) return;

    onChange([parseDateToStr(startDate), parseDateToStr(endDate)]);
  };

  return (
    <>
      <DatePicker
        disabledDate={disabledStartDate}
        onChange={onStartDateChange}
        value={startDate}
        showTime={showTime}
        showNow={false}
      />
      <DatePicker
        disabledDate={disabledEndDate}
        onChange={onEndDateChange}
        value={endDate}
        showTime={showTime}
        showNow={false}
      />
    </>
  );
};

DateRangePicker.propTypes = {
  value: DateRangeType,
  maxHoursDiff: PropTypes.number,
  onChange: PropTypes.func,
  showTime: PropTypes.bool,
};
