import styled, { css } from 'styled-components';
import { lighten } from 'polished';

import {
  errorColor, fontSize, spacing, textColor,
} from 'constants/styles';

type FormElementProps = {
  hasError: boolean;
};

export const FormLabel = styled.label<FormElementProps>`
  display: block;
  margin-bottom: ${spacing.medium};
  font-size: ${fontSize.small};

  &:last-of-type {
    margin-bottom: 0;
  }

  ${({ hasError }) => hasError && css`
    color: ${errorColor};
  `}
`;

export const FormInput = styled.input<FormElementProps>`
  display: block;
  width: 100%;
  background-color: transparent;
  color: ${textColor};
  border: none;
  border-bottom: 1px solid ${lighten(0.2, textColor)};
  padding: ${spacing.tiny};
  font-size: ${fontSize.default};
  margin-top: 5px;

  &:focus {
    border-bottom-color: ${textColor};
    outline: none;
  }

  ${({ hasError }) => hasError && css`
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
