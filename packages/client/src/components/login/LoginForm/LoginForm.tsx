import React from 'react';
import { faUser, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import routes from 'constants/routes';
import yup from 'utils/formValidation';
import { useAppDispatch } from 'store/hooks';
import { login } from 'store/auth/authSlice';
import { getUserProfile } from 'store/user/userSlice';
import Icon from 'components/common/Icon';
import FormInput from 'components/common/FormInput';
import {
  Form as FormStyled,
  FormHeader as FormHeaderStyled,
  FormButton as FormButtonStyled,
} from 'components/common/FormPage/FormPage.styled';

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
    await dispatch(getUserProfile(null));
    navigate(from, { replace: true });
  };

  return (
    <FormStyled onSubmit={handleSubmit(onSubmit)}>
      <FormHeaderStyled>
        <Icon icon={faUser} />
        Log in
      </FormHeaderStyled>
      <FormInput data-testid="username" label="Username" fieldName="username" register={register} error={errors?.username} type="text" />
      <FormInput data-testid="password" label="Password" fieldName="password" register={register} error={errors?.password} type="password" />
      <S.LoginFormResetPasswordLink data-testid="reset-password" to={routes.forgottenPassword}>
        Forgot your password?
      </S.LoginFormResetPasswordLink>
      <FormButtonStyled data-testid="submit" name="submit" type="submit" variant="primary" full>
        <Icon icon={faArrowRightToBracket} />
        Log in
      </FormButtonStyled>
      <S.LoginFormRegisterLink data-testid="register" to={routes.register}>
        New to the app? Create your account here.
      </S.LoginFormRegisterLink>
    </FormStyled>
  );
}

export default LoginForm;
