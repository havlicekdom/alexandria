import axios from 'utils/api';
import API from 'constants/api';
import { Genre } from 'types/genre';

export const fetchGenresList = () => axios.get<Genre[]>(API.genres.list);
export const fetchGenresDetail = (genreId: string) => (
  axios.get<Genre>(API.genres.detail(genreId))
);
