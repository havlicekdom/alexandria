import axios from 'utils/api';
import API from 'constants/api';
import { Book } from 'types/book';

export const fetchLatestBooks = () => axios.get<Book[]>(API.books.latest);
export const fetchAllBooks = () => axios.get<Book[]>(API.books.all);
export const fetchLoanableBooks = () => axios.get<Book[]>(API.books.loanable);
export const fetchBooksDetail = (id: string) => axios.get<Book>(API.books.detail(id));
