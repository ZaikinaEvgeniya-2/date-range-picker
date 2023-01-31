import React, { useCallback, useEffect, useRef, useState } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import {
  SwapRightOutlined,
  CalendarOutlined,
  CloseCircleOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { MAX_HOURS_DIFF } from '../constant';
import { DateRangeType } from '../types';
import { convertStrToDate, convertDateToStr } from './utils';
import { StartDatePicker } from './StartDatePicker';
import { EndDatePicker } from './EndDatePicker';
import { useDateRangeOutsideClick } from './useDateRangeOutsideClick';

export const DateRangePicker = ({
  value,
  maxHoursDiff = MAX_HOURS_DIFF, // does not change the existing date if dynamic change
  onChange,
  onClose,
}) => {
  const dateRangePickerRef = useRef(null);

  const defaultStartDate = value?.[0];
  const defaultEndDate = value?.[1];

  const [startDate, setStartDate] = useState(
    convertStrToDate(defaultStartDate)
  );
  const [endDate, setEndDate] = useState(convertStrToDate(defaultEndDate));

  useEffect(() => {
    setStartDate(convertStrToDate(defaultStartDate));
    setEndDate(convertStrToDate(defaultEndDate));
  }, [defaultStartDate, defaultEndDate]);

  const onRangeChange = useCallback(
    (newStartDate, newEndDate) => {
      if (!onChange || !newStartDate || !newEndDate) return;

      onChange([convertDateToStr(newStartDate), convertDateToStr(newEndDate)]);
    },
    [onChange]
  );

  const onStartDateChange = useCallback(
    (newStartDate) => {
      setStartDate(newStartDate);
      onRangeChange(newStartDate, endDate);
    },
    [endDate, onRangeChange]
  );

  const onEndDateChange = useCallback(
    (newEndDate) => {
      setEndDate(newEndDate);
      onRangeChange(startDate, newEndDate);
    },
    [onRangeChange, startDate]
  );

  const onClear = () => {
    setStartDate();
    setEndDate();
    onRangeChange([]);
  };

  const returnPrevValue = useCallback(() => {
    if (!startDate && !endDate && defaultStartDate && defaultEndDate) {
      setStartDate(convertStrToDate(defaultStartDate));
      setEndDate(convertStrToDate(defaultEndDate));
    }
  }, [startDate, endDate, defaultStartDate, defaultEndDate]);

  useDateRangeOutsideClick(dateRangePickerRef, returnPrevValue);

  return (
    <Container ref={dateRangePickerRef}>
      <StartDatePicker
        value={startDate}
        onChange={onStartDateChange}
        endDate={endDate}
        maxHoursDiff={maxHoursDiff}
      />
      <SwapRightOutlined style={iconStyle} />
      <EndDatePicker
        value={endDate}
        onChange={onEndDateChange}
        startDate={startDate}
        maxHoursDiff={maxHoursDiff}
      />

      <PickerButtons>
        <CalendarOutlined style={iconStyle} />
        {startDate && endDate ? (
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
