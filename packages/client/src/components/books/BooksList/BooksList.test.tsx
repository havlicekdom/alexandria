import React from 'react';
import { getBooksList, selectBooksList } from 'store/books/booksSlice';
import { renderWithRouter, mockBook } from 'utils/tests';
import { Author } from 'types/author';

import BooksList from './BooksList';

jest.mock('store/hooks', () => ({
  useAppDispatch: () => jest.fn(),
  useAppSelector: (callback: () => Author[]) => callback(),
}));

jest.mock('store/books/booksSlice');

describe('BooksList', () => {
  it('should render a list of Book components when books exist in store', () => {
    (getBooksList as jest.MockedFunction<typeof getBooksList>).mockImplementation();
    (selectBooksList as jest.MockedFunction<typeof selectBooksList>)
      .mockReturnValue([mockBook]);

    const { getAllByTestId } = renderWithRouter(<BooksList />);
    expect(getAllByTestId('book')).toHaveLength(1);
  });

  it('should call action to fetch data on mount', () => {
    (getBooksList as jest.MockedFunction<typeof getBooksList>).mockImplementation();
    (selectBooksList as jest.MockedFunction<typeof selectBooksList>)
      .mockReturnValue([mockBook]);

    renderWithRouter(<BooksList />);
    expect(getBooksList).toHaveBeenCalled();
  });

  it('should call selector to retrieve data from store', () => {
    (getBooksList as jest.MockedFunction<typeof getBooksList>).mockImplementation();
    (selectBooksList as jest.MockedFunction<typeof selectBooksList>)
      .mockReturnValue([mockBook]);

    renderWithRouter(<BooksList />);
    expect(selectBooksList).toHaveBeenCalled();
  });
});
