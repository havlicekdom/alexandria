import { Book } from './book';

export interface Loan {
  id: string;
  dateBegin: string;
  dateEnd: string;
  book: Book;
}
