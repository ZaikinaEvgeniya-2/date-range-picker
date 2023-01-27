import moment from 'moment';
import { toString } from 'lodash';

export const parseStrToDate = (str) => {
  if (!str) return;
  return moment.unix(Number(str));
};

export const parseDateToStr = (date) => {
  if (!date) return;
  return toString(moment(date).unix());
};

export const checkStartDate = ({ current, endDate, maxHoursDiff }) => {
  if (!endDate) return false;

  let isTooEarly = false;
  const isTooLate = endDate.diff(current, 'hours') < 0;

  if (maxHoursDiff) {
    isTooEarly = endDate.diff(current, 'hours') > maxHoursDiff;
  }

  return isTooEarly || isTooLate;
};

export const checkEndDate = ({ current, startDate, maxHoursDiff }) => {
  if (!startDate) return false;

  const isTooEarly = current.diff(startDate, 'hours') < 0;
  let isTooLate = false;

  if (maxHoursDiff) {
    isTooLate = current.diff(startDate, 'hours') > maxHoursDiff;
  }

  return isTooEarly || isTooLate;
};
