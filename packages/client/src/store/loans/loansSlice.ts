import { createSlice } from '@reduxjs/toolkit';
import { messages } from 'translations';
import { createCustomAsyncThunk } from 'utils/thunks';
import { CreateNewLoanData, postNewLoan } from './loansAPI';

export type LoansState = Record<string, never>;

const initialState: LoansState = {};

export const createNewLoan = createCustomAsyncThunk(
  'loans/create',
  async (formData: CreateNewLoanData) => {
    await postNewLoan(formData);

    return {
      message: messages.createLoanSuccess,
    };
  },
);

export const loansSlice = createSlice({
  name: 'loans',
  initialState,
  reducers: {},
});

export default loansSlice.reducer;
