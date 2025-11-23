import { useContext } from 'react';
import SuccessMessage from 'components/common/SuccessMessage';
import { SubmitSuccessfulContext } from 'context/SubmitSuccessfulContext';
import useDocumentTitle from 'hooks/useDocumentTitle';
import ForgottenPasswordForm from './ForgottenPasswordForm';

function ForgottenPassword() {
  const { isSuccessfullySubmitted } = useContext(SubmitSuccessfulContext);
  useDocumentTitle('Forgotten password');

  return (
    isSuccessfullySubmitted ? (
      <SuccessMessage>
        Password reset process started! Please check your inbox for email with steps how to proceed.
      </SuccessMessage>
    ) : (
      <ForgottenPasswordForm />
    )
  );
}

export default ForgottenPassword;
