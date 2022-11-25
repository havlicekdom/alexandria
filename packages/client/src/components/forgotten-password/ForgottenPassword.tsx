import React from 'react';
import useDocumentTitle from 'hooks/useDocumentTitle';
import ForgottenPasswordForm from './ForgottenPasswordForm';

function ForgottenPassword() {
  useDocumentTitle('Forgotten password');

  return (
    <ForgottenPasswordForm />
  );
}

export default ForgottenPassword;
