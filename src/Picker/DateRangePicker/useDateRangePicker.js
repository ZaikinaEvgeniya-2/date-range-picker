import { useCallback } from 'react';
import { PropTypes } from 'prop-types';

import moment from 'moment';
import toString from 'lodash/toString';

export const useDateRangePicker = ({ startDate, endDate, maxHoursDiff }) => {
  const disabledStartDate = useCallback(
    (current) => {
      try {
        if (!current || !endDate) return false;

        // available the same date with diff time
        const currentWithEndTime = setSameTime(current, endDate);

        let isTooEarly = false;
        const isTooLate = endDate.diff(currentWithEndTime, 'hours') < 0;

        if (maxHoursDiff) {
          isTooEarly = endDate.diff(currentWithEndTime, 'hours') > maxHoursDiff;
        }

        return isTooEarly || isTooLate;
      } catch (error) {
        console.error('checkStartDate error: ', error);
        return false;
      }
    },
    [endDate, maxHoursDiff]
  );

  const disabledEndDate = useCallback(
    (current) => {
      try {
        if (!current || !startDate) return false;

        // available the same date with diff time
        const currentWithStartTime = setSameTime(current, startDate);

        const isTooEarly = currentWithStartTime.diff(startDate, 'hours') < 0;
        let isTooLate = false;

        if (maxHoursDiff) {
          isTooLate =
            currentWithStartTime.diff(startDate, 'hours') > maxHoursDiff;
        }

        return isTooEarly || isTooLate;
      } catch (error) {
        console.error('checkEndDate error: ', error);
        return false;
      }
    },
    [startDate, maxHoursDiff]
  );

  const disabledStartTime = useCallback(
    (current) => {
      try {
        if (!current || !endDate) return false;

        const minDate = moment(endDate).clone().subtract(maxHoursDiff, 'hours');

        if (current.isSame(endDate, 'day')) {
          return {
            disabledHours: () => range(0, 24).splice(minDate.hour() + 1, 24),
            disabledMinutes: () =>
              range(0, 60).splice(minDate.minute() + 1, 60),
            disabledSeconds: () => range(0, 60).splice(minDate.second(), 60),
          };
        }

        if (current.isSame(minDate, 'day')) {
          return {
            disabledHours: () => range(0, 24).splice(0, minDate.hour()),
            disabledMinutes: () => range(0, 60).splice(0, minDate.minute()),
            disabledSeconds: () => range(0, 60).splice(0, minDate.second()),
          };
        }

        return false;
      } catch (error) {
        console.error('checkStartTime error: ', error);
        return false;
      }
    },
    [endDate, maxHoursDiff]
  );

  const disabledEndTime = useCallback(
    (current) => {
      try {
        if (!current || !startDate) return false;

        const maxDate = moment(startDate).clone().add(maxHoursDiff, 'hours');

        if (current.isSame(startDate, 'day')) {
          return {
            disabledHours: () => range(0, 24).splice(0, maxDate.hour()),
            disabledMinutes: () => range(0, 60).splice(0, maxDate.minute()),
            disabledSeconds: () => range(0, 60).splice(0, maxDate.second() + 1),
          };
        }

        if (current.isSame(maxDate, 'day')) {
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
        console.error('checkEndTime error: ', error);
        return false;
      }
    },
    [startDate, maxHoursDiff]
  );

  // @TODO: rename
  const startDateLimited = useCallback(
    (newStartDate) => {
      if (!endDate) {
        return newStartDate;
      }

      if (newStartDate.isSame(endDate) || newStartDate.isAfter(endDate)) {
        return moment(endDate).clone().subtract(1, 'second');
      }

      const minDate = moment(endDate).clone().subtract(maxHoursDiff, 'hours');

      if (newStartDate.isSame(minDate) || newStartDate.isBefore(minDate)) {
        return minDate;
      }

      return newStartDate;
    },
    [endDate]
  );

  // @TODO: rename
  const endDateLimited = useCallback(
    (newEndDate) => {
      if (!startDate) {
        return newEndDate;
      }

      if (newEndDate.isSame(startDate) || newEndDate.isBefore(startDate)) {
        return moment(startDate).clone().add(1, 'second');
      }

      const maxDate = moment(startDate).clone().add(maxHoursDiff, 'hours');

      if (newEndDate.isSame(maxDate) || newEndDate.isAfter(maxDate)) {
        return maxDate;
      }

      return newEndDate;
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

const setSameTime = (current, date) => {
  return current
    .clone()
    .set('hour', date.hour())
    .set('minute', date.minute())
    .set('seconds', date.second());
};

const range = (start, end) => {
  const result = new Array(end - start);

  for (let i = start; i < end; i++) {
    result[i] = i;
  }

  return result;
};

export const convertStrToDate = (str) => {
  if (!str) return;
  return moment.unix(Number(str));
};

export const convertDateToStr = (date) => {
  if (!date) return;
  return toString(moment(date).unix());
};
