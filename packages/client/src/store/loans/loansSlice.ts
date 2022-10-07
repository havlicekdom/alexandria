import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { messages } from 'translations';
import { CreateNewLoanData, postNewLoan } from './loansAPI';

export type LoansState = Record<string, never>;

const initialState: LoansState = {};

export const createNewLoan = createAsyncThunk(
  'loans/create',
  async (formData: CreateNewLoanData, { rejectWithValue }) => {
    try {
      await postNewLoan(formData);

      return {
        message: messages.createLoanSuccess,
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

export const loansSlice = createSlice({
  name: 'loans',
  initialState,
  reducers: {},
});

export default loansSlice.reducer;
