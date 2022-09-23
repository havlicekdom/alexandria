/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';

import * as S from './FormInput.styled';

type FormInputProps = {
  label: string;
  fieldName: string;
  error: FieldError | undefined;
  register: UseFormRegister<any>;
  type: 'text' | 'password' | 'email' | 'number';
};

function FormInput({
  label, fieldName, error, register, type, ...rest
}: FormInputProps) {
  return (
    <S.FormLabel hasError={!!error}>
      { label }
      <S.FormInput
        {...register(fieldName)}
        hasError={!!error}
        type={type}
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

export default FormInput;
