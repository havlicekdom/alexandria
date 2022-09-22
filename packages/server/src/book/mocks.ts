import { v4 as uuid } from 'uuid';
import moment from 'moment-mini';
import { Book, BookFormat } from './entities/book.entity';

export const createMockBook = (mockAuthor, mockGenre): Book => ({
  id: uuid(),
  created: moment().format(),
  name: 'Test book',
  format: BookFormat.Paperback,
  releaseYear: 1969,
  description: 'Test book description',
  author: mockAuthor,
  genres: [mockGenre],
});

export const mockBook: Book = {
  id: uuid(),
  created: moment().format(),
  name: 'Test book',
  format: BookFormat.Paperback,
  releaseYear: 1969,
  description: 'Test book description',
  author: null,
  genres: [],
};
