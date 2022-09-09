import React from 'react';
import { faUser, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import yup from 'utils/formValidation';
import { useAppDispatch } from 'store/hooks';
import { login } from 'store/auth/authSlice';
import { getUserProfile } from 'store/user/userSlice';
import Icon from 'components/common/Icon';
import FormInput from 'components/common/FormInput';

import * as S from './LoginForm.styled';

interface LocationState {
  from: {
    pathname: string;
  };
}

type FormInputs = {
  username: string;
  password: string;
}

const validationSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
}).required();

function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
    resolver: yupResolver(validationSchema),
  });

  const { from } = location.state as LocationState || { from: { pathname: '/' } };

  const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
    await dispatch(login(formData));
    await dispatch(getUserProfile());
    navigate(from, { replace: true });
  };

  return (
    <S.LoginForm onSubmit={handleSubmit(onSubmit)}>
      <S.LoginHeader>
        <Icon icon={faUser} />
        Log in
      </S.LoginHeader>
      <FormInput label="Username" fieldName="username" register={register} error={errors?.username} type="text" />
      <FormInput label="Password" fieldName="password" register={register} error={errors?.password} type="password" />
      <S.LoginFormResetPasswordLink to="/reset-password">
        Forgot your password?
      </S.LoginFormResetPasswordLink>
      <S.LoginFormButton type="submit" variant="primary" full>
        <Icon icon={faArrowRightToBracket} />
        Log in
      </S.LoginFormButton>
      <S.LoginFormRegisterLink to="/register">
        New to the app? Create your account here.
      </S.LoginFormRegisterLink>
    </S.LoginForm>
  );
}

export default LoginForm;
