import { v4 as uuid } from 'uuid';
import { Genre } from './entities/genre.entity';

export const createMockGenre = (mockAuthor, mockBook): Genre => ({
  id: uuid(),
  name: 'Test genre',
  bio: 'Test genre bio',
  books: [mockBook],
  authors: [mockAuthor],
});

export const mockGenre: Genre = {
  id: uuid(),
  name: 'Test genre',
  bio: 'Test genre bio',
  books: [],
  authors: [],
};
