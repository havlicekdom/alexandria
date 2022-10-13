import axios from 'utils/api';
import API from 'constants/api';
import { Author } from 'types/author';

export const fetchAuthorsList = () => axios.get<Author[]>(API.authors.list);
export const fetchAuthorsDetail = (authorId: string) => (
  axios.get<Author>(API.authors.detail(authorId))
);
