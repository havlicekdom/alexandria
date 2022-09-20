import React from 'react';

import LoginForm from 'components/auth/LoginForm';
import useDocumentTitle from 'hooks/useDocumentTitle';

import * as S from './Login.styled';

function Login() {
  useDocumentTitle('Login');

  return (
    <S.LoginWrapper>
      <LoginForm />
    </S.LoginWrapper>
  );
}

export default Login;
