import moment from 'moment';
import toString from 'lodash/toString';

export const range = (start, end) => {
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
