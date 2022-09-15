import { v4 as uuid } from 'uuid';
import { Author } from './entities/author.entity';

export const createMockAuthor = (mockBook, mockGenre): Author => ({
  id: uuid(),
  name: 'Test author',
  bio: 'Test author bio',
  dateOfBirth: new Date(),
  genres: [mockGenre],
  books: [mockBook],
});

export const mockAuthor: Author = {
  id: uuid(),
  name: 'Test author',
  bio: 'Test author bio',
  dateOfBirth: new Date(),
  genres: [],
  books: [],
};
