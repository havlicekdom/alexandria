
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockUser, renderWithRouter } from 'utils/tests';
import { updateUser, selectUser } from 'store/user/userSlice';
import { User } from 'types/user';

import SettingsForm from './SettingsForm';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

jest.mock('store/hooks', () => ({
  useAppDispatch: () => jest.fn(),
  useAppSelector: (callback: () => User) => callback(),
}));

jest.mock('store/user/userSlice');

describe('SettingsForm', () => {
  it('should render all the fields', () => {
    (selectUser as jest.MockedFunction<typeof selectUser>).mockReturnValue(mockUser);
    const { getByTestId } = renderWithRouter(<SettingsForm />);

    expect(getByTestId('username')).toBeInTheDocument();
    expect(getByTestId('email')).toBeInTheDocument();
    expect(getByTestId('password')).toBeInTheDocument();
    expect(getByTestId('confirm-password')).toBeInTheDocument();
    expect(getByTestId('submit')).toBeInTheDocument();
  });

  it('should send correct input data', async () => {
    (updateUser as jest.MockedFunction<typeof updateUser>).mockImplementation();
    (selectUser as jest.MockedFunction<typeof selectUser>).mockReturnValue(mockUser);
    renderWithRouter(<SettingsForm />);

    await userEvent.type(screen.getByLabelText(/email/i), 'test@test.com');
    await userEvent.type(screen.getAllByLabelText(/password/i)[0], 'test');
    await userEvent.type(screen.getByLabelText(/confirm password/i), 'test');
    await userEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(updateUser).toHaveBeenCalledWith({
      userData: {
        username: mockUser.username,
        email: 'test@test.com',
        password: 'test',
        confirmPassword: 'test',
      },
      userId: mockUser.id,
    }));
  });
});
