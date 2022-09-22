import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { messages } from 'translations';
import { Loan } from 'types/loan';
import { User } from 'types/user';
import { RootState } from '../store';
import {
  fetchUserProfileRequest, fetchUserLoansRequest, RegisterUserData, registerUserRequest,
} from './userAPI';

export interface UserState {
  user: User;
  loans: Loan[];
}

const initialState: UserState = {
  user: {
    username: '',
    email: '',
  },
  loans: [],
};

export const getUserProfile = createAsyncThunk(
  'user/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchUserProfileRequest();

      return {
        user: response.data,
        message: messages.signInSuccess,
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

export const getUserLoans = createAsyncThunk(
  'user/getLoans',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchUserLoansRequest();

      return {
        loans: response.data,
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

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData: RegisterUserData, { rejectWithValue }) => {
    try {
      await registerUserRequest(userData);

      return {
        message: messages.registerSuccess,
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

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(getUserLoans.fulfilled, (state, action) => {
        state.loans = action.payload.loans;
      });
  },
});

export const selectUser = (state: RootState) => state.user.user;
export const selectUserLoans = (state: RootState) => state.user.loans;

export default userSlice.reducer;
