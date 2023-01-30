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
  useDateRangePicker,
  convertStrToDate,
  convertDateToStr,
} from './useDateRangePicker';

export const DateRangePicker = ({
  value,
  maxHoursDiff = MAX_HOURS_DIFF, // does not change the existing date if dynamic change
  onChange,
  showTime = true,
  onClose,
}) => {
  const [startDate, setStartDate] = useState(convertStrToDate(value[0]));
  const [endDate, setEndDate] = useState(convertStrToDate(value[1]));

  useEffect(() => {
    setStartDate(convertStrToDate(value[0]));
    setEndDate(convertStrToDate(value[1]));
  }, [value?.[0], value?.[1]]);

  const {
    disabledStartDate,
    disabledEndDate,

    disabledStartTime,
    disabledEndTime,

    getAvailableStartDate,
    getAvailableEndDate,
  } = useDateRangePicker({ startDate, endDate, maxHoursDiff });

  const onRangeChange = useCallback(
    (startDate, endDate) => {
      if (!onChange || !startDate || !endDate) return;

      onChange([convertDateToStr(startDate), convertDateToStr(endDate)]);
    },
    [onChange]
  );

  const onStartDateChange = useCallback(
    (newStartDate) => {
      const res = getAvailableStartDate(newStartDate);

      setStartDate(res);
      onRangeChange(res, endDate);
    },
    [endDate, onRangeChange, getAvailableStartDate]
  );

  const onEndDateChange = useCallback(
    (newEndDate) => {
      const res = getAvailableEndDate(newEndDate);

      setEndDate(res);
      onRangeChange(startDate, res);
    },
    [getAvailableEndDate, onRangeChange, startDate]
  );

  const onClear = () => {
    setStartDate();
    setEndDate();
    onChange([]);
  };

  return (
    <Container>
      <DatePicker
        placeholder="Start date"
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
        placeholder="End date"
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
  width: fit-content;
  padding: 0 5px;

  .ant-picker {
    border: none;
    border-bottom: 2px solid transparent;
    transition: border-bottom-color 0.3s;

    &:hover,
    &:focus,
    &.ant-picker-focused {
      box-shadow: none;
    }

    &:hover,
    &:focus {
      border-bottom: 2px solid transparent;
    }

    &.ant-picker-focused {
      border-bottom: 2px solid #1890ff;
    }
  }
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
