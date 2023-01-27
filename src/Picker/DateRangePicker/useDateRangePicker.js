import { useCallback } from 'react';
import { PropTypes } from 'prop-types';

import moment from 'moment';
import toString from 'lodash/toString';

export const useDateRangePicker = ({ startDate, endDate, maxHoursDiff }) => {
  const disabledStartDate = useCallback(
    (current) => {
      try {
        if (!current || !endDate) return false;

        let isTooEarly = false;
        const isTooLate = endDate.diff(current, 'hours') < 0;

        if (maxHoursDiff) {
          isTooEarly = endDate.diff(current, 'hours') > maxHoursDiff;
        }

        return isTooEarly || isTooLate;
      } catch (error) {
        console.error('checkStartDate error: ', error);
        return false;
      }
    },
    [endDate]
  );

  const disabledEndDate = useCallback(
    (current) => {
      try {
        if (!current || !startDate) return false;

        const isTooEarly = current.diff(startDate, 'hours') < 0;
        let isTooLate = false;

        if (maxHoursDiff) {
          isTooLate = current.diff(startDate, 'hours') > maxHoursDiff;
        }

        return isTooEarly || isTooLate;
      } catch (error) {
        console.error('checkEndDate error: ', error);
        return false;
      }
    },
    [startDate]
  );

  const disabledStartTime = useCallback(
    (current) => {
      try {
        if (!current || !endDate) return false;
        if (!current.isSame(endDate, 'day')) return false;

        const maxDate = endDate.clone().add(maxHoursDiff, 'hours');

        return {
          disabledHours: () => range(0, 24).splice(maxDate.hour() + 1, 24),
          disabledMinutes: () => range(0, 60).splice(maxDate.minute() + 1, 60),
          disabledSeconds: () => range(0, 60).splice(maxDate.second(), 60),
        };
      } catch (error) {
        console.error('checkStartTime error: ', error);
        return false;
      }
    },
    [endDate]
  );

  const disabledEndTime = useCallback(
    (current) => {
      try {
        if (!current || !startDate) return false;
        if (!current.isSame(startDate, 'day')) return false;

        const minDate = startDate.clone().subtract(maxHoursDiff, 'hours');

        return {
          disabledHours: () => range(0, 24).splice(0, minDate.hour()),
          disabledMinutes: () => range(0, 60).splice(0, minDate.minute()),
          disabledSeconds: () => range(0, 60).splice(0, minDate.second() + 1),
        };
      } catch (error) {
        console.error('checkEndTime error: ', error);
        return false;
      }
    },
    [startDate]
  );

  const startDateLimited = useCallback(
    (newStartDate) => {
      return (
        endDate &&
        (newStartDate.isAfter(endDate) || newStartDate.isSame(endDate))
      );
    },
    [endDate]
  );

  const endDateLimited = useCallback(
    (newEndDate) => {
      return (
        startDate &&
        (newEndDate.isBefore(startDate) || newEndDate.isSame(startDate))
      );
    },
    [startDate]
  );

  const getMaxStartDate = useCallback(() => {
    return endDate.clone().subtract(1, 'second');
  }, [endDate]);

  const getMaxEndDate = useCallback(() => {
    return startDate.clone().add(1, 'second');
  }, [startDate]);

  return {
    disabledStartDate,
    disabledEndDate,

    disabledStartTime,
    disabledEndTime,

    startDateLimited,
    endDateLimited,

    getMaxStartDate,
    getMaxEndDate,
  };
};

useDateRangePicker.propTypes = {
  startDate: PropTypes.object,
  endDate: PropTypes.object,
  maxHoursDiff: PropTypes.number,
};

const range = (start, end) => {
  const result = new Array(end - start);

  for (let i = start; i < end; i++) {
    result[i] = i;
  }

  return result;
};

export const parseStrToDate = (str) => {
  if (!str) return;
  return moment.unix(Number(str));
};

export const parseDateToStr = (date) => {
  if (!date) return;
  return toString(moment(date).unix());
};
