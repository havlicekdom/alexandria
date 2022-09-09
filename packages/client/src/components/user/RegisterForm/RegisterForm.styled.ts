import styled, { css } from 'styled-components';
import { lighten } from 'polished';
import {
  errorColor,
  fontSize,
  spacing,
  textColor,
} from 'constants/styles';
import Button from 'components/common/Button';

type RegisterFormElementProps = {
  hasError: boolean;
};

export const RegisterHeader = styled.h2`
  text-align: center;
`;

export const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
`;

export const RegisterFormLabel = styled.label<RegisterFormElementProps>`
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

export const RegisterFormInput = styled.input<RegisterFormElementProps>`
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
  `}
`;

export const RegisterFormError = styled.span`
  display: inline-block;
  margin-top: ${spacing.tiny};
  color: ${errorColor};
`;

export const RegisterFormButton = styled(Button)`
  margin-top: ${spacing.medium};
`;
