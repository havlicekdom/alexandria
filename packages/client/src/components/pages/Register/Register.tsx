import React from 'react';
import useDocumentTitle from 'hooks/useDocumentTitle';

import RegisterForm from 'components/user/RegisterForm';

import * as S from './Register.styled';

function Register() {
  useDocumentTitle('Register');

  return (
    <S.RegisterWrapper>
      <RegisterForm />
    </S.RegisterWrapper>
  );
}

export default Register;
