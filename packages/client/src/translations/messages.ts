import { createErrorMessage, createSuccessMessage } from 'utils/messages';

export default {
  signInSuccess: createSuccessMessage('Log in successful, welcome back!'),
  signOutSuccess: createSuccessMessage('Log out successful, goodbye.'),
  registerSuccess: createSuccessMessage('Your registration has been successfully completed.'),
  updateSuccess: createSuccessMessage('Your settings have been saved.'),
  resetPasswordSuccess: createSuccessMessage('Password reset successful. New password has been sent to your email.'),
  createLoanSuccess: createSuccessMessage('Book loaned successfully.'),
  loginExpiredError: createErrorMessage('Your session has expired, please log in again.'),
};
