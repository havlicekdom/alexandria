import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { Genre } from 'types/genre';
import { createCustomAsyncThunk } from 'utils/thunks';
import { fetchGenresDetail, fetchGenresList } from './genresAPI';

export interface GenresState {
  list: Genre[],
  detail: Genre | null,
}

const initialState: GenresState = {
  list: [],
  detail: null,
};

export const getGenresList = createCustomAsyncThunk(
  'genres/getList',
  async () => {
    const response = await fetchGenresList();

    return {
      list: response.data,
      message: null,
    };
  },
);

export const getGenresDetail = createCustomAsyncThunk(
  'genres/getDetail',
  async (id: string) => {
    const response = await fetchGenresDetail(id);

    return {
      detail: response.data,
      message: null,
    };
  },
);

const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGenresList.fulfilled, (state, action) => {
        state.list = action.payload.list;
      })
      .addCase(getGenresDetail.fulfilled, (state, action) => {
        state.detail = action.payload.detail;
      });
  },
});

export const selectGenresList = (state: RootState) => state.genres.list;
export const selectGenresDetail = (state: RootState) => state.genres.detail;

export default genresSlice.reducer;
