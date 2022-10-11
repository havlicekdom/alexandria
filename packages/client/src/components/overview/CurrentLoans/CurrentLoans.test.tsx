import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

    const { getAllByTestId } = renderWithRouter(<CurrentLoans openLoanModal={jest.fn()} />);
    expect(getAllByTestId('loan')).toHaveLength(1);
  });

  it('should display a message when no loans were returned from API', () => {
    (getUserLoans as jest.MockedFunction<typeof getUserLoans>).mockImplementation();
    (selectUserLoans as jest.MockedFunction<typeof selectUserLoans>).mockReturnValue([]);

    renderWithRouter(<CurrentLoans openLoanModal={jest.fn()} />);
    expect(screen.getByText('You currently have no loans.')).toBeInTheDocument();
  });

  it('should call a provided function on button click when no loans were returned', async () => {
    (getUserLoans as jest.MockedFunction<typeof getUserLoans>).mockImplementation();
    (selectUserLoans as jest.MockedFunction<typeof selectUserLoans>).mockReturnValue([]);

    const openLoanModalSpy = jest.fn();
    const { getByTestId } = renderWithRouter(<CurrentLoans openLoanModal={openLoanModalSpy} />);
    await userEvent.click(getByTestId('loan-button'));
    expect(openLoanModalSpy).toHaveBeenCalled();
  });

  it('should call action to fetch data on mount', () => {
    (getUserLoans as jest.MockedFunction<typeof getUserLoans>).mockImplementation();
    (selectUserLoans as jest.MockedFunction<typeof selectUserLoans>).mockReturnValue([mockLoan]);

    renderWithRouter(<CurrentLoans openLoanModal={jest.fn()} />);
    expect(getUserLoans).toHaveBeenCalled();
  });

  it('should call selector to retrieve data from store', () => {
    (getUserLoans as jest.MockedFunction<typeof getUserLoans>).mockImplementation();
    (selectUserLoans as jest.MockedFunction<typeof selectUserLoans>).mockReturnValue([mockLoan]);

    renderWithRouter(<CurrentLoans openLoanModal={jest.fn()} />);
    expect(selectUserLoans).toHaveBeenCalled();
  });
});
