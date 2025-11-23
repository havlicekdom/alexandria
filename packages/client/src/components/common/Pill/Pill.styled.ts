import styled, { css } from 'styled-components';
import { darken } from 'polished';
import {
  backgroundColor,
  borderRadius,
  errorColor,
  fontSize,
  fontWeight,
  infoColor,
  primaryColor,
  spacing,
  successColor,
  textColor,
  textColorInverse,
  ThemeVariants,
} from 'constants/styles';
import { isDarkTheme } from 'utils/styles';
import { PillVariant } from './Pill';

type PillProps = {
  $currentTheme: ThemeVariants;
  $variant?: PillVariant;
};

const decidePillColor = ($currentTheme: ThemeVariants, $variant?: PillVariant) => {
  switch ($variant) {
    case 'primary':
      return primaryColor;

    case 'success':
      return successColor;

    case 'info':
      return infoColor;

    case 'error':
      return errorColor;

    default:
      return textColor($currentTheme);
  }
};

export const Pill = styled.div<PillProps>`
  display: inline-block;
  font-size: ${fontSize.medium};
  font-weight: ${fontWeight.bold};
  border-radius: ${borderRadius.tiny};
  padding: ${spacing.tiny};
  background-color: ${({ $currentTheme, $variant }) => decidePillColor($currentTheme, $variant)};
  color: ${({ $currentTheme }) => isDarkTheme($currentTheme) ? textColor($currentTheme) : backgroundColor($currentTheme)};

  ${({ $currentTheme, $variant }) => $variant === 'default' ? css`
    color: ${textColorInverse($currentTheme)};
  ` : ''}

  & + & {
    margin-left: ${spacing.tiny};
  }

  a {
    ${({ $currentTheme }) => !isDarkTheme($currentTheme) ? css`
      color: ${backgroundColor($currentTheme)};

      &:hover {
        color: ${darken(0.1, backgroundColor($currentTheme))};
      }
    ` : ''}
  }
`;
