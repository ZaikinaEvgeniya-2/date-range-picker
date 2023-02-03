import React, { forwardRef, useCallback, useMemo } from 'react';
import { PropTypes } from 'prop-types';
import { DatePicker } from 'antd';
import moment from 'moment';
import { range } from './utils';

export const StartDatePicker = forwardRef(
  ({ value, onChange, endDate, maxHoursDiff, open, onOpenChange }, ref) => {
    const minDate = useMemo(() => {
      if (!endDate || !maxHoursDiff) return;

      return moment(endDate).clone().subtract(maxHoursDiff, 'hours');
    }, [endDate, maxHoursDiff]);

    const disabledDate = useCallback(
      (current) => {
        try {
          if (!current) return false;

          let isTooEarly = minDate ? current.isBefore(minDate, 'day') : false;
          let isTooLate = endDate ? current.isAfter(endDate, 'day') : false;

          return isTooEarly || isTooLate;
        } catch (error) {
          console.error('StartDatePicker disabledDate error: ', error);
        }
      },
      [endDate, minDate]
    );

    const disabledTime = useCallback(
      (current) => {
        try {
          if (!current) return false;

          if (minDate && current.isSame(minDate, 'day')) {
            return {
              disabledHours: () => range(0, 24).splice(0, minDate.hour()),
              disabledMinutes: () => range(0, 60).splice(0, minDate.minute()),
              disabledSeconds: () => range(0, 60).splice(0, minDate.second()),
            };
          }

          if (endDate && current.isSame(endDate, 'day')) {
            return {
              disabledHours: () => range(0, 24).splice(endDate.hour() + 1, 24),
              disabledMinutes: () =>
                range(0, 60).splice(endDate.minute() + 1, 60),
              disabledSeconds: () => range(0, 60).splice(endDate.second(), 60),
            };
          }

          return false;
        } catch (error) {
          console.error('StartDatePicker disabledTime error: ', error);
        }
      },
      [endDate, minDate]
    );

    const getAvailableStartDate = useCallback(
      (current) => {
        try {
          if (!current) {
            return current;
          }

          if (
            minDate &&
            (current.isSame(minDate) || current.isBefore(minDate))
          ) {
            return minDate;
          }

          if (
            endDate &&
            (current.isSame(endDate) || current.isAfter(endDate))
          ) {
            return moment(endDate).clone().subtract(1, 'second');
          }

          return current;
        } catch (error) {
          console.error('StartDatePicker getAvailableStartDate error: ', error);
          return;
        }
      },
      [endDate, minDate]
    );

    const onStartDateChange = useCallback(
      (newStartDate) => {
        onChange && onChange(getAvailableStartDate(newStartDate));
      },
      [getAvailableStartDate, onChange]
    );

    return (
      <DatePicker
        ref={ref}
        placeholder="Start date"
        value={value}
        onChange={onStartDateChange}
        disabledDate={disabledDate}
        disabledTime={disabledTime}
        open={open}
        onOpenChange={onOpenChange}
        showTime
        showNow={false}
        allowClear={false}
        suffixIcon={false}
      />
    );
  }
);

StartDatePicker.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
  endDate: PropTypes.object,
  maxHoursDiff: PropTypes.number,
  open: PropTypes.bool,
  onOpenChange: PropTypes.func,
};

StartDatePicker.displayName = 'StartDatePicker';
