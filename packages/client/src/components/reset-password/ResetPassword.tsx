import React from 'react';
import useDocumentTitle from 'hooks/useDocumentTitle';
import ResetPasswordForm from './ResetPasswordForm';

import * as S from './ResetPassword.styled';

function ResetPassword() {
  useDocumentTitle('Reset password');

  return (
    <S.ResetPasswordWrapper>
      <ResetPasswordForm />
    </S.ResetPasswordWrapper>
  );
}

export default ResetPassword;
