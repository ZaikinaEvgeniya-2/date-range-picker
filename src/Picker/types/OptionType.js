import { PropTypes } from 'prop-types';

export const OptionType = PropTypes.shape({
  key: PropTypes.string.isRequired,
  value: PropTypes.number,
  label: PropTypes.string.isRequired,
});
