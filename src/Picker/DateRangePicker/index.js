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
  checkStartTime,
  checkEndTime,
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

  const disabledStartTime = useCallback(
    (current) => checkStartTime({ current, endDate, maxHoursDiff }),
    [endDate]
  );

  const disabledEndTime = useCallback(
    (current) => checkEndTime({ current, startDate, maxHoursDiff }),
    [startDate]
  );

  const onStartDateChange = useCallback(
    (newStartDate) => {
      let res = newStartDate;

      if (!newStartDate.isBefore(endDate)) {
        res = endDate.clone().subtract(1, 'second');
      }

      setStartDate(res);
      onDateChange(res, endDate);
    },
    [endDate]
  );

  const onEndDateChange = useCallback(
    (newEndDate) => {
      let res = newEndDate;

      if (!newEndDate.isAfter(startDate)) {
        res = startDate.clone().add(1, 'second');
      }

      setEndDate(res);
      onDateChange(startDate, res);
    },
    [startDate]
  );

  const onDateChange = useCallback((startDate, endDate) => {
    if (!onChange || !startDate || !endDate) return;

    onChange([parseDateToStr(startDate), parseDateToStr(endDate)]);
  }, []);

  return (
    <>
      <DatePicker
        value={startDate}
        onChange={onStartDateChange}
        disabledDate={disabledStartDate}
        disabledTime={disabledStartTime}
        showTime={showTime}
        showNow={false}
        allowClear={false}
      />
      <DatePicker
        value={endDate}
        onChange={onEndDateChange}
        disabledDate={disabledEndDate}
        disabledTime={disabledEndTime}
        showTime={showTime}
        showNow={false}
        allowClear={false}
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
