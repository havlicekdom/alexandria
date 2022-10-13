import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { Book } from 'types/book';
import { RootState } from '../store';
import { fetchAllBooks, fetchBooksDetail, fetchLatestBooks } from './booksAPI';

export interface BooksState {
  latestBooks: Book[];
  list: Book[];
  detail: Book | null;
}

const initialState: BooksState = {
  latestBooks: [],
  list: [],
  detail: null,
};

export const getLatestBooks = createAsyncThunk(
  'books/getLatest',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchLatestBooks();

      return {
        latestBooks: response.data,
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

export const getBooksList = createAsyncThunk(
  'books/getList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchAllBooks();

      return {
        list: response.data,
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

export const getBooksDetail = createAsyncThunk(
  'books/getDetail',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetchBooksDetail(id);

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

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getLatestBooks.fulfilled, (state, action) => {
        state.latestBooks = action.payload.latestBooks;
      })
      .addCase(getBooksList.fulfilled, (state, action) => {
        state.list = action.payload.list;
      })
      .addCase(getBooksDetail.fulfilled, (state, action) => {
        state.detail = action.payload.detail;
      });
  },
});

export const selectLatestBooks = (state: RootState) => state.books.latestBooks;
export const selectBooksList = (state: RootState) => state.books.list;
export const selectBooksDetail = (state: RootState) => state.books.detail;

export default booksSlice.reducer;
