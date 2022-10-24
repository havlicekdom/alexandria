import React from 'react';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import Icon from 'components/common/Icon';
import FormInput from 'components/common/FormInput';
import { useAppDispatch } from 'store/hooks';
import { resetPassword } from 'store/user/userSlice';
import yup from 'utils/formValidation';

import * as S from './ResetPasswordForm.styled';

type FormInputs = {
  email: string;
};

const validationSchema = yup.object({
  email: yup.string().email().required().max(255),
}).required();

function ResetPasswordForm() {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<FormInputs> = (formData) => {
    dispatch(resetPassword(formData));
  };

  return (
    <S.ResetPasswordForm onSubmit={handleSubmit(onSubmit)}>
      <S.ResetPasswordHeader>
        <Icon icon={faKey} />
        Forgotten password?
      </S.ResetPasswordHeader>
      <FormInput data-testid="email" label="Your email" register={register} type="email" fieldName="email" error={errors.email} />
      <S.ResetPasswordFormButton data-testid="submit" name="submit" type="submit" variant="primary" full>
        Generate new password
      </S.ResetPasswordFormButton>
    </S.ResetPasswordForm>
  );
}

export default ResetPasswordForm;
