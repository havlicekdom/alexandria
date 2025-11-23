
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SubmitSuccessfulContext } from 'context/SubmitSuccessfulContext';
import { renderWithContext, renderWithRouter } from 'utils/tests';
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

describe('RegisterForm', () => {
  it('should render all the fields', () => {
    const { getByTestId } = renderWithRouter(<RegisterForm />);

    expect(getByTestId('username')).toBeInTheDocument();
    expect(getByTestId('email')).toBeInTheDocument();
    expect(getByTestId('password')).toBeInTheDocument();
    expect(getByTestId('confirm-password')).toBeInTheDocument();
    expect(getByTestId('submit')).toBeInTheDocument();
  });

  it('should send correct input data and update context value to show success message', async () => {
    (registerUser as jest.MockedFunction<typeof registerUser>).mockImplementation();
    const setIsSuccessfullySubmitted = jest.fn();
    renderWithContext(
      <RegisterForm />,
      {
        isSuccessfullySubmitted: false,
        setIsSuccessfullySubmitted,
      },
      SubmitSuccessfulContext,
      renderWithRouter,
    );

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
    expect(setIsSuccessfullySubmitted).toHaveBeenCalledWith(true);
  });
});
