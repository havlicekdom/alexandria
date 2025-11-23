import styled from 'styled-components';
import {
  errorColor,
  infoColor,
  secondaryBackgroundColor,
  spacing,
  successColor,
} from 'constants/styles';

import Button from '../Button';

type SnackbarWrapperProps = {
  $variant: 'error' | 'success' | 'info' | 'default';
  $animationLength: number;
};

const handleBackgroundColor = (color: string) => {
  switch (color) {
    case 'error':
      return errorColor;
    case 'success':
      return successColor;
    case 'info':
      return infoColor;
    case 'default':
      return secondaryBackgroundColor;
    default:
      return '';
  }
};

export const SnackbarWrapper = styled.div<SnackbarWrapperProps>`
  position: fixed;
  bottom: ${spacing.medium};
  right: ${spacing.medium};
  padding: ${spacing.small};
  padding-right: 75px;
  background-color: ${({ $variant }) => handleBackgroundColor($variant)};

  &.snackbar-appear {
    opacity: 0;
    right: -100%;
  }
  &.snackbar-appear-done {
    opacity: 1;
    right: ${spacing.medium};
    transition: opacity ${({ $animationLength }) => $animationLength}ms, right ${({ $animationLength }) => $animationLength}ms;
  }
  &.snackbar-exit {
    opacity: 1;
    right: ${spacing.medium};
  }
  &.snackbar-exit-done {
    opacity: 0;
    right: -100%;
    transition: opacity ${({ $animationLength }) => $animationLength}ms, right ${({ $animationLength }) => $animationLength}ms;
  }
`;

export const SnackbarClose = styled(Button)`
  position: absolute;
  top: 15px;
  right: 15px;
`;
