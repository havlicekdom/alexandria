import React from 'react';

import useDocumentTitle from 'hooks/useDocumentTitle';
import LoginForm from './LoginForm';

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
