import styled, { css } from 'styled-components';
import { lighten } from 'polished';
import {
  borderRadius,
  errorColor, fontSize, fontWeight, infoColor, primaryColor, spacing, successColor, textColor,
} from 'constants/styles';
import { PillVariant } from './Pill';

type PillProps = {
  variant?: PillVariant;
};

const decidePillColor = (variant?: PillVariant) => {
  switch (variant) {
    case 'primary':
      return primaryColor;

    case 'success':
      return successColor;

    case 'info':
      return infoColor;

    case 'error':
      return errorColor;

    default:
      return textColor;
  }
};

export const Pill = styled.div<PillProps>`
  display: inline-block;
  font-size: ${fontSize.medium};
  font-weight: ${fontWeight.bold};
  border-radius: ${borderRadius.tiny};
  padding: ${spacing.tiny};
  background-color: ${({ variant }) => decidePillColor(variant)};

  ${({ variant }) => variant === 'default' ? css`
    color: ${lighten(0.1, '#000')};
  ` : ''}

  & + & {
    margin-left: ${spacing.tiny};
  }
`;
