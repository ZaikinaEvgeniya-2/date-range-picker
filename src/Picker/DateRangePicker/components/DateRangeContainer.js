import styled from 'styled-components';
import { theme } from '../../theme';

export const DateRangeContainer = styled.div`
  display: flex;
  align-items: center;
  border: ${theme.border};
  border-radius: ${theme.borderRadius};
  width: fit-content;

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
      border-bottom: 2px solid ${theme.colors.active};
    }
  }
`;
