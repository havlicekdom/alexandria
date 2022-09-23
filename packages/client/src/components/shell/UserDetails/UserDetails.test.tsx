import React from 'react';
import { selectUser } from 'store/user/userSlice';
import { mockUser, renderWithRouter } from 'utils/tests';
import { User } from 'types/user';

import UserDetails from './UserDetails';

jest.mock('store/hooks', () => ({
  useAppSelector: (callback: () => User) => callback(),
}));

jest.mock('store/user/userSlice');

describe('UserDetails', () => {
  it('should load user object from store', async () => {
    (selectUser as jest.MockedFunction<typeof selectUser>).mockReturnValue(mockUser);
    renderWithRouter(<UserDetails />);
    expect(selectUser).toHaveBeenCalled();
  });
});
