import axios from 'utils/api';
import API from 'constants/api';

export const fetchAuthorsList = () => axios.get(API.authors.list);
export const fetchAuthorsDetail = (authorId: string) => axios.get(API.authors.detail(authorId));
