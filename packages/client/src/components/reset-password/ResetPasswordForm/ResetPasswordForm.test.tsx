import React from 'react';
import { useParams } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SubmitSuccessfulContext } from 'context/SubmitSuccessfulContext';
import { resetPassword } from 'store/user/userSlice';
import { renderWithContext } from 'utils/tests';
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

  it('should send correct input data and update context value to show success message', async () => {
    (resetPassword as jest.MockedFunction<typeof resetPassword>).mockImplementation();
    (useParams as jest.MockedFunction<typeof useParams>).mockReturnValue({ id: 'test-id' });
    const setIsSuccessfullySubmitted = jest.fn();
    const { getByTestId } = renderWithContext(
      <ResetPasswordForm />,
      {
        isSuccessfullySubmitted: false,
        setIsSuccessfullySubmitted,
      },
      SubmitSuccessfulContext,
    );

    await userEvent.type(getByTestId('password'), 'test');
    await userEvent.type(getByTestId('confirm-password'), 'test');
    await userEvent.click(getByTestId('submit'));

    await waitFor(() => expect(resetPassword).toHaveBeenCalledWith({
      id: 'test-id',
      password: 'test',
      confirmPassword: 'test',
    }));
    expect(setIsSuccessfullySubmitted).toHaveBeenCalledWith(true);
  });
});
