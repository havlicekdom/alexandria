import { Author } from './author';
import { Book } from './book';

export interface Genre {
  id: string;
  name: string;
  bio: string;
  books: Book[];
  authors: Author[];
}
