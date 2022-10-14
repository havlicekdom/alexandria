import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { Author } from 'types/author';
import { createCustomAsyncThunk } from 'utils/thunks';
import { fetchAuthorsDetail, fetchAuthorsList } from './authorsAPI';

export interface AuthorsState {
  list: Author[];
  detail: Author | null;
}

const initialState: AuthorsState = {
  list: [],
  detail: null,
};

export const getAuthorsList = createCustomAsyncThunk(
  'authors/getList',
  async () => {
    const response = await fetchAuthorsList();

    return {
      authors: response.data,
      message: null,
    };
  },
);

export const getAuthorsDetail = createCustomAsyncThunk(
  'authors/getDetail',
  async (id: string) => {
    const response = await fetchAuthorsDetail(id);

    return {
      detail: response.data,
      message: null,
    };
  },
);

export const authorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAuthorsList.fulfilled, (state, action) => {
        state.list = action.payload.authors;
      })
      .addCase(getAuthorsDetail.fulfilled, (state, action) => {
        state.detail = action.payload.detail;
      });
  },
});

export const selectAuthorsList = (state: RootState) => state.authors.list;
export const selectAuthorsDetail = (state: RootState) => state.authors.detail;

export default authorsSlice.reducer;
