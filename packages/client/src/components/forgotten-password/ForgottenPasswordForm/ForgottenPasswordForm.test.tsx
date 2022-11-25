import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { forgottenPassword } from 'store/user/userSlice';
import { renderWithRouter } from 'utils/tests';

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

  it('should dispatch action after filling email and clicking button', async () => {
    (forgottenPassword as jest.MockedFunction<typeof forgottenPassword>).mockImplementation();
    renderWithRouter(<ForgottenPasswordForm />);
    const email = 'test@test.com';

    await userEvent.type(screen.getByTestId('email'), email);
    await userEvent.click(screen.getByTestId('submit'));

    await waitFor(() => expect(forgottenPassword).toHaveBeenCalledWith({
      email,
    }));
  });
});
