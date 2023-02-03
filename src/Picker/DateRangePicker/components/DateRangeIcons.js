import React from 'react';
import { PropTypes } from 'prop-types';
import {
  CalendarOutlined,
  CloseCircleOutlined,
  CloseOutlined,
  SwapRightOutlined,
} from '@ant-design/icons';
import { theme } from '../../theme';

const withAntIcon = (AntIcon) => {
  const Icon = ({ className, onClick }) => {
    return (
      <AntIcon
        style={{ color: theme.colors.icon }}
        className={className}
        onClick={onClick}
      />
    );
  };

  Icon.propTypes = {
    className: PropTypes.string, // styled working only if className passed to DOM
    onClick: PropTypes.func,
  };

  return Icon;
};

export const SeparateIcon = withAntIcon(SwapRightOutlined);
export const CalendarIcon = withAntIcon(CalendarOutlined);
export const ClearIcon = withAntIcon(CloseCircleOutlined);
export const CloseIcon = withAntIcon(CloseOutlined);
