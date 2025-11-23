
import { BrowserRouter } from 'react-router-dom';
import { Book, BookFormat } from 'types/book';
import { Loan } from 'types/loan';
import { Genre } from 'types/genre';
import { Author } from 'types/author';
import { render } from '@testing-library/react';
import { User } from 'types/user';
import { Role } from 'types/role';

export const mockUser: User = {
  id: 'dummy-id',
  username: 'test user',
  email: 'test@test.com',
  role: Role.Admin,
};

export const mockGenre: Genre = {
  id: 'dummy-genre-id',
  name: 'dummy-genre-name',
  bio: 'dummy-genre-bio',
  books: [],
  authors: [],
};

export const mockAuthor: Author = {
  id: 'dummy-author-id',
  name: 'dummy-author-name',
  bio: 'dummy-author-bio',
  dateOfBirth: '2022-06-09',
  books: [],
  genres: [],
};

export const mockBook: Book = {
  id: 'dummy-book-id',
  created: '2022-06-09',
  name: 'dummy-book',
  description: 'dummy-book-description',
  releaseYear: 1969,
  format: BookFormat.Paperback,
  author: mockAuthor,
  genres: [mockGenre],
};

export const mockLoan: Loan = {
  id: 'dummy-id',
  dateBegin: '2022-06-09',
  dateEnd: '2022-06-09',
  book: mockBook,
};

export const createMockAxiosResponse = (data: any) => ({
  data,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
});

export const renderWithRouter = (children: any) => ({
  ...render((
    <BrowserRouter>
      { children }
    </BrowserRouter>
  )),
});

export const renderWithContext = (
  children: any,
  contextValues: any,
  Context: React.Context<typeof contextValues>,
  renderMethod: any = render,
) => ({
  ...renderMethod(
    <Context.Provider value={contextValues}>
      { children }
    </Context.Provider>,
  ),
});
