import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { resetPassword } from 'store/user/userSlice';
import { renderWithRouter } from 'utils/tests';

import ResetPasswordForm from './ResetPasswordForm';

jest.mock('store/hooks', () => ({
  useAppDispatch: () => jest.fn(),
}));

jest.mock('store/user/userSlice');

describe('ResetPasswordForm', () => {
  it('should render all the fields', () => {
    const { getByTestId } = renderWithRouter(<ResetPasswordForm />);

    expect(getByTestId('email')).toBeInTheDocument();
    expect(getByTestId('submit')).toBeInTheDocument();
  });

  it('should dispatch action after filling email and clicking button', async () => {
    (resetPassword as jest.MockedFunction<typeof resetPassword>).mockImplementation();
    renderWithRouter(<ResetPasswordForm />);
    const email = 'test@test.com';

    await userEvent.type(screen.getByTestId('email'), email);
    await userEvent.click(screen.getByTestId('submit'));

    await waitFor(() => expect(resetPassword).toHaveBeenCalledWith({
      email,
    }));
  });
});
