import React, { useCallback, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { DatePicker } from 'antd';
import styled from 'styled-components';
import {
  SwapRightOutlined,
  CalendarOutlined,
  CloseCircleOutlined,
  CloseOutlined,
} from '@ant-design/icons';
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
  onClose,
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

      if (endDate && newStartDate.isAfter(endDate)) {
        const minDate = endDate.clone().subtract(1, 'second');
        res = minDate;
      }

      setStartDate(res);
      onDateChange(res, endDate);
    },
    [endDate]
  );

  const onEndDateChange = useCallback(
    (newEndDate) => {
      let res = newEndDate;

      if (startDate && newEndDate.isBefore(startDate)) {
        const maxDate = startDate.clone().add(1, 'second');
        res = maxDate;
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

  const onClear = () => {
    setStartDate();
    setEndDate();
  };

  return (
    <Container>
      <DatePicker
        value={startDate}
        onChange={onStartDateChange}
        disabledDate={disabledStartDate}
        disabledTime={disabledStartTime}
        showTime={showTime}
        showNow={false}
        allowClear={false}
        suffixIcon={false}
      />
      <SwapRightOutlined style={iconStyle} />
      <DatePicker
        value={endDate}
        onChange={onEndDateChange}
        disabledDate={disabledEndDate}
        disabledTime={disabledEndTime}
        showTime={showTime}
        showNow={false}
        allowClear={false}
        suffixIcon={false}
      />

      <PickerButtons>
        <CalendarOutlined style={iconStyle} />
        {startDate || endDate ? (
          <ClearButton onClick={onClear} style={iconStyle} />
        ) : null}
      </PickerButtons>

      {onClose ? <CloseOutlined style={iconStyle} onClick={onClose} /> : null}
    </Container>
  );
};

DateRangePicker.propTypes = {
  value: DateRangeType,
  maxHoursDiff: PropTypes.number,
  onChange: PropTypes.func,
  showTime: PropTypes.bool,
  onClose: PropTypes.func,
};

const iconStyle = { color: '#bfbfbf' };

const Container = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid rgba(2, 9, 28, 0.28);
  border-radius: 4px;
  padding: 0;
`;

const PickerButtons = styled.div`
  position: relative;
  margin: 0 5px;
`;

const ClearButton = styled(CloseCircleOutlined)`
  position: absolute;
  top: 50%;
  right: 0;
  color: rgba(0, 0, 0, 0.25);
  line-height: 1;
  background: #fff;
  transform: translateY(-50%);
  opacity: 0;
  transition: opacity 0.3s, color 0.3s;

  &:hover {
    opacity: 1;
    color: black;
  }
`;
