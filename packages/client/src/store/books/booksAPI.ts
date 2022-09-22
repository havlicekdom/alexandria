import axios from 'utils/api';
import API from 'constants/api';

export const fetchLatestBooks = () => axios.get(API.books.latest);
