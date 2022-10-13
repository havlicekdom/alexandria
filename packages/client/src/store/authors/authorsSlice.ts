import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { RootState } from 'store/store';
import { Author } from 'types/author';
import { fetchAuthorsDetail, fetchAuthorsList } from './authorsAPI';

export interface AuthorsState {
  list: Author[];
  detail: Author | null;
}

const initialState: AuthorsState = {
  list: [],
  detail: null,
};

export const getAuthorsList = createAsyncThunk(
  'authors/getList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchAuthorsList();

      return {
        authors: response.data,
        message: null,
      };
    } catch (error) {
      const { response } = error as AxiosError;

      if (!response) {
        throw error;
      }

      return rejectWithValue(response.data);
    }
  },
);

export const getAuthorsDetail = createAsyncThunk(
  'authors/getDetail',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetchAuthorsDetail(id);

      return {
        detail: response.data,
        message: null,
      };
    } catch (error) {
      const { response } = error as AxiosError;

      if (!response) {
        throw error;
      }

      return rejectWithValue(response.data);
    }
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
