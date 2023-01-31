import React, { useCallback, useMemo } from 'react';
import { PropTypes } from 'prop-types';
import { DatePicker } from 'antd';
import moment from 'moment';
import { range } from './utils';

export const EndDatePicker = ({ value, onChange, startDate, maxHoursDiff }) => {
  const maxDate = useMemo(() => {
    if (!startDate || !maxHoursDiff) return;

    return moment(startDate).clone().add(maxHoursDiff, 'hours');
  }, [startDate, maxHoursDiff]);

  const disabledDate = useCallback(
    (current) => {
      try {
        if (!current) return false;

        let isTooEarly = startDate ? current.isBefore(startDate, 'day') : false;
        let isTooLate = maxDate ? current.isAfter(maxDate, 'day') : false;

        return isTooEarly || isTooLate;
      } catch (error) {
        console.error('EndDatePicker disabledDate error: ', error);
      }
    },
    [startDate, maxDate]
  );

  const disabledTime = useCallback(
    (current) => {
      try {
        if (!current) return false;

        if (startDate && current.isSame(startDate, 'day')) {
          return {
            disabledHours: () => range(0, 24).splice(0, startDate.hour()),
            disabledMinutes: () => range(0, 60).splice(0, startDate.minute()),
            disabledSeconds: () =>
              range(0, 60).splice(0, startDate.second() + 1),
          };
        }

        if (maxDate && current.isSame(maxDate, 'day')) {
          return {
            disabledHours: () => range(0, 24).splice(maxDate.hour() + 1, 24),
            disabledMinutes: () =>
              range(0, 60).splice(maxDate.minute() + 1, 60),
            disabledSeconds: () =>
              range(0, 60).splice(maxDate.second() + 1, 60),
          };
        }

        return false;
      } catch (error) {
        console.error('EndDatePicker disabledTime error: ', error);
      }
    },
    [startDate, maxDate]
  );

  const getAvailableEndDate = useCallback(
    (current) => {
      try {
        if (!current) return;

        if (
          startDate &&
          (current.isSame(startDate) || current.isBefore(startDate))
        ) {
          return moment(startDate).clone().add(1, 'second');
        }

        if (maxDate && (current.isSame(maxDate) || current.isAfter(maxDate))) {
          return maxDate;
        }

        return current;
      } catch (error) {
        console.error('EndDatePicker getAvailableEndDate error: ', error);
        return;
      }
    },
    [startDate, maxDate]
  );

  const onEndDateChange = useCallback(
    (newEndDate) => {
      onChange && onChange(getAvailableEndDate(newEndDate));
    },
    [getAvailableEndDate, onChange]
  );

  return (
    <DatePicker
      placeholder="End date"
      value={value}
      onChange={onEndDateChange}
      disabledDate={disabledDate}
      disabledTime={disabledTime}
      showTime
      showNow={false}
      allowClear={false}
      suffixIcon={false}
    />
  );
};

EndDatePicker.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
  startDate: PropTypes.object,
  maxHoursDiff: PropTypes.number,
};
