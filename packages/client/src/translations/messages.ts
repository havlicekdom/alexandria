import { createErrorMessage, createSuccessMessage } from 'utils/messages';

export default {
  signInSuccess: createSuccessMessage('Log in successful, welcome back!'),
  signOutSuccess: createSuccessMessage('Log out successful, goodbye.'),
  registerSuccess: createSuccessMessage('Your registration has been successfully completed.'),
  updateSuccess: createSuccessMessage('Your settings have been saved.'),
  forgottenPasswordSuccess: createSuccessMessage('Password reset successful. Instructions how to change it have been sent to your email.'),
  resetPasswordSuccess: createSuccessMessage('Password change successful.'),
  createLoanSuccess: createSuccessMessage('Book loaned successfully.'),
  loginExpiredError: createErrorMessage('Your session has expired, please log in again.'),
};
