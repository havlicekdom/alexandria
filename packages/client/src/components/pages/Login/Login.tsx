import React from 'react';

import LoginForm from 'components/auth/LoginForm';

import * as S from './Login.styled';

function Login() {
  return (
    <S.LoginWrapper>
      <LoginForm />
    </S.LoginWrapper>
  );
}

export default Login;
