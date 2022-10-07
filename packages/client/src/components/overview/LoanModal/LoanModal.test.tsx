import React from 'react';
import {
  waitFor, render, screen, waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockBook, mockUser } from 'utils/tests';
import { fetchLoanableBooks } from 'store/books/booksAPI';
import { createNewLoan } from 'store/loans/loansSlice';
import { selectUser } from 'store/user/userSlice';
import { User } from 'types/user';

import LoanModal from './LoanModal';

jest.mock('store/hooks', () => ({
  useAppDispatch: () => jest.fn(),
  useAppSelector: (callback: () => User) => callback(),
}));

jest.mock('store/loans/loansSlice');
jest.mock('store/user/userSlice');
jest.mock('store/books/booksAPI');

describe('LoanModal', () => {
  it('should render all the fields', () => {
    const close = jest.fn();
    (selectUser as jest.MockedFunction<typeof selectUser>).mockReturnValue(mockUser);
    const { getByTestId } = render(<LoanModal close={close} />);

    expect(getByTestId('loan-modal-userId')).toBeInTheDocument();
    expect(getByTestId('loan-modal-bookId')).toBeInTheDocument();
    expect(getByTestId('loan-modal-submit')).toBeInTheDocument();
  });

  it('should send correct input data', async () => {
    (createNewLoan as jest.MockedFunction<typeof createNewLoan>).mockImplementation();
    (selectUser as jest.MockedFunction<typeof selectUser>).mockReturnValue(mockUser);
    (fetchLoanableBooks as jest.MockedFunction<typeof fetchLoanableBooks>)
      .mockResolvedValue({
        status: 200,
        statusText: 'OK',
        data: [mockBook],
        headers: {},
        config: {},
      });

    const close = jest.fn();
    const { container } = render(<LoanModal close={close} />);
    const input = container.querySelector('#react-select-3-input');

    if (!input) return;

    await userEvent.type(input, mockBook.name);
    await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));
    const item = container.querySelector('#react-select-3-option-0');

    if (!item) return;

    await userEvent.click(item);
    await userEvent.click(screen.getByTestId('loan-modal-submit'));

    await waitFor(() => expect(createNewLoan).toHaveBeenCalledWith({
      userId: mockUser.id,
      bookId: mockBook.id,
    }));
  });
});
