import { Author } from './author';
import { Genre } from './genre';

export enum BookFormat {
  Hardcover = 'Hardcover',
  Paperback = 'Paperback',
  Digital = 'Digital',
}

export interface Book {
  id: string;
  created: string;
  name: string;
  format: BookFormat;
  releaseYear: number;
  description: string;
  author: Author;
  genres: Genre[];
}
