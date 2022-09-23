import React from 'react';
import { getUserLoans, selectUserLoans } from 'store/user/userSlice';
import { mockLoan, renderWithRouter } from 'utils/tests';
import { Loan } from 'types/loan';

import CurrentLoans from './CurrentLoans';

jest.mock('store/hooks', () => ({
  useAppDispatch: () => jest.fn(),
  useAppSelector: (callback: () => Loan[]) => callback(),
}));

jest.mock('store/user/userSlice');

describe('CurrentLoans', () => {
  it('should render a list of Loan components when loans exist in store', () => {
    (getUserLoans as jest.MockedFunction<typeof getUserLoans>).mockImplementation();
    (selectUserLoans as jest.MockedFunction<typeof selectUserLoans>).mockReturnValue([mockLoan]);

    const { getAllByTestId } = renderWithRouter(<CurrentLoans />);
    expect(getAllByTestId('loan')).toHaveLength(1);
  });

  it('should call action to fetch data on mount', () => {
    (getUserLoans as jest.MockedFunction<typeof getUserLoans>).mockImplementation();
    (selectUserLoans as jest.MockedFunction<typeof selectUserLoans>).mockReturnValue([mockLoan]);

    renderWithRouter(<CurrentLoans />);
    expect(getUserLoans).toHaveBeenCalled();
  });

  it('should call selector to retrieve data from store', () => {
    (getUserLoans as jest.MockedFunction<typeof getUserLoans>).mockImplementation();
    (selectUserLoans as jest.MockedFunction<typeof selectUserLoans>).mockReturnValue([mockLoan]);

    renderWithRouter(<CurrentLoans />);
    expect(selectUserLoans).toHaveBeenCalled();
  });
});
