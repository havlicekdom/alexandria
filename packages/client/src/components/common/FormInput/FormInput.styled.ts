import styled, { css } from 'styled-components';
import { lighten } from 'polished';

import {
  errorColor, fontSize, secondaryBackgroundColor, spacing, textColor,
} from 'constants/styles';
import { ComponentWithTheme } from 'types/styled';

type FormElementProps = {
  $hasError: boolean;
};

export const FormLabel = styled.label<FormElementProps>`
  display: block;
  margin-bottom: ${spacing.medium};
  font-size: ${fontSize.small};

  &:last-of-type {
    margin-bottom: 0;
  }

  ${({ $hasError }) => $hasError && css`
    color: ${errorColor};
  `}
`;

export const FormInput = styled.input<FormElementProps & ComponentWithTheme>`
  display: block;
  width: 100%;
  background-color: transparent;
  color: ${({ $currentTheme }) => textColor($currentTheme)};
  border: none;
  border-bottom: 1px solid ${({ $currentTheme }) => lighten(0.2, textColor($currentTheme))};
  padding: ${spacing.tiny};
  font-size: ${fontSize.default};
  margin-top: 5px;

  &:focus {
    border-bottom-color: ${({ $currentTheme }) => textColor($currentTheme)};
    outline: none;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    border-bottom: 1px solid ${({ $currentTheme }) => lighten(0.2, textColor($currentTheme))};
    -webkit-text-fill-color: ${({ $currentTheme }) => textColor($currentTheme)};
    -webkit-box-shadow: 0 0 0px 1000px ${secondaryBackgroundColor} inset;
    transition: background-color 5000s ease-in-out 0s;
  }

  ${({ $hasError }) => $hasError && css`
    border-bottom-color: ${errorColor};
    color: ${errorColor};

    &:focus {
      border-bottom-color: ${errorColor};
    }
  `}
`;

export const FormError = styled.span`
  display: inline-block;
  margin-top: ${spacing.tiny};
  color: ${errorColor};
`;
