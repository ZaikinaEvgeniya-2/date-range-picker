import { useCallback, useEffect, useState } from 'react';

export const START_DATE_PICKER_TYPE = 'startDatePicker';
export const END_DATE_PICKER_TYPE = 'endDatePicker';

export const useDateRangePickerControl = ({
  startDatePickerRef,
  endDatePickerRef,
  startDate,
  endDate,
}) => {
  const [openType, setOpenType] = useState();

  const openStartPicker = useCallback(() => {
    setOpenType(START_DATE_PICKER_TYPE);
    startDatePickerRef?.current?.focus();
  }, [startDatePickerRef]);

  const closeStartPicker = useCallback(() => {
    setOpenType();
    startDatePickerRef?.current?.blur();
  }, [startDatePickerRef]);

  const openEndPicker = useCallback(() => {
    setOpenType(END_DATE_PICKER_TYPE);
    endDatePickerRef?.current?.focus();
  }, [endDatePickerRef]);

  const closeEndPicker = useCallback(() => {
    setOpenType();
    endDatePickerRef?.current?.blur();
  }, [endDatePickerRef]);

  useEffect(() => {
    if (!startDate) {
      return openStartPicker();
    }

    if (!endDate) {
      openEndPicker();
    }
  }, [endDate, startDate, openStartPicker, openEndPicker]);

  const onStartDatePickerOpenChange = useCallback(
    (open) => (open ? openStartPicker() : closeStartPicker()),
    [openStartPicker, closeStartPicker]
  );

  const onEndDatePickerOpenChange = useCallback(
    (open) => (open ? openEndPicker() : closeEndPicker()),
    [openEndPicker, closeEndPicker]
  );

  return {
    isStartDatePickerOpen: openType === START_DATE_PICKER_TYPE,
    isEndDatePickerOpen: openType === END_DATE_PICKER_TYPE,

    onStartDatePickerOpenChange,
    onEndDatePickerOpenChange,
  };
};
