import React from 'react';
import userEvent from '@testing-library/user-event';
import { logout } from 'store/auth/authSlice';
import { renderWithRouter } from 'utils/tests';

import UserMenu from './UserMenu';

jest.mock('store/hooks', () => ({
  useAppDispatch: () => jest.fn(),
}));

jest.mock('store/auth/authSlice');

describe('UserMenu', () => {
  it('should dispatch action on logout button click', async () => {
    const { getByText } = renderWithRouter(<UserMenu />);
    (logout as jest.MockedFunction<typeof logout>).mockImplementation();

    await userEvent.click(getByText('Log out'));
    expect(logout).toHaveBeenCalled();
  });
});
