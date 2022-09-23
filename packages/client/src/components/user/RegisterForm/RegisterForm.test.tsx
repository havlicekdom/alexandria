import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from 'utils/tests';
import { registerUser } from 'store/user/userSlice';
import RegisterForm from './RegisterForm';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

jest.mock('store/hooks', () => ({
  useAppDispatch: () => jest.fn(),
}));

jest.mock('store/user/userSlice');

describe('LoginForm', () => {
  it('should render all the fields', () => {
    const { getByTestId } = renderWithRouter(<RegisterForm />);

    expect(getByTestId('username')).toBeInTheDocument();
    expect(getByTestId('email')).toBeInTheDocument();
    expect(getByTestId('password')).toBeInTheDocument();
    expect(getByTestId('confirm-password')).toBeInTheDocument();
    expect(getByTestId('submit')).toBeInTheDocument();
  });

  it('should send correct input data', async () => {
    (registerUser as jest.MockedFunction<typeof registerUser>).mockImplementation();
    renderWithRouter(<RegisterForm />);

    await userEvent.type(screen.getByLabelText(/username/i), 'test');
    await userEvent.type(screen.getByLabelText(/email/i), 'test@test.com');
    await userEvent.type(screen.getAllByLabelText(/password/i)[0], 'test');
    await userEvent.type(screen.getByLabelText(/confirm password/i), 'test');
    await userEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(registerUser).toHaveBeenCalledWith({
      username: 'test',
      email: 'test@test.com',
      password: 'test',
      confirmPassword: 'test',
    }));
  });
});
