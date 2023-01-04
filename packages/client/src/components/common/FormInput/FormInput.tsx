/* eslint-disable react/jsx-props-no-spreading */

import React, { useContext } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { ThemeContext } from 'context/ThemeContext';

import * as S from './FormInput.styled';

type FormInputProps = {
  label: string;
  fieldName: string;
  error: FieldError | undefined;
  register: UseFormRegister<any>;
  type: 'text' | 'password' | 'email' | 'number';
  value?: string;
};

function FormInput({
  label, fieldName, error, register, type, ...rest
}: FormInputProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <S.FormLabel hasError={!!error}>
      { label }
      <S.FormInput
        {...register(fieldName)}
        hasError={!!error}
        type={type}
        currentTheme={theme}
        {...rest}
      />
      {error && (
        <S.FormError>
          { error?.message }
        </S.FormError>
      )}
    </S.FormLabel>
  );
}

FormInput.defaultProps = {
  value: undefined,
};

export default FormInput;
