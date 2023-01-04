import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';
import {
  primaryColor,
  textColor,
  textColorInverse,
  spacing,
  borderRadius,
  backgroundColor,
} from 'constants/styles';
import { ComponentWithTheme } from 'types/styled';
import { isDarkTheme } from 'utils/styles';

import { ButtonProps } from './Button';

// Component to remove default button styles
export const Button = styled.button<ButtonProps & ComponentWithTheme>`
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
  color: ${({ currentTheme }) => isDarkTheme(currentTheme) ? textColor(currentTheme) : backgroundColor(currentTheme)};

  &:hover, &:active {
    background-color: ${lighten(0.02, primaryColor)};
    color: ${({ currentTheme }) => isDarkTheme(currentTheme) ? darken(0.1, textColor(currentTheme)) : backgroundColor(currentTheme)};
  }
`;

export const ButtonLink = styled(Button)`
  color: ${({ currentTheme }) => textColor(currentTheme)};
  padding: 0;

  &:hover, &:active {
    color: ${({ currentTheme }) => darken(0.1, textColor(currentTheme))};
  }
`;

export const ButtonClose = styled(Button)`
  color: ${({ currentTheme }) => textColorInverse(currentTheme)};
  padding: 0;

  &:hover, &:active {
    color: ${({ currentTheme }) => darken(0.1, textColorInverse(currentTheme))};
  }
`;
