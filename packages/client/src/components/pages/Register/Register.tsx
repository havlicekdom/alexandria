import React from 'react';

import RegisterForm from 'components/user/RegisterForm';

import * as S from './Register.styled';

function Register() {
  return (
    <S.RegisterWrapper>
      <RegisterForm />
    </S.RegisterWrapper>
  );
}

export default Register;
