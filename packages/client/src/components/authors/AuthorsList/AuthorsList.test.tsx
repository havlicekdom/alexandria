import React from 'react';
import { getAuthorsList, selectAuthorsList } from 'store/authors/authorsSlice';
import { mockAuthor, renderWithRouter } from 'utils/tests';
import { Author } from 'types/author';

import AuthorsList from './AuthorsList';

jest.mock('store/hooks', () => ({
  useAppDispatch: () => jest.fn(),
  useAppSelector: (callback: () => Author[]) => callback(),
}));

jest.mock('store/authors/authorsSlice');

describe('AuthorsList', () => {
  it('should render a list of Author components when authors exist in store', () => {
    (getAuthorsList as jest.MockedFunction<typeof getAuthorsList>).mockImplementation();
    (selectAuthorsList as jest.MockedFunction<typeof selectAuthorsList>)
      .mockReturnValue([mockAuthor]);

    const { getAllByTestId } = renderWithRouter(<AuthorsList />);
    expect(getAllByTestId('author')).toHaveLength(1);
  });

  it('should call action to fetch data on mount', () => {
    (getAuthorsList as jest.MockedFunction<typeof getAuthorsList>).mockImplementation();
    (selectAuthorsList as jest.MockedFunction<typeof selectAuthorsList>)
      .mockReturnValue([mockAuthor]);

    renderWithRouter(<AuthorsList />);
    expect(getAuthorsList).toHaveBeenCalled();
  });

  it('should call selector to retrieve data from store', () => {
    (getAuthorsList as jest.MockedFunction<typeof getAuthorsList>).mockImplementation();
    (selectAuthorsList as jest.MockedFunction<typeof selectAuthorsList>)
      .mockReturnValue([mockAuthor]);

    renderWithRouter(<AuthorsList />);
    expect(selectAuthorsList).toHaveBeenCalled();
  });
});
