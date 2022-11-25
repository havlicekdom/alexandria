import React from 'react';
import useDocumentTitle from 'hooks/useDocumentTitle';
import ResetPasswordForm from './ResetPasswordForm';

function ResetPassword() {
  useDocumentTitle('Reset your password');

  return (
    <ResetPasswordForm />
  );
}

export default ResetPassword;
