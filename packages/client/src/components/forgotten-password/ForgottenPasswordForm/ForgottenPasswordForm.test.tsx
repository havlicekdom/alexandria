
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SubmitSuccessfulContext } from 'context/SubmitSuccessfulContext';
import { forgottenPassword } from 'store/user/userSlice';
import { renderWithContext, renderWithRouter } from 'utils/tests';

import ForgottenPasswordForm from './ForgottenPasswordForm';

jest.mock('store/hooks', () => ({
  useAppDispatch: () => jest.fn(),
}));

jest.mock('store/user/userSlice');

describe('ForgottenPasswordForm', () => {
  it('should render all the fields', () => {
    const { getByTestId } = renderWithRouter(<ForgottenPasswordForm />);

    expect(getByTestId('email')).toBeInTheDocument();
    expect(getByTestId('submit')).toBeInTheDocument();
  });

  it('should dispatch action and set context value after filling email and clicking button', async () => {
    (forgottenPassword as jest.MockedFunction<typeof forgottenPassword>).mockImplementation();
    const setIsSuccessfullySubmitted = jest.fn();
    renderWithContext(
      <ForgottenPasswordForm />,
      {
        isSuccessfullySubmitted: false,
        setIsSuccessfullySubmitted,
      },
      SubmitSuccessfulContext,
      renderWithRouter,
    );
    const email = 'test@test.com';

    await userEvent.type(screen.getByTestId('email'), email);
    await userEvent.click(screen.getByTestId('submit'));

    await waitFor(() => expect(forgottenPassword).toHaveBeenCalledWith({
      email,
    }));
    expect(setIsSuccessfullySubmitted).toHaveBeenCalledWith(true);
  });
});
