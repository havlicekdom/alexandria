"use client";

import { useContext } from 'react';
import Link from 'next/link';
import SuccessMessage from 'components/common/SuccessMessage';
import routes from 'constants/routes';
import { SubmitSuccessfulContext } from 'context/SubmitSuccessfulContext';
import ResetPasswordForm from 'components/reset-password/ResetPasswordForm';

function ResetPassword() {
  const { isSuccessfullySubmitted } = useContext(SubmitSuccessfulContext);

  return (
    isSuccessfullySubmitted ? (
      <SuccessMessage>
        Password reset successfully! You can now use your new password to log back in
        { ' ' }
        <Link href={routes.login}>here</Link>
        .
      </SuccessMessage>
    ) : (
      <ResetPasswordForm />
    )
  );
}

export default ResetPassword;
