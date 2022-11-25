/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { useParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import Icon from 'components/common/Icon';
import FormInput from 'components/common/FormInput';
import {
  Form as FormStyled,
  FormHeader as FormHeaderStyled,
  FormButton as FormButtonStyled,
} from 'components/common/FormPage/FormPage.styled';
import { useAppDispatch } from 'store/hooks';
import { resetPassword } from 'store/user/userSlice';
import { formValidation as translations } from 'translations';
import yup from 'utils/formValidation';

type FormInputs = {
  id: string;
  password: string;
  confirmPassword: string;
};

const validationSchema = yup.object({
  id: yup.string().required(),
  password: yup.string().required().max(255),
  confirmPassword: yup.string().required().oneOf([yup.ref('password'), null], translations.passwordsDontMatch).max(255),
}).required();

function ResetPasswordForm() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<FormInputs> = (formData) => {
    dispatch(resetPassword(formData));
  };

  return (
    <FormStyled onSubmit={handleSubmit(onSubmit)}>
      <FormHeaderStyled>
        <Icon icon={faKey} />
        Set your new password
      </FormHeaderStyled>
      <input data-testid="id" type="hidden" value={id} {...register('id')} />
      <FormInput data-testid="password" label="New password" register={register} type="password" fieldName="password" error={errors.password} />
      <FormInput data-testid="confirm-password" label="Confirm your new password" register={register} type="password" fieldName="confirmPassword" error={errors.confirmPassword} />
      <FormButtonStyled data-testid="submit" name="submit" type="submit" variant="primary" full>
        Save password
      </FormButtonStyled>
    </FormStyled>
  );
}

export default ResetPasswordForm;
