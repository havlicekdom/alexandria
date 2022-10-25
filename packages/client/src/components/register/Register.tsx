import React from 'react';
import useDocumentTitle from 'hooks/useDocumentTitle';

import RegisterForm from './RegisterForm';

function Register() {
  useDocumentTitle('Register');

  return (
    <RegisterForm />
  );
}

export default Register;
