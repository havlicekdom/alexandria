import React from 'react';
import { getLatestBooks, selectLatestBooks } from 'store/books/booksSlice';
import { mockBook, renderWithRouter } from 'utils/tests';
import { Book } from 'types/book';

import LatestBooks from './LatestBooks';

jest.mock('store/hooks', () => ({
  useAppDispatch: () => jest.fn(),
  useAppSelector: (callback: () => Book[]) => callback(),
}));

jest.mock('store/books/booksSlice');

describe('LatestBooks', () => {
  it('should render a list of LatestBook components when latest books exist in store', () => {
    (getLatestBooks as jest.MockedFunction<typeof getLatestBooks>).mockImplementation();
    (selectLatestBooks as jest.MockedFunction<typeof selectLatestBooks>)
      .mockReturnValue([mockBook]);

    const { getAllByTestId } = renderWithRouter(<LatestBooks />);
    expect(getAllByTestId('book')).toHaveLength(1);
  });

  it('should call action to fetch data on mount', () => {
    (getLatestBooks as jest.MockedFunction<typeof getLatestBooks>).mockImplementation();
    (selectLatestBooks as jest.MockedFunction<typeof selectLatestBooks>)
      .mockReturnValue([mockBook]);

    renderWithRouter(<LatestBooks />);
    expect(getLatestBooks).toHaveBeenCalled();
  });

  it('should call selector to retrieve data from store', () => {
    (getLatestBooks as jest.MockedFunction<typeof getLatestBooks>).mockImplementation();
    (selectLatestBooks as jest.MockedFunction<typeof selectLatestBooks>)
      .mockReturnValue([mockBook]);

    renderWithRouter(<LatestBooks />);
    expect(selectLatestBooks).toHaveBeenCalled();
  });
});
