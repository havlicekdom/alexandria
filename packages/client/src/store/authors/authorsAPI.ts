import axios from 'utils/api';
import API from 'constants/api';

export const fetchAuthorsList = () => axios.get(API.authors.list);
