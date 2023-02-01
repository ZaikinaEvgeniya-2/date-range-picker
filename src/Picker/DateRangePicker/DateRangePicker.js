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
import { useDateRangeOutsideClick, useDateRangePickerControl } from './hooks';

export const DateRangePicker = ({
  value,
  maxHoursDiff = MAX_HOURS_DIFF, // does not change the existing date if dynamic change
  onChange,
  onClose,
}) => {
  const dateRangePickerRef = useRef(null);
  const startDatePickerRef = useRef(null);
  const endDatePickerRef = useRef(null);

  const initialStartDate = value?.[0];
  const initialEndDate = value?.[1];

  const [startDate, setStartDate] = useState(
    convertStrToDate(initialStartDate)
  );
  const [endDate, setEndDate] = useState(convertStrToDate(initialEndDate));

  useEffect(() => {
    setStartDate(convertStrToDate(initialStartDate));
    setEndDate(convertStrToDate(initialEndDate));
  }, [initialStartDate, initialEndDate]);

  const onSave = useCallback(
    (newStartDate, newEndDate) => {
      if (!onChange || !newStartDate || !newEndDate) return;

      onChange([convertDateToStr(newStartDate), convertDateToStr(newEndDate)]);
    },
    [onChange]
  );

  const onStartDateChange = useCallback(
    (newStartDate) => {
      setStartDate(newStartDate);
      onSave(newStartDate, endDate);
    },
    [endDate, onSave]
  );

  const onEndDateChange = useCallback(
    (newEndDate) => {
      setEndDate(newEndDate);
      onSave(startDate, newEndDate);
    },
    [onSave, startDate]
  );

  const onClear = () => {
    setStartDate();
    setEndDate();
    onSave([]);
  };

  const {
    isStartDatePickerOpen,
    isEndDatePickerOpen,
    onStartDatePickerOpenChange,
    onEndDatePickerOpenChange,
  } = useDateRangePickerControl({
    startDatePickerRef,
    endDatePickerRef,
    startDate,
    endDate,
  });

  const setPrevSavedValues = useCallback(() => {
    if (!startDate && initialStartDate) {
      setStartDate(convertStrToDate(initialStartDate));
    }
    if (!endDate && initialEndDate) {
      setEndDate(convertStrToDate(initialEndDate));
    }
  }, [startDate, endDate, initialStartDate, initialEndDate]);

  useDateRangeOutsideClick(dateRangePickerRef, setPrevSavedValues);

  return (
    <Container ref={dateRangePickerRef}>
      <StartDatePicker
        ref={startDatePickerRef}
        value={startDate}
        onChange={onStartDateChange}
        endDate={endDate}
        maxHoursDiff={maxHoursDiff}
        open={isStartDatePickerOpen}
        onOpenChange={onStartDatePickerOpenChange}
      />

      <SwapRightOutlined style={iconStyle} />

      <EndDatePicker
        ref={endDatePickerRef}
        value={endDate}
        onChange={onEndDateChange}
        startDate={startDate}
        maxHoursDiff={maxHoursDiff}
        open={isEndDatePickerOpen}
        onOpenChange={onEndDatePickerOpenChange}
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
