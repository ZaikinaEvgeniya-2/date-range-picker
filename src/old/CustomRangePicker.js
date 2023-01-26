import React, { useState, useCallback } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import { PropTypes } from 'prop-types';

const { RangePicker } = DatePicker;

const range = (start, end) => {
  const result = new Array(end - start);
  for (let i = start; i < end; i++) {
    result[i] = i;
  }
  return result;
};

const getDefaultValue = (defaultValue) => {
  try {
    if (!defaultValue || defaultValue.length !== 2) {
      return [null, null];
    }

    return defaultValue.map((item) => {
      return moment.unix(Number(item));
    });
  } catch (e) {
    console.log(e);
  }
  return [null, null];
};

const CustomRangePicker = ({
  onCalendarChange,
  maxHours,
  defaultValue,
  ...props
}) => {
  const [dates, setDates] = useState(getDefaultValue(defaultValue));
  const [value, setValue] = useState(null);

  const disabledDate = useCallback(
    (current) => {
      if (!dates || !maxHours) {
        return false;
      }
      const tooLate = dates[0] && current.diff(dates[0], 'hours') > maxHours;
      const tooEarly = dates[1] && dates[1].diff(current, 'hours') > maxHours;
      return !!tooEarly || !!tooLate;
    },
    [maxHours, dates]
  );

  const disabledTime = useCallback(
    (current, type) => {
      if (!current || !maxHours) {
        return false;
      }

      try {
        if (type === 'end' && dates[0]) {
          const maxDate = dates[0].clone().add(maxHours, 'hours');
          return {
            disabledHours: () => range(0, 24).splice(maxDate.hour() + 1, 24),
            disabledMinutes: () =>
              range(0, 60).splice(maxDate.minute() + 1, 60),
            disabledSeconds: () =>
              range(0, 60).splice(maxDate.second() + 1, 60),
          };
        }

        if (type === 'start' && dates[1]) {
          const minDate = dates[1].clone().subtract(maxHours, 'hours');
          return {
            disabledHours: () => range(0, 24).splice(0, minDate.hour()),
            disabledMinutes: () => range(0, 60).splice(0, minDate.minute()),
            disabledSeconds: () => range(0, 60).splice(0, minDate.second()),
          };
        }
      } catch (e) {
        console.log(e);
      }
    },
    [dates, maxHours]
  );

  // const onOpenChange = useCallback((open) => {
  //   if (open) {
  //     setDates([null, null]);
  //   } else {
  //     setDates(null);
  //   }
  // }, []);

  const onChange = useCallback(
    (val) => {
      if (maxHours) {
        const maxDate = val[0].clone().add(maxHours, 'hours');
        if (!maxDate.isAfter(val[1])) {
          val[1] = maxDate;
        }
      }
      setValue(val);
    },
    [maxHours]
  );

  const onCalChange = useCallback(
    (val) => {
      if (maxHours) {
        const maxDate = val[0].clone().add(maxHours, 'hours');
        if (!maxDate.isAfter(val[1])) {
          val[1] = maxDate;
        }
      }
      setDates(val);
      onCalendarChange(val);
    },
    [onCalendarChange, maxHours]
  );

  return (
    <RangePicker
      defaultValue={dates || value}
      disabledDate={disabledDate}
      onCalendarChange={onCalChange}
      onChange={onChange}
      disabledTime={disabledTime}
      // onOpenChange={onOpenChange}
      {...props}
    />
  );
};

CustomRangePicker.propTypes = {
  onCalendarChange: PropTypes.string,
  maxHours: PropTypes.string,
  defaultValue: PropTypes.string,
};

export default CustomRangePicker;
