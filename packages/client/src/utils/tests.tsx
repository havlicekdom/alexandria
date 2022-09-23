import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Book, BookFormat } from 'types/book';
import { Loan } from 'types/loan';
import { Genre } from 'types/genre';
import { Author } from 'types/author';
import { render } from '@testing-library/react';
import { User } from 'types/user';

export const mockUser: User = {
  username: 'test user',
  email: 'test@test.com',
};

export const mockGenre: Genre = {
  id: 'dummy-genre-id',
  name: 'dummy-genre-name',
  bio: 'dummy-genre-bio',
};

export const mockAuthor: Author = {
  id: 'dummy-author-id',
  name: 'dummy-author-name',
  bio: 'dummy-author-bio',
  dateOfBirth: '2022-06-09',
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

export const renderWithRouter = (children: any) => ({
  ...render((
    <BrowserRouter>
      { children }
    </BrowserRouter>
  )),
});
