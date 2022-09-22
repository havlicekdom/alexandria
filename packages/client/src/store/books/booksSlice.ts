import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { Book } from 'types/book';
import { RootState } from '../store';
import { fetchLatestBooks } from './booksAPI';

export interface BooksState {
  latestBooks: Book[];
}

const initialState: BooksState = {
  latestBooks: [],
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

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getLatestBooks.fulfilled, (state, action) => {
      state.latestBooks = action.payload.latestBooks;
    });
  },
});

export const selectLatestBooks = (state: RootState) => state.books.latestBooks;

export default booksSlice.reducer;
