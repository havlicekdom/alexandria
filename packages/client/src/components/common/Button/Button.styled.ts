import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';
import {
  primaryColor,
  textColor,
  textColorInverse,
  spacing,
  borderRadius,
} from 'constants/styles';

import { ButtonProps } from './Button';

// Component to remove default button styles
export const Button = styled.button<ButtonProps>`
  border: none;
  margin: 0;
  padding: ${spacing.small};
  width: auto;
  overflow: visible;
  background: transparent;
  color: inherit;
  font: inherit;
  line-height: normal;
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;
  -webkit-appearance: none;
  cursor: pointer;
  border-radius: ${borderRadius.small};

  &::-moz-focus-inner {
    border: 0;
    padding: ${spacing.small};
  }
  ${({ full }) => full && css`
    width: 100%;
  `}
`;

export const ButtonPrimary = styled(Button)`
  transition: all 0.1s ease-in-out;
  background-color: ${primaryColor};
  color: ${textColor};

  &:hover, &:active {
    background-color: ${lighten(0.02, primaryColor)};
    color: ${darken(0.1, textColor)};
  }
`;

export const ButtonLink = styled(Button)`
  color: ${textColor};
  padding: 0;

  &:hover, &:active {
    color: ${darken(0.1, textColor)};
  }
`;

export const ButtonClose = styled(Button)`
  color: ${textColorInverse};
  padding: 0;

  &:hover, &:active {
    color: ${darken(0.1, textColorInverse)};
  }
`;
