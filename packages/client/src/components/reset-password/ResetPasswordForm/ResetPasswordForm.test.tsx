import React from 'react';
import { useParams } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { resetPassword } from 'store/user/userSlice';
import ResetPasswordForm from './ResetPasswordForm';

jest.mock('react-router-dom');

jest.mock('store/hooks', () => ({
  useAppDispatch: () => jest.fn(),
}));

jest.mock('store/user/userSlice');

describe('ResetPasswordForm', () => {
  it('should render all the fields', () => {
    (useParams as jest.MockedFunction<typeof useParams>).mockReturnValue({ id: 'test-id' });
    const { getByTestId } = render(<ResetPasswordForm />);

    expect(getByTestId('id')).toBeInTheDocument();
    expect(getByTestId('password')).toBeInTheDocument();
    expect(getByTestId('confirm-password')).toBeInTheDocument();
    expect(getByTestId('submit')).toBeInTheDocument();
  });

  it('should send correct input data', async () => {
    (resetPassword as jest.MockedFunction<typeof resetPassword>).mockImplementation();
    (useParams as jest.MockedFunction<typeof useParams>).mockReturnValue({ id: 'test-id' });
    const { getByTestId } = render(<ResetPasswordForm />);

    await userEvent.type(getByTestId('password'), 'test');
    await userEvent.type(getByTestId('confirm-password'), 'test');
    await userEvent.click(getByTestId('submit'));

    await waitFor(() => expect(resetPassword).toHaveBeenCalledWith({
      id: 'test-id',
      password: 'test',
      confirmPassword: 'test',
    }));
  });
});
