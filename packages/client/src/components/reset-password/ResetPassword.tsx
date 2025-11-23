import { useContext } from 'react';
import { Link } from 'react-router-dom';
import SuccessMessage from 'components/common/SuccessMessage';
import routes from 'constants/routes';
import { SubmitSuccessfulContext } from 'context/SubmitSuccessfulContext';
import useDocumentTitle from 'hooks/useDocumentTitle';
import ResetPasswordForm from './ResetPasswordForm';

function ResetPassword() {
  const { isSuccessfullySubmitted } = useContext(SubmitSuccessfulContext);
  useDocumentTitle('Reset your password');

  return (
    isSuccessfullySubmitted ? (
      <SuccessMessage>
        Password reset successfully! You can now use your new password to log back in
        { ' ' }
        <Link to={routes.login}>here</Link>
        .
      </SuccessMessage>
    ) : (
      <ResetPasswordForm />
    )
  );
}

export default ResetPassword;
