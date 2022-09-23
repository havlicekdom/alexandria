import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from 'utils/tests';
import { login } from 'store/auth/authSlice';
import LoginForm from './LoginForm';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useLocation: () => ({
    state: {
      from: '/',
    },
  }),
}));

jest.mock('store/hooks', () => ({
  useAppDispatch: () => jest.fn(),
}));

jest.mock('store/auth/authSlice');

describe('LoginForm', () => {
  it('should render all the fields', () => {
    const { getByTestId } = renderWithRouter(<LoginForm />);

    expect(getByTestId('username')).toBeInTheDocument();
    expect(getByTestId('password')).toBeInTheDocument();
    expect(getByTestId('submit')).toBeInTheDocument();
    expect(getByTestId('reset-password')).toBeInTheDocument();
    expect(getByTestId('register')).toBeInTheDocument();
  });

  it('should send correct input data', async () => {
    (login as jest.MockedFunction<typeof login>).mockImplementation();
    renderWithRouter(<LoginForm />);

    await userEvent.type(screen.getByLabelText(/username/i), 'test');
    await userEvent.type(screen.getByLabelText(/password/i), 'test');
    await userEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(login).toHaveBeenCalledWith({
      username: 'test',
      password: 'test',
    }));
  });
});
