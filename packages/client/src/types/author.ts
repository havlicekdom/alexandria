import { Book } from './book';
import { Genre } from './genre';

export interface Author {
  id: string;
  name: string;
  dateOfBirth: string;
  bio: string;
  genres: Genre[];
  books: Book[];
}
