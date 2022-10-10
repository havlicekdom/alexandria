import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { RootState } from 'store/store';
import { Author } from 'types/author';
import { fetchAuthorsList } from './authorsAPI';

export interface AuthorsState {
  list: Author[];
}

const initialState: AuthorsState = {
  list: [],
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

export const authorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAuthorsList.fulfilled, (state, action) => {
      state.list = action.payload.authors;
    });
  },
});

export const selectAuthorsList = (state: RootState) => state.authors.list;

export default authorsSlice.reducer;
