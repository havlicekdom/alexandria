import React, { useContext } from 'react';
import SuccessMessage from 'components/common/SuccessMessage';
import { SubmitSuccessfulContext } from 'context/SubmitSuccessfulContext';
import useDocumentTitle from 'hooks/useDocumentTitle';

import RegisterForm from './RegisterForm';

function Register() {
  const { isSuccessfullySubmitted } = useContext(SubmitSuccessfulContext);
  useDocumentTitle('Register');

  return (
    isSuccessfullySubmitted ? (
      <SuccessMessage>
        Registration completed. Please check your inbox for verification email.
      </SuccessMessage>
    ) : (
      <RegisterForm />
    )
  );
}

export default Register;
