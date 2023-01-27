import { PropTypes } from 'prop-types';
import { DateRangeType } from './DateRangeType';

export const OptionType = PropTypes.shape({
  key: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, DateRangeType]),
  label: PropTypes.string.isRequired,
});
